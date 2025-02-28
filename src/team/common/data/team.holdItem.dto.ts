export class HoldItemDTO {
    id: number;
    itemId: number;
    itemName: string;
    itemCnt: number;
    buyMoney: number;
    totalMoney: number;
    nowMoney: number;
    valMoney: number;
    valProfit: number;
    profitNum: number;

    constructor(
        id: number,
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
        this.id = id;
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
