using AssetManagement.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AssetManagement.Repository
{
    public class UsersMapping : IEntityTypeConfiguration<Users>
    {
        public void Configure(EntityTypeBuilder<Users> builder)
        {
            builder.ToTable(nameof(Users));
            builder.HasKey(x => x.UserId);
            builder.Property(t => t.UserId).HasColumnName(nameof(Users.UserId));
            builder.Property(t => t.Password).HasColumnName(nameof(Users.Password));
            builder.Property(t => t.RoleId).HasColumnName(nameof(Users.RoleId));
            builder.Property(t => t.EmailId).HasColumnName(nameof(Users.EmailId));
            builder.Property(t => t.FirstName).HasColumnName(nameof(Users.FirstName));
            builder.Property(t => t.LastName).HasColumnName(nameof(Users.LastName));
            builder.Property(t => t.UserCode).HasColumnName(nameof(Users.UserCode));
            builder.Property(t => t.City).HasColumnName(nameof(Users.City));
            builder.Property(t => t.State).HasColumnName(nameof(Users.State));
            builder.Property(t => t.IsActive).HasColumnName(nameof(Users.IsActive));
            builder.Property(t => t.CreatedDate).HasColumnName(nameof(Users.CreatedDate));
            builder.Property(t => t.CreatedBy).HasColumnName(nameof(Users.CreatedBy));
            builder.Property(t => t.ModifiedDate).HasColumnName(nameof(Users.ModifiedDate));
            builder.Property(t => t.ModifiedBy).HasColumnName(nameof(Users.ModifiedBy));
            builder.Property(t => t.IsDeleted).HasColumnName(nameof(Users.IsDeleted));
        }
    }
}
