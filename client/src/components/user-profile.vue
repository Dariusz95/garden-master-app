<template>
  <v-row>
    <v-col class="user" cols="3">
      <div class="user-login">{{ this.user.login }}</div>
      <div class="user-email">{{ this.user.email }}</div>
      <img
        class="user-image"
        :src="this.user.profilePicture"
        alt="user image"
      />
      <div class="user-info">
        <div class="user-info-item">
          <span>Ilość polubień Twoich roślin:</span>
          <span>{{ getLikes }}</span>
        </div>
        <div class="user-info-item">
          <span>Łączna liczba Twoich roślin:</span>
          <span> {{ plantAmount }}</span>
        </div>
        <div class="user-info-item">
          <span>Z nami od:</span>
          <span> {{ createDate() }}</span>
        </div>
      </div>
    </v-col>
    <v-col class="details" cols="7"> {{ this.user.plants }}</v-col>
  </v-row>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import API_URL from "../../api";
import http from "../http";
import moment from "moment";
export default {
  name: "user-profile",
  data() {
    return {
      user: {},
    };
  },
  computed: {
    ...mapGetters({
      currentUser: "getCurrentUser",
    }),
    getLikes() {
      let totalLikes = this.user.plants.reduce(
        (acc, item) => acc + item.like.length,
        0
      );

      return totalLikes;
    },
    plantAmount() {
      return this.user.plants.length;
    },
  },
  methods: {
    createDate() {
      return moment(this.user.create_date).format(" D-MM-YYYY");
    },
  },
  async created() {
    const response = await http.get(
      `${API_URL}/getusers/${this.currentUser.id}`
    );
    this.user = response.data[0];
  },
};
</script>
<style lang="scss" scoped>
.row {
  display: flex;
  justify-content: space-evenly;
  padding: 50px;
  height: 100vh;
  background: rgb(142, 209, 33);
  background: linear-gradient(
    39deg,
    rgba(142, 209, 33, 0.639093137254902) 0%,
    rgba(122, 209, 33, 0.6530987394957983) 50%,
    rgba(33, 209, 71, 0.6615021008403361) 100%
  );
}
.user {
  height: 550px;
  border-radius: 10px;
  padding: 20px;
  font-size: 1.7rem;
  text-align: center;
  background: #fff;
  &-image {
    max-width: 100%;
    max-height: 300px;
    margin: 10px 0;
  }
  &-login {
    font-weight: bold;
    font-size: 2.3rem;
  }
  &-info {
    margin: 10px 0;
    &-item {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      span:nth-child(2) {
        font-weight: bold;
      }
    }
  }
}
.details {
  min-height: 400px;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
}
</style>
