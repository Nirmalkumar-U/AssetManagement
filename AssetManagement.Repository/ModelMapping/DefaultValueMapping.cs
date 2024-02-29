using AssetManagement.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AssetManagement.Repository
{
    public class DefaultValueMapping : IEntityTypeConfiguration<DefaultValue>
    {

        public void Configure(EntityTypeBuilder<DefaultValue> builder)
        {
            builder.ToTable(nameof(DefaultValue));
            builder.HasKey(x => x.DefaultValueId);
            builder.Property(t => t.DefaultValueId).HasColumnName(nameof(DefaultValue.DefaultValueId));
            builder.Property(t => t.ValueCode).HasColumnName(nameof(DefaultValue.ValueCode));
            builder.Property(t => t.ValueName).HasColumnName(nameof(DefaultValue.ValueName));
            builder.Property(t => t.ValueDescription).HasColumnName(nameof(DefaultValue.ValueDescription));
            builder.Property(t => t.Data1).HasColumnName(nameof(DefaultValue.Data1));
            builder.Property(t => t.Data2).HasColumnName(nameof(DefaultValue.Data2));
            builder.Property(t => t.Data3).HasColumnName(nameof(DefaultValue.Data3));
            builder.Property(t => t.OrderNo).HasColumnName(nameof(DefaultValue.OrderNo));
            builder.Property(t => t.CreatedDate).HasColumnName(nameof(DefaultValue.CreatedDate));
            builder.Property(t => t.CreatedBy).HasColumnName(nameof(DefaultValue.CreatedBy));
            builder.Property(t => t.IsDeleted).HasColumnName(nameof(DefaultValue.IsDeleted));
        }
    }
}
