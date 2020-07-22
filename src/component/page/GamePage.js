import { h, reactive, defineComponent, onMounted, onUnmounted } from '../../../render/index';
import Map from '../Map'
import Plane, { PlaneInfo } from "../Plane.js";
import { stage } from '../../config/index'

const useSelfPlane = ({x, y, speed}) => {
   const selfPlane = reactive({
       x,
       y,
       speed,
       speed,
       width: PlaneInfo.width,
       height: PlaneInfo.height
   })

   return selfPlane
}

export default defineComponent ({
    props: ["onNextPage"],
    setup(props) {
       const selfPlane = useSelfPlane({
          x: stage.width / 2 - 60,
          y: stage.height,
          speed: 7
       })

       const handlePlaneAttack = ({x, y}) => {

       }

       return {
           selfPlane,
           handlePlaneAttack
       }
    },
    render(ctx) {
        const createSelfPlane = () => {
            return h(Plane, {
                x: ctx.selfPlane.x,
                y: ctx.selfPlane.y,
                speed: ctx.selfPlane.speed,
                onAttack: ctx.handlePlaneAttack
            })
        };
        return h("Container", [
            h(Map),
            createSelfPlane()
        ])
    }
});
