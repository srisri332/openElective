using Microsoft.AspNetCore.Mvc;
using OpenElective.Services.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace OpenElective.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OpenElectivesController : ControllerBase
    {
        private readonly IOpenElectiveService openElectiveService;

        public OpenElectivesController(IOpenElectiveService openElectiveService)
        {
            this.openElectiveService = openElectiveService;
        }
        // GET: api/<OpenElectivesController>
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var allOE = openElectiveService.GetAll();
                return Ok(allOE);
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
                return Ok(OE);

            }
            catch (Exception)
            {

                throw;
            }
        }

        // POST api/<OpenElectivesController>
        [HttpPost]
        public IActionResult Post([FromBody] OpenElective.Models.OpenElective openElective)
        {
            try
            {
                if(openElective == null)
                {
                    return BadRequest(openElective);
                }

                var createdOE = openElectiveService.Create(openElective);
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
