(function () { 
  function isDOMElement(element) {
  return element instanceof Element
}

function createElement(element, attributes, children) {
  if (!element) {
    console.log('Invalid Element Type')
    return undefined;
  }

  const elem = document.createElement(element);

  if(!isDOMElement(elem)) {
    return undefined
  }

  if(attributes) {
    console.log('some action') 
    for (const [key, value] of Object.entries(attributes)) {
      elem.setAttribute(key, value);
    }
  } 

  if(children && typeof children === "string") {
    elem.innerText = children;  
  } else if(Array.isArray(children)) {
    children.forEach(child => {
      elem.appendChild(child);
    })
  } else if (children) {
    elem.appendChild(children);
  }

  return elem;
}

function render(element, target) {
  if(!element || !target) {
    console.log('Invalid Element Type');
    return undefined
  }

  if(!isDOMElement(element)) {
    return undefined
  }

  return target.appendChild(element);
}

window.UI = {
  createElement,
  render
}

})();




 