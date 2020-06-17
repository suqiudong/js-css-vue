<template>
  <div class="app-container">
    表格
  </div>
</template>

<script>
import { getList } from "@/api/table";

export default {
  data() {
    return {
      list: null
    };
  },
  created() {
    // this.getList();
    console.log(this.$server)
    this.$server.user.getUserInfo()
    .then(res=>{
      console.log(res)
    })
  },
  methods: {
    getList(){
      getList().then(res=>{
        console.log(res)
      })
    }
  }
};
</script>
