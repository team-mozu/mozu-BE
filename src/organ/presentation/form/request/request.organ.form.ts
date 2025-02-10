export class RequestOrganForm {
    name: string;
    code: string;
    password: string;

    constructor(name: string, code: string, password: string) {
        this.name = name;
        this.code = code;
        this.password = password;
    }
}
