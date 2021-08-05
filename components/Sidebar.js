import { Avatar, IconButton, Button } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import styled from "styled-components";
import * as EmailValidator from "email-validator";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import Chat from "./Chat";

export default function Sidebar() {
  const [user] = useAuthState(auth);
  const userChatRef = db
    .collection("chats")
    .where("users", "array-contains", user.email);
  const [chatsSnapshot] = useCollection(userChatRef);

  const createChat = () => {
    const input = prompt("Enter an email for the user you wish to chat with");

    if (!input) return;

    if (
      EmailValidator.validate(input) &&
      !chatAlreadyExists(input) &&
      input !== user.email
    ) {
      // creating chat
      db.collection("chats").add({
        users: [user.email, input],
      });
    }
  };

  const chatAlreadyExists = (recipientEmail) =>
    !!chatsSnapshot?.docs.find((chat) =>
      chat.data().users.find((user) => user === recipientEmail)
    );

  return (
    <Container>
      <Header>
        <UserAvatar src={user?.photoURL} onClick={() => auth.signOut()} />
        <IconsContainer>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </IconsContainer>
      </Header>
      <Search>
        <SearchIcon />
        <SearchInput placeholder="Search in chats" />
      </Search>
      <SidebarButton onClick={createChat}>Start a new chat</SidebarButton>

      {chatsSnapshot?.docs.map((chat) => (
        <Chat key={chat.id} id={chat.id} users={chat.data().users} />
      ))}
    </Container>
  );
}

const Container = styled.div`
  flex: 0.45;
  overflow-y: scroll;
  height: 100vh;
  min-width: 250px;
  max-width: 350px;
  border-right: 1px solid var(--lines-color);

  ::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none; // IE
  scrollbar-width: none; // Firefox
`;

const Header = styled.header`
  position: sticky;
  top: 0;
  height: 80px;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 15px;
  border-bottom: 1px solid var(--lines-color);
`;

const UserAvatar = styled(Avatar)`
  cursor: pointer;
  transition: var(--transition);

  :hover {
    opacity: 0.8;
  }
`;

const IconsContainer = styled.div``;

const Search = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 2px;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;

  ::placeholder {
    text-transform: uppercase;
  }
`;

const SidebarButton = styled(Button)`
  position: sticky;
  top: 0;
  width: 100%;

  &&& {
    border-top: 1px solid var(--lines-color);
    border-bottom: 1px solid var(--lines-color);
  }
`;
