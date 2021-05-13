import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import React from "react";

import {
  MainContainer,
  ChatContainer,
  MessageList,
  MessageInput,
  Avatar,
  AvatarGroup,
  Conversation,
  ConversationHeader,
  VideoCallButton,
  AddUserButton,
  Sidebar,
  Search,
  Button,
  Message
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

  private fileRef: any = React.createRef();

  public componentDidMount() {
    this.props.chatsStore?.fetchChats();
  }

  private handleSearch = (value: string) => {
    console.log(this.fileRef.current.files);
    const { usersStore } = this.props;
    this.search = value;
    if (this.search.trim() !== "") {
      usersStore?.fetchUsers(this.search);
    } else {
      if (usersStore?.users.length !== 0) usersStore?.clearUsers();
    }
  };

  private clearSearch = () => {
    this.search = "";
  };

  private handleAddUser = () => {
    const id = prompt("Enter user ID", "@");
    
    if (id)
      this.props.chatsStore?.addUserToChat(id);
    else
      alert('Enter valid ID');
  }

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
        name={chat.title || this.getNotMe(chat)}
        key={chat._id}
      >
        {this.renderChatAvatar(chat, chat.title ? '' : this.getNotMe(chat))}
      </Conversation>
    ));
  };

  private getNotMe = (chat: IChat) => {
    const { authStore } = this.props;

    if (chat.users[0] !== authStore?.user?._id) return chat.users[0];

    return chat.users[1];
  };


  

  private renderChatAvatar = (chat: IChat, singleUser?: string) => {
    if (singleUser)
      return (
        <Avatar src="https://picsum.photos/200" name={singleUser} />
      )
    
    return (
      <AvatarGroup
        size="sm"
        style={{
          width: "68px",
          hieght: "68px",
        }}
      >
        { chat.users.slice(0, 4).map((user) => <Avatar key={user} src="https://picsum.photos/200" name={user} />) }
      </AvatarGroup>
    )
  }

  private renderChatHeader = () => {
    const { chatsStore } = this.props;
    const currentChat = chatsStore?.currentChat;

    if (!currentChat) return;

    let user = '';

    if (chatsStore?.error) {
      alert(chatsStore.error);
      chatsStore.clearError();
    }

    if (currentChat.users.length < 3)
      user = this.getNotMe(currentChat);

      return (
        <ConversationHeader>
          {this.renderChatAvatar(currentChat, user)}
          <ConversationHeader.Content userName={currentChat.title || this.getNotMe(currentChat)} />
          <ConversationHeader.Actions>
            <VideoCallButton />
            <AddUserButton onClick={this.handleAddUser} />
          </ConversationHeader.Actions>
        </ConversationHeader>
      )
  };

  private renderChatBody(): JSX.Element | void {
    const { chatsStore, authStore } = this.props;

    if (!authStore?.user) return;
    
    const {user} = authStore;

    if (chatsStore?.currentChat)
      return (
        <ChatContainer>
          {this.renderChatHeader()}
          <MessageList>
            {chatsStore?.currentChat?.messages?.map((message) => (
              <Message
                key={message._id}
                model={{
                  message: message.content,
                  sentTime: message.createdAt,
                  sender: message.senderId,
                  direction: user._id === message.senderId ? "outgoing" : null,
                }}
              >
                {message.type === EMessageType.Image && (
                  <Message.ImageContent src={`http://localhost:5000/${message.content}`} alt="pic" width={200} />
                )}

                {user._id !== message.senderId && <Avatar src="https://picsum.photos/200" name="Joe" />}
                <Message.Footer
                  sender={message.senderId}
                  sentTime={message.createdAt}
                />

              </Message>
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
              <Avatar src="https://picsum.photos/200/" name="client" />
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
