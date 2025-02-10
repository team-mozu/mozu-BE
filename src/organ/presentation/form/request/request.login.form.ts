import { IsNotEmpty } from 'class-validator';

export class RequestLoginForm {
    @IsNotEmpty()
    code: string;

    @IsNotEmpty()
    password: string;

    constructor(code: string, password: string) {
        this.code = code;
        this.password = password;
    }
}
