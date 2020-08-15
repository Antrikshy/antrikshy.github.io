---
layout: post
title: "virtualenv - A Quick, Practical Explanation For Beginners"
permalink: "/code/virtualenv-quick-practical-explanation-beginners"
description: "A practical guide and best practices for virtualenv, the dependency isolation tool for Python developers."
---

As a budding Python dev, you must have read about virtualenv all over the place. Despite its popularity, I could not find a good, short explanation, written for beginners when I was getting started. I have figured out how it works, and now I can explain it to you.

virtualenv is so easy conceptually that I was ashamed of not understanding it earlier. When I first heard about it, I thought of it as some sort of Python module organizing tool. I thought to myself, "what about all of the packages I already have installed?" I didn't understand whether I would have to somehow organize all the stuff I had installed before using virtualenv.

Then I realized that this handy-dandy tool is something entirely different and supposed to be used *in conjunction* with globally installed packages.

<!--more-->

## What virtualenv Does

There are many detailed explanations for virtualenv, but here's my (perhaps too) simple attempt at clearing it out for any beginners.

virtualenv itself is installed globally. Then you can use it to create Python environments inside directories of your choice. When you make an environment, it creates a folder holding an instance of Python. When you 'activate' this Python environment, it runs a process inside your Terminal, which routes any Python commands to this instance of Python. This includes any package installations you make and scripts you run.

Simply put, it treats this folder as the global Python installation.

## The Ideal Setup

Ideally, you should install the packages you `import` from several of your projects globally using `pip install` or `easy_install`. After all, you'll add these as dependencies anyway, so you don't need to keep it all in your project directory, like Node.js modules (Node.js is actually what sparked my realization of what virtualenv is).

However, when you

1. want to install something for a very specific project, *or* 
2. if you need a specific, older version of a package for a one-off project, 

you should consider using virtualenv to keep these in your project's folder.

>Note: Some people like to create virtualenv environments for all of their projects, installing all required packages in it. This is also a good way to keep things separate and self-contained, similar to the typical Node.js development setup.

### Using virtualenv

When you make a virtualenv environment, it is not accessible by anything unless you activate it. Thus, any tinkerings you do to the Python installation and anything you install 'globally' is simply out of scope after you deactivate this environment.

Say you have the latest Django installed globally. But you want to work on a project that specifically requires the old Django 1.6. Here's what you do, assuming you have already installed virtualenv in your global Python environment using `pip install virtualenv`:

1. Create a directory in the location of your choice. All your project code goes inside a subdirectory of this one. You could put your code here, and just .gitignore the environment folder to keep it out of your Git commits.
2. In the freshly created directory, type `virtualenv env`. You can replace `env` with any name of your choice, like `virtualenv myCoolDjango16Projectlol`. This will create a folder with the specified name.
3. Use `source env/bin/activate`, replacing `env` with whatever name you chose for your environment. On Windows systems just use `env\Scripts\activate`.
4. Install Django 1.6 or whatever older package(s) you need as usual. Assume you do not have any global packages installed (because your `env` or `myCoolDjango16Projectlol` directory is temporarily your global Python environment). Your existing release installations of Django and other packages will remain untouched and usable in any other projects.
6. Simply type `deactivate` or exit/logout from your command line to close the environment.

Whenever you are ready to work on this project, repeat step 3 to activate the environment. You can delete the virtualenv folder as usual, create it again and reinstall anything as you wish.

For more advanced help, check out the [official documentation](http://virtualenv.readthedocs.org/en/latest/index.html).
