import { ConsoleLogger } from '@nestjs/common';

export class MozuLogger extends ConsoleLogger {
    log(...optionalParams: any[]) {
        const callerInfo = this.getCallerInfo();
        super.log(`🍗 ${this.colorizeTextYellow('PATH')} : ${callerInfo}`, ...optionalParams);
    }

    debug(...optionalParams: any[]) {
        const callerInfo = this.getCallerInfo();
        super.debug(`🐛 ${this.colorizeTextYellow('PATH')} : ${callerInfo}`, ...optionalParams);
    }

    warn(...optionalParams: any[]) {
        const callerInfo = this.getCallerInfo();
        super.warn(`🚨 ${this.colorizeTextGreen('PATH')} : ${callerInfo}`, ...optionalParams);
    }

    error(...optionalParams: any[]) {
        const callerInfo = this.getCallerInfo();
        super.error(`💥 ${this.colorizeTextYellow('PATH')} : ${callerInfo}`, ...optionalParams);
    }

    private getCallerInfo(): string {
        const stack = new Error().stack;

        if (!stack) {
            return '';
        }

        const stackLines = stack.split('\n');
        const callerLine = stackLines[3];

        if (!callerLine) {
            return '';
        }

        const match = callerLine.match(/\((.*):(\d+):(\d+)\)/);
        if (match) {
            const filePath = match[1];
            const lineNumber = match[2];
            return `${filePath}:${lineNumber}`;
        }

        return '';
    }

    private colorizeTextYellow(text: string): string {
        return `\x1b[33m${text}\x1b[0m`;
    }

    private colorizeTextGreen(text: string): string {
        return `\x1b[32m${text}\x1b[0m`;
    }
}
