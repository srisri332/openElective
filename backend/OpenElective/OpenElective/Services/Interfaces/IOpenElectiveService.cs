

namespace OpenElective.Services.Interfaces
{
    public interface IOpenElectiveService
    {
        public OpenElective.Models.OpenElective? Get(Guid Id);

        public OpenElective.Models.OpenElective? Create(OpenElective.Models.OpenElective openElective);

        public OpenElective.Models.OpenElective? Update(OpenElective.Models.OpenElective openElective);

        public OpenElective.Models.OpenElective? Delete(Guid Id);

        public IEnumerable<OpenElective.Models.OpenElective> GetAll();
    }
}
