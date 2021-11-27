# 指北
---

欢饮来到Mirai.Net的文档，希望你可以在这里找到你想要的一切。

Mirai.Net社区群: `1042821169`，欢迎你的加入。

## 在开始之前

不过请不要着急，在文档之前，请先确保你已经知道以下几点：

+ Mirai.Net是一个开源项目。
	+ 也就是说开发者和维护人员本该没有任何义务回答你的问题，所以请学习[提问的智慧](https://github.com/ryanhanwu/How-To-Ask-Questions-The-Smart-Way/blob/main/README-zh_CN.md)。
	+ 以及几乎所有的Mirai.Net的开发工作都是用爱发电，所以请不要认为开发者和维护人员没有其它事情要做。

+ 我们希望有一个宽松的社区氛围。
	+ 请不要被上面这些看起来很严肃的话吓到，我们并不希望看到一个死气沉沉的社区环境，所以请大胆一些，只要你不是刚上小学（如果真是的话那也是个十分酷的事情，但是这里是个比喻）。
+ 请体面一些，也就是变得礼貌和友善。

## 基础知识

因为这份文档面向的是全体用户，所以为了照顾一些刚刚接触Mirai以及Mirai.Net的用户，在这里先补充一些基础知识吧。

### mirai生态

mirai是一个非常庞大的项目，这里仅仅是简单的扫盲，详细的了解请参考[官方文档](https://github.com/mamoe/mirai/blob/dev/docs/mirai-ecology.md#mirai-%E4%BD%BF%E7%94%A8-kotlin-%E7%BC%96%E5%86%99%E7%9A%84%E9%AB%98%E6%95%88%E7%8E%87-qq-%E6%9C%BA%E5%99%A8%E4%BA%BA%E6%A1%86%E6%9E%B6)。

#### [mirai](https://github.com/mamoe/mirai)是啥

> mirai 是一个在全平台下运行，提供 QQ Android 协议支持的高效率机器人库

通常来说，使用mirai开发机器人有以下几种方式（以及比较冷门的mirai-native，我没使用过，故此处不进行介绍）：

1. 直接引用[mirai-core](https://github.com/mamoe/mirai/tree/dev/mirai-core)。
2. 使用[mirai-console](https://github.com/mamoe/mirai-console)，开发console插件。
3. 或者使用[mirai-api-http](https://github.com/mamoe/mirai-api-http)。

通常来说，使用前两种方式（core和console）需要一定的JVM编程语言基础（比如Kotlin或者Java），而后一种方式(api-http)则不限定语言和技术，这也就是为什么现在你可以用C#来调用mirai编写QQ机器人。

#### [mirai-api-http](https://github.com/mamoe/mirai-api-http)是啥

> Mirai-API-http插件 提供HTTP API供所有语言使用mirai

正如你打开本项目所见到的，之所有能够有一堆*mirai社区sdk*，正是因为有了mirai-api-http。

mirai-api-http是一个mirai-console插件，也就是说要使用mirai-api-http必须配置mirai-console环境，这个稍后会讲到。

mirai-api-http提供了一系列的http api用于与mirai-console交互，所以本质上Mirai.Net所提供的就是封装与mirai-api-http交互的过程，然后在此基础上尽量添加一些实用的功能。

看不懂？没关系，反正你只需要知道有这么个玩意就行了。


### 收发消息

这里简单地介绍以下Mirai.Net发送和接收消息的一些基础概念。

#### 消息链

不管是发送和接收消息，mirai都使用了一种名叫*消息链*的方案来处理收到/发出的富文本消息。

也就是说，在一个消息链中，可以包含多种类型的消息，比如文本消息、图片消息、语音消息等等。

#### 消息接收器

消息接收器是Mirai.Net中特有的一种消息容器，通常来说，消息接收器都是`MessageReceiverBase`的子类，它们共同包含下列属性：

+ `MessageChain`，也就是消息链。
+ `Type`，用来指示该消息接收器的类型。
  + `Friend`，表示接收到的是好友消息。
  + `Group`，表示接收到的是群消息。
  + `Temp`，表示接收到的是临时消息。
  + `Stranger`，表示接收到的是陌生人消息。
  + `OtherClient`，表示接收到的是其他客户端消息。

但实际上也还有一个基类没有定义，却同样存在于各个子类的属性`Sender`，这个属性表示消息的发送者，它会根据子类的不同而有着不同的类型。比如`GroupMessageReceiver`的`Sender`就是`Member`，而`FriendMessageReceiver`的`Sender`就是`Friend`，以此类推。



## 安装和配置mirai环境

虽然mirai的官方文档已经有了详细的配置教程，但是为了不让大家多看些文档，我们这里简单地介绍一下安装mirai的方法，如果你已经部署完成Mirai.Net所需要的mirai环境(以及最新的`mirai-api-http`)，这部分可以跳过。

注意，从这里开始，文档里所有的`mirai`指的都是mirao-console。

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

到这里，Mirai.Net所需要的`mirai`环境已经配置好了。

## 安装 Mirai.Net

你可以创建一个新项目或者再现有的项目里安装Mirai.Net，但是请参考[.Net Standard implementation support](https://docs.microsoft.com/en-us/dotnet/standard/net-standard) 来选择项目框架，通常来说建议选择长期支持的`.Net 6`，**不推荐使用.Net Framework**。

![](https://i.loli.net/2021/08/04/dyQYARgux2kDIBX.png)

在要安装项目上右击`管理Nuget包`，然后再`Nuget包管理器`的页面上搜索Mirai.Net，有时候你应该勾选`包含预发布`选项，然后点击安装按钮，在弹出的窗口上点击`确定`，就安装完成Mirai.Net了。

## 开始写代码

Mirai.Net本质上是对`mirai-api-http`交互的封装，并且加了一些方便于使用的脚手架。如果你对`mirai`一窍不通，那么上面的宝宝巴士级别地安装教学也应该让你成功地配置了`mirai-api-http`环境。如果你对 C#几乎一窍不通，你希望借此机会来尝试一下 C#这门优雅地编程语言，那么Mirai.Net是一个不错的选择。Mirai.Net使用了许多的 C#特色功能，阅读源码或许会有一点帮助，用Mirai.Net来构建一个机器人应用程序也是非常有趣的一件事。

### MiraiBot

Mirai.Net用`MiraiBot`类来表述一个 Mirai 机器人对象，可以有多个`MiraiBot`类实例，**但是一经启动之后，Mirai.Net只会调用最后一个启动的`MiraiBot`实例。**

Mirai.Net实现了`IDisposable`接口，所以你应该在用不到此对象的时候调用其`Dispose`方法来释放资源，或者直接在初始化的时候使用`using`关键字。

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

### Hello, World!

这里是Mirai.Net使用指北的最后一部分，我们来看看如何使用Mirai.Net来发送一条消息。当然，这里仅仅是简单的演示，如果你需要更加深入了解，或许你应该去看[示例]()。

通常来说，消息的发送在Mirai.Net里分为主动发送被被动发送。被动发送就是收到了别人的消息再做出响应，而主动发送就是自己发送的消息。下面的示例仅演示主动发送消息。

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