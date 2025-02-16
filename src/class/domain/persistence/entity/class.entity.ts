import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrganEntity } from 'src/organ/domain/persistence/organ.entity';
import { ClassItemEntity } from './classItem.entity';
import { ClassArticleEntity } from './classArticle.entity';

@Entity('TB_CLASS')
export class ClassEntity {
    @PrimaryGeneratedColumn('increment', { name: 'CLASS_ID' })
    id: number;

    @Column('varchar', {
        name: 'CLASS_NAME',
        length: 100,
        nullable: false
    })
    name: string;

    @Column('int', {
        name: 'MAX_INV_DEG',
        nullable: false
    })
    maxInvDeg: number;

    @Column('int', {
        name: 'CUR_INV_DEG',
        nullable: true
    })
    curInvDeg: number;

    @Column('bigint', {
        name: 'BAS_MONEY',
        nullable: false
    })
    baseMoney: number;

    @Column('varchar', {
        name: 'CLASS_NUM',
        length: 10,
        nullable: true
    })
    classNum: string;

    @Column('boolean', {
        name: 'STAR_YN',
        nullable: false,
        default: false
    })
    starYN: boolean;

    @Column('char', {
        name: 'CRE_DT',
        length: 10,
        nullable: false
    })
    createdAt: string;

    @Column('boolean', {
        name: 'DEL_YN',
        nullable: false,
        default: false
    })
    deleteYN: boolean;

    @ManyToOne(() => OrganEntity, (organ) => organ.classes)
    organ: OrganEntity;

    @OneToMany(() => ClassArticleEntity, (article) => article.class, { cascade: true, eager: true })
    classArticles: ClassArticleEntity[];

    @OneToMany(() => ClassItemEntity, (item) => item.class, { cascade: true, eager: true })
    classItems: ClassItemEntity[];

    constructor(
        name: string,
        maxInvDeg: number,
        curInvDeg: number,
        baseMoney: number,
        classNum: string,
        starYN: boolean,
        createdAt: string,
        deleteYN: boolean
    ) {
        this.name = name;
        this.maxInvDeg = maxInvDeg;
        this.curInvDeg = curInvDeg;
        this.baseMoney = baseMoney;
        this.classNum = classNum;
        this.starYN = starYN;
        this.createdAt = createdAt;
        this.deleteYN = deleteYN;
    }
}
