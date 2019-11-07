using Models;
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

        AccountRepository accountRepository = new AccountRepository();

        public async Task<bool> CheckAvailability(string username)
        {
            return await accountRepository.CheckAvailability(username);
        }

        public async Task<bool> CheckEmailAvailability(string email)
        {
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
