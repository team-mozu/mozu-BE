import { ClassArticleDTO } from 'src/class/common/data/class.article.dto';

export interface ClassArticleDomainWriter {
    save(classArticleDTO: ClassArticleDTO): Promise<ClassArticleDTO>;
    saveAll(classArticleDTO: ClassArticleDTO[]): Promise<ClassArticleDTO[]>;
}
