---
layout: post
title: "The Absolute Noob Guide To Hosting A Personal Website Or Blog On GitHub Pages - Part 2"
permalink: "noob-guide-to-hosting-cheap-website-blog-jekyll-github-pages-2"
excerpt_separator: <!--more-->
---

In [Part 1](http://blog.antrikshy.com/noob-guide-to-hosting-cheap-website-blog-jekyll-github-pages-1), I explained the basics of setting up a GitHub repository for your GitHub Pages website. So far, you should have:

1. Understood how GitHub works.
2. Created a GitHub account with a nice username choice, especially if you're want to use their free *username*.github.io address.
3. Created a Git repository named *username*.github.io somewhere on your computer using the GitHub app. GitHub will recognize this as a user website.

Now to decide what kind of website you want to set up.

<!--more-->

### Markdown

Before we get started, it will be a good idea to learn some Markdown. It is a versatile format used to describe richly formatted documents. It is easy-to-read and easy-to-write. This post is written in Markdown. I can easily write **bold** text, *italicized* text, headers, and other rich formatting in *any* text editor with easy-to-remember symbols. For instance, `**bold**` results in **bold** and `*italics*` results in *italics* Markdown is interpreted by Jekyll and GitHub Pages' Webpage Generator and also by many online services. Different websites and different Jekyll themes will format your Markdown with their own styles and colors. It's really cool.

In fact, you may already be familiar with Markdown. If you know how to format text for [reddit](http://www.reddit.com) comments and self posts, you know Markdown. If you are familiar with [Stack Overflow](http://www.stackoverflow.com) and how to format text for its questions, answers and comments, you know Markdown.

You can get a full rundown on what Markdown has to offer [on this website](http://daringfireball.net/projects/markdown/syntax).

## Static Websites

Technically, GitHub Pages only hosts static websites. A static website is simply written in non-changing web languages, as opposed to a blog or a complex web application like Twitter, both of which have servers working in the background that compute the actively changing webpages. This requires computational power in the background.

WordPress is actually a web application that runs on a server. It is an entire program that allows admins to easily add content and developers to make plugins. Whenever you visit a WordPress blog, it needs to compute the latest post and whatnot in order to display it to you. Hence, it is slow.

Jekyll, on the other hand, is a fresh alternative. It is a static website builder that is also blog-aware. Meaning, it interprets new blog posts when they are published and generates a static website from it. Thus, it is very efficient and can be hosted on GitHub.

### GitHub Webpage Generator

This might be the simplest way to get a spectacular website up and running. Go with this option if you want one quick page of information.

GitHub has a built-in webpage generator for quick websites, which allows you to roll a single page website with just a few clicks. Then you can download the code and customize it yourself. I have not used this feature myself, so I cannot speak much about its customizability, but it looks easy enough to create.

For this, there should be a *username*.github.io repo set up in your GitHub account on the website. This can be accomplished in two ways:

1. Publish the empty folder that you created in Part 1.
2. If you haven't created a folder already, create a new repo on the GitHub website, named with the *username*.github.io format.

Once you have that repo showing in your account, go to its settings page. It's in the sidebar on the right. In here, you show see a button labelled 'Automatic page generator' under GitHub Pages. Click it. Now you can write the content for your page in Markdown. 

![GitHub generated site editor](/assets/github-page-generator-edit.png)

You can also choose to leave the sample text as it is and go to the next step. This way, you can preview themes now and write content later. Once you have chosen a layout, you can hit 'Publish page'.

If you had not created the folder on your computer in Part 1, you don't need to do so at this point. If you had, you can go ahead and delete it. To edit the contents of your newly generated website, visit your GitHub repo's page on the website, find the file that holds the Markdown content and edit it using the web editor.

### Custom Static Websites

If you have the skills to make your own website, you can certainly do so. Just put the website files (HTML, CSS, JavaScript) inside the folder you created. GitHub looks for an `index.html` file in the root directory automatically. Publish the repo using the GitHub app and the website should show up at *username*.github.io very soon.

>Tip: As a side note, if you are inexperienced and just getting started building websites, look into frontend UI frameworks. Perhaps after working on some small projects to get a feel for HTML and CSS on your own, consider building your first website using a framework like [Bootstrap](http://getbootstrap.com), [Semantic UI](http://semantic-ui.com) or [Foundation](http://foundation.zurb.com). These allow you to use their HTML classes to create very well organized web pages without any hassle and misplaced divs. The best part is that these allow you to create responsive websites that automagically scale to all sorts of screen sizes. They almost never break if you follow their guidelines.

## Static, Blog Or Both With Jekyll

And now, for the platform of my choice. Out of all the options I am going over, this is the most flexible. With Jekyll, you can do a lot. If you understand how its variables work, you can probably make it look however you like. Jekyll's website has some [great documentation](http://jekyllrb.com/docs/home). Apart from this, there are lots of customizations and themes available online. Here is a comprehensive [list of websites using Jekyll](https://github.com/jekyll/jekyll/wiki/Sites). In the context of this post, it's easy to build the following with Jekyll:

1. Static, single-page websites (although you can use the GitHub Webpage Generator for that)
2. Static, multi-page websites (I'm not sure if the generator does these)
3. Blogs with or without one of the other two.

Jekyll is an engine that generates a static HTML website from a set of files and folders. This means that your pages and posts go into folders that Jekyll creates. Then you can tell Jekyll to generate a new snapshot of your website whenever you have updated them and are ready to publish.

>Note: While I think Jekyll is very easy to use, it *may* not be everyone. If you host a WordPress blog, you get what you pay for. It's a more foolproof option as far as usability goes. Jekyll is *slightly* harder to use, but you also get more flexibility with it.

Ordinarily, Jekyll requires a website folder with the data. When it is told to generate a new snapshot, it creates a `_site` folder with the contents of the website. The user uploads this to a server and the website is ready. With GitHub Pages, you don't need to do so. The website folder is synced with GitHub, which does all of the work of generating and publishing the site.

First, let's set up Jekyll on your computer.

### Setting Your Computer Up For Jekyll

>Note: As I mentioned before, Jekyll is not officially supported on Windows, although it works. I cannot guarantee if my guide will work for Windows, although they should be the same.

As you make changes to your website, whether you're changing its design or drafting a new blog post, you will be testing it out in a virtual server on your computer. This means your computer will host the website on *to itself*, so you can test what it looks like in your web browser. With the right settings, you can also test it out on other devices on your home network. Once you are ready, you will push (sync) the changes to GitHub.

>Note: You will need to use the command line (called Command Prompt on Windows and Terminal on most Linux distros and OS X) a bit. It will help to know how to get around it. [This](http://www.dummies.com/how-to/content/how-to-use-basic-unix-commands-to-work-in-terminal.html) is a nice cheatsheet. Just know that you can change what folder you are working in with `cd /path/to/folder/goes/here`. In this tutorial, you will mostly use `cd` and the `jekyll` command, which I will describe in detail.

To get started, install Jekyll. There is documentation on how to do this [on the website](http://jekyllrb.com/docs/installation/). On my Mac I was able to install everything with 

{% highlight bash %}
gem install jekyll
{% endhighlight %}

Now you can use the `jekyll` command in your command prompt to make Jekyll do stuff for you.

---

In part 3, I will show you how layouts, pages and posts work in Jekyll.

