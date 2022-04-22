using OpenElective.Models;

namespace OpenElective.Services.Interfaces
{
    public interface IStudentService
    {
        public Student Get(string RollNumber);

        public IEnumerable<Student> GetAll();

        public Student Create(Student student);
        public Student Update(Student student);
        public Student Delete(Student student);

        public IEnumerable<Student> GetFilled();
        public IEnumerable<Student> GetUnFilled();
        
        public string Authenticate(string RollNumber, string password);


    
    }
}
