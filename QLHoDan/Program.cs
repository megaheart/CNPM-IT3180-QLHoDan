using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.IdentityModel.Tokens;
using QLHoDan.Data;
using QLHoDan.Models;
using QLHoDan.Services;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "DevOnly_AllowSpecificOrigins", policy => {
        policy.WithOrigins("https://localhost:44436", "http://localhost:44436").AllowAnyMethod().AllowAnyHeader();
    });
});

//Add custom Services
builder.Services.AddScoped<QLHoDan.Services.ITokenCreationService, JwtService>();
// Add services to the container.
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") 
            ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
var connection2String = builder.Configuration.GetConnectionString("Connection2")
            ?? throw new InvalidOperationException("Connection string 'Connection2' not found.");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    //options.UseSqlite(identityDataConnectionString)
    options.UseSqlServer(connection2String)
);
builder.Services.AddDatabaseDeveloperPageExceptionFilter();
builder.Services.AddDefaultIdentity<ApplicationUser>(options =>
        {
            options.SignIn.RequireConfirmedAccount = false;
            options.SignIn.RequireConfirmedEmail = false;
            options.SignIn.RequireConfirmedPhoneNumber = false;
            options.User.RequireUniqueEmail = false;
            options.Password.RequireDigit = false;
            options.Password.RequiredLength = 6;
            options.Password.RequireNonAlphanumeric = false;
            options.Password.RequireUppercase = false;
            options.Password.RequireLowercase = false;
        })
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>();

builder.Services.AddIdentityServer()
    .AddApiAuthorization<ApplicationUser, ApplicationDbContext>();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters()
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidAudience = builder.Configuration["JwtToken:Audience"],
            ValidIssuer = builder.Configuration["JwtToken:Issuer"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["JwtToken:Key"])
            )
        };
    });

builder.Services.AddControllersWithViews(option =>
{
    option.SuppressInputFormatterBuffering = true;
});
builder.Services.AddRazorPages();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

//Config database 
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    
    try
    {
        ApplicationDbContext applicationDbContext = services.GetRequiredService<ApplicationDbContext>();
        applicationDbContext.Database.EnsureCreated();
    }
    catch (Microsoft.Data.SqlClient.SqlException ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An error occurred creating the DB.");
    }
    //try
    //{
    //applicationDbContext = services.GetRequiredService<ApplicationDbContext>();
    //applicationDbContext.Database.EnsureCreated();
    //context = services.GetRequiredService<DataDbContext>();
    //context.Database.EnsureCreated();
    //    if(context != null)
    //        context.HoKhau.Any();
    //}
    //catch (Exception ex)
    //{
    //    (context.Database.GetService<IDatabaseCreator>() as RelationalDatabaseCreator).CreateTables();
    //}
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseMigrationsEndPoint();
    app.UseHttpLogging();
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

//if (app.Environment.IsDevelopment())
//{
//    app.UseCors("DevOnly_AllowSpecificOrigins");
//}

app.UseAuthentication();
app.UseIdentityServer();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");
app.MapRazorPages();

app.MapFallbackToFile("index.html");

app.Run();
