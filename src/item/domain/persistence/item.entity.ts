import { OrganEntity } from 'src/organ/domain/persistence/organ.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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
        default:
            'https://mozu-bucket.s3.ap-northeast-2.amazonaws.com/종목 기본 이미지.svg'
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
