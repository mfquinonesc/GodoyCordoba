using Microsoft.AspNetCore.Mvc;
using backend.Models;

namespace backend
{
    [ApiController]
    [Route("[controller]")]
    public class UsuarioController : ControllerBase
    {
        private readonly UsuarioService _service;
        public UsuarioController(UsuarioService service)
        {
            this._service =  service;
        }


        [HttpPost]
        public dynamic Create(Usuario usuario)
        {
            return this._service.Create(usuario);
        }


        [HttpPut]
        [Route("{id}")]
        public dynamic Update(Usuario usuario, int id)
        {
            return this._service.Update(usuario, id);
        }


        [HttpDelete]
        [Route("{id}")]
        public dynamic Delete (int id)
        {
            return this._service.Delete(id);
        }

        [HttpGet]
        [Route("{id}")]
        public dynamic Get(int id)
        {
            return this._service.Get(id);
        }


        [HttpGet]
        public dynamic GetAll()
        {
            return this._service.GetAll();
        }


        [HttpPost]
        [Route("login")]
        public dynamic Login(LoginDto dto)
        {
            return this._service.Login(dto);
        }

    }
}