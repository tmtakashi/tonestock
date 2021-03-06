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
import { throws } from 'assert';

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
            addPedalParams: [],
            editPedalName: '',
            editPedalBrand: '',
            editPedalType: '',
            editPedalParams: [],
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
                this.pedals.push({
                    no: this.no += 1,
                    name: this.addPedalName,
                    brand: this.addPedalBrand,
                    type: this.addPedalType,
                    params: this.addPedalParams
                })
                this.addPedalName = ''
                this.addPedalBrand = ''
                this.addPedalType = 'Stomp Box'
                this.addPedalParams = []
            },
            handleEditPedal: function (no) {
                this.pedalEditNo = no
                let idx = no - 1
                this.editPedalName = this.pedals[idx].name
                this.editPedalBrand = this.pedals[idx].brand
                this.editPedalType = this.pedals[idx].type
                this.editPedalParams = this.pedals[idx].params
            },
            savePedalEdit: function () {
                let idx = this.pedalEditNo - 1
                Vue.set(this.pedals,
                    idx,
                    {
                        no: this.pedalEditNo,
                        name: this.editPedalName,
                        brand: this.editPedalBrand,
                        type: this.editPedalType,
                        params: this.editPedalParams
                    }
                )
            },
            handleDestroy: function (no) {
                let idx = no - 1
                //  削除した要素以降の要素のnoを1つづつ繰り下げる
                let newNoPedals = this.pedals.slice(idx + 1).map(function (pedal) {
                    let newNo = pedal.no - 1
                    return { no: newNo, name: pedal.name, brand: pedal.brand, type: pedal.type, params: pedal.params}
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
                        return { no: newNo, name: pedal.name, brand: pedal.brand, type: pedal.type, params: pedal.params }
                    })
                    this.pedals = this.pedals.slice(0, newIndex + 1)
                        .concat(newNoPedals)
                        .concat(this.pedals.slice(oldIndex + 1))
                } else if (newIndex > oldIndex) {
                    let newNoPedals = this.pedals.slice(oldIndex, newIndex).map(function (pedal) {
                        let newNo = pedal.no - 1
                        return { no: newNo, name: pedal.name, brand: pedal.brand, type: pedal.type, params: pedal.params }
                    })
                    this.pedals = this.pedals.slice(0, oldIndex)
                        .concat(newNoPedals)
                        .concat(this.pedals.slice(newIndex))
                }
            },
            addParamAdd: function () {
                this.addPedalParams.push({
                    name: '',
                    value: 0
                })
            },
            addParamEdit: function () {
                this.editPedalParams.push({
                    name: '',
                    value: 0
                })
            },
            deleteParamAdd: function (index) {
                this.addPedalParams.splice(index, 1)
            },
            deleteParamEdit: function (index) {
                this.editPedalParams.splice(index, 1)
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
            addPedalParams: [],
            editPedalName: '',
            editPedalBrand: '',
            editPedalType: '',
            editPedalParams: [],
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
                this.pedals.push({
                    no: this.no += 1,
                    name: this.addPedalName,
                    brand: this.addPedalBrand,
                    type: this.addPedalType,
                    params: this.addPedalParams,
                })
                this.addPedalName = ''
                this.addPedalBrand = ''
                this.addPedalType = 'Stomp Box'
                this.addPedalParams = []
            },
            handleEditPedal: function (no) {
                this.pedalEditNo = no
                let idx = no - 1
                this.editName = this.pedals[idx].name
                this.editPedalBrand = this.pedals[idx].brand
                this.editPedalType = this.pedals[idx].type
                this.editPedalParams = this.pedals[idx].params
            },
            savePedalEdit: function () {
                let idx = this.pedalEditNo - 1
                Vue.set(this.pedals,
                    idx,
                    {
                        no: this.pedalEditNo,
                        name: this.editPedalName,
                        brand: this.editPedalBrand,
                        type: this.editPedalType,
                        params: this.editPedalParams
                    }
                )
            },
            handleDestroy: function (no) {
                let idx = no - 1
                //  削除した要素以降の要素のnoを1つづつ繰り下げる
                let newNoPedals = this.pedals.slice(idx + 1).map(function (pedal) {
                    let newNo = pedal.no - 1
                    return { no: newNo, name: pedal.name, brand: pedal.brand, type: pedal.type, params: pedal.params }
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
                        return { no: newNo, name: pedal.name, brand: pedal.brand, type: pedal.type, params: pedal.params }
                    })
                    this.pedals = this.pedals.slice(0, newIndex + 1)
                        .concat(newNoPedals)
                        .concat(this.pedals.slice(oldIndex + 1))
                } else if (newIndex > oldIndex) {
                    let newNoPedals = this.pedals.slice(oldIndex, newIndex).map(function (pedal) {
                        let newNo = pedal.no - 1
                        return { no: newNo, name: pedal.name, brand: pedal.brand, type: pedal.type, params: pedal.params }
                    })
                    this.pedals = this.pedals.slice(0, oldIndex)
                        .concat(newNoPedals)
                        .concat(this.pedals.slice(newIndex))
                }
            },
            addParamAdd: function () {
                this.addPedalParams.push({
                    name: '',
                    value: 0
                })
            },
            addParamEdit: function () {
                this.editPedalParams.push({
                    name: '',
                    value: 0
                })
            },
            deleteParamAdd: function (index) {
                this.addPedalParams.splice(index, 1)
            },
            deleteParamEdit: function (index) {
                this.editPedalParams.splice(index, 1)
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
                var csrfToken = $("[name=csrfmiddlewaretoken]").val();
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
                var csrfToken = $("[name=csrfmiddlewaretoken]").val();
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
            usernameTmp: '',
            userImgUrlTmp: '',
            pk: 0,
            edit: false,
        },
        beforeMount() {
            var profile_info = JSON.parse(document.getElementById('userprofile').getAttribute('data') || '{}')
            this.info = profile_info
            this.usernameTmp = this.info.username

            const profile_icon_url = "/static/images/profile.svg"
            if (this.info.image_url !== null) {
                this.userImgUrlTmp = this.info.image_url
            } else {
                this.userImgUrlTmp = profile_icon_url
            }
        },
        methods: {
            toggleEditMode: function () {
                this.edit = !this.edit
            },
            saveEdit: function () {
                if (this.usernameTmp.length === 0) {
                    $(".alert").addClass('show')
                } else {
                    this.edit = !this.edit
                    this.$set(this.info, "username", this.usernameTmp)
                    this.$set(this.info, "image_url", this.userImgUrlTmp)
                }
                var csrfToken = $("[name=csrfmiddlewaretoken]").val();
                axios.post(`/users/edit/${this.info.pk}/`,
                    this.info,
                    {
                        headers: {"X-CSRFToken": csrfToken}
                    } 
                )
            },
            cancel: function () {
                this.edit = !this.edit
                this.usernameTmp = this.info.username
                if (this.info.image_url !== null) {
                    this.userImgUrlTmp = this.info.image_url
                } else {
                    this.userImgUrlTmp = profile_icon_url
                }
            },
            onFileChange(e) {
                let files = e.target.files || e.dataTransfer.files;
                this.createImage(files[0]);
              },
            // アップロードした画像を表示
            createImage(file) {
                let reader = new FileReader();
                reader.onload = (e) => {
                    this.userImgUrlTmp = e.target.result
                };
                reader.readAsDataURL(file);
            },
        }
    })
}
if (document.getElementById('tone-comment') != null) {
    new Vue({
        el: '#tone-detail',
        components: {
            "knob-control": KnobControl
        },
        data: {
            instrument: {
                name: '',
                brand: '',
                type: '',
            },
            pedals: [],
            amp: {
                name: '',
                brand: '',
                type: '',
            }
        },
        beforeMount() {
            var info = JSON.parse(document.getElementById('tone-detail').getAttribute('data') || '{}')
            this.instrument = info.instrument
            this.pedals = info.pedals
            this.amp = info.amp
        },
    })
}

