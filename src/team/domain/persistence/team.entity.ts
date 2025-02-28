import { ClassEntity } from 'src/class/domain/persistence/entity/class.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TeamOrderEntity } from './team.order.entity';
import { HoldItemEntity } from './holdItem.entity';

@Entity('TB_CLASS_TEAM')
export class TeamEntity {
    @PrimaryGeneratedColumn('increment', { name: 'CLASS_TEAM_ID' })
    id: number;

    @Column('varchar', {
        name: 'TEAM_NAME',
        length: 100,
        nullable: false
    })
    name: string;

    @Column('varchar', {
        name: 'SCH_NAME',
        length: 30,
        nullable: false
    })
    schoolName: string;
    @Column('int', {
        name: 'CLASS_NUM',
        nullable: false
    })
    classNum: number;

    @Column('bigint', {
        name: 'BAS_MONEY',
        nullable: false,
        transformer: {
            to: (value: number) => value,
            from: (value: string) => Number(value)
        }
    })
    baseMoney: number;

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
        name: 'CASH_MONEY',
        nullable: false,
        transformer: {
            to: (value: number) => value,
            from: (value: string) => Number(value)
        }
    })
    cashMoney: number;

    @Column('bigint', {
        name: 'VAL_MONEY',
        nullable: false,
        default: 0,
        transformer: {
            to: (value: number) => value,
            from: (value: string) => Number(value)
        }
    })
    valueMoney: number;

    @Column('int', {
        name: 'INV_DEG',
        nullable: true
    })
    invDeg: number;

    @Column('char', {
        name: 'CRE_DT',
        length: 10,
        nullable: false
    })
    createdAt: string;

    @ManyToOne(() => ClassEntity, (classEntity) => classEntity.teams)
    @JoinColumn({ name: 'CLASS_ID', referencedColumnName: 'id' })
    class: ClassEntity;

    @OneToMany(() => TeamOrderEntity, (orders) => orders.team, { cascade: true, eager: true })
    orders: TeamOrderEntity[];

    @OneToMany(() => HoldItemEntity, (orders) => orders.team, { cascade: true, eager: true })
    holdItems: HoldItemEntity[];

    constructor(
        name: string,
        classNum: number,
        schoolName: string,
        baseMoney: number,
        totalMoney: number,
        cashMoney: number,
        valueMoney: number | null,
        invDeg: number,
        createdAt: string
    ) {
        this.name = name;
        this.classNum = classNum;
        this.schoolName = schoolName;
        this.baseMoney = baseMoney;
        this.totalMoney = totalMoney;
        this.cashMoney = cashMoney;
        this.valueMoney = valueMoney;
        this.invDeg = invDeg;
        this.createdAt = createdAt;
    }
}
