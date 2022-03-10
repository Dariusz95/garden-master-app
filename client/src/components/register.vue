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
            :class="{ error: this.loginError }"
            v-model="login"
            type="text"
            required
            placeholder="LOGIN"
            @blur="validateLogin()"
          />
          <v-icon class="register-icon">mdi-account</v-icon>
          <p class="error-text" v-if="this.loginError">{{ this.loginError }}</p>
        </div>

        <div class="register-form__input">
          <input
            :class="{ error: this.loginError || this.passwordMatch }"
            v-model="password"
            type="password"
            name="password"
            required
            placeholder="HASŁO"
            @blur="
              ifPasswordMatch();
              validatePassword();
            "
          />

          <v-icon>mdi-lock-outline</v-icon>
          <ul>
            <li class="error-text" v-for="err in passwordErrors" :key="err.id">
              {{ err }}
            </li>
          </ul>
        </div>

        <div class="register-form__input">
          <input
            :class="{ error: this.passwordMatch }"
            v-model="confirmPassword"
            type="password"
            name="password"
            required
            placeholder="POWTÓRZ HASŁO"
            @blur="ifPasswordMatch()"
          />
          <v-icon>mdi-lock-outline</v-icon>
          <p class="error-text" v-if="this.passwordMatch">
            Hasła się nie pokrywają
          </p>
        </div>
        <div class="register-form__input">
          <input
            :class="{ error: this.mailError }"
            v-model="email"
            type="text"
            name="password"
            required
            placeholder="E-MAIL"
            @blur="validateEmail()"
          />
          <v-icon>mdi-email-outline</v-icon>
          <p class="error-text" v-if="this.mailError">
            {{ this.mailError }}
          </p>
        </div>

        <v-btn
          @click.prevent="register"
          id="btn"
          :disabled="
            !this.login ||
            !this.password ||
            !this.confirmPassword ||
            !this.email ||
            this.passwordErrors.length ||
            this.passwordMatch ||
            this.mailError.length ||
            this.loginError.length
          "
        >
          Zarejestruj się
        </v-btn>
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
      passwordMatch: false,
      loginError: "",
      passwordErrors: [],
      mailError: "",
    };
  },
  computed: {},
  methods: {
    //add and delete errors due to argument of the function
    validArgument(argument, errorArray, errorText) {
      if (argument) {
        if (!errorArray.includes(errorText)) errorArray.push(errorText);
      } else {
        let index = errorArray.indexOf(errorText);
        if (index !== -1) {
          errorArray.splice(index, 1);
        }
      }
    },
    validateLogin() {
      if (this.login.length < 4) {
        this.loginError = "Login musi składać się z przynajmniej 4 znaków";
      } else {
        this.loginError = "";
      }
    },
    validatePassword() {
      this.validArgument(
        this.password.length < 3,
        this.passwordErrors,
        "Hasło musi składać się z przynajmniej 3 znaków"
      );

      let hasNumber = /\d/;
      this.validArgument(
        !hasNumber.test(this.password),
        this.passwordErrors,
        "Hasło musi zawierać przynajmniej jedną cyfrę"
      );
    },
    validateEmail() {
      let validEmail =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (!validEmail.test(this.email)) {
        this.mailError = "Niepoprawny e-mail";
      } else {
        this.mailError = "";
      }
    },
    ifPasswordMatch() {
      console.log("je");
      if (
        this.password &&
        this.confirmPassword &&
        !(this.password === this.confirmPassword)
      ) {
        this.passwordMatch = true;
      } else {
        this.passwordMatch = false;
      }
    },
    async register() {
      await axios
        .post(`${API_URL}/register`, {
          login: this.login,
          email: this.email,
          password: this.password,
        })
        .catch((err) => console.log(err));
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
    height: 750px;
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
      input.error {
        border-bottom: 1px solid rgb(211, 4, 4);
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
    .error-text {
      color: red;
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
