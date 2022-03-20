using OpenElective.Models;
using OpenElective.Services.Interfaces;

namespace OpenElective.Services
{
    public class StudentService : IStudentService
    {
        private readonly AppDbContext appDbContext;

        public StudentService(AppDbContext appDbContext)
        {
            this.appDbContext = appDbContext;
        }
        public Student Create(Student student)
        {
            appDbContext.Students.Add(student);
            appDbContext.SaveChanges();
            var created = appDbContext.Students.FirstOrDefault(s => s.RollNumber == student.RollNumber);
            return student;
        }

        public Student Delete(Student student)
        {
            throw new NotImplementedException();
        }

        public Student Get(string RollNumber)
        {
            return appDbContext.Students.FirstOrDefault(s=>s.RollNumber == RollNumber);
        }

        public IEnumerable<Student> GetAll()
        {
            return appDbContext.Students.ToList();
        }

        public Student Update(Student student)
        {
            throw new NotImplementedException();
        }
    }
}
