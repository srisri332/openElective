using System.ComponentModel.DataAnnotations;

namespace OpenElective.Models.DTOs.OpenElectives
{
    public class CreateOpenElectiveDTO
    {
        [Required]
        public string? Name { get; set; }

    }
}
