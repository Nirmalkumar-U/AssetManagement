using AssetManagement.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AssetManagement.Repository
{
    public class RolesMapping : IEntityTypeConfiguration<Roles>
    {
        public void Configure(EntityTypeBuilder<Roles> builder)
        {
            builder.ToTable(nameof(Roles));
            builder.HasKey(x => x.RoleId);
            builder.Property(t => t.RoleId).HasColumnName(nameof(Roles.RoleId));
            builder.Property(t => t.RoleName).HasColumnName(nameof(Roles.RoleName));
            builder.Property(t => t.RoleCode).HasColumnName(nameof(Roles.RoleCode));
            builder.Property(t => t.RoleLevel).HasColumnName(nameof(Roles.RoleLevel));
            builder.Property(t => t.CreatedDate).HasColumnName(nameof(Roles.CreatedDate));
            builder.Property(t => t.CreatedBy).HasColumnName(nameof(Roles.CreatedBy));
            builder.Property(t => t.ModifiedDate).HasColumnName(nameof(Roles.ModifiedDate));
            builder.Property(t => t.ModifiedBy).HasColumnName(nameof(Roles.ModifiedBy));
            builder.Property(t => t.IsDeleted).HasColumnName(nameof(Roles.IsDeleted));
        }
    }
}
