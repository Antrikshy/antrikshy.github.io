---
layout: post
title: "Fix Firefox PiP On KDE Plasma 6+ Running Wayland"
permalink: "/code/fix-firefox-pip-kde-plasma-wayland"
description: "Firefox picture-in-picture has been finnicky on KDE Plasma for years. Here's how to make it work like it does on Windows."
---

I am trying to switch from Windows to Fedora as my primary OS. It's been about a decade since I last tried running a Linux OS as my daily, and I want things to just work.

After much thought, I picked the KDE Plasma edition, which runs on the newer Wayland protocol. Things have been good, except for Firefox's picture-in-picture behavior. It not only behaves differently from Windows, but also actively gets in my way when I switch tabs.

There are some blog posts, forum discussions and Reddit comments that discuss workarounds, but many have gone out of date. So instead of prescribing settings, let me explain in more general steps how to get to Firefox-on-Windows-like behavior, which I consider almost perfect and unobtrusive.

<!--more-->

## "Bad" Behavior

Firefox, Fedora, KDE, and other components involved may update over time, but I want to try and make this guide at least somewhat evergreen.

Just so that we're on the same page, here's what I'm dealing with, out of the box in Firefox on Fedora.

1. I start playing a video on YouTube or another site.
2. I switch tabs.
3. A new PiP window pops up. This window *looks* like PiP UX that I would expect - small and clean, missing the titlebar. However, it's always in the center of the screen (doesn't remember last position), always the same size (doesn't remember last resize), takes keyboard focus immediately, and doesn't stay on top of other windows.

What's worse is that in the current version of Firefox at the time of writing, I can't seem to disable auto-popout even if I wanted to. That seems to be a separate bug that's out of scope of this tutorial.

## The "Fix"

The KDE Plasma desktop environment allows a lot of flexibility in its Window Rules override system. We can define many different behavior combinations. I encourage you to play around. I'll focus on correcting the four issues I listed above.

At the end of this fix, the PiP window should still pop out automatically, and:

1. *Not* take keyboard focus away from the main browser window.
2. Remember its last size.
3. Remember its last position.
4. Stay on top of other windows.

**No changes are needed in Firefox settings** to achieve this set of behaviors. Here are all the changes to be made.

Create a new window rule:

1. Make the PiP window appear, either by switching tabs while a video is playing or by manually clicking the PiP overlay button.
2. Right click anywhere on this window, "More Actions", "Configure Special Window Settings". This should open a Window Rules window, which is a KDE Plasma feature.
3. Set the rule description to something descriptive, like "Firefox PiP". This doesn't affect behavior.

First, we configure this rule to *detect* Firefox's picture-in-picture window:

1. Click "Detect Window Properties". When your mouse pointer turns into a plus sign, click on the PiP window, which should still be open.
2. This should show a sub-dialog box with a bunch of window properties that are currently true about the PiP window. Click all the ones that seem to identify the window. In my case, at the time of writing, this is "Whole window class (application)" and "Window title".
3. Close this smaller window, then set all the string fields to "Exact match" using dropdowns next to the text boxes.

If a Firefox update breaks this in the future, I predict it will likely be related to these steps. Edit the rule and use your judgment on how to target the window type again.

Now, we define the four window behaviors:

1. Click "Add Property..." and add these four properties to the rule - Position, Size, "Keep above other windows" and "Accept focus".
2. Set Position and Size to "Remember" in their respective dropdowns. When this option is set, the x and y coordinates don't matter. Leave them as they are, or set them to 0 and 0.
3. For "Keep above other windows", set the dropdown value to Force and the Yes/No radio buttons to Yes.
4. For "Accept focus", set the dropdown value to Force and the Yes/No radio buttons to No.

Click Apply and OK.

This should do it! If something changes, or if this no longer works, comment below.

Hopefully Mozilla or other Firefox contributors can improve the behavior for good one day. Until then, these manual overrides should tide us over.