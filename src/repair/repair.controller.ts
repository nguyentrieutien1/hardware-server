import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { RepairService } from './repair.service';
import { CreateRepairDto } from './dto/create-repair.dto';
import { UpdateRepairDto } from './dto/update-repair.dto';

@Controller('repair')
export class RepairController {
  constructor(private readonly repairService: RepairService) {}

  @Post()
  async create(@Body() createRepairDto: CreateRepairDto) {
    return await this.repairService.create(createRepairDto);
  }

  @Get()
  async findAll() {
    return await this.repairService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.repairService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateRepairDto: UpdateRepairDto) {
    return this.repairService.update(+id, updateRepairDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.repairService.remove(+id);
  }
}
