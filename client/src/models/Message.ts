export class Message {
    public id: number = 0;
    public message: string = '';
    public operatorId: number | null = null;

    constructor(message: string) {
        this.message = message;
    }

    public isOperatorMessage(): boolean {
        return this.operatorId !== null;
    }
}
