<template>
  <nav
    class="vw-100 top-0 p-0 position-fixed d-flex justify-content-between align-items-center"
  >
    <div class="navbar d-flex">
      <div class="navbar-item logo"></div>
      <img src="../assets/img/garden-logo.png" alt="" />
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
    <div v-if="isAuth" class="navbar-item account d-flex" to="/edit" tag="span">
      <div
        class="navbar-account"
        @click="accountMenuActive = !accountMenuActive"
      >
        <img :src="getImgUrl(user.profilePicture)" alt="user image" />

        <div class="navbar-account-login">{{ user.login }}</div>
        <ul
          :class="{ active: this.accountMenuActive }"
          class="navbar-account-menu"
        >
          <router-link class="account-menu" to="/edit" tag="li">
            <v-icon class="account-menu-icon">mdi-account-cog</v-icon>
            <span class="account-menu-text">Edytuj profil</span>
          </router-link>
          <li class="account-menu" @click="logout">
            <v-icon class="account-menu-icon">mdi-logout</v-icon>
            <span class="account-menu-text">Wyloguj się</span>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import Router from "vue-router";
import { mapGetters, mapActions } from "vuex";
import API_URL from "../../api";
export default {
  name: "navbar",
  data() {
    return {
      accountMenuActive: false,
    };
  },
  computed: {
    ...mapGetters({
      isAuth: "isAuthenticated",
      user: "getCurrentUser",
    }),
  },
  methods: {
    ...mapActions({ logOut: "logout" }),
    getImgUrl(photo) {
      if (!photo) {
        return `${API_URL}/images/default-user.png`;
      }
      return `${API_URL}/images/${photo}`;
    },
    logout() {
      this.logOut();
      this.$router.push({ name: "home" });
    },
  },
};
</script>

<style scoped lang="scss">
@import "./src/assets/styles/_main.scss";
nav {
  line-height: 60px;
  z-index: 10;
  font-size: 1.9rem;
  .navbar {
    img {
      width: 200px;
      height: 100%;
    }
  }
  .navbar-item {
    padding: 0 20px;
  }
  .navbar-item.btn {
    padding: 0 40px;
    .btn {
      color: #fff;
      background-color: $base-color;
      padding: 6px 20px;
      font-size: 1.6rem;
      border-radius: 15px;
    }
  }
  .navbar-item.account {
    padding: 0 40px;
    .navbar-account {
      display: flex;
      align-items: center;
      position: relative;
      cursor: pointer;
      .navbar-account-menu {
        position: absolute;
        top: 100%;
        display: block;
        width: 200px;
        left: -100%;
        border: 1px solid black;
        border-radius: 20px;
        display: flex;
        flex-direction: column;
        padding: 5px 10px;
        background: #fff;
        display: none;
        .account-menu {
          &-icon {
            padding: 0 5px;
          }
        }
        .account-menu:first-child {
          border-bottom: 2px solid $base-color;
        }
      }
      .navbar-account-menu.active {
        display: block;
      }
    }
    .navbar-account > img {
      width: 40px;
      height: 40px;
      border-radius: 90px;
      margin-right: 10px;
    }
  }
}
</style>
