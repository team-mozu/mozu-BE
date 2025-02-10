import { Controller, Get, Inject, Injectable, Param, UseGuards } from '@nestjs/common';
import { ItemReadService } from '../application/item.read.service';
import { ItemDTO } from '../common/data/item.dto';
import { JwtAuthGuard } from 'src/common/guard/jwt.guard';
import { Permission } from 'src/common/decorator/authority.decorator';
import { Authority } from 'src/common/data/Role';
import { UserID } from 'src/common/decorator/user.decorator';
import { ResponseItemForm } from './form/response/response.item.form';

@Controller('/item')
@Injectable()
export class ItemReadAdapter {
    constructor(
        @Inject('read_impl')
        private readonly readService: ItemReadService
    ) {}

    @Get('/:id')
    @UseGuards(JwtAuthGuard)
    @Permission([Authority.ORGAN, Authority.STUDENT])
    async getByItemID(@Param('id') itemId: string): Promise<ItemDTO> {
        return await this.readService.getByItemId(+itemId);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @Permission([Authority.ORGAN])
    async getItemList(@UserID() id: string): Promise<ResponseItemForm> {
        const articleList = await this.readService.getItemList(+id);

        return new ResponseItemForm(articleList);
    }
}
