"use strict"
module.exports = function() {
  return {
    magnify: function (configObj) {
      var svgNamespace = 'http://www.w3.org/2000/svg'
      var xlinkNamespace = 'http://www.w3.org/1999/xlink'
      //DECLARE SVG OBJECTS
      var parentContainer = document.querySelector(configObj.parentSelector)
      var vividSVG = document.createElementNS(svgNamespace,'svg');
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
      vividSVG.setAttribute("width","100%")
      vividSVG.setAttribute("height","100%")

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
      vividSVG.appendChild(defs);
      vividSVG.appendChild(baseImage);
      magnify.appendChild(magnifyUnderlay);
      isolate.appendChild(magnifiedImage);
      magnify.appendChild(isolate);
      magnify.appendChild(magnifyOverlay);
      vividSVG.appendChild(magnify);
      parentContainer.appendChild(vividSVG);

      //HANDLE EVENTS
      vividSVG.addEventListener("mousemove", function(event) {
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
  }
}
