export class ClassItemDTO {
    classId: number;
    itemId: number;
    money: number[];

    item: ItemDTO;

    constructor(classId: number, itemId: number, money: number[], item: ItemDTO) {
        this.classId = classId;
        this.itemId = itemId;
        this.money = money;
        this.item = item;
    }
}

export class ItemDTO {
    id: number;
    name: string;
    info: string;
    logo: string;
    money: number;
    debt: number;
    capital: number;
    profit: number;
    profitOG: number;
    profitBen: number;
    netProfit: number;
    deleteYN: boolean;
    createdAt: string;

    constructor(
        id: number,
        name: string,
        info: string,
        logo: string,
        money: number,
        debt: number,
        capital: number,
        profit: number,
        profitOG: number,
        profitBen: number,
        netProfit: number,
        deleteYN: boolean,
        createdAt: string
    ) {
        this.id = id;
        this.name = name;
        this.info = info;
        this.logo = logo;
        this.money = money;
        this.debt = debt;
        this.capital = capital;
        this.profit = profit;
        this.profitOG = profitOG;
        this.profitBen = profitBen;
        this.netProfit = netProfit;
        this.deleteYN = deleteYN;
        this.createdAt = createdAt;
    }
}
