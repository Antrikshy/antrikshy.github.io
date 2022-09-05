---
layout: post
title: "Painless Partitioned localStorage In A React App"
permalink: "/code/painless-partitioned-localstorage-with-namespaces-react-router"
description: "A very simple utility class to help you organize browser localStorage items on your website, partitioned into namespaces. Including React and React Router examples."
---

The [localStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) is as straightforward as can be. Create, read, delete, clear-all methods, and that's about it. The only notable limitation is that it only stores strings, but that can be mitigated using JSON stringification and parsing to expand support for objects and more.

I came up with this cute wrapper class for localStorage a few years ago, and it remains one of my favorite personal utility classes in JavaScript.

<!--more-->

The project that I first used it in was an intranet site. Site features were largely independent from each other, radiating out of a hub page. Consequently, I often wanted to separate localStorage into logical partitions. That way, developers (or just I) wouldn't step on each other's toes with clashing localStorage keys.

I solved this with a pure JavaScript class. It looked something like this.

<script src="https://gist.github.com/Antrikshy/41ab89840f367c1ae900a319e1bb63e7.js"></script>

Simply create instances of this class with partition names set and pass them to different parts of your project. Or import and initialize in each component, and have the component identify itself. `PersistenceHandler` should handle storing your keys in separate "namespaces".

If you give the constructor a default prefix, like I do in the example, you can have it fall back to a site-wide namespace by skipping the parameter at initialization. You can then pass this instance around as a special "global" namespace persistence handler.

{% highlight javascript %}
import PersistenceHandler from '/path/to/persistence';
const persistence = new PersistenceHandler("Site-Component-Name");

/* Browser localStorage state: <empty> */

persistence.write("myFavoriteFruit", {name: "mango", kind: "yellow"});

/*
Browser localStorage state:
{
  "Site-Component-Name-myFavoriteFruit": "{"name":"mango","kind":"yellow"}"
}
*/

const fruit = persistence.read("myFavoriteFruit");
console.log(fruit.name);  // Prints "mango"
console.log(fruit.kind);  // Prints "yellow"
{% endhighlight %}

Since the class uses `JSON.stringify` and `JSON.parse` internally, it is bound to all limitations of those methods in the JS spec.

Here's how you could distribute instances of such a class in a React website organized using [React Router](https://github.com/remix-run/react-router).

{% highlight jsx %}
import PersistenceHandler from '/path/to/persistence';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<Home persistence={new PersistenceHandler()}/>}
        />
        <Route
          path="contact"
          element={
            <ContactUs
              persistence={new PersistenceHandler("ContactUs")}
            />
          }
        />
      </Routes>
    </div>
  );
}
{% endhighlight %}

Access it in a functional component like this.

{% highlight jsx %}
function Home({persistence}) {
  // Using localStorage to cache data fetched from a backend at page load
  const [cachedData, cacheDataFromBackend] =
    useState(persistence.read("data") || null);

  useEffect(() => {
    // cachedData is initialized to null if nothing is in localStorage
    if (!cachedData) {
      // Fetch data from backend
      cacheDataFromBackend(fetchedData);
      // Just be wary of localStorage's lack of support for expiry
      persistence.write("data", fetchedData);
    }
  });

  return (
    // ...
  );
}
{% endhighlight %}

Or in a class component like this.

{% highlight jsx %}
class ContactUs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: this.props.persistence.read("formState") || {}
    }
    this.handleFormUpdate = this.handleFormUpdate.bind(this);
  }

  saveFormDraft() {
    // To allow users to save local drafts of a web form
    this.props.persistence.write("formState", form);
  }

  render() {
    return (
      // ...
      <button onClick={this.saveFormDraft}>Save Draft</button>
      // ...
    );
  }
}
{% endhighlight %}
