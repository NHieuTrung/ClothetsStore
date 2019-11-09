using Microsoft.Extensions.Options;
using Models;
using Models.Helpers;
using Models.ViewModels;
using Repositories;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class AccountService : BaseService<Account, AccountRepository>
    {
        private readonly ClothetsStoreContext context;
        private readonly AppSettings appSettings;
        AccountRepository accountRepository = new AccountRepository();

        public AccountService(ClothetsStoreContext context, IOptions<AppSettings> appSettings)
        {
            this.context = context;
            this.appSettings = appSettings.Value;
        }
        
        public string Authenticate(Account account)
        {
            return "";
        }
            public async Task<Account> GetAccountByUsername(string username)
        {
            if(username == "")
            {
                Account account = new Account();
                return account;
            }

            return await accountRepository.GetAccountByUsername(username);
        }

        public async Task<bool> CheckAvailability(string username)
        {
            if(username == "")
            {
                return false;
            }

            return await accountRepository.CheckAvailability(username);
        }

        public async Task<bool> CheckEmailAvailability(string email)
        {
            if(email == "")
            {
                return false;
            }

            return await accountRepository.CheckEmailAvailability(email);
        }

        public async Task<bool> CreateCustomerAccount(Account account)
        {
            account.Password = HashPassword(account.Password);
            return await accountRepository.CreateCustomerAccount(account);
        }

        public async Task<bool> CreateCustomerAccountAndCustomer(AccountCustomerVM accountCustomer)
        {
            accountCustomer.Password = HashPassword(accountCustomer.Password);
            return await accountRepository.CreateCustomerAccountAndCustomer(accountCustomer);
        }

        public async Task<string> AuthenticateAccount(Account account)
        {
            account.Password = HashPassword(account.Password);
            return await accountRepository.AuthenticateAccount(account, this.appSettings);
        }

        public string HashPassword(string password)
        {
            string hashedPassword = "";

            using (var sha256 = SHA256.Create())
            {
                // Send a sample text to hash.  
                var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                // Get the hashed string.  
                hashedPassword = BitConverter.ToString(hashedBytes).Replace("-", "");
            }

            return hashedPassword;
        }
    }
}
