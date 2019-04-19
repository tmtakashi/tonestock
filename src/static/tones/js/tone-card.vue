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
            <a class="dropdown-item" href="{% url 'tones:edit_tone' tone.pk %}">編集</a>
            <span
              class="dropdown-item"
              @click="destroy"
              data-toggle="modal"
              data-target="#deleteToneModal"
            >削除</span>
          </div>
        </div>
        <h5>
          <a class="tone-name" href="{% url 'tones:detail' tone.pk %}">{{ name }}</a>
        </h5>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["name", "index"],
  methods: {
    destroy: function() {
      this.$emit("destroy", this.index);
    }
  }
};
</script>