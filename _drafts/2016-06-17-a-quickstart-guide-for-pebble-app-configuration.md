---
published: false
---
I recently decided to try my hand at Pebble development in C, with a native watchface. I won't go into the details of my project, but the watchface involves taking input from users in the form of strings (through the Pebble app on the user's phone) and saving them using Pebble's local storage. The set-up required to accept user configuration is spread across various pages of Pebble's official documentation. This is because there is a lot of overlap between user configuration and watch-to-phone communication in general. Even after reading through it all, I needed external help.

So I decided to summarize all the components that you need to set up to allow for user configuration in a native Pebble watchapp or watchface, written in C. I really hope this helps someone out there visualize the flow better.

<!--more-->

## Message Keys

Before you can get started with user configuration in your Pebble project, you need to define some message keys that your C code should expect when it catches communication headed to it from your phone. For example, you may want to have an `invertColors` field if you want to allow the user to invert black and white colors on your watchface.

For the sake of simplicity, I assume you're using CloudPebble and/or are aware of where to set AppMessage keys in the `package.json` file that goes with your app.

In CloudPebble - once you have planned out your message keys - click Settings (in the left sidebar of your project). Then set names for these keys under "PebbleKit JS Message Keys". Be sure to mark the app as "Configurable" at the bottom.

Refer to [this section](https://developer.pebble.com/guides/communication/using-pebblekit-js/#defining-keys) of the documentation for more.

> Note: You **need not worry** about the lengths of these fields. Just set them to be 1, even if they are going to be strings. The "Key Array Length" has nothing to do with the max length of any strings.

## Code Structure

I'm assuming you are writing a native app or watchface in C, as opposed to using Pebble.js, which performs all the processing on the user's phone instead of the watch. In that case, this procedure may be different, and I haven't looked into it.

To add configuration options accessible through the Pebble app on the user's phone, you will need to write the following components:

1. The app itself, usually in a `main.c` file.
2. A JavaScript file, run through Pebble JS inside the Pebble app on the user's end. Call this one something like `app.js`, and place it alongside `main.c` if you're using CloudPebble. This is the PebbleKit JS component of your watchapp/face.
3. A static webpage that you will host yourself somewhere (on GitHub Pages, Amazon S3 or wherever else you can find free or inexpensive hosting).

To help you visualize what happens when a user saves your settings, here's the overall flow to help you visualize this:

1. User indicates submission intent on your form (usually by hitting a save/submit button.
2. Your config webpage compiles this information into a simple JS object and transfers it into the PebbleKit JS component of your app (all of this happens in the Pebble app, once the settings view holding your page closes).
3. The PebbleKit JS component of your app executes in the Pebble app on the user's phone, which should handle catching this information and transmitting it to the watchapp/face. More on this in the next section.
4. Watchapp/face catches this data as an AppMessage, where you (the developer) can access various fields using message keys that you defined above.

> Note: From now on, I shall refer to the above as **the flow**.

## Self-Hosted Webpage

This component can be as simple as a single HTML file with inline JavaScript code and as complex as a web app. But it doesn't need to be much to be functional in this case. If you're thinking of integrating it into an existing web app that you may own, keep in mind:

- This is the page that will be loaded as the settings page for your app for the user on their Pebble app.
- The page needs to be viewable in an iOS or Android web browser.
- The page needs to have functionality that allows it to set the web view's `document.location` to a special `pebblejs://` URL that tells the Pebble app to accept configuration. More on this below.

When you are building this configuration webpage, feel free to use any front-end libraries that you want (as long as the end result is compatible with web view systems in iOS and Android).

Most likely, you will want to incorporate some sort of form into your page to accept the user's configuration. What your page does *once* the user submits this form is what's important here. Refer to the 4-step flow in the previous section.

On your HTML page, you need to handle the first two steps of the flow. The key functionality is summarized really well in the following code snippet that I have lifted from Pebble's documentation on [this page](https://developer.pebble.com/guides/user-interfaces/app-configuration/).

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

> Note: It's a good idea to structure your `options` object to match the configuration variables you defined earlier in the "Message Keys" section.

## PebbleKit JS Component

In a JS file that goes with your watchapp/face, you need to write code to accept data sent via your self-hosted config page in the previous section, and perform any translations necessary before sending it to your watchapp/face via `Pebble.sendAppMessage`. 

This JS code will be executed inside the Pebble app on the user's phone, and you have access to the `Pebble` object, containing functionality that allows your JS code to communicate with a Pebble watch.

Take a moment to scroll up to the flow and re-read step 3. I'll wait.

This bit is relatively straightforward. It's a good idea to organize your `options` object (from the HTML page) before sending it to this component. That way, all you need to do is capture the options data, parse it back into a JS object and pass it over to the watchapp/face.

{% highlight javascript %}

// REPLACE THIS WITH YOUR CONFIG WEBPAGE'S PUBLIC URL
var url = "http://example.com/watch_config.html"

Pebble.addEventListener('showConfiguration', function() {
  Pebble.openURL(url);
});

Pebble.addEventListener('webviewclosed', function(e) {
  // Decode the user's preferences
  var options = JSON.parse(decodeURIComponent(e.response));
  
  // Send to watchface
  Pebble.sendAppMessage(options, function() {
    console.log('Config data sent successfully!');
  }, function(e) {
    console.log('Error sending config data!\n' + JSON.stringify(e));
  });
});

{% endhighlight %}

The above code is completely valid, and can be placed as-is into `app.js`, assuming the `options` object is well-structured when it comes from your config webpage. What do I mean by well structured? I mean the keys correspond exactly with the message keys you defined in the section above titled "Message Keys". If your object is not structured in the right way, feel free to process it here, before passing it into `Pebble.sendAppMessage`.

## Catching Data On Watch

This section corresponds to step 4 in the user-configuration flow above.

This is the point where Pebble's SDK will handle converting your JavaScript object into convenient C types, and pass the data to you through your app message subscription. Be sure to look into [Pebble's type conversions](https://developer.pebble.com/guides/communication/using-pebblekit-js/#type-conversion) to avoid any surprises.

On the C side of things, you need to handle:

1. Opening `AppMessage`
