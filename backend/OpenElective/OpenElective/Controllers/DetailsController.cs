using Microsoft.AspNetCore.Mvc;
using OpenElective.Models;
using OpenElective.Services.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace OpenElective.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DetailsController : ControllerBase
    {
        private readonly IDetailsService detailsService;

        public DetailsController(IDetailsService detailsService)
        {
            this.detailsService = detailsService;
        }
        // GET: api/<DetailsController>
        [HttpGet]
        public IActionResult Get()
        {
            Details d=  detailsService.Get();
            return Ok(d);
        }

        // GET api/<DetailsController>/5
        [HttpPost("start")]
        public IActionResult Start()
        {
            Details d = detailsService.StartProcess();
            return Ok(d);
        }

        [HttpPost("end")]
        public IActionResult End()
        {
            Details d = detailsService.EndProcess();
            return Ok(d);
        }
        // POST api/<DetailsController>
        [HttpPost("reset")]
        public IActionResult Post()
        {
            Details d= detailsService.Reset();
            return Ok(d);
        }

        // PUT api/<DetailsController>/5
        [HttpPut("{date}")]
        public IActionResult Put(string date)
        {
            Details d=detailsService.SetDate(date);
            return Ok(d);
        }

       
    }
}
