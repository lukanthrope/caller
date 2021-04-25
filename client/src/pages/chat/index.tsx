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
import { RouteComponentProps } from "react-router";
import { ERoutes } from "../../enums";

interface IProps {
  authStore?: IAuthStore;
}

@(withAuth() as any)
export class Chat extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  private handleLogout = () => {
    const { authStore } = this.props
    authStore?.logout()
  }

  render(): JSX.Element {
    const { authStore } = this.props
    return (
      <div style={{ position: "relative", height: "550px" }}>
        <MainContainer>
          <Sidebar position="left">
            <h2>{authStore?.user?._id}</h2>
            <Search placeholder="Search..." />
            <Button border onClick={() => authStore?.logout()}>
              Logout
            </Button>
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
