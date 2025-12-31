import { Controller, Post, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AiTryonService } from './ai-tryon.service';

@ApiTags('AI Try-On')
@Controller('ai-tryon')
export class AiTryonController {
  constructor(private readonly aiTryonService: AiTryonService) {}

  @Post()
  @ApiOperation({ summary: 'Virtual try-on with AI' })
  async virtualTryOn(
    @Body() body: { userImageUrl: string; productImageUrl: string },
  ) {
    return this.aiTryonService.virtualTryOn(body.userImageUrl, body.productImageUrl);
  }

  @Get('health')
  @ApiOperation({ summary: 'Check AI service health' })
  async checkHealth() {
    return this.aiTryonService.checkServiceHealth();
  }
}
