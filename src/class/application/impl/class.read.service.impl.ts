import { Inject, Injectable } from '@nestjs/common';
import { ClassReadService } from '../class.read.service';
import { ClassDTO } from 'src/class/common/data/class.dto';
import { ClassDomainReader } from 'src/class/domain/class/class.domain.reader';

@Injectable()
export class ClassReadServiceImpl implements ClassReadService {
    constructor(
        @Inject('class_repository')
        private readonly reader: ClassDomainReader
    ) {}

    async getByClassId(classId: number): Promise<ClassDTO> {
        return await this.reader.findByClassId(classId);
    }

    async getClassList(): Promise<ClassDTO[]> {
        return await this.reader.findClassList();
    }
}
