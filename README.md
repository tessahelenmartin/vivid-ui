![vivid-ui-logo](src/vivid-ui-logo.png)
# vivid-ui
A lightweight library to support and enhance SVG images

# Usage
## Magnify function
To use the magnify function, you simply have to pass a config object in the following fashion:
```js
vividUI.magnify({
  fileName: "/assets/puppy.jpg",    // Path to the image to magnify
  parentSelector: "#puppydiv",      // Selector for the div to place the image in, must have a height
                                    //   and width
  magnifyRadius: 75,                // Radius of magnified area
  magnifyFactor: 3                  // Factor of magnification- ie. 3x larger than the size of the
                                    //   parent div
})
```

## Parallax function
There are two options for using the parallax function. The first displays only one image with parallax:
```js
 this.vividUI.parallax({
   parentSelector: "#puppydiv",      // Selector for the div to place the image in, must have a height
                                     //    and width
   targetSelector: "#targetdiv",     // Selector for the object we use as a reference point for parallax
   fileName: "/assets/puppy.jpg",    // Path to the image to use in parallax
   scrollRate: 1.5,                  // Rate of scroll- determines the height of the image and the
                                     //   translation per unit scrolled
   scrollAxis:"y",                   // Scroll axis in which the parallax will be triggered (optional)
   imageAxis:"y",                    // Axis in which the image will be translated
   offsetBegin:true,                 // Determines if there is an offset from the top- if false or not
                                     //   set, parallax begins when the top of the target div reaches
                                     //   the top of the viewport; if true, parallax begins when the  
                                     //   top of the target div reaches the bottom of viewport
   offsetEnd:false                   // Determines if there is an offset from the bottom- if false or
                                     //   not set, parallax ends when the bottom of the target div
                                     //   reaches the top of the viewport; if true, parallax ends when
                                     //   the bottom of the target div reaches the bottom of viewport
 })
```
The second overlays multiple images with parallax:
```js
this.vividUI.parallax({
  parentSelector: "#puppydiv",      // Selector for the div to place the image in, must have a height
                                    //  and width
  targetSelector: "#targetdiv",     // Selector for the object we use as a reference point for parallax
  layerImages: true,                // Denotes that this is a layered parallax image
  layerFileNames:[                  // Array of paths to the images to be used as layers
    "/assets/first.svg",
    "/assets/second.svg",
    "/assets/third.svg",
    "/assets/fourth.svg"
  ],
  scrollAxis:"y",                   // Scroll axis in which the parallax will be triggered
  imageAxis:"y",                    // Axis in which the image will be translated
  offsetBegin:true,                 // Determines if there is an offset from the top- if false or not
                                    //   set, parallax begins when the top of the target div reaches
                                    //   the top of the viewport; if true, parallax begins when the  
                                    //   top of the target div reaches the bottom of viewport
  offsetEnd:false                   // Determines if there is an offset from the bottom- if false or
                                    //   not set, parallax ends when the bottom of the target div
                                    //   reaches the top of the viewport; if true, parallax ends when
                                    //   the bottom of the target div reaches the bottom of viewport
})
```
