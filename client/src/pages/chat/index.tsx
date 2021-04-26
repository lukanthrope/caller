import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import React from "react";

import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Avatar,
  Conversation,
  ConversationHeader,
  VideoCallButton,
  InfoButton,
  Sidebar,
  Search,
  Button,
  // @ts-ignore
} from "@chatscope/chat-ui-kit-react";
import { withAuth } from "../../HOCs/auth";
import { IAuthStore } from "../../store/auth";
import { inject, observer } from "mobx-react";
import { observable } from "mobx";
import { IUsersStore } from "../../store/users";

interface IProps {
  authStore?: IAuthStore;
  usersStore?: IUsersStore;
}

@(withAuth() as any)
@inject("usersStore")
@observer
export class Chat extends React.Component<IProps> {
  @observable
  private search = "";

  constructor(props: IProps) {
    super(props);
  }

  public componentDidUpdate() {
    const { usersStore } = this.props;
    if (this.search.trim() !== "") {
      usersStore?.fetchUsers(this.search);
    } else {
      if (usersStore?.users.length !== 0) usersStore?.clearUsers();
    }
  }

  private handleSearch = (value: string) => {
    this.search = value;
  };

  private clearSearch = () => {
    this.search = "";
  };

  private renderSearchResult = () => {
    const { usersStore } = this.props;
    if (usersStore?.users)
      return usersStore.users.map((usr) => (
        <Conversation name={usr._id} key={usr._id}>
          <Avatar src="https://picsum.photos/200" name={usr._id} />
        </Conversation>
      ));
  };

  public render(): JSX.Element {
    const { authStore } = this.props;
    return (
      <div style={{ position: "relative", height: "550px" }}>
        <MainContainer>
          <Sidebar position="left">
            <ConversationHeader>
              <Avatar src="https://picsum.photos/200/" name="Emily" />
              <ConversationHeader.Content userName={authStore?.user?._id} />
            </ConversationHeader>
            <Search
              placeholder="Search..."
              value={this.search}
              onChange={this.handleSearch}
              onClearClick={this.clearSearch}
            />
            <Button border onClick={() => authStore?.logout()}>
              Logout
            </Button>
            {this.renderSearchResult()}
          </Sidebar>
          <ChatContainer>
            <ConversationHeader>
              <Avatar src="https://picsum.photos/200" name="Emily" />
              <ConversationHeader.Content userName="Emily" />
              <ConversationHeader.Actions>
                <VideoCallButton />
                <InfoButton />
              </ConversationHeader.Actions>
            </ConversationHeader>
            <MessageList>
              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "just now",
                  sender: "Joe",
                }}
              >
                <Avatar src="https://picsum.photos/200" name="Joe" />
                <Message.Footer sender="Emily" sentTime="just now" />
              </Message>
            </MessageList>
            <MessageInput placeholder="Type message here" />
          </ChatContainer>
        </MainContainer>
      </div>
    );
  }
}
