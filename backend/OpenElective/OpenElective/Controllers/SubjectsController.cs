using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OpenElective.Models;
using OpenElective.Models.DTOs.Subjects;
using OpenElective.Services.Interfaces;
using System.Security.Claims;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace OpenElective.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class SubjectsController : ControllerBase
    {
        private readonly ISubjectService subjectService;
        private readonly IMapper mapper;
        public SubjectsController(ISubjectService subjectService,IMapper mapper)
        {
            this.mapper = mapper;
            this.subjectService = subjectService;
        }
        // GET: api/<SubjectsController>
        [AllowAnonymous]
        [HttpGet("{OEId}")]
        public IActionResult Get(Guid OEId)
        {
            try
            {
                var all=subjectService.GetAll(OEId);
                var allDTO=mapper.Map<IEnumerable<GetSubjectDTO>>(all);
                return Ok(allDTO);
            }
            catch (Exception)
            {

                return BadRequest();
            }
        }

        // GET api/<SubjectsController>/5
        [AllowAnonymous]
        [HttpGet("{OEId}/{Id}")]
        public IActionResult Get(Guid OEId,Guid Id)
        {
            try
            {
                var sub=subjectService.Get(OEId, Id);
                var subDTO = mapper.Map<GetSubjectDTO>(sub);
                return Ok(subDTO);
            }
            catch (Exception)
            {

                return BadRequest();
                
            }
        }

        // POST api/<SubjectsController>
        [Authorize(Roles = "admin")]
        [HttpPost("{OEId}")]
        public IActionResult Post(Guid OEId, [FromBody] CreateSubjectDTO createSubject)
        {
            try
            {
                if (createSubject == null)
                {
                    return BadRequest();
                }
                var claimsIdentity = User.Identity as ClaimsIdentity;
                var IdClaim = claimsIdentity.FindFirst(ClaimTypes.Role);
                if (IdClaim.Value.ToString() != "admin")
                {
                    return Forbid();
                }
                var sub=mapper.Map<Subject>(createSubject);
                sub.Id = Guid.NewGuid();
                sub.OpenElectiveId = OEId;
                sub.Seats=createSubject.Seats;
                sub.Details=createSubject.Details;
                sub.Credits=createSubject.Credits;
                sub.Code=createSubject.Code;
                sub.Name=createSubject.Name;
                sub.DepartmentId=createSubject.DepartmentId;
                sub.Instructor=createSubject.Instructor;
                var createdSub=subjectService.Create(sub);
                return CreatedAtAction(nameof(Get), new { OEId=OEId, id = createdSub.Id }, mapper.Map<GetSubjectDTO>(createdSub));
            }
            catch (Exception)
            {

                return BadRequest(createSubject);
            }
        }

        // PUT api/<SubjectsController>/5
        [Authorize(Roles = "admin")]
        [HttpPut("{OEId}/{Id}")]
        public IActionResult Put(Guid OEID,Guid Id, [FromBody] CreateSubjectDTO createSubjectDTO)
        {
            try
            {
                if(createSubjectDTO == null)
                {
                    return BadRequest(createSubjectDTO);
                }
                var claimsIdentity = User.Identity as ClaimsIdentity;
                var IdClaim = claimsIdentity.FindFirst(ClaimTypes.Role);
                if (IdClaim.Value.ToString() != "admin")
                {
                    return Forbid();
                }
                var sub =mapper.Map<Subject>(createSubjectDTO);
                var updatedSub=subjectService.Update(sub);
                return CreatedAtAction(nameof(Put), updatedSub);
            }
            catch (Exception)
            {

                throw;
            }      
        }

        // DELETE api/<SubjectsController>/5
        [Authorize(Roles = "admin")]
        [HttpDelete("{OEId}/{Id}")]
        public IActionResult Delete(Guid OEId, Guid Id)
        {
            try
            {
                var claimsIdentity = User.Identity as ClaimsIdentity;
                var IdClaim = claimsIdentity.FindFirst(ClaimTypes.Role);
                if (IdClaim.Value.ToString() != "admin")
                {
                    return Forbid();
                }
                var deleted = subjectService.Delete(OEId,Id);
                return Ok(deleted);
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
