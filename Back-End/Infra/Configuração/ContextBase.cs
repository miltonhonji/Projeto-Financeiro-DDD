using System;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entities.Entidades;

namespace Infra.Configuração
{
    public class ContextBase : IdentityDbContext<ApplicationUser>
    {
        public ContextBase()
        {
            
        }
        public ContextBase( DbContextOptions options ) : base( options )
        {
        }

        public DbSet<SistemaFinanceiro> SistemaFinanceiro { set; get; }
        public DbSet<UsuarioSistemaFinanceiro> UsuarioSistemaFinanceiro { set; get; }
        public DbSet<Categoria> Categoria { set; get; }
        public DbSet<Despesa> Despesa { set; get; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if(!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(ObterStringConexao());
                base.OnConfiguring(optionsBuilder);
            }
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<ApplicationUser>().ToTable("AspNetUsers").HasKey(t => t.Id);

            base.OnModelCreating(builder);
        }

        public string ObterStringConexao()
        {
            return @"Data Source=NOMEDOSERVIDORSQLSERVER;Initial Catalog=BANCO;Integrated Security=False; User ID=USUARIO;Password=SENHA;Connect Timeout=15;Encrypt=False;TrustServerCertificate=False";
        }
    }
}