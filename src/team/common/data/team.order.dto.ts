import { OrderType } from 'src/common/data/order.type';

export class TeamOrderDTO {
    id: number;
    itemId: number;
    itemName: string;
    itemMoney: number;
    orderCount: number;
    totalMoney: number;
    orderType: OrderType;
    invDeg: number;

    constructor(
        id: number,
        itemId: number,
        itemName: string,
        itemMoney: number,
        orderCount: number,
        totalMoney: number,
        orderType: OrderType,
        invDeg: number
    ) {
        this.id = id;
        this.itemId = itemId;
        this.itemName = itemName;
        this.itemMoney = itemMoney;
        this.orderCount = orderCount;
        this.totalMoney = totalMoney;
        this.orderType = orderType;
        this.invDeg = invDeg;
    }
}
