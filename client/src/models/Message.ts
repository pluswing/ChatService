import moment from 'moment';
import 'moment/locale/ja';

export class Message {
  public id: number = 0;
  public message: string = '';
  public operatorId: number | null = null;
  public createdAt = new Date();

  constructor(message: string) {
    this.message = message;
  }

  public isOperatorMessage(): boolean {
    return this.operatorId !== null;
  }

  public date(): string {
    return moment(this.createdAt).format('YYYY/MM/DD HH:mm:ss');
  }
}
