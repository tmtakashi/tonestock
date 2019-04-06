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
                <button type='button' 
                class="btn btn-danger"
                @click="destroy">Delete</button>
            </div>
        </div>
    </li>
    `,
    methods: {
        edit: function () {
            this.$emit("edit", this.no)
        },
        destroy: function () {
            this.$emit("destroy", this.no)
        }
    }
})

var app = new Vue({
    el: '#pedal-area',
    data: {
        no: 0,
        addName: '',
        addBrand: '',
        editName: '',
        editBrand: '',
        pedals: [],
        pedalEditNo: 0 
    },
    methods: {
        addPedal: function () {
            this.pedals.push({ no: this.no += 1, name: this.addName, brand: this.addBrand })
            this.addName = ''
            this.addBrand = ''
        },
        handleEdit: function (no) {
            this.pedalEditNo = no
            let idx = no - 1
            this.editName = this.pedals[idx].name
            this.editBrand = this.pedals[idx].brand
        },
        saveEdit: function () {
            let idx = this.pedalEditNo - 1
            Vue.set(this.pedals,
                idx,
                {no: this.pedalEditNo, name: this.editName, brand: this.editBrand}
            )
        },
        handleDestroy: function (no) {
            let idx = no - 1
            //  削除した要素以降の要素のnoを1つづつ繰り下げる
            let newNoPedals = this.pedals.slice(idx + 1).map(function (pedal) {
                let newNo = pedal.no - 1
                return { no: newNo, name: pedal.name, brand: pedal.brand }
            })
            this.pedals = this.pedals.slice(0, idx).concat(newNoPedals)
            this.no -= 1
        },
        submitPedal: function () {
            var csrfToken = $("[name=csrfmiddlewaretoken]").val();
            axios.post(
                'http://127.0.0.1:8000/tones/test/',
                {
                    data: {
                        pedals: this.pedals
                    }
                }, {
                    headers: {"X-CSRFToken": csrfToken}
                }
                
            )
                .then(response => {
                console.log(response)
            })
        }
    }
})


