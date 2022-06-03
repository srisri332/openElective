using OpenElective.Models;
using OpenElective.Services.Interfaces;

namespace OpenElective.Services
{
    public class StudentChoiceService : IStudentChoiceService
    {
        private readonly AppDbContext appDbContext;

        public StudentChoiceService(AppDbContext appDbContext)
        {
            this.appDbContext = appDbContext;
        }
        public StudentChoice Create(StudentChoice studentChoice)
        {
            appDbContext.StudentChoices.Add(studentChoice);
            appDbContext.SaveChanges();
            var created = appDbContext.StudentChoices.FirstOrDefault(sc => sc.Id == studentChoice.Id);
            if (created == null)
            {
#pragma warning disable CS8603 // Possible null reference return.
                return null;
#pragma warning restore CS8603 // Possible null reference return.
            }
            return created;
        }

        public StudentChoice Delete(StudentChoice studentChoice)
        {
            var sc=Get(studentChoice.Id);
            appDbContext.StudentChoices.Remove(sc);
            appDbContext.SaveChanges();
            return studentChoice;
        }


        public StudentChoice Get( Guid Id)
        {
            StudentChoice sc=appDbContext.StudentChoices.FirstOrDefault(sc => sc.Id == Id);
            if (sc == null)
            {
#pragma warning disable CS8603 // Possible null reference return.
                return null;
#pragma warning restore CS8603 // Possible null reference return.
            }
            return sc;
        }

        public IEnumerable<StudentChoice> GetAll()
        {
            return appDbContext.StudentChoices.ToList();
        }

        public IEnumerable<StudentChoice> Get(string RollNumber)
        {
            return appDbContext.StudentChoices.Where(sc => sc.RollNumber == RollNumber).ToList();
        }

        public StudentChoice Update(StudentChoice studentChoice)
        {
            appDbContext.StudentChoices.Attach(studentChoice);
            appDbContext.SaveChanges();
            return studentChoice;
        }

        public StudentChoice Get(string rollnumber, Guid subId)
        {
            StudentChoice sc=appDbContext.StudentChoices.FirstOrDefault(sc => sc.RollNumber == rollnumber && sc.SubId == subId);
            if (sc == null)
            {
#pragma warning disable CS8603 // Possible null reference return.
                return null;
#pragma warning restore CS8603 // Possible null reference return.
            }
            return sc;
        }
    }
}
