using OpenElective.Models;
using OpenElective.Services.Interfaces;

namespace OpenElective.Services
{
    public class AllotmentService : IAllotmentService
    {
        private readonly AppDbContext appDbContext;

        public AllotmentService(AppDbContext appDbContext)
        {
            this.appDbContext = appDbContext;
        }
        public IEnumerable<Allotment> Get()
        {
            foreach (var allotment in appDbContext.Allotments.ToList())
            {
                appDbContext.Allotments.Remove(allotment);
                appDbContext.SaveChanges();
            }
            IEnumerable<Allotment> result = new List<Allotment>();
            IEnumerable<StudentChoice> StudentChoices;
            IEnumerable<Student> Students;
            StudentChoices = new List<StudentChoice>();
            Students = new List<Student>();
            Students=appDbContext.Students.Where(s=>s.Elected==true).ToList();
            IEnumerable<Student> studentsWithoutBacklogs = Students.Where(s => s.Backlogs == 0).ToList();
            studentsWithoutBacklogs = studentsWithoutBacklogs.OrderByDescending(s => s.CGPA);
            foreach(Student student in studentsWithoutBacklogs)
            {
                IDictionary<Guid, bool> OEStatus=new Dictionary<Guid, bool>();
                IEnumerable<StudentChoice> studentChoices = appDbContext.StudentChoices.Where(sc=>sc.RollNumber==student.RollNumber).ToList();
                studentChoices=studentChoices.OrderBy(sc=>sc.Priority);
                foreach(StudentChoice studentChoice in studentChoices)
                {
                    Subject subject=appDbContext.Subjects.FirstOrDefault(s=>s.Id==studentChoice.SubId);
                    OpenElective.Models.OpenElective openElective = appDbContext.OpenElectives.FirstOrDefault(oe => oe.Id == subject.OpenElectiveId);
                    OEStatus.Add(openElective.Id, false);

                }
                foreach (StudentChoice studentChoice in studentChoices)
                {
                    Subject subject = appDbContext.Subjects.SingleOrDefault(s => s.Id == studentChoice.SubId);
                    
                        OpenElective.Models.OpenElective openElective = appDbContext.OpenElectives.FirstOrDefault(oe => oe.Id == subject.OpenElectiveId);
                        if (OEStatus[openElective.Id] == false && subject.Seats > 0)
                        {
                            OEStatus[openElective.Id] = true;
                            subject.Seats--;
                            appDbContext.Subjects.Attach(subject);
                            appDbContext.SaveChanges();

                            Allotment allotment = new Allotment
                            {
                                Id = Guid.NewGuid(),
                                StudentChoiceId = studentChoice.Id,
                                SubId = studentChoice.SubId,
                                RollNumber = studentChoice.RollNumber,
                            };
                            appDbContext.Allotments.Add(allotment);
                            appDbContext.SaveChanges();
                            
                        }
                    

                }

            }
            IEnumerable<Student> studentsWithBacklogs= Students.Where(s => s.Backlogs >= 1).ToList();
            studentsWithBacklogs = studentsWithBacklogs.OrderBy(s => s.Backlogs);
            foreach (Student student in studentsWithBacklogs)
            {
                IDictionary<Guid, bool> OEStatus = new Dictionary<Guid, bool>();
                IEnumerable<StudentChoice> studentChoices = appDbContext.StudentChoices.Where(sc => sc.RollNumber == student.RollNumber).ToList();
                studentChoices = studentChoices.OrderBy(sc => sc.Priority);
                foreach (StudentChoice studentChoice in studentChoices)
                {
                    Subject subject = appDbContext.Subjects.FirstOrDefault(s => s.Id == studentChoice.SubId);
                    OpenElective.Models.OpenElective openElective = appDbContext.OpenElectives.FirstOrDefault(oe => oe.Id == subject.OpenElectiveId);
                    OEStatus.Add(openElective.Id, false);

                }
                foreach (StudentChoice studentChoice in studentChoices)
                {
                    Subject subject = appDbContext.Subjects.SingleOrDefault(s => s.Id == studentChoice.SubId);

                    OpenElective.Models.OpenElective openElective = appDbContext.OpenElectives.FirstOrDefault(oe => oe.Id == subject.OpenElectiveId);
                    if (OEStatus[openElective.Id] == false && subject.Seats > 0)
                    {
                        OEStatus[openElective.Id] = true;
                        subject.Seats--;
                        appDbContext.Subjects.Attach(subject);
                        appDbContext.SaveChanges();
                        Allotment allotment = new Allotment
                        {
                            Id = Guid.NewGuid(),
                            StudentChoiceId = studentChoice.Id,
                            SubId = studentChoice.SubId,
                            RollNumber = studentChoice.RollNumber,
                        };
                        appDbContext.Allotments.Add(allotment);
                        appDbContext.SaveChanges();

                        result.Append(allotment);
                    }


                }

            }
            appDbContext.SaveChanges();
            return appDbContext.Allotments.ToList();
        }

        public void Reset()
        {
            foreach (var allotment in this.Get()) {
                appDbContext.Allotments.Remove(allotment);
                appDbContext.SaveChanges();
            }

        }
    }
}
