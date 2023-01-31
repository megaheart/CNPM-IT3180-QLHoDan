using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using QLHoDan.Models;
using QLHoDan.Models.DbConversions;

namespace QLHoDan.Data;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
    {
    }
    public DbSet<Resident> Resident { set; get; }
    public DbSet<Household> Household { set; get; }
    public DbSet<HouseholdForm> HouseholdForm { set; get; }
    public DbSet<ResidentForm> ResidentForm { set; get; }
    public DbSet<AddingResidentForm> AddingResidentForm { set; get; }
    public DbSet<ResidentChangeRecord> ResidentChangeRecord { set; get; }
    public DbSet<MovingOutForm> MovingOutForm { set; get; }
    public DbSet<DeadForm> DeadForm { set; get; }
    public DbSet<SplitingHouseholdForm> SplitingHouseholdForm { set; get; }
    public DbSet<SHForm_Resident> SHForm_Resident { set; get; }
    public DbSet<ChangingResidentInfoForm> ChangingResidentInfoForm { set; get; }
    public DbSet<ChangingHouseholdInfoForm> ChangingHouseholdInfoForm { set; get; }
    public DbSet<ChangingHouseholdForm> ChangingHouseholdForm { set; get; }
    public DbSet<NotificationMessage> NotificationMessage { set; get; }
    public DbSet<AchievementEvidenceForm> AchievementEvidenceForm { set; get; }
    public DbSet<AchievementRewardPair> AchievementRewardPair { set; get; }
    public DbSet<RewardCeremony> RewardCeremony { set; get; }
    public DbSet<RewardRecord> RewardRecord { set; get; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Resident>().HasKey(nk => nk.IdentityCode);
        modelBuilder.Entity<Household>().HasKey(hk => hk.HouseholdId);
        modelBuilder.Entity<HouseholdForm>().HasKey(hk => hk.Id);
        modelBuilder.Entity<HouseholdForm>().Property(hk => hk.Id).ValueGeneratedOnAdd();
        modelBuilder.Entity<ResidentForm>().HasKey(hk => hk.Id);
        modelBuilder.Entity<ResidentForm>().Property(hk => hk.Id).ValueGeneratedOnAdd();
        modelBuilder.Entity<AddingResidentForm>().HasKey(hk => hk.Id);
        modelBuilder.Entity<AddingResidentForm>().Property(hk => hk.Id).ValueGeneratedOnAdd();
        modelBuilder.Entity<ResidentChangeRecord>().HasKey(hk => hk.Id);
        modelBuilder.Entity<ResidentChangeRecord>().Property(hk => hk.Id).ValueGeneratedOnAdd();
        modelBuilder.Entity<MovingOutForm>().HasKey(hk => hk.Id);
        modelBuilder.Entity<MovingOutForm>().Property(hk => hk.Id).ValueGeneratedOnAdd();
        modelBuilder.Entity<DeadForm>().HasKey(hk => hk.Id);
        modelBuilder.Entity<DeadForm>().Property(hk => hk.Id).ValueGeneratedOnAdd();
        modelBuilder.Entity<SplitingHouseholdForm>().HasKey(hk => hk.Id);
        modelBuilder.Entity<SplitingHouseholdForm>().Property(hk => hk.Id).ValueGeneratedOnAdd();

        modelBuilder.Entity<SHForm_Resident>().Property<int>("SHFormId");
        modelBuilder.Entity<SHForm_Resident>().Property<string>("ResidentId");
        modelBuilder.Entity<SHForm_Resident>().HasKey("SHFormId", "ResidentId");

        modelBuilder.Entity<ChangingResidentInfoForm>().HasKey(hk => hk.Id);
        modelBuilder.Entity<ChangingResidentInfoForm>().Property(hk => hk.Id).ValueGeneratedOnAdd();
        modelBuilder.Entity<ChangingHouseholdInfoForm>().HasKey(hk => hk.Id);
        modelBuilder.Entity<ChangingHouseholdInfoForm>().Property(hk => hk.Id).ValueGeneratedOnAdd();
        modelBuilder.Entity<ChangingHouseholdForm>().HasKey(hk => hk.Id);
        modelBuilder.Entity<ChangingHouseholdForm>().Property(hk => hk.Id).ValueGeneratedOnAdd();
        modelBuilder.Entity<NotificationMessage>().HasKey(hk => hk.Id);
        modelBuilder.Entity<NotificationMessage>().Property(hk => hk.Id).ValueGeneratedOnAdd();
        modelBuilder.Entity<AchievementEvidenceForm>().HasKey(hk => hk.Id);
        modelBuilder.Entity<AchievementEvidenceForm>().Property(hk => hk.Id).ValueGeneratedOnAdd();
        modelBuilder.Entity<AchievementRewardPair>().HasKey(g => g.Id);
        modelBuilder.Entity<AchievementRewardPair>().Property(hk => hk.Id).ValueGeneratedOnAdd();
        modelBuilder.Entity<AchievementRewardPair>().Property<int?>("RewardCeremonyId").IsRequired(false);
        modelBuilder.Entity<AchievementRewardPair>().HasIndex("RewardCeremonyId", "AchievementType").IsUnique();

        modelBuilder.Entity<RewardCeremony>().HasKey(hk => hk.Id);
        modelBuilder.Entity<RewardCeremony>().Property(hk => hk.Id).ValueGeneratedOnAdd();
        modelBuilder.Entity<RewardRecord>().HasKey(hk => hk.Id);
        modelBuilder.Entity<RewardRecord>().Property(hk => hk.Id).ValueGeneratedOnAdd();
        //modelBuilder.Entity<GTPTQDTTT>().HasIndex("DotPhatThuong", "PhanLoai").IsUnique(true);

        //modelBuilder.Entity<THForm>().Property<int>("ChuHoMoiId");
        modelBuilder.Entity<Resident>().HasOne<Household>(nk => nk.Household).WithMany(hk => hk.Members);

        //modelBuilder.Entity<HoKhauForm>().Property<int>("ChuHoMoiId");
        modelBuilder.Entity<HouseholdForm>().HasMany<ResidentForm>(nk => nk.Members).WithOne();

        //modelBuilder.Entity<AddingResidentForm>().Property<int?>("NewResidentId").IsRequired(false);
        modelBuilder.Entity<AddingResidentForm>()
            .HasOne<ResidentForm>(nk => nk.NewResident).WithMany()
            .OnDelete(DeleteBehavior.NoAction);
            //.HasForeignKey<AddingResidentForm>("NewResidentId");

        //modelBuilder.Entity<AddingResidentForm>().Property<string>("Account").IsRequired(false);
        //modelBuilder.Entity<AddingResidentForm>()
        //    .HasOne<ApplicationUser>(nk => nk.Account).WithOne()
        //    .OnDelete(DeleteBehavior.NoAction)
        //    .HasForeignKey<AddingResidentForm>("Account");

        //modelBuilder.Entity<MovingOutForm>().Property<string>("IdCode").IsRequired(false);
        modelBuilder.Entity<MovingOutForm>()
            .HasOne<Resident>(nk => nk.Resident).WithMany()
            .OnDelete(DeleteBehavior.NoAction);
            //.HasForeignKey<MovingOutForm>("IdCode");
        //modelBuilder.Entity<MovingOutForm>().Property<string>("Account").IsRequired(false);
        //modelBuilder.Entity<MovingOutForm>()
        //    .HasOne<ApplicationUser>(nk => nk.Account).WithOne()
        //    .OnDelete(DeleteBehavior.NoAction)
        //    .HasForeignKey<MovingOutForm>("Account");


        //modelBuilder.Entity<DeadForm>().Property<string>("IdCode").IsRequired(false);
        modelBuilder.Entity<DeadForm>()
            .HasOne<Resident>(nk => nk.Resident).WithMany()
            .OnDelete(DeleteBehavior.NoAction);
        //.HasForeignKey<DeadForm>("IdCode");
        //modelBuilder.Entity<DeadForm>().Property<string>("Account").IsRequired(false);
        //modelBuilder.Entity<DeadForm>()
        //    .HasOne<ApplicationUser>(nk => nk.Account).WithOne()
        //    .OnDelete(DeleteBehavior.NoAction)
        //    .HasForeignKey<DeadForm>("Account");


        modelBuilder.Entity<SHForm_Resident>()
            .HasOne<Resident>(nk => nk.Resident).WithMany()
            .HasForeignKey("ResidentId");
        modelBuilder.Entity<SHForm_Resident>()
            .HasOne<SplitingHouseholdForm>(nk => nk.SplitingHouseholdForm).WithMany()
            .HasForeignKey("SHFormId"); 

        //modelBuilder.Entity<SplitingHouseholdForm>().Property<string>("OwnerIdCode").IsRequired(false);
        modelBuilder.Entity<SplitingHouseholdForm>()
            .HasOne<Resident>(nk => nk.Owner).WithMany()
            .OnDelete(DeleteBehavior.NoAction);
            //.HasForeignKey<SplitingHouseholdForm>("OwnerIdCode");
        //modelBuilder.Entity<SplitingHouseholdForm>().Property<string>("Account").IsRequired(false);
        //modelBuilder.Entity<SplitingHouseholdForm>()
        //    .HasOne<ApplicationUser>(nk => nk.Account).WithOne()
        //    .OnDelete(DeleteBehavior.NoAction)
        //    .HasForeignKey<SplitingHouseholdForm>("Account");

        //modelBuilder.Entity<ChangingResidentInfoForm>().Property<string>("IdCode").IsRequired(false);
        modelBuilder.Entity<ChangingResidentInfoForm>()
            .HasOne<Resident>(nk => nk.Resident).WithMany()
            .OnDelete(DeleteBehavior.NoAction);
            //.HasForeignKey<ChangingResidentInfoForm>("IdCode");

        //modelBuilder.Entity<ChangingHouseholdInfoForm>().Property<string>("OwnerIdCode").IsRequired(false);
        //modelBuilder.Entity<ChangingHouseholdInfoForm>().Property<string>("HouseholdId").IsRequired(false);
        modelBuilder.Entity<ChangingHouseholdInfoForm>()
            .HasOne<Resident>(nk => nk.Owner).WithMany()
            .OnDelete(DeleteBehavior.NoAction);
            //.HasForeignKey<ChangingHouseholdInfoForm>("OwnerIdCode");
        modelBuilder.Entity<ChangingHouseholdInfoForm>()
            .HasOne<Household>(nk => nk.Household).WithMany()
            .OnDelete(DeleteBehavior.NoAction);
            //.HasForeignKey<ChangingHouseholdInfoForm>("HouseholdId");

        //modelBuilder.Entity<ChangingHouseholdForm>().Property<string>("IdCode").IsRequired(false);
        modelBuilder.Entity<ChangingHouseholdForm>()
            .HasOne<Resident>(nk => nk.Resident).WithMany()
            .OnDelete(DeleteBehavior.NoAction);
            //.HasForeignKey<ChangingHouseholdForm>("IdCode");

        //modelBuilder.Entity<ChangingHouseholdForm>().Property<string>("NewHouseholdId").IsRequired(false);
        modelBuilder.Entity<ChangingHouseholdForm>()
            .HasOne<Household>(nk => nk.NewHousehold).WithMany()
            .OnDelete(DeleteBehavior.NoAction);
            //.HasForeignKey<ChangingHouseholdForm>("NewHouseholdId");

        //modelBuilder.Entity<AchievementEvidenceForm>().Property<string>("IdCode").IsRequired(false);
        modelBuilder.Entity<AchievementEvidenceForm>()
            .HasOne<Resident>(nk => nk.Resident).WithMany()
            .OnDelete(DeleteBehavior.NoAction);
            //.HasForeignKey<AchievementEvidenceForm>("IdCode");


        modelBuilder.Entity<AchievementRewardPair>()
            .HasOne<RewardCeremony>(nk => nk.RewardCeremony)
            .WithMany(d => d.AchievementRewardPairs)
            .OnDelete(DeleteBehavior.NoAction)
            .HasForeignKey("RewardCeremonyId");

        //modelBuilder.Entity<RewardRecord>().Property<int?>("RewardCeremonyId").IsRequired(false);
        //modelBuilder.Entity<RewardRecord>().Property<string>("IdCode").IsRequired(false);
        modelBuilder.Entity<RewardRecord>()
            .HasOne<RewardCeremony>(ls => ls.RewardCeremony).WithMany()
            .OnDelete(DeleteBehavior.NoAction);
        //.HasForeignKey<RewardRecord>("RewardCeremonyId");
        modelBuilder.Entity<RewardRecord>()
            .HasOne<Resident>(ls => ls.Resident).WithMany()
            .OnDelete(DeleteBehavior.NoAction);
            //.HasForeignKey<RewardRecord>("IdCode");
    }
    protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
    {

        configurationBuilder
            .Properties<List<string>>()
            .HaveConversion<StringListConverter, StringListComparer>();
    }
}
