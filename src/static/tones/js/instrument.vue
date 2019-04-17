<template>
  <div class="card">
    <div class="card-body" style="height: 20rem;">
      <h5>楽器</h5>
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
        data-target="#instrumentEditModal"
        @click="editInstrument"
      >Edit</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["name", "brand", "type"],
  methods: {
    editInstrument: function() {
      this.$emit("edit-instrument");
    }
  }
};
</script>
