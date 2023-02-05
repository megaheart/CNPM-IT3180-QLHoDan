namespace QLHoDan.Models.HouseholdsAndResidents.HouseholdApi
{
    public class ResidentInHouseholdComparer : IComparer<Resident>
    {
        public int Compare(Resident? x, Resident? y)
        {
            if (x != null && x.RelationShip == "Chủ hộ") return -1;
            if (y != null && y.RelationShip == "Chủ hộ") return 1;
            return 0;
        }
    }
}
