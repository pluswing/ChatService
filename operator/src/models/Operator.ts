export class Operator {
    public loginId: string;
    public password: string;
    public token: string = '';
    public name: string = '';

    constructor(loginId: string, password: string) {
        this.loginId = loginId;
        this.password = password;
    }

    public loggedIn(token: string, name: string) {
        this.password = '';
        this.token = token;
        this.name = name;
    }

    public isLoggedIn(): boolean {
        return this.token !== '';
    }
}
