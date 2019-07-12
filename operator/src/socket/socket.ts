class Socket {
  private connection = new WebSocket('ws://localhost:3010/v1/chat/ws/');

  public connect(token: string, done: () => void) {
    if (this.connection.readyState === WebSocket.OPEN) {
      done();
      return;
    }
    this.connection.onopen = () => {
      this.connection.send(
        JSON.stringify({
          method: 'register',
          isOperator: true,
          token,
        }),
      );
      done();
    };
    this.connection.onmessage = (event) => {
      this.onMessage(event);
    };
  }

  public setOnMessage(listener: (event: MessageEvent) => void) {
    this.onMessageListener = listener;
  }

  public setOnMessageCustom(listener: (event: MessageEvent) => void) {
    this.onMessageCustomListener = listener;
  }

  private onMessageListener: (event: MessageEvent) => void = () => {};
  private onMessageCustomListener: (event: MessageEvent) => void = () => {};
  private onMessage(event: MessageEvent) {
    this.onMessageListener(event);
    this.onMessageCustomListener(event);
  }
}

const socket = new Socket();

export default socket;
