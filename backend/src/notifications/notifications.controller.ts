import { Controller, Get, Post, Delete, Param, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { NotificationsService } from './notifications.service';
import { FirebaseAuthGuard } from '../auth/guards/firebase-auth.guard';

@ApiTags('Notifications')
@Controller('notifications')
@UseGuards(FirebaseAuthGuard)
@ApiBearerAuth()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  @ApiOperation({ summary: 'Get user notifications' })
  async findAll(@Req() req: any) {
    return this.notificationsService.findAll(req.user.firebaseUid);
  }

  @Post(':id/read')
  @ApiOperation({ summary: 'Mark notification as read' })
  async markAsRead(@Req() req: any, @Param('id') id: string) {
    return this.notificationsService.markAsRead(req.user.firebaseUid, id);
  }

  @Post('read-all')
  @ApiOperation({ summary: 'Mark all notifications as read' })
  async markAllAsRead(@Req() req: any) {
    return this.notificationsService.markAllAsRead(req.user.firebaseUid);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete notification' })
  async delete(@Req() req: any, @Param('id') id: string) {
    return this.notificationsService.delete(req.user.firebaseUid, id);
  }
}
