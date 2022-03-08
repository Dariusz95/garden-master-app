<template>
  <div class="card">
    <span class="card-place">{{ index + 1 }}</span>
    <img :src="getImgUrl" alt="plant image" />
    <div class="card-describe">
      <span class="card-describe-item">{{ plant.owner.login }}</span>
      <span class="card-describe-item">
        <i class="fas fa-thumbs-up"></i>{{ plant.like.length }}</span
      >
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
    index: {
      type: Number,
      required: true,
    },
  },
  name: "famePlantCard",
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
  flex-direction: column;
  position: relative;
  transition: transform 0.3s;
  > img {
    height: 250px;
    width: 100%;
  }
  &-place {
    position: absolute;
    width: 40px;
    height: 40px;
    top: 0;
    left: 0;
    border-radius: 50%;
    background: aliceblue;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translate(-50%, -50%);
  }
  &-describe {
    flex-grow: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 10px;
    &-item {
      display: block;
    }
  }
}
.card:hover {
  transform: scale(1.05);
}
</style>
