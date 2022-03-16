<template>
  <div class="user-card" :class="classObject">
    <div class="user-card-img">
      <span class="userPlace-img">{{ index + 1 }}</span>
      <img :src="getImgUrl(user.profilePicture)" alt="plant image" />
    </div>
    <div class="d-flex align-center flex-column">
      <span class="user-card-login">{{ user.login }}</span>
      <span class="user-card-active">Suma aktywności : {{ sumActivity }}</span>
    </div>
    <div class="card-describe">
      <span class="card-describe-item">
        <v-icon>mdi-message-text-outline</v-icon>
        {{ addingCommentAmount }}</span
      >
      <span class="card-describe-item">
        <v-icon>mdi-sprout</v-icon> {{ addingPlantAmount }}</span
      >
    </div>
  </div>
</template>
<script>
import API_URL from "../../../api";
export default {
  name: "fameUserCard",
  props: {
    user: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  computed: {
    classObject() {
      // console.log("index", this.index);
      // console.log(![0, 1, 2].indexOf(this.index) < 0);
      return {
        podium: [0, 1, 2].indexOf(this.index) < 0,
      };
    },
    addingPlantAmount() {
      console.log(this.user.plants.length);
      return this.user.plants.length;
    },
    addingCommentAmount() {
      return this.user.comments.length;
    },
    sumActivity() {
      return this.addingPlantAmount + this.addingCommentAmount;
    },
  },
  methods: {
    getImgUrl(photo) {
      if (!photo) {
        return `${API_URL}/images/default-user.png`;
      }
      return `${API_URL}/images/${photo}`;
    },
  },
};
</script>

<style lang="scss">
@import "./src/assets/styles/_main.scss";
.podium.user-card {
  height: 200px;
  display: flex;
  flex-direction: row;
  position: relative;
  .user-card-img {
    margin: 0 35px;
    .userPlace-img {
      background: rgb(195, 195, 195);
    }
  }
  .user-card-active {
    padding: 0 20px;
  }
  .user-card-login {
    align-self: flex-start;
  }
  .card-describe {
    height: 100%;
    flex-direction: column;
    padding-bottom: 0px;
    position: absolute;
    align-items: flex-end;
    width: auto;
    right: 0;

    &-item {
      display: block;
      border-left: 1px solid black;
      flex: 100%;
      display: flex;
      align-items: center;
      padding: 8px;
    }
    &-item:first-child {
      border-bottom: 1px solid black;
      border-right: none;
      border-top: none;
    }
  }
}

.user-card {
  height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  background: #fff;
  transition: transform 0.3s;
  &-img {
    width: 100px;
    height: 100px;
    border-radius: 45px;
    margin: 40px 0 15px;
    position: relative;
    > img {
      height: 100%;
      width: 100%;
      border-radius: 90px;
    }
    .userPlace-img {
      height: 30px;
      position: absolute;
      bottom: 0;
      right: 0;
      padding: 0px;
      width: 30px;
      border-radius: 50px;
      background: rgb(195, 195, 195);
      text-align: center;
    }
  }

  &-login {
    // font-weight: bold;
  }
  &-active {
    border-radius: 10px;
    margin: 20px 0;
    padding: 5px 40px;
    color: #8ed121;
    font-size: 2rem;
    background: #f6f6f6;
  }
  .card-describe {
    display: flex;
    justify-content: space-around;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 0;
    color: #8ed121;
    font-weight: bold;
    &-item {
      display: block;
      border-top: 1px solid black;
      flex: 100%;
      text-align: center;
      padding: 5px;
    }
    &-item:first-child {
      border-right: 1px solid black;
    }
  }
}
.user-card:hover {
  transform: scale(1.05);
}
</style>
