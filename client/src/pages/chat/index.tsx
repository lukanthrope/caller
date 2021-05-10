import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import React, { LegacyRef } from "react";

import {
  MainContainer,
  ChatContainer,
  MessageList,
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
import { IChat } from "../../interfaces";
import { InvisibleFileInput } from "../../components";
import { MessageComponent } from "./components";

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

  private fileRef: any = React.createRef();

  constructor(props: IProps) {
    super(props);
  }

  public componentDidMount() {
    this.props.chatsStore?.fetchChats();
  }

  public componentDidUpdate() {
    console.log(this.fileRef.current.files);
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
      props.chatsStore?.sendMessage(messageInputText);
  };

  private handleSendImageMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { chatsStore } = this.props;
    const { files } = e.target;

    if (files && files.length > 0) {
      chatsStore?.sendImageMessage(files[0]);
    }
  };

  private renderSideBarItems = () => {
    const { usersStore, chatsStore } = this.props;
    if (usersStore?.users && usersStore.users.length > 0)
      return usersStore.users.map((usr) => (
        <Conversation
          onClick={() => {
            chatsStore?.createChat([usr._id]);
            this.clearSearch();
          }}
          name={usr._id}
          key={usr._id}
        >
          <Avatar src="https://picsum.photos/200" name={usr._id} />
        </Conversation>
      ));

    return chatsStore?.chats.map((chat) => (
      <Conversation
        onClick={() => chatsStore.fetchChat(chat._id)}
        name={this.getNotMe(chat)}
        key={chat._id}
      >
        <Avatar src="https://picsum.photos/200" name={chat._id} />
      </Conversation>
    ));
  };

  private getNotMe = (chat: IChat) => {
    const { authStore } = this.props;

    if (chat.users[0] !== authStore?.user?._id) return chat.users[0];

    return chat.users[1];
  };

  private renderChatHeader = () => {
    const { chatsStore } = this.props;

    if (chatsStore?.currentChat && chatsStore.currentChat.users.length < 3) {
      const user = this.getNotMe(chatsStore.currentChat);

      return (
        <ConversationHeader>
          <Avatar src="https://picsum.photos/200" name={user} />
          <ConversationHeader.Content userName={user} />
          <ConversationHeader.Actions>
            <VideoCallButton />
            <InfoButton />
          </ConversationHeader.Actions>
        </ConversationHeader>
      );
    }
  };

  private renderChatBody(): JSX.Element | void {
    const { chatsStore, authStore } = this.props;
    if (chatsStore?.currentChat)
      return (
        <ChatContainer>
          {this.renderChatHeader()}
          <MessageList>
            {chatsStore?.currentChat?.messages?.map((message) => (
              <MessageComponent
                isMe={authStore?.user?._id !== message.senderId}
                message={message}
              />
            ))}
          </MessageList>
          <MessageInput
            onAttachClick={() => this.fileRef.current.click()}
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
        <InvisibleFileInput
          handleChange={this.handleSendImageMessage}
          ref={this.fileRef}
        />
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
