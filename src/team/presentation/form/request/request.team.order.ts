import { OrderType } from 'src/common/data/order.type';

export class RequestTeamOrderForm {
    itemId: number;
    itemName: string;
    itemMoney: number;
    orderCount: number;
    totalMoney: number;
    orderType: OrderType;

    constructor(
        itemId: number,
        itemName: string,
        itemMoney: number,
        orderCount: number,
        totalMoney: number,
        orderType: OrderType
    ) {
        this.itemId = itemId;
        this.itemName = itemName;
        this.itemMoney = itemMoney;
        this.orderCount = orderCount;
        this.totalMoney = totalMoney;
        this.orderType = orderType;
    }
}
