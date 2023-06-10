# 发送消息



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

+ FriendMessageReceiver，用来接收好友消息，`Sender`是[Friend](https://github.com/SinoAHpx/Mirai.Net/blob/2.4/Mirai.Net/Data/Shared/Friend.cs)。
+ GroupMessageReceiver，用来接收群消息，`Sender`是[Member](https://github.com/SinoAHpx/Mirai.Net/blob/2.4/Mirai.Net/Data/Shared/Member.cs)。
+ TempMessageReceiver，用来接收临时消息，`Sender`是[Member](https://github.com/SinoAHpx/Mirai.Net/blob/2.4/Mirai.Net/Data/Shared/Friend.cs)。
+ StrangerMessageReceiver，用来接收陌生人消息，`Sender`是[Friend](https://github.com/SinoAHpx/Mirai.Net/blob/2.4/Mirai.Net/Data/Shared/Friend.cs)。
+ OtherClientMessageReceiver，用来接收其它客户端消息，`Sender`是[OtherClient](https://github.com/SinoAHpx/Mirai.Net/blob/2.4/Mirai.Net/Data/Shared/OtherClient.cs)。

## 发送消息

如果是消息的接收和发送是开发QQ机器人的重中之重，那么发送消息就是重中之重之重了。前面指北里提到过，Mirai.Net的消息发送分为主动和被动发送两种方式，这里就来详细介绍以下它们。但是在这之前，我们先来看一下在Mirai.Net是如何构造消息链的。

### 构造消息链

所谓消息链，在Mirai.Net以一个类型`MessageChain`来表示，此类型继承自`List<MessageBase>`，所以你只需要像使用`List`一样使用它。

构造一个最基础的消息链：

```cs
var messageChain = new MessageChain
{
    new AtMessage("114514"),
    new PlainMessage("Hello World!"),
};
```

这就是一个基础的消息链，它表示包含一个At消息和一个文本消息，但是你会发现，这么构造消息链显然太麻烦了，所以Mirai.Net提供了一个更简单的构造方式：

```cs
var messageChain = new MessageChainBuilder()
    .At("114514")
    .Plain("Hello World!")
    .Build();
```

值得注意的是，下面的代码是合法的。因为在`MessageChain`内部实现了从`MessageBase`到`MessageChain`的隐式转换，也就是以目前`MessageBase`对象创建一个单元素的`MessageChain`。（但是`MessageChain`不可以转换为`MessageBase`）

```cs
MessageChain messageChain = new PlainMessage("Hello World!");
```

### 主动发送消息

主动发送消息是通过`MessageManager`来完成的，这是一个静态类。

主动发送消息需要你指定发送目标和消息链，这里我们来看看如何构造一个主动发送消息的例子：

```cs
await MessageManager.SendTempMessageAsync("114514", "1919810", "HelloWorld!");
await MessageManager.SendFriendMessageAsync("114514", "HelloWorld!");
await MessageManager.SendGroupMessageAsync("114514", "HelloWorld!");
```

其中，要发送的消息可以为`string`(简单的纯文本)/`MessageBase`/`MessageChain`类型，但是这里我们只用到了`string`。

### 被动发送消息

相对于主动发送消息，被动发送消息就方便多了，你不需要再指定发送到哪里，只需要使用某个`MessageReceiver`调用它对应的拓展方法即可。

比如发送群消息：

```cs
bot.MessageReceived
    .OfType<GroupMessageReceiver>()
    .Subscribe(async receiver =>
    { 
        await receiver.SendMessageAsync("HelloWorld!");
    } );
```

以此类推可知发送好友消息：

```cs
bot.MessageReceived
    .OfType<FriendMessageReceiver>()
    .Subscribe(async receiver =>
    { 
        await receiver.SendMessageAsync("HelloWorld!");
    } );
```

别的消息容器亦是如此。

你还可以直接省略`OfType<xxx>`而直接使用拓展方法：

```cs
bot.MessageReceived.SubscribeGroupMessageAsync(async t =>
{
    await t.SendMessageAsync("Hi!");
});
```

关于常见的消息类型，详见[全部消息类型](/all-message.md)