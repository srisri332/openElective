using System.ComponentModel.DataAnnotations;

namespace OpenElective.Models.DTOs.Subjects
{
    public class CreateSubjectDTO
    {
        [Required]
        public string? Name { get; set; }

        [Required]

        public string? DepartmentId { get; set; }
        public int Credits { get; set; }
        public int Seats { get; set; }

        public string? Code { get; set; }
        public string? Instructor { get; set; }

        public string? Details { get; set; }

    }
}
