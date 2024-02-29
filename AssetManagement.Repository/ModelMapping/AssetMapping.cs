using AssetManagement.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AssetManagement.Repository
{
    public class AssetMapping : IEntityTypeConfiguration<Asset>
    {
        public void Configure(EntityTypeBuilder<Asset> builder)
        {
            builder.ToTable(nameof(Asset));
            builder.HasKey(x => x.AssetId);
            builder.Property(t => t.AssetId).HasColumnName(nameof(Asset.AssetId));
            builder.Property(t => t.BranchId).HasColumnName(nameof(Asset.BranchId));
            builder.Property(t => t.EmployeeId).HasColumnName(nameof(Asset.EmployeeId));
            builder.Property(t => t.AssetName).HasColumnName(nameof(Asset.AssetName));
            builder.Property(t => t.AssetDescription).HasColumnName(nameof(Asset.AssetDescription));
            builder.Property(t => t.AssetType).HasColumnName(nameof(Asset.AssetType));
            builder.Property(t => t.ModelName).HasColumnName(nameof(Asset.ModelName));
            builder.Property(t => t.AssetCost).HasColumnName(nameof(Asset.AssetCost));
            builder.Property(t => t.SerialNumber).HasColumnName(nameof(Asset.SerialNumber));
            builder.Property(t => t.AssetCode).HasColumnName(nameof(Asset.AssetCode));
            builder.Property(t => t.AssetStatus).HasColumnName(nameof(Asset.AssetStatus));
            builder.Property(t => t.CreatedDate).HasColumnName(nameof(Asset.CreatedDate));
            builder.Property(t => t.CreatedBy).HasColumnName(nameof(Asset.CreatedBy));
            builder.Property(t => t.ModifiedDate).HasColumnName(nameof(Asset.ModifiedDate));
            builder.Property(t => t.ModifiedBy).HasColumnName(nameof(Asset.ModifiedBy));
            builder.Property(t => t.IsDeleted).HasColumnName(nameof(Asset.IsDeleted));
        }
    }
}
