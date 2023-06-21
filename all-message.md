# 所有消息类型

本文列出Mirai.Net支持的所有消息类型，它们全部位于`Mirai.Net.Data.Messages.Concretes`命名空间下：

## MessageBase 消息基类

MessageBase位于命名空间`Mirai.Net.Data.Messages`下，是所有消息类型的基类。

拥有成员：

- 虚属性`Type`，为`Messages`枚举类型

- 覆写方法`ToString()`，返回一段JSON文本

- 方法`SerializeToMiraiCode()`，将该MessageBase序列化为Mirai码字符串。
    - 注：为了保证在对该方法进行封装的过程中尽可能保证可操作性和拓展性，所有不支持序列化为Mirai码的消息类型在进行序列化的时候**无一例外会抛出异常**，**包括SourceMessage和MessageBase本身**。支持序列化的类型有：
        - PlainMessage 纯文本消息
        - ImageMessage 图片消息
        - FlashImageMessage 闪图消息
        - AtMessage @提及消息
        - AtAllMessage @全员提醒消息
        - FaceMessage QQ表情消息
        - PokeMessage 戳一戳系列消息
            - 支持戳一戳、比心、点赞、心碎、666、放大招六个类型，其余会抛出异常 *（mirai-http-api貌似只支持这六个所以基本不用担心抛出异常的问题）*
        - DiceMessage 骰子消息
        - MusicShareMessage 音乐分享消息
            - *MusicShare在mirai的2.15.0-M1版本中显示为[mirai:origin:MUSIC_SHARE]MusicShare(\*这里有一长串省略的内容) 与[Mirai:消息系统](https://github.com/mamoe/mirai/blob/dev/docs/Messages.md)中所说的\[mirai:musicshare:$args\]不符 因此这里先采用后者的方式 使用半角逗号分隔 至少保证序列化的稳定*
        - FileMessage 文件消息
            - *FileMessage由于缺少参数(InternalId)目前是实验性功能 该参数自动使用Id补全*

- 重载运算符`+`，可以将两个MessageBase对象相加返回一个MessageChain对象

## SourceMessage 源消息

SourceMessage指示消息来源，仅在接收消息时有效，且总是消息链的第一个元素。

拥有字符串属性`MessageId`和`Time`，表示消息的MessageId和时间戳。

## PlainMessage 纯文本消息

PlainMessage表示纯文本消息。

拥有成员：

- 构造函数`PlainMessage(string text)`，可以通过`new PlainMessage(text)`将一段字符串通过构造函数转换为PlainMessage对象

- 字符串属性`Text`，为该PlainMessage对象所储存的文本

- 隐式类型转换符，支持隐式与字符串互相转换

## ImageMessage 图片消息

ImageMessage表示图片消息。

拥有成员：

- 字符串属性`ImageId`、`Url`、`Path`和`Base64`，通过ImageId，URL,路径，Base64编码的形式存储图片，优先级从左向右递减，只需要存在其中一个便可发送

- 字符串属性`Width`与`Height`，存储图片的宽度和高度，非必需

## FlashImageMessage 闪照消息

FlashImageMessage表示闪照消息，继承自ImageMessage，该类型除`Type`属性与`ImageMessage`不同以外其余全部相同。

## VoiceMessage 语音消息

VoiceMessage表示语音消息。

拥有字符串属性`VoiceId`、`Url`、`Path`和`Base64`，通过VoiceId，URL,路径，Base64编码的形式存储图片，优先级从左向右递减，只需要存在其中一个便可发送。**但是语音消息必须使用slk与amr格式，如果你的文件格式不符则需要转换**

## QuoteMessage 引用消息

QuoteMessage表示引用消息。

拥有成员：

- 字符串属性`MessageId`，表示被引用回复的原消息的MessageId

- 字符串属性`GroupId`，表示被引用回复的原消息所接收的群号，当为好友消息时为0

- 字符串属性`SenderId`，表示被引用回复的原消息的发送者的QQ号

- 字符串属性`TargetId`，表示被引用回复的原消息的接收者者的QQ号（或群号）

- 属性`Origin`，返回`IEnumerable<MessageBase>`集合，表示被引用回复的原消息的消息链对象

## AtMessage @提及消息

AtMessage表示@某人的提及消息。

拥有成员：

- 构造函数`AtMessage(string target)`、`AtMessage(Member target)`，可以传入QQ号或群成员对象进行提及@操作

- 字符串属性`Target`，表示所提及的QQ号

- 字符串属性`Display`，表示在提及时所显示的文字，发送消息时无效，自动使用群名片，默认为空

## AtAllMessage @全员提醒消息

AtAllMessage表示@全体成员的提及消息。无任何其它成员。

## ForwardMessage 转发消息

ForwardMessage表示合并转发所产生的消息集合。

拥有成员：

- 属性`Display`，为`ForwardDisplay`记录，表示在进入该转发消息之前所显示的缩略内容

- 属性`NodeList`，为`IEnumerable<ForwardNode>`集合，表示各消息节点所组成的集合

- 静态方法`FromChains(string id, string name, IEnumerable<MessageChain> chains)`，传入QQ号、显示名称与消息链集合以此快速构建单个人的转发消息

- 成员记录`ForwardDisplay`，与`Display`属性配合使用
    - 字符串属性`Title`，表示标题，不填默认为`群聊的聊天记录`

    - 字符串属性`Brief`，表示在未进入聊天界面时所产生的消息提示，即在QQ主页面与非QQ页面所产生的纯文本消息提示，不填默认为`[聊天记录]`

    - 字符串属性`Source`，未知内容，建议不填，默认值为`聊天记录`

    - 属性`Preview`，为`IEnumerable<string>`集合，表示该转发消息的部分预览内容，不填默认取前几条消息自动生成`显示名称: 内容`的字符串集合

    - 字符串属性`Summary`，表示该消息最低处所显示的总结内容，不填默认为`查看x条转发消息`，x为NodeList属性的元素个数

- 成员记录`ForwardNode`，与`NodeList`属性配合使用
    - 字符串属性`SenderId`，表示发送人QQ号

    - 字符串属性`Time`，表示消息发送的时间，该时间为Unix时间，即从1970-1-1到当前所经过的秒数，一般使用当前时间`DateTimeOffset.Now.ToUnixTimeSeconds().ToString()`即可，但使用该方法时要注意**本机时间是否校准**

    - 字符串属性`SenderName`，表示发送人在该消息节点中所显示的名字，可以当成一种类似于群名片的属性

    - 属性`MessageChain`，为`MessageChain`对象，表示该消息节点所使用的消息链

    - 字符串属性`SourceId`，为MessageId，可以只存在这一个属性，通过MessageId从缓存中读取一条消息作为节点

## AppMessage 小程序消息

AppMessage表示小程序消息，拥有字符串属性`Content`，表示消息内容。

## FaceMessage QQ表情消息

FaceMessage表示QQ表情消息，拥有字符串属性`FaceId`和`Name`，表示QQ表情编号和QQ表情拼音，在发送时二者可以任选其一，同时存在时`FaceId`优先级大于`Name`。

## XmlMessage XML消息 & JsonMessage JSON消息

XmlMessage和JsonMessage表示XML消息和JSON消息，分别拥有字符串属性`Xml`和`Json`，表示XML文本和JSON文本。

## PokeMessage 戳一戳系列消息

PokeMessage表示戳一戳系列消息，拥有字符串属性`Name`表示消息类型。只可能出现 _（[Poke消息](https://docs.mirai.mamoe.net/mirai-api-http/api/MessageType.html#poke)是这么写的应该吧）_ 以下六种：

- `Poke`，戳一戳

- `ShowLove`，比心

- `Like`，点赞

- `Heartbroken`，心碎

- `SixSixSix`，666

- `FangDaZhao`，放大招

## DiceMessage 骰子消息

DiceMessage表示骰子消息，拥有字符串属性`Value`，表示点数，该属性的内容为1到6的纯数字，可以通过`ConvertToInt32()`进行强制转换而不会抛出异常。~~当然如果这是你自己构建的填入了不能转换的玩意当我没说~~

## MarketFaceMessage 商城表情

MarketFaceMessage表示QQ表情商城中的表情，该消息目前不支持构造发送，只支持接收和转发。

拥有字符串属性`Id`和`Name`，表示该表情的ID和名称。

## MusicShareMessage 音乐分享消息

MusicShareMessage表示音乐分享消息。

拥有成员：

- 字符串属性`Kind`，表示分享自的软件平台，如`NeteaseCloudMusic`表示网易云音乐

- 字符串属性`Title`，表示分享消息的标题，通常来说为歌曲名

- 字符串属性`Summary`，表示该消息的概括，通常来说为歌手信息

- 字符串属性`JumpUrl`，表示该消息的跳转链接

- 字符串属性`PictureUrl`，表示该消息的封面链接

- 字符串属性`MusicUrl`，表示该消息的音乐链接

- 字符串属性`Brief`，表示该消息的简介，表示在未进入聊天界面时所产生的消息提示，即在QQ主页面与非QQ页面所产生的纯文本消息提示，通常来说为`[分享]歌曲名`

## FileMessage 文件消息

FileMessage表示文件消息。_（不过目前我给机器人发文件总是没提示）_

拥有成员：

- 字符串属性`FileId`，表示文件的识别ID

- 字符串属性`Name`，表示文件名

- **长整型**属性`Size`，表示该文件的大小

## MiraiCodeMessage Mirai码消息

MiraiCodeMessage表示Mirai码消息，**不是QQ原生的消息类型**，而是Mirai提供的一种序列化消息的方式，具体内容参见[MiraiCode](https://docs.mirai.mamoe.net/mirai-api-http/api/MessageType.html#miraicode)

拥有成员：

- 构造函数`MiraiCodeMessage(string code)`，可以通过`new MiraiCodeMessage(code)`的方式将一段字符串转换为`MiraiCodeMessage`对象，**该构造函数不会对传入值进行检查也就是说不保证是合法的Mirai码**

- 字符串属性`Code`，用以存储Mirai码

注：默认情况下，所接收的消息链**不会携带`MiraiCodeMessage`对象**