# 初始化Bot




下面的代码成功地初始化并配置了一个`MiraiBot`实例，你可以试着运行它。

```cs

using Manganese.Text;
using Mirai.Net.Sessions;

namespace Mirai.Net.Examples
{
    public class Program
    {
        public async Task Main()
        {
            var bot = new MiraiBot
            {
                Address = "localhost:8080",
                QQ = "1590454991",
                VerifyKey = "1145141919810"
            };

            // 注意: `LaunchAsync`是一个异步方法，请确保`Main`方法的返回值为`Task`
            await bot.LaunchAsync();

            // 在这里添加你的代码，比如订阅消息/事件之类的

            // code

            // 然后在这之后卡住主线程（也可以使用别的方式，文档假设阅读者是个C#初学者）
            Console.ReadLine();
        }
    }
}

```

## 常见问题解答

### Flurl.Http.FlurlHttpException

如果你运行上面的例子之后，出现了下面的异常，请检查你的`mcl`是否已经按照[指南](../guide/install-mirai.md)正确地安装并运行。

```Flurl.Http.FlurlHttpException: 'Call failed. No connection could be made because the target machine actively refused it. (localhost:8080): POST http://localhost:8080/verify` ```