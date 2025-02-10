import { Inject, Injectable } from '@nestjs/common';
import { OrganDomainWriter } from 'src/organ/domain/organ.domain.writer';
import { OrganWrtieService } from '../organ.write.service';
import { OrganDTO } from 'src/organ/common/data/organ.dto';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class OrganWriteServiceImpl implements OrganWrtieService {
    constructor(
        @Inject('repository')
        private readonly writer: OrganDomainWriter,
        private readonly configServie: ConfigService
    ) {}

    async create(organDTO: OrganDTO): Promise<OrganDTO> {
        const hashedPassword = await bcrypt.hash(
            organDTO.password,
            +this.configServie.get<number>('PASSWORD_SALT')
        );

        const securedOrgan = {
            ...organDTO,
            password: hashedPassword
        };

        return await this.writer.save(securedOrgan);
    }
}
