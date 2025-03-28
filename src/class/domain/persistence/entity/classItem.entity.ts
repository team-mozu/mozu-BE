import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ClassEntity } from './class.entity';
import { ItemEntity } from 'src/item/domain/persistence/item.entity';

@Entity('TB_CLASS_ITEM')
export class ClassItemEntity {
    @PrimaryColumn({ name: 'CLASS_ID' })
    classId: number;

    @PrimaryColumn({ name: 'ITEM_ID' })
    itemId: number;

    @Column('json', { name: 'MONEY', nullable: false })
    money: number[];

    @ManyToOne(() => ClassEntity, (classEntity) => classEntity.classItems)
    @JoinColumn({ name: 'CLASS_ID', referencedColumnName: 'id' })
    class: ClassEntity;

    @ManyToOne(() => ItemEntity, (itemEntity) => itemEntity.classes)
    @JoinColumn({ name: 'ITEM_ID', referencedColumnName: 'id' })
    item: ItemEntity;

    constructor(classId: number, itemId: number, money: number[]) {
        this.classId = classId;
        this.itemId = itemId;
        this.money = money;
    }
}
