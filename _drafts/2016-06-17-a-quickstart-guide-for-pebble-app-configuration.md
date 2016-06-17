---
published: false
---
I recently decided to try my hand at Pebble development in C, with a native watchface. I won't go into the details of my project, but the watchface involves taking input from users in the form of strings and saving them using Pebble's local storage. The set-up required to accept user configuration is spread across various pages of Pebble's official documentation, and even after reading through it all, I needed external help.

So I decided to summarize all the components that you need to set up to allow for user configuration in a native Pebble watchapp or watchface, written in C.

<!--more-->

