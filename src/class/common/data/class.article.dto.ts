export class ClassArticleDTO {
    classId: number;
    articleId: number;
    invDeg: number;

    article: ArticleDTO;

    constructor(classId: number, articleId: number, invDeg: number, article: ArticleDTO) {
        this.classId = classId;
        this.articleId = articleId;
        this.invDeg = invDeg;
        this.article = article;
    }
}

export class ArticleDTO {
    id: number;
    title: string;
    description: string;
    image: string;
    createdAt: string;
    deleteYN: Boolean;

    constructor(
        id: number,
        title: string,
        description: string,
        image: string,
        createdAt: string,
        deleteYN: Boolean
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.image = image;
        this.createdAt = createdAt;
        this.deleteYN = deleteYN;
    }
}
