import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ArticleEntity } from './article.entity';

@Injectable()
export class ArticleChecker {
    existValidate(article: ArticleEntity, id: number) {
        if (!article) {
            throw new NotFoundException(
                `해당하는 id(${id})의 기사가 존재하지 않거나 삭제 되었습니다.`
            );
        }
    }

    formValidate(article: ArticleEntity) {
        if (!article.title) {
            throw new BadRequestException(`기사 제목(title)은 필수로 입력되어야 합니다.`);
        } else if (!article.description) {
            throw new BadRequestException(`기사 내용(description)은 필수로 입력되어야 합니다.`);
        }
    }
}
