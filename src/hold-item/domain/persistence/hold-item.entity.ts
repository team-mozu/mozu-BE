import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('HOLD_ITEM')
export class HoldItemEntity {
    @PrimaryColumn('varchar',{
        name: 'HOLD_ITEM_ID',
        length: 40,
        nullable: false
    })
    id: string

    @Column('varchar', {
        name: 'CLASS_TEAM_ID',
        length: 40,
        nullable: false
    })
    classTeamId: string


    @Column('varchar',{
        name: 'ITEM_NAME',
        length: 100,
        nullable: false
    })
    itemName: string

    @Column('int',{
        name: 'ITEM_CNT',
        nullable: false
    })
    itemCnt: number

    @Column('int',{
        name: 'BUY_MONEY',
        nullable: false
    })
    buyMoney: number

    @Column('int',{
        name: 'VAL_PROFIT',
        nullable: false
    })
    valProfit: number

    @Column('double precision',{
        name: 'PROFIT_NUM',
        nullable: false
    })
    profitNum: number

    constructor(
        id: string,
        classTeamId: string,
        itemName: string,
        itemCnt: number,
        buyMoney: number,
        valProfit: number,
        profitNum: number
    ) {
        this.id = id;
        this.classTeamId = classTeamId;
        this.itemName = itemName;
        this.itemCnt = itemCnt;
        this.buyMoney = buyMoney;
        this.valProfit = valProfit;
        this.profitNum = profitNum;
    }
}