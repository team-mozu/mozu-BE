import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryColumn,
    PrimaryGeneratedColumn
} from 'typeorm';
import { TeamEntity } from './team.entity';

@Entity('HOLD_ITEM')
export class HoldItemEntity {
    @PrimaryGeneratedColumn('increment', {
        name: 'HOLD_ITEM_ID'
    })
    id: number;

    @Column('int', {
        name: 'ITEM_ID',
        nullable: false
    })
    itemId: number;

    @Column('varchar', {
        name: 'ITEM_NAME',
        length: 100,
        nullable: false
    })
    itemName: string;

    @Column('int', {
        name: 'ITEM_CNT',
        nullable: false
    })
    itemCnt: number;

    @Column('bigint', {
        name: 'BUY_MONEY',
        nullable: false,
        transformer: {
            to: (value: number) => value,
            from: (value: string) => Number(value)
        }
    })
    buyMoney: number;

    @Column('bigint', {
        name: 'TOT_MONEY',
        nullable: false,
        transformer: {
            to: (value: number) => value,
            from: (value: string) => Number(value)
        }
    })
    totalMoney: number;

    @Column('bigint', {
        name: 'NOW_MONEY',
        nullable: false,
        transformer: {
            to: (value: number) => value,
            from: (value: string) => Number(value)
        }
    })
    nowMoney: number;

    @Column('bigint', {
        name: 'VAL_MONEY',
        nullable: false,
        transformer: {
            to: (value: number) => value,
            from: (value: string) => Number(value)
        }
    })
    valMoney: number;

    @Column('bigint', {
        name: 'VAL_PROFIT',
        nullable: false,
        transformer: {
            to: (value: number) => value,
            from: (value: string) => Number(value)
        }
    })
    valProfit: number;

    @Column('double precision', {
        name: 'PROFIT_NUM',
        nullable: false
    })
    profitNum: number;

    @ManyToOne(() => TeamEntity, (teamEntity) => teamEntity.holdItems)
    @JoinColumn({ name: 'TEAM_ID', referencedColumnName: 'id' })
    team: TeamEntity;

    constructor(
        itemId: number,
        itemName: string,
        itemCnt: number,
        buyMoney: number,
        totalMoney: number,
        nowMoney: number,
        valMoney: number,
        valProfit: number,
        profitNum: number
    ) {
        this.itemId = itemId;
        this.itemName = itemName;
        this.itemCnt = itemCnt;
        this.buyMoney = buyMoney;
        this.totalMoney = totalMoney;
        this.nowMoney = nowMoney;
        this.valMoney = valMoney;
        this.valProfit = valProfit;
        this.profitNum = profitNum;
    }
}
