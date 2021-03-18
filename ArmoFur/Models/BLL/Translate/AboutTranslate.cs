using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ArmoFur.Models.BLL.Translate
{
    public class AboutTranslate : CoreEntity
    {
        public string Title { get; set; }
        public string Description { get; set; }

        public int Aboutid { get; set; }
        public int Languageid { get; set; }

        public virtual About About { get; set; }
        public virtual Language Language { get; set; }

    }
}
