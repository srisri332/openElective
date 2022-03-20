namespace OpenElective.Models
{
    public class Student
    {
        public Guid Id { get; set; }
        
        public string RollNumber { get; set; }
        
        public string Name { get; set; }

        public string Password { get; set; }

        public float CGPA { get; set; }

        public int Backlogs { get; set; }

    }
}
