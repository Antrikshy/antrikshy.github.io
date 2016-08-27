---
layout: post
title: "Make Your Raspberry Pi Accessible Over The Web - An Arch Linux Guide"
permalink: "/blog/make-raspberry-pi-accessible-over-web-arch-linux"
description: "An extensive tutorial on making a Raspberry Pi behind a home network available over SSH from anywhere on the Internet using FreeDNS, static IP addressing and port forwarding."
---

After struggling to find a good use for my Raspberry Pi for years, I finally decided to get into hardware projects. I figured I'd set up a fresh installation of Arch Linux on it to learn that as well. Two birds, one stone.

My first goal was to hook up a DHT22 temperature and humidity sensor, connect it to the Pi and somehow make its data accessible over the web. This guide will walk you through that second part.

You don't *have* to be setting up any hardware to follow this guide. Even if you just want to be able to SSH into your Pi from anywhere consistently and reliably, this guide is exactly what you are looking for. None of this is *really* specific to the Pi. You can follow it to set up *any* computer running Linux.

<!--more-->

>Note: I'm still new to all of this, so please don't blame me for any security nightmares that you may run into. Currently, I have not hooked up any devices containing sensitive personal data to this setup. In fact, I'd appreciate if you pointed out any risky mistakes that I may have made. Please use this tutorial to set up any critical-availability system at your own risk.

## Overview

