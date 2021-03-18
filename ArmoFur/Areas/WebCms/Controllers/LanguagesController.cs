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
                //foreach (var item in _context.Seos)
                //{
                //    _context.SeoTranslates.Add(new SeoTranslate()
                //    {
                //        SeoId = item.Id,
                //        LanguageId = result.Entity.Id
                //    });
                //}
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(language);
        }
        //Language create page End

    }
}
