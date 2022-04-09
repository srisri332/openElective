using AutoMapper;
using OpenElective.Models;
using OpenElective.Models.DTOs.Subjects;
using OpenElective.Models.DTOs.OpenElectives;
using OpenElective.Models.DTOs.Students;
using OpenElective.Models.DTOs;
using OpenElective.Models.DTOs.StudentChoices;
using OpenElective.Models.DTOs.Admin;

namespace OpenElective.Profiles
{
    public class AutoMapperProfile:Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Subject, GetSubjectDTO>();
            CreateMap<OpenElective.Models.OpenElective, GetOpenElectiveDTO>();
            CreateMap<CreateOpenElectiveDTO, OpenElective.Models.OpenElective>();
            CreateMap<UpdateOpenElectiveDTO, OpenElective.Models.OpenElective>();
            CreateMap<CreateSubjectDTO, Subject>();
            CreateMap<CreateStudentDTO, Student>();
            CreateMap<Student,GetStudentDTO>();
            CreateMap<StudentChoice, GetStudentChoiceDTO>();
            CreateMap<CreateStudentChoiceDTO, StudentChoice>();
            CreateMap<AdminAuthDTO, Admin>();
        }
    }
}
