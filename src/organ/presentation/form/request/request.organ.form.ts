import { IsNotEmpty } from 'class-validator';

export class RequestOrganForm {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    code: string;

    @IsNotEmpty()
    password: string;

    constructor(name: string, code: string, password: string) {
        this.name = name;
        this.code = code;
        this.password = password;
    }
}
