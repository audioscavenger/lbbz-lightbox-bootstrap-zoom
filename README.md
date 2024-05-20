# lbbz LightBox Bootstrap Zoom
Yet another lightbox… for WordPress… But this one has a zoom! You can zoom in by scrolling, and clicking simply advances through the gallery as usual.

![lbbz LightBox Bootstrap Zoom screenshot](/assets/lbbz-example-zoom-featured-meme.avif "lbbz LightBox Bootstrap Zoom screenshot")


## :scroll: lbbz LightBox Bootstrap Zoom: Table of Contents
- [Presentation](#Presentation)
  - [:sparkles: Features](#sparkles-Features)
  - [:memo: Compatibility](#memo-Compatibility)
- [:question: How To Use](#question-How-To-Use)
  - [Install](#Install)
- [:clipboard: TODO List](#clipboard-TODO-List)
- [:ribbon: License (is-GNU-AGPLv3)](#ribbon-License-(is-GNU-AGPLv3))

# Presentation

## :sparkles: Features
* auto-gallery by simply adding same *rel* to each links
* based off Modal Bootstrap v5.3 (getbootstrap.com)
* open and close with a button or click outside image
* scroll zoom in and out
* disables zoom if image is inside the box dimensions
* drag image
* drag release if outside the box
* pixelated at zoom scale 2x: disables resampling via css

## :memo: Compatibility
* WordPress 6.5.3
* PHP 5.3

# :question: How To Use
Nothing to do, just install the 3 snippets. It's automatic, as long as your pictures have a link to the original (or custom) file.
![lbbz how to activate it](/assets/lbbz-image-insert-advice.avif "lbbz LightBox Bootstrap Zoom screenshot")

## Install
git clone https://github.com/audioscavenger/lbbz LightBox Bootstrap Zoom

# :clipboard: TODO List

Todo

- [ ] Stop appending todo list
- [ ] fix bugs: sometimes the sizes are not detected properly and a page refresh is needed
- [ ] embed bootstrap if needed
- [ ] embed all that in a WP plugin and release it!
- [ ] make money instead of coding for free?

Releases

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


# :ribbon: License (is GNU AGPLv3)
This project is distributed under [GNU Affero General Public License, Version 3][AGPLv3].

                    GNU GENERAL PUBLIC LICENSE
                       Version 3, 29 June 2007

 Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>
 Everyone is permitted to copy and distribute verbatim copies
 of this license document, but changing it is not allowed.

install-rkit-portable  Copyright (C) 2019, Eric Derewonko
This program comes with ABSOLUTELY NO WARRANTY;
This is free software, and you are welcome to redistribute it
under certain conditions; https://www.gnu.org/licenses/agpl-3.0.html

