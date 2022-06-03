namespace OpenElective.Models.DTOs.Allotment
{
    public class GetAllotmentDTO
    {
        public Guid Id { get; set; }
        public string? Name { get; set; }

        public string? RollNumber { get; set; }

        public string? SubjectName { get; set; }

        public string? OE { get; set; }

    }
}
