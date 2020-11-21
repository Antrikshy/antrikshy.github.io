---
layout: post
title: "Number Of Possible MOD Pizza Recipes"
permalink: "/code/number-of-possible-mod-pizza-combinations-recipes"
description: "MOD Pizza allows any number of pizza toppings at a flat rate. How many total possible recipes are out there?"
---

For those unfamiliar with [MOD Pizza](https://modpizza.com/we-are-mod/), they are a restaurant chain across the US and Canada, who specialize in quickly-served, made-to-order pizza. You get to pick anywhere between zero to all of their available toppings at flat rates, a bit like sandwiches at Subway.

A few months ago, I saw an advert for MOD Pizza on the side of a Seattle public transit bus. I wish I had taken a picture so that I wouldn't have to go by memory, but I remember it claiming something along the lines of "thousands of possible combinations". I remember thinking, "gee, it has to be a lot more than thousands" and that they must be intentionally undercounting them because millions or billions would sound too ridiculous to the general passerby.

I figured I'd double check their math.

<!--more-->

To familiarize yourself with the problem domain, I'd recommend checking out [their menu](https://modpizza.com/menu/) with your own eyes.

One limitation that we're dealing with here is that this post may not end up being very evergreen. I don't know how frequently MOD changes up its menu offerings. I've definitely come across some limited run and "limited locations" toppings during the course of my research. If you're reading this years from publishing, you may need to treat this post as a time capsule.

## The Assumptions

It's complicated. When anything can go on a pizza, what one may consider a "reasonable" pizza is highly subjective.

I am sourcing my information from two official lists on MOD's website:

1. The [menu page](https://modpizza.com/menu/) on their website
2. The [nutrition page](https://modpizza.com/nutrition/) on their website (this one looks more comprehensive)

For the purposes of this calculation, I am going to ignore:

1. Limited run toppings
2. Toppings available in "limited locations"
3. All non-pizza offerings - dessert, drinks, even their very customizable salads

Additionally, some of the ingredients in the list are what I consider *somewhat* redundant.

1. Garlic - chopped vs roasted
2. Red peppers - "mama lil's sweet hot peppas" vs roasted
3. Sea salt - on its own vs salt + pepper combo
4. Romaine lettuce - on its own vs included in spring mix
5. Tomatoes - diced vs sliced

However, it would be perfectly reasonable to ask for a pizza that includes both versions of all of these. So it's only fair to calculate a low and high end for the final count, with and without these "redundant" ingredients.

Now this might be a bit more subjective, but I am not going to count the following as valid pizzas:

1. Crust with no toppings whatsoever
2. Crust with sauce only

Searching the web a little bit tells me some people do enjoy cheese pizza without any sauce, so I hereby consider that a valid pizza.

To deal with these edge cases, I will subtract exactly two pizzas (per crust type) from the high and low estimates.

I wonder how frequently MOD gets customers that request the poor employees to construct them a monstrosity of a pizza containing a mountain of all possible toppings. I prefer not to think about such things.

## Counting The Ingredients

### Crust

MOD offers 3 crust "styles", so to speak - 11-inch, 6-inch, and a thicker 11-inch "mega dough". *But*, if you pick the 11-inch option in their online configurator, they also offer gluten-free and cauliflower variants in that size. I recognize that 6-inch and "mega dough" creations could be thought of as very different pizza experiences. At the same time, they could be considered the same as the base variant. Let's go with a range for this one.

**Total options: 3 to 5**  
**Allowed to skip: No**

This category is a special one, in that there *must* be one and only one crust per pizza. I am not open to debate on this.

### Sauce

MOD offers 7 sauce options, which includes a "garlic rub" and olive oil options. While I think it'd be a travesty, I consider it reasonable to ask for a sauce-less pizza as well.

**Total options: 7**  
**Allowed to skip: Yes**

### Cheese

MOD offers 7 cheese options, including a dairy-free option. Some of the cheese options, such as feta, are not ones I would consider standard "pizza cheese" (like mozzarella), but more appropriate as topping cheese on top of standard shredded cheese. But hey, anything goes here.

I am going into this with an especially open mind, and will consider it reasonable to ask for a pizza without any cheese.

Is a sauce-less *and* cheese-less pizza... still pizza?

**Total options: 7**  
**Allowed to skip: Yes**

### Meat

Skipping over two limited-availability options, MOD offers 9 meat options. As a vegetarian, I am very familiar with meat-less pizzas!

**Total options: 9**  
**Allowed to skip: Yes**

### Veggies & Good Stuff

Yep, that's what MOD calls this category. Evidently, the "good stuff" includes herbs and spices. This is also the largest category on MOD's menu. I had to skip over five limited-availability options in MOD's nutrition information sheet. Even after ignoring these, there were two extra items listed on the nutrition page that were missing from the menu. I included these in the count.

As mentioned in an earlier section, this category also has several (what I consider) redundant options, giving us a range.

Of course, we also need to account for pizzas with no veggie toppings.

**Total options: 22 to 27**  
**Allowed to skip: Yes**

### Finishing Sauces

These are fairly straightforward. There are 8 finishing sauce options, which even includes a "Mike's Hot Honey", which I find a bit strange. But then some people find pineapple on pizza strange. Of course, you can omit this category of toppings quite orthodoxically.

**Total options: 8**  
**Allowed to skip: Yes**

## Munching The Numbers

Time to bust out combinatorics! This problem can be mapped to counting the number of subsets in a set. Here, the sets would be each category of toppings.

The [formula for that](https://en.wikipedia.org/wiki/Combination#Number_of_k-combinations_for_all_k) is *2<sup>n</sup>*, where *n* is the number of items in the set, or *2<sup>n</sup> - 1* if we prefer to include the empty set. For all but the crust category, we do.

After collecting all the lower-bound ingredient counts, we have:

- 3 crusts (can pick exactly 1)
- 7 sauces
- 7 cheeses
- 9 meats
- 22 veggies & good stuff
- 8 finishing sauces

Similarly, after compiling all the higher-bound ingredient counts, we have:

- 5 crusts (can pick exactly 1)
- 7 sauces
- 7 cheeses
- 9 meats
- 27 veggies & good stuff
- 8 finishing sauces

As noted in the section, The Assumptions, I want to avoid exactly two edge cases as invalid pizzas (no toppings, sauce only), so I will subtract those from the final counts.

**Lowball estimate:** 3 × ((2<sup>7</sup> - 1) × (2<sup>7</sup> - 1) × (2<sup>9</sup> - 1) × (2<sup>22</sup> - 1) × (2<sup>8</sup> - 1) - 2)  
**Total:** 26,445,365,774,404,599

**Highball estimate:** 5 × ((2<sup>7</sup> - 1) × (2<sup>7</sup> - 1) × (2<sup>9</sup> - 1) × (2<sup>27</sup> - 1) × (2<sup>8</sup> - 1) - 2)  
**Total:** 1,410,419,833,730,094,065

You can request somewhere between **26 quadrillion 445 trillion 365 billion 774 million 404 thousand 599** and **1 quintillion 410 quadrillion 419 trillion 833 billion 730 million 94 thousand 65** distinct and valid pizza recipes at MOD Pizza as of the time of this writing.

I really hope I got it right because this is on the Internet now.
