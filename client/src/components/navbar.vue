<template>
  <nav>
    <div
      class="nav vw-100 top-0 p-3 position-fixed d-flex justify-content-between align-items-center"
      :class="{ onScroll: topOfPage }"
    >
      <div class="navbar p-0 d-flex">
        <!-- <div class="navbar-item logo"></div> -->
        <img v-if="!topOfPage" src="../assets/img/garden-logo.png" alt="" />
        <img
          v-if="topOfPage"
          src="../assets/img/garden-logo-white.png"
          alt=""
        />
        <div v-if="!mobileNav">
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
      </div>
      <router-link
        v-if="!isAuth"
        class="navbar-item btn"
        to="/login"
        tag="span"
      >
        <button class="btn btn-primary">Zaloguj się</button>
      </router-link>
      <div
        v-if="isAuth"
        class="navbar-item account d-flex"
        to="/edit"
        tag="span"
      >
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
    </div>
    <div class="mobileNav" v-if="mobileNav">
      <router-link class="mobileNav-item" to="/" tag="span">
        <v-icon>mdi-home</v-icon>
        <span>Strona główna </span>
      </router-link>
      <router-link class="mobileNav-item" to="/plants" tag="span">
        <v-icon>mdi-flower-tulip</v-icon>
        <span>Wasze rośliny</span>
      </router-link>
      <router-link class="mobileNav-item" to="/fame" tag="span">
        <v-icon>mdi-star</v-icon>
        <span>Hala sław </span>
      </router-link>
      <router-link v-if="isAuth" class="mobileNav-item" to="/add" tag="span">
        <v-icon>mdi-account-star</v-icon>
        <span>Pochwal się</span>
      </router-link>
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
      topOfPage: false,
      windowWidth: null,
      mobileNav: false,
    };
  },
  computed: {
    ...mapGetters({
      isAuth: "isAuthenticated",
      user: "getCurrentUser",
    }),
  },
  beforeMount() {
    window.addEventListener("scroll", this.handleTopOfPage);
  },
  created() {
    window.addEventListener("resize", this.checkScreen);
    this.checkScreen();
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
    handleTopOfPage() {
      if (window.pageYOffset > 0) {
        this.topOfPage = true;
      } else {
        this.topOfPage = false;
      }
    },
    checkScreen() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth <= 776) {
        console.log("mobile");
        this.mobileNav = true;
        return;
      }
      console.log("pc");
      this.mobileNav = false;
      return;
    },
  },
};
</script>

<style scoped lang="scss">
@import "./src/assets/styles/_main.scss";

.nav {
  line-height: 60px;
  z-index: 10;
  font-size: 2.3rem;
  transition: color 0.3s, background-color 0.5s;
  .navbar {
    img {
      width: 250px;
      height: 100%;
      margin-right: 10px;
    }
    &-item {
      padding: 0 20px;
      cursor: pointer;
    }
  }
  .navbar-item.btn {
    padding: 0 30px;
    .btn {
      color: #fff;
      background-color: $base-color;
      padding: 6px 20px;
      font-size: 2rem;
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
          color: #000 !important;
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
.nav.onScroll {
  background-color: rgb(0 0 0 / 63%);
  color: #fff;
}

.mobileNav {
  position: fixed;
  bottom: 0;
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  font-size: 1.6rem;
  z-index: 10;
  padding: 30px 10px 10px;
  color: #fff;
  background: #000000;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  &-item {
    position: relative;
    display: flex;
    flex-direction: column;
    .v-icon {
      position: absolute;
      top: -50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 2.5rem;
      color: white;
    }
  }
  &-item.router-link-exact-active {
    color: $base-color;
    font-weight: bold;
    .v-icon {
      font-size: 3.3rem;
      color: $base-color;
      background: #000000;
      border-radius: 50%;
      padding: 10px;
      z-index: -5;
    }
  }
}
@import "./src/assets/styles/rwd/navbar.scss";
</style>
