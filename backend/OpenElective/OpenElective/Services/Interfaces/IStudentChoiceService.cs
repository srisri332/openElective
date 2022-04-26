using OpenElective.Models;

namespace OpenElective.Services.Interfaces
{
    public interface IStudentChoiceService
    {
        

        public IEnumerable<StudentChoice> GetAll();

        public StudentChoice Get(Guid Id);

        public StudentChoice Get(string rollnumber,Guid subId);



        public IEnumerable<StudentChoice> Get(string RollNumber);

        public StudentChoice Create(StudentChoice studentChoice);

        public StudentChoice Update(StudentChoice studentChoice);

        public StudentChoice Delete(StudentChoice studentChoice);
    }
}
