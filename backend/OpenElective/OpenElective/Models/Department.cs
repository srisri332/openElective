namespace OpenElective.Models
{
    public class Department
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public ICollection<Subject> Subjects { get; set; }
    }
}