using AssetManagement.Model;
using AssetManagement.Repository;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.IO.Compression;
using System.Reflection;
using System.Text;

namespace AssetManagement.Api
{
    public static class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            var configuration = builder.Configuration.GetConfiguration();

            var startup = new Startup(configuration);

            startup.ConfigureServices(builder.Services);

            var app = builder.Build();
            var httpContextAccessor = app.Services.GetService<IHttpContextAccessor>();
            var hostApplicationLifetime = app.Services.GetService<IHostApplicationLifetime>();

            startup.Configure(app, app.Environment, hostApplicationLifetime, httpContextAccessor);

            app.Run();
        }

        private static IConfiguration GetConfiguration(this ConfigurationManager configurationManager)
        {
            var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
            var basePath = Path.GetDirectoryName(Assembly.GetEntryAssembly().Location);

            var builder = configurationManager
                .SetBasePath(basePath)
                .AddJsonFile($"appsettings.{env}.json", optional: false, reloadOnChange: true);

            builder.AddEnvironmentVariables();

            return builder.Build();
        }
    }

    public class Startup
    {
        public IConfiguration Configuration { get; }
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            DependencyInjectionService(services);

            services.AddHttpContextAccessor();
            services.AddControllers();

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();

            services.AddDbContext<AMContext>(option =>
            {
                option.UseSqlServer(Configuration.GetConnectionString("AssetManagementConnection"));
            });

            services.AddCors(opt =>
            {
                opt.AddDefaultPolicy(builder =>
                {
                    builder.WithOrigins(Configuration["AppSettings:AllowedOrigin"])
                       .AllowAnyHeader()
                        .AllowAnyMethod();
                });
            });

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            var appSettings = Configuration.GetSection("AppSettings");

            services.Configure<AppSettingsDto>(appSettings);

            // Add services to the container.
            services.AddControllers(options =>
            {
                options.AllowEmptyInputInBodyModelBinding = true;
            });

            services.Configure<GzipCompressionProviderOptions>(options =>
            {
                options.Level = CompressionLevel.Optimal;
            });

            services.AddResponseCompression(options =>
            {
                options.EnableForHttps = true;
                options.Providers.Add<GzipCompressionProvider>();
            });

            // Configure JWT authentication
            var securityKey = "NMyISuRpeMrSAecLreHtKAeyR12I3!NI";
            var mySecurityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(securityKey));
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidIssuer = "itismekumaru",
                        ValidateAudience = true,
                        ValidAudience = "itisaudience",
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = mySecurityKey,
                        ValidateLifetime = true
                    };
                });
        }

        public void Configure(WebApplication app, IWebHostEnvironment env, IHostApplicationLifetime hostApplicationLifetime, IHttpContextAccessor httpContextAccessor)
        {
            if (env.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseCors(options => options.WithOrigins(Configuration["AppSettings:AllowedOrigin"]).AllowAnyHeader().AllowAnyMethod());

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
            ApplicationAppContext.Configure(httpContextAccessor, Configuration);
        }

        private static void DependencyInjectionService(IServiceCollection services)
        {
            services.AddScoped<IEmployeeRepository, EmployeeRepository>();
            services.AddScoped<IBranchRepository, BranchRepository>();
            services.AddScoped<IAssetRepository, AssetRepository>();
            services.AddScoped<ICommonRepository, CommonRepository>();
            services.AddScoped<ICommonSharedRepository, CommonSharedRepository>();
            services.AddScoped<IEncriptDecriptRepository, EncriptDecriptRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IRoleRepository, RoleRepository>();
        }
    }
}
