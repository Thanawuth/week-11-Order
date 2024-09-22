import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private odersRepository: Repository<Order>,
  ) {}
  create(createOrderDto: CreateOrderDto) {
    const newORder = new Order();
    newORder.email = createOrderDto.email;
    newORder.productId = createOrderDto.productId;
    newORder.status = 'draft';
    return this.odersRepository.save(newORder);
  }

  findAll() {
    return this.odersRepository.find();
  }

  findOne(id: number) {
    return this.odersRepository.findOne({ where: { id: id } });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.findOne(id);
    const updateOrder = { ...order, ...updateOrderDto };
    return this.odersRepository.save(updateOrder);
  }

  remove(id: number) {
    return this.odersRepository.delete(id);
  }
}
