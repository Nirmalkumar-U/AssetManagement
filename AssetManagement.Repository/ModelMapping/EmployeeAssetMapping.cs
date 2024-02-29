using AssetManagement.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AssetManagement.Repository
{
    public class EmployeeAssetMapping : IEntityTypeConfiguration<EmployeeAsset>
    {
        public void Configure(EntityTypeBuilder<EmployeeAsset> builder)
        {
            builder.ToTable(nameof(EmployeeAsset));
            builder.HasKey(ms => new { ms.AssetId, ms.EmployeeId });
            builder.Property(t => t.AssetId).HasColumnName(nameof(EmployeeAsset.AssetId));
            builder.Property(t => t.EmployeeId).HasColumnName(nameof(EmployeeAsset.EmployeeId));
        }
    }
}
