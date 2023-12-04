using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Interfaces.InterfaceServicos;
using Domain.Interfaces.IUsuarioSistemaFinanceiro;
using Entities.Entidades;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class UsuarioSistemaFinanceiroController : ControllerBase
    {
        private readonly InterfaceUsuarioSistemaFinanceiro _InterfaceUsuarioSistemaFinanceiro;
        private readonly IUsuarioSistemaFinanceiroServico _IUsuarioSistemaFinanceiroServico;

        public UsuarioSistemaFinanceiroController(InterfaceUsuarioSistemaFinanceiro InterfaceUsuarioSistemaFinanceiro,
            IUsuarioSistemaFinanceiroServico IUsuarioSistemaFinanceiroServico)
        {
            _InterfaceUsuarioSistemaFinanceiro = InterfaceUsuarioSistemaFinanceiro;
            _IUsuarioSistemaFinanceiroServico = IUsuarioSistemaFinanceiroServico;
        }   

        [HttpGet("/api/ListarUsuariosSistema")]
        [Produces("application/json")]
        public async Task<object> ListaSistemasUsuario(int idSistema)
        {
            return await _InterfaceUsuarioSistemaFinanceiro.ListarUsuariosSistema(idSistema);
        }

        [HttpPost("/api/CadastrarUsuarioNoSistema")]
        [Produces("application/json")]
        public async Task<object> CadastrarUsuarioNoSistema(int idSistema, string emailUsuario)
        {
            try
            {
                await _IUsuarioSistemaFinanceiroServico.CadastrarUsuarioNoSistema(
                    new UsuarioSistemaFinanceiro
                    {
                        IdSistema = idSistema,
                        EmailUsuario = emailUsuario,
                        Administrador = false,
                        SistemaAtual = true
                    });   
            }
            catch (Exception)
            {             
                return Task.FromResult(false);
            }

            return Task.FromResult(true);
        }

        [HttpGet("/api/DeleteUsuarioNoSistema")]
        [Produces("application/json")]
        public async Task<object> DeleteUsuarioNoSistema(int id)
        {
            try
            {
                var usuarioSistemaFinanceiro = await _InterfaceUsuarioSistemaFinanceiro.GetEntityById(id);
                return _InterfaceUsuarioSistemaFinanceiro.Delete(usuarioSistemaFinanceiro);
            }
            catch (Exception)
            {             
                await Task.FromResult(false);
            }

            return Task.FromResult(true);
        }
    }
}