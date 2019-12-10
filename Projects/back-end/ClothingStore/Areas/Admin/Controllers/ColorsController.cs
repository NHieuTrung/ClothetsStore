using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

namespace ClothingStore.Areas.Admin.Controllers
{
    [Route("api/admin/[controller]")]
    [ApiController]
    public class ColorsController : ControllerBase
    {
        private readonly ClothetsStoreContext _context;

        public ColorsController(ClothetsStoreContext context)
        {
            _context = context;
        }

        // GET: api/Colors
        [HttpGet]
        public IEnumerable<Color> GetColor()
        {
            Guid activeId = new Guid("87577063-322E-4901-98D2-FF519341D992");
            return _context.Color.Where(m => m.StatusId == activeId);
        }

        // GET: api/Colors/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetColor([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var color = await _context.Color.FindAsync(id);

            if (color == null)
            {
                return NotFound();
            }

            return Ok(color);
        }

        // PUT: api/Colors/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutColor([FromRoute] Guid id, [FromBody] Color color)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != color.ColorId)
            {
                return BadRequest();
            }
            string prevColorValue = _context.Color.Where(m => m.ColorId == id).Select(m => m.ColorValue).FirstOrDefault();
            if (prevColorValue != color.ColorValue && _context.Color.Where(m => m.ColorValue == color.ColorValue).Count() > 0)
            {
                return BadRequest();
            }
            color.StatusId = new Guid("87577063-322E-4901-98D2-FF519341D992");
            _context.Entry(color).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ColorExists(id))
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

        // POST: api/Colors
        [HttpPost]
        public async Task<IActionResult> PostColor([FromBody] Color color)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (_context.Color.Where(m => m.ColorValue == color.ColorValue).Count() > 0)
            {
                return BadRequest();
            }
            color.StatusId = new Guid("87577063-322E-4901-98D2-FF519341D992");
            _context.Color.Add(color);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetColor", new { id = color.ColorId }, color);
        }

        // DELETE: api/Colors/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteColor([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var color = await _context.Color.FindAsync(id);
            if (color == null)
            {
                return NotFound();
            }

            color.StatusId = new Guid("1C55F3C2-D7ED-4B82-8F18-480062D092A1");
            await _context.SaveChangesAsync();

            return Ok(color);
        }

        private bool ColorExists(Guid id)
        {
            return _context.Color.Any(e => e.ColorId == id);
        }
    }
}