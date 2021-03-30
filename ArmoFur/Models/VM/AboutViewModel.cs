using ArmoFur.Models.BLL;
using ArmoFur.Models.BLL.Translate;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ArmoFur.Models.VM
{
    public class AboutViewModel
    {
        public About About { get; set; }
        public List<About> Abouts { get; set; }

        public File File { get; set; }

        public IFormFile Photo { get; set; }
        public AboutTranslate AboutTranslate { get; set; }
        public List<AboutTranslate> AboutTranslates { get; set; }

    }
}
