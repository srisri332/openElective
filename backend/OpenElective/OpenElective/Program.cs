using OpenElective.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using OpenElective.Services;
using OpenElective.Services.Interfaces;
using OpenElective.Profiles;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      builder =>
                      {
                          builder.WithOrigins("https://frontend-8s532wy30-srisri332.vercel.app", "http://localhost:3000",
                                              "https://open-elective.vercel.app",
                                              "https://open-elective-srisri332.vercel.app",
                                              "https://open-elective-git-main-srisri332.vercel.app")
                                                .AllowAnyHeader()
                                                .AllowAnyMethod()
                                                .AllowCredentials();
                          
                      });
});

// Add services to the container.

builder.Services.AddDbContextPool<AppDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("OEDBCS")));

builder.Services.AddScoped<IOpenElectiveService,OpenElectiveService>();
builder.Services.AddScoped<ISubjectService, SubjectService>();
builder.Services.AddScoped<IStudentService, StudentService>();
builder.Services.AddScoped<IStudentChoiceService, StudentChoiceService>();
builder.Services.AddScoped<IDetailsService, DetailsServices>();
builder.Services.AddScoped<IAllotmentService, AllotmentService>();


builder.Services.AddAuthentication(a =>
{
    a.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    a.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(
        b =>
        {
            b.RequireHttpsMetadata = false;
            b.SaveToken = true;
            b.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes("Kurzgesagt � In a Nutshell")),
                ValidateIssuer = false,
                ValidateAudience = false,
            };
        });

builder.Services.AddAutoMapper(typeof(AutoMapperProfile));
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

    app.UseSwagger();
    app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseCors(MyAllowSpecificOrigins);


app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
