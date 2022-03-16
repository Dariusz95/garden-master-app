<template>
  <div class="w-100 d-flex flex-column position-relative" @click="checkIndex()">
    <div v-if="errLike" :class="{ errorPlant: isActive }"></div>
    <img :src="getImgUrl" alt="plant image" />

    <div class="plant__describe">
      <div class="plant__describe_like">
        <div class="plant__describe_like-item">
          <span>{{ this.plant.like.length }}</span>
          <span>ilość polubień</span>
        </div>
        <div class="plant__describe_like-item">
          <v-icon v-if="!isLiked" @click="likeUp(plant._id, $event)"
            >mdi-thumb-up-outline</v-icon
          >
          <v-icon v-if="isLiked" @click="likeUp(plant._id, $event)"
            >mdi-thumb-up</v-icon
          >
          <!-- <i class="fas fa-thumbs-up" @click="likeUp(plant._id, $event)"> </i> -->

          <span>Polub to</span>
        </div>
      </div>
      <div class="plant__describe-details" @click.prevent="goToDetails">
        Zobacz szczegóły <v-icon>mdi-arrow-right</v-icon>
      </div>
    </div>
    <div v-if="errLike" :class="{ active: isActive }" class="err-text">
      {{ errLike }}
    </div>
  </div>
</template>
<script>
import axios from "axios";
import API_URL from "../../api";
import router from "@/router";
import { mapGetters } from "vuex";
export default {
  name: "plant",
  data: () => {
    return {
      isActive: false,
      clickedId: null,
    };
  },
  props: {
    plant: {
      type: Object,
      required: true,
      isActive: false,
    },
    errLike: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapGetters({ currentUser: "getCurrentUser" }),
    getImgUrl() {
      return `${API_URL}/images/${this.plant.image}`;
    },
    isLiked() {
      if (this.plant.like.includes(this.currentUser.id)) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    checkIndex() {
      // console.log(this.index);
      // console.log(this.plant._id);
    },
    likeUp(id) {
      this.$emit("add-like", id);
      this.clickedId = id;
      console.log(id);
      this.isActive = true;
      setTimeout(() => {
        this.isActive = false;
      }, 2500);
    },
    goToDetails() {
      router.push({ name: "plantDetails", params: { id: this.plant._id } });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../assets/styles/_main.scss";
.plant {
  display: flex;
  flex-direction: column;
  position: relative;

  .errorPlant {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: #ff000070;
    z-index: 10;
    animation: 0.7s errMove;
    animation-fill-mode: forwards;
    animation-direction: alternate;
  }
  .err-text {
    font-size: 2rem;
    position: absolute;
    bottom: 25%;
    visibility: hidden;
    width: 100%;
    text-align: center;
    color: red;
    background: white;
    z-index: 10;
    padding: 10px;
    border-radius: 90px;
    width: 80%;
    left: 50%;
    transform: translateX(-50%);

    // opacity: 100;
    opacity: 0%;
  }
  .err-text.active {
    visibility: visible;
    animation: 0.7s errMove;
    animation-fill-mode: forwards;
    animation-direction: alternate;
  }
  img {
    width: 100%;
    height: 100%;
    border-radius: 15px;
    position: relative;
  }

  &__describe {
    position: absolute;
    bottom: 0;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 24%;
    justify-content: space-between;
    font-size: 2.2rem;
    background: #00000087;
    color: white;
    transition: all 0.3s ease-out;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;

    i {
      cursor: pointer;
    }

    &_like {
      display: flex;
      justify-content: space-evenly;
      background: rgb(77, 192, 181);
      background: linear-gradient(
        90deg,
        rgba(77, 192, 181, 0.19931722689075626) 0%,
        rgba(77, 192, 181, 0.8323704481792717) 51%,
        rgba(77, 192, 181, 0.19931722689075626) 100%
      );
      padding: 5px 0;
      &-item {
        flex: 1 1 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        border-left: 1px solid black;
        border-right: 1px solid black;
        transition: color 0.3s;
        .v-icon {
          font-size: 3.5rem;
          color: $base-color;
          position: relative;
        }
        span:last-child {
          font-size: 1.2rem;
        }
      }
    }
    &-details {
      text-align: center;
      cursor: pointer;
      .v-icon {
        color: white !important;
      }
    }
  }
}
.plant.active {
  box-shadow: 0px 0px 25px -8px #fe0005;
}

.plant__describe .plant_describe_like-item:last-child:hover {
  color: blue;
}

@keyframes errMove {
  from {
    opacity: 0;
  }
  to {
    opacity: 100%;
  }
}
</style>
