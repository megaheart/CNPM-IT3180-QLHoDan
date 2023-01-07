using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace QLHoDan.Models.DbConversions
{
    public class StringListConverter: ValueConverter<List<string>, string>
    {
        public StringListConverter():base(
                    l => string.Join(',', l),
                    s => s.Split(',', System.StringSplitOptions.None).ToList()
                )
        { }
    }
    public class StringListComparer : ValueComparer<List<string>>
    {
        public StringListComparer() : base(
                    (l1, l2) => l1 == null ? (l2 == null ? true : false) : (l2 == null ? false : l1.SequenceEqual(l2)),
                    c => c.Aggregate(0, (a, v) => HashCode.Combine(a, v.GetHashCode())),
                    c => c.ToList()
                )
        { }
    }
}
