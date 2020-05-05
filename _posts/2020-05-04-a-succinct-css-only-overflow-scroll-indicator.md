---
layout: post
title: "A Succinct, CSS-Only Overflow Scroll Indicator"
permalink: "/blog/a-succinct-css-only-overflow-scroll-indicator"
description: "There is no visual indicator of the presence of an overflow: scroll property on an HTML element by default. Here's a CSS-only solution that doesn't look like a wall of text."
---

So, you've set an element to `overflow: scroll` with an explicit height. Now you have a scrollable space. Depending on the content in this space, it may not be entirely obvious that it *is* scrollable, unless the content happens to be obviously cut off. Here's an example.

<div style="height: 150px; margin: 35px; font-size: 20px; line-height: 25px; overflow: scroll;">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nunc sed velit dignissim sodales ut eu sem integer vitae. Amet cursus sit amet dictum sit amet justo donec enim. Non consectetur a erat nam. Ut venenatis tellus in metus. Arcu vitae elementum curabitur vitae nunc sed velit dignissim. At urna condimentum mattis pellentesque id. Natoque penatibus et magnis dis parturient. Dolor sed viverra ipsum nunc aliquet bibendum. Dapibus ultrices in iaculis nunc sed. Sed blandit libero volutpat sed cras ornare arcu. Vitae et leo duis ut.
</div>

The are all sorts of solutions to this on the web, but I didn't want any surrounding HTML elements and more CSS to make them work. Here's a quick CSS solution.

<!--more-->

The scrollable div above has the following CSS applied to it.

{% highlight css %}
div {
    height: 150px;  /* relevant */
    margin: 35px;
    font-size: 20px;
    line-height: 25px;
    overflow: scroll;  /* relevant */
}
{% endhighlight %}

First, put the content into its own nested element. For this example, I put it in a `<p>`. Now, the overflow is applied to the parent of this element and we can style each separately.

Now add some padding and a border to the contained element.

{% highlight css %}
p {
    padding: 10px;
    border: 2px solid gray;
}
{% endhighlight %}

<div style="height: 150px; margin: 35px; font-size: 20px; line-height: 25px; overflow: scroll;">
    <p style="padding: 10px; border: 2px solid gray;">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nunc sed velit dignissim sodales ut eu sem integer vitae. Amet cursus sit amet dictum sit amet justo donec enim. Non consectetur a erat nam. Ut venenatis tellus in metus. Arcu vitae elementum curabitur vitae nunc sed velit dignissim. At urna condimentum mattis pellentesque id. Natoque penatibus et magnis dis parturient. Dolor sed viverra ipsum nunc aliquet bibendum. Dapibus ultrices in iaculis nunc sed. Sed blandit libero volutpat sed cras ornare arcu. Vitae et leo duis ut.
    </p>
</div>

The presence of borders on three sides implies the existence of a fourth. With it missing, it's a clear indication that the element is scrollable.

To be a touch more minimalist, you could remove the left and right borders and the padding. But that depends on your design language and whether you can afford to lose the little bit of clarity.

{% highlight css %}
p {
    border-top: 2px solid gray;
    border-bottom: 2px solid gray;
}
{% endhighlight %}

<div style="height: 150px; margin: 35px; font-size: 20px; line-height: 25px; overflow: scroll;">
    <p style="border-top: 2px solid gray; border-bottom: 2px solid gray;">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nunc sed velit dignissim sodales ut eu sem integer vitae. Amet cursus sit amet dictum sit amet justo donec enim. Non consectetur a erat nam. Ut venenatis tellus in metus. Arcu vitae elementum curabitur vitae nunc sed velit dignissim. At urna condimentum mattis pellentesque id. Natoque penatibus et magnis dis parturient. Dolor sed viverra ipsum nunc aliquet bibendum. Dapibus ultrices in iaculis nunc sed. Sed blandit libero volutpat sed cras ornare arcu. Vitae et leo duis ut.
    </p>
</div>

The solution may not fit all design languages. I do think the design is utilitarian enough that it shouldn't be hard to massage it into yours. But then this post is equal parts science and art - I'm prescribing a design solution to a design problem here.
