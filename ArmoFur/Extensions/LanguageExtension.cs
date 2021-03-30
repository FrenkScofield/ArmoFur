using ArmoFur.Models.BLL;
using ArmoFur.Models.DAL;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ArmoFur.Extensions
{
    public static class LanguageExtension
    {
        public static bool IsLanguageAddedToSession(this HttpContext context, string key)
        {
            int langId = Convert.ToInt32(context.Session.GetString(key));
            return langId != 0;
        }
        public async static Task<Language> GetCurrentLanguageAsync(this HttpContext context, MyContext db, string key)
        {
            int langId = Convert.ToInt32(context.Session.GetString(key));
            Language language = await db.Languages.Where(l => langId != 0 ? (l.Id == langId) : (l.Code == "az-Latn")).FirstOrDefaultAsync();
            return language;
        }
        public async static Task<int> GetCurrentLanguageIdAsync(this HttpContext context, MyContext db, string key)
        {
            int langId = Convert.ToInt32(context.Session.GetString(key));
            Language language = await db.Languages.Where(l => langId != 0 ? (l.Id == langId) : (l.Code == "az-Latn")).FirstOrDefaultAsync();
            return language.Id;
        }
        public async static Task SetLanguageAsync(this HttpContext _context, MyContext db, string key, string culture)
        {
            Language language = await db.Languages.Where(l => culture != null ? (l.Code == culture) : (l.Code == "az-Latn")).FirstOrDefaultAsync();
            _context.Session.SetString(key, language.Id.ToString());


        }

    }
}
