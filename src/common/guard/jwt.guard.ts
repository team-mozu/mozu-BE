import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reflector } from '@nestjs/core';
import { Permission } from '../decorator/authority.decorator';
import { log } from 'console';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly reflector: Reflector
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authority = this.reflector.get(Permission, context.getHandler());
        if (!authority) {
            return true;
        }
        const token = this.extractTokenFromHeader(request.headers);
        if (authority.includes('OPTIONAL') && token == null) {
            return true;
        }

        const sub = this.parseToken(token);

        request.id = sub.id;
        request.name = sub.name;
        request.role = sub.role;
        request.token = token;
        request.type = sub.type;

        return this.matchRole(authority, sub.role);
    }

    private parseToken(token: string) {
        let parsed: any;
        try {
            parsed = this.jwtService.verify(token, {
                secret: this.configService.get<string>('JWT_ACCESS_SECRET_KEY')
            });
        } catch (e) {
            throw new UnauthorizedException(e.message);
        }

        if (parsed.type != 'access') {
            throw new UnauthorizedException('Invalid Token');
        }

        return parsed;
    }

    private matchRole(required: string[], provided: string): boolean {
        return required.includes(provided);
    }

    private extractTokenFromHeader(header: any): string {
        const { authorization } = header;
        return authorization?.substring(7);
    }
}
