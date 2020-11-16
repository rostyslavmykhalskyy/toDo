<template>
  <li :class="{ disableChanges }">
    <label
      class="container-task"
      @mouseover="disableChanges ? '' : (deleteButtonShow = true)"
      @mouseleave="deleteButtonShow = false"
    >
      <input
        v-if="modify"
        @blur="modifyTextTaskElement(index)"
        @keyup.enter="modifyTextTaskElement(index)"
        ref="text"
        type="text"
        :value="text"
      />
      <p v-else @click="disableChanges ? '' : (modify = true)">
        {{ text }}
      </p>
      <input
        :checked="complete"
        @change="changeCompleteTaskElement(!complete, index)"
        type="checkbox"
        :disabled="disableChanges"
      />
      <span class="checkmark"></span>
      <button
        v-if="deleteButtonShow"
        class="btn-icon sm-icon"
        @click="deleteTaskElement(index)"
      >
        <i class="delete"></i>
      </button>
    </label>
  </li>
</template>

<script>
export default {
  props: {
    disableChanges: Boolean,
    complete: Boolean,
    text: String,
    index: Number
  },
  data() {
    return {
      modify: false,
      deleteButtonShow: false
    };
  },
  methods: {
    changeCompleteTaskElement(value, index) {
      this.$store.commit("CHANGE_COMPLETE", { value, index });
    },
    modifyTextTaskElement(index) {
      if (this.$refs.text.value.length) {
        this.$store.commit("MODIFY_TEXT", {
          value: this.$refs.text.value,
          index
        });
      } else {
        this.deleteTaskElement(index);
      }
      this.modify = false;
    },
    deleteTaskElement(index) {
      this.$store.commit("DELETE_TODO_TASK_ELEMENT", index);
    }
  }
};
</script>

<style lang="scss" scoped>
.disableChanges {
  span {
    &:active,
    &:hover,
    &:focus {
      box-shadow: 5px 5px 15px #0000001a, -5px -5px 15px #ffffffcb;
    }
    animation: unset;
  }
  .container-task {
    padding-bottom: 0;
    margin-bottom: 1.5rem;
  }
  label {
    cursor: unset;
  }
  .checkmark {
    height: 40px;
    width: 40px;
  }
}
</style>
