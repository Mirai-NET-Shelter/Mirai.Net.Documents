# 接收消息




## 接收群消息

```cs

bot.MessageReceived
    .OfType<GroupMessageReceiver>()
    .Subscribe(x =>
    {
        Console.WriteLine($"收到了来自群{x.GroupId}由{x.Sender.Id}发送的消息：{x.MessageChain.GetPlainMessage()}");
    });

```

## 接收私聊消息

```cs

bot.MessageReceived
    .OfType<FriendMessageReceiver>()
    .Subscribe(x =>
    {
        Console.WriteLine($"收到了来自好友{x.FriendId}发送的消息：{x.MessageChain.GetPlainMessage()}");
    });

```

## 接收其它消息

除了上面演示的几种消息类型，还可以接收`StrangerMessageReceiver`(陌生人消息)，`TempMessageReceiver`(临时消息)，`OtherClientMessageReceiver`(其它客户端消息)几种类型的消息。

只需要把上文中的`OfType<>`尖括号里替换为想要的消息接收器即可。

这些`xxReceiver`都是`MessageReceiverBase`的子类，它们都有：
+ `MessageChain`属性，用来表示收到的消息链。
+ `Sender`属性，用来表示消息的发送者，每个子类中的`Sender`都有其对应的类型。

+ FriendMessageReceiver，用来接收好友消息，`Sender`是[Friend](https://github.com/SinoAHpx/Mirai.Net/blob/2.4/Mirai.Net/Data/Shared/Friend.cs)。
+ GroupMessageReceiver，用来接收群消息，`Sender`是[Member](https://github.com/SinoAHpx/Mirai.Net/blob/2.4/Mirai.Net/Data/Shared/Member.cs)。
+ TempMessageReceiver，用来接收临时消息，`Sender`是[Member](https://github.com/SinoAHpx/Mirai.Net/blob/2.4/Mirai.Net/Data/Shared/Friend.cs)。
+ StrangerMessageReceiver，用来接收陌生人消息，`Sender`是[Friend](https://github.com/SinoAHpx/Mirai.Net/blob/2.4/Mirai.Net/Data/Shared/Friend.cs)。
+ OtherClientMessageReceiver，用来接收其它客户端消息，`Sender`是[OtherClient](https://github.com/SinoAHpx/Mirai.Net/blob/2.4/Mirai.Net/Data/Shared/OtherClient.cs)。

## 完整代码

```cs

using System.Reactive.Linq;
using Mirai.Net.Data.Messages.Receivers;
using Mirai.Net.Sessions;

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

            bot.MessageReceived
                .OfType<GroupMessageReceiver>()
                .Subscribe(x =>
                {
                    Console.WriteLine($"收到了来自群{x.GroupId}由{x.Sender.Id}发送的消息：{x.MessageChain.GetPlainMessage()}");
                });

            bot.MessageReceived
                .OfType<FriendMessageReceiver>()
                .Subscribe(x =>
                {
                    Console.WriteLine($"收到了来自好友{x.FriendId}发送的消息：{x.MessageChain.GetPlainMessage()}");
                });

            bot.MessageReceived
                .OfType<StrangerMessageReceiver>()
                .Subscribe(x =>
                {
                    Console.WriteLine($"收到了来自陌生人{x.StrangerId}发送的消息：{x.MessageChain.GetPlainMessage()}");
                });

            Console.ReadLine();
        }
    }
}

```