using Microsoft.IdentityModel.Tokens;
using OpenElective.Models;
using OpenElective.Services.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace OpenElective.Services
{
    public class AdminService : IAdminService
    {
        private readonly AppDbContext appDbContext;
        public AdminService(AppDbContext appDbContext)
        {
            this.appDbContext = appDbContext;
        }
        public string Authenticate(string name, string password)
        {
            Admin account = appDbContext.Admins.FirstOrDefault(a => a.Name == name);
            if (account == null)
                return null;
            if(account.Password != password)
            {
                return null;
            }
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenKey = Encoding.ASCII.GetBytes("Kurzgesagt – In a Nutshell");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(
                    new Claim[] {
                        new Claim(ClaimTypes.Role,account.Name.ToString())
                    }),
                Expires = DateTime.Now.AddHours(10),
                SigningCredentials =
                new SigningCredentials(new SymmetricSecurityKey(tokenKey), SecurityAlgorithms.HmacSha256)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
