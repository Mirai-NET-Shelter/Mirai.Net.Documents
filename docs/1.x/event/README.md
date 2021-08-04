---
sidebar: auto
---

# 事件

## 事件参数

### EventArgsBase

所有事件参数的基类，不可实例化

### [BotInvitedEventArgs](https://project-mirai.github.io/mirai-api-http/EventType.html#bot被邀请入群申请)

机器人受邀事件参数

### [MemberJoinApplyEventArgs](https://project-mirai.github.io/mirai-api-http/EventType.html#用户入群申请-bot需要有管理员权限)

申请入群事件参数

### [NewFriendApplyEventArgs](https://project-mirai.github.io/mirai-api-http/EventType.html#添加好友申请)

添加好友事件参数

### [BotDroppedEventArgs](https://project-mirai.github.io/mirai-api-http/EventType.html#bot被服务器断开或因网络问题而掉线)

机器人掉线事件参数

### [BotJoinedGroupEventArgs](https://project-mirai.github.io/mirai-api-http/EventType.html#bot加入了一个新群)

机器人主动下线事件参数

### [BotOfflinePassiveEventArgs](https://project-mirai.github.io/mirai-api-http/EventType.html#bot被挤下线)

机器人被挤下线事件参数

### [BotOnlineEventArgs](https://project-mirai.github.io/mirai-api-http/EventType.html#用户入群申请-bot需要有管理员权限)

机器人进群事件参数

### [BotKickedEventArgs](https://project-mirai.github.io/mirai-api-http/EventType.html#bot被踢出一个群)

机器人被踢事件参数

### [BotLeftGroupActiveEventArgs](https://project-mirai.github.io/mirai-api-http/EventType.html#bot主动退出一个群)

机器人主动退群事件参数

### [BotMutedEventArgs](https://project-mirai.github.io/mirai-api-http/EventType.html#bot被禁言)

机器人被禁言事件参数

### [BotUnmutedEventArgs](https://project-mirai.github.io/mirai-api-http/EventType.html#bot被取消禁言)

机器人被取消禁言事件参数

### [BotOfflineActiveEventArgs](https://project-mirai.github.io/mirai-api-http/EventType.html#bot主动离线)

机器人登陆成功事件参数

### [BotPermissionChangedEventArgs](https://project-mirai.github.io/mirai-api-http/EventType.html#bot在群里的权限被改变-操作人一定是群主)

机器人群内权限改变事件参数

### [BotReloginEventArgs](https://project-mirai.github.io/mirai-api-http/EventType.html#bot主动重新登录)

机器人主动重新登录事件参数

### [GroupNameChangedEventArgs](https://project-mirai.github.io/mirai-api-http/EventType.html#某个群名改变)

群名改变事件参数

### [GroupEntranceAnnouncementChangedEventArgs](https://project-mirai.github.io/mirai-api-http/EventType.html#某群入群公告改变)

入群公告改变事件参数

### [GroupMuteAllChangedEventArgs](https://project-mirai.github.io/mirai-api-http/EventType.html#全员禁言)

全员禁言事件参数

### [GroupAllowAnonymousChatChangedEventArgs](https://project-mirai.github.io/mirai-api-http/EventType.html#匿名聊天)

允许匿名聊天改变事件参数

### [GroupAllowConfessTalkChangedEventArgs](https://project-mirai.github.io/mirai-api-http/EventType.html#坦白说)

允许坦白说改变事件参数

### [GroupAllowMemberInviteChangedEventArgs](https://project-mirai.github.io/mirai-api-http/EventType.html#允许群员邀请好友加群)

允许成员邀请入群改变事件参数

### [GroupNewMemberJoinedEventArgs](https://project-mirai.github.io/mirai-api-http/EventType.html#新人入群的事件)

新人入群事件参数

### [GroupMemberKickedEventArgs](https://project-mirai.github.io/mirai-api-http/EventType.html#成员被踢出群-该成员不是bot)

成员被踢事件参数

 
### [GroupMemberLeftGroupActiveEventArgs](https://project-mirai.github.io/mirai-api-http/EventType.html#成员主动离群-该成员不是bot)

成员退群事件参数

### [GroupMemberCardChangedEventArgs](https://project-mirai.github.io/mirai-api-http/EventType.html#群名片改动)

成员群名片改变事件参数

### [GroupMemberTitleChangedEventArgs](https://project-mirai.github.io/mirai-api-http/EventType.html#群头衔改动-只有群主有操作限权)

成员群头衔改变事件参数

### [GroupMemberPermissionChangedEventArgs](https://project-mirai.github.io/mirai-api-http/EventType.html#成员权限改变的事件-该成员不是bot)

成员群权限改变事件参数

### [GroupMemberMutedEventArgs](https://project-mirai.github.io/mirai-api-http/EventType.html#群成员被禁言事件-该成员不是bot)

群成员被禁言事件参数

### [GroupMemberUnmutedEventArgs](https://project-mirai.github.io/mirai-api-http/EventType.html#群成员被取消禁言事件-该成员不是bot)

群成员被取消禁言事件参数

### [NudgeEventArgs](https://project-mirai.github.io/mirai-api-http/EventType.html#戳一戳触发事件)

戳一戳触发事件参数