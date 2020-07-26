markdeep cam
==============

[demo page](https://mamewotoko.github.io/markdeep_cam/)

Content that I want display to virtual camera of remote meeeting like webex, slack and zoom. (with [OBS-studio](https://obsproject.com/ja))

screen to display markdeep (markup language like markdown), mindmap, and svg.

![demo image](image/demo_ace.png)


* The input markdeeep to right upper textarea.
    * mathjax is supported (i.e. you can write formula with latex syntax)
* A mindmap is drawn from markdeep when markdeep mode switch is disabled.
* You can draw feee hand drawing on the right board. 
    * Shift-F toggles svg mode (mouse event is delivered to text behind svg)

Build
-----

### setup

```
sh setup.sh
```

### compile js (browserify)

```
sh build.sh
```

License
-------

    Copyright (c) 2020 Takashi Masuyama. All rights reserved.

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.


Reference
----------

* [markdeep](https://casual-effects.com/markdeep/)
* [dundalek/markmap](https://github.com/dundalek/markmap)
* [svg_board](https://casual-effects.com/markdeep/)
* [Bookmarklet OHP](https://mamewo.ddo.jp/bookmarklet_ohp.html)

----
Takashi Masuyama < mamewotoko@gmail.com >  

https://mamewo.ddo.jp/
