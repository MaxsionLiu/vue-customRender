import { h, reactive, defineComponent, onMounted, onUnmounted } from '../../../render/index';
import Map from '../Map'
import { useKeyboardMove } from '../../use/index'
import Plane, { PlaneInfo } from "../Plane.js";
import EnemyPlane, { EnemyPlaneInfo } from '../EnemyPlane'
import { stage } from '../../config/index'
import { game } from '../../../game.js'
import Bullet, { SelfBulletInfo, EnemyBulletInfo } from '../Bullet'
import { moveBullets } from '../../moveBullets'
import { moveEnemyPlane } from '../../moveEnemyPlane'

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

// 敌机
const useEnemyPlanes = () => {
   //生产敌机
   const createEnemyPlaneData = (x) => {
       return {
           x,
           y: -200,
           width: EnemyPlaneInfo.width,
           height: EnemyPlaneInfo.height,
           life: EnemyPlaneInfo.life
       }
   };

   const enemyPlanes = reactive([])

   setInterval(() => {
       const x = Math.floor((1 + stage.width) * Math.random())
       enemyPlanes.push(createEnemyPlaneData(x))
   }, 600)

   return enemyPlanes
}

// 战斗逻辑
const useFighting = ({
    selfPlane,
    selfBulltes,
    enemyPlanes,
    enemyPlaneBullets
   }) => {

    const handleTicker = () => {
        moveBullets(selfBulltes)
        moveBullets(enemyPlaneBullets)
        moveEnemyPlane(enemyPlanes)
    }

    onMounted(() => {
        game.ticker.add(handleTicker)
    })

    onUnmounted(() => {
        game.ticker.remove(handleTicker)
    })
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
       const enemyPlanes = useEnemyPlanes()
       const enemyPlaneBullets = reactive([])

       const handlePlaneAttack = ({x, y}) => {
           const id = createHashCode()
           const width = SelfBulletInfo.width
           const height = SelfBulletInfo.height
           const rotation = SelfBulletInfo.rotation
           const dir = SelfBulletInfo.dir
           selfBulltes.push({ x, y, id, width, height, rotation, dir})
       }

       const handleEnemyPlaneAttack = ({x, y}) => {
           const id = createHashCode()
           const width = EnemyBulletInfo.width
           const height = EnemyBulletInfo.height
           const rotation = EnemyBulletInfo.rotation
           const dir = EnemyBulletInfo.dir
           enemyPlaneBullets.push({x, y, id, width, height, rotation, dir})
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

       useFighting({
           selfPlane,
           selfBulltes,
           enemyPlanes,
           enemyPlaneBullets
       })
       return {
           selfBulltes,
           selfPlane,
           enemyPlanes,
           enemyPlaneBullets,
           handlePlaneAttack,
           handleBulletDestroy,
           handleEnemyPlaneAttack
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

        const createEnemyPlane = (info, index) => {
           return h(EnemyPlane, {
               key: "EnemyPlane" + index,
               x: info.x,
               y: info.y,
               height: info.height,
               width: info.width,
               onAttack: ctx.handleEnemyPlaneAttack,
           })
        }

        return h("Container", [
            h(Map),
            createSelfPlane(),
            ...ctx.selfBulltes.map(createBullet),
            ...ctx.enemyPlaneBullets.map(createBullet),
            ...ctx.enemyPlanes.map(createEnemyPlane)
        ])
    }
});
