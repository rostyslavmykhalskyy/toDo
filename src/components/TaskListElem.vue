<template>
  <li v-if="modify && !disableChanges">
    <div class="onBlack">
      <textarea ref="text" :value="text" />
      <div class="onBlack-actions">
        <button class="btn-primary" @click="modify = modifyIcon = false">
          <i class="fas fa-times"></i> Cancel
        </button>
        <button class="btn-succes" @click="modifyTextTaskElement(index)">
          <i class="fas fa-check"></i> Save
        </button>
        <button class="btn-warning" @click="deleteTaskElement(index)">
          <i class="fas fa-trash"></i> Delete
        </button>
      </div>
    </div>
    <div class="modal"></div>
  </li>
  <li v-else :class="{ disableChanges }">
    <label class="container-task">
      <p @mouseenter="modifyIcon = true" @mouseleave="modifyIcon = false">
        {{ text }}
        <i
          v-if="modifyIcon && !disableChanges"
          @click="modify = true"
          class="fas fa-pen"
        ></i>
      </p>
      <input
        :checked="complite"
        @change="changeCompliteTaskElement(!complite, index)"
        type="checkbox"
        :disabled="disableChanges"
      />
      <span class="checkmark"></span>
    </label>
  </li>
</template>

<script>
export default {
  props: {
    disableChanges: Boolean,
    complite: Boolean,
    text: String,
    index: Number
  },
  data() {
    return {
      modify: false,
      modifyIcon: false
    };
  },
  methods: {
    changeCompliteTaskElement(value, index) {
      this.$store.commit("CHANGE_COMPLITE", { value, index });
    },
    modifyTextTaskElement(index) {
      this.$store.commit("MODIFY_TEXT", {
        value: this.$refs.text.value,
        index
      });
      this.modify = this.modifyIcon = false;
    },
    deleteTaskElement(index) {
      this.$store.commit("DELETE_TODO_TASK_ELEMENT", index);
      this.modify = this.modifyIcon = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.disableChanges {
  span {
    &:active,
    &:hover {
      box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.55),
        -3px -3px 5px 0px rgba(255, 255, 255, 0.55);
    }
    animation: unset;
  }
  .container-task {
    padding-bottom: 0;
    margin-bottom: 0.7rem;
  }
  label {
    cursor: unset;
  }
}
</style>
