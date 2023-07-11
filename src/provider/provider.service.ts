import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { Provider } from './entities/provider.entity';
import { SharpService } from 'nestjs-sharp';
import * as fs from 'fs';

@Injectable()
export class ProviderService {
  constructor(
    @InjectRepository(Provider)
    private providersRepository: Repository<Provider>,
    private sharpService: SharpService,
  ) {}

  async saveIcon(provider: Provider, file: Express.Multer.File) {
    const dir = `public/providers_images/${provider.id}`;

    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const sizes = {
      standart: 500,
      thumbnail: 200,
    };

    const route = `public/providers_images/${provider.id}/`;

    this.sharpService
      .edit(file.buffer)
      .toFile(route + 'original-' + file.originalname);
    this.sharpService
      .edit(file.buffer)
      .resize({ width: sizes.standart })
      .jpeg({ quality: 80 })
      .toFile(route + 'standard-' + file.originalname);
    this.sharpService
      .edit(file.buffer)
      .resize({ width: sizes.thumbnail })
      .jpeg({ quality: 50 })
      .toFile(route + 'thumbnail-' + file.originalname);

    return `/providers_images/${provider.id}/original-${file.originalname}`;
  }

  async create(
    createTutorialDto: CreateProviderDto,
    file: Express.Multer.File,
  ) {
    let provider: Provider = await this.providersRepository.findOneBy({
      ruc: createTutorialDto.ruc,
    });

    if (!!provider) {
      throw new HttpException(
        `Ya existe un proveedor con el RUC: ${createTutorialDto.ruc}`,
        HttpStatus.CONFLICT,
      );
    }

    const newProvider = this.providersRepository.create(createTutorialDto);
    provider = await this.providersRepository.save(newProvider);

    if (file != undefined) {
      await this.providersRepository.update(
        { id: provider.id },
        { image: await this.saveIcon(provider, file) },
      );
    }

    const response = await this.providersRepository.findOneBy({
      id: provider.id,
    });
    return response;
  }

  async findAll() {
    return await this.providersRepository.find({
      order: { id: { direction: 'ASC' } },
    });
  }

  async findOne(id: number): Promise<Provider> {
    const provider = await this.providersRepository.findOneBy({ id });
    if (!provider) {
      throw new HttpException(
        `El proveedor con id ${id} no existe.`,
        HttpStatus.NOT_FOUND,
      );
    }
    return provider;
  }

  async findForRuc(ruc: string): Promise<Provider[]> {
    const providers = await this.providersRepository.find({ where: { ruc } });
    return providers;
  }

  async update(
    id: number,
    updateProviderDto: UpdateProviderDto,
    file: Express.Multer.File,
  ) {
    const provider: Provider = await this.providersRepository.findOneBy({ id });

    if (!provider) {
      throw new HttpException(
        `El proveedor con id: ${id} no existe.`,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.providersRepository.update({ id }, updateProviderDto);

    if (file != undefined) {
      await this.providersRepository.update(
        { id: provider.id },
        { image: await this.saveIcon(provider, file) },
      );
    }

    const result = await this.providersRepository.findOneBy({ id });
    return result;
  }

  async remove(id: number) {
    await this.providersRepository.delete({ id });
    return `¡Provider con id ${id} eliminado existosamente!`;
  }
}
