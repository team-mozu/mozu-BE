export class OrganDTO {
    id: number;
    name: string;
    code: string;
    password: string;

    constructor(id: number, name: string, code: string, password: string) {
        this.id = id;
        this.name = name;
        this.code = code;
        this.password = password;
    }
}
