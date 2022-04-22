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
        public Details Get()
        {
            return appDbContext.Details.FirstOrDefault(d => d.Name == "BVRIT");
        }
        public Details EndProcess()
        {

            Details d=appDbContext.Details.FirstOrDefault(d=>d.Name=="BVRIT");
            d.IsCompleted=true;
            d.IsStarted=true;
            appDbContext.Details.Attach(d);
            appDbContext.SaveChanges();
            return d;
        }

        public Details Reset()
        {
            Details d = appDbContext.Details.FirstOrDefault(d => d.Name == "BVRIT");
            d.IsCompleted = false;
            d.IsStarted=false;
            d.Date = DateTime.Now.ToString("ddMMyyyy", CultureInfo.InvariantCulture);
            appDbContext.Details.Attach(d);
            appDbContext.SaveChanges();
            return d;
        }

        public Details SetDate(string date)
        {
            Details d = appDbContext.Details.FirstOrDefault(d => d.Name == "BVRIT");
            d.Date = date;
            appDbContext.Details.Attach(d);
            appDbContext.SaveChanges();
            return d;
        }

        public Details StartProcess()
        {
            Details d = appDbContext.Details.FirstOrDefault(d => d.Name == "BVRIT");
            d.IsStarted = true;
            appDbContext.Details.Attach(d);
            appDbContext.SaveChanges();
            return d;
        }

       
    }
}
