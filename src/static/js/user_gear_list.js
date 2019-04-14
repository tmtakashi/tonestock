var csrfToken = $("[name=csrfmiddlewaretoken]").val();

Vue.component('gear', {
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
    el: '#add-instrument',
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
        var instrumentList = JSON.parse(document.getElementById('add-instrument').getAttribute('data') || '{}').instruments
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
            console.log(csrfToken)
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
            axios.post('/instruments/add/',
                newInstrument,
                {
                    headers: {"X-CSRFToken": csrfToken}
                } 
            )
        }
    }
})

// // Pedal
// pedalName: '',
// pedalBrand: '',
// pedalType: 'Stomp Box',
// // Amp
// ampName: '',
// ampBrand: '',
// ampType: 'Tube',