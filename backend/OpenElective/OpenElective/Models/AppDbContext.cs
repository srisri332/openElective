using Microsoft.EntityFrameworkCore;
using System.Globalization;

namespace OpenElective.Models
{
    public class AppDbContext:DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }
        
        public DbSet<OpenElective> OpenElectives { get; set; }
        public DbSet<Subject> Subjects { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<StudentChoice> StudentChoices { get; set; }
        public DbSet<Details> Details { get; set; }

        public DbSet<Allotment> Allotments { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<OpenElective>().HasMany<Subject>(o => o.Subjects)
                .WithOne(s => s.OpenElective);

            


            Details details = new Details
            {
                Id = 1,
                Name = "BVRIT",
                IsStarted = false,
                IsCompleted = false,
                Date = DateTime.Now.ToString("ddMMyyyy", CultureInfo.InvariantCulture)
            };
            
            //Department department1 = new Department
            //{
            //    Id = "CSE",
            //    Name = "CSE",
            //};

            //Department department2 = new Department
            //{
            //    Id = "ECE",
            //    Name = "ECE",
            //};
            //Department department3 = new Department
            //{
            //    Id = "MEC",
            //    Name = "Mechanical",
            //};

            //Department department4 = new Department
            //{
            //    Id = "CHE",
            //    Name = "Chemical",
            //};
            //Department department5 = new Department
            //{
            //    Id = "BME",
            //    Name = "BioMedical",
            //};
            //Department department6 = new Department
            //{
            //    Id = "EEE",
            //    Name = "Electrical",
            //};
            
            //modelBuilder.Entity<Department>().HasData(department1,department2,department3,department4,department5,department6);
            OpenElective openElective1 = new OpenElective
            {
                Id = Guid.NewGuid(),
                Name = "OE1",
                CreatedBy ="Admin",
                CreatedOn = DateTime.Now,
                UpdatedBy = "Admin",
                UpdatedOn = DateTime.Now
            };

            OpenElective openElective2 = new OpenElective
            {
                Id = Guid.NewGuid(),
                Name = "OE2",
                CreatedBy = "Admin",
                CreatedOn = DateTime.Now,
                UpdatedBy = "Admin",
                UpdatedOn = DateTime.Now
            };
            modelBuilder.Entity<OpenElective>().HasData(openElective1,openElective2);
            Subject subject1 = new Subject
            {
                 Id= Guid.NewGuid(),
                 Name="Unethical Hacking",
                 Credits =3,
                 Seats=60,
                 Code="S1",
                 DepartmentId="CSE",
                 OpenElectiveId=openElective1.Id,
                 Details="Very Easy Subject ma",
                 Instructor="Viper Ramesh",
            };

            Subject subject2 = new Subject
            {
                Id = Guid.NewGuid(),
                Name = "Old Product Development",
                Credits = 3,
                Seats = 60,
                Code = "S2",

                DepartmentId = "CSE",
                OpenElectiveId = openElective2.Id,
                Details = "Very Easy Subject ma",
                Instructor = "Viper Ramesh",
            };

            Subject subject3 = new Subject
            {
                Id = Guid.NewGuid(),
                Name = "Digital Logic Design",
                Credits = 3,
                Seats = 60,
                Code = "S3",

                DepartmentId = "ECE",
                OpenElectiveId = openElective1.Id,
                Details = "Very Easy Subject ma",
                Instructor = "Viper Ramesh",
            };

            Subject subject4 = new Subject
            {
                Id = Guid.NewGuid(),
                Name = "Basic Electronical Engg",
                Credits = 3,
                Seats = 60,
                Code = "S4",

                DepartmentId = "EEE",
                OpenElectiveId = openElective2.Id,
                Details = "Very Easy Subject ma",
                Instructor = "Viper Ramesh",
            };


            Student student1 = new Student
            {
                Id = Guid.NewGuid(),
                RollNumber = "18211A05A4",
                Name = "Mark Zukerberg",
                Password = "facebook",
                CGPA = 8.0f,
                Backlogs=0,
                Elected=true,
            };
            Student student2 = new Student
            {
                Id = Guid.NewGuid(),
                RollNumber = "18211A05Z4",
                Name = "Bill Gates",
                Password = "microsoft",
                CGPA = 9.0f,
                Backlogs = 0,
                Elected=true,
            };

            Student admin = new Student
            {
                Id = Guid.NewGuid(),
                RollNumber = "admin",
                Name = "Admin",
                Password = "admin",

            };

            StudentChoice choice1 = new StudentChoice
            {
                Priority=1,
                Id = Guid.NewGuid(),
                RollNumber = "18211A05A4",
                SubId =subject1.Id
           
            };
            StudentChoice choice2 = new StudentChoice
            {
                Priority = 2,
                Id = Guid.NewGuid(),
                RollNumber = "18211A05A4",
                SubId = subject2.Id,

            };
            StudentChoice choice3 = new StudentChoice
            {
                Priority = 1,
                Id = Guid.NewGuid(),
                RollNumber = "18211A05Z4",
                SubId = subject1.Id

            };
            StudentChoice choice4 = new StudentChoice
            {
                Priority = 2,
                Id = Guid.NewGuid(),
                RollNumber = "18211A05Z4",
                SubId = subject2.Id

            };

            modelBuilder.Entity<Student>().HasData(student1, student2,admin);
            modelBuilder.Entity<Subject>().HasData(subject2,subject1,subject3,subject4);
            modelBuilder.Entity<StudentChoice>().HasData(choice1,choice2,choice3,choice4);
            modelBuilder.Entity<Details>().HasData(details);
        }

    }
}
