import { Injectable, BadRequestException } from '@nestjs/common';
import axios from 'axios';
import { CONFIG } from '../config';

@Injectable()
export class AiTryonService {
  private readonly aiServiceUrl: string;

  constructor() {
    this.aiServiceUrl = process.env.AI_SERVICE_URL || 'http://localhost:8000';
  }

  async virtualTryOn(userImageUrl: string, productImageUrl: string) {
    try {
      // Call AI service for virtual try-on
      const response = await axios.post(`${this.aiServiceUrl}/api/v1/tryon`, {
        user_image_url: userImageUrl,
        product_image_url: productImageUrl,
      }, {
        timeout: 60000, // 60 seconds timeout for AI processing
      });

      return {
        message: 'Virtual try-on generated successfully',
        data: {
          resultImageUrl: response.data.result_image_url,
          processingTime: response.data.processing_time,
        },
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNREFUSED') {
          throw new BadRequestException('AI service is not available');
        }
        throw new BadRequestException(error.response?.data?.message || 'Failed to process virtual try-on');
      }
      throw new BadRequestException('Failed to process virtual try-on');
    }
  }

  async checkServiceHealth() {
    try {
      const response = await axios.get(`${this.aiServiceUrl}/health`, {
        timeout: 5000,
      });

      return {
        data: {
          status: 'healthy',
          aiService: response.data,
        },
      };
    } catch (error) {
      return {
        data: {
          status: 'unhealthy',
          aiService: null,
        },
      };
    }
  }
}
