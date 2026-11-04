import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { RecintosService } from './recintos.service';
import { CrearRecintoDto, ActualizarRecintoDto } from './recinto.dto';

@ApiTags('recintos')
@Controller('recintos')
export class RecintosController {
  constructor(private readonly service: RecintosService) {}

  @Get()
  @ApiOperation({ summary: 'Listar recintos activos y ordenados' })
  findAll() { return this.service.findAll(); }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) { return this.service.findOne(id); }

  @Post()
  create(@Body() dto: CrearRecintoDto) { return this.service.create(dto); }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: ActualizarRecintoDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseIntPipe) id: number) { return this.service.remove(id); }
}

