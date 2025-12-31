import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThanOrEqual, MoreThanOrEqual, IsNull, Or } from 'typeorm';
import { Banner } from './entities/banner.entity';

@Injectable()
export class BannersService {
  constructor(
    @InjectRepository(Banner)
    private bannersRepository: Repository<Banner>,
  ) {}

  async findAll(position?: string) {
    const now = new Date();
    
    const queryBuilder = this.bannersRepository
      .createQueryBuilder('banner')
      .where('banner.active = :active', { active: true })
      .andWhere('(banner.startDate IS NULL OR banner.startDate <= :now)', { now })
      .andWhere('(banner.endDate IS NULL OR banner.endDate >= :now)', { now })
      .orderBy('banner.sortOrder', 'ASC');

    if (position) {
      queryBuilder.andWhere('banner.position = :position', { position });
    }

    const banners = await queryBuilder.getMany();

    return {
      data: banners,
    };
  }

  async findAllAdmin() {
    const banners = await this.bannersRepository.find({
      order: { sortOrder: 'ASC', createdAt: 'DESC' },
    });

    return {
      data: banners,
    };
  }

  async findOne(id: string) {
    const banner = await this.bannersRepository.findOne({ where: { id } });
    
    if (!banner) {
      throw new NotFoundException('Banner not found');
    }

    return {
      data: banner,
    };
  }

  async create(createBannerDto: any) {
    const banner = this.bannersRepository.create(createBannerDto);
    await this.bannersRepository.save(banner);

    return {
      message: 'Banner created successfully',
      data: banner,
    };
  }

  async update(id: string, updateBannerDto: any) {
    const banner = await this.bannersRepository.findOne({ where: { id } });
    
    if (!banner) {
      throw new NotFoundException('Banner not found');
    }

    Object.assign(banner, updateBannerDto);
    await this.bannersRepository.save(banner);

    return {
      message: 'Banner updated successfully',
      data: banner,
    };
  }

  async remove(id: string) {
    const banner = await this.bannersRepository.findOne({ where: { id } });
    
    if (!banner) {
      throw new NotFoundException('Banner not found');
    }

    await this.bannersRepository.remove(banner);

    return {
      message: 'Banner deleted successfully',
    };
  }
}
