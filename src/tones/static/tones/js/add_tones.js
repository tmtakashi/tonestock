// ============TONE NAME===============
Vue.component('tone-name', {
    props: ['name'],
    template: `
    <div>
        <p>プリセット名</p>
        <h4>{{ name }}</h4>
        <span
        class="edit"
        data-toggle="modal"
        data-target="#toneNameEditModal"
        @click="editToneName">変更</span>
    </div>
    `,
    methods: {
        editToneName: function () {
            this.$emit("edit-tone-name")
        }
    }
})

// ============INSTRUMENT===============
Vue.component('instrument', {
    props: ['name', 'brand', 'type'],
    template: `
    <div class="card">
        <div class="card-body" style="height: 20rem;">
            <h5>楽器</h5>
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
    props: ['no', 'name', 'brand', 'type'],
    template: `
    <li class="list-inline-item">
        <div class="card">
            <div class="card-body">
                <div class="options">
                    <i class="fas fa-chevron-down" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"></i>
                    <div class="dropdown-menu">
                        <a data-toggle="modal"
                        data-target="#pedalEditModal" 
                        class="dropdown-item"
                        @click="editPedal">編集</a>
                        <a class="dropdown-item" 
                        @click="destroy">削除</a>
                    </div>
                </div>
                Name: {{ name }}<br>
                Brand: {{ brand }}<br>
                Type: {{ type }}<br>
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

// ============AMP===============
Vue.component('amp', {
    props: ['name', 'brand', 'type'],
    template: `
    <div class="card">
        <div class="card-body" style="height: 20rem;">
            <h5>アンプ</h5>
            Name: {{ name }}<br>
            Brand: {{ brand }}<br>
            Type: {{ type }}<br>
            <button type='button' 
            class="btn btn-success"
            data-toggle="modal"
            data-target="#ampEditModal"
            @click="editAmp">Edit</button>
        </div>
    </div>
    `,
    methods: {
        editAmp: function () {
            this.$emit("edit-amp")
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
        instrumentType: 'Guitar',
        editInstrumentName: '',
        editInstrumentBrand: '',
        editInstrumentType: '',
        // ----PEDAL----
        no: 0,
        addPedalName: '',
        addPedalBrand: '',
        addPedalType: 'Stomp Box',
        editPedalName: '',
        editPedalBrand: '',
        editPedalType: '',
        pedals: [],
        pedalEditNo: 0,
        // ---- AMP ----
        ampName: 'Untitled Name',
        ampBrand: 'Untitled Brand',
        ampType: 'Solid State',
        editAmpName: '',
        editAmpBrand: '',
        editAmpType: '',
    },
    methods: {
        // ---- TONE NAME ----
        handleEditToneName: function () {
            this.editToneName = this.toneName
            console.log(this.editToneName)
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
            this.pedals.push({ no: this.no += 1, name: this.addPedalName, brand: this.addPedalBrand, type: this.addPedalType })
            this.addPedalName = ''
            this.addPedalBrand = ''
            this.addPedalType = 'Stomp Box'
        },
        handleEditPedal: function (no) {
            this.pedalEditNo = no
            let idx = no - 1
            this.editName = this.pedals[idx].name
            this.editPedalBrand = this.pedals[idx].brand
            this.editPedalType = this.pedals[idx].type
        },
        savePedalEdit: function () {
            let idx = this.pedalEditNo - 1
            Vue.set(this.pedals,
                idx,
                {no: this.pedalEditNo, name: this.editPedalName, brand: this.editPedalBrand, type: this.editPedalType}
            )
        },
        handleDestroy: function (no) {
            let idx = no - 1
            //  削除した要素以降の要素のnoを1つづつ繰り下げる
            let newNoPedals = this.pedals.slice(idx + 1).map(function (pedal) {
                let newNo = pedal.no - 1
                return { no: newNo, name: pedal.name, brand: pedal.brand, type: pedal.type }
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
                    return { no: newNo, name: pedal.name, brand: pedal.brand, type: pedal.type }
                })
                this.pedals = this.pedals.slice(0, newIndex + 1)
                    .concat(newNoPedals)
                    .concat(this.pedals.slice(oldIndex + 1))
            } else if (newIndex > oldIndex) {
                let newNoPedals = this.pedals.slice(oldIndex, newIndex).map(function (pedal) {
                    let newNo = pedal.no - 1
                    return { no: newNo, name: pedal.name, brand: pedal.brand, type: pedal.type }
                })
                this.pedals = this.pedals.slice(0, oldIndex)
                    .concat(newNoPedals)
                    .concat(this.pedals.slice(newIndex))
            }
        },
        // ---- AMP ----
        handleEditAmp: function () {
            this.editAmpName = this.ampName
            this.editAmpBrand = this.ampBrand
            this.editAmpType = this.ampType
        },
        saveAmpEdit: function () {
            this.ampName = this.editAmpName
            this.ampBrand = this.editAmpBrand
            this.ampType = this.editAmpType
        },
        submit: function () {
            var csrfToken = $("[name=csrfmiddlewaretoken]").val();
            axios.post(
                'http://127.0.0.1:8000/tones/add_tone/',
                {   
                    name: this.toneName,
                    instrument: {
                        name: this.instrumentName,
                        brand: this.instrumentBrand,
                        type: this.instrumentType
                    },
                    pedals: this.pedals,
                    amp: {
                        name: this.ampName,
                        brand: this.ampBrand,
                        type: this.ampType
                    },
                }, {
                    headers: {"X-CSRFToken": csrfToken}
                }
            )
                .then(response => {
                window.location.href = response.data.redirect_url
            })
        }
    }
})


