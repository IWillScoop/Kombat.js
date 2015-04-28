# Kombat.js
Want to slowly go down a page and feel the nostalgia of playing Mortal Kombat back in the arcades? This altered version of [Tim Holman's](https://github.com/tholman) elevator.js will do just that. This is just a for-fun project to help build my JS skills. 

### Instructions

`Kombat.js` is a stand alone library (no jquery, or the likes) so usage is pretty straight forward. All styling of elements is up to you. `Kombat.js` only handles the audio management (So pick your favorite battle plan BGM)!

#### JS

`Kombat.js` lives entirely within the js realm, which makes things fairly simple to use.

You'll need to create a new instance of `Kombat`, and pass it some audio elements.
```html
<script>
// Kombat script included on the page, already.

window.onload = function() {
  var kombat = new Kombat({
    mainAudio: '/src/to/kombat.mp3', //MK2 Battle Plan BGM (Personal Favorite)
    endAudio: '/src/to/laugh.mp3' //MK3 Shao Kahn Laugh (Couldn't find the VS dundundun... :[ )
  });
}

// Run the descend function like so
kombat.descend();
</script>
```



### License

Kombat.js is covered by the MIT License.

Copyright (C) 2015 ~ [Julius Medrano](https://github.com/IWillScoop/)
