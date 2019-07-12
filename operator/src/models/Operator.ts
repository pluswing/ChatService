export class Operator {
  public id: number = 0;
  public loginId: string;
  public password: string;
  public token: string = '';
  public name: string = '';

  constructor(loginId: string, password: string) {
    this.loginId = loginId;
    this.password = password;
  }

  public loggedIn(token: string, id: number, name: string) {
    this.token = token;
    this.id = id;
    this.name = name;
    this.password = '';
  }

  public isLoggedIn(): boolean {
    return this.token !== '';
  }
}
