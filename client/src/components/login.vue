<template>
  <transition name="component-fade" mode="out-in">
    <div
      class="login-page position-relative d-flex justify-content-evenly align-items-center"
    >
      <div class="login-img"></div>
      <img src="../assets/img/wave.png" alt="" srcset="" />

      <form class="login-form">
        <img src="../assets/img/logo-login.png" alt="" srcset="" />
        <h1>ZALOGUJ SIĘ</h1>

        <div class="login-form__input">
          <input
            v-model="login"
            type="text"
            name="login"
            required
            placeholder="LOGIN"
            @click="badLoginOrPass = false"
          />
          <v-icon class="login-icon">mdi-account</v-icon>
        </div>
        <div class="login-form__input">
          <input
            v-model="password"
            type="password"
            name="password"
            required
            placeholder="HASŁO"
            @click="badLoginOrPass = false"
          />
          <v-icon>mdi-lock-outline</v-icon>
        </div>
        <!-- <div class="error-text" v-if="this.badLoginOrPass">
          Błędny login lub hasło
        </div> -->
        <v-btn
          :disabled="!this.login || !this.password"
          @click.prevent="submitUser"
          id="btn"
        >
          Zaloguj się
        </v-btn>
        <p>
          Nie masz konta?
          <router-link to="/register">Zarejestruj się tutaj</router-link>
        </p>
      </form>
    </div>
  </transition>
</template>
<script>
import axios from "axios";
import API_URL from "../../api";
import { mapActions } from "vuex";
import Router from "vue-router";
export default {
  name: "login",
  data() {
    return {
      login: "",
      password: "",
    };
  },
  methods: {
    ...mapActions({
      loginUser: "login",
    }),

    async submitUser() {
      const { login, password } = this;
      await this.loginUser({ login, password });
      this.$router.push({ name: "home" });

      // await axios
      //   .post(`${API_URL}login`, {
      //     login: this.login,
      //     password: this.password,
      //   })
      //   .then((res) => console.log(res.data));
    },
  },
};
</script>
<style lang="scss">
@import "../assets/styles/_main.scss";
.login-page {
  width: 100vw;
  height: 100vh;

  > img {
    position: fixed;
    left: -17px;
    bottom: 0;
    z-index: -10;
    height: 100vh;
  }

  .login-img {
    position: fixed;
    left: 20%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    height: 500px;
    background-image: url("../assets/img/garden.png");
    background-size: cover;
    background-position: center;
  }
  .login-form {
    position: relative;
    left: 150px;
    height: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    width: 300px;
    font-size: 1.6rem;

    img {
      width: 100px;
      height: 100px;
      color: $base-color;
    }

    &__input {
      width: 100%;
      position: relative;
      input {
        width: 100%;
        position: relative;
        border-bottom: 1px solid rgba(0, 0, 0, 0.075);
        padding: 5px 0 5px 35px;
      }
      input::placeholder {
        // text-align: center;
      }
      .v-icon {
        position: absolute;
        top: 5px;
        left: 0px;
        color: $base-color;
        // color: #4dc0b5;
      }
    }
    #btn {
      padding: 10px 40px;
      border-radius: 15px;
      font-size: 1.4rem;
      background: $base-color;
    }
  }
}
</style>
