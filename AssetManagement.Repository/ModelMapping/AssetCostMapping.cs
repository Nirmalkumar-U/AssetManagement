using AssetManagement.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AssetManagement.Repository
{
    public class AssetCostMapping : IEntityTypeConfiguration<AssetCost>
    {
        public void Configure(EntityTypeBuilder<AssetCost> builder)
        {
            builder.ToTable(nameof(AssetCost));
            builder.HasKey(x => x.AssetCostId);
            builder.Property(t => t.AssetCostId).HasColumnName(nameof(AssetCost.AssetCostId));
            builder.Property(t => t.AssetId).HasColumnName(nameof(AssetCost.AssetId));
            builder.Property(t => t.BranchId).HasColumnName(nameof(AssetCost.BranchId));
            builder.Property(t => t.NoOfItem).HasColumnName(nameof(AssetCost.NoOfItem));
            builder.Property(t => t.TotalCost).HasColumnName(nameof(AssetCost.TotalCost));
            builder.Property(t => t.CreatedDate).HasColumnName(nameof(AssetCost.CreatedDate));
            builder.Property(t => t.CreatedBy).HasColumnName(nameof(AssetCost.CreatedBy));
        }
    }
}
