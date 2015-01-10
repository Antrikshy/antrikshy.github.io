---
layout: post
title: "Make Pushy Off-Canvas Menu Appear From The Right"
permalink: "make-pushy-off-canvas-menu-appear-from-the-right"
---

I recently discovered Christopher Yee's [Pushy](http://www.christopheryee.ca/pushy/) off-canvas navigation menu. So far, I have found it to be the easiest to implement slide-out menu if you have an existing website. However, it comes with one limitation - it only slides out from the left side of the page. Fortunately, its CSS is pretty easy to modify so that it appears on the right side.

<!--more-->

## Set Up Pushy Normally

The first thing we need to do is set up Pushy like it was intended to. Skip this section if you already have a Pushy sidebar that floats in from the right.

1. Download the [`pushy.min.js`](https://github.com/christophery/pushy/blob/master/js/pushy.min.js) and [`pushy.css`](https://github.com/christophery/pushy/blob/master/css/pushy.css) files from [Pushy's GitHub repo](https://github.com/christophery/pushy) and link it up with your page. Just click the Raw button and save the page (or Option+click Raw on Mac).
2. Wrap your entire existing page in a `div` with a `.container` class.
3. Just before this, add this line: `<div class="site-overlay"></div>`.
4. Just before that, add `<nav class="pushy pushy-left"></nav>` and inside it, add all of your sidebar content.
5. Add the class `.menu-btn` to any element that you want to use as the click-trigger for your menu.

It can't get easier than that. Clicking your `menu-btn` should make a sidebar float in from the right and clicking outside of it should make it go away. Pretty nifty.

## Changes In HTML And JS

There are a couple of semantic changes that I would recommend you make in your existing implementation of Pushy. The menu has the class `.pushy-left` assigned to it. Changing this to `.pushy-right` will eliminate any confusion later on and will improve the maintainability of your code.

1. In your HTML, change the class in the line `<nav class="pushy pushy-left">` to `pushy-right`.
2. In the `pushy.js` or `pushy.min.js` file, look for the one instance of `.pushy-left` and update that as well. In future versions of Pushy, there may or may not be more instances of it, so keep that in mind.

## Changes In CSS

Now we get to the main part. There are several changes we need to make in the `pushy.css` file. In here, you can also change the width of Pushy to your desired width (it requires changing multiple values).

1. In the `.pushy` class, add a line for the `right` property. Set it to 0.
2. Change the selector `.pushy-left` to `.pushy-right`.
3. Then set all the negative 200px values you see in the `transform` properties to positive.
4. Under the `.container-push, .push-push` selector, change the positive 200px values to negative.
5. Change the negative x-offset values for `box-shadow` properties under `.pushy` to make them positive. This will make sure that the website content's 'shadow' appears in the right direction when the menu is open.

>Tip: I find the default shadow too prominent. For a flatter design, I chose `inset 5px 0px 3px -4px rgba(0, 0, 0, .7)`.

Reload your page, and Pushy should now slide in from the right.

## Other Changes (Optional)

By default, Pushy is 200px wide. If you want to change this, pick your width and replace all instances of 200px in this file.

Another change I made in here was the color of the site overlay when Pushy is active. I lightened it to `rgba(0,0,0,0.2)`. You can get rid of it if you want. Change the `background-color` under `.pushy-active .site-overlay`.
