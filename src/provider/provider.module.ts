import { Module } from '@nestjs/common';
import { ProviderService } from './provider.service';
import { ProviderController } from './provider.controller';
import { Provider } from './entities/provider.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharpService } from 'nestjs-sharp';

@Module({
  imports: [TypeOrmModule.forFeature([Provider])],
  controllers: [ProviderController],
  providers: [ProviderService, SharpService],
  exports: [],
})
export class ProviderModule {}
