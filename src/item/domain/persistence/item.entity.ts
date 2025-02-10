import { log } from 'console';
import { ClassArticleEntity } from 'src/class/domain/classArticle/persistence/classArticle.entity';
import { OrganEntity } from 'src/organ/domain/persistence/organ.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
} from 'typeorm';

@Entity('TB_ITEM')
export class ItemEntity {
    @PrimaryGeneratedColumn('increment', { name: 'ITEM_ID' })
    id: number;

    @Column('varchar', {
        name: 'ITEM_NAME',
        length: 300,
        nullable: false
    })
    name: string;

    @Column('varchar', {
        name: 'ITEM_INFO',
        length: 10000,
        nullable: false
    })
    info: string;

    @Column('varchar', {
        name: 'ITEM_LOGO',
        length: 255,
        nullable: true,
        default: '<!!>추후에 스켈레톤 UI url 추가 되어야 함<!!>'
    })
    logo: string;

    @Column('int', {
        name: 'MONEY',
        nullable: false
    })
    money: number;

    @Column('int', {
        name: 'DEBT',
        nullable: false
    })
    debt: number;

    @Column('int', {
        name: 'CAPITAL',
        nullable: false
    })
    capital: number;

    @Column('int', {
        name: 'PROFIT',
        nullable: false
    })
    profit: number;

    @Column('int', {
        name: 'PROFIT_OG',
        nullable: false
    })
    profitOG: number;

    @Column('int', {
        name: 'PROFIT_BEN',
        nullable: false
    })
    profitBen: number;

    @Column('int', {
        name: 'NET_PROFIT',
        nullable: false
    })
    netProfit: number;

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

    @ManyToOne(() => OrganEntity, (organ) => organ.items)
    organ: OrganEntity;

    constructor(
        name: string,
        info: string,
        logo: string,
        money: number,
        debt: number,
        capital: number,
        profit: number,
        profitOG: number,
        profitBen: number,
        netProfit: number,
        deleteYN: boolean,
        createdAt: string
    ) {
        this.name = name;
        this.info = info;
        this.logo = logo;
        this.money = money;
        this.debt = debt;
        this.capital = capital;
        this.profit = profit;
        this.profitOG = profitOG;
        this.profitBen = profitBen;
        this.netProfit = netProfit;
        this.deleteYN = deleteYN;
        this.createdAt = createdAt;
    }
}
