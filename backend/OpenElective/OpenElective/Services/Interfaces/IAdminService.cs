namespace OpenElective.Services.Interfaces
{
    public interface IAdminService
    {
        public string Authenticate(Guid Id, string password);
    }
}
