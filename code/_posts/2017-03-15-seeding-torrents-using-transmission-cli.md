---
layout: post
title: "Seeding Torrents Using Transmission CLI"
permalink: "/code/seeding-torrents-using-transmission-cli"
redirect_from: "/blog/seeding-torrents-using-transmission-cli"
description: "How to seed and download torrents completely over a Linux command line using Transmission, and optionally a Raspberry Pi"
---

I set up a Raspberry Pi 3 for some smart home projects that have been swimming around in my head lately. I figured I could put this always-on computer to some good use at the same time and contribute to torrent swarms for some Linux distros and other open source projects. I've got a no-cap Internet connection lying around doing nothing when I'm at work.

I wanted a torrent client that I could use completely on the command line, run as a daemon of some sort. I ended up using Transmission. It's a great, easy to use torrent client; unfortunately, there is a lack of decent documentation around it. This post exists as a quick and dirty overview guide for people who want to torrent entirely from the command line (using Transmission).

<!--more-->

## Installation

I'm using Raspbian, so I used apt-get to install the required packages.

{% highlight shell %}
sudo apt-get install transmission-cli transmission-daemon
{% endhighlight %}

You can use whatever package manager that comes with your Linux distro of choice of course. Just install `transmission-cli` and `transmission-daemon`.

transmission-daemon is the main torrent client, and as the name suggests, it runs in the background. transmission-cli is a collection of command line utilities for creating, analyzing and downloading torrents.

The (sort of sparse) official documentation can be found [here](https://trac.transmissionbt.com/wiki/HeadlessUsage). The rest of it can be found in the [GitHub repo's wiki](https://github.com/transmission/transmission/wiki/Configuration-Files).

## Setup

### Overview

The transmission-cli package installs a few different CLI utilities.

- **transmission-cli** - Downloads and seeds torrents on the command line, without a daemon
- **transmission-create, transmission-show, transmission-edit** - Tools for generating, reading metadata of, and editing torrent files.
- **transmission-remote** - This is transmission-daemon's best friend, and the one we want to use to monitor and operate the daemon process from the command line.

### Transmission As A Service

So, it took me a while to figure this out, but the transmission-daemon may set itself up as a service on your system. Since I didn't want to run the daemon as root and use the default system-wide directories to save my torrents to, I decided to disable the service and run it completely inside my main user account.

{% highlight shell %}
sudo systemctl stop transmission-daemon
sudo systemctl disable transmission-daemon
{% endhighlight %}

If your Linux distro uses some other service orchestrator over systemd, you will need to check if Transmission has registered itself with it.

So far, I have only found myself running the daemon manually (covered later) since I use my Pi as an always-on computer. If you find yourself shutting your computer down often, you may want to consider using it as a service and changing the settings file to your liking (also covered later). Alternatively, you can consider using Cron creatively so you don't have to start the daemon manually every time you boot your computer up.

## Usage

To run the daemon, simply run `transmission-daemon` from anywhere. Check your list of processes and you should see it.

{% highlight shell %}
ps x

    PID TTY      STAT   TIME COMMAND
  21180 ?        Ssl  110:40 transmission-daemon
{% endhighlight %}

### Settings

There are a couple of configuration files that the Transmission daemon sets up.

- **`~/.config/transmission-daemon/settings.json`** - This is probably created after you run the daemon manually for the first time. Settings in this file apply to transmission-daemon when run manually from the command line.
- **`/etc/transmission-daemon/settings.json`** - This file applies to transmission-daemon when it is run as a service.

>Note: After either settings file is changed, transmission-daemon (service or not) *must* be restarted for the new configuration to take effect.

To get an idea of the available options, take a look at the one in `/etc`. It seems to have a lot more (all) options in it, probably as an example.

While you're in there, be sure set your download location using the `"download-dir"` settings attribute.

### The CLI

To interact with the daemon, use the transmission-remote utility. According to its man page, it looks for a daemon broadcasting at `localhost:9091` by default. This is because that's the default behavior of the daemon.

>Note: If you attempt to run the daemon on different ports from the same user account using the `--port` argument, they will all read the same config and end up 'resuming' where they left off, downloading and seeding identical content.

By default, the `/etc` settings file instructs the transmission-daemon *service* to run authenticated. Some old forum discussions suggest that the default is `transmission`/`transmission`. You can go to the settings file in `/etc` and enter your own password as a string. Once the service is restarted, the password will be overwritten as a hash in the file and you should be able to use it.

If you decide you want to use the daemon (service or otherwise) authenticated, you will need to use transmission-remote as follows.

{% highlight shell %}
transmission-remote -n 'user:pass' [options]
{% endhighlight %}

To disable authentication, set `"rpc-authentication-required"` to false in your settings file.

Following are some common actions you may want to carry out. If you are running the daemon on a different host and/or port, you can pass those in before the options. See the syntax at the top of `transmission-remote --help`.

#### Adding A Torrent

{% highlight shell %}
transmission-remote -a ~/Downloads/some-torrent-file.torrent
{% endhighlight %}

{% highlight shell %}
transmission-remote -a [magnet URL]
{% endhighlight %}

You'll have to manually start the torrent after this.

#### Pausing And Resuming Torrents

Stop/pause:

{% highlight shell %}
transmission-remote -t [ID] -S
{% endhighlight %}

Start/resume:

{% highlight shell %}
transmission-remote -t [ID] -s
{% endhighlight %}

Get torrent IDs from the list displayed using the `-l` flag.

#### Checking Current Status

{% highlight shell %}
transmission-remote -l
{% endhighlight %}

#### Removing Torrents

{% highlight shell %}
transmission-remote -t [ID] -r
{% endhighlight %}

{% highlight shell %}
transmission-remote -t [ID] --remove-and-delete
{% endhighlight %}

Get torrent IDs from the list displayed using the `-l` flag.

#### Stopping Daemon

If you are running the daemon standalone, find its process ID using `ps x`, and run `kill <PID>` to kill it.

When started again, the daemon should automatically pick up where it left off using the artifacts it saves in `~/.config/transmission-daemon/`.

## Further Reading

Hopefully this post gave you a decent overview of Transmission to help you get started with the daemon and the remote CLI, and with the authentication and run-as-service options available. If I missed something crucial or if you are stuck with any setup step, let me know in the comments!

If you want a more comprehensive quick reference guide for CLI options, there is a decent one [on the Ubuntu wiki](https://help.ubuntu.com/community/TransmissionHowTo).

It is also possible to control Transmission across a network if you'd prefer. The simplest way to do so is to access your Pi's (or other server's) hostname and the transmission-daemon port in a web browser on a different computer on the same network. For instance, visit `http://server_hostname:9091` from a browser.
