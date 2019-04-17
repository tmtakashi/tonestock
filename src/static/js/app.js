import Test from './test.vue';
window.Vue = require('vue');

new Vue({
    el: "#test",
    components: { Test },
    template: '<test></test>'
})