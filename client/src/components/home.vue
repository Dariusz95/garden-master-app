<template>
  <div class="home">
    <div class="home-bcg"></div>
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
    <div class="wrapper">
      <v-row class="description_card">
        <v-col class="description_card-item">
          <div class="card-icon"><v-icon>mdi-comment-plus-outline</v-icon></div>
          <div class="card-text">
            Dodawaj komentarze. Dyskutuj, dziel się swoją opinią.
          </div>
        </v-col>
        <v-col class="description_card-item">
          <div class="card-icon"><v-icon>mdi-sprout-outline</v-icon></div>
          <div class="card-text">
            Chwal się swoimi okazami. Inni mogą to decenić dając polubienie,
            dzięki któremu będziesz piął się w naszym rankingu.
          </div>
        </v-col>
        <v-col class="description_card-item">
          <div class="card-icon">
            <v-icon>mdi-head-snowflake-outline</v-icon>
          </div>
          <div class="card-text">
            Dziel się swoją wiedzą oraz doświadczeniem.
          </div>
        </v-col>
      </v-row>
    </div>

    <div class="about">
      <div class="about-dark-bcg"></div>
      <div class="about-text">
        Miusto qui nemo quod molestiae quidem impedit accusamus voluptatibus
        doloribus incidunt sint explicabo magnam! Optio tempora quidem amet
        libero in esse aut. Necessitatibus voluptates, iste nemo debitis
        explicabo iusto eaque odio repellat. Cumque, sequi corrupti! Deleniti
        totam eos optio impedit accusamus, amet numquam modi consequuntur
      </div>
      <div class="about-img">
        <img src="../assets/img/about-img.png" />
      </div>
    </div>

    <div class="parallax-container">
      <div class="parallax-background"></div>
      <!-- <div class="parallax" @mousemove="parallax($event)"> -->
      <div class="parallax" @wheel="parallax($event)">
        <img
          src="../assets/img/parallax-img/1.png"
          class="layer"
          data-speed="1"
        />
        <img
          src="../assets/img/parallax-img/2.png"
          class="layer"
          data-speed="50"
        />
        <img
          src="../assets/img/parallax-img/3.png"
          class="layer"
          data-speed="2"
        />
        <img
          src="../assets/img/parallax-img/4.png"
          class="layer"
          data-speed="47"
        />
        <img
          src="../assets/img/parallax-img/5.png"
          class="layer"
          data-speed="3"
        />
        <img
          src="../assets/img/parallax-img/6.png"
          class="layer"
          data-speed="25"
        />
        <img
          src="../assets/img/parallax-img/7.png"
          class="layer"
          data-speed="25"
        />
        <img
          src="../assets/img/parallax-img/8.png"
          class="layer"
          data-speed="2"
        />
        <img
          src="../assets/img/parallax-img/9.png"
          class="layer"
          data-speed="73"
        />
        <img
          src="../assets/img/parallax-img/10.png"
          class="layer"
          data-speed="15"
        />
        <img
          src="../assets/img/parallax-img/11.png"
          class="layer"
          data-speed="5"
        />
        <img
          src="../assets/img/parallax-img/12.png"
          class="layer"
          data-speed="38"
        />
        <img
          src="../assets/img/parallax-img/13.png"
          class="layer"
          data-speed="15"
        />
        <img
          src="../assets/img/parallax-img/14.png"
          class="layer"
          data-speed="3"
        />
        <img
          src="../assets/img/parallax-img/15.png"
          class="layer"
          data-speed="36"
        />
        <img
          src="../assets/img/parallax-img/16.png"
          class="layer"
          data-speed="6"
        />
        <img
          src="../assets/img/parallax-img/17.png"
          class="layer"
          data-speed="6"
        />
      </div>
      <div class="parralax-text">Dziel się swoją pasją</div>
    </div>
    <div class="footer">
      <v-row>
        <v-col class="footer-link">
          <router-link class="footer-link-item" to="/plants" tag="span">
            <span>Wasze rośliny</span>
          </router-link>
          <router-link class="footer-link-item" to="/fame" tag="span">
            <span>Hala sław </span>
          </router-link>
          <router-link class="footer-link-item" to="/add" tag="span">
            <span>Pochwal się</span>
          </router-link>
        </v-col>
        <v-col class="logo-img">
          <!-- <div class="logo-img"> -->
          <img src="../assets/img/garden-logo-white.png" alt="" />
          <!-- </div> -->
        </v-col>
      </v-row>
      <div class="footer-author">Created by Dariusz Bosko</div>
    </div>
  </div>
