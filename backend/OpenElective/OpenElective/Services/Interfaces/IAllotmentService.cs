using OpenElective.Models;

namespace OpenElective.Services.Interfaces
{
    public interface IAllotmentService
    {
        public IEnumerable<Allotment> Get();

        public void Reset();
    }
}
