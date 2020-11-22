markdeep cam
==============

[demo page](https://mamewotoko.github.io/markdeep_cam/)

[demo page for smartphone](https://mamewotoko.github.io/markdeep_cam/index2.html)


Content that I want display to virtual camera of remote meeeting like webex, slack and zoom. (with [OBS-studio](https://obsproject.com/ja))

screen to display markdeep (markup language like markdown), mindmap, and svg.

![zoom demo image](image/emacs_markdeep_cam.png)

![demo image with formula](image/markdeep_cam_demo.png)

![demo image with drawing](image/drawing.png)

insert other pages with iframe

![demo image with iframe](examples/3d.png)

mindmap mode

![demo image with mindmap](examples/mindmap.png)

* The input markdeeep to right upper textarea.
    * mathjax is supported (i.e. you can write formula with latex syntax)
* A mindmap is drawn from markdeep when markdeep mode switch is disabled.
* You can draw free-hand drawing on the right board.
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

Example
-------

![](doc/markdeep_cam.png)  <video src="https://youtu.be/DnQBxVAb0Hg" markdown="0"></video>

![](doc/obs-studio.png)

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
* [svg_board](https://mamewo.ddo.jp/svg_b/note.html)
* [Bookmarklet OHP](https://mamewo.ddo.jp/bookmarklet_ohp.html)

----
Takashi Masuyama < mamewotoko@gmail.com >

https://mamewo.ddo.jp/
