import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    Inject,
    InternalServerErrorException,
    Logger,
    HttpStatus
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    constructor(@Inject(Logger) private readonly logger: Logger) {}

    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const req = ctx.getRequest();
        const res = ctx.getResponse();

        let status = exception.getStatus();
        let exceptionResponse = exception.getResponse();

        let errDetails = null;

        if (
            status === HttpStatus.BAD_REQUEST &&
            typeof exceptionResponse === 'object' &&
            'message' in exceptionResponse
        ) {
            errDetails = exceptionResponse['message'];
        }

        if (!(exception instanceof HttpException)) {
            exception = new InternalServerErrorException();
            status = exception.getStatus();
            exceptionResponse = exception.getResponse();
        }

        this.logger.warn(`[${req.method}] ${req.originalUrl} : ${status} "${exception.message}"`);

        const errorResponse: any = {
            errCode: status,
            errMsg: exception.message,
            url: req.originalUrl
        };

        if (errDetails) {
            errorResponse.errDetails = errDetails;
        }

        return res.status(status).json(errorResponse);
    }
}
