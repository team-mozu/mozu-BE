export interface RequestClassForm {
    className: string;
    baseMoney: number;
    maxInvDeg: number;
    classItems: ClassItem[];
    classArticles: ClassArticle[];
}

export interface ClassItem {
    id: number;
    money: number[];
}

export interface ClassArticle {
    invDeg: number;
    articles: number[];
}
