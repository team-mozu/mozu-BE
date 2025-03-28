import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { OrganReadService } from '../organ.read.service';
import { OrganDomainReader } from 'src/organ/domain/organ.domain.reader';
import { OrganDTO } from 'src/organ/common/data/organ.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OrganReadServiceImpl implements OrganReadService {
    constructor(
        @Inject('repository')
        private readonly reader: OrganDomainReader,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {}

    async getByOrganID(organId: number): Promise<OrganDTO> {
        return await this.reader.findByOrganId(organId);
    }

    async getOrganList(): Promise<OrganDTO[]> {
        return await this.reader.findOrganList();
    }

    async login(input: OrganDTO): Promise<{ accessToken: string; refreshToken: string }> {
        const { code, password } = input;

        const organ = await this.reader.findByOrganCode(code);

        if (!organ) {
            throw new UnauthorizedException('기관 코드 혹은 비밀번호가 틀렸습니다.');
        }

        const isAuth = await bcrypt.compare(password, organ.password);

        if (!isAuth) {
            throw new UnauthorizedException('기관 코드 혹은 비밀번호가 틀렸습니다.');
        }

        return {
            accessToken: await this.signToken(organ, false),
            refreshToken: await this.signToken(organ, true)
        };
    }

    async tokenReissue(refreshToken: string): Promise<string> {
        if (!refreshToken) {
            throw new UnauthorizedException('Jwt 토큰이 없습니다.');
        }

        const token = refreshToken.substring(7);

        const sub = await this.parseToken(token);

        const organ = new OrganDTO(sub.id, sub.name, null, null);

        return await this.signToken(organ, false);
    }

    async signToken(organ: OrganDTO, isRefreshToken: boolean) {
        const payload = {
            id: organ.id,
            name: organ.name,
            role: 'ORGAN',
            type: isRefreshToken ? 'refresh' : 'access'
        };

        return await this.jwtService.sign(payload, {
            secret: isRefreshToken
                ? this.configService.get<string>('JWT_REFRESH_SECRET_KEY')
                : this.configService.get<string>('JWT_ACCESS_SECRET_KEY'),
            expiresIn: isRefreshToken
                ? +this.configService.get<number>('JWT_REFRESHY_TOKEN_TIME')
                : +this.configService.get<number>('JWT_ACCESS_TOKEN_TIME')
        });
    }

    async parseToken(token: string) {
        let parsed: any;
        try {
            parsed = this.jwtService.verify(token, {
                secret: this.configService.get<string>('JWT_REFRESH_SECRET_KEY')
            });
        } catch (e) {
            throw new UnauthorizedException(e.message);
        }

        if (parsed.type != 'refresh') {
            throw new UnauthorizedException('Invalid Token');
        }

        return parsed;
    }
}
