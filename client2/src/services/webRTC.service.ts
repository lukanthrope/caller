import socket from "./ws.service";
import AuthService from "./auth";

export default class WebRTCService {
  private peerConnection: RTCPeerConnection;

  public isAlreadyCalling = false;

  private currentClient: any;


  constructor() {
    this.peerConnection = new window.RTCPeerConnection();
  }

  public configureEvents() {
    navigator.getUserMedia(
      { video: true, audio: true },
      (stream) => {
        const localVideo = document.getElementById("local-video");
        console.log(localVideo);
        if (localVideo) {
          // @ts-ignore
          localVideo.srcObject = stream;
        }

        stream
          .getTracks()
          .forEach((track) => this.peerConnection.addTrack(track, stream));
      },
      (error) => {
        console.warn(error.message);
      }
    );

    socket.on("call-made", async (data: any) => {
      if (
        data.userId !== AuthService.getUser()?._id &&
        data.userId !== this.currentClient
      ) {
        // eslint-disable-next-line no-restricted-globals
        const confirmed = confirm(
          `User "${data.userId}" wants to call you. Do accept this call?`
        );

        if (!confirmed) {
          socket.emit("reject-call", {
            from: AuthService.getUser()?._id,
            to: data.userId,
          });

          return;
        }
      }

      this.currentClient = data.userId;
      console.log("CALL MADE", data);

      await this.peerConnection.setRemoteDescription(
        new RTCSessionDescription(data.offer)
      );

      const answer = await this.peerConnection.createAnswer();

      await this.peerConnection.setLocalDescription(
        new RTCSessionDescription(answer)
      );

      const container = document.getElementById("call-container");

      container!.style.display = "flex";

      socket.emit("make-answer", {
        answer,
        to: data.userId,
        from: AuthService.getUser()!._id,
      });
    });

    socket.on("answer-made", async (data: any) => {
      await this.peerConnection.setRemoteDescription(
        new RTCSessionDescription(data.answer)
      );

      if (!this.isAlreadyCalling) {
        this.callUser(data.userId);
        this.isAlreadyCalling = true;
      }

      console.log("ANSWER", data);

      const container = document.getElementById("call-container");

      container!.style.display = "flex";

      if (!this.isAlreadyCalling) {
        if (AuthService.getUser()?._id) {
          this.isAlreadyCalling = true;
        }
      }
    });

    socket.on("call-rejected", (data: any) => {
      alert(`User: "${data.userId}" rejected your call.`);
      this.isAlreadyCalling = false;
    });

    socket.on("call-ended", () => {
      console.log("ended");
      console.log(this.currentClient);
      const container = document.getElementById("call-container");
      container!.style.display = "none";

      this.endCall(false);
    });

    this.peerConnection.ontrack = function ({ streams: [stream] }) {
      const remoteVideo = document.getElementById("remote-video");
      console.log(remoteVideo);
      if (remoteVideo) {
        // @ts-ignore
        remoteVideo.srcObject = stream;
      }
    };

    navigator.getUserMedia(
      { video: true, audio: true },
      (stream) => {
        const localVideo = document.getElementById("local-video");
        if (localVideo) {
          // @ts-ignore
          localVideo.srcObject = stream;
        }

        stream
          .getTracks()
          .forEach((track) => this.peerConnection.addTrack(track, stream));
      },
      (error) => {
        console.warn(error.message);
      }
    );
  }

  public callUser = async (to: string, from = AuthService.getUser()!._id) => {
    const offer = await this.peerConnection.createOffer();
    await this.peerConnection.setLocalDescription(
      new RTCSessionDescription(offer)
    );

    this.currentClient = to;

    console.log(to, from);

    socket.emit("call-user", {
      offer,
      to,
      from,
    });
  };

  public endCall(emit = true) {

    const container = document.getElementById("call-container");
    container!.style.display = "none";
    this.isAlreadyCalling = false;


    if (emit) {
      socket.emit("end-call", {
        to: this.currentClient,
      });
    }

    // eslint-disable-next-line no-restricted-globals
    location.reload();

    this.currentClient = null;
  }
}