if (document.getElementById('tone-comment') != null) {
    new Vue({
        el: '#tone-comment',
        data: {
            currentUsername: '',
            comments: [],
            text: '',
            pk: 0,
            deleteIdx: 0,
            deletable: false,
        },
        beforeMount() {
            var info = JSON.parse(document.getElementById('tone-comment').getAttribute('data') || '{}')
            var comments = info.comments
            var pk = info.pk
            this.comments = comments
            this.pk = pk
            this.currentUsername = info.current_username
            this.deletable = info.deletable
        },
        methods: {
            postComment: function () {
                if (this.text.length === 0) {
                    return false
                }
                var self = this
                var csrfToken = $("[name=csrfmiddlewaretoken]").val();
                axios.post('/tones/post_comment/',
                    {
                        "text": self.text,
                        "pk": self.pk
                    },
                    {
                        headers: {"X-CSRFToken": csrfToken}
                    } 
                ).then(function (response) {
                    self.comments.push({
                        username: self.currentUsername,
                        text: self.text,
                        pk: response.data.pk
                    })
                    self.text = ''
                })
            },
            confirmDelete: function (index) {
                this.deleteIdx = index
            },
            executeDelete: function () {
                var self = this
                var targetComment = this.comments[this.deleteIdx]
                var pk = targetComment.pk
                var csrfToken = $("[name=csrfmiddlewaretoken]").val()
                axios.post('/tones/delete_comment/',
                    {
                        pk: pk
                    },
                    {
                        headers: { "X-CSRFToken": csrfToken }
                    } 
                ).then(function (response) {
                    self.comments.splice(self.deleteIndex, 1)
                })
            }
        }
    })
}