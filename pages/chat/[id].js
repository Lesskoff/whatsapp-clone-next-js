import Head from "next/head";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import ChatScreen from "../../components/ChatScreen";
import Sidebar from "../../components/Sidebar";
import { auth, db } from "../../firebase";
import getRecipientEmail from "../../utils/getRecipientEmail";

export default function ChatPage({ chat, messages }) {
  const [user] = useAuthState(auth);

  return (
    <>
      <Head>
        <title>
          Chat with {getRecipientEmail(chat.users, user) || "unknown"}
        </title>
      </Head>
      <Container>
        <Sidebar />
        <ChatContainer>
          <ChatScreen {...{ chat, messages }} />
        </ChatContainer>
      </Container>
    </>
  );
}

export async function getServerSideProps(context) {
  const ref = db.collection("chats").doc(context.query.id);

  // prep the messages on the server
  const messagerRes = await ref
    .collection("messages")
    .orderBy("timestamp", "asc")
    .get();

  const messages = messagerRes.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .map((messages) => ({
      ...messages,
      timestamp: messages.timestamp.toDate().getTime(),
    }));

  // prep the chats
  const chatRes = await ref.get();
  const chat = {
    id: chatRes.id,
    ...chatRes.data(),
  };

  return {
    props: {
      messages: JSON.stringify(messages),
      chat,
    },
  };
}

const Container = styled.div`
  display: flex;
`;

const ChatContainer = styled.div`
  flex: 1;
  overflow-y: scroll;
  height: 100vh;

  ::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none; // IE
  scrollbar-width: none; // Firefox
`;
