# LINQ 语言集成查询

LINQ是微软提供的一项技术，具体内容可以查看[LINQ概述](https://learn.microsoft.com/zh-cn/dotnet/standard/linq/)，本文**仅仅**保证可以使用LINQ与Mirai.Net简单配合，**并不是**一门正式的LINQ教程！

LINQ是原生提供的内容，不需要安装额外的包，只需要在文件开头添加`using System.Linq;`就可以使用LINQ提供的一系列方法，它们全部为扩展方法。

&gt; 如果你在想自己的代码为何没有Where、OfType等方法，尝试添加using System.Linq;与**using System.Reactive.Linq;**，只有后者才可以将LINQ应用在接收消息和接收事件的IObservable可观测对象

## 快速理解LINQ

虽然LINQ的查询方式，查询对象有很多种，但是为了快速理解LINQ，我们在这里可以给LINQ下一个定义为：

&gt; LINQ就是以一种类似于SQL语句 *（这里指所使用内容的命名相似）*的形式，对集合进行快速操作的工具

如果你不能理解上述内容，可以把SQL语句相关内容删去，只知道LINQ是一个操作集合的工具就可以了。

## LINQ的形式

LINQ有两种形式，分别是查询表达式和链式表达式。

查询表达式如下：

```cs
var list = new List&lt;int&gt;{ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

var result =
    from n in list
    where n % 2 == 0
    select n;
```

此时如果你去遍历`result`并输出值，你会获得1到10内所有的偶数。这种方法与SQL语句特别相似。

用链式表达式实现上述内容如下：

```cs
var list = new List&lt;int&gt;{ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

var result = list
    .Where(x =&gt; x % 2 == 0);
```

`result`内容与上述相同。

我们由此可得：

&gt; 查询表达式是用类似于SQL语句的方式对集合进行操作，而链式表达式则是用方法的调用对集合进行操作。

由于查询表达式比较难（其实不难，但是~~我不会~~），且可读性不适合初学者，所以我们后文全部使用链式表达式。

## LINQ的具体使用

支持LINQ的类型需要实现`IEnumerable&lt;T&gt;`接口，`T`表示元素类型。

LINQ的链式表达式使用一系列方法处理集合，每个方法的返回值为处理后的集合 _（即`IEnumerable&lt;T&gt;`引用，听不懂的话就认为返回的对象一定实现了`IEnumerable&lt;T&gt;`接口就行了）_，所以可以一个方法接着一个方法。

LINQ的方法实际上全部是泛型的，但是在绝大多数情况下这些类型都可以自动推断，只需要当普通方法用就行了。

LINQ的方法其中一部分会需要传入参数，而这个参数为**委托**，换句话来说就是把方法当做参数传进去了，但是大部分情况下我们都没有时间专门定义一个来传入，名字就容易想半天，所以可以采用一种快速编写匿名函数的方法——Lambda表达式 它的语法如下：

&gt; (参数列表) =&gt; {语句块}

因为编译器会自动推算参数类型（在使用LINQ的大部分场景下），所以参数列表可以只写名字不写类型，在这其中，如果只有一个参数（不带类型），可以省去参数列表外层的小括号，没有参数，或者参数与参数类型出现的数量超过了一个就要加括号（说人话就是省括号只能有一个词）。

如果语句块只有一条语句的话，那么语句块外层的大括号可以省略，同时如果这个函数有返回值的话，语句块末尾出现的`return`关键字也可以在只有一条语句省略大括号情况的时候省略不写，这条语句的返回值会自动作为该函数的返回值被返回。而如果省略了大括号，这条语句末尾的分号`;`也可以省略不写（我指对于Lambda表达式来说是不写的，Lambda表达式一定是包含在其它语句里的那这整条语句的分号肯定要写啊）。

下面对常用方法进行举例：

### Where方法

Where方法用于筛选集合，参数为以下的Lambda表达式：

- 元素 =&gt; {语句块，返回布尔值}

- (元素, 索引) {语句块，返回布尔值}

当该元素被传入Lambda表达式返回的值为true时，被Where方法返回的集合中会加入该元素。

示例如下：

```cs
var list = new List&lt;int&gt;{ 10, 12, 14, 17 };

var result = list.Where(x =&gt; x &gt; 15); // 返回所有大于15的数字所组成的集合
```

```cs
var list = new List&lt;int&gt;{ 10, 12, 14, 17 };

var result = list.Where((item, index) =&gt; index % 2 == 0) // 返回所有索引为偶数的数字所组成的集合
```

### Select方法

Select方法用于投影集合，相当于把每个元素做处理之后返回一个新的集合，每一个元素被处理后都会进入新集合，这个集合的元素类型可以不与原集合相同，参数为以下的Lambda表达式：

- 元素 =&gt; {语句块，有返回值}

- (元素, 索引) =&gt; {语句块，有返回值}

示例如下：

```cs
var list = new List&lt;int&gt;{ 10, 12, 14, 17 };

var result = list.Select(x =&gt; x++); // 返回所有元素加一组成的集合
```

```cs
var list = new List&lt;int&gt;{ 10, 12, 14, 17 };

var result = list.Select((item, index) =&gt; index); // 返回所有元素的索引组成的集合
```

### OrderBy方法 & OrderByDescending方法

OrderBy方法用于排序集合，排序顺序为升序（从小到大），参数为以下内容：

- 元素 =&gt; {语句块，返回可比较对象}

- 元素 =&gt; {语句块，有返回值}, 比较器

可比较对象为以下三个内容：

- 至少实现了比较运算符中的`&lt;`和`&gt;`的对象

- 实现了`IComparable`接口的对象

- 实现了`IComparable`的方法`CompareTo`的对象

比较器为以下两个内容：

- 实现了`IComparer`接口的对象

- 实现了`IComparer`的方法`Compare`的对象

OrderByDescending方法与OrderBy相同，排序方式为降序（从大到小）。

### First、Last、Single方法 & FirstOrDefault、LastOrDefault、SingleOrDefault方法

First、Last、Single方法用于获得集合中的第一个，最后一个或唯一一个元素，参数为空或以下的Lambda表达式（即所求元素必须满足该Lambda表达式）：

- 元素 =&gt; {语句块，返回布尔值}

如果所求元素不存在（或Single方法所处理的集合中并非有且只有一个元素），则抛出异常。

FirstOrDefault、LastOrDefault、SingleOrDefault方法与上述相同，但是在未找到元素时会返回类型默认值（或所给默认值），参数为空或以下内容：

- 默认值

- 元素 =&gt; {语句块，返回布尔值}

- 元素 =&gt; {语句块，返回布尔值}, 默认值

### OfType&lt;TResult&gt;方法

OfType&lt;TResult&gt;方法用于筛选集合元素类型，必须填写泛型内容，没有参数。

### Any方法

Any方法用于确定集合中是否存在元素，参数为空或以下的Lambda表达式（即存在的元素必须满足该Lambda表达式）：

- 元素 =&gt; {语句块，返回布尔值}

如果不存在任何元素（或满足条件的元素）将返回false，如果存在将返回true。

### All方法

All方法用于确定集合中的所有元素是否都满足条件，参数以下的Lambda表达式（即所有元素都必须满足该Lambda表达式）：

- 元素 =&gt; {语句块，返回布尔值}

如果所有元素都满足条件将返回true，否则返回false。