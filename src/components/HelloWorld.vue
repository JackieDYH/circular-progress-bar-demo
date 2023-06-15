<template>
  <div class="hello">
    <ProgressBar :pieValue="v" />
  </div>
</template>

<script>
import ProgressBar from "vue2-circle-progress-bar";
import "vue2-circle-progress-bar/dist/vue2-circle-progress-bar.css";
export default {
  name: "HelloWorld",
  props: {
    v: Number,
  },
  components: {
    ProgressBar,
  },
};
</script>

<style scoped lang="scss">
a {
  color: #42b983;
}
</style>
