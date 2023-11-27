import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LabelsService } from './labels.service';
import { CreateLabelDto, UpdateLabelDto } from '@server/shared/dto';

@Controller('labels')
export class LabelsController {
  constructor(private readonly labelsService: LabelsService) {}

  @Get()
  findAll() {
    return this.labelsService.findAll({});
  }

  @Post()
  create(@Body() createLabelDto: CreateLabelDto) {
    return this.labelsService.create(createLabelDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.labelsService.findOne({
      where: { id: Number(id) },
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLabelDto: UpdateLabelDto) {
    return this.labelsService.update({
      where: { id: Number(id) },
      data: updateLabelDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.labelsService.remove({
      where: { id: Number(id) },
    });
  }
}
