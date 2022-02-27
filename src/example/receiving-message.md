# 接收消息

**此篇文档基于Mirai.NET 2.3.9编写**


## 接收群消息

```cs

bot.MessageReceived
    .OfType<GroupMessageReceiver>()
    .Subscribe(x =>
    {
        Console.WriteLine($"收到了来自群{x.Id}由{x.Sender.Id}发送的消息：{x.MessageChain.GetPlainMessage()}");
    });

```

## 接收私聊消息

```cs

bot.MessageReceived
    .OfType<FriendMessageReceiver>()
    .Subscribe(x =>
    {
        Console.WriteLine($"收到了来自好友{x.Id}发送的消息：{x.MessageChain.GetPlainMessage()}");
    });

```

## 接收其它消息

除了上面演示的几种消息类型，还可以接收`StrangerMessageReceiver`(陌生人消息)，`TempMessageReceiver`(临时消息)，`OtherClientMessageReceiver`(其它客户端消息)几种类型的消息。

只需要把上文中的`OfType<>`尖括号里替换为想要的消息接收器即可。

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
                    Console.WriteLine($"收到了来自群{x.Id}由{x.Sender.Id}发送的消息：{x.MessageChain.GetPlainMessage()}");
                });

            bot.MessageReceived
                .OfType<FriendMessageReceiver>()
                .Subscribe(x =>
                {
                    Console.WriteLine($"收到了来自好友{x.Id}发送的消息：{x.MessageChain.GetPlainMessage()}");
                });
            
            bot.MessageReceived
                .OfType<StrangerMessageReceiver>()
                .Subscribe(x =>
                {
                    Console.WriteLine($"收到了来自陌生人{x.Id}发送的消息：{x.MessageChain.GetPlainMessage()}");
                });

            Console.ReadLine();
        }
    }
}

```