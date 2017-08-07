# vivid-ui
A lightweight library to support and enhance SVG images

# Usage
## Magnify function
```
vividUI.magnify({
  fileName: "/assets/puppy.jpg",
  parentSelector: ("#puppydiv"),
  magnifyRadius: 75,
  magnifyFactor: 3
})
```
## Parallax function
There are two options for using the parallax function. The first displays only one image with parallax:
```
 this.vividUI.parallax({
   parentSelector: ("#artdiv"),
   targetSelector: ("#targetdiv"),
   fileName: "/assets/vaneyck.jpg",
   scrollFactor: 1.5,
   scrollAxis:"y",
   imageAxis:"y",
   offsetBegin:true,
   offsetEnd:false
 })
```
where scrollFactor is optional.
The second overlays multiple images with parallax:
```
this.vividUI.parallax({
  parentSelector: ("#layerdiv"),
  targetSelector: (".parentdiv"),
  layerImages: true,
  layerFileNames:[
    "/assets/first.svg",
    "/assets/second.svg",
    "/assets/third.svg",
    "/assets/fourth.svg"
  ],
  scrollAxis:"y",
  imageAxis:"y",
  offsetBegin:true,
  offsetEnd:false
})
```
