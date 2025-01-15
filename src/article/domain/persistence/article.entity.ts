import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('TB_ART')
export class ArticleEntity {
    @PrimaryGeneratedColumn('increment', { name: 'ART_ID' })
    id: number;

    @Column('varchar', {
        name: 'ART_NAME',
        length: 300,
        nullable: false
    })
    title: string;

    @Column('varchar', {
        name: 'ART_DESC',
        length: 10000,
        nullable: false
    })
    description: string;

    @Column('varchar', {
        name: 'ART_IMG',
        length: 255,
        nullable: true,
        default: '<!!>추후에 스켈레톤 UI url 추가 되어야 함<!!>'
    })
    image: string;

    @Column('boolean', {
        name: 'DEL_YN',
        nullable: false,
        default: false
    })
    deleteYN: boolean;

    @Column('char', {
        name: 'CRE_DT',
        length: 10,
        nullable: false
    })
    createdAt: string;

    constructor(
        name: string,
        description: string,
        image: string,
        createdAt: string,
        deleteYN?: boolean
    ) {
        this.title = name;
        this.description = description;
        this.image = image;
        this.createdAt = createdAt;
        this.deleteYN = deleteYN;
    }
}
