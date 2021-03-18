using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ArmoFur.Models.BLL.Translate
{
    public class StoreTranslate : CoreEntity
    {
        public string City { get; set; }
        public string Description { get; set; }
        public string StoreName { get; set; }

        public int Storeid { get; set; }
        public int Languageid { get; set; }

        public virtual Contact Contact { get; set; }
        public virtual Language Language { get; set; }
    }
}
