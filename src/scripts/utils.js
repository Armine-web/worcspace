function isDOMElement(element) {
  return element instanceof Element;
}

window.UI = {
    createElement: function (element, attributes, children) {
      if (!element) {
        console.log('Invalid Element Type')
        return undefined;
      }

      const elem = document.createElement(element); 
      
      if(!isDOMElement(elem)) {
        return undefined;
      } 
        Object.keys(attributes).forEach(key => {
        elem.setAttribute(key, attributes[key]);
        
        });

      
      if (Array.isArray(children)) {
        children.forEach(child => {
          if (typeof child === 'string') {
            elem.appendChild(document.createTextNode(child));
          } else {
            elem.appendChild(child);
          }
        });
      } else if (typeof children === 'string') {
        elem.appendChild(document.createTextNode(children));
      }
    
      return elem;
    },

    render: function (element, target) {
      
      if(!element || !target) {
        console.log('Invalid Element Type');
        return undefined;
      }
    
      target.appendChild(element);
      
    }
  };


 