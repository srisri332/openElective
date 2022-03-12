using Microsoft.EntityFrameworkCore;

namespace OpenElective.Models
{
    public class AppDbContext:DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }
        public DbSet<OpenElective> OpenElectives { get; set; }
        public DbSet<Subject> Subjects { get; set; }
        public DbSet<Department> Departments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<OpenElective>().HasMany<Subject>(o => o.Subjects)
                .WithOne(s => s.OpenElective);

            modelBuilder.Entity<Department>().HasMany<Subject>(o => o.Subjects)
                .WithOne(s => s.Department);


            Department department1 = new Department
            {
                Id = Guid.NewGuid(),
                Name = "CSE",
            };

            Department department2 = new Department
            {
                Id = Guid.NewGuid(),
                Name = "ECE",
            };

            modelBuilder.Entity<Department>().HasData(department1,department2);
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
                 DepartmentId=department1.Id,
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
                DepartmentId = department1.Id,
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
                DepartmentId = department2.Id,
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
                DepartmentId = department2.Id,
                OpenElectiveId = openElective2.Id,
                Details = "Very Easy Subject ma",
                Instructor = "Viper Ramesh",
            };

            modelBuilder.Entity<Subject>().HasData(subject2,subject1,subject3,subject4);

        }

    }
}
