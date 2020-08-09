---
layout: post
title: "A Quickstart Guide To Implementing User Configuration In Your Pebble Watchapp"
permalink: "/code/quickstart-guide-implementing-user-configuration-pebble-watchapp-watchface"
description: "An explanation for C programmers on how to use PebbleKit JS to set up communication between watchapp or watchface and the Pebble phone app, and accept users' configuration variables."
---

I recently decided to try my hand at Pebble development in C, with a native watchface. Documentation about accepting user configuration is a bit messy. This is because there is a lot of overlap between user configuration and watch-to-phone communication in general. Even after reading through it all, I needed external help and there were few resources that laid everything out in an easily digestible way.

So I decided to summarize all the components that you need to set up to allow for user configuration in a native Pebble watchapp or watchface, written in C. I really hope this helps someone out there visualize the flow better.

<!--more-->

## Message Keys

Before you can get started with user configuration in your Pebble project, you need to define some message keys that your C code should expect when it catches communication headed to it from your phone.

For example, you may want to have an `invertColors` field if you want to allow the user to invert black and white colors on your watchface.

For the sake of simplicity, I assume you're using CloudPebble and/or are aware of where to set AppMessage keys in the `package.json` file that goes with your app.

In CloudPebble - once you have planned out your message keys - click Settings (in the left sidebar of your project). Then set names for these keys under "PebbleKit JS Message Keys". Be sure to mark the app as "Configurable" at the bottom.

