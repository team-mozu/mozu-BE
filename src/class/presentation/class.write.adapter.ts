import { Body, Controller, Delete, Inject, Param, Post, UseGuards } from '@nestjs/common';
import { RequestClassFormMapper } from './form/request/request.class.form.mapper';
import { RequestClassForm } from './form/request/request.class.form';
import { ClassWrtieService } from '../application/class.write.service';
import { ResponseDetailClass } from './form/response/response.class.form';
import { JwtAuthGuard } from 'src/common/guard/jwt.guard';
import { Permission } from 'src/common/decorator/authority.decorator';
import { Authority } from 'src/common/data/Role';
import { UserID } from 'src/common/decorator/user.decorator';

@Controller('/class')
export class ClassWrtieAdapter {
    constructor(
        @Inject('write_impl')
        private readonly writeService: ClassWrtieService,
        private readonly requestClassFormMapper: RequestClassFormMapper
    ) {}

    @Post('/create')
    @UseGuards(JwtAuthGuard)
    @Permission([Authority.ORGAN])
    async create(
        @Body() form: RequestClassForm,
        @UserID() id: string
    ): Promise<ResponseDetailClass> {
        const { classDTO, classItemDTO, classArticleDTO } =
            await this.requestClassFormMapper.toDTO(form);

        const response = await this.writeService.create(
            +id,
            classDTO,
            classItemDTO,
            classArticleDTO
        );

        return new ResponseDetailClass(
            response.classDTO,
            response.classItemDTO,
            response.classArticleDTO
        );
    }

    @Post('/update/:id')
    @UseGuards(JwtAuthGuard)
    @Permission([Authority.ORGAN])
    async update(
        @Param('id') classId: string,
        @Body() form: RequestClassForm,
        @UserID() id: string
    ): Promise<ResponseDetailClass> {
        const { classDTO, classItemDTO, classArticleDTO } =
            await this.requestClassFormMapper.toDTO(form);

        const response = await this.writeService.update(
            +id,
            +classId,
            classDTO,
            classItemDTO,
            classArticleDTO
        );

        return new ResponseDetailClass(
            response.classDTO,
            response.classItemDTO,
            response.classArticleDTO
        );
    }

    @Post('/star/:id')
    @UseGuards(JwtAuthGuard)
    @Permission([Authority.ORGAN])
    async updateStarYN(@Param('id') classId: string, @UserID() id: string): Promise<void> {
        return await this.writeService.changeStarYN(+id, +classId);
    }

    @Delete('/delete/:id')
    @UseGuards(JwtAuthGuard)
    @Permission([Authority.ORGAN])
    async delete(@Param('id') classId: string, @UserID() id: string): Promise<void> {
        return await this.writeService.delete(+id, +classId);
    }
}

/**
 * 수업 생성, 수정, 삭제, 변경 API
 *
 * 1. 수업 생성 API
 *      수업 이름, 투자 차수, 기초 자산, [ 차수별 종목 정보 ], [ 차수별 기사 정보 ] <- 입력
 * 2. 수업 수정 API
 *      수업 이름, 투자 차수, 기초 자산, [ 차수별 종목 정보(번호) ], [ 차수별 기사 정보(번호) ] <- 입력
 *
 * 3. 수업 삭제 API
 *      수업 번호 <- 입력
 *
 * 4. 수업 즐겨찾기 변경 API
 *      수업 번호 <- 입력
 */

/*

{
    "className": "2024 중학생 모의주식 투자 수업",
    "baseMoney": 5000000,
    "maxInvDeg": 5,
    "classItems": [
        {
            "id": 1003,
            "money": [49000, 50000, 47000, 53000, 55000]
        },
        {
            "id": 1007,
            "money": [39000, 20000, 17000, 43000, 35000]
        },
        {
            "id": 1015,
            "money": [59000, 60000, 49000, 83000, 95000]
        },
        {
            "id": 1017,
            "money": [59000, 60000, 49000, 83000, 95000]
        },
        {
            "id": 1018,
            "money": [59000, 60000, 49000, 83000, 95000]
        }
    ],
    "classArticles": [
        {
            "invDeg": 1,
            "articles": []
        },
        {
            "invDeg": 2,
            "articles": [2]
        },
        {
            "invDeg": 3,
            "articles": [3]
        },
        {
            "invDeg": 4,
            "articles": [3, 4]
        },
        {
            "invDeg": 5,
            "articles": [2, 3, 4, 5]
        }
    ]
}

1. 입력한 종목과 기사가 유효한지 검사해야함. 그 뒤 수업 생성.
2. 

*/
