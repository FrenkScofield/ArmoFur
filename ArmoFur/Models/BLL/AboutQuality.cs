using ArmoFur.Models.BLL.Translate;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ArmoFur.Models.BLL
{
    public class AboutQuality : CoreEntity
    {
        public virtual ICollection<AboutQualityTranslate> AboutQualityTranslates { get; set; }

    }
}
