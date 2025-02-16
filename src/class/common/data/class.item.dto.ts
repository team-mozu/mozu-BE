export class ClassItemDTO {
    classId: number;
    itemId: number;
    money: number[];

    constructor(classId: number, itemId: number, money: number[]) {
        this.classId = classId;
        this.itemId = itemId;
        this.money = money;
    }
}
