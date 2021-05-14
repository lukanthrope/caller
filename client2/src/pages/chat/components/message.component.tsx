import React from "react";
import {
  Avatar,
  Message,
  // @ts-ignore
} from "@chatscope/chat-ui-kit-react";
import { IMessage } from "../../../interfaces";
import { EMessageType } from "../../../enums";

export class MessageComponent {

  static RenderMessageFooter = (message: IMessage, isMe = false) => {
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

  static Render(message: IMessage, isMe: boolean): JSX.Element {

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
          {MessageComponent.RenderMessageFooter(message, isMe)}
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
        {MessageComponent.RenderMessageFooter(message, isMe)}
      </Message>
    );
  }
}
