---
layout: personal
title: About This Site
---

# About This Site

Curious how this site is built? First of all, I'm flattered! :)

tl;dr: It's built using [Jekyll](https://jekyllrb.com) and served via [GitHub Pages](https://pages.github.com). You can see the [full source](https://github.com/Antrikshy/antrikshy.github.io) for this site on GitHub.

This site started off as a blog, which I built using the Jekyll [Poole theme](http://getpoole.com/) by [@mdo](https://twitter.com/mdo). The site has since deviated from that base structure, but a significant portion of my blogs are still styled by old Poole CSS, again, further modified by me.

## Unfamiliar With Jekyll?

[Jekyll](https://jekyllrb.com) is a static site generator, which also happens to be blog-aware.

You may think of Jekyll as a CMS, like WordPress, except it's not hosted, running 24/7 in the cloud. Instead, it's a command line build tool that you run *locally* on your own computer. It takes an opinionated directory structure as input, and spits out a different directory of pure HTML pages and accompanying CSS, JavaScript and other files. This output directory can be slapped onto an inexpensive file server.

Just run this generator every time you make edits to the source files. It handles things like:

* compiling Liquid templates into HTML
* rendering Markdown into HTML
* constructing pages out of layouts and "includes" (components)
* generating HTML pages that look like a full blog, pagination and all
* applying code styling (if applicable)
* other things I am surely forgetting

The result is a site (optionally with a blog) that gives you the convenience of templates and Markdown, which can be hosted for very cheap or for free, and performs *super* snappily.

## Unfamiliar With GitHub Pages?

The GitHub Pages [landing page](https://pages.github.com) will explain this much better than I will. In a nutshell, it's a free service that GitHub graciously provides to host static web pages. Unless you bring your own domain like me, GitHub hosts them on \*.github.io.

Since Jekyll generates static web pages, Jekyll sites can be hosted on GitHub Pages for free. GitHub also happens to provide the [additional service](https://docs.github.com/en/github/working-with-github-pages/setting-up-a-github-pages-site-with-jekyll) of *building* Jekyll sites before hosting them (also free). That way, [the repository](https://github.com/Antrikshy/antrikshy.github.io) containing the source for this site contains the "input" to GitHub Pages rather than its output. GitHub automatically rebuilds everything when I push changes.