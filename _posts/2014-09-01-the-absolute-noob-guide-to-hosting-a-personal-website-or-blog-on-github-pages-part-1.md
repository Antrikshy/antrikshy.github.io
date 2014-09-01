---
layout: post
title: "The Absolute Noob Guide To Hosting A Personal Website Or Blog On GitHub Pages - Part 1"
permalink: "noob-guide-to-hosting-cheap-website-blog-jekyll-github-pages-1"
excerpt_separator: <!--more-->
---

So you have made a decision. You want a personal webpage. You want to look professional by including a link in your email signature, with your job application or on your resume. It can be a convenient place to showcase any work you have done. Or it can just function as a hub for downloads or links to your portfolios on other websites like 500px, GitHub, deviantART, Behance etc.

Or maybe you have decided to go with a self-hosted personal blog. Instead of buying a domain name through WordPress.com or Blogger, you want more freedom in case you wish to migrate or change services later down the road.

Maybe you want both.

<!--more-->

If all you have is this decision, building a website can seem like a daunting task. How much will it cost? Will I have to pay professional designers to get it right? Isn't web hosting expensive? There are so many hosting services. Which one should I pick!?

Let me get you straight. You can set your own personal website up without coding or web design skills for cheap or free. While I will explore several options in this post, I will also tell you how get your site up and running, with a custom domain (like www.yourname.com) for **around US$10 a year**. If you are okay with a simple, elegant design (it's all the rage these days), it's even easier. **You can also have a personal blog inside it if you want.**

In this two-part series, I will teach you how to set up a basic website using [Jekyll](http://jekyllrb.com), a blog-ready, static website framework that works really well with [GitHub Pages](http://pages.github.com), our host of choice.

If you have the skills to design a website on your own, you can still use this guide to learn how to host it on GitHub Pages for free and even link it with a custom domain.

* Yes, you can use a custom website address (www.yourname.com) with GitHub Pages.
* Yes, you can link a subdomain (blog.yourname.com) from an existing website (www.yourname.com) with GitHub Pages seamlessly.
* No, you cannot use GitHub pages to host webapps that require computation in the cloud.
* No, you **cannot host a WordPress blog** on GitHub Pages, since it is a webapp.
* You can only host static websites on GitHub Pages. No dynamic content, like traditional blog engines go on Pages. **This does not mean that you cannot blog on GitHub Pages.** This blog, powered by Jekyll, is hosted on GitHub Pages. I will cover the details in a later section.

### Who these posts are for

* I have tried my very best to make this guide easy to follow for everybody, Git-whiz programmers or not.
* This post is not for you if you want to make a webapp or host a WordPress blog. Jekyll is a nice WordPress alternative that won't cost you hosting fees.
* This guide is mainly focused on those who want to make a website about themselves and/or a personal blog.

>Note: If you want to use Jekyll, keep in mind that as the time of this writing, it is not officially supported on Windows. While [it is possible](http://jekyllrb.com/docs/windows/) to get it working, this guide is written with Unix systems like Mac and Linux in mind. I have not used Jekyll on Windows, but I am guessing that the Terminal commands are similar to the ones used in this guide.

## GitHub Basics

You can skip over this section if you are familiar with GitHub and GitHub Pages.

### What is GitHub?

In case you are not familiar with GitHub, think of it as a place where programmers share the guts of their software so that others can refer to it or expand on it. This code is stored in a project's 'repository' (read: folder). Your GitHub Pages website will live in a GitHub repository. You can now skip to the next section.

If that does not satiate your curiosity, here's a longer explanation... Git is a revision control program used by programmers. When writing code, Git is used to save snapshots of stable versions of a project to roll back to in case something goes haywire. Think of it as video game saves. Git also offers other features, like branching and collaboration. GitHub is a website where programmers can upload their Git 'repositories' (they are like directories containing all the snapshots) so others can refer to, collaborate, fork and expand on code. GitHub also allows private repositories, issue tracking, releases and whatnot.

Non-programmers can also use Git and GitHub if they wish, saving revisions of Photoshop projects, 3D models etc. and uploading them to the web.

### How GitHub Pages Works

GitHub Pages is a service offered by GitHub, which allows users to host webpages to showcase GitHub projects with documentation, marketing material and other information. But with an account, you are entitled to *also* create one website for yourself. This website can be a single page or several pages, can contain an optional blog and so on.

The second option is the one we shall use.

**Benefits of using GitHub Pages:**

* Effectively unlimited storage space
* No need to maintain your own server
* GitHub manages traffic and bandwidth
* Update websites with simple commits (see 'Using GitHub')
* Website is hosted for free with a *username*.github.io address, with support for custom domain names

## Creating And Maintaining A Website With GitHub

There are tons of guides on the Internet covering the nitty-gritties of Git and GitHub, so I won't cover every detail. I will give you a simple overview of how *you* will use GitHub to operate and maintain your website.

**Create a GitHub account.** Use a sensible username. This username will decide your free website address. Unless you decide to buy a custom domain name and link it up with this GitHub Pages website, you will be stuck with *username*.github.io for the address. Besides, you can also use this account for any projects that you may work on in the future. 

>Tip: You should download the GitHub app for your platform ([Mac](https://mac.github.com)/[Windows](https://windows.github.com)) if you are not comfortable with the command line.

GitHub accounts contain repositories. Basically, these are folders that contain snapshots of all the previous versions of their contents that have been 'committed' to them. When synced, these reflect a folder on your computer. The GitHub app will help you **create a folder named *username*.github.io**, where *username* is your GitHub username. Choose a nice location for it, as Git may get confused if you move it around. The name of this repository is special. When uploaded to GitHub, it is automatically recognized as a user website. **I will tell you what to put in this folder later.**

**Whenever you have changes** you want to publish, type in a description of the changes you made and **hit the 'commit' button**. These changes can be new blog posts, changes in your resume, updated links, design updates or whatver. You can make multiple commits before before you are ready to publish. It will all be 'pushed' (uploaded) as one change. In the GitHub app, 'push' may be referred to as 'sync'. When you click it, your GitHub repo will reflect the folder you made using the GitHub app. If you have not initially published your repository on the website, a 'publish' button will appear in its place. At the time of writing, the sync/publish button is in the top-right corner of the GitHub app's window.

>Tip: The commit functionality is hidden. The folder only looks like its latest version. You can work on it as usual. There is actually a hidden folder with all the snapshots, which the GitHub app uses to keep track of stuff, but you don't need to think about that.

---

Now you understand how GitHub and GitHub Pages work. In [Part 2](http://blog.antrikshy.com/noob-guide-to-hosting-cheap-website-blog-jekyll-github-pages-2), you will make some choices about how you want to set your website up.
