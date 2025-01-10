import { ArticleDTO } from 'src/common/data/article/article.dto';

export interface ArticleWriteService {
    create(articleDTO: ArticleDTO): Promise<ArticleDTO>;
    update(articleDTO: ArticleDTO, articleId: number): Promise<ArticleDTO>;
    delete(articleId: number): Promise<void>;
}
