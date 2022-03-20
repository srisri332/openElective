namespace OpenElective.Models.DTOs
{
    public class GetStudentDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string RollNumber { get; set; }

        public float CGPA { get; set; }

        public int Backlogs { get; set; }


    }
}
