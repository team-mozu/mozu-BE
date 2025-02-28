import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrganEntity } from 'src/organ/domain/persistence/organ.entity';
import { ClassItemEntity } from './classItem.entity';
import { ClassArticleEntity } from './classArticle.entity';
import { TeamEntity } from 'src/team/domain/persistence/team.entity';

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
        nullable: false,
        transformer: {
            to: (value: number) => value,
            from: (value: string) => Number(value)
        }
    })
    baseMoney: number;

    @Column('int', {
        name: 'CLASS_NUM',
        nullable: true
    })
    classNum: number;

    @Column('boolean', {
        name: 'STAR_YN',
        nullable: false,
        default: false
    })
    starYN: boolean;

    @Column('boolean', {
        name: 'PROG_YN',
        nullable: false,
        default: false
    })
    progressYN: boolean;

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

    @OneToMany(() => TeamEntity, (teams) => teams.class, { cascade: true, eager: true })
    teams: TeamEntity[];

    constructor(
        name: string,
        maxInvDeg: number,
        curInvDeg: number,
        baseMoney: number,
        classNum: number,
        starYN: boolean,
        progressYN: boolean,
        createdAt: string,
        deleteYN: boolean
    ) {
        this.name = name;
        this.maxInvDeg = maxInvDeg;
        this.curInvDeg = curInvDeg;
        this.baseMoney = baseMoney;
        this.classNum = classNum;
        this.starYN = starYN;
        this.progressYN = progressYN;
        this.createdAt = createdAt;
        this.deleteYN = deleteYN;
    }
}
