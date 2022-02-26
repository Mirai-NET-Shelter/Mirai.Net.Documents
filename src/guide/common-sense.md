# 基础知识

因为这份文档面向的是全体用户，所以为了照顾一些刚刚接触Mirai以及Mirai.NET的用户，在这里先补充一些基础知识吧。

## mirai生态

mirai是一个非常庞大的项目，这里仅仅是简单的扫盲，详细的了解请参考[官方文档](https://github.com/mamoe/mirai/blob/dev/docs/mirai-ecology.md#mirai-%E4%BD%BF%E7%94%A8-kotlin-%E7%BC%96%E5%86%99%E7%9A%84%E9%AB%98%E6%95%88%E7%8E%87-qq-%E6%9C%BA%E5%99%A8%E4%BA%BA%E6%A1%86%E6%9E%B6)。

### [mirai](https://github.com/mamoe/mirai)是啥

> mirai 是一个在全平台下运行，提供 QQ Android 协议支持的高效率机器人库

通常来说，使用mirai开发机器人有以下几种方式（以及比较冷门的mirai-native，我没使用过，故此处不进行介绍）：

1. 直接引用[mirai-core](https://github.com/mamoe/mirai/tree/dev/mirai-core)。
2. 使用[mirai-console](https://github.com/mamoe/mirai-console)，开发console插件。
3. 或者使用[mirai-api-http](https://github.com/mamoe/mirai-api-http)。

通常来说，使用前两种方式（core和console）需要一定的JVM编程语言基础（比如Kotlin或者Java），而后一种方式(api-http)则不限定语言和技术，这也就是为什么现在你可以用C#来调用mirai编写QQ机器人。

### [mirai-api-http](https://github.com/mamoe/mirai-api-http)是啥

> Mirai-API-http插件 提供HTTP API供所有语言使用mirai

正如你打开本项目所见到的，之所有能够有一堆*mirai社区sdk*，正是因为有了mirai-api-http。

mirai-api-http是一个mirai-console插件，也就是说要使用mirai-api-http必须配置mirai-console环境，这个稍后会讲到。

mirai-api-http提供了一系列的http api用于与mirai-console交互，所以本质上Mirai.NET所提供的就是封装与mirai-api-http交互的过程，然后在此基础上尽量添加一些实用的功能。

看不懂？没关系，反正你只需要知道有这么个玩意就行了。


## 收发消息

这里简单地介绍以下Mirai.NET发送和接收消息的一些基础概念。

### 消息链

不管是发送和接收消息，mirai都使用了一种名叫*消息链*的方案来处理收到/发出的富文本消息。

也就是说，在一个消息链中，可以包含多种类型的消息，比如文本消息、图片消息、语音消息等等。

### 消息接收器

消息接收器是Mirai.NET中特有的一种消息容器，通常来说，消息接收器都是`MessageReceiverBase`的子类，它们共同包含下列属性：

+ `MessageChain`，也就是消息链。
+ `Type`，用来指示该消息接收器的类型。
  + `Friend`，表示接收到的是好友消息。
  + `Group`，表示接收到的是群消息。
  + `Temp`，表示接收到的是临时消息。
  + `Stranger`，表示接收到的是陌生人消息。
  + `OtherClient`，表示接收到的是其他客户端消息。

但实际上也还有一个基类没有定义，却同样存在于各个子类的属性`Sender`，这个属性表示消息的发送者，它会根据子类的不同而有着不同的类型。比如`GroupMessageReceiver`的`Sender`就是`Member`，而`FriendMessageReceiver`的`Sender`就是`Friend`，以此类推。