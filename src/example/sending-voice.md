# 发送语音

发送语音本质上和发送图片差不多。

## 构造语音消息

四个属性任选其一，出现多个时，按照`VoiceId` > `Url` > `Path` > `Base64`的优先级

```cs
var voice = new VoiceMessage
{
    Path = "",
    Url = "",
    VoiceId = "",
    Base64 = ""
};
await r.SendMessageAsync(voice);
```

或者你也可以使用`MessageChainBuilder`：

```cs
var chain = new MessageChainBuilder()
    .VoiceFromBase64("")
    .VoiceFromId("")
    .VoiceFromPath("")
    .VoiceFromUrl("")
    .Build();

await r.SendMessageAsync(chain);
```

**但是你得把要发送的语音转换成QQ指定的slk或者amr格式，参见：** [silk-v3-decoder](https://github.com/kn007/silk-v3-decoder)

## 上传语音取得语音id再发送

```cs
var result = await FileManager.UploadVoiceAsync("path");
var vocieId = result.Item1;
```