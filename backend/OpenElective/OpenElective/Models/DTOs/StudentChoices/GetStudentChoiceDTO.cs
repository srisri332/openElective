namespace OpenElective.Models.DTOs.StudentChoices
{
    public class GetStudentChoiceDTO
    {
        public Guid Id { get; set; }
        public string RollNumber { get; set; }
        public string StudentName { get; set; } 
        public Guid SubId { get; set; }
        public string SubjectName { get; set; }
        public string OEName { get; set; }
        public int Priority { get; set; }

    }
}
