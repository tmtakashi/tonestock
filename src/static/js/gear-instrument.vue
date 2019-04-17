<template>
  <div class="card mt-3 mr-2 gear-card">
    <div class="card-body">
      <div class="options">
        <i
          class="fas fa-chevron-down"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="true"
        ></i>
        <div class="dropdown-menu">
          <span
            class="dropdown-item"
            @click="edit"
            data-toggle="modal"
            data-target="#editInstrumentModal"
          >編集</span>
          <span
            class="dropdown-item"
            @click="destroy"
            data-toggle="modal"
            data-target="#deleteInstrumentModal"
          >削除</span>
        </div>
      </div>
      <h5 class="gear-name">
        <a href="{% url 'instruments:detail' instrument.pk %}">{{ name }}</a>
      </h5>
      <small>{{ brand }}</small>
      <br>
      <small>{{ type }}</small>
      <br>
    </div>
  </div>
</template>

<script>
export default {
  props: ["name", "brand", "type", "index"],
  methods: {
    edit: function() {
      this.$emit("edit", this.index);
    },
    destroy: function() {
      this.$emit("destroy", this.index);
    }
  }
};
</script>