using AssetManagement.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;


namespace AssetManagement.Repository
{
    public class AMContext : DbContext
    {
        public readonly int UserId;
        public readonly int RoleId;
        public readonly string UserEmail;
        public AMContext(DbContextOptions<AMContext> dbContextOptions, IHttpContextAccessor httpContextAccessor) : base(dbContextOptions)
        {
            if (httpContextAccessor.HttpContext.User.Claims.Any())
            {
                // will do
            }
        }
        public DbSet<Asset> Asset { get; set; }
        //public DbSet<AssetCost> AssetCost { get; set; }
        public DbSet<AssetHistoryLog> AssetHistoryLog { get; set; }
        public DbSet<Branch> Branch { get; set; }
        public DbSet<Employee> Employee { get; set; }
        public DbSet<DefaultValue> DefaultValue { get; set; }
        //public DbSet<EmployeeAsset> EmployeeAsset { get; set; }
        public DbSet<Roles> Roles { get; set; }
        public DbSet<Users> Users { get; set; }
        public DbSet<Actions> Actions { get; set; }
        public DbSet<RoleAccess> RoleAccess { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new AssetMapping());
            //modelBuilder.ApplyConfiguration(new AssetCostMapping());
            modelBuilder.ApplyConfiguration(new AssetHistoryLogMapping());
            modelBuilder.ApplyConfiguration(new BranchMapping());
            modelBuilder.ApplyConfiguration(new EmployeeMapping());
            modelBuilder.ApplyConfiguration(new DefaultValueMapping());
            //modelBuilder.ApplyConfiguration(new EmployeeAssetMapping());
            modelBuilder.ApplyConfiguration(new RolesMapping());
            modelBuilder.ApplyConfiguration(new UsersMapping());
            modelBuilder.ApplyConfiguration(new ActionsMapping());
            modelBuilder.ApplyConfiguration(new RoleAccessMapping());

            base.OnModelCreating(modelBuilder);
        }
    }
}
