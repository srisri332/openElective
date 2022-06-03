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

#pragma warning disable CS8600 // Converting null literal or possible null value to non-nullable type.
                    Subject subject=appDbContext.Subjects.FirstOrDefault(s=>s.Id==studentChoice.SubId);
#pragma warning restore CS8600 // Converting null literal or possible null value to non-nullable type.
#pragma warning disable CS8602 // Dereference of a possibly null reference.
                    OpenElective.Models.OpenElective openElective = appDbContext.OpenElectives.FirstOrDefault(oe => oe.Id == subject.OpenElectiveId);
#pragma warning restore CS8602 // Dereference of a possibly null reference.
#pragma warning disable CS8602 // Dereference of a possibly null reference.
                    if (OEStatus.ContainsKey(openElective.Id))
                    {
                        OEStatus[openElective.Id] = false;
                    }
                    else
                    {
                        OEStatus.Add(openElective.Id, false);
                    }
#pragma warning restore CS8602 // Dereference of a possibly null reference.
                }
                foreach (StudentChoice studentChoice in studentChoices)
                {
                        Subject subject = appDbContext.Subjects.SingleOrDefault(s => s.Id == studentChoice.SubId);
#pragma warning disable CS8602 // Dereference of a possibly null reference.
                        OpenElective.Models.OpenElective openElective = appDbContext.OpenElectives.FirstOrDefault(oe => oe.Id == subject.OpenElectiveId);
#pragma warning restore CS8602 // Dereference of a possibly null reference.
#pragma warning disable CS8602 // Dereference of a possibly null reference.
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
                            Console.WriteLine(allotment.ToString());
                            appDbContext.Allotments.Add(allotment);
                            appDbContext.SaveChanges();
                            
                        }
#pragma warning restore CS8602 // Dereference of a possibly null reference.


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
#pragma warning disable CS8602 // Dereference of a possibly null reference.
                    OpenElective.Models.OpenElective openElective = appDbContext.OpenElectives.FirstOrDefault(oe => oe.Id == subject.OpenElectiveId);
#pragma warning restore CS8602 // Dereference of a possibly null reference.
#pragma warning disable CS8602 // Dereference of a possibly null reference.
                    if (OEStatus.ContainsKey(openElective.Id))
                    {
                        OEStatus[openElective.Id] = false;
                    }
                    else
                    {
                        OEStatus.Add(openElective.Id, false);
                    }
#pragma warning restore CS8602 // Dereference of a possibly null reference.

                }
                foreach (StudentChoice studentChoice in studentChoices)
                {
                    Subject subject = appDbContext.Subjects.SingleOrDefault(s => s.Id == studentChoice.SubId);

#pragma warning disable CS8602 // Dereference of a possibly null reference.
                    OpenElective.Models.OpenElective openElective = appDbContext.OpenElectives.FirstOrDefault(oe => oe.Id == subject.OpenElectiveId);
#pragma warning restore CS8602 // Dereference of a possibly null reference.
#pragma warning disable CS8602 // Dereference of a possibly null reference.
#pragma warning disable CS8602 // Dereference of a possibly null reference.
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

                        _ = result.Append(allotment);
                    }
#pragma warning restore CS8602 // Dereference of a possibly null reference.
#pragma warning restore CS8602 // Dereference of a possibly null reference.


                }

            }
            appDbContext.SaveChanges();
            return appDbContext.Allotments.ToList();
        }

        public IEnumerable<Allotment> GetByRollNumber(string id)
        {
            return appDbContext.Allotments.Where(a => a.RollNumber == id).ToList();
        }

        public void Reset()
        {
            foreach (var allotment in this.Get()) {
                appDbContext.Allotments.Remove(allotment);
                appDbContext.SaveChanges();
            }
            foreach(var sc in appDbContext.StudentChoices.ToList())
            {
                appDbContext.StudentChoices.Remove(sc);
                appDbContext.SaveChanges();
            }
            foreach(var student in appDbContext.Students.ToList())
            {
                var s=appDbContext.Students.FirstOrDefault(s=> s.RollNumber==student.RollNumber);
#pragma warning disable CS8602 // Dereference of a possibly null reference.
                s.Elected = false;
#pragma warning restore CS8602 // Dereference of a possibly null reference.
                appDbContext.Students.Attach(student);
                appDbContext.SaveChanges();
            }
            foreach (var sub in appDbContext.Subjects.ToList())
            {
                appDbContext.Subjects.Remove(sub);
                appDbContext.SaveChanges();
            }
            foreach (var oe in appDbContext.OpenElectives.ToList())
            {
                appDbContext.OpenElectives.Remove(oe);
                appDbContext.SaveChanges();
            }
        }
    }
}
