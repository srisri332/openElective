using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace OpenElective.Models
{
    public class StudentChoice
    {
        public Guid Id { get; set; }
        public Guid StudentId { get; set; }
        public Student Student { get; set; }
        public Guid SubjectId { get; set; }

        public Subject Subject { get; set; }

        public int Priority { get; set; }

    }
}
