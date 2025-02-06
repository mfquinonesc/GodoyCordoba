using backend.Data;
using backend.Services;
using backend.Models;
using System.Security.Cryptography;
using System.Text;

namespace backend
{
    public class UsuarioService : Service
    {
        public UsuarioService(UsuarioDbContext context) : base(context) { }

        public dynamic Create(Usuario usuario)
        {
            string message = $"El correo {usuario.Correo} ya existe";
            var user = this._context.Usuarios.Where(u => usuario.Correo == u.Correo).FirstOrDefault();
            bool status = user == null;

            if (status)
            {
                status = !String.IsNullOrEmpty(usuario.Contrasena) && !String.IsNullOrEmpty(usuario.Nombre) && !String.IsNullOrEmpty(usuario.Apellido) && usuario.Cedula > 0;

                if (status)
                {
                    usuario.Puntaje = 0;

                    int length = usuario.Nombre.Length;

                    if (length > 10)
                    {
                        usuario.Puntaje = 20;
                    }
                    else if (length >= 5 && length <= 10)
                    {
                        usuario.Puntaje = 10;
                    }

                    string dominio = usuario.Correo.Split('@')[1];

                    if (dominio == "gmail.com")
                    {
                        usuario.Puntaje += 40;
                    }
                    else if (dominio == "hotmail.com")
                    {
                        usuario.Puntaje += 20;
                    }
                    else 
                    { 
                        usuario.Puntaje += 10;
                    }

                    usuario.Contrasena = this.HashPassword(usuario.Contrasena);
                    usuario.UltimoAcceso = DateTime.Now;
                    this._context.Add(usuario);
                    this._context.SaveChanges();
                    message = "Se creó el usuario exitosamente";
                }
                else
                {
                    message = "Datos incompletos";
                }
            }

            usuario.Contrasena = "";

            return new { status, message, token = "token", user = usuario  };
        }

        public dynamic Update(Usuario usuario, int id)
        {
            var user = this._context.Usuarios.Where(u => u.UsuarioId == id && u.Correo == usuario.Correo).FirstOrDefault();
            string message = "No existe el usuario con id ";
            bool status = user != null;

            if (status)
            {
                user.Cedula = usuario.Cedula > 0 ? usuario.Cedula : user.Cedula;
                user.Nombre = !String.IsNullOrEmpty(usuario.Nombre) ? usuario.Nombre : user.Nombre;
                user.Apellido = !String.IsNullOrEmpty(usuario.Apellido) ? usuario.Apellido : user.Apellido;
                message = "Se actualizaron los datos";
                this._context.Update(user);
                this._context.SaveChanges();
            }

            return new { status, message };
        }

        public dynamic Delete(int id)
        {
            string message = $"No se encontró usuario con id {id}";
            var user = this._context.Usuarios.Where(u => u.UsuarioId == id).FirstOrDefault();

            bool status = user != null;
            if (status)
            {
                this._context.Remove(user);
                this._context.SaveChanges();
                message = $"Se eliminó el usuario con id {id}";
            }

            return new { status, message };
        }

        public dynamic Get(int id)
        {
            var user = this._context.Usuarios.Where(u => u.UsuarioId == id).FirstOrDefault();

            if (user != null)
            {
                user.Contrasena = "";
            }

            return new { user };
        }

        public dynamic GetAll()
        {
            List<Usuario> users = this._context.Usuarios.ToList();

            users.ForEach(u => u.Contrasena = "");

            return new { users };
        }

        public dynamic Login(LoginDto dto)
        {
            string message = "Correo no registrado";
            bool status = false;

            var user = this._context.Usuarios.Where(u=> u.Correo == dto.Correo).FirstOrDefault();
            
            if(user !=  null)
            {
                status = this.HashPassword(dto.Contrasena) == user.Contrasena;
                
                if (status){
                    user.UltimoAcceso = DateTime.Now;
                    this._context.Usuarios.Update(user);
                    this._context.SaveChanges(); 
                    message = "token";                   
                }else{
                    message = "Contraseña incorrecta";
                }

                user.Contrasena = "";
            }   

            return new { status, message, token="token", user };
        }

        private string HashPassword(string password)
        {
            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                return BitConverter.ToString(bytes).Replace("-", "").ToLower();
            }
        }
    }
}