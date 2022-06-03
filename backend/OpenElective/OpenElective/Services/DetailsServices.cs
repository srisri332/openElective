using OpenElective.Models;
using OpenElective.Services.Interfaces;
using System.Globalization;

namespace OpenElective.Services
{
    public class DetailsServices : IDetailsService
    {
        private readonly AppDbContext appDbContext;

        public DetailsServices(AppDbContext appDbContext)
        {
            this.appDbContext = appDbContext;
        }
        public Details? Get()
        {
            var res= appDbContext.Details.FirstOrDefault(d => d.Name == "BVRIT");
            if (res == null)
                return null;
            return res;
        }
        public Details EndProcess()
        {

            Details d=appDbContext.Details.FirstOrDefault(d=>d.Name=="BVRIT");
#pragma warning disable CS8602 // Dereference of a possibly null reference.
            d.IsCompleted=true;
#pragma warning restore CS8602 // Dereference of a possibly null reference.
            d.IsStarted=true;
            appDbContext.Details.Attach(d);
            appDbContext.SaveChanges();
            return d;
        }

        public Details Reset()
        {
            Details d = appDbContext.Details.FirstOrDefault(d => d.Name == "BVRIT");
#pragma warning disable CS8602 // Dereference of a possibly null reference.
            d.IsCompleted = false;
#pragma warning restore CS8602 // Dereference of a possibly null reference.
            d.IsStarted=false;
            d.Date = DateTime.Now.ToString("ddMMyyyy", CultureInfo.InvariantCulture);
            appDbContext.Details.Attach(d);
            appDbContext.SaveChanges();
            return d;
        }

        public Details SetDate(string date)
        {
            Details d = appDbContext.Details.FirstOrDefault(d => d.Name == "BVRIT");
#pragma warning disable CS8602 // Dereference of a possibly null reference.
            d.Date = date;
#pragma warning restore CS8602 // Dereference of a possibly null reference.
            appDbContext.Details.Attach(d);
            appDbContext.SaveChanges();
            return d;
        }

        public Details StartProcess()
        {
            Details d = appDbContext.Details.FirstOrDefault(d => d.Name == "BVRIT");
#pragma warning disable CS8602 // Dereference of a possibly null reference.
            d.IsStarted = true;
#pragma warning restore CS8602 // Dereference of a possibly null reference.
            appDbContext.Details.Attach(d);
            appDbContext.SaveChanges();
            return d;
        }

       
    }
}
