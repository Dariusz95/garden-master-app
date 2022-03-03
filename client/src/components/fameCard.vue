<template>
  <div>
    <div class="card">
      <img :src="getImgUrl" alt="plant image" />
      <span>{{ plant.like.length }}</span>
      <span>{{ plant.owner.login }}</span>
    </div>
  </div>
</template>
<script>
import API_URL from "../../api";
export default {
  props: {
    plant: {
      type: Object,
      required: true,
    },
  },
  name: "fameCard",
  data: () => {
    return {};
  },
  computed: {
    getImgUrl() {
      return `${API_URL}/images/${this.plant.image}`;
    },
  },
};
</script>
<style lang="scss">
.card {
  display: flex;
  width: 500px;
  flex-direction: row;
  //   height: 500px;
  > img {
    height: 200px;
    width: 300px;
  }
  > span {
    display: block;
  }
}
</style>
