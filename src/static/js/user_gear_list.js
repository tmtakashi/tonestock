Vue.component('gear', {
    props: ['name', 'brand', 'type'],
    template: `
    <div class="card mt-3 mr-2 gear-card">
        <div class="card-body">
            <div class="options">
                <i class="fas fa-chevron-down" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"></i>
                <div class="dropdown-menu">
                    <a class="dropdown-item" href="#" @click="edit">編集</a>
                    <a class="dropdown-item" href="#" @click="destroy">削除</a>
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
            this.$emit('edit')
        },
        destroy: function () {
            this.$emit('destroy')
        }
    }
})

new Vue({
    el: '#add-instrument',
    data: {
        addInstrumentName: '',
        addInstrumentBrand: '',
        addInstrumentType: 'ギター',
        instruments: []
    },
    beforeMount() {
        var instrumentList = JSON.parse(document.getElementById('add-instrument').getAttribute('data') || '{}').instruments
        this.instruments = instrumentList
        console.log(this.instruments)
    },
    methods: {
        handleEdit: function () {
        },
        addInstrument: function () {
            var newInstrument = {
                name: this.addInstrumentName,
                brand: this.addInstrumentName,
                type: this.addInstrumentType,
            }
            this.instruments.unshift(newInstrument)
            console.log(this.instruments)
            var csrfToken = $("[name=csrfmiddlewaretoken]").val();
            axios.post('http://127.0.0.1:8000/instruments/add/',
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