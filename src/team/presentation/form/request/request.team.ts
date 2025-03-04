import { IsNotEmpty, Validate } from 'class-validator';
import { NoBadWordsConstraint } from 'src/common/validater/badword.check.decorator';

export class RequestTeamForm {
    @IsNotEmpty()
    classNum: number;

    @IsNotEmpty()
    schoolName: string;

    @IsNotEmpty()
    @Validate(NoBadWordsConstraint)
    teamName: string;
}
