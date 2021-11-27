---
home: true
# heroImage: /hero.png
heroText: Mirai.Net
tagline: .Net实现的Mirai社区SDK
actionText: 开始使用 →
actionLink: /guide/
features:
  - title: 简洁
    details: 没有那么多繁琐的东西，不整那些花里胡哨的玩意。
  - title: 跨平台
    details: 基于.Net Standard 2.0开发。
  - title: 易用
    details: 如果看了文档还不会用，你要我开宝宝巴士吗？
footer: AGPL-3.0 Licensed | Copyright © 2021 SinoAHpx
---

## 快速上手

### 安装

- 使用 Nuget 安装(推荐)
  - Nuget 包管理器: `Install-Package Mirai.Net -Version 2.3.4`
  - .Net CLI: `dotnet add package Mirai.Net --version 2.3.4`
  - **或者在 IDE 的可视化界面搜索`Mirai.Net`安装。**
- 自己克隆这个仓库的默认分支，然后自己编译，然后自己添加 dll 引用。

### 创建和启动 Bot

<details>
  <summary>名称空间引用</summary>

```cs
using System;
using System.Linq;
using System.Reactive.Linq;
using System.Threading;
using System.Threading.Tasks;
using Mirai.Net.Data.Messages;
using Mirai.Net.Data.Messages.Receivers;
using Mirai.Net.Sessions;
```

</details>

```cs
using var bot = new MiraiBot
{
    Address = "localhost:8080",
    QQ = xx,
    VerifyKey = "xx"
};
```

(因为`MiraiBot`类实现了`IDisposable`接口，所以可以使用`using`关键字)

`Address`和`VerifyKey`来自`mirai-api-http`的配置文件，`QQ`就是`Mirai Console`已登录的机器人的 QQ 号。

创建完`MiraiBot`实例之后，就可以启动了:

```cs
await bot.Launch();
```

### 监听事件和消息

`MiraiBot`类暴露两个属性: `EventReceived`和`MessageReceived`，订阅它们就可以监听事件和消息。

下面的例子就是过滤出接收到的`好友请求事件`事件，然后把它从`EventBase`转换成具体的`NewFriendRequestedEvent`，最后才是订阅器。

(消息的订阅器也是同样的)

```cs
bot.EventReceived
    .OfType<NewFriendRequestedEvent>()
    .Subscribe(x =>
    {
        //do things
    });
```

### Hello, World

`Mirai.Net`通过一系列的`xxManager`来进行主动操作，其中，消息相关的管理器为`MessageManager`。

#### 发送消息

这里以发送群消息作为演示，实际上还可以发送好友消息，临时消息和戳一戳消息。

发送消息的方法有两个参数: 发送到哪里和发送什么。所以第一个参数就是发消息的群号，第二个参数就是要发送的消息链。

(因为第二个参数接收的是一个`params MessageBase[]`类型的参数，所以需要调用`Append`拓展方法把字符串转换成消息链。)

```cs
await MessageManager.SendGroupMessage("xx", "Hello, World".Append());
```

或者:

```cs
await MessageManager.SendGroupMessage("xx", "Hello, ".Append(new AtMessage("xx")).Append(" !"));
```
