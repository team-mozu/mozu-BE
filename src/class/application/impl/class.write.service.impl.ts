import {
    HttpException,
    Inject,
    Injectable,
    InternalServerErrorException,
    NotFoundException
} from '@nestjs/common';
import { ClassWrtieService } from '../class.write.service';
import { ClassDTO } from 'src/class/common/data/class.dto';
import { ClassArticleDTO } from 'src/class/common/data/class.article.dto';
import { ClassItemDTO } from 'src/class/common/data/class.item.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { ClassDomainWrtier } from 'src/class/domain/class.domain.writer';
import { randomInt, randomUUID } from 'crypto';
import { SseService } from 'src/common/sse/sse.service';
import { EventType } from 'src/common/sse/event.type';
import { EventClassNextInvStartForm } from 'src/common/sse/event.form';

@Injectable()
export class ClassWriteServiceImpl implements ClassWrtieService {
    constructor(
        @Inject('repository')
        private readonly classWriter: ClassDomainWrtier,
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
        private readonly sseService: SseService
    ) {}

    async create(
        organId: number,
        classDTO: ClassDTO,
        classItemDTO: ClassItemDTO[],
        classArticleDTO: ClassArticleDTO[]
    ): Promise<{
        classDTO: ClassDTO;
        classItemDTO: ClassItemDTO[];
        classArticleDTO: ClassArticleDTO[];
    }> {
        const itemIds = classItemDTO.map((item) => item.itemId);
        const articleIds: number[] = classArticleDTO.map((article) => article.articleId);

        try {
            await Promise.all([
                firstValueFrom(
                    this.httpService.post(
                        `${this.configService.get<string>('SERVER_HOST')}/article/validate`,
                        {
                            organId: organId,
                            ids: articleIds
                        }
                    )
                ),
                firstValueFrom(
                    this.httpService.post(
                        `${this.configService.get<string>('SERVER_HOST')}/item/validate`,
                        {
                            organId: organId,
                            ids: itemIds
                        }
                    )
                )
            ]);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                throw new NotFoundException(`${error.response.data.errMsg}`);
            } else {
                throw new InternalServerErrorException(`야야 이거 서버가 잘못했다...`);
            }
        }

        const classData = {
            ...classDTO,
            createdAt: this.getDate()
        };

        return await this.classWriter.save(organId, classData, classItemDTO, classArticleDTO);
    }

    async update(
        organId: number,
        classId: number,
        classDTO: ClassDTO,
        classItemDTO: ClassItemDTO[],
        classArticleDTO: ClassArticleDTO[]
    ): Promise<{
        classDTO: ClassDTO;
        classItemDTO: ClassItemDTO[];
        classArticleDTO: ClassArticleDTO[];
    }> {
        const itemIds = classItemDTO.map((item) => item.itemId);
        const articleIds: number[] = classArticleDTO.map((article) => article.articleId);

        try {
            await Promise.all([
                firstValueFrom(
                    this.httpService.post(
                        `${this.configService.get<string>('SERVER_HOST')}/article/validate`,
                        {
                            organId: organId,
                            ids: articleIds
                        }
                    )
                ),
                firstValueFrom(
                    this.httpService.post(
                        `${this.configService.get<string>('SERVER_HOST')}/item/validate`,
                        {
                            organId: organId,
                            ids: itemIds
                        }
                    )
                )
            ]);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                throw new NotFoundException(`${error.response.data.errMsg}`);
            } else {
                throw new InternalServerErrorException(`야야 이거 서버가 잘못했다...`);
            }
        }

        return await this.classWriter.update(
            organId,
            classId,
            classDTO,
            classItemDTO,
            classArticleDTO
        );
    }

    async changeStarYN(organId: number, classId: number): Promise<void> {
        return await this.classWriter.changeStarYN(organId, classId);
    }

    async delete(organId: number, classId: number): Promise<void> {
        return await this.classWriter.delete(organId, classId);
    }

    async startClass(organId: number, classId: number): Promise<number> {
        const classNum = this.generateClassCode();

        await this.classWriter.startClass(organId, classId, classNum);

        return classNum;
    }

    async stopClass(organId: number, classId: number): Promise<void> {
        return await this.classWriter.stopClass(organId, classId);
    }

    async nextInvDeg(organId: number, classId: number): Promise<void> {
        const invDeg = await this.classWriter.nextInvDeg(organId, classId);

        await this.sseService.sendToAllStudents(
            EventType.CLASS_NEXT_INV_START,
            new EventClassNextInvStartForm(classId, invDeg)
        );
    }

    private getDate(): string {
        const date = new Date();
        const options = {
            timeZone: 'Asia/Seoul'
        };
        const koreanDate = new Intl.DateTimeFormat('en-CA', options).format(date);

        return koreanDate;
    }

    private generateClassCode(): number {
        return randomInt(1111111, 9999999);
    }
}
