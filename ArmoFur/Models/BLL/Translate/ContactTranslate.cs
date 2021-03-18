using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ArmoFur.Models.BLL.Translate
{
    public class ContactTranslate : CoreEntity
    {
        public string Description { get; set; }

        public int Contactid { get; set; }
        public int Languageid { get; set; }

        public virtual Contact Contact { get; set; }
        public virtual Language Language { get; set; }
    }
}
