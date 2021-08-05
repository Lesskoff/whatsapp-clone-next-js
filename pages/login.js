import { Button } from "@material-ui/core";
import Head from "next/head";
import styled from "styled-components";
import { auth, provider } from "../firebase";

export default function Login() {
  const signIn = () => {
    auth.signInWithPopup(provider).catch(alert);
  };
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Container>
        <LoginContainer>
          <Logo src="/logo.svg" />
          <Button variant="outlined" onClick={signIn}>
            Sign with Google
          </Button>
        </LoginContainer>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: var(--lightest-gray-color);
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px;
  border-radius: 5px;
  background-color: var(--bg-color);
  box-shadow: 0 5px 20px 5px rgb(0 0 0 / 10%);
`;

const Logo = styled.img`
  height: 200px;
  width: 200px;
  margin-bottom: 50px;
`;
