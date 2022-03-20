using System.ComponentModel.DataAnnotations;

namespace OpenElective.Models.DTOs.Students
{
    public class CreateStudentDTO
    {
        [Required]
        public string RollNumber { get; set; }

        public string Name { get; set; }

        public float CGPA { get; set; }

        public int Backlogs { get; set; }

    }
}
