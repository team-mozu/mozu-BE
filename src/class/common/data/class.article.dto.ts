export class ClassArticleDTO {
    classId: number;
    articleId: number;
    invDeg: number;

    constructor(classId: number, articleId: number, invDeg: number) {
        this.classId = classId;
        this.articleId = articleId;
        this.invDeg = invDeg;
    }
}
