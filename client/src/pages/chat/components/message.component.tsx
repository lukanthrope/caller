import React from "react";
import {
  Avatar,
  Message,
  // @ts-ignore
} from "@chatscope/chat-ui-kit-react";
import { IMessage } from "../../../interfaces";
import { EMessageType } from "../../../enums";

interface IProps {
  message: IMessage;
  isMe: boolean;
}

export class MessageComponent extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  static renderMessageFooter = (message: IMessage, isMe = false) => {
    return (
      <>
        {!isMe && <Avatar src="https://picsum.photos/200" name="Joe" />}
        <Message.Footer
          sender={message.senderId}
          sentTime={message.createdAt}
        />
      </>
    );
  };

  render(): JSX.Element {
    const { message, isMe } = this.props;

    if (message.type === EMessageType.Image) {
      return (
        <Message
          key={message._id}
          model={{
            message: message.content,
            sentTime: message.createdAt,
            sender: message.senderId,
            direction: !isMe ? "outgoing" : null,
          }}
        >
          <Message.ImageContent src={`http://localhost:5000/${message.content}`} alt="pic" width={200} />
          {MessageComponent.renderMessageFooter(message, isMe)}
        </Message>
      );
    }

    return (
      <Message
        key={message._id}
        model={{
          message: message.content,
          sentTime: message.createdAt,
          sender: message.senderId,
          direction: !isMe ? "outgoing" : null,
        }}
      >
        {MessageComponent.renderMessageFooter(message, isMe)}
      </Message>
    );
  }
}
