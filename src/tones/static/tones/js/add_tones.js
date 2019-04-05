var app = new Vue({
    el: "#pedal-area",
    data: {
        no: 0,
        name: '',
        brand: '',
        pedals: []
    },
    methods: {
        addPedal: function () {
            this.pedals.push({ no: this.no++, name: this.name, brand: this.brand })
            this.name = ''
            this.brand = ''
        }
    }
})