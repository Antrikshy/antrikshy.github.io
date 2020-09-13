---
layout: post
title: "Jekyll Blogging From Any Computer On Your Network With A Raspberry Pi"
permalink: "/code/jekyll-blogging-any-computer-on-network-raspberry-pi"
description: "I renovated my Jekyll site to support preview-over-LAN for personal convenience. Now I can see the site and write blog posts from any computer over my network. Here's how."
---

As any Jekyll site owner would know, my workflow for writing these blog posts involves... friction.

1. Open the site project in a text editor.
2. Open command line window, navigate to the project location.
3. Run the `jekyll` command to serve up a local preview of the site.
4. Preview the site in a web browser while working on it.

Steps 2-4, of course, are somewhat optional; they are only required if you want to actively look at your changes as you make them.

I know these steps cannot be entirely eliminated without also foregoing the other benefits of Jekyll as a platform, but I also wanted to streamline the process as much as possible.

My updated workflow not only eliminates steps 2 and 3 from every writing session, but also comes with some nifty bonus features, like the ability to preview the site on my phone over LAN.

<!--more-->

And unless you have a particularly unusual Jekyll project, the setup is pretty straightforward.

> Note: A Raspberry Pi isn't *required* for this project. The instructions should apply just the same to any server on your network running a Linux or Unix-like operating system.

This post assumes three things:

1. You already have a Jekyll project that can be served locally.
2. You run a Raspberry Pi (or other Linux server) continuously in the background. This one isn't *required*, but having to boot up your server every time you want to work on your site seems counter-productive.
3. Your Raspberry Pi (or other Linux server) has all the necessary packages and Ruby gems required to run your site on it.

Running the Jekyll CLI and serving an existing project on Raspbian should not require any special instructions. If you haven't already, go ahead and complete item 3 now. Installing Ruby, Jekyll and gems can take a while if you have an older Raspberry Pi, so please be patient.

> Warning: While the slow initial setup is a first-time thing, it *is* an indicator of how slow your site will rebuild on changes. I have only tried this on a Raspberry Pi 3 Model B. My site currently takes 10-15 seconds to build each change. It's good enough for blogging, not as much for working on other aspects of the site requiring quick previews.

## Project Setup

First, we'll focus on two things - adding or updating a couple of Jekyll configuration settings, and ensuring that the site content is "compatible" with the nature of our setup.

### Jekyll Configuration Options

Set the `host` configuration setting to `0.0.0.0`. You can achieve this by either adding the line

{% highlight yaml %}
host: 0.0.0.0
{% endhighlight %}

to your \_config.yml, or passing `--host 0.0.0.0` as an argument to the `jekyll serve` command.

This is the one *required* Jekyll option to make it broadcast your site on the local network when served.

Depending on how you choose to run the server on your Raspberry Pi (covered in a later section), it may be easier to just put it in the config file and forget about it.

Of course, if you are aware of something else on your Raspberry Pi that likes to use the default 4000 port, you can override that value in the same way - using the `port` option in \_config.yml or the `--port` command line argument.

At this point, I recommend running the 

{% highlight shell %}
jekyll serve --watch
{% endhighlight %}

command as you normally do for your project (with your favorite arguments), on your Pi. For now, you may do this directly on the Raspberry Pi or via SSH from a different device. It doesn't matter.

Visit the site by pasting the Pi's IP address, followed by :4000 (or other port number) into a browser on a *different* device on your network to see if things work. You'll need this preview for the next step.

### Content Compatibility

This step is open-ended, and really depends on the content of your site.

Start by visiting the page from a different device as I recommended earlier. Chances are, two things will be broken across your site at this point.

1. Any static files, such as images, scripts and stylesheets won't load up.
2. Some intra-site links could be dead.

Inspecting the build output (directly or in browser dev tools) should reveal that links constructed using Jekyll variables may have been replaced with "0.0.0.0:\<port>". Such links point back to the computer running the web browser, instead of the Raspberry Pi, so they won't work.

When I conducted this migration on my site, I had to change two things, covered below.

#### Clean Up `{% raw %}{{site.url}}{% endraw %}`

