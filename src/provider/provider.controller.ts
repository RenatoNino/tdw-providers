import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  ParseFilePipe,
  FileTypeValidator,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProviderService } from './provider.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';

@Controller('provider')
export class ProviderController {
  constructor(private readonly tutorialService: ProviderService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createTutorialDto: CreateProviderDto,
  ) {
    return await this.tutorialService.create(createTutorialDto, file);
  }

  @Get()
  async findAll() {
    return await this.tutorialService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.tutorialService.findOne(id);
  }

  @Get('/ruc/:ruc')
  async findForRuc(@Param('ruc') ruc: string) {
    return await this.tutorialService.findForRuc(ruc);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateTutorialDto: UpdateProviderDto,
  ) {
    return await this.tutorialService.update(id, updateTutorialDto, file);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.tutorialService.remove(id);
  }
}
