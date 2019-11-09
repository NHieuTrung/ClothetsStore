using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Models;
using Models.Helpers;
using Models.ViewModels;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Repositories
{
    public class AccountRepository : BaseRepository<Account>
    {
        private readonly ClothetsStoreContext ctx;

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

        public async Task<Account> GetAccountByUsername(string username)
        {
            Account account = await ctx.Account.Where(a => a.Username == username)
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

        public async Task<string> AuthenticateAccount(Account account, AppSettings appSettings)
        {
            string token = Authenticate(account, appSettings);

            if(token == null)
            {
                return "";
            }
            
            return token;
        }

        public string Authenticate(Account account, AppSettings appSettings)
        {
            Account accountAuthenticated = ctx.Account.Where(a => a.Username == account.Username && a.Password == account.Password)
                                                      .Include(a => a.Role)
                                                      .FirstOrDefault();

            // return null if user not found
            if (accountAuthenticated == null)
            {
                return null;
            }

            else
            {
                Customer customer = ctx.Customer.Where(c => c.AccountId == accountAuthenticated.AccountId).FirstOrDefault();

                // authentication successful so generate jwt token
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(appSettings.Secret);
                //var key = Encoding.ASCII.GetBytes("a");
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim(ClaimTypes.Name, customer.Name),
                        new Claim(ClaimTypes.Email, customer.Email.ToString()),
                        new Claim(ClaimTypes.NameIdentifier, customer.CustomerId.ToString()),
                        new Claim(ClaimTypes.Role, accountAuthenticated.Role.Name),
                    }),
                    Expires = DateTime.UtcNow.AddDays(7),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };
                SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);
                return tokenHandler.WriteToken(token);
            }
        }

        public void Test()
        {
            List<ProductVM> list = new List<ProductVM>();

            List<Guid> orderProductIdList = ctx.OrderProductSize.GroupBy(p => p.ProductId)
                                                                .Distinct()
                                                                .Select(p => p.Key)
                                                                .ToList();

            Dictionary<Guid, int> slsp = new Dictionary<Guid, int>();
            foreach(var item in orderProductIdList)
            {
                int sl = ctx.OrderProductSize.Where(s => s.ProductId == item)
                                             .ToList()
                                             .Count;

                slsp.Add(item, sl);
            }

            slsp = slsp.OrderByDescending(s => s.Value).ToDictionary(x => x.Key, x => x.Value);

            foreach(var item in slsp)
            {
                list.Add(ctx.ProductColor.Where(s => s.ProductId == item.Key).Select(p => new ProductVM
                {
                    ProductId = p.Product.ProductId,
                    Name = p.Product.Name,
                    Price = p.Product.Price,
                    Discount = p.Product.Discount,
                    ImageUrl = p.ImageUrl
                }).FirstOrDefault());
            }

        }
    }
}
