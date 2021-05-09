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
import { IChatsStore } from "../../store/chats";
import { EMessageType } from "../../enums";

interface IProps {
  authStore?: IAuthStore;
  chatsStore?: IChatsStore;
  usersStore?: IUsersStore;
}

@(withAuth() as any)
@inject("usersStore", "chatsStore")
@observer
export class Chat extends React.Component<IProps> {
  @observable
  private search = "";

  @observable
  private messageInputText = "";

  constructor(props: IProps) {
    super(props);
  }

  public async componentDidMount() {
    this.props.chatsStore?.fetchChats();
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

  private handleSendMessage = () => {
    const { messageInputText, props } = this;

    if (messageInputText.trim() !== "")
      props.chatsStore?.sendMessage(EMessageType.Text, messageInputText);
  };

  private renderSideBarItems = () => {
    const { usersStore, chatsStore, authStore } = this.props;
    if (usersStore?.users && usersStore.users.length > 0)
      return usersStore.users.map((usr) => (
        <Conversation name={usr._id} key={usr._id}>
          <Avatar src="https://picsum.photos/200" name={usr._id} />
        </Conversation>
      ));

    return chatsStore?.chats.map((chat) => (
      <Conversation
        onClick={() => chatsStore.fetchChat(chat._id)}
        name={chat._id}
        key={chat._id}
      >
        <Avatar src="https://picsum.photos/200" name={chat._id} />
      </Conversation>
    ));
  };

  private renderChatBody(): JSX.Element | void {
    const { chatsStore, authStore } = this.props;
    if (chatsStore?.currentChat)
      return (
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
            {chatsStore?.currentChat?.messages?.map((message) => (
              <Message
                key={message._id}
                model={{
                  message: message.content,
                  sentTime: message.createdAt,
                  sender: "Joe",
                  direction:
                    authStore?.user?._id === message.senderId
                      ? "outgoing"
                      : null,
                }}
              >
                <Avatar src="https://picsum.photos/200" name="Joe" />
                <Message.Footer sender="Emily" sentTime="just now" />
              </Message>
            ))}
          </MessageList>
          <MessageInput
            onChange={(t: string) => (this.messageInputText = t)}
            onSend={this.handleSendMessage}
            placeholder="Type message here"
          />
        </ChatContainer>
      );
  }

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
              placeholder="Search by interests or ID.."
              value={this.search}
              onChange={this.handleSearch}
              onClearClick={this.clearSearch}
            />
            <Button border onClick={() => authStore?.logout()}>
              Logout
            </Button>
            {this.renderSideBarItems()}
          </Sidebar>
          {this.renderChatBody()}
        </MainContainer>
      </div>
    );
  }
}
