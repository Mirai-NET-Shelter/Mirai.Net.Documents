# 订阅事件

在Mirai.Net内部，定义了一系列的事件来对消息、群、好友、群成员以及Bot的行为进行监听。

这份文档不会详细地给出每一个事件的成员列表，因为每一个事件的名字都代表了它的作用，如果你想了解某个事件的详细信息，请参考它的[文档](https://docs.mirai.mamoe.net/mirai-api-http/api/EventType.html)。

下面是一些简单的例子：

> 注：如果你无法使用某些方法，请尝试添加using System.Reactive.Linq;命名空间

#### 监听群员禁言事件

```cs
bot.EventReceived
    .OfType<MemberMutedEvent>()
    .Subscribe(receiver =>
    {
        Console.WriteLine($"{receiver.Member.Name} 被禁言了");
    });
```

#### 监听群全体禁言事件

```cs
bot.EventReceived
    .OfType<GroupMutedAllEvent>()
    .Subscribe(receiver =>
    {
        Console.WriteLine($"{receiver.Group.Id} 被全员禁言。");
    });
```

## 概述

可以很明显地发现，在Mirai.Net中，每个事件监听器都需要调用`EventReceived`，然后再根据需求订阅事件。比如上面的两个例子，它们都是这样的形式：

```cs
bot.EventReceived
    .OfType<具体事件类型>()
    .Subscribe(receiver =>
    {
        //具体的操作
    });
```

因为`EventReceived`是一个`IObservable<EventBase>`类型的属性，这是基于[Rx.NET](https://github.com/dotnet/reactive)的订阅模式。所以你可以使用LINQ来操作事件，比如（如果你不熟悉LINQ的用法，建议先去[了解一下](/linq.md)）：

```cs
bot.EventReceived
    .OfType<具体事件类型>()
    .Where(receiver => receiver.Group.Id == 12345)
    .Subscribe(receiver =>
    {
        //具体的操作
    });
```

你也可以定义无数个事件监听器，每个事件监听器都是一个独立的订阅器，这样你就可以在不同的地方订阅不同的事件:

```cs
bot.EventReceived
    .OfType<GroupMutedAllEvent>()
    .Subscribe(receiver =>
    {
        //具体的操作
    });

bot.EventReceived
    .OfType<UnmutedEvent>()
    .Subscribe(receiver =>
    {
        //具体的操作
    });


bot.EventReceived
    .OfType<OnlineEvent>()
    .Subscribe(receiver =>
    {
        //具体的操作
    });
```

## 事件一览

这是一份Mirai.Net封装的事件与mirai-api-http的事件一览表，如果你想了解某个事件的详细信息，请参考它的[文档](https://docs.mirai.mamoe.net/mirai-api-http/api/EventType.html)。

### Bot自身事件

+ OnlineEvent : [Bot登录成功](https://docs.mirai.mamoe.net/mirai-api-http/api/EventType.html#bot登录成功)

+ OfflineEvent : [Bot主动离线](https://docs.mirai.mamoe.net/mirai-api-http/api/EventType.html#bot主动离线)

+ OfflineForceEvent : [Bot被挤下线](https://docs.mirai.mamoe.net/mirai-api-http/api/EventType.html#bot被挤下线)

+ ReconnectedEvent : [Bot主动重新登录](https://docs.mirai.mamoe.net/mirai-api-http/api/EventType.html#bot主动重新登录)

+ DroppedEvent : [Bot被服务器断开或因网络问题而掉线](https://docs.mirai.mamoe.net/mirai-api-http/api/EventType.html#bot被服务器断开或因网络问题而掉线)

### 好友事件

+ FriendInputStatusChangedEvent : [好友输入状态改变](https://docs.mirai.mamoe.net/mirai-api-http/api/EventType.html#好友输入状态改变)

+ FriendNickChangedEvent : [好友昵称改变](https://docs.mirai.mamoe.net/mirai-api-http/api/EventType.html#好友昵称改变)

+ FriendRecalledEvent : [好友消息撤回](https://docs.mirai.mamoe.net/mirai-api-http/api/EventType.html#群消息撤回)

### 群事件

+ PermissionChangedEvent : [Bot在群里的权限被改变. 操作人一定是群主](https://docs.mirai.mamoe.net/mirai-api-http/api/EventType.html#bot在群里的权限被改变.操作人一定是群主)

+ MutedEvent : [Bot被禁言](https://docs.mirai.mamoe.net/mirai-api-http/api/EventType.html#bot被禁言)

+ UnmutedEvent : [Bot被取消禁言](https://docs.mirai.mamoe.net/mirai-api-http/api/EventType.html#bot被取消禁言)

+ JoinedEvent : [Bot加入了一个新群](https://docs.mirai.mamoe.net/mirai-api-http/api/EventType.html#bot加入了一个新群)

+ LeftEvent : [Bot主动退出一个群](https://docs.mirai.mamoe.net/mirai-api-http/api/EventType.html#bot主动退出一个群)

+ KickedEvent : [Bot被踢出一个群](https://docs.mirai.mamoe.net/mirai-api-http/api/EventType.html#bot被踢出一个群)

+ GroupMessageRecalledEvent : [群消息撤回](https://docs.mirai.mamoe.net/mirai-api-http/api/EventType.html#群消息撤回)

+ NudgeEvent : [戳一戳事件](https://docs.mirai.mamoe.net/mirai-api-http/api/EventType.html#戳一戳事件)

+ GroupNameChangedEvent : [某个群名改变](https://docs.mirai.mamoe.net/mirai-api-http/api/EventType.html#某个群名改变)

+ GroupEntranceAnnouncementChangedEvent : [某群入群公告改变](https://docs.mirai.mamoe.net/mirai-api-http/api/EventType.html#某群入群公告改变)

+ GroupMutedAllEvent : [是否全员禁言](https://docs.mirai.mamoe.net/mirai-api-http/api/EventType.html#全员禁言)

+ GroupAllowedAnonymousChatEvent : [是否允许匿名聊天](https://docs.mirai.mamoe.net/mirai-api-http/api/EventType.html#匿名聊天)

+ GroupAllowedConfessTalkChanged : [坦白说](https://docs.mirai.mamoe.net/mirai-api-http/api/EventType.html#坦白说)

+ GroupAllowedMemberInviteEvent : [允许群员邀请好友加群](https://docs.mirai.mamoe.net/mirai-api-http/api/EventType.html#允许群员邀请好友加群)

+ MemberJoinedEvent : [新人入群的事件](https://docs.mirai.mamoe.net/mirai-api-http/api/EventType.html#新人入群的事件)

+ MemberKickedEvent : [成员被踢出群（该成员不是Bot）](https://docs.mirai.mamoe.net/mirai-api-http/api/EventType.html#成员被踢出群-该成员不是bot)

+ MemberLeftEvent : [成员主动离群（该成员不是Bot）](https://docs.mirai.mamoe.net/mirai-api-http/api/EventType.html#成员主动离群-该成员不是bot)

+ MemberCardChangedEvent : [群名片改动](https://docs.mirai.mamoe.net/mirai-api-http/api/EventType.html#群名片改动)

+ MemberTitleChangedEvent : [群头衔改动（只有群主有操作限权）](https://docs.mirai.mamoe.net/mirai-api-http/api/EventType.html#群头衔改动-只有群主有操作限权)

+ MemberPermissionChangedEvent : [成员权限改变的事件（该成员不是Bot）](https://docs.mirai.mamoe.net/mirai-api-http/api/EventType.html#成员权限改变的事件-该成员不是bot)

+ MemberMutedEvent : [群成员被禁言事件（该成员不是Bot）](https://docs.mirai.mamoe.net/mirai-api-http/api/EventType.html#群成员被禁言事件-该成员不是bot)

+ MemberUnmutedEvent : [群成员被取消禁言事件（该成员不是Bot）](https://docs.mirai.mamoe.net/mirai-api-http/api/EventType.html#群成员被取消禁言事件-该成员不是bot)

+ MemberTitleChangedEvent : [群员称号改变](https://docs.mirai.mamoe.net/mirai-api-http/api/EventType.html#群员称号改变)

### 申请事件

+ NewFriendRequestedEvent : [添加好友申请](https://docs.mirai.mamoe.net/mirai-api-http/api/EventType.html#添加好友申请)

+ NewMemberRequestedEvent : [用户入群申请（Bot需要有管理员权限）](https://docs.mirai.mamoe.net/mirai-api-http/api/EventType.html#用户入群申请-bot需要有管理员权限)

+ NewInvitationRequestedEvent : [Bot被邀请入群申请](https://docs.mirai.mamoe.net/mirai-api-http/api/EventType.html#bot被邀请入群申请)