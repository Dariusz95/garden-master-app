<template>
  <v-container fluid>
    <v-row>
      <v-col class="user" cols="3">
        <div class="user_login">{{ this.user.login }}</div>
        <div class="user_email">{{ this.user.email }}</div>
        <img
          class="user_image"
          :src="getImgUrl(user.profilePicture)"
          alt="user image"
        />
        <div class="user_info">
          <div class="user_info-item">
            <span>Ilość polubień Twoich roślin:</span>
            <span>{{ getLikes }}</span>
          </div>
          <div class="user_info-item">
            <span>Łączna liczba Twoich roślin:</span>
            <span> {{ plantAmount }}</span>
          </div>
          <div class="user_info-item">
            <span>Z nami od:</span>
            <span> {{ createDate() }}</span>
          </div>
        </div>
      </v-col>
      <v-col class="edit" cols="7">
        <div class="edit_menu">
          <div class="edit_menu-label">{{ menuEdit }}</div>
          <div class="menu">
            <a class="menu-item" @click="menuEdit = 'Edytuj profil'"
              >Edytuj profil</a
            >
            <a class="menu-item" @click="menuEdit = 'Zarządzaj'">Zarządzaj</a>
          </div>
        </div>
        <div class="edit_content">
          <div v-if="menuEdit === 'Edytuj profil'">
            <v-row class="py-4 px-0">
              <v-col>
                <input
                  ref="file"
                  type="file"
                  name=""
                  id="picture"
                  @change="handleFileUpload($event)"
              /></v-col>
              <v-col
                ><button class="changePicture" @click="editPicture">
                  Zmień zdjęcie
                </button></v-col
              >
            </v-row>
            <hr />
            <v-row class="py-4 px-0">
              <v-col cols="6" class="flex-column password-area"
                ><label for="password">Stare hasło</label>
                <input
                  v-model="oldPassword"
                  type="password"
                  name=""
                  id=""
                  required
              /></v-col>
              <v-col cols="6" class="flex-column password-area"
                ><label for="password">Nowe hasło</label>
                <input
                  v-model="newPassword"
                  type="password"
                  name=""
                  id=""
                  required
              /></v-col>
              <v-col class="d-flex justify-end">
                <button class="changePassword" @click="updatePassword">
                  Zmień hasło
                </button></v-col
              >
            </v-row>
          </div>
          <div v-if="menuEdit === 'Zarządzaj'">
            <ul class="userPlantsList">
              <li
                class="userPlant"
                v-for="plant in user.plants"
                :key="plant._id"
              >
                <img
                  @click="goToDetails(plant._id)"
                  :src="getImgUrl(plant.image)"
                  alt="plant image"
                />
                <v-icon>mdi-arrow-right</v-icon>
                <div class="plant-text">Przejdź do detali</div>
              </li>
            </ul>
          </div>
        </div></v-col
      >
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import API_URL from "../../api";
import http from "../http";
import moment from "moment";
import router from "@/router";
export default {
  name: "user-profile",
  data() {
    return {
      user: {},
      menuEdit: "Edytuj profil",
      file: "",
      oldPassword: "",
      newPassword: "",
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
    goToDetails(id) {
      router.push({ name: "plantDetails", params: { id: id } });
    },
    getImgUrl(img) {
      return `${API_URL}/images/${img}`;
    },
    showID(id) {
      console.log(id);
    },
    getImgUrl(photo) {
      if (!photo) {
        return `${API_URL}/images/default-user.png`;
      }
      return `${API_URL}/images/${photo}`;
    },
    createDate() {
      return moment(this.user.create_date).format(" D-MM-YYYY");
    },
    handleFileUpload(e) {
      this.file = this.$refs.file.files[0];
    },
    async editPicture() {
      let formData = await new FormData();
      formData.append("profilePicture", this.file);
      await http.patch(`${API_URL}/changepicture`, formData);
      await this.fetchUser();
    },
    async fetchUser() {
      const response = await http.get(
        `${API_URL}/getusers/${this.currentUser.id}`
      );
      this.user = response.data[0];
    },
    async updatePassword() {
      console.log(this.oldPassword);
      await http.patch(`${API_URL}/change-password`, {
        oldPassword: this.oldPassword,
        newPassword: this.newPassword,
      });
      this.oldPassword = "";
      this.newPassword = "";
    },
  },
  async created() {
    await this.fetchUser();
  },
};
</script>
<style lang="scss" scoped>
@import "../assets/styles/_main.scss";
.container {
  height: 100vh;
  background: rgb(142, 209, 33);
  background: linear-gradient(
    39deg,
    rgba(142, 209, 33, 0.639093137254902) 0%,
    rgba(122, 209, 33, 0.6530987394957983) 50%,
    rgba(33, 209, 71, 0.6615021008403361) 100%
  );
  padding-top: 100px;
}
.row {
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
  padding: 50px;
}
.user {
  border-radius: 10px;
  padding: 20px;
  font-size: 1.7rem;
  text-align: center;
  background: #fff;
  &_image {
    max-width: 100%;
    max-height: 300px;
    margin: 10px 0;
  }
  &_login {
    font-weight: bold;
    font-size: 2.3rem;
  }
  &_info {
    margin: 10px 0;
    &-item {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 10px 0;
      span:nth-child(2) {
        font-weight: bold;
      }
    }
  }
}
.edit {
  background: #fff;
  padding: 0;
  border-radius: 10px;
  overflow: hidden;
  &_menu {
    // height: 25%;
    background: #b8b8b82a;
    position: relative;
    padding: 60px 0;
    &-label {
      top: 10px;
      position: relative;
      left: 40px;
      font-size: 2rem;
      font-weight: bold;
    }

    .menu {
      position: absolute;
      bottom: -2px;
      left: 5%;
      &-item {
        text-decoration: none;
        display: inline-block;
        font-size: 1.6rem;
        color: black;
        margin-right: 5rem;
        cursor: pointer;
      }
      &-item::after {
        content: "";
        display: block;
        bottom: 0;
        left: 0;
        width: 0;
        height: 3px;
        background: $base-color;
        transition: width 0.3s;
      }
      &-item:hover::after {
        width: 100%;
      }
    }
  }
  &_content {
    background: #fff;
    padding: 40px 20px;

    .row {
      font-size: 1.6rem;
    }

    .changePicture,
    .changePassword {
      padding: 5px 10px;
      border: 2px solid $base-color;
      border-radius: 5px;
      transition: background-color 0.3s;
    }
    .changePicture:hover {
      background-color: rgba($base-color, 0.5);
    }
    .password-area {
      > label {
        display: block;
      }
      > input[type="password"] {
        border: 2px solid black;
        border-radius: 5px;
        width: 100%;
        padding: 3px;
      }
    }

    .userPlantsList {
      display: flex;
      flex-wrap: wrap;
      .userPlant {
        flex: 0 1 calc(33% - 20px);
        list-style: none;
        margin: 30px 10px;
        position: relative;
        overflow: hidden;

        > img {
          max-width: 100%;
          height: 100%;
          object-fit: cover;
        }
        > .v-icon {
          position: absolute;
          right: 0;
          bottom: 0;
          color: #fff;
          font-size: 4rem;
        }
        .plant-text {
          position: absolute;
          bottom: -40px;
          font-size: 1.6rem;
          background: rgba($base-color, 0.7);
          transition: transform 0.3s;
          width: 100%;
          padding: 8px 10px;
          color: #fff;
          font-weight: bold;
        }
      }
      .userPlant:hover {
        box-shadow: 1px 1px 14px 2px rgba($base-color, 1);
        cursor: pointer;
        .plant-text {
          transform: translateY(-40px);
        }
      }
    }
  }
}
</style>
