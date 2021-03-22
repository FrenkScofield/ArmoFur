using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ArmoFur.Models.DAL;
using Microsoft.AspNetCore.Mvc;

namespace ArmoFur.Areas.WebCms.Controllers
{
    [Area("WebCms")]
    //[Route("WebCms/")]
    [Route("WebCms/[controller]/[action]")]
    public class MainHomeController : Controller
    {
        private readonly MyContext _context;

        public MainHomeController(MyContext context)
        {
            _context = context;
        }
        //Homa index page Start
        public IActionResult Index()
        {
            return View();
        }
        //Homa index page End

        //Homa Create page Start
        public IActionResult Create()
        {
            return View();
        }
        //Homa Create page End




    }
}
