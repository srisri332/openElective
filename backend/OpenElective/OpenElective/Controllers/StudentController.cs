using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using OpenElective.Models;
using OpenElective.Models.DTOs;
using OpenElective.Models.DTOs.Students;
using OpenElective.Services.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace OpenElective.Controllers
{
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

        // POST api/<StudentController>
        [HttpPost]
        public IActionResult Post([FromBody] CreateStudentDTO createStudentDTO)
        {
            try
            {
                if(createStudentDTO == null)
                {
                    return BadRequest();
                }
                var st=mapper.Map<Student>(createStudentDTO);
                st.CGPA = createStudentDTO.CGPA;
                st.RollNumber = createStudentDTO.RollNumber;
                st.Backlogs = createStudentDTO.Backlogs;
                st.Id=Guid.NewGuid();
                st.Password = st.RollNumber;
                var createdStudent = studentService.Create(st);
                return CreatedAtAction(nameof(Get),createdStudent);
            }
            catch (Exception)
            {

                throw;
            }
        }

        // PUT api/<StudentController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<StudentController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
