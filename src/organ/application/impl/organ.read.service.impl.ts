import { Inject, Injectable, UnprocessableEntityException } from '@nestjs/common';
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
            throw new UnprocessableEntityException(
                '입력한 기관 코드에 해당하는 기관이 존재하지 않습니다.'
            );
        }

        const isAuth = await bcrypt.compare(password, organ.password);

        if (!isAuth) {
            throw new UnprocessableEntityException('비밀번호가 틀렸습니다.');
        }

        return {
            accessToken: await this.signToken(organ, false),
            refreshToken: await this.signToken(organ, true)
        };
    }

    async signToken(organ: OrganDTO, isRefreshToken: boolean) {
        const payload = {
            id: organ.id,
            name: organ.name,
            role: 'ORGAN',
            type: isRefreshToken ? 'refresh' : 'access'
        };

        return await this.jwtService.sign(payload, {
            secret: this.configService.get<string>('JWT_ACCESS_SECRET_KEY'),
            expiresIn: isRefreshToken ? 36000 : 3600
        });
    }
}
