using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using OpenElective.Models;
using OpenElective.Models.DTOs.StudentChoices;
using OpenElective.Services.Interfaces;
using System.Linq;
using System.Security.Claims;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace OpenElective.Controllers
{
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
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var all = studentChoiceService.GetAll();
                var allDTO = mapper.Map<IEnumerable<GetStudentChoiceDTO>>(all);
                foreach(var sc in allDTO)
                {
                    var s = studentService.Get(sc.RollNumber);
                    sc.StudentName=s.Name;
                    var sub = subjectService.Get(sc.SubId);
                    if (sub != null)
                    {
                        sc.SubjectName = sub.Name;
                        sc.OEName = openElectiveService.Get(sub.OpenElectiveId).Name;
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
                var s= studentService.Get(sc.RollNumber);
                scDTO.StudentName = s.Name;
                var sub = subjectService.Get(sc.SubId);
                scDTO.SubjectName = sub.Name;
                scDTO.OEName = openElectiveService.Get(sub.OpenElectiveId).Name;
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
                var IdClaim = claimsIdentity.FindFirst(ClaimTypes.Name);
                if (IdClaim.Value.ToString() != createStudentChoiceDTO.RollNumber.ToString())
                {
                    return Forbid();
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
                var IdClaim = claimsIdentity.FindFirst(ClaimTypes.Name);
                if (IdClaim.Value.ToString() != createStudentChoiceDTO.RollNumber.ToString())
                {
                    return Forbid();
                }
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
