using Microsoft.IdentityModel.Tokens;
using OpenElective.Models;
using OpenElective.Services.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace OpenElective.Services
{
    public class StudentService : IStudentService
    {
        private readonly AppDbContext appDbContext;

        public StudentService(AppDbContext appDbContext)
        {
            this.appDbContext = appDbContext;
        }

        public string Authenticate(string RollNumber, string password)
        {
            Student student = appDbContext.Students.FirstOrDefault(s=>s.RollNumber == RollNumber);
            if(student == null) 
                return null;
            if (student.Password != password)
                return null;
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenKey = Encoding.ASCII.GetBytes("Kurzgesagt – In a Nutshell");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(
                    new Claim[] {
                        new Claim(ClaimTypes.Role,student.RollNumber)
                    }),
                Expires = DateTime.Now.AddHours(1),
                SigningCredentials =
                new SigningCredentials(new SymmetricSecurityKey(tokenKey), SecurityAlgorithms.HmacSha256)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
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

        public IEnumerable<Student> GetFilled()
        {
            return appDbContext.Students.Where(s => s.Elected==true);
        }

        public IEnumerable<Student> GetUnFilled()
        {
            return appDbContext.Students.Where(s => s.Elected == false && s.RollNumber!="admin");
        }

        public Student Update(Student student)
        {
            throw new NotImplementedException();
        }



    }
}
