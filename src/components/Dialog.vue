<template>
  <dialog class="modal">
    <div class="modal-card">
      <div class="modal-card-title">
        <h3>{{ msg }}</h3>
      </div>
      <div class="modal-card-actions">
        <button
          ref="btn0"
          class="btn-warning btn-icon sm-icon"
          @click="answerDialog(false)"
        >
          <i class="fas fa-times"></i>
        </button>
        <button
          ref="btn1"
          class="btn-succes btn-icon sm-icon"
          @click="answerDialog(true)"
        >
          <i class="fas fa-check"></i>
        </button>
      </div>
    </div>
  </dialog>
</template>

<script>
export default {
  props: {
    msg: String,
    answer: Boolean
  },
  methods: {
    answerDialog(answer) {
      this.$store.commit("DIALOG_ANSWER", answer);
    },
    changeFocus() {
      this.$refs.btn0.focus();
    },
    changeFocusPrev() {
      this.$refs.btn1.focus();
    }
  }
};
</script>
