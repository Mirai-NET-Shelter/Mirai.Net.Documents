# 延迟发送/撤回消息

在Mirai.NET 2.4正式版中引入了延迟操作，包括在指定的时间之后发送消息和在指定的时间之后撤回消息。

## 延迟发送

Mirai.NET提供了一个~~简陋~~的脚手架可供调用：

```cs
DispatchUtils.ExecuteScheduledActionAsync(5000, async () =>
{
    await r.SendMessageAsync("my key is: 1145141919810");
});

DispatchUtils.ExecuteScheduledActionAsync(TimeSpan.FromSeconds(5), async () =>
{
    await r.SendMessageAsync("my key is: 1145141919810");
});
```

注意，上述两个方法都是同步方法，也就是说你不能在它们前面加上`await`。

## 延迟撤回

延迟撤回的方法不同于上面的延迟发送，它被定义为`Task<string>`的拓展方法，也就是说你只需要在发送消息的方法之后直接调用它即可。（而且它还是异步方法）

```cs

await r.SendMessageAsync("this message will be recalled after 5 seconds")
    .RecallAfter(5000);

await r.SendMessageAsync("this message will be recalled after 5 seconds")
    .RecallAfter(TimeSpan.FromSeconds(5));

```

## 完整代码
```cs
using System;
using System.Reactive.Linq;
using System.Threading;
using System.Threading.Tasks;
using Mirai.Net.Data.Messages.Receivers;
using Mirai.Net.Sessions;
using Mirai.Net.Utils.Internal;
using Mirai.Net.Utils.Scaffolds;

namespace Mirai.Net.Test
{
    internal static class Program
    {
        private static async Task Main()
        {
            var exit = new ManualResetEvent(false);
            
            using var bot = new MiraiBot
            {
                Address = "localhost:8080",
                VerifyKey = "1145141919810",
                QQ = "1590454991"
            };
            
            await bot.LaunchAsync();
            
            bot.MessageReceived
                .OfType<GroupMessageReceiver>()
                .Subscribe(async r =>
                {
                    if (r.MessageChain.GetPlainMessage() == "/send")
                    {
                        await r.SendMessageAsync("the true message will be revealed in 5 seconds");
                        DispatchUtils.ExecuteScheduledActionAsync(5000, async () =>
                        {
                            await r.SendMessageAsync("this message will be recalled after 5 seconds")
                                .RecallAfter(5000);
                        });
                    }
                });

            Console.WriteLine("launched");
            exit.WaitOne();
        }
    }
}
```