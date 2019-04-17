<template>
  <div>
    <p>プリセット名</p>
    <h4>{{ name }}</h4>
    <span class="edit" data-toggle="modal" data-target="#toneNameEditModal" @click="editToneName">変更</span>
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