Remove all instances of `{% raw %}{{site.url}}{% endraw %}` from links. Here's an excerpt from Jekyll's documentation describing the [behavior of this variable](https://jekyllrb.com/docs/variables/#site-variables) at the time of writing:

> Contains the url of your site as it is configured in the `\_config.yml`. For example, if you have `url: http://mysite.com` in your configuration file, then it will be accessible in Liquid as `site.url`. For the development environment there is an exception, if you are running `jekyll serve` in a development environment `site.url` will be set to the value of `host`, `port`, and SSL-related options. This defaults to `url: http://localhost:4000`.

In my case, most, if not all cases of this variable were easily removed without detriment. All instances of it seemed to be base URL placeholders that probably came with the site theme that I forked off, such as

{% highlight html %}
{% raw %}
<script src="{{ site.url }}/public/js/scripts.js"></script>
{% endraw %}
{% endhighlight %}

That URL, switched to `src="/public/js/scripts.js"`, works the same in development and production, *and* should work over LAN.

Hopefully, your static files, like CSS, return after these changes.

#### Miscellaneous Changes

The rest depends on other Jekyll variables and features that you may have used across your own project. Try to navigate to all the different templates and pages on your site, checking for lapses that would be unacceptable in a preview.

If you have a large site, this may be tedious. You could try your hand at some clever find-and-replace operations using text manipulation tools.

Once again, it's not important to fix every corner of the site, as forgetting to make any changes won't affect the production build.

If you find any unexpected instances of components failing at this point, post details in the comments below and I can try to assist!

## The Server

So far, you may have been running the Jekyll server directly in your Raspberry Pi's command line. Now it's time to take the training wheels off.

There are other ways to run background processes on Linux, but I have two recommendations.

With either of these in place, you should be able to access your preview server by navigating to your Pi's IP address, followed by `:<port>` (4000 by default). For convenience, I have set up Bonjour access on my Pi, but that's a different topic. [Here's a tutorial](https://www.howtogeek.com/167190/how-and-why-to-assign-the-.local-domain-to-your-raspberry-pi/) for that.

### Quick And Dirty - `screen`

I frequently run background processes for projects that I am actively working on. In my workflow, I consider my local Jekyll server such a project. I don't mind tinkering with if it gets interrupted for any reason.

So personally, I just run it in a `screen` session. A *very* brief overview of the tool follows. Here's a [longer getting started guide](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-screen-on-an-ubuntu-cloud-server) that goes into more detail.

> Tip: Some people prefer `tmux` as an alternative to `screen`. Here's [a primer](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-tmux-on-ubuntu-12-10--2) on that.

1. Run `screen` in your Pi's command line. Dismiss the splash screen if one appears.
2. In the virtual terminal that appears, navigate to your Jekyll project's location and run your server.
3. Optionally, name this screen session something to identify it later. Do this by pressing Ctrl + A (nothing should happen), then typing `:<your-session-name-here>`. Call it something like "jekyll-server".
4. Press Ctrl + A (nothing should happen), then press D (separately) to detach from this session. You may exit the command line window or disconnect from your SSH session without interrupting your server.
5. Use `screen -l` to list all running sessions and `screen -r` to reconnect to your detached session. If you have more than one session running, you'll need to identify the session using its ID or name from the list (or any prefix of either), like `screen -r jekyll-server` or `screen -r j`. On reconnecting, you should see your `jekyll serve` command running the way you left it, with any output captured in the background.

> Tip: For those unaware, Jekyll offers a `--live` argument, which auto refreshes the site in your browser on changes, which is super nifty. Personally, I use `--watch --incremental --live --drafts`, or `-wIlD`.

I call this setup quick and dirty because it's ephemeral. System reboots will shut down all sessions, just like any other terminal sessions.

### A More Resilient Option - `systemd`

Many Linux systems, including Raspbian, come with `systemd` pre-installed. It's a powerful tool for running background processes, including automatic startup on system boots.

It may be more work to set up your preview server as a system service the first time, but if configured properly, it can be a true set-and-forget solution across reboots, including handy commands to stop, start or restart the process.

I have not set this up for a Jekyll session myself, so I do not have the required configurations handy, but here's a [very concise guide](https://www.raspberrypi.org/documentation/linux/usage/systemd.md) for getting started with that.

## The Workflow

I run my server using the `screen` tool. I almost never shut my Raspberry Pi down. I use it for other things, like [booting up my gaming PC using Alexa](/code/powering-on-my-desktop-pc-using-alexa-and-a-raspberry-pi).

So all I need to do in order to work on my blog is open up a web browser, point it to the preview server, and edit the project on the Raspberry Pi.

"How do I edit the project files," you ask? There are numerous ways.

### File Sharing

You can use built in tools in Windows, macOS and Linux distros to log into the Raspberry Pi and access its files. However, you may need to set up the Pi to share its files and directories first, using a package like Samba, which implements a protocol called CIFS to share files. Here's [some documentation](https://www.raspberrypi.org/documentation/remote-access/samba.md) to get started, courtesy of the Raspberry Pi Foundation. [This may](https://ubuntu.com/tutorials/install-and-configure-samba) also be a helpful resource.

I use this method, and am able to use local installations of Sublime Text on my Mac and Windows PCs to "live" edit files remotely.

### SFTP

If you already have functional SSH to your Raspberry Pi, you should be able to access files over the SFTP protocol without much initial setup on the Pi side. You *will* need to set up some access method in your client machines, however. Here are [some recommendations](https://www.raspberrypi.org/documentation/remote-access/ssh/sftp.md) from the Raspberry Pi Foundation.

There may also be an SFTP client available for the text editor of your choice. Here are ones for [Sublime Text](https://packagecontrol.io/packages/SFTP), [Atom](https://atom.io/packages/remote-ftp), and [VS Code](https://marketplace.visualstudio.com/items?itemName=suntobright.vscode-sftp).

### SSHFS

This is yet another protocol for serving files from a server over the SSH protocol. I have not tried this with Raspbian myself, but have used it very successfully between a Linux server and my work Mac for years. Here's the [official documentation](https://www.raspberrypi.org/documentation/remote-access/ssh/sshfs.md) for that.

## Reference Material

Here's [the commit](https://github.com/Antrikshy/antrikshy.github.io/commit/ffc3bc3886e34f75bb60f53ce0a1900321fb7af4) containing the changes I made to this very site to preview it over LAN. It's not the cleanest commit to use as an example here, as it also contains some other stuff. I thought I'd include it nevertheless, in case it helps anybody out.

Also check out Jekyll's documentation pages on [Configuration Options](https://jekyllrb.com/docs/configuration/options/) and [Variables](https://jekyllrb.com/docs/variables/#site-variables).
