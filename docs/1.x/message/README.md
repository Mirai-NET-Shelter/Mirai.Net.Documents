---
sidebar: auto
---

# 消息

因为此处的具体消息是基本完全按照[mirai-api-http文档](https://project-mirai.github.io/mirai-api-http/MessageType.html#source)来实现的，所以此部分文档不再赘述每个具体的消息和它的每个属性代表什么意思。

## MessageReceivedArgs

这个消息接收事件参数之所以没有放到事件参数那页去讲，是因为这个事件参数是Mirai.Net收发消息的核心部分。但是这个类十分简单，只有3个公开属性：

+ Type：就是接收到的消息的类型，是一个[MeesageTyoe枚举](wd)
+ MessageChain：就是接收到的消息内容。本质上是一个MessageBase数组，MessageBase就是所有[具体消息对象](https://project-mirai.github.io/mirai-api-http/MessageType.html#source)的基类
+ Sender：就是接收到的消息是从哪里来的，类型是一个MessageSender对象
  + Id: 消息发送者的QQ号
  + Name：消息发送者的群名片
  + PermissionType：消息发送者在群内的权限
  + Group：收到此消息的群
    + Id：群号
    + Name：群名称
    + PermissionType：机器人在群内的权限

## 消息链 (MeesageChain)

前面提到过，消息链就是接收到的消息内容，本质上是一个MessageBase，这就是mirai解析一条接收到的消息的方案。

举个例子：

> aaaa[图片]

转换成消息链就是：
```js
[
    {
        "type": "Source",
        "id": 123456,
        "time": 123456789
    },
    {
        "type": "Plain",
        "text": "aaaa"
    },
    {
        "type": "Image",
        "imageId": "xxx-xxx-xxx-xxx"
    }
]
```

## 消息回调 (MessageCallback)

消息回调就是发送消息后传回来的参数。

+ Code：状态码，如果是0就是成功
+ Message：回调消息，如果成功就是success，失败就是失败的原因
+ **MessageId**：消息唯一ID，可以用来撤回消息，回复消息之类的