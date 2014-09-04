---
layout: post
title: "The Absolute Noob Guide To Hosting A Personal Website Or Blog On GitHub Pages - Part 3"
permalink: "noob-guide-to-hosting-cheap-website-blog-jekyll-github-pages-3"
excerpt_separator: <!--more-->
---

<!--more-->

### Working On Your Website

You have a few options at this point.

1. **Blank Jekyll website.** Roll a vanilla site and customize the pages to your heart's content.
2. **Themed Jekyll website.** While you can install themes later, it is a bit of a hassle to do so. It involves manually adding and replacing the folders that come with a basic Jekyll project, leaving your content alone. It's just a nice idea to pick a theme for now and go with it.
3. **A forked Jekyll project.** People have modified Jekyll to create their own variants. Some come with beautiful layouts and have their own themes. My Jekyll flavor of choice is [Poole](http://getpoole.com). There is also [Jekyll-Bootstrap](http://jekyllbootstrap.com), built on the Bootstrap framework.

I would suggest going with one of the forked projects. They generally come with a bunch of modifications that will make your life easier. They usually come with their own installation and modification instructions, which is great!

While you don't need to be a web design guru to make your blank website and customize it, you will certainly need some work to make it look different from other basic Jekyll websites.

#### Blank Jekyll Project

You can generate a blank Jekyll website by going to your *username*.github.io folder using `cd` and typing

{% highlight bash %}
jekyll new .
{% endhighlight %}

>Tip: The dot refers to the current folder, so the new website is created in the current folder.

This creates a bunch of files and folders inside your GitHub Pages folder. You can use `ls` to see them, or you can simply navigate to the folder in Finder, Windows Explorer or whatever file management system you use.

To see what this empty website looks like, you can use the command 

{% highlight bash %}
jekyll serve
{% endhighlight %}

![jekyll serve](/assets/jekyll-serve.png)

This will create the virtual server that I was talking about earlier. You can open a web browser and type in `localhost:4000` as the address. This will show you a blank Jekyll site that looks like this:

![New Jekyll site](/assets/new-jekyll-site.png)

Now you can dig into its folders and modify the files to personalize the website.

#### Themed Or Forked

Whether you want to choose a themed Jekyll or a modified Jekyll instance, you will need to download the Jekyll project from a website instead of using the `jekyll new` command. Just place these files inside your GitHub Pages folder.

When I downloaded Poole, I just downloaded a zipped folder of [this GitHub repo](https://github.com/poole/poole) (using the button on the right) and placed its contents inside my antrikshy.github.io folder.

### Anatomy Of A Jekyll Website

You have now set up a Jekyll website. The internals of the website may vary based on the version you download, so you should check the required documentation yourself. But I can certainly go over the bare minimum basics of a Jekyll website.

Jekyll allows you to create page layouts. This means that you can design new page layouts in the `_layouts` folder. Some forks of Jekyll may come with layouts for special pages already. Think of layouts as scaffolding for a certain type of page on your site. If you decide to create a bunch of pages that have a similar design, you can rely on a layout feature. Check out the layouts included in the `_layouts` folder to get a feel for them. You can include the same tidbit written in HTML or Markdown inside layouts, so they show in all the pages that inherit from that layout. They include variables that are explained in Jekyll's documentation.

Here are some files and folders that you should know about:

* `index.html` - contains the home page of your website
* `_layouts` - contains files which make up templates for pages, as described above
* `_posts` - this is where all your blog posts go
* `_includes` - contains files that can be included in layouts and elsewhere with the `include blah.html` variable

You can also create a `_drafts` folder to hold unpublished content, which I will describe later.

### Jekyll Tips

## Custom Domain Name

## References
