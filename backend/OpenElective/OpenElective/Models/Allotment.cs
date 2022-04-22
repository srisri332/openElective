namespace OpenElective.Models
{
    public class Allotment
    {
        public Guid Id { get; set; }
        
        public Guid StudentChoiceId { get; set; }

        public string RollNumber { get; set; }

        public Guid SubId { get; set; }

        
    }
}
