using OpenElective.Models;

namespace OpenElective.Services.Interfaces
{
    public interface ISubjectService
    {
        public Subject Get(Guid openElectiveId,Guid subjectId);

        public Subject Get(Guid subjectId);

        public Subject Create(Subject subject);

        public Subject Update(Subject subject);

        public Subject Delete(Guid openElectiveId, Guid subjectId);

        public IEnumerable<Subject> GetAll(Guid openElectiveId);
    }
}
