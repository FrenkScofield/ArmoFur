using ArmoFur.Models.BLL;
using ArmoFur.Models.BLL.Translate;
using ArmoFur.Models.DAL;
using ArmoFur.Models.VM;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static ArmoFur.Extensions.FileExtension;

namespace ArmoFur.Areas.WebCms.Controllers
{
    [Area("WebCms")]
    [Route("WebCms/[controller]/[action]")]
    public class AboutController : Controller
    {
        private readonly MyContext _context;
        private readonly IWebHostEnvironment _env;
        public AboutController(MyContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }
        public async Task<IActionResult> Index()
        {
            AboutViewModel viewModel = new AboutViewModel()
            {
                Abouts = await _context.Abouts.OrderBy(o => o.OrderBy).Include(a => a.AboutTranslates).ToListAsync()
            };
            return View(viewModel);
        }

        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(About about, AboutViewModel viewModel, List<AboutTranslate> translates)
        {
            about.File = null;

            if (ModelState.IsValid)
            {

                if (viewModel.File == null)
                {
                    ModelState.AddModelError("File.Photo", "şəkil boş ola bilməz");
                    return View();
                }

               
                    if (!viewModel.File.Photo.IsImage())
                    {
                        ModelState.AddModelError("Photo", "şəklin tipi duzgun deyil");
                        return View();
                    }
                
                
                viewModel.File.UrlFile = await viewModel.File.Photo.SaveAsync(_env.WebRootPath, "File", "Images");
                viewModel.File.FolderName = viewModel.File.Photo.FileName;
                viewModel.File.Size = viewModel.File.Photo.Length.ToString();
                viewModel.File.CreateDate = DateTime.Now;
                about.File = null;
                await _context.Files.AddAsync(viewModel.File);
                await _context.SaveChangesAsync();

                about.FileId = viewModel.File.Id;
                var cty = await _context.AddAsync(about);
                await _context.SaveChangesAsync();

                foreach (var item in translates)
                {
                    item.Aboutid = about.Id;
                    await _context.AboutTranslates.AddAsync(item);
                }
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(about);
        }

        [HttpGet]
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            AboutViewModel viewModel = new AboutViewModel();



            viewModel.About = await _context.Abouts.Include(x => x.AboutTranslates)
                                                  .FirstOrDefaultAsync(a => a.Id == id);


            viewModel.AboutTranslates = await _context.AboutTranslates.Where(ct => ct.Aboutid == id).ToListAsync();

            return View(viewModel);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, About about, AboutViewModel viewModel, List<AboutTranslate> translates)
        {
            if (id != about.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    var aboutTranslates = await _context.AboutTranslates.Where(at => at.Aboutid == id).ToListAsync();
                    _context.Update(about);

                    for (int i = 0; i < viewModel.AboutTranslates.Count(); i++)
                    {
                        for (int j = 0; j < aboutTranslates.Count(); j++)
                        {
                            if (i == j)
                            {
                                aboutTranslates[j].Title = viewModel.AboutTranslates[i].Title;
                                aboutTranslates[j].Description = viewModel.AboutTranslates[i].Description;
                                await _context.SaveChangesAsync();
                            }
                        }
                    }
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!About(about.Id))
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
            return View(about);
        }
        private bool About(int id)
        {
            return _context.Abouts.Any(e => e.Id == id);
        }

        public async Task<IActionResult> Delete(int id)
        {
            var about = await _context.Abouts.FindAsync(id);
            _context.Abouts.Remove(about);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }
    }
}
