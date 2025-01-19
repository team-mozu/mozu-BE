import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { RequestArticleForm } from '../form/request/request.article.form';

export function ArticleListSwagger() {
    return applyDecorators(ApiOperation({ summary: '기사 목록 조회 API' }));
}

export function ArticleDetailSwagger() {
    return applyDecorators(ApiOperation({ summary: '기사 상세 조회 API' }));
}

export function ArticleCreateSwagger() {
    return applyDecorators(
        ApiOperation({ summary: '기사 생성 API' }),
        ApiConsumes('multipart/form-data'),
        ApiBody({
            description: '기사 생성에 필요한 데이터',
            type: RequestArticleForm
        })
    );
}

export function ArticleUpdateSwagger() {
    return applyDecorators(ApiOperation({ summary: '기사 수정 API' }));
}

export function ArticleDeleteSwagger() {
    return applyDecorators(ApiOperation({ summary: '기사 삭제 API' }));
}
