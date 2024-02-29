using AssetManagement.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AssetManagement.Repository
{
    public class AssetHistoryLogMapping : IEntityTypeConfiguration<AssetHistoryLog>
    {
        public void Configure(EntityTypeBuilder<AssetHistoryLog> builder)
        {
            builder.ToTable(nameof(AssetHistoryLog));
            builder.HasKey(x => x.AssetHistoryLogId);
            builder.Property(t => t.AssetHistoryLogId).HasColumnName(nameof(AssetHistoryLog.AssetHistoryLogId));
            builder.Property(t => t.AssetId).HasColumnName(nameof(AssetHistoryLog.AssetId));
            builder.Property(t => t.EmployeeId).HasColumnName(nameof(AssetHistoryLog.EmployeeId));
            builder.Property(t => t.LogMessage).HasColumnName(nameof(AssetHistoryLog.LogMessage));
            builder.Property(t => t.CreatedDate).HasColumnName(nameof(AssetHistoryLog.CreatedDate));
            builder.Property(t => t.CreatedBy).HasColumnName(nameof(AssetHistoryLog.CreatedBy));
        }
    }
}
