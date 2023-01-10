using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace QLHoDan.Data.Migrations.ApplicationDb
{
    /// <inheritdoc />
    public partial class ApplicationDbContextMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    IsActivated = table.Column<bool>(type: "bit", nullable: false),
                    Role = table.Column<int>(type: "int", nullable: false),
                    FullName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Scope = table.Column<int>(type: "int", nullable: false),
                    Note = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    Email = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SecurityStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "bit", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "bit", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DeviceCodes",
                columns: table => new
                {
                    UserCode = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    DeviceCode = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    SubjectId = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    SessionId = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    ClientId = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Expiration = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Data = table.Column<string>(type: "nvarchar(max)", maxLength: 50000, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DeviceCodes", x => x.UserCode);
                });

            migrationBuilder.CreateTable(
                name: "Household",
                columns: table => new
                {
                    HouseholdId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Scope = table.Column<int>(type: "int", nullable: false),
                    CreatedTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    MoveOutPlace = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MoveOutDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    MoveOutReason = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsManaged = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Household", x => x.HouseholdId);
                });

            migrationBuilder.CreateTable(
                name: "householdForm",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    HouseholdId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Scope = table.Column<int>(type: "int", nullable: false),
                    CreatedTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ImageLinks = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsAccepted = table.Column<bool>(type: "bit", nullable: false),
                    NotAcceptedReason = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_householdForm", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Keys",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Version = table.Column<int>(type: "int", nullable: false),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Use = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Algorithm = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    IsX509Certificate = table.Column<bool>(type: "bit", nullable: false),
                    DataProtected = table.Column<bool>(type: "bit", nullable: false),
                    Data = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Keys", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "NotificationMessage",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Time = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsRead = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NotificationMessage", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PersistedGrants",
                columns: table => new
                {
                    Key = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Type = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    SubjectId = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    SessionId = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    ClientId = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Expiration = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ConsumedTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Data = table.Column<string>(type: "nvarchar(max)", maxLength: 50000, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PersistedGrants", x => x.Key);
                });

            migrationBuilder.CreateTable(
                name: "RewardCeremony",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Time = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TotalValue = table.Column<double>(type: "float", nullable: false),
                    IsAccepted = table.Column<bool>(type: "bit", nullable: false),
                    IsDone = table.Column<bool>(type: "bit", nullable: false),
                    ClosingFormDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RewardCeremony", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(type: "nvarchar(128)", maxLength: 128, nullable: false),
                    ProviderKey = table.Column<string>(type: "nvarchar(128)", maxLength: 128, nullable: false),
                    ProviderDisplayName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    RoleId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    LoginProvider = table.Column<string>(type: "nvarchar(128)", maxLength: 128, nullable: false),
                    Name = table.Column<string>(type: "nvarchar(128)", maxLength: 128, nullable: false),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ResidentForm",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FullName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Alias = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DateOfBirth = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsMale = table.Column<bool>(type: "bit", nullable: false),
                    BirthPlace = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NativeLand = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Ethnic = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Nation = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Job = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Workplace = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IdentityCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RelationShip = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AcademicLevel = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CriminalRecord = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MoveInDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    MoveInReason = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    HouseholdFormId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ResidentForm", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ResidentForm_householdForm_HouseholdFormId",
                        column: x => x.HouseholdFormId,
                        principalTable: "householdForm",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "AchievementRewardPair",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RewardCeremonyId = table.Column<int>(type: "int", nullable: true),
                    AchievementType = table.Column<int>(type: "int", nullable: false),
                    AchievementName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RewardName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RewardValue = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AchievementRewardPair", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AchievementRewardPair_RewardCeremony_RewardCeremonyId",
                        column: x => x.RewardCeremonyId,
                        principalTable: "RewardCeremony",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "AddingResidentForm",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NewResidentId = table.Column<int>(type: "int", nullable: true),
                    ImageLinks = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsAccepted = table.Column<bool>(type: "bit", nullable: false),
                    NotAcceptedReason = table.Column<bool>(type: "bit", nullable: false),
                    Account = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AddingResidentForm", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AddingResidentForm_ResidentForm_NewResidentId",
                        column: x => x.NewResidentId,
                        principalTable: "ResidentForm",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "AchievementEvidenceForm",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdCode = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    AchievementName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AchievementType = table.Column<int>(type: "int", nullable: true),
                    ImageLinks = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsAccepted = table.Column<bool>(type: "bit", nullable: false),
                    NotAcceptedReason = table.Column<bool>(type: "bit", nullable: false),
                    Account = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AchievementEvidenceForm", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ChangingHouseholdForm",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdCode = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    NewHouseholdId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    CreatedTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsAccepted = table.Column<bool>(type: "bit", nullable: false),
                    NotAcceptedReason = table.Column<bool>(type: "bit", nullable: false),
                    Account = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChangingHouseholdForm", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ChangingHouseholdForm_Household_NewHouseholdId",
                        column: x => x.NewHouseholdId,
                        principalTable: "Household",
                        principalColumn: "HouseholdId");
                });

            migrationBuilder.CreateTable(
                name: "ChangingHouseholdInfoForm",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    HouseholdId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OwnerIdCode = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Scope = table.Column<int>(type: "int", nullable: true),
                    Reason = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsAccepted = table.Column<bool>(type: "bit", nullable: false),
                    NotAcceptedReason = table.Column<bool>(type: "bit", nullable: false),
                    Account = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChangingHouseholdInfoForm", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ChangingHouseholdInfoForm_Household_HouseholdId",
                        column: x => x.HouseholdId,
                        principalTable: "Household",
                        principalColumn: "HouseholdId");
                });

            migrationBuilder.CreateTable(
                name: "ChangingResidentInfoForm",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FullName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Alias = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DateOfBirth = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsMale = table.Column<bool>(type: "bit", nullable: true),
                    BirthPlace = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NativeLand = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Ethnic = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Nation = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Job = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Workplace = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IdCode = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    AcademicLevel = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CriminalRecord = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Reason = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsAccepted = table.Column<bool>(type: "bit", nullable: false),
                    NotAcceptedReason = table.Column<bool>(type: "bit", nullable: false),
                    Account = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChangingResidentInfoForm", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DeadForm",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdCode = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    CreatedTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsAccepted = table.Column<bool>(type: "bit", nullable: false),
                    NotAcceptedReason = table.Column<bool>(type: "bit", nullable: false),
                    ImageLinks = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Account = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DeadForm", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MovingOutForm",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MoveOutPlace = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MoveOutDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    MoveOutReason = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IdCode = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    CreatedTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsAccepted = table.Column<bool>(type: "bit", nullable: false),
                    NotAcceptedReason = table.Column<bool>(type: "bit", nullable: false),
                    Account = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MovingOutForm", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Resident",
                columns: table => new
                {
                    IdentityCode = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    FullName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Alias = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DateOfBirth = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsMale = table.Column<bool>(type: "bit", nullable: false),
                    BirthPlace = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NativeLand = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Ethnic = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Nation = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Job = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Workplace = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IDCardDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IDCardPlace = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RelationShip = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsManaged = table.Column<bool>(type: "bit", nullable: false),
                    IsDead = table.Column<bool>(type: "bit", nullable: false),
                    MoveOutPlace = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MoveOutDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    MoveOutReason = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AcademicLevel = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CriminalRecord = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MoveInDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    MoveInReason = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    HouseholdId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    SplitingHouseholdFormId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Resident", x => x.IdentityCode);
                    table.ForeignKey(
                        name: "FK_Resident_Household_HouseholdId",
                        column: x => x.HouseholdId,
                        principalTable: "Household",
                        principalColumn: "HouseholdId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ResidentChangeRecord",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ChangeType = table.Column<int>(type: "int", nullable: false),
                    ResidentIdentityCode = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FormId = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ResidentChangeRecord", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ResidentChangeRecord_Resident_ResidentIdentityCode",
                        column: x => x.ResidentIdentityCode,
                        principalTable: "Resident",
                        principalColumn: "IdentityCode",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RewardRecord",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RewardCeremonyId = table.Column<int>(type: "int", nullable: true),
                    IdCode = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    AchievementType = table.Column<int>(type: "int", nullable: false),
                    AchievementName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RewardName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RewardValue = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RewardRecord", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RewardRecord_Resident_IdCode",
                        column: x => x.IdCode,
                        principalTable: "Resident",
                        principalColumn: "IdentityCode");
                    table.ForeignKey(
                        name: "FK_RewardRecord_RewardCeremony_RewardCeremonyId",
                        column: x => x.RewardCeremonyId,
                        principalTable: "RewardCeremony",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "SplitingHouseholdForm",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OwnerIdCode = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Scope = table.Column<int>(type: "int", nullable: false),
                    Account = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsAccepted = table.Column<bool>(type: "bit", nullable: false),
                    NotAcceptedReason = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SplitingHouseholdForm", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SplitingHouseholdForm_Resident_OwnerIdCode",
                        column: x => x.OwnerIdCode,
                        principalTable: "Resident",
                        principalColumn: "IdentityCode");
                });

            migrationBuilder.CreateIndex(
                name: "IX_AchievementEvidenceForm_IdCode",
                table: "AchievementEvidenceForm",
                column: "IdCode",
                unique: true,
                filter: "[IdCode] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_AchievementRewardPair_RewardCeremonyId_AchievementType",
                table: "AchievementRewardPair",
                columns: new[] { "RewardCeremonyId", "AchievementType" },
                unique: true,
                filter: "[RewardCeremonyId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_AddingResidentForm_NewResidentId",
                table: "AddingResidentForm",
                column: "NewResidentId",
                unique: true,
                filter: "[NewResidentId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true,
                filter: "[NormalizedName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true,
                filter: "[NormalizedUserName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_ChangingHouseholdForm_IdCode",
                table: "ChangingHouseholdForm",
                column: "IdCode",
                unique: true,
                filter: "[IdCode] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_ChangingHouseholdForm_NewHouseholdId",
                table: "ChangingHouseholdForm",
                column: "NewHouseholdId",
                unique: true,
                filter: "[NewHouseholdId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_ChangingHouseholdInfoForm_HouseholdId",
                table: "ChangingHouseholdInfoForm",
                column: "HouseholdId",
                unique: true,
                filter: "[HouseholdId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_ChangingHouseholdInfoForm_OwnerIdCode",
                table: "ChangingHouseholdInfoForm",
                column: "OwnerIdCode",
                unique: true,
                filter: "[OwnerIdCode] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_ChangingResidentInfoForm_IdCode",
                table: "ChangingResidentInfoForm",
                column: "IdCode",
                unique: true,
                filter: "[IdCode] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_DeadForm_IdCode",
                table: "DeadForm",
                column: "IdCode",
                unique: true,
                filter: "[IdCode] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_DeviceCodes_DeviceCode",
                table: "DeviceCodes",
                column: "DeviceCode",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_DeviceCodes_Expiration",
                table: "DeviceCodes",
                column: "Expiration");

            migrationBuilder.CreateIndex(
                name: "IX_Keys_Use",
                table: "Keys",
                column: "Use");

            migrationBuilder.CreateIndex(
                name: "IX_MovingOutForm_IdCode",
                table: "MovingOutForm",
                column: "IdCode",
                unique: true,
                filter: "[IdCode] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_PersistedGrants_ConsumedTime",
                table: "PersistedGrants",
                column: "ConsumedTime");

            migrationBuilder.CreateIndex(
                name: "IX_PersistedGrants_Expiration",
                table: "PersistedGrants",
                column: "Expiration");

            migrationBuilder.CreateIndex(
                name: "IX_PersistedGrants_SubjectId_ClientId_Type",
                table: "PersistedGrants",
                columns: new[] { "SubjectId", "ClientId", "Type" });

            migrationBuilder.CreateIndex(
                name: "IX_PersistedGrants_SubjectId_SessionId_Type",
                table: "PersistedGrants",
                columns: new[] { "SubjectId", "SessionId", "Type" });

            migrationBuilder.CreateIndex(
                name: "IX_Resident_HouseholdId",
                table: "Resident",
                column: "HouseholdId");

            migrationBuilder.CreateIndex(
                name: "IX_Resident_SplitingHouseholdFormId",
                table: "Resident",
                column: "SplitingHouseholdFormId");

            migrationBuilder.CreateIndex(
                name: "IX_ResidentChangeRecord_ResidentIdentityCode",
                table: "ResidentChangeRecord",
                column: "ResidentIdentityCode");

            migrationBuilder.CreateIndex(
                name: "IX_ResidentForm_HouseholdFormId",
                table: "ResidentForm",
                column: "HouseholdFormId");

            migrationBuilder.CreateIndex(
                name: "IX_RewardRecord_IdCode",
                table: "RewardRecord",
                column: "IdCode",
                unique: true,
                filter: "[IdCode] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_RewardRecord_RewardCeremonyId",
                table: "RewardRecord",
                column: "RewardCeremonyId",
                unique: true,
                filter: "[RewardCeremonyId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_SplitingHouseholdForm_OwnerIdCode",
                table: "SplitingHouseholdForm",
                column: "OwnerIdCode",
                unique: true,
                filter: "[OwnerIdCode] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_AchievementEvidenceForm_Resident_IdCode",
                table: "AchievementEvidenceForm",
                column: "IdCode",
                principalTable: "Resident",
                principalColumn: "IdentityCode");

            migrationBuilder.AddForeignKey(
                name: "FK_ChangingHouseholdForm_Resident_IdCode",
                table: "ChangingHouseholdForm",
                column: "IdCode",
                principalTable: "Resident",
                principalColumn: "IdentityCode");

            migrationBuilder.AddForeignKey(
                name: "FK_ChangingHouseholdInfoForm_Resident_OwnerIdCode",
                table: "ChangingHouseholdInfoForm",
                column: "OwnerIdCode",
                principalTable: "Resident",
                principalColumn: "IdentityCode");

            migrationBuilder.AddForeignKey(
                name: "FK_ChangingResidentInfoForm_Resident_IdCode",
                table: "ChangingResidentInfoForm",
                column: "IdCode",
                principalTable: "Resident",
                principalColumn: "IdentityCode");

            migrationBuilder.AddForeignKey(
                name: "FK_DeadForm_Resident_IdCode",
                table: "DeadForm",
                column: "IdCode",
                principalTable: "Resident",
                principalColumn: "IdentityCode");

            migrationBuilder.AddForeignKey(
                name: "FK_MovingOutForm_Resident_IdCode",
                table: "MovingOutForm",
                column: "IdCode",
                principalTable: "Resident",
                principalColumn: "IdentityCode");

            migrationBuilder.AddForeignKey(
                name: "FK_Resident_SplitingHouseholdForm_SplitingHouseholdFormId",
                table: "Resident",
                column: "SplitingHouseholdFormId",
                principalTable: "SplitingHouseholdForm",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SplitingHouseholdForm_Resident_OwnerIdCode",
                table: "SplitingHouseholdForm");

            migrationBuilder.DropTable(
                name: "AchievementEvidenceForm");

            migrationBuilder.DropTable(
                name: "AchievementRewardPair");

            migrationBuilder.DropTable(
                name: "AddingResidentForm");

            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "ChangingHouseholdForm");

            migrationBuilder.DropTable(
                name: "ChangingHouseholdInfoForm");

            migrationBuilder.DropTable(
                name: "ChangingResidentInfoForm");

            migrationBuilder.DropTable(
                name: "DeadForm");

            migrationBuilder.DropTable(
                name: "DeviceCodes");

            migrationBuilder.DropTable(
                name: "Keys");

            migrationBuilder.DropTable(
                name: "MovingOutForm");

            migrationBuilder.DropTable(
                name: "NotificationMessage");

            migrationBuilder.DropTable(
                name: "PersistedGrants");

            migrationBuilder.DropTable(
                name: "ResidentChangeRecord");

            migrationBuilder.DropTable(
                name: "RewardRecord");

            migrationBuilder.DropTable(
                name: "ResidentForm");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "RewardCeremony");

            migrationBuilder.DropTable(
                name: "householdForm");

            migrationBuilder.DropTable(
                name: "Resident");

            migrationBuilder.DropTable(
                name: "Household");

            migrationBuilder.DropTable(
                name: "SplitingHouseholdForm");
        }
    }
}
