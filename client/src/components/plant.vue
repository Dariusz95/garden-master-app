<template>
  <div class="w-100 position-relative" @click.prevent="goToDetails">
    <img :src="getImgUrl(plant)" alt="plant image" />
    <div class="plant__author">Autor : {{ plant.owner.login }}</div>
    <div class="plant__likes">
      <i class="fas fa-thumbs-up"></i>
      <span>0</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "plant",
  data: () => ({}),
  props: ["plant"],
  methods: {
    getImgUrl(pic) {
      if (pic) {
        return `http://localhost:3000/images/${pic.image}`;
      }
    },
    goToDetails() {
      this.$router.push(`/plants/${this.plant._id}`);
    },
  },
};
</script>
<style lang="scss">
.plant {
  &__author {
    position: absolute;
    bottom: 0;
    text-align: center;
    background-color: #000000e8;
    color: white;
    width: 100%;
    z-index: 10;
  }
  img {
    width: 100%;
    height: 100%;
    transition: width 0.5s;
  }
  &__likes {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-evenly;
    font-size: 1.6rem;
    padding: 0 10px;
    transition: all 0.3s ease-out;
    background: #21c11ee0;
    i {
      cursor: pointer;
    }
  }
}
.plant {
  .plant__likes:hover {
    align-items: center;
    font-size: 2.5rem;
  }
}
</style>
