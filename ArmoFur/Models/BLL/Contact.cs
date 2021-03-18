using ArmoFur.Models.BLL.Translate;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ArmoFur.Models.BLL
{
    public class Contact : CoreEntity
    {
        public string Address { get; set; }
        public int Phone { get; set; }
        public string Email { get; set; }
        public string Facebook { get; set; }
        public string Instagram { get; set; }
        public string VK { get; set; }

        public virtual ICollection<ContactTranslate> ContactTranslates { get; set; }

    }
}
