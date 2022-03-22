﻿namespace OpenElective.Models.DTOs.Subjects
{
    public class GetSubjectDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }


        public Guid DepartmentId { get; set; }
        public int Credits { get; set; }
        public int Seats { get; set; }

        public string Instructor { get; set; }

        public string Details { get; set; }
    }
}