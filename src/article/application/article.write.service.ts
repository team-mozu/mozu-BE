import { ArticleDTO } from 'src/common/data/article/article.dto';

export interface ArticleWriteService {
    create(articleDTO: ArticleDTO, file: Express.Multer.File): Promise<ArticleDTO>;
    update(
        articleId: number,
        articleDTO: ArticleDTO,
        file: Express.Multer.File
    ): Promise<ArticleDTO>;
    delete(articleId: number): Promise<void>;
}
