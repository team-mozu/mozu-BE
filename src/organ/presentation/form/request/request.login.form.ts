export class RequestLoginForm {
    code: string;
    password: string;

    constructor(code: string, password: string) {
        this.code = code;
        this.password = password;
    }
}
