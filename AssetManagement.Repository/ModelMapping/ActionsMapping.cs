using AssetManagement.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AssetManagement.Repository
{
    public class ActionsMapping : IEntityTypeConfiguration<Actions>
    {
        public void Configure(EntityTypeBuilder<Actions> builder)
        {
            builder.ToTable(nameof(Actions));
            builder.HasKey(x => x.ActionId);
            builder.Property(t => t.ActionId).HasColumnName(nameof(Actions.ActionId));
            builder.Property(t => t.ActionName).HasColumnName(nameof(Actions.ActionName));
            builder.Property(t => t.ActionType).HasColumnName(nameof(Actions.ActionType));
            builder.Property(t => t.CreatedDate).HasColumnName(nameof(Actions.CreatedDate));
            builder.Property(t => t.CreatedBy).HasColumnName(nameof(Actions.CreatedBy));
            builder.Property(t => t.ModifiedDate).HasColumnName(nameof(Actions.ModifiedDate));
            builder.Property(t => t.ModifiedBy).HasColumnName(nameof(Actions.ModifiedBy));
            builder.Property(t => t.IsDeleted).HasColumnName(nameof(Actions.IsDeleted));
        }
    }
}