</template>
<script>
import plants from "./plants.vue";
export default {
  name: "home",
  components: {
    plants,
    textTop: "",
  },
  mounted() {
    window.addEventListener("scroll", this.getTopScreen);
    this.$once("hook:destroyed", () => {
      window.removeEventListener("scroll", this.getTopScreen);
    });

    window.addEventListener("scroll", this.parallax);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    parallax(e) {
      const parallaxCont = document.querySelector(".parallax-container");
      const paraImgs = document.querySelectorAll(".layer");

      const text = document.querySelector(".parralax-text");

      paraImgs.forEach((layer) => {
        const parallaxContTop = parallaxCont.getBoundingClientRect().top;
        let windowHeight = window.innerHeight;
        let speed = layer.getAttribute("data-speed");
        if (parallaxContTop < windowHeight) {
          text.style.color =
            "#" + ((Math.random() * 0xffffff) << 0).toString(16);

          layer.style.top = `-${parallaxContTop / 6.5 + parseInt(speed)}px`;
        } else {
          layer.style.top = 0 + "px";
        }
      });
    },
    getTopScreen() {
      this.showElement(`.parralax-text`);
      this.showElement(`.about-img`);
      this.showElement(`.about-text`);
    },
    showElement(elem) {
      const element = document.querySelector(elem);
      let windowHeight = window.innerHeight;
      let textTop = element.getBoundingClientRect().top;
      let revealPoint = 10;
      if (textTop < windowHeight - revealPoint) {
        element.classList.add("active");
      } else {
        element.classList.remove("active");
      }
    },
  },
};
</script>
<style lang="scss">
@import "../assets/styles/_main.scss";
.home {
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;
}
.home-bcg {
  position: absolute;
  width: 100vw;
  height: 100vh;
}
.home-bcg::after {
  content: "";
  position: absolute;
  clip-path: polygon(
    49% 0,
    89% 0%,
    103% 0,
    107% 27%,
    -38% 123%,
    0 80%,
    0 0,
    43% 0
  );
  background: linear-gradient(
    90deg,
    #8ed121 0%,
    #8ed12100 20%,
    rgb(142 209 33 / 0%) 66%,
    rgba(142, 209, 33, 0.8953956583) 100%
  );

  top: 0;
  left: 0;
  width: 100%;
  height: 130%;
  z-index: -10;
}

