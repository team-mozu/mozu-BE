export class ResponseHoldItemForm {
    id: string;
    classTeamId: string;
    itemName: string;
    itemCnt: number;
    buyMoney: number;
    valProfit: number;
    profitNum: number;

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
