# python_to_blockly模块介绍

这个部分主要是进行Python语言向block块语言翻译的模块，当在代码区键入相应的代码，左侧可以顺利对应出相应的块。这一部分的逻辑大致如下：

首先，将生成或者是键入的python程序解析成AST树，然后根据每一个节点进行分析，针对不同分析节点具有不同的解析方案，比如针对函数类型，比如pow()类型；调用包方法类型，比如plt.scatter()；数值表达式类型如a+b；空格间隔的表达式类型，如del a["s"]；数组类型，如a[4]等等。

上述的例子中均有不同的解析形式，每个node都有不同的树结构，命名方式也较为简单易懂，具体可以通过添加控制台输出来查看。

 