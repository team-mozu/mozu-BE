import { ItemDTO } from 'src/item/common/data/item.dto';

export class ResponseItemForm {
    items: ResponseItem[];

    constructor(item: ItemDTO[]) {
        this.items = item.map((item) => new ResponseItem(item.id, item.name));
    }
}

export class ResponseItem {
    id: number;
    name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}
