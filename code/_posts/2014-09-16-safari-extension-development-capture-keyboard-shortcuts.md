---
layout: post
title: "Safari Extension Development: Capture Keyboard Shortcuts"
permalink: "/code/safari-extension-development-keyboard-shortcuts"
redirect_from: "/blog/safari-extension-development-keyboard-shortcuts"
description: "A tutorial on how to listen for users' keyboard shortcuts from the main JavaScript process in a Safari browser extension."
---

Apple does not provide an API to make a Safari browser extension that listens to keyboard shortcuts of your choice. I could not find any guides on how to achieve this, so I decided to write about my experience with this when developing [RecoverTabs](http://antrikshy.com/Projects/recovertabs.htm). I hope it helps someone trying to implement this in their own extension.

jQuery is **not** required for this solution.

If anybody reading this knows of a better way, do tell me in the comments. I'll appreciate it.

<!--more-->

I made RecoverTabs to replicate the Cmd+Shift+T behavior from other Mac web browsers. Normally, the only way to reopen a closed tab in Safari is to use the undo shortcut (Cmd+Z), but it only reopens one tab and does not always work. RecoverTabs was an idea that would fix the problem by saving multiple closed tabs.

Saving URLs on tab-close was the easy part. Safari automatically sends a signal when tabs and windows close, which can be listened to from extension scope. Finding a way to listen to the Cmd+Shift+T shortcut was the hard bit. It was a very crucial part of my extension and I was surprised to see that no one on the Internet seemed to be talking about something so simple. I guess the Safari developer community is pretty small.

Anyways, here's how I implemented it...

## The Solution: Injected Script

As per [Matt Swain's suggestion](http://stackoverflow.com/a/25350717/2005759) on Stack Overflow, I ended up using a bit of JavaScript code and injecting it into the foreground webpage to listen for the keyboard shortcut. This does have some disadvantages, but it works for the most part.

I ended up changing some of the code he suggested. If you just want the code, skip to the next section.

### Anatomy Of A `keydown` Event

If you are new to this, let me give you an overview of what you're dealing with.

In Safari, you can examine a `keydown` event closely by yourself. Create an injected script in your extension (start/end doesn't matter in my experience). In the script, add the following code snippet: 

{% highlight javascript %}
window.addEventListener('keydown', function handleKeydown(e) {
    console.log(e);
}, false);
{% endhighlight %}

When you reload the extension, any key presses will show up in the console as `KeyboardEvent`s. If you expand one, you will see something similar to this:

![KeyboardEvent](/assets/safari-keyboardevent-example.png)

The above example was a result of pressing Cmd+F. Notice the `keyCode` value. 70 identifies the F key. `metaKey: true` denotes that the Cmd key was held down during the event.

Holding the Cmd key down fired a *separate* event. But if you want to capture a shortcut that involves modifier keys held down with a main key, that event is not the one you are looking for. Ignore the first event and just look for your main key's event. It will contain boolean values `altKey`, `ctrlKey`, `metaKey` and `shiftKey` that denote which modifier keys were pressed down with it.

You can dig into the data associated with key press events and come up with more creative ways to implement it, but these five values are pretty much all you need to develop a keyboard-shortcut-based Safari extension.

### The Code

Here's how RecoverTabs's keyboard shortcut handling works:

* The Access Level of the extension is set to All, including secure pages. This allows the shortcut to work from any page, regardless of domain.
* The extension is made up of just a script called `keyboardShortcutHandler.js` and a `Global.html` file. The entire HTML file is a `<script>`.
* The JavaScript file can be included as a start or end script and it doesn't seem to matter. It would make sense to include it as a start script since it is meant to simulate a global shortcut.
* `keyboardShortcutHandler.js` only contains a small snippet of code to listen for the desired keyboard shortcut and dispatch a `reopenTab` message.
* `Global.html` listens for the `reopenTab` message, pops a URL from the saved URLs stack and opens it in a new tab.

Code in `keyboardShortcutHandler.js`:

{% highlight javascript %}
// Listening for a keydown event
window.addEventListener('keydown', handleKeydown, false);

// Function to send message to Global.html when required shortcut detected
function handleKeydown(e) {
    // If 'T' pressed, checks if Cmd and Shift were held down
    if (e.keyCode == 84 && e.metaKey && e.shiftKey) {
        e.preventDefault();
        safari.self.tab.dispatchMessage('reopenTab');
    }
}
{% endhighlight %}

Code in `Global.html`:

{% highlight javascript %}
// Listens to message from injected keyboardShortcutHandler.js
safari.application.addEventListener('message', handleKeyboardMessage, false);

// Message gets caught, reopenClosedTabs() gets called
function handleKeyboardMessage(e) {
    if (e.name == 'reopenTab')
        reopenClosedTabs();
}
{% endhighlight %}

If you want, you can copy the structure of the code above and include it in your own project. I don't mind.

You can check out the [rest of the code](https://github.com/Antrikshy/RecoverTabs) on GitHub. I have commented it throughout so it should be easy to follow.

## Disadvantages

This method does not make the keyboard shortcut behave like a native one. Since it works as an injected script, it relies on the DOM to load and be in focus before the shortcut starts firing messages.

This means that your shortcut will not work

* for a brief time after a page starts loading in the foreground
* when the DOM is not in focus (such as when Web Inspector is in focus)
* when there is no window open
* on the new tab page

This means that (in the case of RecoverTabs) it is impossible to rapidly reopen multiple tabs if they reopen in the foreground. The shortcut only works when the foreground page begins to render. A solution was to reopen tabs in the background. Some users did not like that, so I added a setting (accessible from Safari's Preferences) that allows users to choose their preferred behavior.

If you know of a better way to implement keyboard shortcuts, I'd be glad to learn. Write in the comments below, or tweet to me [@Antrikshy](http://twitter.com/Antrikshy).
