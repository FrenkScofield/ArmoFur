using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ArmoFur.Models.BLL
{
    public class File:CoreEntity
    {
        public string FolderName { get; set; }
        public string Size { get; set; }
        public string UrlFile { get; set; }
        public DateTime? CreateDate { get; set; }
        public int Type { get; set; }
        public string LinkFile { get; set; }
    }
}
