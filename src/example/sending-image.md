# 发送图片

你可知道，发送图片有几种发法？

值得注意的是，图片消息`ImageMessage`是闪照`FlashImageMessage`的父类，也就是说它们可以通过同样的方式进行构造发送。

## 构造图片消息(推荐)

几个属性任选其一，出现多个时，按照`ImageId` > `Url` > `Path` > `Base64`的优先级。


```cs
var image = new ImageMessage
{
    Path = "",
    Base64 = "",
    ImageId = "",
    Url = ""
};


await r.SendMessageAsync(image);
```

或者你也可以使用`MessageChainBuilder`：

```cs
var chain = new MessageChainBuilder()
    .ImageFromBase64("")
    .ImageFromId("")
    .ImageFromPath("")
    .ImageFromUrl("")
    .Build();

await r.SendMessageAsync(chain);
```

## 上传图片取得图片id再发送

```cs
var result = await FileManager.UploadImageAsync("path");
var imageId = result.Item1;

```