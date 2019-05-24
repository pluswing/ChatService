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
    }

    public setOnMessage(listener: (event: MessageEvent) => void) {
        this.connection.onmessage = listener;
    }
}

const socket = new Socket();

export default socket;
