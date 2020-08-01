---
layout: post
blog_name: code
title: "Write A Simple Countdown Timer In JavaScript"
permalink: "/code/write-a-simple-countdown-timer-in-javascript"
description: "A short tutorial on how to design a simple countdown timer on a webpage."
---

There are libraries for all kinds of countdowns (from a specified time or leading up to a specific time or date) that you can use in your website's front-end. For [checkmt](http://antrikshy.com/checkmt/), I wanted my own timer for several reasons:

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

The last step is to write a layer of abstraction to control the `tickDown` function. Of course, if you do not need to control the timer later, you can just do away with all of this and only use the `setInterval` bit from `startCountdown`.

I wrote two functions, `startCountdown` and `stopCountdown` to start and stop the timer. The main reason, however, was to set any variables that keep track of the running timer or perform any other tasks that need to be performed when starting or stopping the timer, all without cluttering up the `tickDown` method. Besides, we need to call `tickDown` every second.

{% highlight javascript %}

var timerIntId = null;
var timerRunning = false;

function startCountdown() {
    if (!timerRunning) {
        timerIntId = setInterval(tickDown, 1000);
        timerRunning = true;
    }
}

function stopCountdown() {
    if (timerRunning) {
        clearInterval(timerIntId);
        timerRunning = false;
    }
}

{% endhighlight %}

`setInterval` is a JavaScript function that calls the function passed in as the first parameter over and over after a delay passed in as the second parameter (in milliseconds). Here, `tickDown` is called to decrement a second every 1000ms (1s).

`timerIntId` is a global variable that keeps track of the `intervalID` object that `setInterval` returns. This way, `stopCountdown` can call `clearInterval` and kill the `setInterval` loop. `timerRunning` is just a variable I use to keep track of whether the timer is running and perform other tasks on the page accordingly.

The only disadvantage to using `setInterval` to make a timer is that it has a rather low resolution. A delay of 1000ms keeps pretty accurate time. But if you use it to control the timer at millisecond level, the inaccuracy becomes noticeable. If you need to keep more accurate time, look into using some library that uses a more complex way of timekeeping. I learned this the hard way while working on the chess timer.

This timer is now live on my *still*-work-in-progress [checkmt](http://antrikshy.com/checkmt/).