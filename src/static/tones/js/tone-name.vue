<template>
  <div>
    <p>プリセット名</p>
    <h4>{{ name }}</h4>
    <button
      class="edit btn btn-outline-success"
      data-toggle="modal"
      data-target="#toneNameEditModal"
      @click="editToneName"
    >編集</button>
  </div>
</template>

<script>
export default {
  props: ["name"],
  methods: {
    editToneName: function() {
      this.$emit("edit-tone-name");
    }
  }
};
</script>