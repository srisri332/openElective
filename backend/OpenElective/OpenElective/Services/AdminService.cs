using Microsoft.IdentityModel.Tokens;
using OpenElective.Models;
using OpenElective.Services.Interfaces;
using System.IdentityModel.Tokens.Jwt;
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
        public string Authenticate(Guid Id, string password)
        {
            Admin account = appDbContext.Admins.SingleOrDefault(a => a.Id == id);
            if (account == null)
                return null;
            bool res = BCrypt.Net.BCrypt.Verify(password, account.Password);
            if(!res)
                return null;
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenKey = Encoding.ASCII.GetBytes("Kurzgesagt – In a Nutshell");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Expires = DateTime.Now.AddHours(10),
                SigningCredentials =
                new SigningCredentials(new SymmetricSecurityKey(tokenKey), SecurityAlgorithms.HmacSha256)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
