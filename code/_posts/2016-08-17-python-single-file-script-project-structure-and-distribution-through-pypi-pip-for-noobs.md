---
layout: post
title: "Python Single-File Script Project Structure And Distribution Through PyPI/pip For Noobs"
permalink: "/code/publish-python-single-file-script-project-structure-pypi-pip-noobs-beginners"
redirect_from: "/blog/publish-python-single-file-script-project-structure-pypi-pip-noobs-beginners"
description: "Some tips, best practices and project directory structure for small Python projects, and guidance on distribution through the new PyPI repository."
---

Python may be known for its ease of use, but making my pet projects available through the simple `pip install petprojectinator` command has been a whole different experience. The Python Package Index (PyPI) feels like an antiquated repo with longwinded documentation for developers who want to contribute.

This hasn't changed all *that* much, but lately, a new [pypi.io](http://pypi.io) site has been in development, and with it, some of the barriers to entry has been removed from the upload process.

This post is intended to be a quick guide for organizing a tiny Python project (not much more than one script) for distribution via PyPI/pip and the *new*, simpler upload process.

<!--more-->

## setup.py

As you may have seen in countless guides and tutorials, your project needs a `setup.py` file to be submitted to PyPI.

> Note: This is not a PyPI specific thing; the file can be used on its own to directly install your package.

You can look up examples for how to populate it. It consists of a `setup` function into which you pass various arguments describing your project. The fields that I will focus on are `scripts`, `py_modules` and `packages`.

- The `scripts` argument sets the commands your users will be able to run after installing this package.
- The `py_modules` argument lists non-script modules (basically Python files) that you want to include.
- The `packages` argument lists packages (basically Python files in folders) that you want to include.

## Keep It Simple

You're probably reading this article because you have **one small Python script that you want to distribute**. Let's name it `avocado.py`.

Other guides may explain to you the difference between Python modules and packages, and how you should have all these folders with `__init__.py` files and a `bin` folder with your scripts.

Forget all that. We're going to keep this simple.

### Executable Script

You want to be sure that your users will be able to invoke it from anywhere without typing the `python` at the beginning or the `.py` at the end. The `scripts` field in `setup.py` comes into play here.

While development, you may have run your script using

{% highlight shell %}

python avocado.py

{% endhighlight %}

Clearly, this won't cut it in production. And no, the `name` argument in `setup` does not determine what users will need to type. The simplest approach to fix this is to

1. rename your file to drop the `.py`, and
2. add a shebang line at the top of the file, which says

{% highlight python %}

#! /usr/bin/env python

{% endhighlight %}

At this point, if you run

{% highlight shell %}

chmod +x avocado
./avocado

{% endhighlight %}

you will notice that the Python script is an executable script.

However, this may seem like an unclean solution. To me, it feels weird and wrong to strip the `.py` from my one and only script. This brings me to my preferred solution, the

### Entry-Point Script

FYI, I just coined the term "Entry-Point Script".

As programmers, we want to keep things modular. So let's separate the script that invokes your program separate from the main functionality altogether. This way, if you later want to change the command needed to invoke your program, you can do that by modifying this (graphene-thin) layer of abstraction.

1. Leave your `avocado.py` file as-is. In fact, maybe name it `cli.py`, `main.py`, or anything else that makes more sense in your project.
2. Make a new file called `avocado`.
3. In this new file, enter exactly the following.

{% highlight python %}

#! /usr/bin/env python
import main  # or whatever else you called your script

{% endhighlight %}

The above, once `chmod +x`-ed, will execute your `main.py` or equivalent directly, no matter what you rename it to.

This may sound like a silly thing to do for a single-script program, but it's very versatile. Say you have more than one file. You can use this one file to point your program to the actual CLI handler. Or if your project is sufficiently large, you can simply put all of your CLI code into a file like this.

### Packaging Slightly Larger Project

If you have more than one script in your project, say a couple of modules to handle API requests, classes etc., don't be afraid of putting them in a package (call it `avocado` or `src`). Just shove them into a folder and add an `__init__.py` file. Feel free to keep this file empty if your project does not warrant anything.

You can include your `main.py` in this package. Now, you can have this in your entry-point script.

{% highlight python %}

#! /usr/bin/env python
from avocado import main

{% endhighlight %}

## To Summarize - Directory Structure

If you have one script named `avocado.py`, do this:

    ../avocado-project/             # unimportant
        |
        |-- avocado                 # entry-point script; see above
        |-- main.py                 # or cli.py; everything else
        |-- setup.py

In `setup.py`, be sure to

1. list `avocado` under `scripts`
2. list `main.py` as a `py_module` to include it in installation

If you have more files, do this:

    ../avocado-project/             # unimportant
        |
        |-- avocado                 # entry-point script; see above
        |-- avocado/
                |
                |-- __init__.py     # empty
                |-- main.py         # or cli.py
                |-- api_wrapper.py  # other files
        |-- setup.py

In `setup.py`, be sure to

1. list `avocado` under `scripts`
2. list `avocado` as a `package` to include it in installation

For better style, you can also put the entry-point script into a `bin` directory, where you can also package any other scripts that you may want to include.

    ../avocado-project/             # unimportant
        |
        |-- bin/
                |
                |-- avocado         # entry-point script; see above
        |-- avocado/
                |
                |-- __init__.py     # empty
                |-- main.py         # or cli.py
                |-- api_wrapper.py  # other files
        |-- setup.py

In `setup.py`, be sure to

1. list `bin/avocado` under `scripts`
2. list `avocado` as a `package` to include it in installation

> Note: The entry-point script may not be able to include the `avocado` package from within the `bin` folder unless you mark `avocado` as a package and install the program. You can run setup in [development mode](https://pip.pypa.io/en/stable/reference/pip_install/#editable-installs) to test.

## Upload To PyPI

Probably the majority of articles on the web at the time of this writing will walk you through a nasty project registration process in order to push it to the PyPI repository.

However, this registration process is no longer required. All the required info is contained in the `setup.py` file already, and all you need to do is create a PyPI account and upload your builds.

For this, it's best to twine, which provides a simple, secure upload process.

> Tip: You can try using pip's upload feature (without registration). I haven't tried it lately, but I'm not sure if it will work without registration (it should).

Since this is supposed to be a noobs' guide, I'll skip over the details. Simply run the following in your project's directory.

{% highlight shell %}

python setup.py sdist bdist_wheel
pip install twine
twine upload dist/*

{% endhighlight %}

Assuming everything was set up correctly, your project should now show up under your account pn [pypi.io](http://pypi.io), and should be installable using `pip install` and whatever name you set in `setup.py`. When installed, it should be accessible to your users from any directory by invoking files you named as `scripts`.

## Example Project

If you want to look at a real tiny project to wrap your head around all this, check out [ignr.py](https://github.com/Antrikshy/ignr.py).

## Your Thoughts

The above directory structures are just my preferences. There are dozens of ways to organize small Python projects. If you find issues with my approaches, please share in the comments or on Twitter.
