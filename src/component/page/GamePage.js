import { h, reactive, defineComponent, onMounted, onUnmounted } from '../../../render/index';
import Map from '../Map'
import { useKeyboardMove } from '../../use/index'
import Plane, { PlaneInfo } from "../Plane.js";
import { stage } from '../../config/index'
import Bullet, { SelfBulletInfo, EnemyBulletInfo } from '../Bullet'

let hashCode = 0
const createHashCode = () => {
   return hashCode++
}

// 我方战机
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
          y: stage.height / 2,
          speed: 7
       })
       const selfBulltes = reactive([])

       const handlePlaneAttack = ({x, y}) => {
           const id = createHashCode()
           const width = SelfBulletInfo.width
           const height = SelfBulletInfo.height
           const rotation = SelfBulletInfo.rotation
           const dir = SelfBulletInfo.dir
           selfBulltes.push({ x, y, id, width, height, rotation, dir})
       }
    
       const handleBulletDestroy = ({ id }) => {
          const index = selfBulltes.findIndex((info) => info.id === id)
          if (index !== -1) {
              selfBulltes.splice(index, 1)
          }
       }

       const { x: selfPlaneX, y: selfPlaneY } = useKeyboardMove({
           x: selfPlane.x,
           y: selfPlane.y,
           speed: selfPlane.speed
       }) 
       selfPlane.x = selfPlaneX
       selfPlane.y = selfPlaneY

       return {
           selfBulltes,
           selfPlane,
           handlePlaneAttack,
           handleBulletDestroy
       }
    },
    render(ctx) {
        const createBullet = (info, index) => {
           return h(Bullet, {
              key: "Bullet" + info.id,
              x: info.x,
              y: info.y,
              id: info.id,
              width: info.width,
              height: info.height,
              rotation: info.rotation,
              dir: info.dir,
              onDestroy: ctx.handleBulletDestroy
           })
        }

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
            createSelfPlane(),
            ...ctx.selfBulltes.map(createBullet)
        ])
    }
});
