<template>
  <nav
    class="vw-100 top-0 p-0 position-fixed d-flex justify-content-between align-items-center"
  >
    <div class="navbar d-flex">
      <div class="navbar-item logo">Garden Master</div>
      <router-link class="navbar-item" to="/" tag="span">
        <span>Strona główna </span>
      </router-link>
      <router-link class="navbar-item" to="/plants" tag="span">
        <span>Wasze rośliny</span>
      </router-link>
      <router-link class="navbar-item" to="/fame" tag="span">
        <span>Hala sław </span>
      </router-link>
      <router-link class="navbar-item" to="/add" tag="span">
        <span>Pochwal się</span>
      </router-link>
    </div>
    <router-link v-if="!isAuth" class="navbar-item btn" to="/login" tag="span">
      <button class="btn btn-primary">Zaloguj się</button>
    </router-link>
    <router-link
      v-if="isAuth"
      class="navbar-item account d-flex"
      to="/edit"
      tag="span"
    >
      <div class="navbar-account">
        <img :src="user.profilePicture" alt="user image" />
        <div class="navbar-account-login">{{ user.login }}</div>
      </div>
    </router-link>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "navbar",
  computed: {
    ...mapGetters({
      isAuth: "isAuthenticated",
      user: "getCurrentUser",
    }),
  },
};
</script>

<style scoped lang="scss">
@import "./src/assets/styles/_main.scss";
nav {
  line-height: 60px;
  z-index: 10;
  font-size: 1.6rem;
  .navbar {
    &__logo {
    }
  }
  .navbar-item {
    padding: 0 20px;
  }
  .navbar-item.btn {
    padding: 0 40px;
  }
  .navbar-item.account {
    padding: 0 40px;

    .navbar-account {
      display: flex;
      align-items: center;
    }
    .navbar-account > img {
      width: 30px;
      height: 30px;
      border-radius: 90px;
      margin-right: 10px;
    }
  }
}
</style>
