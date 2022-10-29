import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ChevronLeftIcon } from "react-native-heroicons/solid";
import styled, { useTheme } from "styled-components/native";

function BackButton() {
  const theme = useTheme();
  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }

  return (
    <ButtonWrapper onPress={handleBack}>
      <ChevronLeftIcon color={theme.colors.text} />
    </ButtonWrapper>
  );
}

const ButtonWrapper = styled.TouchableOpacity`
  padding: 4px;
  margin-right: 8px;
`;

export default BackButton;
