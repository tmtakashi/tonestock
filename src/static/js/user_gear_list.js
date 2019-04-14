var csrfToken = $("[name=csrfmiddlewaretoken]").val();


//------------- INSTRUMENTS -------------
Vue.component('instrument', {
    props: ['name', 'brand', 'type', 'index'],
    template: `
    <div class="card mt-3 mr-2 gear-card">
        <div class="card-body">
            <div class="options">
                <i class="fas fa-chevron-down" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"></i>
                <div class="dropdown-menu">
                    <span
                    class="dropdown-item"
                    @click="edit"
                    data-toggle="modal"
                    data-target="#editInstrumentModal">編集</span>
                    <span class="dropdown-item"
                    @click="destroy"
                    data-toggle="modal"
                    data-target="#deleteInstrumentModal">削除</span>
                </div>
            </div>
            <h5 class="gear-name"><a href="{% url 'instruments:detail' instrument.pk %}">{{ name }}</a></h5>
            <small>{{ brand }}</small><br>
            <small>{{ type }}</small><br>
        </div>
    </div>
    `,
    methods: {
        edit: function () {
            this.$emit('edit', this.index)
        },
        destroy: function () {
            this.$emit('destroy', this.index)
        }
    }
})

new Vue({
    el: '#instrument-list',
    data: {
        addInstrumentName: '',
        addInstrumentBrand: '',
        addInstrumentType: 'ギター',
        editInstrumentName: '',
        editInstrumentBrand: '',
        editInstrumentType: '',
        editIndex: 0,
        destroyIndex: 0,
        instruments: []
    },
    beforeMount() {
        var instrumentList = JSON.parse(document.getElementById('instrument-list').getAttribute('data') || '{}').instruments
        this.instruments = instrumentList
    },
    methods: {
        handleEdit: function (index) {
            var targetInstrument = this.instruments[index]
            this.editInstrumentName = targetInstrument.name
            this.editInstrumentBrand = targetInstrument.brand
            this.editInstrumentType = targetInstrument.type
            this.editInstrumentPk = targetInstrument.pk
            this.editIndex = index
        },
        saveEdit: function () {
            var editedInstrument = {
                name: this.editInstrumentName,
                brand: this.editInstrumentBrand,
                type: this.editInstrumentType,
                pk: this.editInstrumentPk,
            }
            Vue.set(this.instruments,
                this.editIndex,
                editedInstrument
            )
            axios.post(`/instruments/${this.editInstrumentPk}/edit/`,
                editedInstrument,
                {
                    headers: {"X-CSRFToken": csrfToken}
                } 
            )
        },
        confirmDestroy: function (index) {
            var targetName = this.instruments[index].name
            $('#deletingInstrumentName').text(targetName)
            this.destroyIndex = index
        },
        executeDestroy: function () {
            var targetInstrument = this.instruments[this.destroyIndex]
            const pk = targetInstrument.pk
            axios.post(`/instruments/${pk}/delete/`,
                {},
                {
                    headers: { "X-CSRFToken": csrfToken }
                } 
            )
            this.instruments.splice(this.destroyIndex, 1)
        },
        addInstrument: function () {
            var newInstrument = {
                name: this.addInstrumentName,
                brand: this.addInstrumentBrand,
                type: this.addInstrumentType,
            }
            this.instruments.unshift(newInstrument)
            var instruments = this.instruments
            axios.post('/instruments/add/',
                newInstrument,
                {
                    headers: {"X-CSRFToken": csrfToken}
                } 
            ).then(function (response) {
                pk = response.data.pk
                newInstrument.pk = pk
                Vue.set(instruments, 0, newInstrument)
            })
        }
    }
})

//------------- PEDALS -------------
Vue.component('pedal', {
    props: ['name', 'brand', 'type', 'index'],
    template: `
    <div class="card mt-3 mr-2 gear-card">
        <div class="card-body">
            <div class="options">
                <i class="fas fa-chevron-down" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"></i>
                <div class="dropdown-menu">
                    <span
                    class="dropdown-item"
                    @click="edit"
                    data-toggle="modal"
                    data-target="#editPedalModal">編集</span>
                    <span class="dropdown-item"
                    @click="destroy"
                    data-toggle="modal"
                    data-target="#deletePedalModal">削除</span>
                </div>
            </div>
            <h5 class="gear-name"><a href="{% url 'pedals:detail' pedal.pk %}">{{ name }}</a></h5>
            <small>{{ brand }}</small><br>
            <small>{{ type }}</small><br>
        </div>
    </div>
    `,
    methods: {
        edit: function () {
            this.$emit('edit', this.index)
        },
        destroy: function () {
            this.$emit('destroy', this.index)
        }
    }
})

