import { ArticleEntity } from 'src/article/domain/persistence/article.entity';
import { ClassEntity } from 'src/class/domain/class/persistence/class.entity';
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('TB_ORGAN')
export class OrganEntity {
    @PrimaryGeneratedColumn('increment', { name: 'ORG_ID' })
    id: number;

    @Column('varchar', {
        name: 'ORG_NAME',
        length: 100,
        nullable: false
    })
    name: string;

    @Column('varchar', {
        name: 'ORG_COD',
        length: 30,
        nullable: false
    })
    code: string;

    @Column('varchar', {
        name: 'ORG_PW',
        length: 300,
        nullable: false
    })
    password: string;

    @OneToMany(() => ArticleEntity, (articles) => articles.organ)
    @JoinColumn({ name: 'ARTICLE_ID', referencedColumnName: 'id' })
    articles: ArticleEntity[];

    @OneToMany(() => ClassEntity, (classes) => classes.organ)
    @JoinColumn({ name: 'CLASS_ID', referencedColumnName: 'id' })
    classes: ClassEntity[];

    constructor(name: string, code: string, password: string) {
        this.name = name;
        this.code = code;
        this.password = password;
    }
}
