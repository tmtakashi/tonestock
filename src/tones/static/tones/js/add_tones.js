Vue.component('pedal-item', {
    props: ['no', 'name', 'brand'],
    template: `
    <li class="list-inline-item">
        <div class="card">
            <div class="card-body">
                {{ no }}<br>
                Name: {{ name }}<br>
                Brand: {{ brand }}<br>
                <button type='button' 
                class="btn btn-success"
                data-toggle="modal"
                data-target="#pedalEditModal"
                @click="edit">Edit</button>
            </div>
        </div>
    </li>
    `,
    methods: {
        edit: function () {
            this.$emit("edit", this.no)
        }
    }
})

var app = new Vue({
    el: '#pedal-area',
    data: {
        no: 0,
        name: '',
        brand: '',
        pedals: [],
        pedalEditNo: 0 
    },
    methods: {
        addPedal: function (no, name, brand) {
            this.pedals.push({ no: this.no+=1, name: this.name, brand: this.brand })
        },
        handleEdit: function (no, name, brand) {
            this.pedalEditNo = no
        },
        saveEdit: function () {
            idx = this.pedalEditNo - 1
            Vue.set(this.pedals,
                idx,
                {no: this.pedalEditNo, name: this.name, brand: this.brand}
            )
        }
    },
})
