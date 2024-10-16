using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ContosoRealEstateBusinessLogic
{
    public class ListingUnavailableOnDatesException : Exception
    {
        public ListingUnavailableOnDatesException(string message) : base(message)
        {
        }
    }
}
