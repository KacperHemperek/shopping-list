import { StatusBar } from "expo-status-bar";
import styled from "styled-components";

export default function App() {
    return (
        <Wrapper>
            <Container>
                <Title>App Title</Title>
            </Container>
            <StatusBar style="auto" />
        </Wrapper>
    );
}

const Wrapper = styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: #2c3333;
`;

const Title = styled.Text`
    color: #a5c9ca;
    font-size: 24px;
`;

const Container = styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border: 1px solid #a5c9ca;
    margin: 16px;
    width: 100%;
    padding: 24px;
    border-radius: 8px;
`;
