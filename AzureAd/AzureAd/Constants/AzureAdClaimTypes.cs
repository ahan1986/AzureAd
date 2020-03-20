using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AzureAd.Constants
{
    public class AzureAdClaimTypes
    {
        public const string ObjectId = "http://schemas.microsoft.com/identity/claims/objectidentifier";

        public const string Scope = "http://schemas.microsoft.com/identity/claims/scope";

        public const string Name = "name";

        public const string FirstName = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname";

        public const string LastName = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname";
    }
}
