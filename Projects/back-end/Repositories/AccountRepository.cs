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
    public class AccountRepository : BaseRepository<Account>
    {
        private readonly ClothetsStoreContext ctx;
        private readonly CustomerRepository customerRepository = new CustomerRepository();

        public AccountRepository()
        {
            this.ctx = new ClothetsStoreContext();
        }

        public AccountRepository(ClothetsStoreContext ctx)
        {
            this.ctx = ctx;
        }

        public override async Task<IList<Account>> GetAll()
        {
            return await ctx.Account.ToListAsync();
        }

        public override async Task<Account> GetById(Guid id)
        {
            Account account = await ctx.Account.Where(p => p.AccountId == id)
                                               .FirstOrDefaultAsync();

            return account;
        }

        public async Task<bool> CheckAvailability(string username)
        {
            Account account = await ctx.Account.Where(ac => ac.Username == username)
                                               .FirstOrDefaultAsync();

            return account == null ? true : false;
        }

        public async Task<bool> CheckEmailAvailability(string email)
        {
            Customer customer = await ctx.Customer.Where(c => c.Email == email)
                                                  .FirstOrDefaultAsync();

            return customer == null ? true : false;
        }

        public async Task<bool> CreateCustomerAccount(Account account)
        {
            account.AccountId = Guid.NewGuid();
            account.RoleId = Guid.Parse("E1BDF26E-230C-42FE-BC87-084FB7753835"); //Customer
            account.StatusId = Guid.Parse("87577063-322E-4901-98D2-FF519341D992");
            ctx.Account.Add(account);
            await ctx.SaveChangesAsync();

            return true;
        }

        public async Task<bool> CreateCustomerAccountAndCustomer(AccountCustomerVM accountCustomer)
        {
            Account account = new Account();
            account.AccountId = Guid.NewGuid();
            account.Username = accountCustomer.Username;
            account.Password = accountCustomer.Password;
            account.RoleId = Guid.Parse("E1BDF26E-230C-42FE-BC87-084FB7753835"); //Customer
            account.StatusId = Guid.Parse("87577063-322E-4901-98D2-FF519341D992");
            ctx.Account.Add(account);
            await ctx.SaveChangesAsync();

            Customer customer = new Customer();
            customer.CustomerId = Guid.NewGuid();
            customer.Name = accountCustomer.Name;
            customer.Phone = accountCustomer.Phone;
            customer.GenderId = accountCustomer.GenderId;
            customer.Address = accountCustomer.Address;
            customer.Birthday = accountCustomer.Birthday;
            customer.Email = accountCustomer.Email;
            customer.AccountId = account.AccountId;
            ctx.Customer.Add(customer);
            await ctx.SaveChangesAsync();

            return true;
        }
    }
}
