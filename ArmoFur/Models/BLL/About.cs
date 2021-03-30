using ArmoFur.Models.BLL.Translate;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ArmoFur.Models.BLL
{
    public class About : CoreEntity
    {
        public int FileId { get; set; }
        public virtual File File { get; set; }
        public virtual ICollection<AboutTranslate> AboutTranslates { get; set; }
    }
}
