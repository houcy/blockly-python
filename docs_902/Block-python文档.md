# Block-python文档

## 项目中文件夹介绍

- ### advertising 

  项目的宣传文件

- ### blockly

  依托于Google开发的blockly，定义了一些基础的块以及相关的翻译功能。

  > 2012年6月，Google发布了完全可视化的编程语言Google Blockly，类似MIT的儿童编程语言Scratch， 你可以通过类似玩乐高玩具的方式用一块块图形对象构建出应用程序。每个图形对象都是代码块，你可以将它们拼接起来，创造出简单功能，然后将一个个简单功能 组合起来，构建出一个程序。整个过程只需要鼠标的拖曳，不需要键盘敲击。

  #### 重要文件介绍：

  - #### blocks

    **定义了各个单元静态的块结构**，定义成标签中的type属性，每个block拥有不同的type属性。

    每个js文件对应网页中一个单元，比如主程序、输入输出、变量等等。

    标签通过type类去访问这些定义好的块结构。每个函数体对应一个块形式。内部的功能函数定义在/blockly/core/block.js中。

    具体的函数字典详见[./blocks.md](./blocks.md)

  - #### core

    定义了块相关的所有**动态样式**。

    具体的函数字典详见[./core.md](./core.md)

  - #### generators

    这个文件定义所有block_to_python的**翻译**，其中可以进行的翻译有dart、js、lua、php、pseudo、python的翻译。这里python文件夹下的所有文件结构都是和blocks.js相匹配的。

  - #### language

    语言包，只用到了其中的zh-hans.js，定义了所有块和提示的中文显示文字。

- ### closure-library

  > Closure是一套开发富客户端的javascript工具。其中每一个工具都是在Apache 2.0 license下开源的，并且由google开发，维护。Closure已经被google开发了许多web应用，包括Gmail,Google Maps, Google Docs. 这些应用的性能就是Closure工具集的证明。

  这个文件夹供以blockly文件使用。

- ### docs

  开发者提供的各种文档

- ### fonts

  bootstrap配套的各种字体

- ### images

  未知使用位置的图片

- ### libs

  引入了bootstrap、jquery等包，

  codemirror中定义了python程序显示区域的逻辑，比如python关键字高亮，将每一行的代码解析成一个标签显示等等。

  _注意，每一行代码都是一个标签，这样方便规范格式，但是想要通过在某个div中直接获取所有翻译的代码是不可能的。其背后有\_\_main\_\_.py存储翻译的python代码。_

- ### skulpt

  > Skulpt is an entirely in-browser implementation of Python.
  >
  > No preprocessing, plugins, or server-side support required, just write Python and reload.

  这是另外一个被引用的包，它的功能是执行被翻译出来的python程序。这个项目在github上是开源的，同事有着详细的文档，介绍相应的项目架构以及使用方法。其主要的使用方法是引用该项目到本项目中然后通过调用已经写好的方法去执行传入的Python代码。其项目的亮点在于还引入了turtle、math、random、sys、matplotlib.pyplot等简单的Python包，可以方便的进行数值和图像操作。

  点击[这里](https://github.com/skulpt/skulpt)查询更多关于skulpt在github上的相关信息。

  点击[这里](http://www.skulpt.org/)查询开发者构建的关于skulpt项目的网站。（这个网站可以执行键入的Python代码）

  调用接口写在/src/engine.js中。

- ### src

  - #### blockly_blocks

    这个文件用于补充block中未添加的块

  - #### 其他文件

    这些文件用于定义相比于Google多出来的功能，以及涉及了动态生成网页元素的代码。主要文件介绍：

    - **main.js**

      通过构造函数创建出各个模块，主要有BlockPyDialog、BlockPyToolbar、BlockPyFeedback、BlockPyEditor、BlockPyPresentation、BlockPyPrinter、BlockPyEngine、BlockPyServer、BlockPyCorgis等，这些模块通过js代码的形式架构起了这个项目。

    - **editor.js**

      进行block块编辑区的定义，主要涉及各个单元以及单元中不同设定好的块的加载。

    - **interface.html&interface.js**

      定义除了最大的div样式（定义在blockpy.html中）以外所有界面布局。

      但是编辑完interface.html需要在根目录下执行 `python3 build.py`来生成interface.js，这样才能在blockpy.html中通过script的方式加载interface.html中编辑好的样式。

    - **blockpy.css**

      定义了大部分interface.html中定义的标签的样式，还有最顶端条形引导栏的样式都定义在这个文件中。

    - **engine.js**

      ​这个文件调用了skulpt包的接口，用于执行已经编辑好的Python代码。

    - **printer.js**

      这个文件用于定义执行结果的样式，每一行的输出都会被定义成一个标签，然后通过append方法添加到父标签中。

    - **feedback.js**

      用于进行报错信息的输出。

    - **python_to_blockly.js**

      这个模块用于进行python代码向块语言的翻译，具体详见[./python_to_blockly.md](./python_to_blockly.md)

    - **toolbar.js**

      这个文件中定义了页面中右侧“执行”、“对照模式”、“文本模式”、“积木模式”，上方“导入数据集”、“从本地打开”、“下载到本地”、“保存到云端”、“我的作品”等按钮，按钮背后逻辑以及样式的定义分别由一个函数定义。

    - **corgis.js**

      这个文件定义了导入数据集时的逻辑，具体当点击按钮时，响应函数在toolbar.js中，然后向服务器端请求一个index.json文件，其中包含了所有的数据集的名称，然后这个文件内定义的openDialog函数按照这个json文件定义好的模块加载，生成一个浮在当前页面上的标签，同时具有load按钮，当这个按钮被点击时将对应的数据集导入到项目中，同时在editor-div中加入相应的块单元。

- ### tests

  测试涉及相关文件

- ### 根目录下其他文件

  - #### build.py

    这个文件会将interface.html打包成interface.js文件

  - #### blockpy.html

    这个文件定义了静态显示网页的样式。引用了所有可能会用到的js文件，引用顺序需要按照HTML的调用顺序来，否则会引起页面无法加载。 

