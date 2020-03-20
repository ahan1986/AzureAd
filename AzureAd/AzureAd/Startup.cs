using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using AzureAd.Configuration;
using Microsoft.AspNetCore.Http;
using AzureAd.Services;
using Microsoft.IdentityModel.Tokens;
using System;
using Microsoft.IdentityModel.Logging;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using AzureAd.Models;

namespace AzureAd
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            IdentityModelEventSource.ShowPII = true; // IDX20803: Unable to obtain configuration from: '[PII is hidden. For more details, see https://aka.ms/IdentityModel/PII.]'.
            //at Microsoft.IdentityModel.Protocols.ConfigurationManager`1.GetConfigurationAsync(CancellationToken cancel). Found this error in POSTMAN

            //services.AddSwaggerGen(c =>
            //{
            //    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Example API", Version = "v1" });

            //    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            //    {
            //        Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
            //        Name = "Authorization",
            //        In = ParameterLocation.Header,
            //        Type = SecuritySchemeType.ApiKey,
            //        Scheme = "Bearer"
            //    });

            //    c.AddSecurityRequirement(new OpenApiSecurityRequirement()
            //    {
            //        {
            //            new OpenApiSecurityScheme
            //            {
            //                Reference = new OpenApiReference
            //                    {
            //                        Type = ReferenceType.SecurityScheme,
            //                        Id = "Bearer"
            //                    },
            //                Scheme = "oauth2",
            //                Name = "Bearer",
            //                In = ParameterLocation.Header,
            //            },
            //            new List<string>()
            //        }
            //    });
            //});

            // Add authentication (Azure AD) 
            services
                .AddAuthentication(sharedOptions =>
                {
                    sharedOptions.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                    sharedOptions.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    sharedOptions.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(options =>
                {
                    var authSettings = Configuration.GetSection("AzureAd").Get<AzureAdOptions>();

                    options.Audience = authSettings.ClientId;
                    options.Authority = authSettings.Authority;
                    options.TokenValidationParameters = new TokenValidationParameters()
                    {
                        ValidAudience = authSettings.ClientId
                    };

                    // hooking into lifecycle events - messages to console if token was validated or authentications had failed.
                    options.Events = new JwtBearerEvents
                    {
                        OnAuthenticationFailed = context =>
                        {
                            Console.WriteLine("OnAuthenticationFailed: " +
                                context.Exception.Message);
                            return Task.CompletedTask;
                        },
                        OnTokenValidated = context =>
                        {
                            Console.WriteLine("OnTokenValidated: " +
                                context.SecurityToken);
                            return Task.CompletedTask;
                        }
                    };
                });

            services.AddCors(options => 
            {
                options.AddPolicy("AllowOrigin", builder => builder.AllowAnyOrigin());
            });

            //services.AddIdentity<IdentityUser, IdentityRole>(config =>
            //{
            //    config.SignIn.RequireConfirmedEmail = true;
            //})
            //.AddDefaultTokenProviders();

            services.AddIdentity<Users, Roles>()
               .AddEntityFrameworkStores<UserDbContext>();

            string UserDatabase = Configuration["ConnectionStrings: UserDatabase"];

            services.AddDbContext<UserDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("UserDatabase")));
            //options.UseSqlServer(UserDatabase));

            services.AddControllersWithViews();

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddScoped<IIdentityService, AzureAdIdentityService>();

            //services.AddScheduler((sender, args) =>
            //{

            //});
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseCors(builder =>
            {
                builder
                    .SetIsOriginAllowed(_ => true)
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials();
            });

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseAuthentication();

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            //app.UseSwagger();
            //app.UseSwaggerUI(c =>
            //{
            //    c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
            //    //To serve the Swagger UI at the app's root (http://localhost:<port>/), set the RoutePrefix property to an empty string:

            //    //c.RoutePrefix = string.Empty;
            //});

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });

            app.UseHttpsRedirection();
        }

    }
}
