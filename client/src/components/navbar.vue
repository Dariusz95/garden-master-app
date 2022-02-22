<template>
  <nav class="navbar vw-100 top-0 p-0 position-fixed">
    <div class="navbar__items d-flex">
      <div class="navbar__logo">Garden Master</div>
      <router-link class="navbar__items-item" to="/" tag="span">
        <span>Strona główna </span>
      </router-link>
      <router-link class="navbar__items-item" to="/plants" tag="span">
        <span>Wasze rośliny</span>
      </router-link>
      <router-link class="navbar__items-item" to="/fame" tag="span">
        <span>Hala sław </span>
      </router-link>
      <router-link class="navbar__items-item" to="/add" tag="span">
        <span>Pochwal się</span>
      </router-link>
    </div>
    <router-link class="navbar__items-item" to="/login" tag="span">
      <div class="navbar__btn">
        <button class="btn btn-primary">Zaloguj się</button>
      </div>
    </router-link>
  </nav>
</template>

<script>
export default {
  name: "navbar",
};
</script>

<style scoped lang="scss">
@import "./src/assets/styles/_main.scss";
.navbar {
  background: rgba(0, 0, 0, 0.1);
  line-height: 60px;
  z-index: 10;
  // background-color: $base-color;
  &__logo {
  }
  &__items {
    &-item {
      padding: 0 20px;
    }
  }
}
</style>
