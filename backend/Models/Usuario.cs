using System;
using System.Collections.Generic;

namespace backend.Models
{
    public partial class Usuario
    {
        public int UsuarioId { get; set; }
        public string Nombre { get; set; } = null!;
        public string Apellido { get; set; } = null!;
        public int Cedula { get; set; }
        public string Correo { get; set; } = null!;
        public string Contrasena { get; set; } = null!;
        public DateTime? UltimoAcceso { get; set; }
        public int? Puntaje { get; set; }
    }
}
