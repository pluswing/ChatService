export class Message {
    public id: number = 0;
    public message: string = '';
    public createdAt: Date = new Date();
    public operatorId: number | null = null;

    constructor(message: string) {
        this.message = message;
    }
}
