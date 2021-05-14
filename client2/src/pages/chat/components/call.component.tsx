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
                style={{position: 'fixed', 'zIndex': 5, width: '100%', height: '100%', left: 0, backgroundColor: "black", display: "none", }}
            >
                <video autoPlay className="remote-video" id="remote-video"></video>
                <video autoPlay muted className="local-video" id="local-video"></video>
                <VoiceCallButton size="xl" onClick={this.props.endCall} style={{ color: 'red', zIndex: 6, bottom: 30, position: 'fixed' }} />
            </div>
        )
    }
}