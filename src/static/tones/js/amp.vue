<template>
  <div class="card">
    <div class="card-body" style="height: 20rem;">
      <h5>アンプ</h5>
      Name: {{ name }}
      <br>
      Brand: {{ brand }}
      <br>
      Type: {{ type }}
      <br>
      <button
        type="button"
        class="btn btn-success"
        data-toggle="modal"
        data-target="#ampEditModal"
        @click="editAmp"
      >Edit</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["name", "brand", "type"],
  methods: {
    editAmp: function() {
      this.$emit("edit-amp");
    }
  }
};
</script>

Vue.component('amp', {
    
    template: `
    
    `
})