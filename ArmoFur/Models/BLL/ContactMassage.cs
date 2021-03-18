using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ArmoFur.Models.BLL
{
    public class ContactMassage :CoreEntity
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public int Phone { get; set; }
        public string Massage { get; set; }
    }
}
