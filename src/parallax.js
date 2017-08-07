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
