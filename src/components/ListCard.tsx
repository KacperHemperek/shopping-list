import { View } from "react-native";
import React from "react";
import { MyText } from "../styled/MyText";
import { useNavigation } from "@react-navigation/native";
import styled, { useTheme } from "styled-components/native";
import { ListBulletIcon, PencilSquareIcon } from "react-native-heroicons/solid";

const ListCard = ({ name, id, creator, onEdit }) => {
  const navigation = useNavigation();
  const theme = useTheme();

  function redirectToList() {
    navigation.navigate("List" as never, { params: { listId: id } } as never);
  }

  return (
    <CardWrapper onPress={redirectToList}>
      <TitleWrapper>
        <StyledBuletListIcon size={34} color={theme.colors.text} />
        <View>
          <CardTitle>{name}</CardTitle>
          <Creator>{creator}</Creator>
        </View>
      </TitleWrapper>
      <ButtonGroup>
        <CardButton onPress={onEdit} type="secondary">
          <PencilSquareIcon size={20} color={theme.colors.text} />
        </CardButton>
      </ButtonGroup>
    </CardWrapper>
  );
};

const CardWrapper = styled.TouchableOpacity`
  margin-bottom: 16px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TitleWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const StyledBuletListIcon = styled(ListBulletIcon)`
  margin-right: 12px;
`;

const CardTitle = styled(MyText)`
  font-size: 20px;
`;

const Creator = styled(MyText)`
  color: ${({ theme }) => theme.colors.gray};
`;
const ButtonGroup = styled.View`
  flex-direction: row;
`;

const CardButton = styled.TouchableOpacity<{
  type: "danger" | "secondary" | "neutral";
}>`
  padding: 10px;
  border-radius: 100px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme, type }) => {
    switch (type) {
      case "danger":
        return theme.colors.red;
      case "secondary":
        return theme.colors.blue;
      case "neutral":
        return "rgba(255, 255, 255, 0)";
      default:
        return theme.colors.lightBlue;
    }
  }};
  margin-left: 16px;
`;

export default ListCard;
