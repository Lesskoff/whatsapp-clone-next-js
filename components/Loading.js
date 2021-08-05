import styled from "styled-components";
import { Circle } from "better-react-spinkit";

export default function Loading() {
  return (
    <Container>
      <Logo src="/logo.svg" alt="logo" width="200" height="200" />
      <CircleStyled color="#3cbc28" size={60} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px 0;
  height: 100vh;
`;

const Logo = styled.img`
  /* position: absolute;
  top: 100px; */
  justify-self: flex-start;
  flex: 1;
  width: 200px;
  height: 200px;
  margin-bottom: 50px;
`;

const CircleStyled = styled(Circle)`
  flex: 2;
`;
