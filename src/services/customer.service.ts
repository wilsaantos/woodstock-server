import { prismaClient } from "../const/prisma";
import { Customer } from "../models/customer";
export class CustomerService {
  public async findById(customerId: string): Promise<Customer | null> {
    const customer: Customer | null = await prismaClient.customer.findUnique({
      where: { id: customerId },
    });

    return customer;
  }

  public async findByDocumentNumber(documentNumber: string): Promise<Customer | null> {
    const customer: Customer | null = await prismaClient.customer.findUnique({
      where: { documentNumber: documentNumber },
    });

    return customer;
  }

  async create(customer: Customer): Promise<Customer | null> {
    await prismaClient.customer.create({ data: customer });

    const createdCustomer = await prismaClient.customer.findUnique({
      where: { documentNumber: customer.documentNumber },
    });
    return createdCustomer;
  }

  async update(customer: Customer): Promise<Customer | null> {
    customer.updatedAt = new Date();
    await prismaClient.customer.update({
      data: customer,
      where: { id: customer.id },
    });
    return customer;
  }
}
