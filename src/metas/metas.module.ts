import { Module } from '@nestjs/common';
import { MetasController } from './metas.controller';
import { MetasService } from './metas.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MetaSchema } from './metas.interface';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Meta', schema: MetaSchema },
    ]),
  ],
  controllers: [MetasController],
  providers: [MetasService],
})
export class MetasModule {}

