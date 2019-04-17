window.Vue = require('vue');

import draggable from 'vuedraggable'
import KnobControl from 'vue-knob-control'
import ToneName from '../tones/js/tone-name'
import Instrument from '../tones/js/instrument'
import PedalItem from '../tones/js/pedal-item'
import Amp from '../tones/js/amp'

new Vue({
    el: '#edit-tone',
    components: {
        ToneName,
        Instrument,
        PedalItem,
        Amp,
        KnobControl,
        draggable
    },
    data: {
        pk: 0,
        // ---- TONE NAME ----
        toneName: '',
        editToneName: '',
        // ---- INSTRUMENT ----
        instrumentName: '',
        instrumentBrand: '',
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
        ampName: '',
        ampBrand: '',
        ampType: 'Solid State',
        editAmpName: '',
        editAmpBrand: '',
        editAmpType: '',
        someValue: 30
    },
    beforeMount() {
        var toneInfo = JSON.parse(document.getElementById('edit-tone').getAttribute('data') || '{}')
        this.pk = toneInfo.pk

        this.toneName = toneInfo.name
        
        this.instrumentName = toneInfo.instrument.name
        this.instrumentBrand = toneInfo.instrument.brand
        this.instrumentType = toneInfo.instrument.type

        this.no = toneInfo.no
        this.pedals = toneInfo.pedals

        this.ampName = toneInfo.amp.name
        this.ampBrand = toneInfo.amp.brand
        this.ampType = toneInfo.amp.type
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
                `/tones/${this.pk}/edit/`,
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

new Vue({
    el: '#add-tone',
    components: {
        ToneName,
        Instrument,
        PedalItem,
        Amp,
        KnobControl,
        draggable
    },
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
        ampType: 'Tube',
        editAmpName: '',
        editAmpBrand: '',
        editAmpType: '',
        ampBass: 0,
        ampMiddle: 0,
        ampTreble: 0,
        ampPresence: 0,
        ampDrive: 0,
        ampMaster: 0
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
                '/tones/add_tone/',
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

