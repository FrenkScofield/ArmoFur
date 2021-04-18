using ArmoFur.Models.BLL;
using ArmoFur.Models.BLL.Translate;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ArmoFur.Models.DAL
{
    public class MyContext : IdentityDbContext
    {
        public MyContext(DbContextOptions<MyContext> options) : base(options) { }

        public DbSet<About> Abouts { get; set; }
        public DbSet<AboutQuality> AboutQualities { get; set; }
        public DbSet<Contact> Contacts { get; set; }
        public DbSet<ContactMassage> ContactMassages { get; set; }
        public DbSet<File> Files { get; set; }
        public DbSet<Language> Languages { get; set; }
        public DbSet<ManCollection> ManCollections { get; set; }
        public DbSet<QualityImage> QualityImages { get; set; }
        public DbSet<Store> Stores { get; set; }
        public DbSet<WomanCollection> WomanCollections { get; set; }
        public DbSet<MainPage> MainPages { get; set; }


        public DbSet<AboutTranslate> AboutTranslates { get; set; }
        public DbSet<AboutQualityTranslate> AboutQualityTranslates { get; set; }
        public DbSet<ContactTranslate> ContactTranslates { get; set; }
        public DbSet<StoreTranslate> StoreTranslates { get; set; }

    }
}
