---
layout: post
title: "Implement A Countdown From A Specified Time In HTML With JavaScript"
permalink: "implement-a-countdown-from-a-specified-time-in-html-with-javascript"
---

There are libraries for all kinds of countdowns (from a specified time or leading up to a specific time or date) that you can use in your website's front-end. For **my chess timer project**, I wanted my own timer for several reasons:

1. Full control over code meant flexibility and maintainability.
2. Loading a library for something as simple as this was not necessary.

So I whipped up my own solution using JavaScript. Here's how I did it.

<!--more-->

I started by writing my timer in HTML. It's simply some text with `span`s marking the hour and minute values, similar to this:

{% highlight html %}

<span id="min">20</span> minutes <span id="sec">00</span> seconds<br/>

{% endhighlight %}

Then I wrote a function I call `tickDown`. It selects those two values, right in the HTML and modifies them. This way, I was able to write a very simple, lightweight chess timer. It has another function that also simply reads the HTML from the two timers and swaps them.

Here's `tickDown`:

{% highlight javascript %}

function tickDown() {
    var minute = Number($('span#min').text());
    var second = Number($('span#sec').text());

    if (second > 0) {
        minute = decorateZeroes(minute);
        second = decorateZeroes(second - 1);
    }

    else {
        if (minute > 0) {
            minute = decorateZeroes(minute - 1);
            second = "59";
        }

        else {
            minute = decorateZeroes(minute);
            second = decorateZeroes(second);
        }
    }

    $('span#min').text(minute);
    $('span#sec').text(second);
}

{% endhighlight %}

It has very simple logic that simulates the way a timer works. When the smaller unit ticks below 0, it changes to 59 and the larger unit decrements. You must be wondering what `decorateZeroes` does. It simply decorates a single digit value by padding it with zeroes. Here it is:

{% highlight javascript %}

function decorateZeroes(number) {
    if (number == 0)
        return "00";

    if (number >= 10)
        return number.toString();

    return "0" + number.toString();
}

{% endhighlight %}

It returns a string because that's what `tickDown` needs.

// Starting and stopping countdown
