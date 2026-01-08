import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

interface TryOnRequest {
  userImageUrl: string;
  productImageUrls: string[];
}

interface TryOnResponse {
  success: boolean;
  resultImageUrl?: string;
  error?: string;
}

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private readonly aiServiceUrl: string;

  constructor(private configService: ConfigService) {
    this.aiServiceUrl = this.configService.get('app.aiServiceUrl');
  }

  /**
   * Generate virtual try-on image
   */
  async generateTryOn(request: TryOnRequest): Promise<TryOnResponse> {
    try {
      this.logger.log('Sending try-on request to AI service');

      const response = await fetch(`${this.aiServiceUrl}/api/v1/tryon/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_image_url: request.userImageUrl,
          product_image_urls: request.productImageUrls,
        }),
      });

      if (!response.ok) {
        throw new Error(`AI service error: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        success: true,
        resultImageUrl: data.result_image_url,
      };
    } catch (error) {
      this.logger.error(`AI try-on error: ${error.message}`);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Check AI service health
   */
  async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(`${this.aiServiceUrl}/api/v1/health`);
      return response.ok;
    } catch (error) {
      this.logger.error(`AI service health check failed: ${error.message}`);
      return false;
    }
  }
}
