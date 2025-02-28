import { Inject, Injectable } from '@nestjs/common';
import { ClassReadService } from '../class.read.service';
import { ClassDTO } from 'src/class/common/data/class.dto';
import { ClassItemDTO } from 'src/class/common/data/class.item.dto';
import { ClassArticleDTO } from 'src/class/common/data/class.article.dto';
import { ClassDomainReader } from 'src/class/domain/class.domain.reader';
import { SseService } from 'src/common/sse/sse.service';

@Injectable()
export class ClassReadServiceImpl implements ClassReadService {
    constructor(
        @Inject('repository')
        private readonly reader: ClassDomainReader,
        private readonly sseService: SseService
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

    async sseConnect(classId: number, organId: number, res: any) {
        await this.reader.findClassById(classId, organId);

        this.sseService.addTeacherClient(classId, res);
    }

    async getByClassNum(classNum: number): Promise<ClassDTO> {
        return await this.reader.findClassByCode(classNum);
    }

    async validateItems(classId: number, ids: number[]): Promise<void> {
        return await this.reader.validateItems(classId, ids);
    }

    async getOrganClassArticles(classId: number, organId: number): Promise<ClassArticleDTO[]> {
        return await this.reader.findOrganClassArticles(classId, organId);
    }

    async getOrganClassItems(classId: number, organId: number): Promise<ClassItemDTO[]> {
        return await this.reader.findOrganClassItems(classId, organId);
    }

    async getClassItemById(teamId: number, itemId: number): Promise<ClassItemDTO> {
        return await this.reader.findClassItemById(teamId, itemId);
    }

    async getTeamClassArticles(teamId: number): Promise<ClassArticleDTO[]> {
        return await this.reader.findTeamClassArticles(teamId);
    }

    async getTeamClassItems(teamId: number): Promise<ClassItemDTO[]> {
        return await this.reader.findTeamClassItems(teamId);
    }

    async getByTeamId(teamId: number): Promise<ClassDTO> {
        return await this.reader.findByTeamId(teamId);
    }
}
