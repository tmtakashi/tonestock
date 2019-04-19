<template>
  <div class="col-sm-4 my-5">
    <div class="card tone-card">
      <div class="card-body">
        <div class="options">
          <i
            class="fas fa-chevron-down"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="true"
          ></i>
          <div class="dropdown-menu">
            <a class="dropdown-item" :href="editLink">編集</a>
            <span
              class="dropdown-item"
              @click="destroy"
              data-toggle="modal"
              data-target="#deleteToneModal"
            >削除</span>
          </div>
        </div>
        <h5>
          <a class="tone-name" :href="detailLink">{{ name }}</a>
        </h5>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["name", "index", "pk"],
  methods: {
    destroy: function() {
      this.$emit("destroy", this.index);
    }
  },
  computed: {
    editLink: function() {
      return `/tones/${this.pk}/edit/`;
    },
    detailLink: function() {
      return `/tones/${this.pk}/detail/`;
    }
  }
};
</script>