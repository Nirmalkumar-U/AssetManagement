using AssetManagement.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AssetManagement.Repository
{
    public class BranchMapping : IEntityTypeConfiguration<Branch>
    {
        public void Configure(EntityTypeBuilder<Branch> builder)
        {
            builder.ToTable(nameof(Branch));
            builder.HasKey(x => x.BranchId);
            builder.Property(t => t.BranchId).HasColumnName(nameof(Branch.BranchId));
            builder.Property(t => t.BranchName).HasColumnName(nameof(Branch.BranchName));
            builder.Property(t => t.BranchCode).HasColumnName(nameof(Branch.BranchCode));
            builder.Property(t => t.BranchCity).HasColumnName(nameof(Branch.BranchCity));
            builder.Property(t => t.BranchState).HasColumnName(nameof(Branch.BranchState));
            builder.Property(t => t.CreatedDate).HasColumnName(nameof(Branch.CreatedDate));
            builder.Property(t => t.CreatedBy).HasColumnName(nameof(Branch.CreatedBy));
            builder.Property(t => t.ModifiedDate).HasColumnName(nameof(Branch.ModifiedDate));
            builder.Property(t => t.ModifiedBy).HasColumnName(nameof(Branch.ModifiedBy));
            builder.Property(t => t.IsDeleted).HasColumnName(nameof(Branch.IsDeleted));
        }
    }
}
