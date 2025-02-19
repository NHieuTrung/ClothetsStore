﻿using Microsoft.EntityFrameworkCore;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories
{
    public class BrandRepository : BaseRepository<Brand>
    {
        private readonly ClothetsStoreContext ctx;

        public BrandRepository()
        {
            this.ctx = new ClothetsStoreContext();
        }

        public BrandRepository(ClothetsStoreContext ctx)
        {
            this.ctx = ctx;
        }

        public override async Task<IList<Brand>> GetAll()
        {
            return await ctx.Brand.ToListAsync();
        }

        public override async Task<Brand> GetById(Guid id)
        {
            Brand brand = await ctx.Brand.Where(p => p.BrandId == id)
                                         .FirstOrDefaultAsync();

            return brand;
        }
    }
}
