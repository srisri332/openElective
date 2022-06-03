namespace OpenElective.Models
{
    public class OpenElective
    {
        public Guid Id { get; set; }
        public string? Name { get; set; }

        public ICollection<Subject>? Subjects { get; set; }

        public DateTime CreatedOn { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime UpdatedOn { get; set; }
        public string? UpdatedBy { get; set; }

    }
}
