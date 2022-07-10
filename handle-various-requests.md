# 处理各种请求



## 处理好友请求

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
         await e.Handle(NewFriendRequestHandlers.Reject, "拒绝好友请求的原因(可选，仅在拒绝请求时有效)");
     });
```

## 处理加群请求

```cs

bot.EventReceived
    .OfType<NewMemberRequestedEvent>()
    .Subscribe(async e =>
    {
        //同意入群
        await RequestManager.HandleNewMemberRequestedAsync(e, NewMemberRequestHandlers.Approve);
        //或者
        await e.Handle(NewMemberRequestHandlers.Approve);
        
        //拒绝入群
        await RequestManager.HandleNewMemberRequestedAsync(e, NewMemberRequestHandlers.Reject, "不接受的原因(可选，仅在拒绝请求时有效)");
        //或者
        await e.Handle(NewMemberRequestHandlers.Reject, "不接受的原因(可选，仅在拒绝请求时有效)");
    });

```

## 处理别人邀请bot进群的请求

~~不知道为什么这里没有拓展方法，这个问题会在下个版本修复~~

```cs

bot.EventReceived
    .OfType<NewInvitationRequestedEvent>()
    .Subscribe(async e =>
    {
        //同意入群
        await RequestManager.HandleNewInvitationRequestedAsync(e, NewInvitationRequestHandlers.Approve, "不接受的原因(可选)");
        
        //拒绝邀请
        await RequestManager.HandleNewInvitationRequestedAsync(e, NewInvitationRequestHandlers.Reject, "不接受的原因(可选)");
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

            bot.EventReceived
                .OfType<NewMemberRequestedEvent>()
                .Subscribe(async e =>
                {
                    //同意入群
                    await RequestManager.HandleNewMemberRequestedAsync(e, NewMemberRequestHandlers.Approve);
                    //或者
                    await e.Handle(NewMemberRequestHandlers.Approve);
                    
                    //拒绝入群
                    await RequestManager.HandleNewMemberRequestedAsync(e, NewMemberRequestHandlers.Reject, "不接受的原因(可选，仅在拒绝请求时有效)");
                    //或者
                    await e.Handle(NewMemberRequestHandlers.Reject, "不接受的原因(可选，仅在拒绝请求时有效)");
                });

            bot.EventReceived
                .OfType<NewInvitationRequestedEvent>()
                .Subscribe(async e =>
                {
                    //同意入群
                    await RequestManager.HandleNewInvitationRequestedAsync(e, NewInvitationRequestHandlers.Approve, "不接受的原因(可选)");
                    
                    //拒绝邀请
                    await RequestManager.HandleNewInvitationRequestedAsync(e, NewInvitationRequestHandlers.Reject, "不接受的原因(可选)");
                });

            Console.ReadLine();
        }
    }
}

```