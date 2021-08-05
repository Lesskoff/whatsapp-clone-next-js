import { Avatar } from "@material-ui/core";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";
import styled from "styled-components";
import { auth, db } from "../firebase";
import getRecipientEmail from "../utils/getRecipientEmail";

export default function Chat({ id, users }) {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const recipientUserEmail = getRecipientEmail(users, user);
  const [recipientSnapshot] = useCollection(
    db.collection("users").where("email", "==", recipientUserEmail)
  );

  const recipient = recipientSnapshot?.docs?.[0]?.data();

  const enterChat = () => router.push(`/chat/${id}`);

  return (
    <Container onClick={enterChat}>
      <UserAvatar src={recipient?.photoURL}>
        {recipientUserEmail[0].toUpperCase()}
      </UserAvatar>
      {recipientUserEmail}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  cursor: pointer;
  word-break: break-word;

  :hover {
    background-color: var(--hover-bg-color);
  }
`;

const UserAvatar = styled(Avatar)`
  margin: 5px 15px 5px 5px;
`;
