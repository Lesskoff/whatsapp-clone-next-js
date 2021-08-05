import styled from "styled-components";

export default function Message({ user, message }) {
  return (
    <Container>
      <h2>{message.message}</h2>
    </Container>
  );
}

const Container = styled.div``;
