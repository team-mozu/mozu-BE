import { Inject, Injectable } from '@nestjs/common';
import { ClassReadService } from '../class.read.service';
import { ClassDTO } from 'src/class/common/data/class.dto';
import { ClassItemDTO } from 'src/class/common/data/class.item.dto';
import { ClassArticleDTO } from 'src/class/common/data/class.article.dto';
import { ClassDomainReader } from 'src/class/domain/class.domain.reader';

@Injectable()
export class ClassReadServiceImpl implements ClassReadService {
    constructor(
        @Inject('repository')
        private readonly reader: ClassDomainReader
    ) {}

    async getByClassId(
        classId: number,
        organId: number
    ): Promise<{
        classDTO: ClassDTO;
        classItemDTO: ClassItemDTO[];
        classArticleDTO: ClassArticleDTO[];
    }> {
        return await this.reader.findClassById(classId, organId);
    }

    async getClassList(organId: number): Promise<ClassDTO[]> {
        return await this.reader.findClassList(organId);
    }
}
