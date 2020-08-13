<template>
  <!-- <transition name="slide-fade" mode="out-in"> -->
  <!-- <transition name="slide-l"> -->
  <div class="content" tag="div">
    <transition-group name="list" class="row" tag="div">
      <div class="col" v-for="(element, index) in toDo" :key="element.title">
        <ToDoElem
          :title="element.title"
          :list="element.list ? element.list.slice(0, 5) : ''"
          :index="index"
        />
      </div>
    </transition-group>
  </div>
  <!-- </transition> -->
</template>

<script>
import ToDoElem from "@/components/ToDoElem.vue";

export default {
  name: "Home",
  components: {
    ToDoElem
  },
  computed: {
    toDo() {
      return this.$store.state.toDoList;
    }
  }
  // watch: {
  //   // Add ask of name and then set_ai_msg
  //   toDoLength(val, old) {
  //     console.log(val, old);
  //     if (!val)
  //       this.$store.commit("SET_AI_MSG", "Add a new note to get started.");
  //     else this.$store.commit("SET_AI_MSG", null);
  //   }
  // }
};
</script>
<style></style>
