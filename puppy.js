require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function (configObj) {
  var svgNamespace = 'http://www.w3.org/2000/svg'
  var xlinkNamespace = 'http://www.w3.org/1999/xlink'

  //DECLARE SVG OBJECTS
  var parentContainer = document.querySelector(configObj.parentSelector)
  var rootSVG = document.createElementNS(svgNamespace,'svg');
  var isolate = document.createElementNS(svgNamespace,'g');
  var magnifiedImage = document.createElementNS(svgNamespace,'image');
  var baseImage = document.createElementNS(svgNamespace,'image');
  var defs = document.createElementNS(svgNamespace,'defs');
  var clipPath = document.createElementNS(svgNamespace,'clipPath');
  var clipCircle = document.createElementNS(svgNamespace,'circle');
  var magnify = document.createElementNS(svgNamespace,'g');
  var magnifyOverlay = document.createElementNS(svgNamespace,'circle');
  var magnifyUnderlay = document.createElementNS(svgNamespace,'circle');

  //SET SVG OBJECT ATTRIBUTES
  rootSVG.setAttribute("width","100%")
  rootSVG.setAttribute("height","100%")

  baseImage.setAttributeNS(xlinkNamespace, 'xlink:href', configObj.fileName);
  baseImage.setAttribute("width",parentContainer.clientWidth)
  baseImage.setAttribute("height",parentContainer.clientHeight)

  clipPath.id = "magnifyClip"

  clipCircle.setAttribute('r', configObj.magnifyRadius);

  magnifyOverlay.setAttribute('r', configObj.magnifyRadius);
  magnifyOverlay.setAttribute('stroke', "white");
  magnifyOverlay.setAttribute('stroke-width', "5");
  magnifyOverlay.setAttribute('fill', "transparent");

  magnifyUnderlay.setAttribute('r', configObj.magnifyRadius);
  magnifyUnderlay.setAttribute('stroke', "black");
  magnifyUnderlay.setAttribute('stroke-width', "5");
  magnifyUnderlay.setAttribute('fill', "black");
  magnifyUnderlay.setAttribute('opacity', ".25");

  magnifiedImage.setAttributeNS(xlinkNamespace, 'xlink:href', configObj.fileName);
  magnifiedImage.setAttribute("width",parentContainer.clientWidth)
  magnifiedImage.setAttribute("height",parentContainer.clientHeight)

  magnify.setAttribute('id', "magnify");

  isolate.setAttribute('clip-path', "url(#magnifyClip)");

  //CONSTRUCT SVG
  clipPath.appendChild(clipCircle);
  defs.appendChild(clipPath);
  rootSVG.appendChild(defs);
  rootSVG.appendChild(baseImage);
  magnify.appendChild(magnifyUnderlay);
  isolate.appendChild(magnifiedImage);
  magnify.appendChild(isolate);
  magnify.appendChild(magnifyOverlay);
  rootSVG.appendChild(magnify);
  parentContainer.appendChild(rootSVG);

  //HANDLE EVENTS
  rootSVG.addEventListener("mousemove", function(event) {
      magnifiedImage.setAttribute('transform','matrix('+configObj.magnifyFactor+',0,0,'+configObj.magnifyFactor+','+((configObj.magnifyFactor-1)*(parentContainer.offsetLeft-event.clientX-window.scrollX))+','+((configObj.magnifyFactor-1)*(parentContainer.offsetTop-event.clientY-window.scrollY))+')')
      clipCircle.setAttribute('cx', event.clientX+window.scrollX-parentContainer.offsetLeft);
      clipCircle.setAttribute('cy', event.clientY+window.scrollY-parentContainer.offsetTop);
      magnifyOverlay.setAttribute('cx', event.clientX+window.scrollX-parentContainer.offsetLeft);
      magnifyOverlay.setAttribute('cy', event.clientY+window.scrollY-parentContainer.offsetTop);
      magnifyUnderlay.setAttribute('cx', event.clientX+window.scrollX-parentContainer.offsetLeft-5);
      magnifyUnderlay.setAttribute('cy', event.clientY+window.scrollY-parentContainer.offsetTop+5);
    })
  //STYLE
  var css = `#magnify {
opacity: 0;
transition: opacity 1s ease-in-out;
-moz-transition: opacity 1s ease-in-out;
-webkit-transition: opacity 1s ease-in-out;
}
#magnify:hover {
opacity: 1.0;
transition: opacity .55s ease-in-out;
-moz-transition: opacity .55s ease-in-out;
-webkit-transition: opacity .55s ease-in-out;
pointer-events:all;
}`
  var style = document.createElement('style');
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  document.getElementsByTagName('head')[0].appendChild(style);
}

},{}],2:[function(require,module,exports){
module.exports = function (configObj) {
  var svgNamespace = 'http://www.w3.org/2000/svg'
  var xlinkNamespace = 'http://www.w3.org/1999/xlink'
  if (configObj.layerImages) {
    //DECLARE SVG OBJECTS
    var parentContainer = document.querySelector(configObj.parentSelector)
    var targetContainer = document.querySelector(configObj.targetSelector)
    var rootSVG = document.createElementNS(svgNamespace,'svg');
    var layersArray = []
    var scrollRateArray = []
    //SET SVG OBJECT ATTRIBUTES
    rootSVG.setAttribute("width","100%")
    rootSVG.setAttribute("height","100%")

    //CHECK OFFSETS
    var offsetBegin = 0
    var offsetEnd = 0
    if (configObj.offsetBegin) {
      if (targetContainer.offsetTop > window.innerHeight) {
        offsetBegin = window.innerHeight
      }
      else {
        offsetBegin = targetContainer.offsetTop
      }
    }
    if (configObj.offsetEnd) {
      offsetEnd = window.innerHeight
    }

    //CREATE LAYERS
    for (var i = 0; i < configObj.layerFileNames.length; i++) {
      layersArray.push(document.createElementNS(svgNamespace,'image'))
      layersArray[i].setAttributeNS(xlinkNamespace, 'xlink:href', configObj.layerFileNames[i]);
      rootSVG.appendChild(layersArray[i]);
    }
    parentContainer.appendChild(rootSVG);

    //HANDLE EVENTS
    //Parallax correlated with scrolling in y axis, image translates in y axis
    if ((configObj.scrollAxis == "y" || !configObj.scrollAxis) && (configObj.imageAxis == "y" || !configObj.imageAxis)) {
      for (var i = 0; i < layersArray.length; i++) {
        layersArray[i].addEventListener("load", function(event){
          scrollRateArray.push((this.getBBox().height-parentContainer.clientHeight)/(targetContainer.clientHeight+offsetBegin-offsetEnd))
        })
      }
      window.addEventListener("scroll", function(event) {
        if (window.scrollY > (targetContainer.offsetTop - offsetBegin) && window.scrollY < (targetContainer.offsetTop+targetContainer.clientHeight-offsetEnd)) {
          for (var i = 0; i < layersArray.length; i++) {
            layersArray[i].setAttribute('transform','matrix(1,0,0,1,0,'+((targetContainer.offsetTop-window.scrollY-offsetBegin)*scrollRateArray[i])+')')
          }
        }
      })
    }
    //Parallax correlated with scrolling in y axis, image translates in x axis
    else if ((configObj.scrollAxis == "y" || !configObj.scrollAxis) && configObj.imageAxis == "x") {
      for (var i = 0; i < layersArray.length; i++) {
        layersArray[i].addEventListener("load", function(event){
          scrollRateArray.push((this.getBBox().width-parentContainer.clientWidth)/(targetContainer.clientHeight+offsetBegin-offsetEnd))
        })
      }
      window.addEventListener("scroll", function(event) {
        if (window.scrollY > (targetContainer.offsetTop - offsetBegin) && window.scrollY < (targetContainer.offsetTop+targetContainer.clientHeight-offsetEnd)) {
          for (var i = 0; i < layersArray.length; i++) {
            layersArray[i].setAttribute('transform','matrix(1,0,0,1,'+((targetContainer.offsetTop-window.scrollY-offsetBegin)*scrollRateArray[i])+',0)')
          }
        }
      })
    }
  }
  else {
    //DECLARE SVG OBJECTS
    var parentContainer = document.querySelector(configObj.parentSelector)
    var targetContainer = document.querySelector(configObj.targetSelector)
    var rootSVG = document.createElementNS(svgNamespace,'svg');
    var baseImage = document.createElementNS(svgNamespace,'image');

    //SET SVG OBJECT ATTRIBUTES
    rootSVG.setAttribute("width","100%")
    rootSVG.setAttribute("height","100%")

    baseImage.setAttributeNS(xlinkNamespace, 'xlink:href', configObj.fileName);

    //CONSTRUCT SVG
    rootSVG.appendChild(baseImage);
    parentContainer.appendChild(rootSVG);

    //CHECK OFFSETS
    var offsetBegin = 0
    var offsetEnd = 0
    if (configObj.offsetBegin) {
      if (targetContainer.offsetTop > window.innerHeight) {
        offsetBegin = window.innerHeight
      }
      else {
        offsetBegin = targetContainer.offsetTop
      }
    }
    if (configObj.offsetEnd) {
      offsetEnd = window.innerHeight
    }

    //HANDLE EVENTS
    //Parallax correlated with scrolling in y axis, image translates in y axis
    if ((configObj.scrollAxis == "y" || !configObj.scrollAxis) && (configObj.imageAxis == "y" || !configObj.imageAxis)) {
      baseImage.addEventListener("load", function(event){
        if (configObj.scrollRate) {
          baseImage.setAttribute("height",(targetContainer.clientHeight+offsetBegin-offsetEnd)*configObj.scrollRate+parentContainer.clientHeight)
        }
        else {
          configObj.scrollRate = (baseImage.getBBox().height-parentContainer.clientHeight)/(targetContainer.clientHeight+offsetBegin-offsetEnd)
        }
      })
      window.addEventListener("scroll", function(event) {
        if (window.scrollY > (targetContainer.offsetTop - offsetBegin) && window.scrollY < (targetContainer.offsetTop+targetContainer.clientHeight-offsetEnd)) {
          baseImage.setAttribute('transform','matrix(1,0,0,1,0,'+((targetContainer.offsetTop-window.scrollY-offsetBegin)*configObj.scrollRate)+')')
        }
      })
    }
    //Parallax correlated with scrolling in y axis, image translates in x axis
    else if ((configObj.scrollAxis == "y" || !configObj.scrollAxis) && configObj.imageAxis == "x") {
      baseImage.addEventListener("load", function(event){
        if (configObj.scrollRate) {
          baseImage.setAttribute("width",(targetContainer.clientHeight+offsetBegin-offsetEnd)*configObj.scrollRate+parentContainer.clientHeight)
        }
        else {
          configObj.scrollRate = (baseImage.getBBox().width-parentContainer.clientWidth)/(targetContainer.clientHeight+offsetBegin-offsetEnd)
        }
      })
      window.addEventListener("scroll", function(event) {
        if (window.scrollY > (targetContainer.offsetTop - offsetBegin) && window.scrollY < (targetContainer.offsetTop+targetContainer.clientHeight-offsetEnd)) {
          baseImage.setAttribute('transform','matrix(1,0,0,1,'+((targetContainer.offsetTop-window.scrollY-offsetBegin)*configObj.scrollRate)+',0)')
        }
      })
    }
  }
}

},{}],"diffex":[function(require,module,exports){
"use strict"
var Magnify = require('./magnify')
var Parallax = require('./parallax')

module.exports = function() {
  return {
    magnify: Magnify,
    parallax: Parallax
  }
}

},{"./magnify":1,"./parallax":2}]},{},[]);
