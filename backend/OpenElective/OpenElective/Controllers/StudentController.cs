using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OpenElective.Models;
using OpenElective.Models.DTOs;
using OpenElective.Models.DTOs.Students;
using OpenElective.Services.Interfaces;
using System.Security.Claims;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace OpenElective.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly IStudentService studentService;
        private readonly IMapper mapper;
        public StudentController(IStudentService studentService,IMapper mapper)
        {
            this.studentService = studentService;
            this.mapper = mapper;
        }
        // GET: api/<StudentController>
        [Authorize(Roles = "admin")]
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var all = studentService.GetAll();
                var allDTO = mapper.Map<IEnumerable<GetStudentDTO>>(all);
                return Ok(allDTO);
            }
            catch (Exception)
            {
                throw;
            }
        }

        // GET api/<StudentController>/5
        [AllowAnonymous]
        [HttpGet("{RollNumber}")]
        public IActionResult Get( string RollNumber)
        {
            try
            {
                var student = studentService.Get(RollNumber);
                var studentDTO = mapper.Map<GetStudentDTO>(student);
                return Ok(studentDTO);
            }
            catch (Exception)
            {
                throw;
            }
        }
        [Authorize(Roles = "admin")]
        [HttpGet("Filled")]
        public IActionResult GetFilled()
        {
            try
            {
                var all = studentService.GetFilled();
                var allDTO = mapper.Map<IEnumerable<GetStudentDTO>>(all);
                return Ok(allDTO);
            }
            catch (Exception)
            {
                throw;
            }
        }
        [Authorize(Roles = "admin")]
        [HttpGet("Unfilled")]
        public IActionResult GetUnfilled()
        {
            try
            {
                var all = studentService.GetUnFilled();
                var allDTO = mapper.Map<IEnumerable<GetStudentDTO>>(all);
                return Ok(allDTO);
            }
            catch (Exception)
            {
                throw;
            }
        }
        // POST api/<StudentController>
        [Authorize(Roles = "admin")]
        [HttpPost]
        public IActionResult Post([FromBody] CreateStudentDTO createStudentDTO)
        {
            try
            {
                var claimsIdentity = User.Identity as ClaimsIdentity;
                var IdClaim = claimsIdentity.FindFirst(ClaimTypes.Role);
                if (IdClaim.Value.ToString() != "admin")
                {
                    return Forbid();
                }
                if (createStudentDTO == null)
                {
                    return BadRequest();
                }
                if(studentService.Get(createStudentDTO.RollNumber)!= null)
                {
                    return BadRequest();
                }
                var st=mapper.Map<Student>(createStudentDTO);
                st.CGPA = createStudentDTO.CGPA;
                st.RollNumber = createStudentDTO.RollNumber;
                st.Backlogs = createStudentDTO.Backlogs;
                st.Id=Guid.NewGuid();
                st.Password = st.RollNumber?.ToUpper();
                var createdStudent = studentService.Create(st);
                return CreatedAtAction(nameof(Get),createdStudent);
            }
            catch (Exception)
            {

                throw;
            }
        }

        // PUT api/<StudentController>/5
        [AllowAnonymous]
        [HttpPut("elected/{id}")]
        public IActionResult Put(string id)
        {
            try
            {
                var s = studentService.Get(id);
                studentService.MarkElected(s);
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // DELETE api/<StudentController>/5
        [Authorize(Roles = "admin")]
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            try
            {
                var claimsIdentity = User.Identity as ClaimsIdentity;
                var IdClaim = claimsIdentity.FindFirst(ClaimTypes.Role);
                if (IdClaim.Value.ToString() != "admin")
                {
                    return Forbid();
                }
                var deleted = studentService.Delete(id);
                return Ok(deleted);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [AllowAnonymous]
        [HttpPost("auth")]
        public IActionResult Authenticate([FromBody] StudentLoginDTO studentLoginDTO)
        {
            var token = studentService.Authenticate(studentLoginDTO.RollNumber, studentLoginDTO.Password);
            if (token == null)
                return Unauthorized();
            return Ok(token);
        }
    }
}
