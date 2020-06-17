import Vue from 'vue';
import Router from 'vue-router';


import Template1 from '@/pages/Template/Template1.vue';
import Template2 from '@/pages/Template/Template2.vue';
import Template3 from '@/pages/Template/Template3.vue';

Vue.use(Router);

export default new Router({
    routes: [{
            path: '/',
            name: 'template1',
            component: Template1,
            meta: {
                title: '模板1',
                allowBack: false
            }
        },

        {
            path: '/template2',
            name: 'template2',
            component: Template2,
            meta: {
                title: '模板2',
                allowBack: false
            }
        },

        {
            path: '/template3',
            name: 'template3',
            component: Template3,
            meta: {
                title: '模板3',
                allowBack: false
            }
        },
    ]
})