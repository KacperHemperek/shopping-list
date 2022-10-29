import styled from 'styled-components/native';

export const ScreenWrapper = styled.View<{
  horizontalCenter?: boolean;
  verticalCenter?: boolean;
}>`
  flex: 1;
  align-items: ${({ horizontalCenter }) =>
    horizontalCenter ? 'center' : 'flex-start'};
  background-color: ${({ theme }) => theme.colors.darkBlue};
  justify-content: ${({ verticalCenter }) =>
    verticalCenter ? 'center' : 'flex-start'};
`;
