using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OpenElective.Models;
using OpenElective.Models.DTOs.StudentChoices;
using OpenElective.Services.Interfaces;
using System.Linq;
using System.Security.Claims;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace OpenElective.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class StudentChoiceController : ControllerBase
    {
        private readonly IStudentChoiceService studentChoiceService;
        private readonly IStudentService studentService;
        private readonly ISubjectService subjectService;
        private readonly IOpenElectiveService openElectiveService;
        private readonly IMapper mapper;

        public StudentChoiceController(IStudentChoiceService studentChoiceService , IStudentService studentService ,ISubjectService subjectService,IOpenElectiveService openElectiveService,IMapper mapper)
        {
            this.studentChoiceService = studentChoiceService;
            this.studentService = studentService;
            this.subjectService = subjectService;
            this.openElectiveService = openElectiveService;
            this.mapper = mapper;
        }
        // GET: api/<StudentChoiceController>
        [AllowAnonymous]
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var all = studentChoiceService.GetAll();
                var allDTO = mapper.Map<IEnumerable<GetStudentChoiceDTO>>(all);
                foreach(var sc in allDTO)
                {
#pragma warning disable CS8604 // Possible null reference argument.
                    var s = studentService.Get(sc.RollNumber);
#pragma warning restore CS8604 // Possible null reference argument.
                    sc.StudentName = s.Name;
                    var sub = subjectService.Get(sc.SubId);
                    if (sub != null)
                    {
                        sc.SubjectName = sub.Name;
#pragma warning disable CS8602 // Dereference of a possibly null reference.
                        sc.OEName = openElectiveService.Get(sub.OpenElectiveId).Name;
#pragma warning restore CS8602 // Dereference of a possibly null reference.
                    }
                }
                return Ok(allDTO);
            }
            catch (Exception)
            {

                throw;
            }
        }

        // GET api/<StudentChoiceController>/5
        [HttpGet("{id}")]
        public IActionResult Get(Guid id)
        {
            try
            {
                var sc = studentChoiceService.Get(id);
                var scDTO=mapper.Map<GetStudentChoiceDTO>(sc);
#pragma warning disable CS8604 // Possible null reference argument.
                var s= studentService.Get(sc.RollNumber);
#pragma warning restore CS8604 // Possible null reference argument.
                scDTO.StudentName = s.Name;
                var sub = subjectService.Get(sc.SubId);
                scDTO.SubjectName = sub.Name;
#pragma warning disable CS8602 // Dereference of a possibly null reference.
                scDTO.OEName = openElectiveService.Get(sub.OpenElectiveId).Name;
#pragma warning restore CS8602 // Dereference of a possibly null reference.
                return Ok(scDTO);
            }
            catch (Exception)
            {
                throw;
            }
        }

        // POST api/<StudentChoiceController>
        [HttpPost]
        public IActionResult Post([FromBody] CreateStudentChoiceDTO createStudentChoiceDTO)
        {

            try
            {
                if (createStudentChoiceDTO == null)
                {
                    return BadRequest(createStudentChoiceDTO);
                }
                var claimsIdentity=User.Identity as ClaimsIdentity;
#pragma warning disable CS8602 // Dereference of a possibly null reference.
                var IdClaim = claimsIdentity.FindFirst(ClaimTypes.Role);
#pragma warning restore CS8602 // Dereference of a possibly null reference.
#pragma warning disable CS8602 // Dereference of a possibly null reference.
                if (IdClaim.Value.ToString() != createStudentChoiceDTO.RollNumber.ToString())
                {
                    return Forbid();
                }
#pragma warning restore CS8602 // Dereference of a possibly null reference.
                if (studentChoiceService.Get(createStudentChoiceDTO.RollNumber, createStudentChoiceDTO.SubId) != null)
                {
                    return BadRequest();
                }
                var sc=mapper.Map<StudentChoice>(createStudentChoiceDTO);
                sc.Id = Guid.NewGuid();
                var created= studentChoiceService.Create(sc);
                return CreatedAtAction(nameof(Get), created);

            }
            catch (Exception)
            {

                throw;
            }
        }

        // PUT api/<StudentChoiceController>/5
        [HttpPut("{id}")]
        public IActionResult Put(Guid id, [FromBody] CreateStudentChoiceDTO createStudentChoiceDTO)
        {
            try
            {
                if (createStudentChoiceDTO == null)
                {
                    return BadRequest(createStudentChoiceDTO);
                }
                var claimsIdentity = User.Identity as ClaimsIdentity;
#pragma warning disable CS8602 // Dereference of a possibly null reference.
                var IdClaim = claimsIdentity.FindFirst(ClaimTypes.Role);
#pragma warning restore CS8602 // Dereference of a possibly null reference.
#pragma warning disable CS8602 // Dereference of a possibly null reference.
                if (IdClaim.Value.ToString() != createStudentChoiceDTO.RollNumber.ToString())
                {
                    return Forbid();
                }
#pragma warning restore CS8602 // Dereference of a possibly null reference.
                var sc = mapper.Map<StudentChoice>(createStudentChoiceDTO);
                var created = studentChoiceService.Update(sc);
                return CreatedAtAction(nameof(Get), created);
            }
            catch (Exception)
            {
                throw;
            }
        }

        // DELETE api/<StudentChoiceController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            try
            {
                var sc = studentChoiceService.Get(id);
                studentChoiceService.Delete(sc);
                return Ok();
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
