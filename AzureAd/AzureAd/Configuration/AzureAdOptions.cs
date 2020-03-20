namespace AzureAd.Configuration
{
    public class AzureAdOptions
    {
        public string Instance { get; set; }
        public string ClientId { get; set; }
        public string Tenant { get; set; }
        public string Authority => Instance + Tenant;

        // Something I added that was in Tracker and not here
        public string Domain { get; set; }
        public string TenantId { get; set; }
        public string CallbackPath { get; set; }
        public string ClientSecret { get; set; }
    }
}
