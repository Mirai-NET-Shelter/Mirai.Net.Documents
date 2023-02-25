# 模块化

Mirai.NET 提供了一个简易的、可拓展（这一点我也不知道是不是真的）的模块化系统。

## IModule

在 Mirai.NET 中，一个模块必须继承 `IModule` 接口，这个接口很简单，只包括以下成员：

- `void Execute(MessageReceiverBase @base)`：模块功能逻辑
- `bool? IsEnable { get; set; }`：模块是否启用（可以动态修改），默认为启用

## 简单用例

### 创建一个新模块

随便一个类，然后继承 `IModule`：

```cs
public class Module1 : IModule
{
    public async void Execute(MessageReceiverBase @base)
    {
        var receiver = @base.Concretize<GroupMessageReceiver>();
        //function
    }

    public bool? IsEnable { get; set; }
}
```

注意，`Concretize<GroupMessageReceiver>()` 是把 `Execute` 方法的 `@base` 参数转化成具体的调用模块时的 Receiver。比如，如果你在一个 `GroupMessageReceiver ` 的订阅中调用了此模块，模块接收到的不会是这个 `GroupMessageReceiver`， 而是它的父类 `MessageReceiverBase`，所以这时你需要用`Concretize<GroupMessageReceiver>`把`@base`转化成具体的`GroupMessageReceiver`。

### 调用模块

#### 获取编写的模块

你可以自己建立一个 `List<IModule>`，然后手动添加继承了 `IModule` 的类实例：
```cs
var modules = new List<IModule>()
{
    new Module1()
};
```

也可以直接使用 Mirai.NET 提供的方法：

```cs
// 实例化任何一个模块，然后通过它调用`GetModules`，就可以获取到同一个命名空间下的所有模块。
var modules = new Module1().GetModules();
```

<details>

<summary>

通过编译后的 dll 文件调用模块

</summary>

```cs
var dllLocation = @"xxx.dll";
var assembly = Assembly.LoadFile(dllLocation);
var rawModules = assembly.GetTypes().Where(x => x.GetInterfaces().Any(i => i == typeof(IModule))).ToList();
var modules = rawModules.Select(Activator.CreateInstance).Select(m => (m as IModule)!).ToList();
```

</details>

#### 调用模块

调用模块有两种方式：

```cs
bot.MessageReceived.WithModules(modules).SubscribeGroupMessage(receiver =>
{
    //do things
});

//或者

bot.MessageReceived.SubscribeGroupMessage(receiver =>
{
    modules.Raise(receiver);
});

```