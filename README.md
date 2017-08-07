# vivid-ui
A lightweight library to support and enhance SVG images

# Usage
## Magnify function
To use the magnify function, you simply have to pass a config object in the following fashion:
```
vividUI.magnify({
  fileName: "/assets/puppy.jpg",    //the path to the image to magnify
  parentSelector: "#puppydiv",      //the selector for the div to place the image in, must have a height and width
  magnifyRadius: 75,                //the radius of magnified area
  magnifyFactor: 3                  //the factor of magnification- ie. 3x larger than the size of the parent div
})
```

## Parallax function
There are two options for using the parallax function. The first displays only one image with parallax:
```
 this.vividUI.parallax({
   parentSelector: "#puppydiv",     //selector for the div to place the image in, must have a height and width
   targetSelector: "#targetdiv",    //selector for the object we use as a reference point for parallax
   fileName: "/assets/puppy.jpg",   //path to the image to use in parallax
   scrollRate: 1.5,                 //rate of scroll- determines the height of the image and the translation per unit scrolled
   scrollAxis:"y",                  //scroll axis in which the parallax will be triggered
   imageAxis:"y",                   //axis in which the image will be translated
   offsetBegin:true,                //determines if there is an offset from the top- if false or not set, the parallax begins when the top of the target div reaches the top of the viewport; if true, the parallax begins when the top of the target div reaches the bottom of the viewport
   offsetEnd:false                  //determines if there is an offset from the bottom- if false or not set, the parallax ends when the bottom of the target div reaches the top of the viewport; if true, the parallax ends when the bottom of the target div reaches the bottom of the viewport
 })
```
where scrollFactor is optional.
The second overlays multiple images with parallax:
```
this.vividUI.parallax({
  parentSelector: "#puppydiv",      //selector for the div to place the image in, must have a height and width
  targetSelector: "#targetdiv",     //selector for the object we use as a reference point for parallax
  layerImages: true,                //denotes that this is a layered parallax image
  layerFileNames:[                  //an array of paths to the images to be used as layers
    "/assets/first.svg",
    "/assets/second.svg",
    "/assets/third.svg",
    "/assets/fourth.svg"
  ],
  scrollAxis:"y",                   //scroll axis in which the parallax will be triggered
  imageAxis:"y",                    //axis in which the image will be translated
  offsetBegin:true,                 //determines if there is an offset from the top- if false or not set, the parallax begins when the top of the target div reaches the top of the viewport; if true, the parallax begins when the top of the target div reaches the bottom of the viewport
  offsetEnd:false                   //determines if there is an offset from the bottom- if false or not set, the parallax ends when the bottom of the target div reaches the top of the viewport; if true, the parallax ends when the bottom of the target div reaches the bottom of the viewport
})
```
