---
layout: post
title: "Show Post Excerpts On Your Poole Blog Homepage"
permalink: "show-post-excerpts-on-poole-blog-homepage"
---

I was happy when I found out about Jekyll and then later Poole (via [Joshua Lande](http://joshualande.com/jekyll-github-pages-poole/)). Poole seemed great! Other than the lack of many themes, Poole fit my needs quite perfectly. The default theme was great, so I rolled with it. But I faced the drawback of using someone else's design: Customizing it requires a lot of poking under the hood. Besides, I was completely new to Jekyll and the Liquid templating engine, and I knew very little about how the internals work.

I didn't like the way the Poole homepage showed the most recent complete post on the landing page. I thought it would be hard to fix, so I didn't bother for some time. When I did get around to it, I was surprised to find out how easy it was.

<!--more-->

## Making Changes

Modifying the default Poole design to show excerpts on the homepage requires changing two things.

This is becuase Poole uses Jekyll's built-in pagination system. Since Jekyll is blog-aware, there's a nifty pagination system built right in and configurable from the `_config.yml` page. But before we get started, you'll need to do a little (optional) bit of setup if you have not already been doing that in each post.

### Marking Excerpt Content

Before you can set up the Poole template to show post excerpts, you should need to mark in your blog posts where the excerpt ends. This is optional, but I recommend you do it for best results. By default the excerpt is automatically set to be the first paragraph of a post.

You need to make an excerpt seperator and use it in your posts if you want to override the default. In the `_config.yml` file (in root directory), add the line 

{% highlight ruby %}
excerpt_separator: "<!--more-->"
{% endhighlight %}

somewhere in the list of other variables. You can assign another string if you want. Then go through all your posts and add `<!--more-->` (or the string you chose) wherever you want your excerpts to end.

### Only Two Simple Changes

Once you're done adding the seperator in each post, make these two changes, assuming you have not changed the default template around too much:

1. In `_config.yml`, change the `paginate` variable to the number of excerpts you would like to show on your homepage. In case there is no `paginate`, you can add one.
2. In the `index.html` template template (also in root directory), change the line that adds `{{ "{{ post.content " }}}}` to your homepage to make it show `{{ "{{ post.excerpt " }}}}`.

It's that simple.

Update: You can add a read more button under each excerpt by simply adding `<a href="{{ "{{ post.url " }}}}"> Read more </a>` just under the `{{ "{{ post.excerpt " }}}}` line inside your loop.
