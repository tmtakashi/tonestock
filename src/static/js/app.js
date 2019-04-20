window.Vue = require('vue');

import draggable from 'vuedraggable'
import KnobControl from 'vue-knob-control'

import ToneName from '../tones/js/tone-name'
import ToneInstrument from '../tones/js/tone-instrument'
import TonePedalItem from '../tones/js/tone-pedal-item'
import ToneAmp from '../tones/js/tone-amp'
import ToneCard from '../tones/js/tone-card'

import GearInstrument from './gear-instrument'
import GearPedal from './gear-pedal'
import GearAmp from './gear-amp'

import UsernameInput from '../users/js/username-input'

// ==================== EDIT TONE ======================

if (document.getElementById('edit-tone') != null) {
    new Vue({
        el: '#edit-tone',
        components: {
            "tone-name": ToneName,
            "instrument": ToneInstrument,
            "pedal-item": TonePedalItem,
            "amp": ToneAmp,
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
            ampBass: 0,
            ampMiddle: 0,
            ampTreble: 0,
            ampPresence: 0,
            ampDrive: 0,
            ampMaster: 0,
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
            this.ampBass = toneInfo.amp.bass,
            this.ampMiddle = toneInfo.amp.middle,
            this.ampTreble = toneInfo.amp.treble,
            this.ampPresence = toneInfo.amp.presence,
            this.ampDrive = toneInfo.amp.drive,    
            this.ampMaster = toneInfo.amp.master
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
                            type: this.ampType,
                            bass: this.ampBass,
                            middle: this.ampMiddle,
                            treble: this.ampTreble,
                            presence: this.ampPresence,
                            drive: this.ampDrive,
                            master: this.ampMaster
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
}

// ==================== ADD TONE ======================

if (document.getElementById('add-tone') != null) {
    new Vue({
        el: '#add-tone',
        components: {
            "tone-name": ToneName,
            "instrument": ToneInstrument,
            "pedal-item": TonePedalItem,
            "amp": ToneAmp,
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
                            type: this.ampType,
                            bass: this.ampBass,
                            middle: this.ampMiddle,
                            treble: this.ampTreble,
                            presence: this.ampPresence,
                            drive: this.ampDrive,
                            master: this.ampMaster
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
}

// ==================== GEAR LIST ======================
if (document.getElementById('instrument-list') != null) {
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
        components: {
            'instrument': GearInstrument
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
                var csrfToken = $("[name=csrfmiddlewaretoken]").val();
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
                var csrfToken = $("[name=csrfmiddlewaretoken]").val();
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
}

if (document.getElementById('pedal-list') != null) {
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
        components :{
            'pedal': GearPedal
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
                var csrfToken = $("[name=csrfmiddlewaretoken]").val();
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
}

if (document.getElementById('amp-list') != null) {
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
        components : {
            'amp': GearAmp
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
                var csrfToken = $("[name=csrfmiddlewaretoken]").val();
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
                var csrfToken = $("[name=csrfmiddlewaretoken]").val();
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
}

// ==================== USER TONE LIST ======================
if (document.getElementById('user-tone-list') != null) {
    new Vue({
        el: '#user-tone-list',
        data: {
            destroyIndex: 0,
            tones: []
        },
        components: {
            "tone-card": ToneCard
        },
        beforeMount() {
            var toneList = JSON.parse(document.getElementById('user-tone-list').getAttribute('data') || '{}').tones
            this.tones = toneList
        },
        methods: {
            confirmDestroy: function (index) {
                var targetName = this.tones[index].name
                $('#deletingToneName').text(targetName)
                this.destroyIndex = index
            },
            executeDestroy: function () {
                var targetTone = this.tones[this.destroyIndex]
                const pk = targetTone.pk
                var csrfToken = $("[name=csrfmiddlewaretoken]").val();
                axios.post(`/tones/${pk}/delete/`,
                    {},
                    {
                        headers: { "X-CSRFToken": csrfToken }
                    } 
                )
                this.tones.splice(this.destroyIndex, 1)
            },
        }
    })
}

if (document.getElementById('userprofile') != null) {
    new Vue({
        el: "#userprofile",
        data: {
            info: {},
            edit: false,
        },
        beforeMount() {
            var profile_info = JSON.parse(document.getElementById('userprofile').getAttribute('data') || '{}')
            this.info = profile_info
        },
        methods: {
            toggleEditMode: function () {
                this.edit = !this.edit
            },
            editUsername: function (event) {
                this.$set(this.info, "username", event.target.value)
                console.log(this.info.username)
            }
        }
    })
}