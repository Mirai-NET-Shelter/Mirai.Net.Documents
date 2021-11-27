# 消息

Mirai.Net发送和接收消息遵循了mirai-api-http的消息格式，你可以在[官方文档](https://docs.mirai.mamoe.net/mirai-api-http/api/MessageType.html)中知道具体有什么消息以及这些消息是做什么的，因为Mirai.Net对消息的定义与官方文档中提供的基本一样，所以这篇文章将不会再列出所有的消息类型。

## 概述

接上面所言，Mirai.Net还使用了CLR封装的`xxReceiver`来作为一条消息的容器。

比如:

```cs
bot.MessageReceived
    .OfType<GroupMessageReceiver>()
    .Subscribe(receiver =>
    {
        //omit
    });
```

上面的代码中，`receiver`是一个`GroupMessageReceiver`，它是一个群消息的容器。

又比如：

```cs
bot.MessageReceived
    .OfType<FriendMessageReceiver>()
    .Subscribe(receiver =>
    {
        //omit
    });
```

这里的`receiver`是一个`FriendMessageReceiver`，它是一个好友消息的容器。

这些`receiver`都是`MessageReceiverBase`的子类，它们都有：
+ `MessageChain`属性，用来表示收到的消息链。
+ `Sender`属性，用来表示消息的发送者，每个子类中的`Sender`都有其对应的类型。

## 接收消息

所谓接收消息，也就是消费上面提到的一系列Receiver。

正如响应事件那样，Mirai.Net也使用了Rx.Net的订阅模式来接收消息，`MiraiBot`类中的`MessageReceived`属性就是用来接受消息订阅器的，你同样可以定义无数个不同的消息订阅器，用来接收和处理不同类型的消息。

### 群消息

正如前文所言，群消息的容器`GroupMessageReceiver`所对应的`Sender`就是`Member`，也就是表示一个群成员的对象。

```cs
bot.MessageReceived
    .OfType<GroupMessageReceiver>()
    .Subscribe(receiver =>
    {
        var message = receiver.MessageChain.OfType<PlainMessage>().First().Text;
        var senderName = receiver.Sender.Name;
        Console.WriteLine($"收到了来自{senderName}这样的消息：{message}");
    });
```

### 好友消息

同上可得：

```cs
 bot.MessageReceived
     .OfType<FriendMessageReceiver>()
     .Subscribe(receiver =>
     {
         var message = receiver.MessageChain.OfType<PlainMessage>().First().Text;
         var senderName = receiver.Sender.NickName;
         Console.WriteLine($"收到了来自{senderName}这样的消息：{message}");
     });
```

### 其它消息容器

Mirai.Net一共有以下几种消息容器，它们的成员名称都很明了，不需要进行详细说明，如果需要，请参阅源码。

它们地使用完全和上面的例子一样：

```cs
bot.MessageReceived
    .OfType<xxReceiver>()
    .Subscribe(receiver =>
    {
        //omit
    });
```

+ FriendMessageReceiver，用来接收好友消息，`Sender`是[Friend](https://github.com/SinoAHpx/Mirai.Net/blob/2.2/Mirai.Net/Data/Shared/Friend.cs)。
+ GroupMessageReceiver，用来接收群消息，`Sender`是[Member](https://github.com/SinoAHpx/Mirai.Net/blob/2.2/Mirai.Net/Data/Shared/Member.cs)。
+ TempMessageReceiver，用来接收临时消息，`Sender`是[Member](https://github.com/SinoAHpx/Mirai.Net/blob/2.2/Mirai.Net/Data/Shared/Friend.cs)。
+ StrangerMessageReceiver，用来接收陌生人消息，`Sender`是[Friend](https://github.com/SinoAHpx/Mirai.Net/blob/2.2/Mirai.Net/Data/Shared/Friend.cs)。
+ OtherClientMessageReceiver，用来接收其它客户端消息，`Sender`是[OtherClient](https://github.com/SinoAHpx/Mirai.Net/blob/2.2/Mirai.Net/Data/Shared/OtherClient.cs)。

## 发送消息

如果是消息的接收和发送是开发QQ机器人的重中之重，那么发送消息就是重中之重之重了。前面指北里提到过，Mirai.Net的消息发送分为主动和被动发送两种方式，这里就来详细介绍以下它们。但是在这之前，我们先来看一下在Mirai.Net是如何构造消息链的。

### 构造消息链

所谓消息链，在Mirai.Net中的表示很简单，就是一个`MessageChain`的集合，它的元素是`MessageBase`的子类。

构造一个最基础的消息链：

```cs
var messageChain = new MessageBase[]
{
    new AtMessage("114514"),
    new PlainMessage("Hello World!"),
};
```

这就是一个基础的消息链，它表示包含一个At消息和一个文本消息，但是你会发现，这么构造消息链显然太麻烦了，所以Mirai.Net提供了一个更简单的构造方式：

```cs
var messageChain = "Hello World!"
    .Append(new AtMessage("114514"))
    .Append(new ImageMessage(), new JsonMessage())
    .Append("Hello World!")
    .Append("Hello World!");
```
上示的`Append`方法是一个拓展方法，它可以基于`string`/`MessageBase`/`IEnumberable<MessageBase>`来构造消息链。同样地，它的参数你可以传入`string`/`MessageBase`/`IEnumberable<MessageBase>`。

### 主动发送消息

主动发送消息是通过`MessageManager`来完成的，这是一个静态类。

主动发送消息需要你指定发送目标和消息链，这里我们来看看如何构造一个主动发送消息的例子：

```cs
await MessageManager.SendTempMessageAsync("114514", "1919810", "HelloWorld!");
await MessageManager.SendFriendMessageAsync("114514", "HelloWorld!");
await MessageManager.SendGroupMessageAsync("114514", "HelloWorld!");
```

其中，要发送的消息可以为`string`/`MessageBase`/`IEnumberable<MessageBase>`类型，但是这里我们只用到了`string`。

### 被动发送消息

相对于主动发送消息，被动发送消息就方便多了，通常你只需要使用某个`MessageReceiver`调用它对应的拓展方法即可。

比如发送群消息：

```cs
bot.MessageReceived
    .OfType<GroupMessageReceiver>()
    .Subscribe(async receiver =>
    { 
        await receiver.SendGroupMessageAsync("HelloWorld!");
    } );
```

以此类推可知发送好友消息：

```cs
bot.MessageReceived
    .OfType<FriendMessageReceiver>()
    .Subscribe(async receiver =>
    { 
        await receiver.SendFriendMessageAsync("HelloWorld!");
    } );
```

别的消息容器也是一样的，只是相对应的方法名不同而已。