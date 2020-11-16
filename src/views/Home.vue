<template>
  <!-- <transition name="slide-fade" mode="out-in"> -->
  <!-- <transition name="slide-l"> -->
  <div class="content" tag="div">
    <transition-group name="list" class="row" tag="div">
      <div class="col" v-for="(element, index) in toDo" :key="element.title">
        <ToDoElem
          :title="element.title"
          :list="element.list ? element.list.slice(0, 4) : ''"
          :index="index"
          :progress="progressPercent(element.list)"
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
  },
  methods: {
    progressPercent(list) {
      let completed = 0;
      let percent = 0;
      list.forEach(element => (element.complete ? completed++ : ""));
      percent = (completed / list.length) * 100;
      if (percent) {
        return parseFloat(percent.toFixed(1));
      } else return 0;
    }
  }
};
</script>
<style></style>
