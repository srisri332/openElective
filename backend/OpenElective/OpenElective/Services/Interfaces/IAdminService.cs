namespace OpenElective.Services.Interfaces
{
    public interface IAdminService
    {
        public string Authenticate(string name, string password);
    }
}
