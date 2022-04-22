namespace OpenElective.Models.DTOs.StudentChoices
{
    public class CreateStudentChoiceDTO
    {
        public string RollNumber { get; set; }
        public Guid SubId { get; set; }
        public int Priority { get; set; }

    }
}
