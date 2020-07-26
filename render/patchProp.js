import * as PIXI from 'pixi.js'
export const patchProp = (
   el,
   key,
   preValue,
   nextValue,
   isSVG = false,
   preChildren,
   parentComponent,
   parentSuspense,
   unmountChildren                                       
   ) => {
   if (key === "on" || key === "texture" || key === "style") {
        switch (key) {
          case "on":
            Object.keys(nextValue).forEach((eventName) => {
                const callbaack = nextValue[eventName]
                el.on(eventName, callbaack)
            })
            break
          case "texture":
            const texture = PIXI.Texture.from(nextValue);
            el.texture = texture
            break
          case "style":
            let style = new PIXI.TextStyle(nextValue)
            el.style = style
            break
          case "anchor":
            el.anchor.set(...nextValue)
            break         
       }
   } else {
       el[key] = nextValue
   }
}
