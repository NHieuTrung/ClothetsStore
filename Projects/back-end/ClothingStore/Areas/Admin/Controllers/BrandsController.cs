using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ClothingStore.Areas.Admin.Helper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

namespace ClothingStore.Areas.Admin.Controllers
{
    [Authorize(Roles = Constrain.CustomRoles.Administrator + "," + Constrain.CustomRoles.NhapKho)]
    [Route("api/admin/[controller]")]
    [ApiController]
    public class BrandsController : ControllerBase
    {
        private readonly ClothetsStoreContext _context;

        public BrandsController(ClothetsStoreContext context)
        {
            _context = context;
        }

        // GET: api/Brands
        [HttpGet]
        public IEnumerable<Brand> GetBrand()
        {
            Guid activeId = new Guid("87577063-322E-4901-98D2-FF519341D992");
            return _context.Brand.Where(m => m.StatusId == activeId);
        }

        // GET: api/Brands/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetBrand([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var brand = await _context.Brand.FindAsync(id);

            if (brand == null)
            {
                return NotFound();
            }

            return Ok(brand);
        }

        // PUT: api/Brands/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBrand([FromRoute] Guid id, [FromBody] Brand brand)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != brand.BrandId)
            {
                return BadRequest();
            }
            string prevBrandName = _context.Brand.Where(m => m.BrandId == id).Select(m => m.Name).FirstOrDefault();
            if (prevBrandName != brand.Name && _context.Brand.Where(m => m.Name == brand.Name).Count() > 0)
            {
                return BadRequest();
            }
            brand.StatusId = new Guid("87577063-322E-4901-98D2-FF519341D992");

            _context.Entry(brand).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BrandExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Brands
        [HttpPost]
        public async Task<IActionResult> PostBrand([FromBody] Brand brand)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (_context.Brand.Where(m => m.Name == brand.Name).Count() > 0)
            {
                return BadRequest();
            }
            brand.StatusId = new Guid("87577063-322E-4901-98D2-FF519341D992");

            _context.Brand.Add(brand);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBrand", new { id = brand.BrandId }, brand);
        }

        // DELETE: api/Brands/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBrand([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var brand = await _context.Brand.FindAsync(id);
            if (brand == null)
            {
                return NotFound();
            }

            brand.StatusId = new Guid("1C55F3C2-D7ED-4B82-8F18-480062D092A1");
            await _context.SaveChangesAsync();

            return Ok(brand);
        }

        private bool BrandExists(Guid id)
        {
            return _context.Brand.Any(e => e.BrandId == id);
        }
    }
}