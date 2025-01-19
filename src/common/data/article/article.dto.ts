export class ArticleDTO {
    id: number;
    title: string;
    description: string;
    image: string;
    createDate: string;
    deleteYN: Boolean;

    constructor(
        id: number,
        title: string,
        description: string,
        image: string,
        createDate: string,
        deleteYN: Boolean
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.image = image;
        this.createDate = createDate;
        this.deleteYN = deleteYN;
    }
}
