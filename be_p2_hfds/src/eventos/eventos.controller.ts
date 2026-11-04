import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { EventosService } from './eventos.service';
import { CrearEventoDto, ActualizarEventoDto } from './evento.dto';

@ApiTags('eventos')
@Controller('eventos')
export class EventosController {
  constructor(private readonly service: EventosService) {}

  @Get()
  @ApiOperation({ summary: 'Listar eventos activos y ordenados' })
  findAll() { return this.service.findAll(); }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) { return this.service.findOne(id); }

  @Post()
  create(@Body() dto: CrearEventoDto) { return this.service.create(dto); }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: ActualizarEventoDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseIntPipe) id: number) { return this.service.remove(id); }
}

