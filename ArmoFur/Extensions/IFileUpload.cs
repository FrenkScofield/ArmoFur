using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ArmoFur.Extensions
{
    public interface IFileUpload
    {
        Task<string> Create(string root, IFormFile file, string mainFolderName, string subFolderName, string Link);
    }
}
