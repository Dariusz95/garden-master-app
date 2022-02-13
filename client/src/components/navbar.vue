<template>
  <nav class="navbar">
    <div class="navbar__items">
      <div class="navbar__logo">Garden Master</div>
      <router-link class="navbar__items-item" to="/" tag="span">
        <span>Strona główna </span>
      </router-link>
      <router-link class="navbar__items-item" to="/fame" tag="span">
        <span>Hala sław </span>
      </router-link>
    </div>

    <div class="navbar__btn">
      <button class="btn btn-primary">Zaloguj się</button>
    </div>
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
  position: fixed;
  top: 0;
  padding: 0;
  line-height: 60px;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  background-color: $base-color;
  &__logo {
  }
  &__items {
    display: flex;
    &-item {
      padding: 0 20px;
    }
  }
}
</style>