.home-bcg::before {
  content: "";
  position: absolute;
  clip-path: polygon(
    49% 0,
    89% 0%,
    103% 0,
    107% 27%,
    -38% 123%,
    0 80%,
    0 0,
    43% 0
  );
  background-image: linear-gradient(
      90deg,
      $base-color 0%,
      $base-color 20%,
      rgba($base-color, 0.7735469188) 66%,
      rgba($base-color, 0.8953956583) 100%
    ),
    url("../assets/img/bcg-home11.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  top: 0;
  left: 0;
  width: 100%;
  height: 130%;
  z-index: -10;
}

.homepage {
  position: relative;
  margin-top: 60px;
  height: 70vh;
  width: 100vw;
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
        font-size: 2.3rem;
        margin: 20px 0;
      }
      .btn {
        margin-top: 30px;
        font-size: 2rem;
        padding: 8px 16px;
        width: 350px;
        align-self: center;
        border: 3px solid #fff;
        background: #8ed121;
        transition: background-color 0.3s;
        border-radius: 10px;
      }
      .btn:hover {
        background-color: $base-color;
      }
    }
    h1 {
      font-size: 6rem;
    }
  }
  &-img {
    background: url("../assets/img/gardener1.png");
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    height: 100%;
    width: 100%;
  }
}
.wrapper {
  display: flex;
  width: 70vw;
  .description_card {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: space-around;
    margin: 100px 0;

    &-item {
      box-shadow: 0px 31px 46px -22px rgba(142, 209, 33, 1);
      border-radius: 15px;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 15px;
      background: #fff;
      transition: transform 0.3s;
      cursor: pointer;
      .card-icon {
        padding: 30px 0;
        .v-icon {
          font-size: 4rem;
          color: $base-color;
        }
      }
      .card-text {
        padding: 30px 0;
        font-size: 1.9rem;
      }
    }
    &-item:hover {
      transform: scale(1.05);
    }
  }
}

.about {
  position: relative;
  width: 100vw;
  height: 300px;
  margin: 80px 0;
  padding: 30px;
  display: flex;
  background-image: url("../assets/img/about-bcg.png");
  background-attachment: fixed;
  background-size: cover;
  background-repeat: no-repeat;
  .about-dark-bcg {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.578);
  }
  &-text {
    flex: 0 1 100%;
    z-index: 10;
    color: #fff;
    font-size: 2rem;
    text-align: justify;
    position: relative;
    align-self: center;
    transform: translateX(-250px);
    opacity: 0;
    transition: all 1s ease;
  }
  &-text.active {
    transform: translateX(0px);
    opacity: 1;
  }

  &-img {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 0 1 100%;
    width: 100%;
    height: 100%;
    position: relative;
    transform: translateX(250px);
    opacity: 0;
    transition: all 1s ease;
    img {
      max-width: 100%;
      height: 200%;
    }
  }
  &-img.active {
    transform: translateX(0px);
    opacity: 1;
  }
}

.parallax-container {
  width: 100vw;
  height: 800px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;

  .parallax-background {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 80%;
  }

  .parallax {
    width: 100%;
    height: 100%;
    position: relative;

    img {
      position: absolute;
      bottom: -10%;
      left: 50%;
      transform: translateX(-50%);
      width: 66%;
      height: 100%;
      object-fit: contain;
      // object-fit: cover;
    }
  }
}
.parallax-background::before {
  content: "";
  position: absolute;
  clip-path: polygon(0 21%, 100% 21%, 100% 100%, 0 100%);
  background: rgb(77, 192, 181);
  background: linear-gradient(
    90deg,
    $base-color 0%,
    $base-color 20%,
    rgba($base-color, 0.7735469188) 66%,
    rgba($base-color, 0.8953956583) 100%
  );

  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -10;
}
.parallax-background::after {
  content: "";
  position: absolute;
  clip-path: polygon(0 21%, 100% 21%, 100% 100%, 0 100%);
  background-image: linear-gradient($base-color, rgb($base-color, 85%)),
    url("../assets/img/bcg-home11.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -10;
}
.parralax-text {
  font-size: 6rem;
  margin-bottom: 40px;
  text-shadow: -3px -1px 8px $base-color;
  transform: translateY(100px);
  opacity: 0;
  transition: all 1s ease;
  position: absolute;
  bottom: 0;
}
.parralax-text.active {
  transform: translateY(0px);
  opacity: 1;
}

.footer {
  width: 100vw;
  // height: 150px;
  background: #000;
  color: #fff;
  font-size: 1.8rem;
  .row {
    margin: 0;
    .footer-link {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
    .col {
      padding: 25px;
    }
    .logo-img {
      align-self: center;
      img {
        width: 400px;
      }
    }
  }
  &-author {
    padding: 30px 0 10px;
    text-align: center;
    background: #000;
  }
}
@import "./src/assets/styles/rwd/home.scss";
</style>
