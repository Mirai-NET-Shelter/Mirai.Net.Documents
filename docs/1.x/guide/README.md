---
sidebar: auto
---

# Mirai.Net 开发指南

Mirai.Net项目使用Jetbrains Rider而非Visual Studio来开发，基于.Net 5和C# 9编写，默认适配.Net core 3.1，.Net5以及.Net 5-windows三个框架，如果想要适配旧的.Net Framework，请自行克隆源代码进行迁移工作。

## 基础概念

一下的这些东西看不懂不重要，重要的是：这个库，可以轻松地编写QQ机器人。

### mirai是什么？
+ [mirai](https://github.com/mamoe/mirai): mirai 是一个在全平台下运行，提供 QQ Android 协议支持的高效率机器人库
+ [mirai-console](https://github.com/mamoe/mirai-console): 它在 Mirai 框架提供的基础功能的基础上进行了封装并进一步提供了更方便的开放接口。
+ [mirai-api-http](https://github.com/project-mirai/mirai-api-http): mirai-api-http是一个mirai-console插件，目的是为了让其它非jvm编程语言实现与mirai的交互。

### Mirai.Net是什么？
Mirai.Net是.Net实现的mirai社区SDK，所谓社区SDK，就是基于[mirai-api-http](https://github.com/project-mirai/mirai-api-http)与mirai实现交会的非jvm编程语言SDK。

Mirai.Net所做的工作本质上就是对mirai-api-http所提供的接口进行一些post/get请求，以及监听它的Websocket消息。这个项目存在的意义就是为了开发者使用mirai-api-http的时候直接使用Mirai.Net封装好的.Net成员，而无需再去写一堆重复的json来请求mirai-api-http的响应。

## 开始使用

此处假设看这个文档的人是一个对mirai一无所知但对于C#(或者别的任何.Net编程语言，但是本文档的所有代码都会使用C#来编写)有一定基础的人。

请跟随以下步骤。

### 配置mirai-console

这个部分的内容实际上已经在[mirai的用户手册](https://github.com/mamoe/mirai/blob/dev/docs/UserManual.md)里讲得很清楚，本文档将基于MCL控制台应用程序来作为示例，此处不再赘述详细的安装步骤。

**值得注意的是，mirai-api-http是必须安装的，否则无法使用Mirai.Net。**

```shell
./mcl --update-package net.mamoe:mirai-api-http --type plugin --channel stable
```

安装完成mirai-api-http插件之后，请记得重新启动一下MCL，你会看到在```\config\net.mamoe.mirai-api-http```目录下已经生成了一个叫做```setting.yml```的YAML文档，请先关闭MCL，再使用任意编辑器打开这个文档。如果不懂这个文档里的内容指的是什么，可以打开[mirai-api-http文档](https://project-mirai.github.io/mirai-api-http)，往下拉。

在```setting.yml```里，找到```enableWebsocket```，并将其设置为```true```。

### 安装Mirai.Net到你的项目

+ 在Visual Studio中选中你想要安装Mirai.Net的项目
+ 然后再右击菜单中选择```管理Nuget程序包``
+ 在```Nuget包管理器```页面
+ 从```已安装```项选择```浏览```项
+ 搜索```Mirai.Net```，点击安装

至此，Mirai.Net已经安装到了你的项目里，接下来要做的事情，就是开始使用它。

### 编写第一个Hello, World

以下代码主要作用是展示是如何Mirai.Net发送一条Hello, World到群聊里的，其技术细节会在之后的文档中讲到，看不懂也没关系，复制粘贴即可，如果出现了引用缺失问题，请直接使用Visual Studio的自动修复功能来自动引用缺失的命名空间。

#### 配置Bot对象的Session属性

除了机器人的QQ号之外，其它3个属性的值都来自于config\net.mamoe.mirai-api-http\setting.yml文件。

```csharp
Bot.Session = new MiraiSession
{
    Host = "host", 
    Port = "port",
    Key = "authKey", //Guid.NewGuid()
    QQ = "机器人的QQ号"
};
```

#### 连接插件

在这之后，调用```Launch```方法来和mirai-api-http插件建立连接。

```csharp
await Bot.Launch();
```

#### 发送消息

最后，构造一个```GroupMessenger```对象，再调用它的```Send```方法，传入[消息链](what-is-message-chain)即可发送一条消息到指定群聊。

```csharp
var groupMessenger = new GroupMessenger("QQ群号");
await groupMessenger.Send(new PlainMessage("Hello, World"));
```

## Bot

这部分内容将会详解Mirai.Net的核心部分，如果想要了解各种[消息](/docs/message//)和[事件](/docs/event/)，请访问网页上方导航栏。

目前版本(1.0.0)的所有事件都被封装到Bot类里，所以这个类是在Mirai.Net里至关重要的一个类。Bot类是一个静态类，也就是说Bot类将有且仅有一个可访问对象。这意味着，如果要访问Bot类的对象，只需要使用```类名.成员```的方式即可。

此部分文档的粗体文字即为方法名，比如```static void Launch()```的意思就是一个叫做```Launch```的静态异步方法返回void，不需要任何参数。

如果没有特殊声明，Mirai.Net中的所有公开方法都是可等待的异步方法，请按照下方的格式调用。

```cs
await Method();
```

### 公开属性

Bot类仅对外公开2个属性，分别是：

+ Session: 用来配置和mirai-api-http插件的交互
  + Host: 通常是127.0.0.1
  + Port: 用来与mirai-api-http连接的端口，范围是 1 - 65535
  + Key: 通常应该是一串随机字符
  + QQ: 机器人的QQ号
  + SessionKey: 这个属性只对外开放get访问器，不用管它
+ Modules: 用来实现模块化开发

### static void Launch()

+ 与mirai-api-http建立连接
+ 开始监听mirai-api-http通过websocket传来的消息和事件
+ 把websocket传来的消息发送到每一个子模块

### static void Terminate()

+ 断开与mirai-api-http的连接
+ 结束websocket监听

### static string GetPluginVersion()

获取mirai-api-http插件的版本

### static void HandleGroupJoinRequest()

处理入群申请

| 参数类型                     | 是否可选 |         描述         |
| :--------------------------- | :------: | :------------------: |
| [MemberJoinApplyEventArgs]   |    否    |       事件参数       |
| [MemberJoinApplyOperateType] |    否    |       操作类型       |
| string                       |    是    | 如果拒绝，回复此消息 |

[MemberJoinApplyEventArgs]: https://project-mirai.github.io/mirai-api-http/EventType.html#用户入群申请-bot需要有管理员权限
[MemberJoinApplyOperateType]: https://project-mirai.github.io/mirai-api-http/EventType.html#用户入群申请-bot需要有管理员权限

### static void HandleInvitedRequest()

处理机器人受邀申请

| 参数类型              | 是否可选 |         描述         |
| :-------------------- | :------: | :------------------: |
| [BotInvitedEventArgs] |    否    |       事件参数       |
| bool                  |    否    |       是否同意       |
| string                |    是    | 如果拒绝，回复此消息 |

[BotInvitedEventArgs]: https://project-mirai.github.io/mirai-api-http/EventType.html#bot被邀请入群申请

### static IEnumerable\<BotFriend> GetFriendList()

获取机器人QQ号的好友列表

| 成员名 |  类型  | 描述  |
| :----- | :----: | :---: |
| Id     | string | QQ号  |
| Nick   | string | 昵称  |
| Remark | string | 备注  |


### static IEnumerable\<BotGroup> GetGroupList()

获取机器人QQ号的群列表

| 成员名     |         类型         |   描述   |
| :--------- | :------------------: | :------: |
| Id         |        string        |   群号   |
| Name       |        string        |  群名称  |
| Permission | MemberPermissionType | 群内权限 |

### static IEnumerable\<GroupMember> GetGroupMemberList()

获取某个群的成员列表

| 参数类型 | 是否可选 |     描述     |
| :------- | :------: | :----------: |
| string   |    否    | 要获取的群号 |

## IModule

IModule接口十分简单，只有一个传入```MessageReceivedArgs```作为参数的```void Execute()```方法。这并非是因为它不重要，只是因为目前的Mirai.Net1.0.0版本暂时还不是那么的完善，所以这个如此重要的类也只是做了一下简单的实现。

## CommandModuleBase

```CommandModuleBase```是```ICommand```的实现，这是一个抽象类，定义了一个virtual的Execute方法，可选择性override。

### void ExecuteCommand()

| 参数类型            | 是否可选 |   描述   |
| :------------------ | :------: | :------: |
| MessageReceivedArgs |    否    | 事件参数 |
| string[]            |    否    | 命令参数 |