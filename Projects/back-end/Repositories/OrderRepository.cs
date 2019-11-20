﻿using Microsoft.EntityFrameworkCore;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories
{
    public class OrderRepository:BaseRepository<Order>
    {
        private readonly ClothetsStoreContext ctx;
        private ProductRepository productRepository = new ProductRepository();
        //private ProductSizeRepository productSizeRepository = new ProductSizeRepository();

        public OrderRepository()
        {
            this.ctx = new ClothetsStoreContext();
        }
        public OrderRepository(ClothetsStoreContext ctx)
        {
            this.ctx = ctx;
        }
        public async Task<bool> CreateOrder(Order order)
        {
            //Order
            DateTime date = new DateTime();

            Order tempOrder = new Order();
            tempOrder.OrderId = Guid.NewGuid();
            tempOrder.CustomerId = order.CustomerId;
            tempOrder.CreatedDate = date;
            tempOrder.TotalPrice = order.TotalPrice;
            tempOrder.ContactPhone = order.ContactPhone;
            tempOrder.DeliveryName = order.DeliveryName;
            tempOrder.DeliveryEmail = order.DeliveryEmail;
            tempOrder.DeliveryAddress = order.DeliveryAddress;
            tempOrder.TotalPrice = order.TotalPrice;
            tempOrder.DeliveryPrice = order.DeliveryPrice;
            tempOrder.DeliveryDate = date;
            tempOrder.StatusId = Guid.Parse("A1AD8DEF-626A-4A06-B39C-956B6255C37C"); //Chưa thanh toán

            ctx.Order.Add(tempOrder);
            await ctx.SaveChangesAsync();

            //OrderDetail
            foreach(OrderProductSize item in order.OrderProductSize)
            {
                //Lấy giá
                Product product = new Product();
                product = await productRepository.GetById(item.ProductId);

                //OrderDetail
                OrderProductSize orderProductSize = new OrderProductSize();
                orderProductSize.OrderId = tempOrder.OrderId;
                orderProductSize.SizeId = item.SizeId;
                orderProductSize.ProductId = item.ProductId;
                orderProductSize.ColorId = item.ColorId;
                orderProductSize.Quantity = item.Quantity;
                orderProductSize.Price = product.Discount == 0 ? product.Price * item.Quantity : (product.Price - (product.Price / 100 * (decimal)product.Discount)) * item.Quantity;

                ctx.OrderProductSize.Add(orderProductSize);
                await ctx.SaveChangesAsync();

                //Trừ số lượng
                ProductSize productSize = new ProductSize();
                productSize = await ctx.ProductSize.Where(p => p.ColorId == item.ColorId && p.SizeId == item.SizeId && p.ProductId == item.ProductId)
                                                   .FirstOrDefaultAsync();

                productSize.InventoryQuantity = productSize.InventoryQuantity - item.Quantity;
                await ctx.SaveChangesAsync();
            }

            return true;
        }
    }
}
