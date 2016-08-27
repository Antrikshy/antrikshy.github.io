---
layout: post
title: "How I Got Started With Programming Side Projects"
permalink: "/blog/how-i-got-started-with-programming-side-projects"
description: "My experience with personal open-source projects as a computer science major, and some advice to newcomers in the field, based on my observations of my peers."
---

![In-button confirmation](/assets/side-projects-screenshot.png)

Like most of the other students in the computer science program at UC San Diego, I went through a couple of years simply coasting through classes. I had never been good *nor* bad academically, and my GPA was fairly average. I was enjoying programming classes, with their deliciously challenging assignments; calculus, not so much.

In this non-technical blog post (for a change), I would like to walk through my experience with my open-source projects, which later helped me out immensely in getting internships (including one at Amazon), despite my average grades.

If you are a current or prospective CS student, hopefully you will leave with some inspiration.

<!--more-->

If you enjoy this post, follow me [on Twitter](https://twitter.com/Antrikshy)!

## Practical Experience, Please

It wasn't until three years in university that I realized that there is a **disconnect between computer science and practical programming** and software development. I've been over this [previously]({% post_url 2015-05-30-a-computer-science-program-is-not-a-software-engineering-program %}).

Over time, I felt a lack of practical programming lessons in my computer science courses. I was **passively waiting to be taught things like web design and mobile app development**. The fact that I was unable to visualize a software stack for the simplest of ideas made the whole experience feel unfulfilling.

I have also seen several discussions about this on [/r/cscareerquestions](http://reddit.com/r/cscareerquestions), which leads me to believe there are many students who feel the same way about the lack of practical university computer science courses. Over time, I understood that courses were deliberately designed to teach us how to think in terms of problems and solutions rather than revolving around programming languages and software architecture.

Back in the day, I hadn't *fully* realized how much pet projects would broaden my job prospects. From various on-campus tech talks and employee panels, I had learned that having side projects was anecdotally helpful in finding jobs. There was some buzz among students about how a portfolio of **side projects could eliminate the need for a decent GPA**. I was slightly skeptical of this.

## Stepping Stones

The summer break after my second year was when I gathered momentum. That was when I started my adventure in the world of open-source software. Still, I placed too much importance in knowing *more* programming languages. This sentiment would change with time, but it didn't hurt. So far, I had worked with Java, C and C++ in course-assigned projects. I had also dabbled a bit with Python on Codecademy and through a [simple reddit bot](https://github.com/Antrikshy/InternetLyingPolice_reddit_bot) project previously.

I decided to go out and teach myself more programming languages over the summer break so I had more space to fill on my resume.

I focused on JavaScript and Python, and a little bit of PHP. I'm glad **I kept my dreams limited in scope** and worked on tiny projects. I made [safcat](https://github.com/Antrikshy/safcat), [x-poster](https://github.com/Antrikshy/x-poster) and [RecoverTabs](https://github.com/Antrikshy/RecoverTabs), which were all Safari extensions that fulfilled some of my wants. RecoverTabs became my first popular project on GitHub; it added Cmd+Shift+T functionality to Safari, which all other browsers ship with, while Safari comes with sort of half-baked functionality.

After some deliberation, I decided to teach myself web design. I wrote a [personal website](https://github.com/Antrikshy/Antrikshy.com) from scratch (not this one). I didn't know UI frameworks like Bootstrap existed, so I dove in head-first and made something from nothing, which felt extremely satisfying in the end.

While I was unsure of this at first, my **web design experience has come into a surprising amount of use** even as a backend engineer. It's always nice to be the one person who happens to know front-end when no one else wants to touch it. Eventually, it pushed me down the web (backend) development road professionally *and* on the side, as opposed to mobile app development and other things.

Even as I learn more things, web design remains one of my favorite hobbies, as I find it very relaxing.

In my opinion, **web development is one of the easier paths to take if you want to start** a portfolio of side projects as a student. This is because the design component is *much* simpler than learning to design mobile app UIs *while* learning the other fundamentals. Web design will give you immediate feedback as you work, which feels highly encouraging as a newbie.

## Year Of Projects

I didn't stop working on pet projects after the break.

After I had my front-end skills down, I focused more on **backend frameworks such as Express.js and Flask** (sidebar: both of these are amazing places to start with web apps), confident that if I came up with a nice idea, I would not have to depend on someone else to design the UI. I could finish and ship it myself.

Now that I had the ball rolling, I worked compulsively. I churned out a [Node.js API wrapper](https://github.com/Antrikshy/NetflixRoulette_NodeJS), a [desktop utility using NW.js](https://github.com/Antrikshy/MinecraftSnaps), and even designed a [CSS theme for a subreddit](https://github.com/Antrikshy/r-iPad-CSS) I moderate.

During my third year of university, I dedicated hours on end to side projects, simply because it was so much fun to me. This often dug into not only gaming time, but also time I would have spent studying for classes. Looking back, I don't regret it at all.

The **experience I received from my personal projects was invaluable**. No university class would make up for it.

Now that I had a shiny (and growing) portfolio on GitHub, I got accepted for an internship with [Learning Equality](https://learningequality.org/about/internships/), a non-profit software team based on the UC San Diego campus. This internship gave me my first taste of "real-world" software engineering. I even remember that my interviewer called me a "strong candidate" during our brief meeting.

During this time, I was applying everywhere for a summer internship. For a brief time, I was nervous that I wouldn't find anything because of my less-than-stellar GPA of ~2.96. After several phone screens and online challenges with a variety of companies, I got invited to an on-campus interview session with Amazon. Not expecting much to come out of it, I accepted, interviewed, and ended up getting the job.

This **Amazon internship would later turn into a full-time position** after graduation (I ended up graduating with a ~3.07 GPA). I was ecstatic.

Even after securing the Amazon internship, I continued making stuff. Most notably, [Quibbler](http://quibbler.co).

A rich portfolio will only help later.

## Newbie Pitfalls

Now let me list some common missteps I have seen beginners take with personal projects. Some of these may be controversial, but these are simply my opinions, which come from both experience and first-hand observation. Feel free to take all of these with a grain of salt, as my experience will not apply to the everyone.

### Be Open-Source By Design

When I conceive an idea for a project, I do some planning beforehand, which includes:

1. Finding the best practices for my language/framework of choice.
2. Picking the right stack for the job.
3. Planning out deployment and update mechanisms.

There's more to programming than just programming. Your classes probably don't focus on how software is deployed or distributed and later maintained through updates.

When working on a project, it's a good idea to plan these things out beforehand. Think about how your web app will run on a server, or how your desktop app will fetch updates and how you will deliver them. This will help with the implementation itself. Since you will not be on a tight schedule, you can take as much time as you *must* follow *all* the best practices possible. Technical debt is not an option.

Being open-source by design also means writing code that:

1. Is presentable in a repository on the web, with sufficient documentation.
2. Can be read, interpreted, and improved by other programmers.
3. You are not ashamed to put on the web.

This is a great way of enforcing good coding habits on yourself. Practice software engineering, not just programming.

Additionally, **it's nice to show off your code to prospective employers**.

### Start Small

**Don't be afraid of your projects being too small or insignificant**. List them all on your portfolio anyway.

In fact, I suggest intentionally picking small projects. **Smaller projects are easier to finish and maintain**. Focus on just what you need in order to pick up specific skills. Don't start working on the next big social network or *the* definitive find-a-study-buddy app. Some ideas do not sound as daunting as they should.

Getting started with JavaScript? Make a browser extension. Want to pick up Python? Make a small command line utility and [publish it]({% post_url 2016-08-17-python-single-file-script-project-structure-and-distribution-through-pypi-pip-for-noobs %}). Sometimes, even deployment is its own challenge.

Especially as a beginner, fill your portfolio with bit-sized (heh) projects. You will soon get a feel for what is achievable (without burning out) and what isn't.

### Try Being A Lone Wolf

Do not get hung up on starting projects just because you don't have people to work with.

While working together on side projects can be beneficial, I barely ever did it myself. Practicing software architecture, debugging and solving problems alone is incredibly helpful.

When picking partners, consider skills and motivation. If you have people who are on the same page as you, go for it! If this is not the case, you may fall into a laziness cycle. Side projects are already extra work. The project will be hard to get off the ground. Everyone will offload hard work onto others. A lot of time will be spent waiting for others to finish their bits. Group members who have more experience will be forced to lag behind, which will be a waste of their time.

Working alone means you can set your own time aside to work. Because you have no one to offload work to, you end up learning all the parts involved. You face more problems and possible dead-ends to figure out on your own, which means more learning.

Either way, I am of the opinion that you should **try making something on your own at some point**.

### Understand Software Maintenance

Designing for the open-source community also comes with responsibilities. Over time, you will (and should) **start getting acquainted with open-source culture**. You should bear in mind that you are the owner and maintainer of any open-source project you put on the web. If people find your project interesting, they may interact with it, leaving suggestions or contributing changes. You are expected to be appropriately receptive to them. So don't abandon your projects after version 1.0.0.

It is good practice to actively maintain any software in general. Even if your software is not open-source, but has a lot of users, it's a good idea to not let it go stale. Users may expect new features from time to time.

Maintenance does not stop there. Be aware of all the **costs you may face even *after* you finish a project**. Building an iOS app to distribute on the App Store means paying $99/year for a developer membership. If you get into web design like me, you may have to pay for server time to keep your projects afloat and viewable by potential employers (who likes dead links on a portfolio?). If you plan to experiment with Amazon Web Services, be doubly sure to estimate the costs beforehand. While some of their products can be used for free or at minimal cost, some are only cost-effective when used at scale.

### Say No To Canned Textbook Projects

This very much comes down to personal preference, but I don't like to learn programming through textbooks. I absolutely **refuse to program something that was designed as a textbook exercise**. While some people may find textbooks and online tutorials to be a good starting point for languages and frameworks (I have used Codecademy a lot in the past), there are some things that are simply missing from them.

1. They seldom represent what real-life development with that technology is like.
2. They don't involve the challenges that you will often face in practice.

I have found that I learn better by just making real, useful things. It's very hard to come up with original ideas; so don't believe that you're not alone in that. Yet, it's what I find to be the best way to stay motivated with a project.

In general, I *only* build things that have never been built before. It's new-idea-or-bust for me.

### Don't Get Frustrated

It's very easy to hit a brick wall in your project and get frustrated. Depending on your university, college or school, you may have tutors or teaching assistants to help out with brick walls in course-assigned projects. You don't have that luxury in your own projects.

Brick walls are not invincible, though. The good thing is, you have all the time and freedom to seek help online. Asking for help is not something to be ashamed of.

**Every time you get stuck, you gain valuable experience**. Sometimes you will run into dependency-based problems whose solutions are entirely out of your reach, and your project will get stuck in limbo. This is still experience gained.

Remember: You won't have tutors to help out with your code when you start working either.

If nothing else, every failed programming project will help you build mental resilience against the crushing disappointment.

### Finish Your Projects

Lastly, you should **strive to finish and ship at least one stable version of every project**. Do not build a GitHub portfolio consisting entirely of 20 different forks and stubs of ideas that never went anywhere. It does not look nice. Employers like to see a portfolio which shows that you are competent and confident enough to ship things. Properly packaging, distributing, maintaining and updating apps, web apps and services is not easy, and is a skill of its own.

## Where Do Ideas Come From?

So far, I have mentioned that I don't work with partners, I don't do canned programs from textbooks, and I only make new and original software. Where do I get these ideas from?

If you look through my [projects](http://antrikshy.com/projects), you'll see that most of them are far from groundbreaking. That's the thing. Your projects don't have to be world-changing at all. And while it's not the simplest job - coming up with new ideas - you can get inspiration from what others do.

If you are an inexperienced programmer in school or university, here are a few ideas (which fit all my criteria) to spark your imagination:

- Design a personal portfolio website (example: this one).
- Build a browser extension that makes your life simpler ([example](https://github.com/Antrikshy/x-poster)).
- Make a wrapper library around an API using a language of your choice. The world can always use more API wrappers ([example](https://github.com/Antrikshy/NetflixRoulette_NodeJS)).
- Build a command line utility that makes your life easier ([example](https://github.com/Antrikshy/ignr.py)).
- Design some sort of framework (design or otherwise) for others to build their own projects on top of ([example](https://github.com/Antrikshy/Tinseltown.js)).
- Get a Raspberry Pi, set up Arch Linux, [make it accessible over the web]({% post_url 2015-12-13-make-your-raspberry-pi-accessible-over-the-web-an-arch-linux-guide %}) via SSH, connect sensors to it and monitor your room temperature and other things. Even if there isn't much programming involved, there's a lot to learn here.
- Create a reddit bot! Fulfill someone's request on [/r/RequestABot](https://www.reddit.com/r/RequestABot/), and look at [/r/botwatch](https://www.reddit.com/r/botwatch/) for help and inspiration.

The important thing to do first is to get your ball rolling. **As you work on software projects, you will inevitably find cool things on GitHub that inspire you**. Keep an eye out for what other people do, and try to incorporate those things into your own projects. As a web design hobbyist, I am always on the lookout for interesting approaches to breadcrumb navigation, single-page web apps and other UX elements. If you like designing mobile apps, browse the app store of your choice and find inspiration. Search for languages and technologies of your choice on GitHub to see what others are up to.

And be sure to interact with other developers you find along the way. Build software that complements others' work.

Good luck out there!
