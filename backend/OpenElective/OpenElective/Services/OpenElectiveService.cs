using Microsoft.EntityFrameworkCore;
using OpenElective.Models;
using OpenElective.Services.Interfaces;

namespace OpenElective.Services
{
    public class OpenElectiveService : IOpenElectiveService
    {
        private readonly AppDbContext appDbContext;

        public OpenElectiveService(AppDbContext appDbContext)
        {
            this.appDbContext = appDbContext;
        }
        public Models.OpenElective Create(Models.OpenElective openElective)
        {
            appDbContext.OpenElectives.Add(openElective);
            appDbContext.SaveChanges();
            var created = appDbContext.OpenElectives.FirstOrDefault(o => o.Id == openElective.Id);
            return created;
        }

        public Models.OpenElective Delete(Guid Id)
        {
            var OE = Get(Id);
            appDbContext.OpenElectives.Remove(OE);
            appDbContext.SaveChanges();
            return OE;
        }

        public Models.OpenElective Get(Guid Id)
        {
            return appDbContext.OpenElectives.FirstOrDefault(o => (o.Id == Id) );
        }

        public IEnumerable<Models.OpenElective> GetAll()
        {
            return appDbContext.OpenElectives
                .Include(o => o.Subjects)
                .ToList();
        }

        public Models.OpenElective Update(Models.OpenElective openElective)
        {
            appDbContext.OpenElectives.Attach(openElective);
            appDbContext.SaveChanges();
            return openElective;
        }
    }
}
