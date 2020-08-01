---
layout: post
blog_name: code
title: "Converting XML From A URL To JSON Using Node.js"
permalink: "/code/fetch-xml-url-convert-to-json-nodejs"
description: "How to convert XML data from an HTTP response to JSON in Node.js based JavaScript application."
---

For a recent personal project, I needed to fetch an XML Atom feed from a URL and convert it to a JSON object to return through my API. Surprisingly, there was no clear-cut tutorial on how to do this. While it isn't very difficult, I figured I'd write one anyway to help any beginners out there looking for assistance. I'm not an expert at this, but feel free to ask me any questions in the comments below. Every single one of them is read.

<!--more-->

## Setup

For the conversion, I recommend using the [xml2js](https://www.npmjs.com/package/xml2js) module. There are a couple others out there, but this is the one I used.

Install it to your project and save it as a dependency using npm as usual.

{% highlight bash %}
npm install xml2js --save
{% endhighlight %}

Then require it in the file where you want to put the code.

{% highlight javascript %}
var parseString = require('xml2js').parseString;
{% endhighlight %}

As you can see, I have only required the one function that we need for this job, `parseString`, following the "shoot-and-forget usage" section in their instructions.

We also need access to the built-in `http` Node.js library.

{% highlight javascript %}
var http = require('http');
{% endhighlight %}

## The Function

I wrote a separate, asynchronous function to handle the conversion. The fetched and converted data is then passed into a supplied callback function, as usual. I'll walk you through the code a little bit.

{% highlight javascript %}
function xmlToJson(url, callback) {
  var req = http.get(url, function(res) {
    var xml = '';
    
    res.on('data', function(chunk) {
      xml += chunk;
    });

    res.on('error', function(e) {
      callback(e, null);
    }); 

    res.on('timeout', function(e) {
      callback(e, null);
    }); 

    res.on('end', function() {
      parseString(xml, function(err, result) {
        callback(null, result);
      });
    });
  });
}
{% endhighlight %}

>Note: This is a standalone function. You can copy-paste this right into your code and be done with it, as long as you followed the Setup step.

What's happening here? The function takes a `url`, of course, and a `callback` function that it will supply the data and any appropriate errors to. First, it uses the `http` module to fetch data. Since this data is streamed, it fires events (`data`, `error`, `timeout`, `end`) so you can handle them appropriately.

The `data` event is fired every time a chunk of data is downloaded. I just append it to the `xml` variable, which will be converted to JSON later.

The `end` event is fired when the entire XML data has been retrieved. That's when I do the conversion and pass the object to the callback function supplied by the caller.

The `error` and `timeout` events are fired when there was a problem with the download. I handle those appropriately by passing the error back to the callback function with `null` for the data.

When I hear the `end` event, I pass the fetched data to the `parseString` function, which takes in a callback function as well (I remember when I had a lot of trouble with asynchronicity). In this callback, I call the original callback and the data is passed through effortlessly.

## Using This Function

If you're new to Node.js, here's how this function would be called.

{% highlight javascript %}
var url = "http://www.example.com/blah.xml"

xmlToJson(url, function(err, data) {
  if (err) {
    // Handle this however you like
    return console.err(err);
  }

  // Do whatever you want with the data here
  // Following just pretty-prints the object
  console.log(JSON.stringify(data, null, 2));
}
{% endhighlight %}

>Note: Keep in mind that this may or may not work properly when dealing with huge XML files. I don't know enough to advise you on that, but my guess is that you would use the `data` event to periodically stream the XML or something.