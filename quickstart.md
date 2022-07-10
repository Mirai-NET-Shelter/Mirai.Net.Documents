# 快速上手

> 从0到Hello, World

## 前置准备

如你所见，Mirai.NET是一个基于基于 [.NET Standard 2.0](https://docs.microsoft.com/en-us/dotnet/standard/net-standard) 开发的项目，这意味着你可以使用所有.NET Standard 2.0支持的.NET版本进行开发。尽管如此，最推荐的版本还是最新的长期支持版[.NET 6](https://dotnet.microsoft.com/en-us/download)。

以及，你还需要：

- 一个（你自己觉得）好用的IDE
- 一台联网的计算机
- 一个正常工作的人类大脑
- 一双勤劳的手

## 安装mirai环境

你也可以先了解：[什么是mirai](/common-sense.md)。

虽然mirai的官方文档已经有了详细的配置教程，但是为了不让大家多看些文档，我们这里简单地介绍一下安装mirai的方法，如果你已经部署完成Mirai.NET所需要的mirai环境(**以及最新的`mirai-api-http`**)，这部分可以跳过。

注意，从这里开始，文档里所有的`mirai`都是指`mirai-console`。

### 安装 MCL

`MCL`(Mirai Console Loader Installer)是一个`mirai-console`的 CUI 封装，安装它就完事了。

首先访问`MCL`的[github release](https://github.com/iTXTech/mcl-installer/releases)，根据你的系统选择对应的安装器，通常来说你应该下载`mcl-installer-xx-windows-amd64.exe`，因为如果你用别的系统你应该不会继续看这个宝宝巴士文档。

![](https://i.loli.net/2021/08/04/tpKVqcEsbQHkRGJ.png)

那么，现在你已经下载好了`mcl-installer`，现在你需要把它放到一个文件夹里，然后运行它。通常来说，你应该只需要一直按`enter`键。

当`Press Enter to exit`出现，你就可以关闭安装器的窗口。

### 启动 MCL

下面就是安装好`MCL`的结果，你应该运行`mcl.cmd`这个命令脚本。

![](https://i.loli.net/2021/08/04/oeDvuIQGWMY4kOz.png)

运行之后，等到`main: mirai-console started successfully.`这行绿色字出现的时候，请先输入`/stop`来关闭`mcl.cmd`的运行窗口。因为我们还需要手动安装`mirai-api-http`插件。

### 安装和配置 mirai-api-http

首先访问[mirai-api-http release](https://github.com/project-mirai/mirai-api-http/releases) 页面，下载`jar`构件，下载完成后，把它放到`/plugins`目录下，然后再启动`mcl.cmd`。

![](https://i.loli.net/2021/08/04/dC35wLPz7rkcuj4.png)

同样的，等到`main: mirai-console started successfully.`这行绿色字出现的时候，先输入`/stop`来关闭`mcl.cmd`的运行窗口。再打开`/config/net.mamoe.mirai-api-http/setting.yml`文件。

用下面的内容覆盖原有的内容(来自[官方文档](https://docs.mirai.mamoe.net/mirai-api-http/#setting-yml-模板)):

```yaml
## 配置文件中的值，全为默认值

## 启用的 adapter, 内置有 http, ws, reverse-ws, webhook
adapters:
  - http
  - ws

## 是否开启认证流程, 若为 true 则建立连接时需要验证 verifyKey
## 建议公网连接时开启
enableVerify: true
verifyKey: 1234567890

## 开启一些调式信息
debug: false

## 是否开启单 session 模式, 若为 true，则自动创建 session 绑定 console 中登录的 bot
## 开启后，接口中任何 sessionKey 不需要传递参数
## 若 console 中有多个 bot 登录，则行为未定义
## 确保 console 中只有一个 bot 登陆时启用
singleMode: false

## 历史消息的缓存大小
## 同时，也是 http adapter 的消息队列容量
cacheSize: 4096

## adapter 的单独配置，键名与 adapters 项配置相同
adapterSettings:
  ## 详情看 http adapter 使用说明 配置
  http:
    host: localhost
    port: 8080
    cors: [*]

  ## 详情看 websocket adapter 使用说明 配置
  ws:
    host: localhost
    port: 8080
    reservedSyncId: -1
```

通常来说，你还需要自己修改`verifyKey`的值。

### 登录机器人账号

启动`mcl.cmd`，这次不用再关。

输入命令:`/login <qq> <密码>`，就可以登陆机器人账号了。通常来说，正常的机器人账号是可以直接登陆的，如果出现红色的错误提示，那么你可以根据`mcl.cmd`输出的提示文本找人帮忙或者自己解决。

到这里，Mirai.NET所需要的`mirai`环境已经配置好了。

#### 登录需要验证码

如果你登陆mcl弹出了下面的弹窗，请访问[TxCaptchaHelper](https://github.com/mzdluo123/TxCaptchaHelper)并按照提示操作。

![picture 1](https://s2.loli.net/2022/02/27/AztkmgU4o6W8nyT.png)  

## 安装Mirai.NET

- 使用 Nuget 安装(推荐)
  - Nuget 包管理器: `Install-Package Mirai.Net`
  - .NET CLI: `dotnet add package Mirai.Net`
  - **或者在 IDE 的可视化界面搜索`Mirai.Net`安装最新版。**
- ~~克隆这个仓库的默认分支，自行编译之后，再手动添加 dll 引用~~

### 演示：在Visual Studio 2022安装Mirai.NET

![](https://i.loli.net/2021/08/04/dyQYARgux2kDIBX.png)

在要安装项目上右击`管理Nuget包`，再到`Nuget包管理器`的页面上搜索Mirai.NET，有时候你应该勾选`包含预发布`选项，然后点击安装按钮，在弹出的窗口上点击`确定`，就安装完成Mirai.NET了。

## Hello, World

Mirai.NET本质上是对`mirai-api-http`交互的封装，并且加了一些方便于使用的脚手架。如果你对`mirai`一窍不通，那么上面的宝宝巴士级别地安装教学也应该让你成功地配置了`mirai-api-http`环境。如果你对 C#几乎一窍不通，你希望借此机会来尝试一下 C#这门优雅地编程语言，那么Mirai.NET是一个不错的选择。Mirai.NET使用了许多的 C#特色功能，阅读源码或许会有一点帮助，用Mirai.NET来构建一个机器人应用程序也是非常有趣的一件事。

### MiraiBot

Mirai.NET用`MiraiBot`类来表述一个 Mirai 机器人对象，可以有多个`MiraiBot`类实例，**但是一经启动之后，Mirai.NET只会调用最后一个启动的`MiraiBot`实例。**

Mirai.NET实现了`IDisposable`接口，所以你应该在用不到此对象的时候调用其`Dispose`方法来释放资源.

```cs
var bot = new MiraiBot
{
    Address = "localhost:8080",
    QQ = "xxx",
    VerifyKey = "xxx"
};
```

创建一个`MiraiBot`对象只需要三个属性:

- `QQ`，就是`mirai console`登陆的机器人的账号
- `VerifyKey`，就是`mirai-api-http`配置文件内的`verifyKey`
- `Address`，就是`mirai-api-http`配置文件内的`adapterSettings`的`host:port`组合值。**Mirai.NET 需要`http`和`ws`这两个 adapter 的 host 和 post 相同。**

创建完`MiraiBot`对象，就可以调用`LaunchAsync`方法来启动了:

```cs
await bot.LaunchAsync();
```

注意，调用`LaunchAsync`方法并不会阻塞线程，所以如果你不想要你的程序马上退出的话，你应该自己阻塞线程。

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

### Hello, World!

这里是Mirai.NET使用指北的最后一部分，我们来看看如何使用Mirai.NET来发送一条消息。当然，这里仅仅是简单的演示，如果你需要更加深入了解，或许你应该去看示例。

通常来说，消息的发送在Mirai.NET里分为主动发送被被动发送。被动发送就是收到了别人的消息再做出响应，而主动发送就是自己发送的消息。下面的示例仅演示主动发送消息。

#### 发送一条群聊消息

```cs
await MessageManager.SendGroupMessageAsync("目标群号", "Hello, World!");
```

#### 发送一条好友消息

```cs
await MessageManager.SendFriendMessageAsync("目标QQ", "Hello, World!");
```

#### 发送一条临时会话消息

```cs
await MessageManager.SendTempMessageAsync("目标QQ", "目标群号", "Hello, World!");
```