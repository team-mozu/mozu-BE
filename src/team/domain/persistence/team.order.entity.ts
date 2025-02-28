import { ClassEntity } from 'src/class/domain/persistence/entity/class.entity';
import { OrderType } from 'src/common/data/order.type';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TeamEntity } from './team.entity';

@Entity('TB_TEAM_ORDER')
export class TeamOrderEntity {
    @PrimaryGeneratedColumn('increment', { name: 'TEAM_ORDER_ID' })
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

    @Column('bigint', {
        name: 'ORDER_ITEM_MONEY',
        nullable: false,
        transformer: {
            to: (value: number) => value,
            from: (value: string) => Number(value)
        }
    })
    itemMoney: number;

    @Column('int', {
        name: 'ORDER_CNT',
        nullable: false
    })
    orderCount: number;

    @Column('bigint', {
        name: 'ORDER_TOT_MONEY',
        nullable: false,
        transformer: {
            to: (value: number) => value,
            from: (value: string) => Number(value)
        }
    })
    totalMoney: number;

    @Column('enum', {
        name: 'ORDER_TYPE',
        enum: OrderType,
        nullable: false
    })
    orderType: OrderType;

    @Column('int', {
        name: 'INV_CNT',
        nullable: false
    })
    invDeg: number;

    @ManyToOne(() => TeamEntity, (teamEntity) => teamEntity.orders)
    @JoinColumn({ name: 'TEAM_ID', referencedColumnName: 'id' })
    team: TeamEntity;

    constructor(
        itemId: number,
        itemName: string,
        itemMoney: number,
        orderCount: number,
        totalMoney: number,
        orderType: OrderType,
        invDeg: number
    ) {
        this.itemId = itemId;
        this.itemName = itemName;
        this.itemMoney = itemMoney;
        this.orderCount = orderCount;
        this.totalMoney = totalMoney;
        this.orderType = orderType;
        this.invDeg = invDeg;
    }
}
