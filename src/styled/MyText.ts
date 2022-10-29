import styled from 'styled-components/native';

export const MyText = styled.Text`
  font-weight: 400;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
`;