For this, I expect you to have a Raspberry Pi (or other computer) with Arch Linux installed. You can use another Linux distro, but this article was written with Arch Linux in mind and various defaults may vary. Make sure you have a basics (like [sudo](https://www.archlinux.org/packages/core/i686/sudo/), [cronie](https://www.archlinux.org/packages/core/i686/cronie/)) installed, a non-root user account set up etc. Unfortunately, I will not be going into those details here.

You will also need access to your router's settings. Specifically port forwarding, not much else. You will *not* have to work with your ISP to set up any of this.

I also assume prior experience working with Unix, so you can do basic troubleshooting when necessary.

I personally use my Pi over SSH exclusively (over LAN), but everything works the same with a keyboard/mouse plugged in.

**Here's how our setup will work...**

**Problem 1:** To make a computer accessible from the Internet, it needs a static address. By default, the IP address assigned to your home can and does change over time.

**Problem 2:** Even if you do set your IP address to remain static, it may be difficult to remember. It would be convenient to have a standard web address associated with your Pi.

**Problem 3a:** Your router probably blocks certain ports to your Raspberry Pi that need to be opened up to gain access to it (ex: port 22 is default for SSH access).

**Problem 3b:** Your router probably also assigns local IP addresses inconsistently every time your devices connect to the network. One day your Pi may be located (within your network) at 192.168.0.18 and the next day, it may be at 192.168.0.14 instead.

**Solutions:**  
The dynamic IP problem is an easy one to solve. We won't even have to mess with router settings extensively or change how other devices work on your network. All we need to do is to set your Pi to *ask* for a static *local* IP address from your router. Then we need to point a (free) DNS service to your home router's address.

For this tutorial, I will use [Free DNS](http://freedns.afraid.org), which is a great service that will give you a free, easy-to-remember URL for your Pi. How do we make sure Free DNS knows how to find your router over the web? Well, Free DNS will provide us with a little cron script to keep it updated.

Finally, we'll have to ask the router to forward various ports to the Pi.

## Static LAN IP

Let's start off by configuring Arch Linux to set a static address for itself over your home network. This way, you can always ensure your Pi is properly accessible over your network.

While I am primarily doing this so the router can forward external ports correctly, this also comes in handy for just using SSH over the local network so that you don't have to plug a monitor and keyboard into your Pi.

For this, we just need to set a simple `netctl` profile.

`netctl` is a CLI tool included in Arch Linux to configure various profiles, or 'personalities' for your computer over various networks. In fact, it even comes with a few example profiles located at `/etc/netctl/examples`, one of which will come in handy here. Any profiles that you may want to use should be saved in `/etc/netctl`

1. Copy the `ethernet-static` file from `/etc/netctl/examples` into `/etc/netctl`.
2. Change the line starting with "Address=" to contain only one address. Mine looks like this: `Address=('192.168.0.14/24')` because my router is set to provide addresses starting with `192.168.0`. Ignore the bit after the address (`/24`). Change the address before that to whatever you want.
3. Change the lines starting with "Gateway=" and "DNS=" to include your router's local address. This is usually 192.168.1.1 or 192.168.0.1.

You can leave the rest unchanged.

1. Start this profile by running `netctl start ethernet-static`.
2. Enable this profile to run on startup automatically using `sudo netctl enable ethernet-static`.

Now you should always be able to find your Pi over your network at the address you set in that profile.

## Configuring Free DNS

1. Start by creating an account at [freedns.afraid.org](http://freedns.afraid.org).
2. Click "Subdomains" in the left pane and add a new one.
3. Set the "Subdomain" field to whatever you want, like your name. Your *public Raspberry Pi web URL* will then look like <yourname>.xxx.xxx.
4. Select a "Domain" from the list. You can choose the "more" option to select from a larger list of free addresses. I picked is.my when I set this up for the first time.
5. Set "Destination" to be your Pi's external IP address. A reliable way to check this is to run `curl -s http://whatismijnip.nl |cut -d " " -f 5`. This uses an external website to check the IP address. This may or may not work in the future, so you may have to dig around for a working solution. Keep in mind that all devices on your network probably share the same external IP address. The Free DNS form expects *this* address because that's how it will find your home router.

Leave everything else unchanged and save.

Now that you have an address set up to point to your router, we need to set up a recurring job on your Pi that constantly keeps Free DNS in the loop, in case your home IP address changes, so that it can keep the URL pointed to the right place.

Make sure you have a cron implementation installed. I use `cronie`, which you can install using `sudo pacman -S cronie`.

1. Click "Dynamic DNS" in the left pane.
2. Find your freshly set up subdomain at the bottom of the page and click "quick cron example".
3. Copy the *very* last line in this file, which probably starts with `2,7,12,17,22...`.
4. Run `sudo crontab -e` in Arch Linux and paste it in the blank file that opens. Replace `wget -O - ` with `curl` so that you don't have to install `wget`. Save the file. This will set the root user to execute that command every few minutes. I am fairly certain that the root user runs its cron jobs after plugging in your Pi, no login required.

Now your Pi will update Free DNS with its current IP address every now and then so that your public URl points to the right router in the whole wide world.

## Port Forwarding

At this point, assuming everything has gone well, when someone tries to access the address you set on Free DNS through their web browser or otherwise, they will be routed to your home router. Browsers knock on port 80 by default, SSH on 22 and so on. Your router needs to be told which devices various port numbers need to be forwarded to.

>Note: Unfortunately, you cannot forward the same port number to multiple multiple computers. Unless there are workarounds, you will have to work around this limitation if you decide to expand your setup. I have not tried it, but you could try to make your Pi act as a facade for other devices (like more Raspberry Pis!).

Let's set up SSH access. This way, when your router gets a port 22 request, it will forward it to your Pi.

You may need to find instructions specific to your own router on how to do this. [PortForward.com](http://portforward.com) is a great documentation resource for various router brands.

Usually, this will involve going to the browser-based configuration panel inside the router and fill out a port forwarding form.

Your form may ask you to enter an IP address (enter your Pi's local address), a start port and an end port (enter 22 for both) and a nickname/description (I called it "Pi SSH"). My router also asks for an optional external IP address in case I only want requests from a certain web IP address to be routed this way. If I leave it at 0.0.0.0, it defaults to letting all port 22 traffic knock on my Raspberry Pi's door.

In the future, if you want to open up other ports, add more rules using the same form.

## Testing

If *everything* so far was set up without a hitch, you should be able to SSH into your Raspberry Pi over the web. If you are currently logged into your Pi over LAN, disconnect now. Then try running `ssh <pi_username>@<your_free_dns_url>`.

For troubleshooting, you can add a `-v` flag to ask the `ssh` command to output debug messages.

In case I have forgotten to mention a crucial step, leaving you stuck, write to me in the comments. I will read every single one, although I can't guarantee help.

## Security

After I published this post, several people on reddit mentioned some security concerns with leaving port 22 open to the Internet. Here are a few things you should explore to keep your Pi safe and at least out of the risk of being DOS'd by bots that scour the Internet for servers to break into.

- Don't leave default user account names and passwords unchanged, if there are any that come with your Linux installation.
- [Disable root SSH](https://wiki.archlinux.org/index.php/Secure_Shell#Configuration) access (requiring keyboard to be plugged straight into the Pi for root account login).
- [Install `fail2ban`](https://wiki.archlinux.org/index.php/Fail2ban#Installation), a program that scans and bans IP addresses that try to brute force their way into your Pi over SSH.
