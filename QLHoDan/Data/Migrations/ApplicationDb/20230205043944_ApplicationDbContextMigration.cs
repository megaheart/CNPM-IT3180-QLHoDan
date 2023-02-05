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
                    Id = table.Column<string>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT", nullable: false),
                    IsActivated = table.Column<bool>(type: "INTEGER", nullable: false),
                    Role = table.Column<int>(type: "INTEGER", nullable: false),
                    FullName = table.Column<string>(type: "TEXT", nullable: false),
                    Scope = table.Column<int>(type: "INTEGER", nullable: false),
                    Note = table.Column<string>(type: "TEXT", nullable: true),
                    AvatarLink = table.Column<int>(type: "INTEGER", nullable: true),
                    WallpaperLink = table.Column<int>(type: "INTEGER", nullable: true),
                    UserName = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                    Email = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "INTEGER", nullable: false),
                    PasswordHash = table.Column<string>(type: "TEXT", nullable: true),
                    SecurityStamp = table.Column<string>(type: "TEXT", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "TEXT", nullable: true),
                    PhoneNumber = table.Column<string>(type: "TEXT", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "INTEGER", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "INTEGER", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "TEXT", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "INTEGER", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Household",
                columns: table => new
                {
                    HouseholdId = table.Column<string>(type: "TEXT", nullable: false),
                    Address = table.Column<string>(type: "TEXT", nullable: false),
                    Scope = table.Column<int>(type: "INTEGER", nullable: false),
                    CreatedTime = table.Column<DateTime>(type: "TEXT", nullable: false),
                    MoveOutPlace = table.Column<string>(type: "TEXT", nullable: true),
                    MoveOutDate = table.Column<DateTime>(type: "TEXT", nullable: true),
                    MoveOutReason = table.Column<string>(type: "TEXT", nullable: true),
                    IsManaged = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Household", x => x.HouseholdId);
                });

            migrationBuilder.CreateTable(
                name: "HouseholdForm",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    HouseholdId = table.Column<string>(type: "TEXT", nullable: false),
                    Address = table.Column<string>(type: "TEXT", nullable: false),
                    Scope = table.Column<int>(type: "INTEGER", nullable: false),
                    CreatedTime = table.Column<DateTime>(type: "TEXT", nullable: false),
                    ImageLinks = table.Column<string>(type: "TEXT", nullable: false),
                    IsAccepted = table.Column<bool>(type: "INTEGER", nullable: false),
                    NotAcceptedReason = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HouseholdForm", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "NotificationMessage",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Time = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Content = table.Column<string>(type: "TEXT", nullable: false),
                    IsRead = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NotificationMessage", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RewardCeremony",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Time = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Type = table.Column<string>(type: "TEXT", nullable: false),
                    TotalValue = table.Column<double>(type: "REAL", nullable: false),
                    IsAccepted = table.Column<bool>(type: "INTEGER", nullable: false),
                    IsDone = table.Column<bool>(type: "INTEGER", nullable: false),
                    ClosingFormDate = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RewardCeremony", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    RoleId = table.Column<string>(type: "TEXT", nullable: false),
                    ClaimType = table.Column<string>(type: "TEXT", nullable: true),
                    ClaimValue = table.Column<string>(type: "TEXT", nullable: true)
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
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    UserId = table.Column<string>(type: "TEXT", nullable: false),
                    ClaimType = table.Column<string>(type: "TEXT", nullable: true),
                    ClaimValue = table.Column<string>(type: "TEXT", nullable: true)
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
                    LoginProvider = table.Column<string>(type: "TEXT", maxLength: 128, nullable: false),
                    ProviderKey = table.Column<string>(type: "TEXT", maxLength: 128, nullable: false),
                    ProviderDisplayName = table.Column<string>(type: "TEXT", nullable: true),
                    UserId = table.Column<string>(type: "TEXT", nullable: false)
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
                    UserId = table.Column<string>(type: "TEXT", nullable: false),
                    RoleId = table.Column<string>(type: "TEXT", nullable: false)
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
                    UserId = table.Column<string>(type: "TEXT", nullable: false),
                    LoginProvider = table.Column<string>(type: "TEXT", maxLength: 128, nullable: false),
                    Name = table.Column<string>(type: "TEXT", maxLength: 128, nullable: false),
                    Value = table.Column<string>(type: "TEXT", nullable: true)
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
                name: "Resident",
                columns: table => new
                {
                    IdentityCode = table.Column<string>(type: "TEXT", nullable: false),
                    FullName = table.Column<string>(type: "TEXT", nullable: false),
                    Alias = table.Column<string>(type: "TEXT", nullable: false),
                    DateOfBirth = table.Column<DateTime>(type: "TEXT", nullable: false),
                    IsMale = table.Column<bool>(type: "INTEGER", nullable: false),
                    BirthPlace = table.Column<string>(type: "TEXT", nullable: false),
                    NativeLand = table.Column<string>(type: "TEXT", nullable: false),
                    Ethnic = table.Column<string>(type: "TEXT", nullable: false),
                    Nation = table.Column<string>(type: "TEXT", nullable: false),
                    Job = table.Column<string>(type: "TEXT", nullable: false),
                    Workplace = table.Column<string>(type: "TEXT", nullable: false),
                    IDCardDate = table.Column<DateTime>(type: "TEXT", nullable: true),
                    IDCardPlace = table.Column<string>(type: "TEXT", nullable: true),
                    RelationShip = table.Column<string>(type: "TEXT", nullable: false),
                    IsManaged = table.Column<bool>(type: "INTEGER", nullable: false),
                    IsDead = table.Column<bool>(type: "INTEGER", nullable: false),
                    MoveOutPlace = table.Column<string>(type: "TEXT", nullable: true),
                    MoveOutDate = table.Column<DateTime>(type: "TEXT", nullable: true),
                    MoveOutReason = table.Column<string>(type: "TEXT", nullable: true),
                    AcademicLevel = table.Column<string>(type: "TEXT", nullable: false),
                    CriminalRecord = table.Column<string>(type: "TEXT", nullable: false),
                    MoveInDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    MoveInReason = table.Column<string>(type: "TEXT", nullable: false),
                    Scope = table.Column<int>(type: "INTEGER", nullable: false),
                    HouseholdId = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Resident", x => x.IdentityCode);
                    table.ForeignKey(
                        name: "FK_Resident_Household_HouseholdId",
                        column: x => x.HouseholdId,
                        principalTable: "Household",
                        principalColumn: "HouseholdId");
                });

            migrationBuilder.CreateTable(
                name: "ResidentForm",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    FullName = table.Column<string>(type: "TEXT", nullable: false),
                    Alias = table.Column<string>(type: "TEXT", nullable: false),
                    DateOfBirth = table.Column<DateTime>(type: "TEXT", nullable: false),
                    IsMale = table.Column<bool>(type: "INTEGER", nullable: false),
                    BirthPlace = table.Column<string>(type: "TEXT", nullable: false),
                    NativeLand = table.Column<string>(type: "TEXT", nullable: false),
                    Ethnic = table.Column<string>(type: "TEXT", nullable: false),
                    Nation = table.Column<string>(type: "TEXT", nullable: false),
                    Job = table.Column<string>(type: "TEXT", nullable: false),
                    Workplace = table.Column<string>(type: "TEXT", nullable: false),
                    IdentityCode = table.Column<string>(type: "TEXT", nullable: false),
                    RelationShip = table.Column<string>(type: "TEXT", nullable: false),
                    AcademicLevel = table.Column<string>(type: "TEXT", nullable: false),
                    CriminalRecord = table.Column<string>(type: "TEXT", nullable: false),
                    MoveInDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    MoveInReason = table.Column<string>(type: "TEXT", nullable: false),
                    HouseholdFormId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ResidentForm", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ResidentForm_HouseholdForm_HouseholdFormId",
                        column: x => x.HouseholdFormId,
                        principalTable: "HouseholdForm",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "AchievementRewardPair",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    RewardCeremonyId = table.Column<int>(type: "INTEGER", nullable: true),
                    AchievementType = table.Column<int>(type: "INTEGER", nullable: false),
                    AchievementName = table.Column<string>(type: "TEXT", nullable: false),
                    RewardName = table.Column<string>(type: "TEXT", nullable: false),
                    RewardValue = table.Column<double>(type: "REAL", nullable: false)
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
                name: "AchievementEvidenceForm",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ResidentIdentityCode = table.Column<string>(type: "TEXT", nullable: false),
                    AchievementName = table.Column<string>(type: "TEXT", nullable: false),
                    AchievementType = table.Column<int>(type: "INTEGER", nullable: true),
                    ImageLinks = table.Column<string>(type: "TEXT", nullable: false),
                    CreatedTime = table.Column<DateTime>(type: "TEXT", nullable: false),
                    IsAccepted = table.Column<bool>(type: "INTEGER", nullable: false),
                    NotAcceptedReason = table.Column<bool>(type: "INTEGER", nullable: false),
                    Account = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AchievementEvidenceForm", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AchievementEvidenceForm_Resident_ResidentIdentityCode",
                        column: x => x.ResidentIdentityCode,
                        principalTable: "Resident",
                        principalColumn: "IdentityCode");
                });

            migrationBuilder.CreateTable(
                name: "ChangingHouseholdForm",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ResidentIdentityCode = table.Column<string>(type: "TEXT", nullable: false),
                    NewHouseholdHouseholdId = table.Column<string>(type: "TEXT", nullable: false),
                    CreatedTime = table.Column<DateTime>(type: "TEXT", nullable: false),
                    IsAccepted = table.Column<bool>(type: "INTEGER", nullable: false),
                    NotAcceptedReason = table.Column<bool>(type: "INTEGER", nullable: false),
                    Account = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChangingHouseholdForm", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ChangingHouseholdForm_Household_NewHouseholdHouseholdId",
                        column: x => x.NewHouseholdHouseholdId,
                        principalTable: "Household",
                        principalColumn: "HouseholdId");
                    table.ForeignKey(
                        name: "FK_ChangingHouseholdForm_Resident_ResidentIdentityCode",
                        column: x => x.ResidentIdentityCode,
                        principalTable: "Resident",
                        principalColumn: "IdentityCode");
                });

            migrationBuilder.CreateTable(
                name: "ChangingHouseholdInfoForm",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    HouseholdId = table.Column<string>(type: "TEXT", nullable: false),
                    Address = table.Column<string>(type: "TEXT", nullable: true),
                    OwnerIdentityCode = table.Column<string>(type: "TEXT", nullable: true),
                    Scope = table.Column<int>(type: "INTEGER", nullable: true),
                    Reason = table.Column<string>(type: "TEXT", nullable: false),
                    CreatedTime = table.Column<DateTime>(type: "TEXT", nullable: false),
                    IsAccepted = table.Column<bool>(type: "INTEGER", nullable: false),
                    NotAcceptedReason = table.Column<bool>(type: "INTEGER", nullable: false),
                    Account = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChangingHouseholdInfoForm", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ChangingHouseholdInfoForm_Household_HouseholdId",
                        column: x => x.HouseholdId,
                        principalTable: "Household",
                        principalColumn: "HouseholdId");
                    table.ForeignKey(
                        name: "FK_ChangingHouseholdInfoForm_Resident_OwnerIdentityCode",
                        column: x => x.OwnerIdentityCode,
                        principalTable: "Resident",
                        principalColumn: "IdentityCode");
                });

            migrationBuilder.CreateTable(
                name: "ChangingResidentInfoForm",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    FullName = table.Column<string>(type: "TEXT", nullable: true),
                    Alias = table.Column<string>(type: "TEXT", nullable: true),
                    DateOfBirth = table.Column<DateTime>(type: "TEXT", nullable: true),
                    IsMale = table.Column<bool>(type: "INTEGER", nullable: true),
                    BirthPlace = table.Column<string>(type: "TEXT", nullable: true),
                    NativeLand = table.Column<string>(type: "TEXT", nullable: true),
                    Ethnic = table.Column<string>(type: "TEXT", nullable: true),
                    Nation = table.Column<string>(type: "TEXT", nullable: true),
                    Job = table.Column<string>(type: "TEXT", nullable: true),
                    Workplace = table.Column<string>(type: "TEXT", nullable: true),
                    ResidentIdentityCode = table.Column<string>(type: "TEXT", nullable: false),
                    AcademicLevel = table.Column<string>(type: "TEXT", nullable: true),
                    CriminalRecord = table.Column<string>(type: "TEXT", nullable: true),
                    Reason = table.Column<string>(type: "TEXT", nullable: false),
                    CreatedTime = table.Column<DateTime>(type: "TEXT", nullable: false),
                    IsAccepted = table.Column<bool>(type: "INTEGER", nullable: false),
                    NotAcceptedReason = table.Column<bool>(type: "INTEGER", nullable: false),
                    Account = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChangingResidentInfoForm", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ChangingResidentInfoForm_Resident_ResidentIdentityCode",
                        column: x => x.ResidentIdentityCode,
                        principalTable: "Resident",
                        principalColumn: "IdentityCode");
                });

            migrationBuilder.CreateTable(
                name: "DeadForm",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ResidentIdentityCode = table.Column<string>(type: "TEXT", nullable: false),
                    CreatedTime = table.Column<DateTime>(type: "TEXT", nullable: false),
                    IsAccepted = table.Column<bool>(type: "INTEGER", nullable: false),
                    NotAcceptedReason = table.Column<bool>(type: "INTEGER", nullable: false),
                    ImageLinks = table.Column<string>(type: "TEXT", nullable: false),
                    Account = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DeadForm", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DeadForm_Resident_ResidentIdentityCode",
                        column: x => x.ResidentIdentityCode,
                        principalTable: "Resident",
                        principalColumn: "IdentityCode");
                });

            migrationBuilder.CreateTable(
                name: "MovingOutForm",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    MoveOutPlace = table.Column<string>(type: "TEXT", nullable: false),
                    MoveOutDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    MoveOutReason = table.Column<string>(type: "TEXT", nullable: false),
                    ResidentIdentityCode = table.Column<string>(type: "TEXT", nullable: false),
                    CreatedTime = table.Column<DateTime>(type: "TEXT", nullable: false),
                    IsAccepted = table.Column<bool>(type: "INTEGER", nullable: false),
                    NotAcceptedReason = table.Column<bool>(type: "INTEGER", nullable: false),
                    Account = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MovingOutForm", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MovingOutForm_Resident_ResidentIdentityCode",
                        column: x => x.ResidentIdentityCode,
                        principalTable: "Resident",
                        principalColumn: "IdentityCode");
                });

            migrationBuilder.CreateTable(
                name: "ResidentChangeRecord",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CreatedTime = table.Column<DateTime>(type: "TEXT", nullable: false),
                    ChangeType = table.Column<int>(type: "INTEGER", nullable: false),
                    ResidentIdentityCode = table.Column<string>(type: "TEXT", nullable: false),
                    Content = table.Column<string>(type: "TEXT", nullable: false),
                    FormId = table.Column<string>(type: "TEXT", nullable: false)
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
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    RewardCeremonyId = table.Column<int>(type: "INTEGER", nullable: false),
                    ResidentIdentityCode = table.Column<string>(type: "TEXT", nullable: false),
                    AchievementType = table.Column<int>(type: "INTEGER", nullable: false),
                    AchievementName = table.Column<string>(type: "TEXT", nullable: false),
                    RewardName = table.Column<string>(type: "TEXT", nullable: false),
                    RewardValue = table.Column<double>(type: "REAL", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RewardRecord", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RewardRecord_Resident_ResidentIdentityCode",
                        column: x => x.ResidentIdentityCode,
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
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Address = table.Column<string>(type: "TEXT", nullable: false),
                    OwnerIdentityCode = table.Column<string>(type: "TEXT", nullable: false),
                    Scope = table.Column<int>(type: "INTEGER", nullable: false),
                    Account = table.Column<string>(type: "TEXT", nullable: false),
                    CreatedTime = table.Column<DateTime>(type: "TEXT", nullable: false),
                    IsAccepted = table.Column<bool>(type: "INTEGER", nullable: false),
                    NotAcceptedReason = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SplitingHouseholdForm", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SplitingHouseholdForm_Resident_OwnerIdentityCode",
                        column: x => x.OwnerIdentityCode,
                        principalTable: "Resident",
                        principalColumn: "IdentityCode");
                });

            migrationBuilder.CreateTable(
                name: "AddingResidentForm",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    HouseholdId = table.Column<string>(type: "TEXT", nullable: false),
                    NewResidentId = table.Column<int>(type: "INTEGER", nullable: false),
                    ImageLinks = table.Column<string>(type: "TEXT", nullable: false),
                    CreatedTime = table.Column<DateTime>(type: "TEXT", nullable: false),
                    IsAccepted = table.Column<bool>(type: "INTEGER", nullable: false),
                    NotAcceptedReason = table.Column<bool>(type: "INTEGER", nullable: false),
                    Account = table.Column<string>(type: "TEXT", nullable: false)
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
                name: "SHForm_Resident",
                columns: table => new
                {
                    SHFormId = table.Column<int>(type: "INTEGER", nullable: false),
                    ResidentId = table.Column<string>(type: "TEXT", nullable: false),
                    RelationShip = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SHForm_Resident", x => new { x.SHFormId, x.ResidentId });
                    table.ForeignKey(
                        name: "FK_SHForm_Resident_Resident_ResidentId",
                        column: x => x.ResidentId,
                        principalTable: "Resident",
                        principalColumn: "IdentityCode",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SHForm_Resident_SplitingHouseholdForm_SHFormId",
                        column: x => x.SHFormId,
                        principalTable: "SplitingHouseholdForm",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AchievementEvidenceForm_ResidentIdentityCode",
                table: "AchievementEvidenceForm",
                column: "ResidentIdentityCode");

            migrationBuilder.CreateIndex(
                name: "IX_AchievementRewardPair_RewardCeremonyId_AchievementType",
                table: "AchievementRewardPair",
                columns: new[] { "RewardCeremonyId", "AchievementType" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AddingResidentForm_NewResidentId",
                table: "AddingResidentForm",
                column: "NewResidentId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true);

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
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ChangingHouseholdForm_NewHouseholdHouseholdId",
                table: "ChangingHouseholdForm",
                column: "NewHouseholdHouseholdId");

            migrationBuilder.CreateIndex(
                name: "IX_ChangingHouseholdForm_ResidentIdentityCode",
                table: "ChangingHouseholdForm",
                column: "ResidentIdentityCode");

            migrationBuilder.CreateIndex(
                name: "IX_ChangingHouseholdInfoForm_HouseholdId",
                table: "ChangingHouseholdInfoForm",
                column: "HouseholdId");

            migrationBuilder.CreateIndex(
                name: "IX_ChangingHouseholdInfoForm_OwnerIdentityCode",
                table: "ChangingHouseholdInfoForm",
                column: "OwnerIdentityCode");

            migrationBuilder.CreateIndex(
                name: "IX_ChangingResidentInfoForm_ResidentIdentityCode",
                table: "ChangingResidentInfoForm",
                column: "ResidentIdentityCode");

            migrationBuilder.CreateIndex(
                name: "IX_DeadForm_ResidentIdentityCode",
                table: "DeadForm",
                column: "ResidentIdentityCode");

            migrationBuilder.CreateIndex(
                name: "IX_MovingOutForm_ResidentIdentityCode",
                table: "MovingOutForm",
                column: "ResidentIdentityCode");

            migrationBuilder.CreateIndex(
                name: "IX_Resident_HouseholdId",
                table: "Resident",
                column: "HouseholdId");

            migrationBuilder.CreateIndex(
                name: "IX_ResidentChangeRecord_ResidentIdentityCode",
                table: "ResidentChangeRecord",
                column: "ResidentIdentityCode");

            migrationBuilder.CreateIndex(
                name: "IX_ResidentForm_HouseholdFormId",
                table: "ResidentForm",
                column: "HouseholdFormId");

            migrationBuilder.CreateIndex(
                name: "IX_RewardRecord_ResidentIdentityCode",
                table: "RewardRecord",
                column: "ResidentIdentityCode");

            migrationBuilder.CreateIndex(
                name: "IX_RewardRecord_RewardCeremonyId",
                table: "RewardRecord",
                column: "RewardCeremonyId");

            migrationBuilder.CreateIndex(
                name: "IX_SHForm_Resident_ResidentId",
                table: "SHForm_Resident",
                column: "ResidentId");

            migrationBuilder.CreateIndex(
                name: "IX_SplitingHouseholdForm_OwnerIdentityCode",
                table: "SplitingHouseholdForm",
                column: "OwnerIdentityCode");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
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
                name: "MovingOutForm");

            migrationBuilder.DropTable(
                name: "NotificationMessage");

            migrationBuilder.DropTable(
                name: "ResidentChangeRecord");

            migrationBuilder.DropTable(
                name: "RewardRecord");

            migrationBuilder.DropTable(
                name: "SHForm_Resident");

            migrationBuilder.DropTable(
                name: "ResidentForm");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "RewardCeremony");

            migrationBuilder.DropTable(
                name: "SplitingHouseholdForm");

            migrationBuilder.DropTable(
                name: "HouseholdForm");

            migrationBuilder.DropTable(
                name: "Resident");

            migrationBuilder.DropTable(
                name: "Household");
        }
    }
}
