using Microsoft.EntityFrameworkCore;
using Models;
using Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories
{
    public class StatisticsRepository
    {
        private readonly ClothetsStoreContext ctx;

        public StatisticsRepository()
        {
            this.ctx = new ClothetsStoreContext();
        }

        public StatisticsRepository(ClothetsStoreContext ctx)
        {
            this.ctx = ctx;
        }

        public async Task<MonthlyEarningsVM> GetMonthlyEarnings()
        {
            List<Order> orders = await ctx.Order.Where(o => o.StatusId == Guid.Parse("F2983653-F040-43D8-BDE0-D80B2F8BA7AA")) //Đã thanh toán
                                                .ToListAsync();

            decimal totalEarnings = orders.Sum(o => o.TotalPrice);

            DateTime firstDate = orders.OrderBy(o => o.DeliveryDate)
                                       .Select(o => o.DeliveryDate)
                                       .FirstOrDefault();

            DateTime now = DateTime.Now;

            int months = ((now.Year - firstDate.Year) * 12) + now.Month - firstDate.Month;

            MonthlyEarningsVM monthlyEarningsVM = new MonthlyEarningsVM();
            monthlyEarningsVM.Earnings = totalEarnings / months;

            return monthlyEarningsVM;
        }

        public async Task<YearlyEarningsVM> GetYearlyEarnings()
        {
            List<Order> orders = await ctx.Order.Where(o => o.StatusId == Guid.Parse("F2983653-F040-43D8-BDE0-D80B2F8BA7AA")) //Đã thanh toán
                                                .ToListAsync();

            decimal totalEarnings = orders.Sum(o => o.TotalPrice);

            DateTime firstDate = orders.OrderBy(o => o.DeliveryDate)
                                       .Select(o => o.DeliveryDate)
                                       .FirstOrDefault();

            DateTime now = DateTime.Now;

            int years = now.Year - firstDate.Year + 1;

            YearlyEarningsVM yearlyEarningsVM = new YearlyEarningsVM();
            yearlyEarningsVM.Earnings = totalEarnings / years;

            return yearlyEarningsVM;
        }

        public async Task<CompletedPercentageVM> GetCompletedPercentage()
        {
            int completedOrders = await ctx.Order.Where(o => o.StatusId == Guid.Parse("F2983653-F040-43D8-BDE0-D80B2F8BA7AA")) //Đã thanh toán
                                                 .CountAsync();

            int allOrders = await ctx.Order.Where(o => o.StatusId != Guid.Parse("C9137E0B-0E56-4F96-8916-5DBF76B15736")) //Đã huỷ
                                           .CountAsync();

            CompletedPercentageVM completedPercentageVM = new CompletedPercentageVM();
            completedPercentageVM.Percentage = int.Parse(Math.Round(((float)completedOrders / allOrders) * 100).ToString());

            return completedPercentageVM;
        }

        public async Task<PendingOrdersVM> GetPendingOrders()
        {
            int incompletedOrders = await ctx.Order.Where(o => o.StatusId != Guid.Parse("C9137E0B-0E56-4F96-8916-5DBF76B15736") && o.StatusId != Guid.Parse("F2983653-F040-43D8-BDE0-D80B2F8BA7AA")) //Đã huỷ
                                                   .CountAsync();

            PendingOrdersVM pendingOrdersVM = new PendingOrdersVM();
            pendingOrdersVM.numberOfOrders = incompletedOrders;

            return pendingOrdersVM;
        }
    }
}
