import { Module } from '@nestjs/common';
import { MetaController } from './meta.controller';
import { MetaService } from './meta.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MetaSchema } from './meta.interface';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Meta', schema: MetaSchema },
    ]),
  ],
  controllers: [MetaController],
  providers: [MetaService],
})
export class MetaModule {}

