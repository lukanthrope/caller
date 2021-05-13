import IO from "socket.io-client";

class WsService {
  private socket: any;

  constructor() {
    this.init();

    this.on("disconnect", () => {
      console.log('DISCONNECTED');
      this.init();
    })
  }

  private init() {
    if (this.socket) this.socket.close();
    this.socket = IO("http://localhost:8081", {
      transports: ["websocket"],
      upgrade: false,
      forceNew: true
    })
  }

  public handleConnection(clientId: string) {
    this.on("connect", () => {
      alert('AAAA')
      this.emit("client-connection", clientId);
    });
  }

  public emit(message: string, data?: any) {
    this.socket.emit(message, data);
  }

  public on(message: string, callback: any) {
    this.socket.on(message, callback);
  }

  public disconnect() {
    this.socket.disconnect();
  }
}

export default new WsService();
