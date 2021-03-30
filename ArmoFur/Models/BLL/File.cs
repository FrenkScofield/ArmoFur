﻿using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ArmoFur.Models.BLL
{
    public class File:CoreEntity
    {
        public string FolderName { get; set; }
        public string Size { get; set; }
        public string UrlFile { get; set; }
        [NotMapped]
        public IFormFile Photo { get; set; }
        public DateTime? CreateDate { get; set; }
        public int Type { get; set; }
        public string LinkFile { get; set; }

        public virtual ICollection<About> Abouts { get; set; }
    }
}
