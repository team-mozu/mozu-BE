import { ArticleDTO } from 'src/common/data/article/article.dto';

export class ResponseArticleForm {
    article: ResponseArticle[];

    constructor(article: ArticleDTO[]) {
        this.article = article.map(
            (item) => new ResponseArticle(item.id, item.title, item.createDate)
        );
    }
}

export class ResponseArticle {
    id: number;
    title: string;
    date: string;

    constructor(id: number, title: string, date: string) {
        this.id = id;
        this.title = title;
        this.date = date;
    }
}
