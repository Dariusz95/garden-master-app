<template>
  <div class="home">
    <div class="homepage">
      <div class="homepage-text">
        <div class="description">
          <h1>Jesteś maniakiem ogrodnictwa?</h1>
          <span>A więc dobrze trafiłeś. Zbieramy tu osoby takie jak TY.</span>
          <span>Koniecznie pochwal się okazami Twojego z ogródka!</span>
          <button class="btn btn-primary">Pochwal się</button>
        </div>
      </div>
      <div class="homepage-img"></div>
    </div>
    <plants />
  </div>
</template>
<script>
import plants from "./plants.vue";
export default {
  name: "home",
  components: {
    plants,
  },
};
</script>
<style lang="scss">
.homepage {
  position: relative;
  margin-top: 60px;
  height: 70vh;
  width: 100vw;
  // width: 70vw;
  // margin: 60px auto 0;
  display: flex;

  &-text {
    position: relative;
    width: 100%;
    .description {
      display: flex;
      flex-direction: column;
      height: 500px;
      position: absolute;
      left: 15%;
      top: 20%;
      span {
        margin-top: 0.5rem;
        display: block;
        font-size: 1.4rem;
      }
      .btn {
        padding: 8px 16px;
        width: 350px;
        margin-top: 30px;
        align-self: center;
      }
    }
    h1 {
      font-size: 4rem;
      color: #4dc0b5;
    }
  }
  &-img {
    background: url("../assets/img/gardener.png");
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    height: 100%;
    width: 100%;
  }
}
.homepage::after {
  content: "";
  position: absolute;

  background: rgb(77, 192, 181);
  background: linear-gradient(
    90deg,
    rgba(77, 192, 181, 1) 0%,
    rgba(77, 192, 181, 1) 35%,
    rgba(77, 192, 181, 0.773546918767507) 57%,
    rgba(77, 192, 181, 0.39539565826330536) 100%
  );

  // clip-path: polygon(0 48%, 100% 13%, 100% 100%, 0% 100%);
  clip-path: ellipse(41% 63% at 83% 69%);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -10;
}
</style>
