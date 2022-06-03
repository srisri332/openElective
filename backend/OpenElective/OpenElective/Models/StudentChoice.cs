using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace OpenElective.Models
{
    public class StudentChoice
    {
        public Guid Id { get; set; }
        public string? RollNumber { get; set; }
        public Guid SubId { get; set; }


        public int Priority { get; set; }

    }
}
