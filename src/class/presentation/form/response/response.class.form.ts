import { ClassArticleDTO } from 'src/class/common/data/class.article.dto';
import { ClassDTO } from 'src/class/common/data/class.dto';
import { ClassItemDTO } from 'src/class/common/data/class.item.dto';

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
    classNum: string;
    starYN: boolean;
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
        this.starYN = classDTO.starYN;
        this.createdAt = classDTO.createdAt;
        this.deleteYN = classDTO.deleteYN;

        const articlesByInvDeg: { [key: number]: number[] } = {};
        classArticles.forEach((article) => {
            if (!articlesByInvDeg[article.invDeg]) {
                articlesByInvDeg[article.invDeg] = [];
            }
            articlesByInvDeg[article.invDeg].push(article.articleId);
        });

        this.classArticles = [];
        for (let i = 1; i <= this.maxInvDeg; i++) {
            this.classArticles.push({
                invDeg: i,
                articles: articlesByInvDeg[i] || []
            });
        }

        this.classItems = classItems.map(
            (classItem) => new ResponseClassItem(classItem.itemId, classItem.money)
        );
    }
}

export class ResponseClassArticle {
    invDeg: number;
    articles: number[];
}

export class ResponseClassItem {
    itemId: number;
    money: number[];

    constructor(itemId: number, money: number[]) {
        this.itemId = itemId;
        this.money = money;
    }
}
