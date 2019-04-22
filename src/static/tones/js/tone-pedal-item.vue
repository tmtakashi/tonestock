<template>
  <li class="list-inline-item">
    <div class="card">
      <div class="card-body">
        <div>
          <i class="fas fa-grip-lines handle"></i>
          <div class="options">
            <i
              class="fas fa-chevron-down"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="true"
            ></i>
            <div class="dropdown-menu">
              <a
                data-toggle="modal"
                data-target="#pedalEditModal"
                class="dropdown-item"
                @click="editPedal"
              >編集</a>
              <a class="dropdown-item" @click="destroy">削除</a>
            </div>
          </div>
        </div>
        Name: {{ name }}
        <br>
        Brand: {{ brand }}
        <br>
        Type: {{ type }}
        <br>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: ["no", "name", "brand", "type"],
  methods: {
    editPedal: function() {
      this.$emit("edit-pedal", this.no);
    },
    destroy: function() {
      this.$emit("destroy", this.no);
    }
  }
};
</script>

<style scoped>
.handle {
  cursor: move;
}
</style>
