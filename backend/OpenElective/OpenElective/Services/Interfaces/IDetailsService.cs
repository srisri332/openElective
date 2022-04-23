using OpenElective.Models;

namespace OpenElective.Services.Interfaces
{
    public interface IDetailsService
    {
        public Details StartProcess();

        public Details EndProcess();

        public Details Reset();

        public Details SetDate(string date);

        public Details Get();
    }
}
