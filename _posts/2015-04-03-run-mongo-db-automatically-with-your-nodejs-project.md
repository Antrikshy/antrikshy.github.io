---
layout: post
title: "Run MongoDB Automatically With Your Node.js Project"
permalink: "run-mongodb-automatically-nodejs-project"
---

>Update: The database isn't closed properly when tests fail, which causes some issues. I kind of gave up on this.

I thought I'd share this quick tip I came up with for my own convenience while working with Node.js. Every time I work on a MongoDB-powered Node.js project, I open a separate tab in Terminal and start MongoDB using the `mongod` command so that it runs in the background while I develop and test my project.

This is pretty inconvenient to do each time, so I thought I'd automate it as seamlessly as possible. Mostly, I wanted to keep my unit tests as independent from anything else as possible.

<!--more-->

So I set up npm scripts like this (in my `package.json`):

{% highlight javascript %}
"scripts": {
  "prestart": "mongod --dbpath data --fork --logpath /dev/null",
  "start": "node ./bin/www",
  "poststop": "mongo admin --eval 'db.shutdownServer()' > /dev/null",
  "pretest": "mongod --dbpath data --fork --logpath /dev/null",
  "test": "mocha test",
  "posttest": "mongo admin --eval 'db.shutdownServer()' > /dev/null"
},
{% endhighlight %}

In case you're not sure where to put the above - `"scripts"` goes as a separate object in the `package.json` file in your project's root folder.

Basically what the above does is that it makes sure that MongoDB is running when I run `npm test` to run my Mocha tests. It also closes the MongoDB server when the tests are completed. This is achieved through the `pretest` and `posttest` hooks.

Additionally, I have also created `prestart` and `poststop` hooks so that MongoDB also runs when I use `npm start`. After I'm done working, I close the server using Ctrl + C and run `npm stop` to cleanly shut the MongoDB server down.

In case you're interested in what the two commands do:

{% highlight bash %}
mongod --dbpath data --fork --logpath /dev/null
{% endhighlight %}

The `--fork` flag starts a `mongod` process in the background. `--logpath /dev/null` means that no logs are saved. You can change this if you wish.

{% highlight bash %}
mongo admin --eval 'db.shutdownServer()' > /dev/null
{% endhighlight %}

The above is equivalent to running the `mongo` shell interface, entering `use admin` and executing the command `db.shutdownServer()`. This is because the Mac version does not support the `--shutdown` flag. If you are using Linux, you can replace the entire command above with `mongod --shutdown` and that will probably work. I pipe the output to /dev/null to keep things clean. It also seems to output an error, but it seems to work, so I prefer to suppress it this way.

>If someone knows a way to make [nodemon](http://nodemon.io) run `npm start` and `npm stop` somehow, please let me know how in the comments.
