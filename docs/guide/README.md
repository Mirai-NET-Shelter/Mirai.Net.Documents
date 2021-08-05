# Mirai.Net 入门指北

在这里你能学会基本的 Mirai.Net 用法。这是一个宝宝巴士级别的文档。

## 安装 mirai console 环境

尽管`mirai`的官方文档已经讲的很清楚了，但是一些小的问题还没有得到解决，而且一些用户甚至可能不知道官方文档怎么看。总而言之，这里再次详细地说一次如何安装`mirai-console`。如果你已经部署完成`Mirai.Net`所需要的环境(最新的`mirai-api-http`)，这部分可以跳过。

### 安装 MCL

`MCL`是一个`mirai-console`的 CUI 封装，安装它就完事了。

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

到这里，`Mirai.Net`所需要的`mirai-console`环境已经配置好了。

## 安装 Mirai.Net

你可以创建一个新项目或者再现有的项目里安装`Mirai.Net`，但是请参考[.Net Standard implementation support](https://docs.microsoft.com/en-us/dotnet/standard/net-standard) 来选择项目框架，通常来说建议选择长期支持的`.Net Core 3.1`和最新的`.Net 5`，**不推荐使用.Net Framework**。

![](https://i.loli.net/2021/08/04/dyQYARgux2kDIBX.png)

在要安装项目上右击`管理Nuget包`，然后再`Nuget包管理器`的页面上搜索`Mirai.Net`，有时候你应该勾选`包含预发布`选项，然后点击安装按钮，在弹出的窗口上点击`确定`，就安装完成`Mirai.Net`了。

## 开始写代码

`Mirai.Net`本质上是对`mirai-api-http`交互的封装，并且加了一些方便于使用的脚手架。如果你对`mirai`一窍不通，那么上面的宝宝巴士级别地安装教学也应该让你成功地配置了`mirai-api-http`环境。如果你对 C#几乎一窍不通，你希望借此机会来尝试一下 C#这门优雅地编程语言，那么`Mirai.Net`是一个不错的选择。`Mirai.Net`使用了许多的 C#特色功能，阅读源码或许会有一点帮助，用`Mirai.Net`来构建一个机器人应用程序也是挺有意思的。

### MiraiBot

`Mirai.Net`用`MiraiBot`类来表述一个 Mirai 机器人对象，可以有多个`MiraiBot`类实例，**但是一经启动之后，`Mirai.Net`只会调用最后一个启动的`MiraiBot`实例。**

`Mirai.Net`实现了`IDisposable`接口，所以你应该在用不到此对象的时候调用其`Dispose`方法来释放资源，或者直接在初始化的时候使用`using`关键字。

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
- `Address`，就是`mirai-api-http`配置文件内的`adapterSettings`的`host:port`组合值。**Mirai.Net 需要`http`和`ws`这两个 adapter 的 host 和 post 相同。**

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

### 订阅推送

`MiraiBot`类暴露两个属性用来订阅消息/事件推送:

- `EventReceived`，事件推送
- `MessageReceived`，消息推送

这是两个基于`Reactive.Net`的`IObservable`类型的属性，所以你可以使用很酷哥的`LINQ`来过滤收到的推送:

此处使用的是`Mirai.Net`提供的脚手架`WhereAndCast`，这个方法转换符合指定类型的推送。

```cs
bot.MessageReceived
    .WhereAndCast<GroupMessageReceiver>()
    .Subscribe(message =>
    {
        //code
    });
```

注意，`EventReceived`和`MessageReceived`是可以有多个订阅器的:

```cs
bot.MessageReceived.Subscribe(x => {});
bot.EventReceived.Subscribe(x => {});
bot.MessageReceived.Subscribe(x => {});
bot.EventReceived.Subscribe(x => {});
```

### 模块化

`Mirai.Net 2.2`的模块化实现不与`Mirai.Net`耦合，只需要在收到消息推送的时候自行调用，所以你可以完全不使用模块化直接在**消息订阅器**写所有实现代码，或者完全使用模块化，订阅器里几乎不包含实现代码。

所有的模块都应该继承自`IModule`接口，这个接口很简单，只有一个方法和一个属性:

- `Execute(MessageReceiverBase receiver, MessageBase executeMessage)`
- `bool? IsEnable`

`Execute`方法就是此模块被执行的时候的逻辑代码，而`IsEnable`属性则指示这个模块是否被启动(这个属性可以在运行时被修改，默认值为 null)。

#### 定义模块

现在定义一个简单的模块:

```cs
public class TestModule1 : IModule
{
  public async void Execute(
    MessageReceiverBase @base,
    MessageBase executeMessage
  )
  {
    if (@base is GroupMessageReceiver receiver)
    {
      await receiver.SendGroupMessage("Hello, World".Append());
    }
  }

  public bool? IsEnable { get; set; }
}
```

这个模块唯一的作用就是在被执行的时候发送一条群消息`Hello, World`。

#### 调用模块

你并不一定要按照 Mirai.Net 提供的 API 来调用模块，你可以用自己的方式来调用:

```cs
var module = new TestModule1();
bot.MessageReceived
    .WhereAndCast<GroupMessageReceiver>()
    .Subscribe(receiver =>
    {
        module.Execute(receiver, receiver.MessageChain.First());
    });
```

#### 以命令的方式调用模块

首先，我们需要给某命令模块的`Execute`方法添加`CommandTrigger`特性:

```cs
public class TestModule1 : IModule
{
  [CommandTrigger("test", "/", "--", false)]
  public async void Execute(
    MessageReceiverBase @base,
    MessageBase executeMessage
  )
  {
    if (@base is GroupMessageReceiver receiver)
    {
      await receiver.SendGroupMessage("Hello, World".Append());
    }
  }

  public bool? IsEnable { get; set; }
}
```

然后在调用 Mirai.Net 提供的脚手架:

```cs
var modules = CommandUtilities
    .LoadCommandModules("DocumentDemo.Modules")
    .ExcludeDisabledModules();

bot.MessageReceived
    .WhereAndCast<GroupMessageReceiver>()
    .Subscribe(receiver =>
    {
        receiver.ExecuteCommands(modules);
    });
```
