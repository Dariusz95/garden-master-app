<template>
  <transition name="component-fade" mode="out-in">
    <div
      class="register-page position-relative d-flex justify-content-evenly align-items-center"
    >
      <div class="register-img"></div>
      <img src="../assets/img/wave.png" alt="" srcset="" />

      <form class="register-form">
        <img src="../assets/img/logo-login.png" alt="" srcset="" />
        <h1>ZAREJESTRUJ SIĘ</h1>

        <div class="register-form__input">
          <input
            v-model="login"
            type="text"
            name="register"
            required
            placeholder="LOGIN"
            @click="badregisterOrPass = false"
          />
          <v-icon class="register-icon">mdi-account</v-icon>
        </div>

        <div class="register-form__input">
          <input
            v-model="password"
            type="password"
            name="password"
            required
            placeholder="HASŁO"
          />
          <v-icon>mdi-lock-outline</v-icon>
        </div>

        <div class="register-form__input">
          <input
            v-model="confirmPassword"
            type="password"
            name="password"
            required
            placeholder="POWTÓRZ HASŁO"
          />
          <v-icon>mdi-lock-outline</v-icon>
        </div>
        <div class="register-form__input">
          <input
            v-model="email"
            type="text"
            name="password"
            required
            placeholder="E-MAIL"
          />
          <v-icon>mdi-email-outline</v-icon>
        </div>

        <div class="error-text" v-if="this.badregisterOrPass">
          Błędny register lub hasło
        </div>
        <div class="error-text" v-if="this.passwordNotMatch">
          Hasła się nie pokrywają
        </div>
        <v-btn @click.prevent="register" id="btn"> Zarejestruj się </v-btn>
        <p>
          Masz już konto?
          <router-link to="/login">Zaloguj się</router-link>
        </p>
      </form>
    </div>
  </transition>
</template>
<script>
import axios from "axios";
import API_URL from "../../api";
import { mapActions } from "vuex";
export default {
  name: "register",
  data() {
    return {
      login: "",
      password: "",
      confirmPassword: "",
      email: "",
      passwordNotMatch: false,
    };
  },
  methods: {
    async register() {
      if (this.password === this.confirmPassword) {
        await axios
          .post(`${API_URL}/register`, {
            login: this.login,
            email: this.email,
            password: this.password,
          })
          .catch((err) => console.log(err));
      }
    },
  },
};
</script>
<style lang="scss">
@import "../assets/styles/_main.scss";
.register-page {
  width: 100vw;
  height: 100vh;

  > img {
    position: fixed;
    right: -17px;
    bottom: 0;
    z-index: -10;
    height: 100vh;
    transform: rotateY(180deg) rotateX(180deg);
  }

  .register-img {
    position: fixed;
    left: 80%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    height: 500px;
    background-image: url("../assets/img/garden-register.png");
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }
  .register-form {
    position: relative;
    left: -150px;
    height: 700px;
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
.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}
.component-fade-enter,
.component-fade-leave-to {
  opacity: 0;
}
</style>
