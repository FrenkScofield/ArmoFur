using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ArmoFur.Controllers
{
    public class WomanCollectionController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
