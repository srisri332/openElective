namespace OpenElective.Models
{
    public class Subject
    {
        public Guid Id { get; set; }
        public Guid OpenElectiveId { get; set; }
        public OpenElective? OpenElective { get; set; }
        public string? Name { get; set; }
        public int? Credits { get; set; }
        public int? Seats { get; set; }

        public string? Code { get; set; }

        public string? DepartmentId { get; set; }

        public string? Details { get; set; }

        public string? Instructor { get; set; }

    }
}
