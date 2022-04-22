using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OpenElective.Models.DTOs.Allotment;
using OpenElective.Services.Interfaces;
using System.Security.Claims;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace OpenElective.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AllotmentController : ControllerBase
    {
        private readonly IAllotmentService allotmentService;
        private readonly IStudentChoiceService studentChoiceService;
        private readonly IStudentService studentService;
        private readonly ISubjectService subjectService;
        private readonly IOpenElectiveService openElectiveService;
        private readonly IMapper mapper;

        public AllotmentController(IAllotmentService allotmentService, IStudentChoiceService studentChoiceService, IStudentService studentService, ISubjectService subjectService, IOpenElectiveService openElectiveService, IMapper mapper)
        {
            this.allotmentService = allotmentService;
            this.studentChoiceService = studentChoiceService;
            this.studentService = studentService;
            this.subjectService = subjectService;
            this.openElectiveService = openElectiveService;
            this.mapper = mapper;
        }
        // GET: api/<AllotmentController>
        [Authorize(Roles = "admin")]
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var claimsIdentity = User.Identity as ClaimsIdentity;
                var IdClaim = claimsIdentity.FindFirst(ClaimTypes.Role);
                if (IdClaim.Value.ToString() != "admin")
                {
                    return Forbid();
                }
                var result = allotmentService.Get();
                IEnumerable<GetAllotmentDTO> allotmentsDTO= mapper.Map<IEnumerable<GetAllotmentDTO>>(result);
                foreach(var allotmentDTO in allotmentsDTO)
                {
                    var allotment=result.SingleOrDefault(a=>a.Id==allotmentDTO.Id);
                    allotmentDTO.SubjectName = subjectService.Get(allotment.SubId).Name;
                    allotmentDTO.RollNumber = allotment.RollNumber;
                    allotmentDTO.Name = studentService.Get(allotment.RollNumber).Name;
                    allotmentDTO.OE = openElectiveService.Get(subjectService.Get(allotment.SubId).OpenElectiveId).Name;
                }
                return Ok(allotmentsDTO);
            }
            catch (Exception)
            {

                return BadRequest();
            }
        }



        // POST api/<AllotmentController>
        [Authorize(Roles = "admin")]
        [HttpPost("reset")]
        public IActionResult Post()
        {
            try
            {
                var claimsIdentity = User.Identity as ClaimsIdentity;
                var IdClaim = claimsIdentity.FindFirst(ClaimTypes.Role);
                if (IdClaim.Value.ToString() != "admin")
                {
                    return Forbid();
                }
                allotmentService.Reset();
                return Ok();
            }
            catch (Exception)
            {

                return BadRequest();
            }
        }

       
    }
}
