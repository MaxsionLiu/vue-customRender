import * as PIXI from 'pixi.js'
export const nodeOps = {
    insert: (child, parent, anchor) => {
        parent.addChild(child);
    },

    remove: (child) => {
        const parent = child.parent
        if (parent) {
            parent.removeChild(child)
        }
    },

    createElement: (tag, isSVG, is) => {
       let element
       if (tag === "Rectangle") {
           //    创建一个矩形
           element = new PIXI.Graphics()
           element.lineStyle(4, 0xff3300,1)
           element.beginFill(0x66ccff)
           element.drawRect(0,0,64,64)
           element.endFill()
           element.x = 0
           element.y = 0
           // opt-in to interactivity
           element.interactive = true
           // show hand  cursor
           element.buttonMode = true
       }else if (tag === "Sprite") {
           element = new PIXI.Sprite()
           element.x = 0
           element.y = 0
       }else if (tag === "Container") {
           element = new PIXI.Container()
           element.x = 0
           element.y = 0
       }else if (tag === "Text") {
           element = new PIXI.Text()
           element.x = 0
           element.y = 0
       } 
       return element 
    },
    
    createText: (text) => document.createTextNode(text),

    createComment: (text) => {},
    
    setText: (node, text) => {
        node.nodeValue = text
    },

    setElementText: (el, text) => {
        el.textContent = text
    },

    parentNode: (node) => node.parentNode,

    nextSibling: (node) => node.nextSibling,

    querySelector: (query) => doc.querySelector(selector),

    setScopeId(el, id) {
       el.setAttribute(id, '')    
    },

    cloneNode(el) {
       return el.cloneNode(true)
    }
};
