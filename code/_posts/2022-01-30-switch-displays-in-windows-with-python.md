---
layout: post
title: "Switch Displays In Windows With Python"
permalink: "/code/switch-displays-in-windows-with-python"
description: "Windows comes with a command line equivalent to the Win+P shortcut, which you can call as a subprocess using Python or really any language with support for executing arbitrary commands. Very useful for everyday automations and more."
---

You can execute `displayswitch.exe` to bring up the Win+P display switcher utility from the command line. This is not a new discovery by any stretch. Some web searching tells me this utility has existed since at least Windows 7. It wasn't the easiest thing to find instructions when I wanted a solution. I figured I should write this down in the context of Python to help people searching with the keywords I was.

So if you're setting up a script for your own personal automation, or writing a utility application in Python that switches or extends users' displays, here are some code snippets to copy-paste.

<!--more-->

Pressing Win+P on your keyboard in Windows 7 and later should bring up some GUI allowing you to pick between four options. Different versions of Windows have labeled them differently.

1. Computer only / PC screen only / Internal
2. Duplicate
3. Extend
4. Projector only / Second screen only / External

The command line equivalents to these are, in the same order, the following.

1. `displayswitch.exe /internal`
2. `displayswitch.exe /duplicate`
3. `displayswitch.exe /extend`
4. `displayswitch.exe /external`

Doing this in Python doesn't require any third party dependencies. All you need to do is import `subprocess`. Here are some copy-pastable snippets.

You can make non-blocking calls with `subprocess.Popen`, meaning your program will move on to the next line while the display switcher does its job in parallel.

{% highlight python %}
import subprocess

subprocess.Popen(['displayswitch.exe', '/internal'])
subprocess.Popen(['displayswitch.exe', '/duplicate'])
subprocess.Popen(['displayswitch.exe', '/extend'])
subprocess.Popen(['displayswitch.exe', '/external'])
{% endhighlight %}

Or you can make blocking calls with `subprocess.run`, meaning your program will wait for the display switcher to finish. This is handy if you want to be sure display switching has completed before moving on, and/or want to peek into the subprocess's returned values for any reason.

This is very similar to `subprocess.call` and related functions, which `subprocess.run` supersedes in Python 3.5 and newer versions.

{% highlight python %}
import subprocess

subprocess.run(['displayswitch.exe', '/internal'])
subprocess.run(['displayswitch.exe', '/duplicate'])
subprocess.run(['displayswitch.exe', '/extend'])
subprocess.run(['displayswitch.exe', '/external'])
{% endhighlight %}

Display switching in Windows has looked different over the years. Windows 7 had a GUI element similar to the Alt+Tab one. Windows 8 and Windows 10 had a big float-in sidebar on the right. Windows 11 brings up a smaller pop-over menu in the bottom right corner of the screen.

Funny thing is that Windows 11 seems to include two separate GUIs at the time of this writing. I'm running version 21H2. Using the keyboard shortcut or running `displayswitch.exe` without a parameter brings up the smaller menu, but running `displayswitch.exe` *with* a parameter momentarily summons the big old sidebar.

> Note: These calls always bring up the display switcher UI, which may not be very presentable in a user-facing application. I don't know if there is a way to make the switch "quietly". If you find a way, let me know in the comments!

While I haven't tested them all myself, you should be able to do this in your language of choice, JavaScript in Node, Go, Rust, even a batch script.
