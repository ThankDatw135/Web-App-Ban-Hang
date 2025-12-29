import { Module } from '@nestjs/common';
import { AiTryonController } from './ai-tryon.controller';
import { AiTryonService } from './ai-tryon.service';

@Module({
  controllers: [AiTryonController],
  providers: [AiTryonService],
})
export class AiTryonModule {}
