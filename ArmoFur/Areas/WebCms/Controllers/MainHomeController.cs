using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ArmoFur.Extensions;
using ArmoFur.Models.BLL;
using ArmoFur.Models.BLL.Translate;
using ArmoFur.Models.DAL;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ArmoFur.Areas.WebCms.Controllers
{
    [Area("WebCms")]
    //[Route("WebCms/")]
    [Route("WebCms/[controller]/[action]")]
    public class MainHomeController : Controller
    {
        private readonly MyContext _context;
        public IFileUpload _upload;
        public readonly IWebHostEnvironment _env;

        public MainHomeController(MyContext context, 
                                 IFileUpload upload,
                                  IWebHostEnvironment env)
        {
            _context = context;
            _upload = upload;
            _env = env;
        }
        //Homa index page Start
        public async Task<IActionResult> Index()
        {
            return View(await _context.MainPages.ToListAsync());
        }
        //Homa index page End

        //Homa Create page Start
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(MainPage mainpage ,IFormFile file)
        {
            if (ModelState.IsValid)
            {
                if (file != null)
                {

                    mainpage.Videocode = await _upload.Create(_env.WebRootPath, file, "File", "video", mainpage.Videocode);

                }
                var result = await _context.AddAsync(mainpage);
                await _context.SaveChangesAsync();
            }
            return RedirectToAction("Index");
        }
        //Homa Create page End


    }
}
