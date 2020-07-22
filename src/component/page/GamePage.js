import { h, reactive, defineComponent, onMounted, onUnmounted } from '../../../render/index';
import Map from '../Map'

export default defineComponent ({
    render(ctx) {
        return h("Container", [
            h(Map)
        ])
    }
});
