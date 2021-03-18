using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ArmoFur.Models.BLL.Translate
{
    public class AboutQualityTranslate : CoreEntity
    {
        public string Description { get; set; }

        public int AboutQualityid { get; set; }
        public int Languageid { get; set; }

        public virtual AboutQuality AboutQuality { get; set; }
        public virtual Language Language { get; set; }
    }
}
