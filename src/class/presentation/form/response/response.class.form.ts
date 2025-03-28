import { ClassArticleDTO } from 'src/class/common/data/class.article.dto';
import { ClassDTO } from 'src/class/common/data/class.dto';
import { ClassItemDTO } from 'src/class/common/data/class.item.dto';
import { ClassArticle } from '../request/request.class.form';

export class ResponseClassForm {
    classes: ResponseClass[];

    constructor(classDTO: ClassDTO[]) {
        this.classes = classDTO.map(
            (item) => new ResponseClass(item.id, item.name, item.starYN, item.createdAt)
        );
    }
}

export class ResponseClass {
    id: number;
    name: string;
    starYN: boolean;
    date: string;

    constructor(id: number, name: string, starYN: boolean, date: string) {
        this.id = id;
        this.name = name;
        this.starYN = starYN;
        this.date = date;
    }
}

export class ResponseDetailClass {
    id: number;
    name: string;
    maxInvDeg: number;
    curInvDeg: number;
    baseMoney: number;
    classNum: number;
    starYN: boolean;
    progressYN: boolean;
    createdAt: string;
    deleteYN: boolean;

    classArticles: ResponseClassArticle[];
    classItems: ResponseClassItem[];

    constructor(classDTO: ClassDTO, classItems: ClassItemDTO[], classArticles: ClassArticleDTO[]) {
        this.id = classDTO.id;
        this.name = classDTO.name;
        this.maxInvDeg = classDTO.maxInvDeg;
        this.curInvDeg = classDTO.curInvDeg;
        this.baseMoney = classDTO.baseMoney;
        this.classNum = classDTO.classNum;
        this.progressYN = classDTO.progressYN;
        this.starYN = classDTO.starYN;
        this.createdAt = classDTO.createdAt;
        this.deleteYN = classDTO.deleteYN;

        const articlesByInvDeg: { [key: number]: ResponseArticle[] } = {};
        classArticles.forEach((article) => {
            if (!articlesByInvDeg[article.invDeg]) {
                articlesByInvDeg[article.invDeg] = [];
            }
            articlesByInvDeg[article.invDeg].push(
                new ResponseArticle(article.articleId, article.article.title)
            );
        });

        this.classArticles = [];
        for (let i = 1; i <= this.maxInvDeg; i++) {
            this.classArticles.push({
                invDeg: i,
                articles: articlesByInvDeg[i] || [] // 해당 투자 차수에 맞는 기사 리스트
            });
        }
        this.classItems = classItems.map(
            (classItem) =>
                new ResponseClassItem(classItem.itemId, classItem.item.name, classItem.money)
        );
    }
}

export class ResponseClassArticle {
    invDeg: number;
    articles: ResponseArticle[];
}

export class ResponseArticle {
    id: number;
    title: string;

    constructor(id: number, title: string) {
        this.id = id;
        this.title = title;
    }
}

export class ResponseClassItem {
    itemId: number;
    itemName: string;
    money: number[];

    constructor(itemId: number, itemName: string, money: number[]) {
        this.itemId = itemId;
        this.itemName = itemName;
        this.money = money;
    }
}

export class ResponseClassItemsForm {
    itemId: number;
    itemName: string;
    money: number[];

    constructor(classItemDTO: ClassItemDTO) {
        this.itemId = classItemDTO.itemId;
        this.itemName = classItemDTO.item.name;
        this.money = classItemDTO.money;
    }
}

export class ReponseClassArticleForm {
    classArticles: ResponseClassArticle[];

    constructor(classArticles: ClassArticleDTO[], maxInvDeg: number) {
        const articlesByInvDeg: { [key: number]: ResponseArticle[] } = {};
        classArticles.forEach((article) => {
            if (!articlesByInvDeg[article.invDeg]) {
                articlesByInvDeg[article.invDeg] = [];
            }
            articlesByInvDeg[article.invDeg].push(
                new ResponseArticle(article.articleId, article.article.title)
            );
        });

        this.classArticles = [];
        for (let i = 1; i <= maxInvDeg; i++) {
            this.classArticles.push({
                invDeg: i,
                articles: articlesByInvDeg[i] || [] // 해당 투자 차수에 맞는 기사 리스트
            });
        }
    }
}

export class ResponseTeamClassItemForm {
    itemId: number;
    itemName: string;
    itemLogo: string;
    nowMoney: number;
    profitMoney: number;
    profitNum: string;

    constructor(classItemDTO: ClassItemDTO, invDeg: number) {
        this.itemId = classItemDTO.itemId;
        this.itemName = classItemDTO.item.name;
        this.itemLogo = classItemDTO.item.logo;
        this.nowMoney = classItemDTO.money[invDeg - 1];
        if (invDeg === 1) {
            this.profitMoney = 0;
            this.profitNum = `0%`;
        } else {
            const prevMoney = classItemDTO.money[invDeg - 2];
            this.profitMoney = this.nowMoney - prevMoney;

            const percentChange = (this.profitMoney / prevMoney) * 100;
            this.profitNum = `${percentChange.toFixed(2)}%`;
        }
    }
}

export class ResponseTeamClassArticleForm {
    articleId: number;
    title: string;
    description: string;
    image: string;

    constructor(classArticle: ClassArticleDTO) {
        this.articleId = classArticle.articleId;
        this.title = classArticle.article.title;
        this.description = classArticle.article.description;
        this.image = classArticle.article.image;
    }
}

export class ResponseTeamClassItemDetailForm {
    itemId: number;
    itemName: string;
    itemLogo: string;
    nowMoney: number;
    profitMoney: number;
    profitNum: string;
    moneyList: number[];
    itemInfo: string;

    money: number;
    debt: number;
    capital: number;
    profit: number;
    profitOG: number;
    profitBen: number;
    netProfit: number;

    constructor(classItemDTO: ClassItemDTO, invDeg: number) {
        this.itemId = classItemDTO.itemId;
        this.itemName = classItemDTO.item.name;
        this.itemLogo = classItemDTO.item.logo;
        this.nowMoney = classItemDTO.money[invDeg - 1];
        if (invDeg === 1) {
            this.profitMoney = 0;
            this.profitNum = `0%`;
        } else {
            const prevMoney = classItemDTO.money[invDeg - 2];
            this.profitMoney = this.nowMoney - prevMoney;

            const percentChange = (this.profitMoney / prevMoney) * 100;
            this.profitNum = `${percentChange.toFixed(2)}%`;
        }

        this.moneyList = classItemDTO.money.slice(0, invDeg + 1);
        this.itemInfo = classItemDTO.item.info;
        this.money = classItemDTO.item.money;
        this.debt = classItemDTO.item.debt;
        this.capital = classItemDTO.item.capital;
        this.profit = classItemDTO.item.profit;
        this.profitOG = classItemDTO.item.profitOG;
        this.profitBen = classItemDTO.item.profitBen;
        this.netProfit = classItemDTO.item.netProfit;
    }
}
