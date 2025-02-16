import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments
} from 'class-validator';
import { check } from 'korcen';

@ValidatorConstraint({ name: 'NoBadWords', async: false })
export class NoBadWordsConstraint implements ValidatorConstraintInterface {
    validate(text: string): boolean {
        if (!text) return true;
        return !check(text);
    }

    defaultMessage(args: ValidationArguments): string {
        return `${args.value} <- 해당 정보는 금지된 단어를 포함하고 있습니다.`;
    }
}
