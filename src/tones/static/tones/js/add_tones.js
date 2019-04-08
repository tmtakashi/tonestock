// ============TONE NAME===============
Vue.component('tone-name', {
    props: ['name'],
    template: `
    <div>
        <p>プリセット名</p>
        <h4>{{ name }}</h4>
        <button type='button' 
        class="btn btn-success"
        data-toggle="modal"
        data-target="#toneNameEditModal"
        @click="editToneName">Edit</button>
    </div>
    `,
    methods: {
        editToneName: function () {
            this.$emit("editToneName")
        }
    }
})

// ============INSTRUMENT===============
Vue.component('instrument', {
    props: ['name', 'brand', 'type'],
    template: `
    <div class="card">
        <div class="card-body" style="height: 20rem;">
            Name: {{ name }}<br>
            Brand: {{ brand }}<br>
            Type: {{ type }}<br>
            <button type='button' 
            class="btn btn-success"
            data-toggle="modal"
            data-target="#instrumentEditModal"
            @click="editInstrument">Edit</button>
        </div>
    </div>
    `,
    methods: {
        editInstrument: function () {
            this.$emit("edit-instrument")
        }
    }
})

// ==============PEDAL=================

Vue.component('pedal-item', {
    props: ['no', 'name', 'brand'],
    template: `
    <li class="list-inline-item">
        <div class="card">
            <div class="card-body">
                Name: {{ name }}<br>
                Brand: {{ brand }}<br>
                <button type='button' 
                class="btn btn-success"
                data-toggle="modal"
                data-target="#pedalEditModal"
                @click="editPedal">Edit</button>
                <button type='button' 
                class="btn btn-danger"
                @click="destroy">Delete</button>
            </div>
        </div>
    </li>
    `,
    methods: {
        editPedal: function () {
            this.$emit("edit-pedal", this.no)
        },
        destroy: function () {
            this.$emit("destroy", this.no)
        }
    }
})

// ===========PARENT COMPONENT============

new Vue({
    el: '#add-tone',
    data: {
        // ---- TONE NAME ----
        toneName: 'Untitled Tone',
        editToneName: '',
        // ---- INSTRUMENT ----
        instrumentName: 'Untitled Name',
        instrumentBrand: 'Untitled Brand',
        instrumentType: 'Bass',
        editInstrumentName: '',
        editInstrumentBrand: '',
        editInstrumentType: '',
        // ----PEDAL----
        no: 0,
        addPedalName: '',
        addPedalBrand: '',
        editPedalName: '',
        editPedalBrand: '',
        pedals: [],
        pedalEditNo: 0 
    },
    methods: {
        // ---- TONE NAME ----
        handleEditToneName: function () {
            this.editToneName = this.toneName
        },
        saveToneNameEdit: function () {
            this.toneName = this.editToneName
        },
        // ---- INSTRUMENT ----
        handleEditInstrument: function () {
            this.editInstrumentName = this.instrumentName
            this.editInstrumentBrand = this.instrumentBrand
            this.editInstrumentType = this.instrumentType
        },
        saveInstrumentEdit: function () {
            this.instrumentName = this.editInstrumentName
            this.instrumentBrand = this.editInstrumentBrand
            this.instrumentType = this.editInstrumentType
        },
        // ----PEDAL----
        addPedal: function () {
            this.pedals.push({ no: this.no += 1, name: this.addPedalName, brand: this.addPedalBrand })
            this.addPedalName = ''
            this.addPedalBrand = ''
        },
        handleEditPedal: function (no) {
            this.pedalEditNo = no
            let idx = no - 1
            this.editName = this.pedals[idx].name
            this.editPedalBrand = this.pedals[idx].brand
        },
        savePedalEdit: function () {
            let idx = this.pedalEditNo - 1
            Vue.set(this.pedals,
                idx,
                {no: this.pedalEditNo, name: this.editPedalName, brand: this.editPedalBrand}
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
        reorderAfterDrag: function (event) {
            let newIndex = event.newIndex
            let oldIndex = event.oldIndex
            this.pedals[newIndex].no = newIndex + 1
            if (newIndex < oldIndex) {
                let newNoPedals = this.pedals.slice(newIndex + 1, oldIndex + 1).map(function (pedal) {
                    let newNo = pedal.no + 1
                    return { no: newNo, name: pedal.name, brand: pedal.brand }
                })
                this.pedals = this.pedals.slice(0, newIndex + 1)
                    .concat(newNoPedals)
                    .concat(this.pedals.slice(oldIndex + 1))
            } else if (newIndex > oldIndex) {
                let newNoPedals = this.pedals.slice(oldIndex, newIndex).map(function (pedal) {
                    let newNo = pedal.no - 1
                    return { no: newNo, name: pedal.name, brand: pedal.brand }
                })
                this.pedals = this.pedals.slice(0, oldIndex)
                    .concat(newNoPedals)
                    .concat(this.pedals.slice(newIndex))
            }
        },
        submitPedal: function () {
            var csrfToken = $("[name=csrfmiddlewaretoken]").val();
            axios.post(
                'http://127.0.0.1:8000/tones/test/',
                {
                    instrument: {
                        name: this.instrumentName,
                        brand: this.instrumentBrand,
                        type: this.instrumentType
                    },
                    pedals: this.pedals
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


