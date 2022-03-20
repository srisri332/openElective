using AutoMapper;
using OpenElective.Models;
using OpenElective.Models.DTOs.Subjects;
using OpenElective.Models.DTOs.OpenElectives;
using OpenElective.Models.DTOs.Students;
using OpenElective.Models.DTOs;

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
        }
    }
}
