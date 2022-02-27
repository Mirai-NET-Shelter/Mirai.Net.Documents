# 处理好友请求

```cs
 bot.EventReceived
     .OfType<NewFriendRequestedEvent>()
     .Subscribe(async e =>
     {
         //传统的方式
         await RequestManager.HandleNewFriendRequestedAsync(e, NewFriendRequestHandlers.Approve);

         //拓展方法
         await e.Handle(NewFriendRequestHandlers.Approve);

         //拒绝请求
         await e.Handle(NewFriendRequestHandlers.Reject, "拒绝你的好友请求(可选，仅在拒绝请求时有效)");
     });
```

## 完整代码

```cs
using System.Reactive.Linq;
using Mirai.Net.Data.Events.Concretes.Request;
using Mirai.Net.Data.Shared;
using Mirai.Net.Sessions;
using Mirai.Net.Sessions.Http.Managers;
using Mirai.Net.Utils.Scaffolds;

namespace Mirai.Net.Examples
{
    public class Program
    {
        public async Task Main()
        {
            var bot = new MiraiBot
            {
                Address = "localhost:8080",
                QQ = "1590454991",
                VerifyKey = "1145141919810"
            };

            await bot.LaunchAsync();

            bot.EventReceived
                .OfType<NewFriendRequestedEvent>()
                .Subscribe(async e =>
                {
                    //传统的方式
                    await RequestManager.HandleNewFriendRequestedAsync(e, NewFriendRequestHandlers.Approve);

                    //拓展方法
                    await e.Handle(NewFriendRequestHandlers.Approve);

                    //拒绝请求
                    await e.Handle(NewFriendRequestHandlers.Reject, "拒绝你的好友请求(可选，仅在拒绝请求时有效)");
                });

            Console.ReadLine();
        }
    }
}

```