new Vue({
    el: '#pedal-list',
    data: {
        addPedalName: '',
        addPedalBrand: '',
        addPedalType: 'コンパクトエフェクター',
        editPedalName: '',
        editPedalBrand: '',
        editPedalType: '',
        editIndex: 0,
        destroyIndex: 0,
        pedals: []
    },
    beforeMount() {
        var pedalList = JSON.parse(document.getElementById('pedal-list').getAttribute('data') || '{}').pedals
        this.pedals = pedalList
    },
    methods: {
        handleEdit: function (index) {
            var targetPedal = this.pedals[index]
            this.editPedalName = targetPedal.name
            this.editPedalBrand = targetPedal.brand
            this.editPedalType = targetPedal.type
            this.editPedalPk = targetPedal.pk
            this.editIndex = index
        },
        saveEdit: function () {
            var editedPedal = {
                name: this.editPedalName,
                brand: this.editPedalBrand,
                type: this.editPedalType,
                pk: this.editPedalPk,
            }
            Vue.set(this.pedals,
                this.editIndex,
                editedPedal
            )
            axios.post(`/pedals/${this.editPedalPk}/edit/`,
                editedPedal,
                {
                    headers: {"X-CSRFToken": csrfToken}
                } 
            )
        },
        confirmDestroy: function (index) {
            var targetName = this.pedals[index].name
            $('#deletingPedalName').text(targetName)
            this.destroyIndex = index
        },
        executeDestroy: function () {
            var targetPedal = this.pedals[this.destroyIndex]
            const pk = targetPedal.pk
            console.log(csrfToken)
            axios.post(`/pedals/${pk}/delete/`,
                {},
                {
                    headers: { "X-CSRFToken": csrfToken }
                } 
            )
            this.pedals.splice(this.destroyIndex, 1)
        },
        addPedal: function () {
            var newPedal = {
                name: this.addPedalName,
                brand: this.addPedalBrand,
                type: this.addPedalType,
            }
            this.pedals.unshift(newPedal)
            var pedals = this.pedals
            axios.post('/pedals/add/',
                newPedal,
                {
                    headers: {"X-CSRFToken": csrfToken}
                } 
            ).then(function (response) {
                pk = response.data.pk
                newPedal.pk = pk
                Vue.set(pedals, 0, newPedal)
            })
        }
    }
})

//------------- AMPS -------------
Vue.component('amp', {
    props: ['name', 'brand', 'type', 'index'],
    template: `
    <div class="card mt-3 mr-2 gear-card">
        <div class="card-body">
            <div class="options">
                <i class="fas fa-chevron-down" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"></i>
                <div class="dropdown-menu">
                    <span
                    class="dropdown-item"
                    @click="edit"
                    data-toggle="modal"
                    data-target="#editAmpModal">編集</span>
                    <span class="dropdown-item"
                    @click="destroy"
                    data-toggle="modal"
                    data-target="#deleteAmpModal">削除</span>
                </div>
            </div>
            <h5 class="gear-name"><a href="{% url 'amps:detail' amp.pk %}">{{ name }}</a></h5>
            <small>{{ brand }}</small><br>
            <small>{{ type }}</small><br>
        </div>
    </div>
    `,
    methods: {
        edit: function () {
            this.$emit('edit', this.index)
        },
        destroy: function () {
            this.$emit('destroy', this.index)
        }
    }
})

new Vue({
    el: '#amp-list',
    data: {
        addAmpName: '',
        addAmpBrand: '',
        addAmpType: '真空管アンプ',
        editAmpName: '',
        editAmpBrand: '',
        editAmpType: '',
        editIndex: 0,
        destroyIndex: 0,
        amps: []
    },
    beforeMount() {
        var ampList = JSON.parse(document.getElementById('amp-list').getAttribute('data') || '{}').amps
        this.amps = ampList
    },
    methods: {
        handleEdit: function (index) {
            var targetAmp = this.amps[index]
            this.editAmpName = targetAmp.name
            this.editAmpBrand = targetAmp.brand
            this.editAmpType = targetAmp.type
            this.editAmpPk = targetAmp.pk
            this.editIndex = index
        },
        saveEdit: function () {
            var editedAmp = {
                name: this.editAmpName,
                brand: this.editAmpBrand,
                type: this.editAmpType,
                pk: this.editAmpPk,
            }
            Vue.set(this.amps,
                this.editIndex,
                editedAmp
            )
            axios.post(`/amps/${this.editAmpPk}/edit/`,
                editedAmp,
                {
                    headers: {"X-CSRFToken": csrfToken}
                } 
            )
        },
        confirmDestroy: function (index) {
            var targetName = this.amps[index].name
            $('#deletingAmpName').text(targetName)
            this.destroyIndex = index
        },
        executeDestroy: function () {
            var targetAmp = this.amps[this.destroyIndex]
            const pk = targetAmp.pk
            console.log(csrfToken)
            axios.post(`/amps/${pk}/delete/`,
                {},
                {
                    headers: { "X-CSRFToken": csrfToken }
                } 
            )
            this.amps.splice(this.destroyIndex, 1)
        },
        addAmp: function () {
            var newAmp = {
                name: this.addAmpName,
                brand: this.addAmpBrand,
                type: this.addAmpType,
            }
            this.amps.unshift(newAmp)
            var amps = this.amps
            axios.post('/amps/add/',
                newAmp,
                {
                    headers: {"X-CSRFToken": csrfToken}
                } 
            ).then(function (response) {
                pk = response.data.pk
                newAmp.pk = pk
                Vue.set(amps, 0, newAmps)
            })
        }
    }
})