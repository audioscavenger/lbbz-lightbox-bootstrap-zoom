=== Lightbox Bootstrap Zoom ===
Contributors: audioscavenger
Donate link: https://www.paypal.com/donate/?hosted_button_id=CD7P7PK3WP8WU
Tags: lightbox, zoom, gallery, media
Requires at least: 4.8
Tested up to: 6.5.3
Requires PHP: 5.3
Requires Bootstrap: 5
Stable tag: 1.3.1
License: AGPLv3
License URI: https://www.gnu.org/licenses/agpl-3.0.html

Lightbox Gallery for WordPress with zoom-in by scrolling. Will ignore actual WordPress galleries for compatibility.

== Description ==

* auto-gallery by simply adding the same *rel* to each link of a gallery
* relies on Modal Bootstrap v5.3 (getbootstrap.com)
* open and close with a button or click outside image
* scroll zoom in and out
* disables zoom if image is inside the box dimensions
* drag image
* drag release if outside the box
* pixelated at zoom scale 2x: disables resampling via css

You like it? You can't scrolling and zooming? [Paste some cash with PayPal](https://www.paypal.com/donate/?hosted_button_id=CD7P7PK3WP8WU)!

== Known Issues ==
 - dragging image after resizing browser can become slow
 - let me know if you find another

== Installation ==

Follow the standard [WordPress plugin installation procedere](https://wordpress.org/documentation/article/manage-plugins/).

== Screenshots ==

1. lbbz: how to setup a gallery on the fily, or force pixelated zoom

== Changelog ==

= 1.3.0 =
* Initial release

= 1.2.1 =
* bugfix: no spinner onload when rel = null or related is unique

= 1.2.0 =
* spinner onload
* opacity onload

= 1.1.0 =
* also load next if simple click
* add nagigation buttons
* handle galleries: simply add rel=name to any of your images to make a gallery (a bit like foobox)

= 1.0.0 =
* compatible with native theme lightbox as long as class .gallery is present
* bugfree snippets

== Participate ==
Join me at [Github](https://github.com/audioscavenger/lightbox-bootstrap-zoom)


== Upgrade Notice ==

Nothing noteworty here so far...
