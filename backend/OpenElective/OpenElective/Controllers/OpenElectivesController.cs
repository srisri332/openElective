using Microsoft.AspNetCore.Mvc;
using OpenElective.Services.Interfaces;
using AutoMapper;
using OpenElective.Models.DTOs.OpenElectives;
using OpenElective.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace OpenElective.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OpenElectivesController : ControllerBase
    {
        private readonly IOpenElectiveService openElectiveService;
        private readonly IMapper mapper;

        public OpenElectivesController(IOpenElectiveService openElectiveService, IMapper mapper)
        {
            this.openElectiveService = openElectiveService;
            this.mapper = mapper;
        }
        // GET: api/<OpenElectivesController>
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var allOE = openElectiveService.GetAll();
                var allDTO = mapper.Map < IEnumerable < GetOpenElectiveDTO>>(allOE);
                return Ok(allDTO);
            }
            catch (Exception)
            {
                throw;
            }
        }

        // GET api/<OpenElectivesController>/5
        [HttpGet("{id}")]
        public IActionResult Get(Guid id)
        {
            try
            {
                var OE = openElectiveService.Get(id);
                var OEDTO = mapper.Map<GetOpenElectiveDTO>(OE);
                return Ok(OEDTO);

            }
            catch (Exception)
            {

                throw;
            }
        }

        // POST api/<OpenElectivesController>
        [HttpPost]
        public IActionResult Post([FromBody] CreateOpenElectiveDTO openElective)
        {
            try
            {
                if(openElective == null)
                {
                    return BadRequest(openElective);
                }
                var OE=mapper.Map<OpenElective.Models.OpenElective>(openElective);
                OE.Id = Guid.NewGuid();
                OE.Name = openElective.Name;
                OE.UpdatedBy = "ADMIN";
                OE.CreatedBy = "ADMIN";
                OE.CreatedOn = DateTime.Now;
                OE.UpdatedOn = DateTime.Now;
                var createdOE = openElectiveService.Create(OE);
                return CreatedAtAction(nameof(Get), createdOE);

            }
            catch (Exception)
            {

                throw;
            }
        }

        // PUT api/<OpenElectivesController>/5
        [HttpPut("{id}")]
        public IActionResult Put(Guid id, [FromBody] OpenElective.Models.OpenElective openElective)
        {
            try
            {
                if (openElective == null)
                {
                    return BadRequest(openElective);
                }

                var updatedOE = openElectiveService.Update(openElective);
                return CreatedAtAction(nameof(Put), updatedOE);

            }
            catch (Exception)
            {

                throw;
            }
        }

        // DELETE api/<OpenElectivesController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            try
            {
                var deleted=openElectiveService.Delete(id);
                return Ok(deleted);
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
