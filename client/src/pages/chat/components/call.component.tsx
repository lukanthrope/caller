import React from "react";
// @ts-ignore
import { VoiceCallButton } from '@chatscope/chat-ui-kit-react'

interface IProps {
    endCall: () => void;
}

export class Call extends React.Component<IProps> {
    render(): JSX.Element {
        return (
            <div id="call-container"
                style={{position: 'fixed', 'zIndex': 2, width: '90vw', height: '90vh', backgroundColor: "black", display: "none"}}
            >
                <video autoPlay className="remote-video" id="remote-video"></video>
                <video autoPlay muted className="local-video" id="local-video"></video>
                <VoiceCallButton onClick={this.props.endCall} style={{ color: 'red', zIndex: 3 }} />
            </div>
        )
    }
}