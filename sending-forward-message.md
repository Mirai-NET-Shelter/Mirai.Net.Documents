# 发送转发消息

有时因为 Bot 发送的消息会在一定程度上造成刷屏，所以将这些消息都折叠起来就可以避免这一问题。所谓折叠消息，也就是 QQ 中的`合并转发`。

## 构造 ForwardMessage

`ForwardMessage` 是一个比较庞大的类，手动构建起来相对麻烦：

```cs
var forward = new ForwardMessage
{
    NodeList = new []
    {
        
        new ForwardMessage.ForwardNode
        {
            Time = new DateTimeOffset(DateTime.Now).ToUnixTimeSeconds().ToString(),
            SenderId = "xx",
            MessageChain = new MessageChain
            {
                new PlainMessage("Hello")
            },
            SenderName = "xx",
            SourceId = "7743"
        },
        new ForwardMessage.ForwardNode
        {
            Time = new DateTimeOffset(DateTime.Now).ToUnixTimeSeconds().ToString(),
            SenderId = "xxx",
            MessageChain = new MessageChain
            {
                new PlainMessage("World!")
            },
            SenderName = "xxx",
            SourceId = "7743"
        },
    }
};
```

如果需要折叠多个人发送的消息到一个`合并转发`里，则只能通过上面的方式进行手动构建，只需要为`ForwardMessage`的`NodeList`赋值就行。它的每个元素为一个`ForwardNode`，而每个`ForwardNode`也就是你所看到的每个消息气泡，只需要为它的各个属性进行赋值。你甚至不需要按照如实赋值，只需要给出必要的信息。

## FromChains

`ForwardMessage`类中提供一个静态方法`FromChains`，可以更加方便地构建一条合并转发消息：

```cs
var forward = ForwardMessage.FromChains("xxx", "I'm not a bot", new[]
{
    new PlainMessage("111"),
    new MessageChain
    {
        new PlainMessage("Queen"),
        new ImageMessage
        {
            Url = "https://i.scdn.co/image/af2b8e57f6d7b5d43a616bd1e27ba552cd8bfd42"
        }
    },
    new MessageChain
    {
        new PlainMessage("Pink Floyd"),
        new ImageMessage
        {
            Url =
                "https://www.rollingstone.com/wp-content/uploads/2018/06/pink-floyd-1973-32d763d9-8deb-4cd8-a287-92ae0de7df3a.jpg"
        }
    }
});

```

只需要提供发送转发消息的主体，以及一系列的消息链即可。