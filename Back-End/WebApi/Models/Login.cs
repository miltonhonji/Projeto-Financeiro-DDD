using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models
{
    public class Login
    {
        public string email { get; set; }
        public string senha { get; set; }
        public string cpf { get; set; }
    }
}