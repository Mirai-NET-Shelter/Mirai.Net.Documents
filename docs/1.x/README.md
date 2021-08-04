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
- title: .Net 5
  details: 基于.Net 5和C# 9开发。
- title: 易用
  details: 如果看了文档还不会用，开发者甚至会开宝宝巴士。
footer: MIT Licensed | Copyright © 2021 AHpxChina
---

### Hello, World

#### 配置Session

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