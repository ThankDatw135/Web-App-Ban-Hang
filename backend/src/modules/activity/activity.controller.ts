import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ActivityService } from './activity.service';

@ApiTags('activity')
@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  // TODO: Implement activity tracking endpoints
}
