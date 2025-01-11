import { ArticleDTO } from 'src/common/data/article/article.dto';

export interface ArticleDomainWriter {
    save(atricleDTO: ArticleDTO): Promise<ArticleDTO>;
    update(articleDTO: ArticleDTO): Promise<ArticleDTO>;
    delete(articleId: number): Promise<void>;
}
