import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto, UpdateExpenseDto } from './expense.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('expenses')
@UseGuards(JwtAuthGuard)
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Get()
  findAll(@Request() req) {
    return this.expenseService.findAll(req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.expenseService.findOne(id, req.user.userId);
  }

  @Post()
  create(@Request() req, @Body() createExpenseDto: CreateExpenseDto) {
    return this.expenseService.create(req.user.userId, createExpenseDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Request() req, @Body() updateExpenseDto: UpdateExpenseDto) {
    return this.expenseService.update(id, req.user.userId, updateExpenseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.expenseService.remove(id, req.user.userId);
  }
}
