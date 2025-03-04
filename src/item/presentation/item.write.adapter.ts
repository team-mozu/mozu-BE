import {
    Body,
    Controller,
    Delete,
    Inject,
    Param,
    ParseIntPipe,
    Post,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { ItemDTO } from '../common/data/item.dto';
import { ItemWrtieService } from '../application/item.write.service';
import { RequestItemForm } from './form/request/request.item.form';
import { RequestItemFormMapper } from './form/request/request.item.form.mapper';
import { UserID } from 'src/common/decorator/user.decorator';
import { JwtAuthGuard } from 'src/common/guard/jwt.guard';
import { Permission } from 'src/common/decorator/authority.decorator';
import { Authority } from 'src/common/data/Role';

@Controller('/item')
export class ItemWrtieAdapter {
    constructor(
        @Inject('write_impl')
        private readonly writeService: ItemWrtieService,
        private readonly requestItemFormMapper: RequestItemFormMapper
    ) {}

    @Post('/create')
    @UseGuards(JwtAuthGuard)
    @Permission([Authority.ORGAN])
    @UseInterceptors(FileInterceptor('logo'))
    async create(
        @Body() form: RequestItemForm,
        @UploadedFile() file: Express.Multer.File,
        @UserID() id: string
    ): Promise<ItemDTO> {
        const internalDTO = await this.requestItemFormMapper.toDTO(form);

        return await this.writeService.create(internalDTO, file, +id);
    }

    @Post('/update/:id')
    @UseGuards(JwtAuthGuard)
    @Permission([Authority.ORGAN])
    @UseInterceptors(FileInterceptor('logo'))
    async update(
        @Param('id', ParseIntPipe) itemId: number,
        @Body() form: RequestItemForm,
        @UserID() id: string,
        @UploadedFile() file?: Express.Multer.File
    ): Promise<ItemDTO> {
        const internalDTO = await this.requestItemFormMapper.toDTO(form);

        return await this.writeService.update(itemId, internalDTO, file, +id);
    }

    @Delete('/delete/:id')
    @UseGuards(JwtAuthGuard)
    @Permission([Authority.ORGAN])
    async delete(@Param('id', ParseIntPipe) itemId: number, @UserID() id: string): Promise<void> {
        return await this.writeService.delete(itemId, +id);
    }
}
