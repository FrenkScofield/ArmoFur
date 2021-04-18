using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ArmoFur.Models.BLL;
using ArmoFur.Models.BLL.Translate;
using ArmoFur.Models.DAL;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ArmoFur.Areas.WebCms.Controllers
{
    [Area("WebCms")]
    //[Route("WebCms/")]
    [Route("WebCms/[controller]/[action]")]
    public class LanguagesController : Controller
    {
        private readonly MyContext _context;

        public LanguagesController(MyContext context)
        {
            _context = context;
        }
        //Language index Function Start
        public async Task<IActionResult> Index()
        {
            return View(await _context.Languages.OrderBy(x => x.OrderBy).ToListAsync());
        }
        //Language index Function End

        //Language create page Start
        public IActionResult Create()
        {
            return View();
        }
        //Post Start
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(Language language)
        {
            if (ModelState.IsValid)
            {
                var result = _context.Add(language);
                await _context.SaveChangesAsync();
                foreach (var item in _context.AboutQualities)
                {
                    _context.AboutQualityTranslates.Add(new AboutQualityTranslate()
                    {
                        AboutQualityid = item.Id,
                        Languageid = result.Entity.Id
                    });
                }
                foreach (var item in _context.Abouts)
                {
                    _context.AboutTranslates.Add(new AboutTranslate()
                    {
                        Aboutid= item.Id,
                        Languageid = result.Entity.Id
                    });
                }
                foreach (var item in _context.Contacts)
                {
                    _context.ContactTranslates.Add(new ContactTranslate()
                    {
                        Contactid = item.Id,
                        Languageid = result.Entity.Id
                    });
                }
                foreach (var item in _context.Stores)
                {
                    _context.StoreTranslates.Add(new StoreTranslate()
                    {
                        Storeid = item.Id,
                        Languageid = result.Entity.Id
                    });
                }
               
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(language);
        }
        //Language create page End

        //Language edit page Start
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var language = await _context.Languages.FindAsync(id);
            if (language == null)
            {
                return NotFound();
            }
            return View(language);
        }
        //Post Start
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, Language language)
        {
            if (id != language.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(language);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!LanguageExists(language.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(language);
        }

        private bool LanguageExists(int id)
        {
            return _context.Languages.Any(e => e.Id == id);
        }
        //Language edit page End

        //Language delete page Start
        public async Task<IActionResult> Delete(int id)
        {
            var language = await _context.Languages.FindAsync(id);
            _context.Languages.Remove(language);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }
        //Language delete page End
    }
}
