using AssetManagement.Repository;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
dependencyInjectionService();

// Transient Custom DI Resolve
builder.Services.AddTransient(typeof(IEntityRepository<>), typeof(EntityRepository<>));
builder.Services.AddHttpContextAccessor();
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<AMContext>(option =>
{
    option.UseSqlServer(builder.Configuration.GetConnectionString("AssetManagementConnection"));
});

builder.Services.AddCors(p => p.AddPolicy("corsapp", builder =>
{
    builder.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
}));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("corsapp");

app.UseHttpsRedirection();

//app.UseAuthorization();

app.MapControllers();

app.Run();


void dependencyInjectionService()
{
    builder.Services.AddScoped<IEmployeeRepository, EmployeeRepository>();
    builder.Services.AddScoped<IBranchRepository, BranchRepository>();
    builder.Services.AddScoped<IAssetRepository, AssetRepository>();
    builder.Services.AddScoped<ICommonRepository, CommonRepository>();
    builder.Services.AddScoped<ICommonSharedRepository, CommonSharedRepository>();
    builder.Services.AddScoped<IEncriptDecriptRepository, EncriptDecriptRepository>();
    builder.Services.AddScoped<IUserRepository, UserRepository>();
    builder.Services.AddScoped<IRoleRepository, RoleRepository>();
}
