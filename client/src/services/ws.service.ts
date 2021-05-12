import IO, { Socket } from "socket.io-client";

class WsService {
  // @ts-ignore
  private socket: Socket;
  constructor() {
    this.init();
  }

  private init() {
    if (this.socket) this.socket.close();
    this.socket = IO("http://localhost", {
      transports: ["websocket"],
      upgrade: false,
    });
  }

  public handleConnection(clientId: string) {
    this.on("connect", () => {
      this.emit("client-connection", clientId);
    });
  }

  public emit(message: string, data?: any) {
    this.socket.emit(message, data);
  }

  public on(message: string, callback: any) {
    this.socket.on(message, callback);
  }
}

export default new WsService();
