import { Body, Controller, Get, Inject, Param, Post, UseGuards } from '@nestjs/common';
import { ItemReadService } from '../application/item.read.service';
import { ItemDTO } from '../common/data/item.dto';
import { JwtAuthGuard } from 'src/common/guard/jwt.guard';
import { Permission } from 'src/common/decorator/authority.decorator';
import { Authority } from 'src/common/data/Role';
import { UserID } from 'src/common/decorator/user.decorator';
import { ResponseItemForm } from './form/response/response.item.form';

@Controller('/item')
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

    @Post('validate')
    async validateItems(@Body() body: { organId: number; ids: number[] }): Promise<Boolean> {
        await this.readService.validateItems(body.organId, body.ids);

        return true;
    }
}
