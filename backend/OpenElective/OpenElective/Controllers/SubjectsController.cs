﻿using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OpenElective.Models;
using OpenElective.Models.DTOs.Subjects;
using OpenElective.Services.Interfaces;
using System.Security.Claims;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace OpenElective.Controllers
{
    [Authorize(Roles = "Admin")]
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
        [Authorize(Roles = "Admin")]
        [HttpPost("{OEId}")]
        public IActionResult Post(Guid OEId, [FromBody] CreateSubjectDTO createSubject)
        {
            try
            {
                if (createSubject == null)
                {
                    return BadRequest();
                }
                
                var sub=mapper.Map<Subject>(createSubject);
                sub.Id = Guid.NewGuid();
                sub.OpenElectiveId = OEId;
                var createdSub=subjectService.Create(sub);
                return CreatedAtAction(nameof(Get), new { OEId=OEId, id = createdSub.Id }, mapper.Map<GetSubjectDTO>(createdSub));
            }
            catch (Exception)
            {

                return BadRequest(createSubject);
            }
        }

        // PUT api/<SubjectsController>/5
        [Authorize(Roles = "Admin")]
        [HttpPut("{OEId}/{Id}")]
        public IActionResult Put(Guid OEID,Guid Id, [FromBody] CreateSubjectDTO createSubjectDTO)
        {
            try
            {
                if(createSubjectDTO == null)
                {
                    return BadRequest(createSubjectDTO);
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
        [Authorize(Roles = "Admin")]
        [HttpDelete("{OEId}/{Id}")]
        public IActionResult Delete(Guid OEId, Guid Id)
        {
            try
            {
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
