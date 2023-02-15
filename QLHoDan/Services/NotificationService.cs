using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using QLHoDan.Data;
using QLHoDan.Models;

namespace QLHoDan.Services
{
    /// <summary>
    /// Service phụ trách thông báo
    /// </summary>
    public class NotificationService
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        public NotificationService(ApplicationDbContext context,
                                    UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }
        /// <summary>
        /// Gửi thông báo đến đối tượng chỉ định
        /// </summary>
        /// <param name="sender">
        /// Tên đăng nhập của người gửi
        /// </param>
        /// <param name="includeUserNames">
        /// Những tên đăng nhập tin nhắn sẽ gửi đến. Tuy nhiên có thể dùng kí tự đặc biệt để
        /// thay thế nhiều tên đăng nhập cùng loại:<br/>
        /// "*" = all account <br/>
        /// "#" = special account <br/>
        /// "!" = household <br/>
        /// </param>
        /// <param name="excludeUserNames">
        /// Những tên đăng nhập không muốn tin nhắn sẽ gửi đến. Tuy nhiên có thể dùng kí tự đặc biệt để
        /// thay thế nhiều tên đăng nhập cùng loại:<br/>
        /// "#" = special account <br/>
        /// "!" = household <br/>
        /// </param>
        /// <param name="message">
        /// Nội dung tin nhắn
        /// </param>
        public async Task Notify(string sender, string[] includeUserNames, string[] excludeUserNames, string message)
        {
            if (includeUserNames == null || includeUserNames.Length == 0) return;
            Array.Sort(includeUserNames);
            bool includeAllHousehold = false;
            bool includeAllSpecial = false;
            if (Array.BinarySearch(includeUserNames, "*") > -1)
            {
                includeAllHousehold = true;
                includeAllSpecial = true;
            }
            else
            {
                if (Array.BinarySearch(includeUserNames, "#") > -1)
                {
                    includeAllSpecial = true;
                }
                if (Array.BinarySearch(includeUserNames, "!") > -1)
                {
                    includeAllHousehold = true;
                }
            }
            bool excludeAllHousehold = false;
            bool excludeAllSpecial = false;
            DateTime now = DateTime.Now;
            if (excludeUserNames != null && excludeUserNames.Length != 0)
            {
                Array.Sort(excludeUserNames);
                excludeAllHousehold = Array.BinarySearch(excludeUserNames, "!") > -1;
                excludeAllSpecial = Array.BinarySearch(excludeUserNames, "#") > -1;
                if (excludeAllHousehold)
                {
                    if (excludeAllSpecial) return;
                    await _userManager.Users.AsNoTracking()
                        .Where(u => u.Role < 4 && !excludeUserNames.Contains(u.UserName)
                                    && (includeAllSpecial || includeUserNames.Contains(u.UserName)))
                        .Select(u => new NotificationMessage()
                        {
                            Time = now,
                            Content = message,
                            IsRead = false,
                            Sender = sender,
                            Receiver = u.UserName
                        })
                        .ForEachAsync(n =>
                        {
                            _context.NotificationMessage.Add(n);
                        });
                    await _context.SaveChangesAsync();
                    return;
                }
                else
                {
                    if (excludeAllSpecial)
                    {
                        await _userManager.Users.AsNoTracking()
                        .Where(u => u.Role > 3 && !excludeUserNames.Contains(u.UserName)
                                    && (includeAllHousehold || includeUserNames.Contains(u.UserName)))
                        .Select(u => new NotificationMessage()
                        {
                            Time = now,
                            Content = message,
                            IsRead = false,
                            Sender = sender,
                            Receiver = u.UserName
                        })
                        .ForEachAsync(n =>
                        {
                            _context.NotificationMessage.Add(n);
                        });
                        await _context.SaveChangesAsync();
                        return;
                    }
                    else
                    {
                        if (includeAllSpecial)
                        {
                            if (includeAllHousehold)
                            {
                                await _userManager.Users.AsNoTracking()
                                    .Where(u => !excludeUserNames.Contains(u.UserName))
                                    .Select(u => new NotificationMessage()
                                    {
                                        Time = now,
                                        Content = message,
                                        IsRead = false,
                                        Sender = sender,
                                        Receiver = u.UserName
                                    })
                                    .ForEachAsync(n =>
                                    {
                                        _context.NotificationMessage.Add(n);
                                    });
                                    await _context.SaveChangesAsync();
                                return;
                            }
                            else
                            {
                                await _userManager.Users.AsNoTracking()
                                    .Where(u => !excludeUserNames.Contains(u.UserName)
                                                && (u.Role < 4 || includeUserNames.Contains(u.UserName)))
                                    .Select(u => new NotificationMessage()
                                    {
                                        Time = now,
                                        Content = message,
                                        IsRead = false,
                                        Sender = sender,
                                        Receiver = u.UserName
                                    })
                                    .ForEachAsync(n =>
                                    {
                                        _context.NotificationMessage.Add(n);
                                    });
                                await _context.SaveChangesAsync();
                                return;
                            }
                        }
                        else
                        {
                            if (includeAllHousehold)
                            {
                                await _userManager.Users.AsNoTracking()
                                    .Where(u => !excludeUserNames.Contains(u.UserName)
                                                && (u.Role > 3 || includeUserNames.Contains(u.UserName)))
                                    .Select(u => new NotificationMessage()
                                    {
                                        Time = now,
                                        Content = message,
                                        IsRead = false,
                                        Sender = sender,
                                        Receiver = u.UserName
                                    })
                                    .ForEachAsync(n =>
                                    {
                                        _context.NotificationMessage.Add(n);
                                    });
                                await _context.SaveChangesAsync();
                                return;
                            }
                            else
                            {
                                await _userManager.Users.AsNoTracking()
                                    .Where(u => !excludeUserNames.Contains(u.UserName) 
                                                && includeUserNames.Contains(u.UserName))
                                    .Select(u => new NotificationMessage()
                                    {
                                        Time = now,
                                        Content = message,
                                        IsRead = false,
                                        Sender = sender,
                                        Receiver = u.UserName
                                    })
                                    .ForEachAsync(n =>
                                    {
                                        _context.NotificationMessage.Add(n);
                                    });
                                await _context.SaveChangesAsync();
                                return;
                            }
                        }
                    }
                }
            }
            else
            {
                if (includeAllSpecial)
                {
                    if (includeAllHousehold)
                    {
                        await _userManager.Users.AsNoTracking()
                            .Select(u => new NotificationMessage()
                            {
                                Time = now,
                                Content = message,
                                IsRead = false,
                                Sender = sender,
                                Receiver = u.UserName
                            })
                            .ForEachAsync(n =>
                            {
                                _context.NotificationMessage.Add(n);
                            });
                        await _context.SaveChangesAsync();
                        return;
                    }
                    else
                    {
                        await _userManager.Users.AsNoTracking()
                            .Where(u => u.Role < 4 || includeUserNames.Contains(u.UserName))
                            .Select(u => new NotificationMessage()
                            {
                                Time = now,
                                Content = message,
                                IsRead = false,
                                Sender = sender,
                                Receiver = u.UserName
                            })
                            .ForEachAsync(n =>
                            {
                                _context.NotificationMessage.Add(n);
                            });
                        await _context.SaveChangesAsync();
                        return;
                    }
                }
                else
                {
                    if (includeAllHousehold)
                    {
                        await _userManager.Users.AsNoTracking()
                            .Where(u => u.Role > 3 || includeUserNames.Contains(u.UserName))
                            .Select(u => new NotificationMessage()
                            {
                                Time = now,
                                Content = message,
                                IsRead = false,
                                Sender = sender,
                                Receiver = u.UserName
                            })
                            .ForEachAsync(n =>
                            {
                                _context.NotificationMessage.Add(n);
                            });
                        await _context.SaveChangesAsync();
                        return;
                    }
                    else
                    {
                        await _userManager.Users.AsNoTracking()
                            .Where(u => includeUserNames.Contains(u.UserName))
                            .Select(u => new NotificationMessage()
                            {
                                Time = now,
                                Content = message,
                                IsRead = false,
                                Sender = sender,
                                Receiver = u.UserName
                            })
                            .ForEachAsync(n =>
                            {
                                _context.NotificationMessage.Add(n);
                            });
                        await _context.SaveChangesAsync();
                        return;
                    }
                }
            }


        }
        public async Task ForceNotify(string sender,string userName, string message)
        {
            _context.NotificationMessage.Add(new NotificationMessage()
            {
                Time = DateTime.Now,
                Content = message,
                IsRead = false,
                Sender = sender,
                Receiver = userName
            });
            await _context.SaveChangesAsync();
        }
    }
}
