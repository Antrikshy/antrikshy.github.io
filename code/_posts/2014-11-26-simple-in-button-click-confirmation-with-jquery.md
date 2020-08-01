---
layout: post
blog_name: code
title: "Simple In-Button Click Confirmation With jQuery"
permalink: "/code/simple-in-button-click-confirmation-with-jquery"
description: "A web front-end UX tutorial - simple jQuery button with text that changes to verify user intent."
---

![In-button confirmation](/assets/jquery-btn-confirm-gif.gif)

While working on a project, I needed an elegant button click confirmation. After a quick bit of searching, I couldn't find anything satisfactory, so I came up with this tiny snippet of jQuery to easily add in-button confirmation for a click.

In my case, I wanted the user to confirm deletion of an important item from a database. I didn't want a tacky solution like a modal or a confirmation box. I just wanted a simple "Sure?" text to show inside the button itself, and a second click to confirm.

My solution only requires about 6 lines of jQuery excluding any of the code you execute after the confirmation.

<!--more-->

I'm assuming that your button has a class like `.delete-important-data`.

In your JavaScript:

{% highlight javascript %}

$('.delete-important-data').click(function() {
    $(this).text('Sure?').removeClass('delete-important-data').addClass('delete-data-conf');
    
    $('.delete-data-conf').click(function() {
        // Do stuff here
        $(this).fadeOut();  // Perhaps put this in a success callback
    });
});

{% endhighlight %}

>Tip: If you're using Bootstrap, you can change a `.btn-primary` to `.btn-danger` to make it red for the confirmation too.

The functionality is very simple. On the first click, the button text is changed to confirmation text and the button class is swapped with one reserved for a button in the confirmation stage. Next, we have a listener for a click on the new button.

Once the user confirms, I call an Ajax function to delete stuff off the server. Once the server responds with a *success*, I fade the button out.

At the end, in my case, the button disappears, so I don't worry about the swapped class anymore.

>Note: Make sure to also apply your `.delete-important-data` CSS to the confirmation button class. Also, set a fixed width for them so the button's width doesn't change when the confirmation text is displayed.

I would love to know if you found this useful. If you have an easier way, I'd love to see that too.
