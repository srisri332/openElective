using OpenElective.Models;
using OpenElective.Services.Interfaces;

namespace OpenElective.Services
{
    public class SubjectService : ISubjectService
    {
        private readonly AppDbContext appDbContext;

        public SubjectService(AppDbContext appDbContext)
        {
            this.appDbContext = appDbContext;
        }
        public Subject Create(Subject subject)
        {
            appDbContext.Subjects.Add(subject);
            appDbContext.SaveChanges();
            var created = appDbContext.Subjects.FirstOrDefault(s => s.Id == subject.Id);
            return created;
        }

        public Subject Delete(Guid openElectiveId, Guid subjectId)
        {
            var sub = Get(openElectiveId, subjectId);
            appDbContext.Subjects.Remove(sub);
            appDbContext.SaveChanges();
            return sub;
        }

        public Subject Get(Guid openElectiveId, Guid subjectId)
        {
            return appDbContext.Subjects.FirstOrDefault(s => ((s.OpenElectiveId == openElectiveId) && (s.Id == subjectId)));
        }

        public IEnumerable<Subject> GetAll(Guid openElectiveId)
        {
            return appDbContext.Subjects.Where(s => s.OpenElectiveId == openElectiveId).ToList();
        }

        public Subject Update(Subject subject)
        {
            appDbContext.Subjects.Attach(subject);
            appDbContext.SaveChanges();
            var sub = appDbContext.Subjects.FirstOrDefault(s => s.Id == subject.Id);
            return sub;
        }
    }
}
