import React from "react";
import { MyText } from "../styled/MyText";
import styled, { useTheme } from "styled-components";
import {
  CheckCircleIcon,
  UserPlusIcon,
  XCircleIcon,
} from "react-native-heroicons/solid";
import { shadow } from "../helpers/Shadow";
import { Dot } from "../styled/Dot";

const Notification = ({
  listName,
  listId,
  createdAt,
  state,
  userName,
  seen,
}) => {
  const theme = useTheme();

  const TagType = (type) => {
    return type === "accepted"
      ? theme.colors.lightGreen
      : theme.colors.lightRed;
  };

  return (
    <StyledNotification style={shadow}>
      <UserPlusIcon color={theme.colors.text} style={{ marginRight: 8 }} />
      <BodyWrapper>
        <MyText style={{ marginBottom: 6 }}>
          <Bold>{userName}</Bold> added your to <Bold>{listName}</Bold>
        </MyText>

        <Date>{"04/20/22"}</Date>
        {state !== "pending" ? (
          <Tag color={TagType(state)}>
            <TagText color={TagType(state)}>{state}</TagText>
          </Tag>
        ) : (
          <Row>
            <Button type={"accept"}>
              <CheckCircleIcon
                size={20}
                style={{ marginRight: 4 }}
                color={theme.colors.text}
              />
              <ButtonText>Accept</ButtonText>
            </Button>
            <Button>
              <XCircleIcon
                style={{ marginRight: 4 }}
                size={20}
                color={theme.colors.text}
              />
              <ButtonText>Reject</ButtonText>
            </Button>
          </Row>
        )}
      </BodyWrapper>
      {!seen && <Dot />}
    </StyledNotification>
  );
};

const Row = styled.View`
  flex-direction: row;
`;

const Tag = styled.View`
  border: 2px solid ${({ color }) => color};
  border-radius: 6px;

  align-items: center;
  justify-content: center;
  width: 80px;
  height: 28px;
`;

const TagText = styled(MyText)`
  color: ${({ color }) => color};
  font-size: 12px;
  font-weight: 800;
  text-transform: capitalize;
`;

const Button = styled.TouchableOpacity`
  border-radius: 8px;
  background-color: ${({ theme, type }) =>
    type === "accept" ? theme.colors.green : theme.colors.red};
  flex-direction: row;
  align-items: center;
  align-items: center;
  margin-right: 6px;
  justify-content: center;
  width: 80px;
  height: 28px;
`;
const ButtonText = styled(MyText)`
  font-size: 12px;
  font-weight: 600;
`;

const Between = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Bold = styled(MyText)`
  font-weight: 700;
`;

const Date = styled(MyText)`
  font-weight: 400;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.gray};
  margin-bottom: 8px;
`;

const StyledNotification = styled.View`
  padding: 10px;
  border-radius: 12px;
  width: 93%;
  background-color: ${({ theme }) => theme.colors.darkBlue};
  flex-direction: row;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  margin: 8px auto;
  position: relative;
`;

const BodyWrapper = styled.View`
  width: 85%;
`;

export default Notification;
