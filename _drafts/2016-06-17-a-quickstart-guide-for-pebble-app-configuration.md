---
published: false
---
I recently decided to try my hand at Pebble development in C, with a native watchface. I won't go into the details of my project, but the watchface involves taking input from users in the form of strings (through the Pebble app on the user's phone) and saving them using Pebble's local storage. The set-up required to accept user configuration is spread across various pages of Pebble's official documentation. This is because there is a lot of overlap between user configuration and watch-to-phone communication in general. Even after reading through it all, I needed external help.

So I decided to summarize all the components that you need to set up to allow for user configuration in a native Pebble watchapp or watchface, written in C. I really hope this helps someone out there visualize the flow better.

<!--more-->

## Code Structure

I'm assuming you are writing a native app or watchface in C, as opposed to using Pebble.js, which performs all the processing on the user's phone instead of the watch. In that case, this procedure may be different, and I haven't looked into it.

To add configuration options accessible through the Pebble app on the user's phone, you will need to write the following components:

1. The app itself, usually in a `main.c` file.
2. A JavaScript file, run through Pebble JS inside the Pebble app on the user's end. Call this one something like `app.js`, and place it alongside `main.c` if you're using CloudPebble. This is the PebbleKit JS component of your app.
3. A static webpage that you will host yourself somewhere (on GitHub Pages, Amazon S3 or wherever else you can find free or inexpensive hosting).

## Self-Hosted Webpage

This component can be as simple as a single HTML file with inline JavaScript code and as complex as a web app. But it doesn't need to be much to be functional in this case. If you're thinking of integrating it into an existing web app that you may own, keep in mind:

- This is the page that will be loaded as the settings page for your app for the user on their Pebble app.
- The page needs to be viewable in an iOS or Android web browser.
- The page needs to have functionality that allows it to set the web view's `document.location` to a special `pebblejs://` URL that tells the Pebble app to accept configuration. More on this below.

When you are building this configuration webpage, feel free to use any front-end libraries that you want (as long as the end result is compatible with web view systems in iOS and Android).

Most likely, you will want to incorporate some sort of form into your page to accept the user's configuration. What your page does *once* the user submits this form is what's important here. Here's the overall flow to help you visualize this:

1. User indicates submission intent on your form (usually by hitting a save/submit button.
2. Your config webpage compiles this information into a simple JS object and transfers it into the PebbleKit JS component of your app (all of this happens in the Pebble app, once the settings view holding your page closes).
3. The PebbleKit JS component of your app executes in the Pebble app on the user's phone, which should handle catching this information and transmitting it to the watchapp/face. More on this in the next section.

On your HTML page, you need to handle the first two steps of this process. The key functionality is summarized really well in the following code snippet that I have lifted from Pebble's documentation on [this page](https://developer.pebble.com/guides/user-interfaces/app-configuration/).

{% highlight javascript %}

// Determine the correct return URL (emulator vs real watch)
    function getQueryParam(variable, defaultValue) {
      var query = location.search.substring(1);
      var vars = query.split('&');
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (pair[0] === variable) {
          return decodeURIComponent(pair[1]);
        }
      }
      return defaultValue || false;
    }
    var return_to = getQueryParam('return_to', 'pebblejs://close#');

    // Encode and send the data when the page closes
    document.location = return_to + encodeURIComponent(JSON.stringify(options));

{% endhighlight %}

In the above code, it is assumed that the `options` variable contains a JS object/dict that holds the user's data that you want to transfer to the user's watch.

As mentioned in a comment above, a lot of the above code handles detecting whether or not the destnation is an actual Pebble app runtime or an emulator. In production, the above code will set `document.location` to `pebblejs://close#<options>`, where `<options>` is a URL-encoded JSON string.

> Note: You need not worry too much about the format of this `options` variable because it is going to be read by more JavaScript code, only this time in your PebbleKit JS code, which will come later.

## Pebble JS 