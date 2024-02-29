using AssetManagement.Model;
using Microsoft.EntityFrameworkCore;

namespace AssetManagement.Repository
{
    public class EmployeeRepository : EntityRepository<Employee>, IEmployeeRepository
    {
        public EmployeeRepository(AMContext amContext) : base(amContext)
        { }

        public async Task<BaseResponseDto<int>> SaveEmployee(SaveEmployeeDto employee)
        {
            try
            {
                var response = new BaseResponseDto<int>
                {
                    Status = false
                };
                int employeeId;
                if (employee.EmployeeId.HasValue)
                {
                    employeeId = employee.EmployeeId.Value;
                    var updateEmployee = await amContext.Employee.AsNoTracking()
                        .FirstAsync(z => z.EmployeeId == employeeId);
                    updateEmployee.EmployeeName = employee.EmployeeName;
                    updateEmployee.EmployeeCode = employee.EmployeeCode;
                    updateEmployee.BranchId = employee.BranchId;
                    updateEmployee.Department = employee.Department;
                    updateEmployee.Gender = employee.Gender;
                    updateEmployee.EmailId = employee.EmailId;
                    updateEmployee.DateOfBirth = employee.DateOfBirth;
                    updateEmployee.PhoneNumber = employee.PhoneNumber;
                    updateEmployee.EmployeeCity = employee.EmployeeCity;
                    updateEmployee.EmployeeState = employee.EmployeeState;
                    updateEmployee.EmployeeStatus = employee.EmployeeStatus;
                    updateEmployee.ModifiedBy = "Admin Updated";
                    updateEmployee.ModifiedDate = DateTime.Now;
                    Update(updateEmployee);
                }
                else
                {
                    Employee emp = new()
                    {
                        BranchId = null,
                        EmployeeName = employee.EmployeeName,
                        EmployeeCode = employee.EmployeeCode,
                        Department = employee.Department,
                        Gender = employee.Gender,
                        EmailId = employee.EmailId,
                        DateOfBirth = employee.DateOfBirth,
                        PhoneNumber = employee.PhoneNumber,
                        EmployeeCity = employee.EmployeeCity,
                        EmployeeState = employee.EmployeeState,
                        EmployeeStatus = employee.EmployeeStatus,
                        CreatedDate = DateTime.Now,
                        CreatedBy = "Admin",
                        IsDeleted = false,
                    };
                    Insert(emp);
                    employeeId = emp.EmployeeId;
                }
                response.Status = true;
                response.Result = employeeId;
                return response;
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine(ex);
                throw;
            }
        }
        public async Task<BaseResponseDto<List<EmployeeListDto>>> GetEmployeeList()
        {
            try
            {
                var response = new BaseResponseDto<List<EmployeeListDto>>
                {
                    Status = false
                };

                var empList = await (from emp in amContext.Employee.AsNoTracking()
                                     join br in amContext.Branch.AsNoTracking() on emp.BranchId equals br.BranchId into emb
                                     from br in emb.DefaultIfEmpty()
                                     where !emp.IsDeleted
                                     select new EmployeeListDto
                                     {
                                         EmployeeId = emp.EmployeeId,
                                         EmployeeName = emp.EmployeeName,
                                         BranchName = br.BranchName,
                                         EmailId = emp.EmailId,
                                         EmployeeStatus = emp.EmployeeStatus == "ACTV" ? "Active" : "InActive",
                                         Department = emp.Department
                                     }).ToListAsync();
                response.Result = empList;
                response.Status = true;
                return response;
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine(ex);
                throw;
            }
        }

        public async Task<BaseResponseDto<EmployeeDto>> GetEmployeeByEmployeeId(int employeeId)
        {
            try
            {
                var response = new BaseResponseDto<EmployeeDto>
                {
                    Status = false
                };

                var employee = await (from emp in amContext.Employee.AsNoTracking()
                                      where emp.EmployeeId == employeeId
                                      select new EmployeeDto
                                      {
                                          EmployeeId = emp.EmployeeId,
                                          EmployeeName = emp.EmployeeName,
                                          EmailId = emp.EmailId,
                                          EmployeeStatus = emp.EmployeeStatus,
                                          Department = emp.Department,
                                          BranchId = emp.BranchId,
                                          EmployeeCode = emp.EmployeeCode,
                                          Gender = emp.Gender,
                                          DateOfBirth = emp.DateOfBirth,
                                          PhoneNumber = emp.PhoneNumber,
                                          EmployeeCity = emp.EmployeeCity,
                                          EmployeeState = emp.EmployeeState
                                      }).FirstAsync();
                response.Result = employee;
                response.Status = true;
                return response;
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine(ex);
                throw;
            }
        }
        public async Task<List<DropDownListDto>> GetEmployeeDropDown()
        {
            try
            {
                var employee = await (from emp in amContext.Employee.AsNoTracking()
                                      where !emp.IsDeleted
                                      select new DropDownListDto
                                      {
                                          Value = emp.EmployeeId,
                                          Label = emp.EmployeeCode + " | " + emp.EmployeeName
                                      }).ToListAsync();
                return employee;
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine(ex);
                throw;
            }
        }
    }
}