Refer to [this section](https://developer.pebble.com/guides/communication/using-pebblekit-js/#defining-keys) of the documentation for more.

> Note: You **need not worry** about the lengths of these fields. Just set them to be 1, even if they are going to be strings. The "Key Array Length" field has nothing to do with the max length of any strings.

## Code Structure

I'm assuming you are writing a native app or watchface in C, as opposed to using Pebble.js, which performs all the processing on the user's phone instead of the watch. In the latter case, this procedure may be different, and I haven't looked into it.

To add configuration options accessible through the Pebble app on the user's phone, you will need to write the following components:

1. The app itself, usually in a `main.c` file.
2. A JavaScript file, run through Pebble JS inside the Pebble app on the user's end. Call this one something like `app.js`, and place it alongside `main.c` if you're using CloudPebble. This is the PebbleKit JS component of your watchapp/face.
3. A static webpage that you will host yourself somewhere (on GitHub Pages, Amazon S3 or wherever else you can find free or inexpensive hosting).

To help you visualize what happens when a user saves your settings, here's the overall flow to help you visualize this:

1. User indicates submission intent on your form (usually by hitting a save/submit button).
2. Your config webpage compiles this information into a simple JS object and transfers it into the PebbleKit JS component of your app (this happens in the Pebble app, when your settings webpage closes).
3. The PebbleKit JS component of your app executes in the Pebble app on the user's phone, which should handle catching this information and transmitting it to the watchapp/face. More on this in the next section.
4. Watchapp/face catches this data as an AppMessage, where you (the developer) can access various fields using message keys that you defined above.

> Note: From now on, I shall refer to the above as **the flow**.

## Self-Hosted Webpage

This component can be as simple as a single HTML file with inline JavaScript code and as complex as a web app. But it doesn't need to be much to be functional in this case. If you're thinking of integrating it into an existing web app that you own, keep in mind:

- This is the page that will be loaded as the settings page for your app for the user on their Pebble app.
- The page needs to be viewable in an iOS or Android web browser.
- The page needs to have functionality that allows it to set the web view's `document.location` to a special `pebblejs://` URL that tells the Pebble app to accept configuration. More on this below.

When you are building this configuration webpage, feel free to use any front-end libraries that you want (as long as the end result is compatible with web view systems in iOS and Android).

Most likely, you will want to incorporate some sort of form into your page to accept the user's configuration. What your page does *once* the user submits this form is what's important here. Refer to the flow in the previous section.

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

Place this code inside the save/submit button click handler, after you have constructed the `options` object.

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
  
// Perform any translations, other processing here

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

This section corresponds to step 4 in the flow above. It is not written as a substitute for the official documentation. Since I may have forgotten to include some minor details, refer to [this section](https://developer.pebble.com/guides/communication/sending-and-receiving-data/#reading-an-incoming-message) of the documentation for further help if something doesn't work as expected.

This is the point where Pebble's SDK will handle conversion of your JavaScript object into C types, and will pass the data to your app through your AppMessage subscription (more on this below). Be sure to look into [Pebble's type conversions](https://developer.pebble.com/guides/communication/using-pebblekit-js/#type-conversion) to avoid any surprises.

On the C side of things, at the very least, you need to make sure that you:

1. Open AppMessage.
2. Register a message-received callback function.
3. Handle incoming message in aforementioned callback.

Assuming a simple configuration setup, here are some *suggestions* on how to do this and where in your code (assuming a very straightforward existing code structure):

### Open AppMessage

In your `init` function, add:

{% highlight c %}

// Largest expected inbox and outbox message sizes
const uint32_t inbox_size = 30;
const uint32_t outbox_size = 0;

// Open AppMessage
app_message_open(inbox_size, outbox_size);

{% endhighlight %}

You can add this after you're done setting up your main window.

Be sure to set your inbox and outbox sizes properly. Assuming your app only takes user input and never sends data *back* to the phone *anywhere else in the app*, your outbox size can be 0. As for inbox size, think about the size of the largest possible settings object your config page can generate, in *bytes*, after conversion to C types.

For example, the above size of 30 would work if you expect the user to manually type in three strings on the settings page of length 10 characters max. Anything that your config webpage generates that falls outside this limit may be discarded.

### Register Callback

Right after the above, you can add:

{% highlight c %}

// Prep AppMessage receive
app_message_register_inbox_received(inbox_received_callback);

{% endhighlight %}

`inbox_received_callback` is of course, a function you define that will handle your users' settings once they are caught by your watchapp/face.

### Handling incoming messages

`app_message_register_inbox_received` will expect a function with a signature equivalent to `void inbox_received_callback(DictionaryIterator *iterator, void *context);`

In a simple case, the `iterator` pointer is all you need to access values from your configuration webpage in C code.

This is the final step.

Say you want to access a boolean value that's expected in a key named `invertColors` and pass it into a function named `handle_color_inversion` that you have defined elsewhere in your code. The following code would handle that:

{% highlight c %}

// Your callback, registered above
static void inbox_received_callback(DictionaryIterator *iterator, void *context) {

  // MESSAGE_KEY_invertColors is an enum that refers to a key defined as invertColors
  // Prefix is added automatically and helps distinguish a key from a local variable
  Tuple *ic = dict_find(iterator, MESSAGE_KEY_invertColors);
  if (ic) {
    handle_color_inversion(ic->value->int16);
  }

  // Handle other configurations here
}

{% endhighlight %}

`ic->value` refers to an instance of a `Tuple.value` union, which is a convenient little Pebble SDK data structure that we use here to hold values from the `options` JS object after they have been type-converted. 

As mentioned above, booleans in JS are converted to `int16_t` values by the Pebble SDK, which is stored in the field named `int16` in `ic->value`.

For further reference, take a look at [this table](https://developer.pebble.com/guides/communication/sending-and-receiving-data/#data-types) to learn what the various fields in a `Tuple.value` union are named. And take a look at [this](https://developer.pebble.com/docs/c/Foundation/Dictionary/#Tuple) if you're curious about what a `Tuple` looks like.

## Conclusion

I hope this helps someone out there get a better grasp on Pebble app configuration. If this article helped you, be sure to let me know in the comments. It makes my day. 

If you face any trouble or have questions about anything I have described here, feel free to ask me in the comments or directly on Twitter, and I will try to help you out personally.

Thanks for reading!
