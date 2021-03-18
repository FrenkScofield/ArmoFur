using ArmoFur.Models.BLL.Translate;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ArmoFur.Models.BLL
{
    public class Language:CoreEntity
    {
        [MaxLength(25)]
        public string ShortName { get; set; }
        [MaxLength(25)]
        public string Code { get; set; }
        [MaxLength(70)]
        public string Name { get; set; }

        public virtual ICollection<AboutTranslate> AboutTranslates { get; set; }
        public virtual ICollection<AboutQualityTranslate> AboutQualityTranslates { get; set; }
        public virtual ICollection<ContactTranslate> ContactTranslates { get; set; }
        public virtual ICollection<StoreTranslate> StoreTranslates { get; set; }
    }
}
