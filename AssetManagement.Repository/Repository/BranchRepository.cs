using AssetManagement.Model;
using Microsoft.EntityFrameworkCore;

namespace AssetManagement.Repository
{
    public class BranchRepository : EntityRepository<Branch>, IBranchRepository
    {
        public BranchRepository(AMContext amContext) : base(amContext)
        {
            
        }


        public async Task<BaseResponseDto<int>> SaveBranch(SaveBranchDto model)
        {
            try
            {
                var response = new BaseResponseDto<int>
                {
                    Status = false
                };
                int branchId;
                if (model.BranchId.HasValue)
                {
                    branchId = model.BranchId.Value;
                    var updateBranch = await amContext.Branch.AsNoTracking()
                        .FirstAsync(z => z.BranchId == branchId);
                    updateBranch.BranchName = model.BranchName;
                    updateBranch.BranchCode = model.BranchCode;
                    updateBranch.BranchCity = model.BranchCity;
                    updateBranch.BranchState = model.BranchState;
                    updateBranch.ModifiedBy = "Admin Updated";
                    updateBranch.ModifiedDate = DateTime.Now;
                    Update(updateBranch);
                }
                else
                {
                    Branch branch = new()
                    {
                        BranchName = model.BranchName,
                        BranchCode = model.BranchCode,
                        BranchCity = model.BranchCity,
                        BranchState = model.BranchState,
                        CreatedDate = DateTime.Now,
                        CreatedBy = "Admin",
                        IsDeleted = false,
                    };
                    Insert(branch);
                    branchId = branch.BranchId;
                }
                response.Status = true;
                response.Result = branchId;
                return response;
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine(ex);
                throw;
            }
        }

        public async Task<BaseResponseDto<List<BranchListDto>>> GetBranchList()
        {
            try
            {
                var response = new BaseResponseDto<List<BranchListDto>> { Status = false };

                var result = await (from b in amContext.Branch
                                    join e in amContext.Employee on b.BranchId equals e.BranchId into employeeGroup
                                    from emp in employeeGroup.DefaultIfEmpty()
                                    group emp by new { b.BranchName, b.BranchCode, b.BranchId } into g
                                    select new BranchListDto
                                    {
                                        BranchId = g.Key.BranchId,
                                        BranchName = g.Key.BranchName,
                                        BranchCode = g.Key.BranchCode,
                                        NoOfEmployee = g.Count(e => e != null) 
                                    }).ToListAsync();


                response.Result = result;
                response.Status = true;
                return response;
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine(ex);
                throw;
            }
        }

        public async Task<BaseResponseDto<BranchDto>> GetBranchByBranchId(int branchId)
        {
            try
            {
                var response = new BaseResponseDto<BranchDto> { Status = false };

                var result = await (from b in amContext.Branch
                                    join e in amContext.Employee on b.BranchId equals e.BranchId into emp
                                    where b.BranchId == branchId
                                    select new BranchDto
                                    {
                                        BranchName = b.BranchName,
                                        BranchCode = b.BranchCode,
                                        BranchCity = b.BranchCity,
                                        BranchState = b.BranchState,
                                        EmployeeList = emp.Select(x => new EmployeeListDto
                                        {
                                            EmployeeId = x.EmployeeId,
                                            EmailId = x.EmailId,
                                            EmployeeName = x.EmployeeName,
                                            EmployeeStatus = x.EmployeeStatus,
                                            Department = x.Department,
                                        }).ToList()
                                    }).FirstAsync();

                response.Result = result;
                response.Status = true;
                return response;
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine(ex);
                throw;
            }
        }

        public async Task<List<DropDownListDto>> GetBranchDropDown()
        {
            try
            {
                var result = await (from b in amContext.Branch
                                    where !b.IsDeleted
                                    select new DropDownListDto
                                    {
                                        Value = b.BranchId,
                                        Label = b.BranchCode + " | " + b.BranchName,
                                    }).ToListAsync();
                return result;
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine(ex);
                throw;
            }
        }
    }
}
