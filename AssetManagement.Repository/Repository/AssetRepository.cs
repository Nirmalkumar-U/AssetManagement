using AssetManagement.Model;
using Microsoft.EntityFrameworkCore;

namespace AssetManagement.Repository
{
    public class AssetRepository : EntityRepository<Asset>, IAssetRepository
    {
        private readonly IBranchRepository _branchRepository;
        private readonly IEmployeeRepository _employeeRepository;
        private readonly ICommonRepository _commonRepository;
        public AssetRepository(AMContext amContext, IBranchRepository branchRepository,
            IEmployeeRepository employeeRepository, ICommonRepository commonRepository) : base(amContext)
        {
            _branchRepository = branchRepository;
            _employeeRepository = employeeRepository;
            _commonRepository = commonRepository;
        }
        public async Task<BaseResponseDto<List<AssetDto>>> SaveAsset(CreateAssetDto model)
        {
            try
            {
                var response = new BaseResponseDto<List<AssetDto>> { Status = false };
                var lastAssetCode = await amContext.Asset.OrderByDescending(x => x.AssetCode)
                                    .Select(x => x.AssetCode).FirstOrDefaultAsync();
                int AssetCode = lastAssetCode == null ? 10000 : Convert.ToInt32(lastAssetCode) + 1;
                List<AssetDto> AssetList = new();
                int i;
                for (i = 0; i < model.NoOfAsset; i++)
                {
                    Asset asset = new()
                    {
                        BranchId = model.BranchId,
                        AssetName = model.AssetName,
                        AssetDescription = model.AssetDescription,
                        AssetType = model.TypeOfAsset,
                        AssetCost = model.CostOfAsset,
                        AssetCode = AssetCode.ToString(),
                        AssetStatus = "NREC",
                        CreatedDate = DateTime.Now,
                        CreatedBy = "Admin",
                        IsDeleted = false,
                    };
                    Insert(asset);
                    AssetCode++;
                    AssetList.Add(new()
                    {
                        AssetId = asset.AssetId,
                        AssetName = asset.AssetName,
                        AssetDescription = asset.AssetDescription,
                        AssetType = asset.AssetType,
                        AssetCost = asset.AssetCost,
                        AssetCode = asset.AssetCode,
                        AssetStatus = asset.AssetStatus
                    });
                }
                response.Result = AssetList;
                response.Status = true;
                return response;
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine(ex);
                throw;
            }
        }

        public async Task<BaseResponseDto<List<AssetListDto>>> GetAssetList()
        {
            try
            {
                var response = new BaseResponseDto<List<AssetListDto>> { Status = false };

                var assetList = await amContext.Asset
                    .Include(x => x.Branch)
                    .Include(y => y.Employee)
                    .Select(a => new AssetListDto
                    {
                        AssetId = a.AssetId,
                        AssetName = a.AssetName,
                        AssetCode = a.AssetCode,
                        EmployeeId = a.Employee == null ? null : a.Employee.EmployeeId,
                        EmployeeName = a.Employee == null ? null : a.Employee.EmployeeName,
                        BranchId = a.Branch.BranchId,
                        BranchName = a.Branch.BranchName,
                        AssetType = a.AssetType,
                        SerialNo = a.SerialNumber,
                        Status = a.AssetStatus
                    }).ToListAsync();

                response.Result = assetList;
                response.Status = true;
                return response;
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine(ex);
                throw;
            }
        }
        public async Task<BaseResponseDto<AssetDto>> GetAssetByAssetId(int assetId)
        {
            try
            {
                var response = new BaseResponseDto<AssetDto> { Status = false };

                var asset = await amContext.Asset.Where(z => z.AssetId == assetId).Select(x => new AssetDto
                {
                    AssetId = x.AssetId,
                    AssetName = x.AssetName,
                    AssetCode = x.AssetCode,
                    BranchId = x.BranchId,
                    EmployeeId = x.EmployeeId,
                    AssetDescription = x.AssetDescription,
                    AssetType = x.AssetType,
                    ModelName = x.ModelName,
                    AssetCost = x.AssetCost,
                    AssetStatus = x.AssetStatus,
                    SerialNumber = x.SerialNumber,
                }).FirstAsync();

                response.Result = asset;
                response.Status = true;
                return response;
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine(ex);
                throw;
            }
        }
        public async Task<BaseResponseDto<EditAssetInitialLoadDto>> EditAssetInitialLoad(int assetId)
        {
            try
            {
                var response = new BaseResponseDto<EditAssetInitialLoadDto> { Status = false };

                var Asset = await GetAssetByAssetId(assetId);
                var branch = await _branchRepository.GetBranchDropDown();
                var employee = await _employeeRepository.GetEmployeeDropDown();
                var assetStatus = await _commonRepository.GetStatusDropDown(Constants.AssetStatusValueCode.ToString());
                response.Result = new EditAssetInitialLoadDto
                {
                    Asset = Asset.Result,
                    BranchDropDown = branch,
                    EmployeeDropDown = employee,
                    AssetStatusDropDown = assetStatus.Where(x => x.Value.ToString() != AssetStatus.NewRecord).ToList()
                };

                response.Status = true;
                return response;
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine(ex);
                throw;
            }
        }

        public async Task<List<DropDownListDto>> AssetDropDownList()
        {
            try
            {
                var assets = await amContext.Asset.Where(x => !x.IsDeleted).Select(z => new DropDownListDto
                {
                    Label = z.AssetCode + " | " + z.AssetName,
                    Value = z.AssetId
                }).ToListAsync();

                return assets;
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine(ex);
                throw;
            }
        }
        public async Task<BaseResponseDto<bool>> UpdateAsset(AssetDto model)
        {
            try
            {
                var response = new BaseResponseDto<bool> { Status = false };

                var asset = await amContext.Asset.Where(z => z.AssetId == model.AssetId).FirstAsync();
                if (asset != null)
                {
                    asset.AssetName = model.AssetName;
                    asset.EmployeeId = model.EmployeeId;
                    asset.BranchId = model.BranchId.Value;
                    asset.AssetDescription = model.AssetDescription;
                    asset.AssetType = model.AssetType;
                    asset.ModelName = model.ModelName;
                    asset.AssetCost = model.AssetCost;
                    asset.AssetStatus = model.AssetStatus;
                    asset.SerialNumber = model.SerialNumber;
                    asset.ModifiedBy = "WEB";
                    asset.ModifiedDate = DateTime.Now;

                    Update(asset);
                    response.Result = true;
                }
                else
                {
                    response.Result = false;
                    response.Message.Add("There is no Asset on this data...");
                }
                
                response.Status = true;
                return response;
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine(ex);
                throw;
            }
        }
    }
}
