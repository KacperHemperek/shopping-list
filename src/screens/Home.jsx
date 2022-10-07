import { View, Text } from "react-native";
import React from "react";
import { ScreenWrapper } from "../styled/ScreenWrapper";
import { MyText } from "../styled/MyText";
import styled from "styled-components";
import { SafeArea } from "../styled/SafeArea";
import { Input } from "../styled/Input";

const Home = () => {
    return (
        <ScreenWrapper horizontalCenter>
            <SafeArea>
                <NewListWrapper>
                    <NewListInput placeholder="new list name" />
                    <ButtonWrapper>
                        <Button>
                            <MyText>+</MyText>
                        </Button>
                    </ButtonWrapper>
                </NewListWrapper>
            </SafeArea>
        </ScreenWrapper>
    );
};

const Button = styled.TouchableOpacity`
    background-color: ${({ theme }) => theme.colors.lightBlue};
    width: 40px;
    height: 40px;
    justify-content: center;
    align-items: center;
    border-radius: 400px;
`;

const ButtonWrapper = styled.View`
    justify-content: center;
    align-items: flex-end;
    flex: 1;
`;

const NewListInput = styled(Input)`
    flex: 4;
    margin: 0;
    height: 50px;
`;

const NewListWrapper = styled.KeyboardAvoidingView`
    flex-direction: row;
    bottom: 0;
    width: 100%;
    padding: 0 16px 16px 16px;
    position: absolute;
`;

export default Home;
