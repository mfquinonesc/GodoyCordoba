using backend.Data;

namespace backend.Services
{
    public class Service
    {
        protected readonly UsuarioDbContext _context;

        public Service(UsuarioDbContext c)
        {
            this._context = c;
        }

    }
}