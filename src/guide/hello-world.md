# Hello, World

Mirai.NET本质上是对`mirai-api-http`交互的封装，并且加了一些方便于使用的脚手架。如果你对`mirai`一窍不通，那么上面的宝宝巴士级别地安装教学也应该让你成功地配置了`mirai-api-http`环境。如果你对 C#几乎一窍不通，你希望借此机会来尝试一下 C#这门优雅地编程语言，那么Mirai.NET是一个不错的选择。Mirai.NET使用了许多的 C#特色功能，阅读源码或许会有一点帮助，用Mirai.NET来构建一个机器人应用程序也是非常有趣的一件事。

## MiraiBot

Mirai.NET用`MiraiBot`类来表述一个 Mirai 机器人对象，可以有多个`MiraiBot`类实例，**但是一经启动之后，Mirai.NET只会调用最后一个启动的`MiraiBot`实例。**

Mirai.NET实现了`IDisposable`接口，所以你应该在用不到此对象的时候调用其`Dispose`方法来释放资源，或者直接在初始化的时候使用`using`关键字。

```cs
using var bot = new MiraiBot
{
    Address = "localhost:8080",
    QQ = xxx,
    VerifyKey = "xxx"
};
```

创建一个`MiraiBot`对象只需要三个属性:

- `QQ`，就是`mirai console`登陆的机器人的账号
- `VerifyKey`，就是`mirai-api-http`配置文件内的`verifyKey`
- `Address`，就是`mirai-api-http`配置文件内的`adapterSettings`的`host:port`组合值。**Mirai.NET 需要`http`和`ws`这两个 adapter 的 host 和 post 相同。**

创建完`MiraiBot`对象，就可以调用`Launch`方法来启动了:

```cs
await bot.Launch();
```

注意，调用`Launch`方法并不会阻塞线程，所以如果你不想要你的程序马上退出的话，你应该自己阻塞线程。

使用死循环:

```cs
while (true)
{
    if (Console.ReadLine() == "exit")
    {
        return;
    }
}
```

使用信号:

```cs
var signal = new ManualResetEvent(false);
signal.WaitOne();
```

## Hello, World!

这里是Mirai.NET使用指北的最后一部分，我们来看看如何使用Mirai.NET来发送一条消息。当然，这里仅仅是简单的演示，如果你需要更加深入了解，或许你应该去看[示例]()。

通常来说，消息的发送在Mirai.NET里分为主动发送被被动发送。被动发送就是收到了别人的消息再做出响应，而主动发送就是自己发送的消息。下面的示例仅演示主动发送消息。

### 发送一条群聊消息

```cs
await MessageManager.SendGroupMessageAsync("目标群号", "Hello, World!");
```

### 发送一条好友消息

```cs
await MessageManager.SendFriendMessageAsync("目标QQ", "Hello, World!");
```

### 发送一条临时会话消息

```cs
await MessageManager.SendTempMessageAsync("目标QQ", "目标群号", "Hello, World!");
```