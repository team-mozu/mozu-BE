import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ArticleEntity } from 'src/article/domain/persistence/article.entity';
import { ClassEntity } from './class.entity';

@Entity('TB_CLASS_ART')
export class ClassArticleEntity {
    @PrimaryColumn({ name: 'CLASS_ID' })
    classId: number;

    @PrimaryColumn({ name: 'ARTICLE_ID' })
    articleId: number;

    @PrimaryColumn('int', {
        name: 'INV_DEG'
    })
    invDeg: number;

    @ManyToOne(() => ClassEntity, (classEntity) => classEntity.classArticles)
    @JoinColumn({ name: 'CLASS_ID', referencedColumnName: 'id' })
    class: ClassEntity;

    @ManyToOne(() => ArticleEntity, (articleEntity) => articleEntity.classes)
    @JoinColumn({ name: 'ARTICLE_ID', referencedColumnName: 'id' })
    article: ArticleEntity;

    constructor(classId: number, articleId: number, invDeg: number) {
        this.classId = classId;
        this.articleId = articleId;
        this.invDeg = invDeg;
    }
}
