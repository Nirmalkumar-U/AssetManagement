using AssetManagement.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AssetManagement.Repository
{
    public class EmployeeMapping : IEntityTypeConfiguration<Employee>
    {
        public void Configure(EntityTypeBuilder<Employee> builder)
        {
            builder.ToTable(nameof(Employee));
            builder.HasKey(x => x.EmployeeId);
            builder.Property(t => t.EmployeeId).HasColumnName(nameof(Employee.EmployeeId));
            builder.Property(t => t.BranchId).HasColumnName(nameof(Employee.BranchId));
            builder.Property(t => t.EmployeeName).HasColumnName(nameof(Employee.EmployeeName));
            builder.Property(t => t.EmployeeCode).HasColumnName(nameof(Employee.EmployeeCode));
            builder.Property(t => t.Department).HasColumnName(nameof(Employee.Department));
            builder.Property(t => t.Gender).HasColumnName(nameof(Employee.Gender));
            builder.Property(t => t.DateOfBirth).HasColumnName(nameof(Employee.DateOfBirth));
            builder.Property(t => t.EmailId).HasColumnName(nameof(Employee.EmailId));
            builder.Property(t => t.PhoneNumber).HasColumnName(nameof(Employee.PhoneNumber));
            builder.Property(t => t.EmployeeCity).HasColumnName(nameof(Employee.EmployeeCity));
            builder.Property(t => t.EmployeeState).HasColumnName(nameof(Employee.EmployeeState));
            builder.Property(t => t.EmployeeStatus).HasColumnName(nameof(Employee.EmployeeStatus));
            builder.Property(t => t.CreatedDate).HasColumnName(nameof(Employee.CreatedDate));
            builder.Property(t => t.CreatedBy).HasColumnName(nameof(Employee.CreatedBy));
            builder.Property(t => t.ModifiedDate).HasColumnName(nameof(Employee.ModifiedDate));
            builder.Property(t => t.ModifiedBy).HasColumnName(nameof(Employee.ModifiedBy));
            builder.Property(t => t.IsDeleted).HasColumnName(nameof(Employee.IsDeleted));
        }
    }
}
