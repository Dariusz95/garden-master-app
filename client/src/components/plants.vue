<template>
  <div class="plants">
    <div class="plant d-flex flex-row" v-for="plant in plants" :key="plant._id">
      <plant :plant="plant" />
    </div>
  </div>
</template>
<script>
import axios from "axios";
import plant from "./plant.vue";
export default {
  components: { plant },
  name: "plants",
  data() {
    return {
      plants: "",
    };
  },
  methods: {},
  async created() {
    await axios.get("http://localhost:3000/api/plant").then((res) => {
      console.log(res.data);
      this.plants = res.data;
    });
  },
};
</script>
<style lang="scss">
.plants {
  display: flex;
  flex-wrap: wrap;
  // }
  // .plants {
  position: relative;
  top: 80px;
  width: 70%;
  margin: 0 auto;
}

.plant {
  flex: 0 1 calc(33% - 20px);
  position: relative;
  height: 300px;
  border: 1px solid black;
  margin: 0 5px;
  overflow: hidden;
  border-radius: 15px;
  margin: 10px 10px;
}
</style>
