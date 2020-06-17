<template>
  <div class="hello">
    <a-button type="primary">Primary</a-button>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  mounted() {
    var data = {
      a: "1",
      b: "2"
    };
    this.$server.user.login(data).then(res => {
      console.log(res);
    });
  }
};
</script>