# LightBox Bootstrap Zoom
Lightbox Gallery for WordPress with zoom-in by scrolling. Will ignore actual WordPress galleries for compatibility.

![LightBox Bootstrap Zoom screenshot](/assets/example-zoom-featured-meme.avif "LightBox Bootstrap Zoom screenshot")


## :scroll: LightBox Bootstrap Zoom: Table of Contents
- [Presentation](#Presentation)
  - [:sparkles: Features](#sparkles-Features)
  - [:memo: Compatibility](#memo-Compatibility)
- [:question: How To Use](#question-How-To-Use)
  - [Install](#Install)
- [:clipboard: TODO List](#clipboard-TODO-List)
- [:ribbon: License (is-GNU-AGPLv3)](#ribbon-License-(is-GNU-AGPLv3))

# Presentation

## :sparkles: Features
* auto-gallery by simply adding the same *rel* to each link of a gallery
* relies on Modal Bootstrap v5.3 (getbootstrap.com)
* open and close with a button or click outside image
* scroll zoom in and out
* disables zoom if image is inside the box dimensions
* drag image
* drag release if outside the box
* pixelated at zoom scale 2x: disables resampling via css

## :memo: Compatibility
* WordPress 6.5.3
* PHP 5.3
* Bootstrap 5

# :question: How To Use
Nothing to do or configure, just activate it! It's automatic, as long as:
* your pictures have a link to the original (or custom) file
* for galleries: link rel is the same for all images

![how to activate it](/assets/image-insert-advice.avif "LightBox Bootstrap Zoom screenshot")

## Install
### As a snippet:
git clone https://github.com/audioscavenger/LightBox Bootstrap Zoom

Then create a PHP, CSS and JS snippet with each of the files included.

### As a WordPress plugin:
Simply install as a normal WordPress plugin.

# :clipboard: TODO List

Todo

- [ ] Stop appending todo list
- [ ] fix bugs: sometimes the sizes are not detected properly and a page refresh is needed
- [ ] embed bootstrap if needed
- [ ] embed all that in a WP plugin and release it!
- [ ] make money instead of coding for free?

Releases

1.3.0
- [x] WordPress plugin release!

1.2.1
- [x] bugfix: no spinner onload when rel = null or related is unique

1.2.0
- [x] spinner onload
- [x] opacity onload

1.1.0
- [x] also load next if simple click
- [x] add nagigation buttons
- [x] handle galleries: simply add rel=name to any of your images to make a gallery (a bit like foobox)

1.0.0
- [x] compatible with native theme lightbox as long as class .gallery is present
- [x] bugfree snippets


# :ribbon: License
GNU AGPLv3)

## :beer: Buy me a beer
Like my work? This tool helped you? Want to sponsor more awesomeness like this?

<p align="center">
 <a href="https://www.paypal.com/donate/?hosted_button_id=CD7P7PK3WP8WU"><img src="/assets/paypal-Donate-QR-Code.png" /></a>
</p>

