using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace AzureAd.Models
{
    public partial class UserDbContext : IdentityDbContext<Users, Roles, string>
    {
        public UserDbContext () { }

        public UserDbContext(DbContextOptions<UserDbContext> options) : base(options) { }

        public DbSet<Roles> Roles { get; set; }
        public DbSet<Users> Users { get; set; }
    }
}
