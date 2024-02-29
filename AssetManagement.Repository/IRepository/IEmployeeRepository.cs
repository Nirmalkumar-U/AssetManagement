using AssetManagement.Model;

namespace AssetManagement.Repository
{
    public interface IEmployeeRepository
    {
        Task<BaseResponseDto<int>> SaveEmployee(SaveEmployeeDto employee);
        Task<BaseResponseDto<List<EmployeeListDto>>> GetEmployeeList();
        Task<BaseResponseDto<EmployeeDto>> GetEmployeeByEmployeeId(int employeeId);
        Task<List<DropDownListDto>> GetEmployeeDropDown();
    }
}
