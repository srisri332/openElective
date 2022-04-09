using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OpenElective.Models;
using OpenElective.Models.DTOs.Admin;
using OpenElective.Services.Interfaces;

namespace OpenElective.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IAdminService adminService;
        private readonly IMapper mapper; 
        public AdminController(IAdminService adminService, IMapper mapper)
        {  
            this.adminService = adminService;
            this.mapper = mapper;
        }
        [AllowAnonymous]
        [HttpPost("auth")]
        public IActionResult Authenticate([FromBody] AdminAuthDTO admin)
        {
            var token = adminService.Authenticate(admin.Name, admin.Password);
            if (token == null)
                return Unauthorized();
            return Ok(token);
        }
    }
}
