using ArmoFur.Models.BLL.Translate;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ArmoFur.Models.BLL
{
    public class About : CoreEntity
    {
        public virtual ICollection<AboutTranslate> AboutTranslates { get; set; }
    }
}
