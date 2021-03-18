using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace ArmoFur.Areas.WebCms.Controllers
{
    public class AdminHomeController : Controller
    {
        [Area("WebCms")]
        [Route("WebCms/")]
        //[Route("WebCms/[controller]/[action]")]
        public IActionResult Index()    
        {
            return View();
        }
    }
}
