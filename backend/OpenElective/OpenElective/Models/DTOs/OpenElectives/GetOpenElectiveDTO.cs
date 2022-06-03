namespace OpenElective.Models.DTOs.OpenElectives
{
    public class GetOpenElectiveDTO
    {
        public Guid Id { get; set; }
        public string? Name { get; set; }
        public DateTime CreatedOn { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime UpdatedOn { get; set; }
        public string? UpdatedBy { get; set; }
    }
}
