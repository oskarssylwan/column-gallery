# Pinterest Style Column Gallery

JavasScript based Pinterest style gallery. Fully responsive and easy to implement. Supports latest versions of Chrome and Firefox, as well as  Internet Explorer 9 and upp.


## Table of Contents

- [Getting Started](#getting-started)
- [Getting Started](#getting-started)
- [Implementation](#implementation)
  - [Markup](#markup)
  - [Populating the gallery](#populating-the-gallery)
  - [The Image Data Object](#the-image-data-object)
- [Options](#options)
- [Non Intrusive](#non-intrusive)
- [Improvements](#improvements)

## Getting Started
Run these commands to get up and running. Keep in mind that if you are developing on windows
you need to run the commands from a unix like terminal,
for example Git Bash.
```
git clone https://github.com/oskarssylwan/image-gallery && cd image-gallery
npm install
npm start
```
## Implementation
The gallery is fairly easy to populate with images.
In the project folder you can find an example of how to fetch images from flickrs public API
and displaying them in the gallery.

For use with other image sources the example below is the most basic setup.

### Markup
For the gallery to work it needs to have an entry somewhere in the html file (see below), a stylesheet linked in the head, and the script tag linked at the bottom.
```
<!DOCTYPE html>
<html lang="en">
  <head>
    <link rel="stylesheet" href="gallery/gallery.css">
  </head>
  <body>

    <div class="gallery-container">
      <div id='oskw-gallery' class="oskw-gallery">
        <noscript>
          This plugin requires javascript
        </noscript>
      </div>
    </div>

    <script type="text/javascript" src="./app.min.js"></script>

  </body>
</html>

```
The gallery will fill the width of the container it's in. So if you want to control the size do it via the container. Dont' try directly alter the size of the gallery. The noscript tag isn't strictly neccassary.

### Populating the gallery
All you need to do is supply the gallery class with options via it's constructor
and an array of objects containing image data via the populate() function.
```
// Gallery specific
import galleryOptions from './gallery/options';
import Gallery from './gallery/gallery';

// Runtime
const gallery = new Gallery(galleryOptions);
gallery.populate(imageData);

```
Easy as pie!

### The Image Data Object
The image data object is an object literal containig information about the image.
```
const imageDataObject = {
  title: 'Cats',
  date_taken: '12 / 02 / 04',
  url: example.com,               <!-- src link-->
  link: example.com,              <!-- href link-->
  dimensions: {
    height: 400px;
    width: 300px;
  }
}
```

## Options
In the options.js file you can find options to alter the maximum column width as well as the minimum amount of columns to show.

## Non Intrusive
The gallery is designed to be as non intrusive as possible. Meaning it wont alter the flow of the page outside of it's container. It is recommended to have the height of the container set to auto but you can however set it to be a fixed height since the images that would partially overflow or overflow completely wont render.

The css classes are prefixed to prevent unwanted inheritance.

## Improvements
There are a handful of performance improvements to be made. Currently every image load triggers a re-calculation
of the total stack height in each column. This is to prevent images that are overflowing from displaying.

The error information system is also a bit of a hack job and is in need of a more thought out implementation.

The current version of the gallery can't be repopulated, meaning it wont work to feed it data dynamicly from a search input
