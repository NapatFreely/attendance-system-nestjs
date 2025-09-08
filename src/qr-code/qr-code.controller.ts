import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/utils/jwt-guard';
import { QrCodeService } from './qr-code.service';
import { QrCode } from './qr-code.entity';

@Controller('qrCode')
export class QrCodeController {
  constructor(private readonly qrCodeService: QrCodeService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() qrCode: Partial<QrCode>): Promise<QrCode> {
    return this.qrCodeService.create(qrCode);
  }
}
