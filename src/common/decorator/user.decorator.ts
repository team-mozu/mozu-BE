import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserID = createParamDecorator((data: unknown, context: ExecutionContext) => {
    return context.switchToHttp().getRequest().id;
});
