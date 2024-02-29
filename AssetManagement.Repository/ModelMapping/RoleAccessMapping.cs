using AssetManagement.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AssetManagement.Repository
{
    public class RoleAccessMapping : IEntityTypeConfiguration<RoleAccess>
    {
        public void Configure(EntityTypeBuilder<RoleAccess> builder)
        {
            builder.ToTable(nameof(RoleAccess));
            builder.HasKey(t => new { t.RoleId, t.ActionId });
            builder.Property(t => t.RoleId).HasColumnName(nameof(RoleAccess.RoleId));
            builder.Property(t => t.ActionId).HasColumnName(nameof(RoleAccess.ActionId));
        }
    }
}
