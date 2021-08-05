import { Avatar, IconButton } from "@material-ui/core";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth, db } from "../firebase";
import firebase from "firebase";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "./Message";
import { useState } from "react";

export default function ChatScreen(chat, messages) {
  const [user] = useAuthState(auth);
  const [input, setInput] = useState("");
  const router = useRouter();

  const [messagesSnapshot] = useCollection(
    db
      .collection("chats")
      .doc(router.query.id)
      .collection("messages")
      .orderBy("timestamp", "asc")
  );

  const showMessages = () => {
    if (messagesSnapshot) {
      messagesSnapshot.docs.map((message) => {
        <Message
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
        />;
      });
    } else {
      return JSON.parse(messages).map((message) => {
        <Message
          key={message.id}
          user={message.data().user}
          message={message}
        />;
      });
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();

    // update the last seen
    db.collection("users").doc(user.id).set(
      {
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    db.collection("chats").doc(router.query.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user.email,
      photoURL: user.photoURL,
    });

    setInput("");
  };

  return (
    <Container>
      <Header>
        <Avatar />
        <HeaderInformation>
          <h3>Rec Email</h3>
          <p>Last seen...</p>
        </HeaderInformation>
        <HeaderIcons>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </HeaderIcons>
      </Header>
      <MessageContainer>
        {showMessages()}
        <EndOfMessage />
      </MessageContainer>

      <InputContainer onSubmit={sendMessage}>
        <InsertEmoticonIcon />
        <Input value={input} onChange={(e) => setInput(e.target.value)} />
        <button type="submit" hidden disabled={!input}>
          Send Message
        </button>
      </InputContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const Header = styled.header`
  position: sticky;
  z-index: 100;
  top: 0;
  display: flex;
  padding: 11px;
  height: 80px;
  align-items: center;
  background-color: var(--bg-color);
  border-bottom: 1px solid var(--lines-color);
`;

const HeaderInformation = styled.div`
  margin-left: 15px;
  flex: 1;

  > h3 {
    margin: 0 0 3px 0;
  }

  > p {
    margin: 0;
    font-size: 14px;
    color: var(--gray-color);
  }
`;

const HeaderIcons = styled.div``;

const MessageContainer = styled.div`
  overflow-y: scroll;
  background-color: var(--bg-chat-color);

  ::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none; // IE
  scrollbar-width: none; // Firefox
  flex: 1;
`;

const EndOfMessage = styled.div``;

const InputContainer = styled.form`
  display: flex;
  align-items: center;
  position: sticky;
  top: auto;
  bottom: 0;
  padding: 10px;
  background-color: var(--bg-color);
  z-index: 100;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  border-radius: 10px;
  padding: 20px;
  margin-left: 15px;
  outline: 0;
  font-size: 16px;
  background-color: var(--lightest-gray-color);
  transition: all 0.3s ease;

  :hover {
    background-color: var(--hover-bg-darken-color);
  }
`;
