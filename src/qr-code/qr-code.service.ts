import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QrCode } from './qr-code.entity';

@Injectable()
export class QrCodeService {
  constructor(
    @InjectRepository(QrCode)
    private qrCodeRepository: Repository<QrCode>,
  ) {}

  async create(qrCode: Partial<QrCode>): Promise<QrCode> {
    const newUser = this.qrCodeRepository.create(qrCode);
    return this.qrCodeRepository.save(newUser);
  }
}
