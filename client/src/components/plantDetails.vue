<template>
  <div class="details-container">
    <div class="details">
      <div class="details-header">
        <div class="details-header-login">
          <v-icon>mdi-account</v-icon><span>{{ plant.owner.login }}</span>
        </div>
        <div v-if="isOwner" class="details-header-buttons">
          <button class="editBtn" @click="isPlantEdit = true">
            <span>edytuj<v-icon>mdi-pencil</v-icon></span>
          </button>
          <button class="deleteBtn">
            <span>usuń <v-icon>mdi-delete</v-icon></span>
          </button>
        </div>
      </div>
      <div class="details-img">
        <img :src="getImgUrl" alt="plant image" />
      </div>

      <div class="details-user">
        <div class="details-user-item"></div>
      </div>

      <div class="details-describe">
        <div class="details-describe-item">
          <v-icon>mdi-cannabis</v-icon>
          {{ plant.kind }}
        </div>
        <div class="details-describe-item">
          <v-icon>mdi-carrot</v-icon>{{ plant.type }}
        </div>
      </div>
      <div class="details-tips">
        <span>Porady od autora: </span>
        <span>{{ plant.tips }}</span>
      </div>

      <div class="details-comment">
        <span v-if="plant.comments.length">Komentarze : </span>
        <div class="details-comment-input">
          <input
            v-model="commentInput"
            type="text"
            placeholder="Dodaj komentarz"
          />
          <v-icon @click="addComment">mdi-send</v-icon>
        </div>
        <ul>
          <li v-for="comment in plant.comments" :key="comment._id">
            <Transition name="fade">
              <comment
                :comment="comment"
                @deleteComment="deleteComment"
                @updateComment="saveEditComment"
              />
            </Transition>
          </li>
        </ul>
      </div>
    </div>
    <plantEditModal
      @cancelEdit="cancelEdit"
      v-if="isPlantEdit"
      :plant="plant"
    />
  </div>
</template>

<script>
import comment from "./comment.vue";
import plantEditModal from "./plantEditModal.vue";
import API_URL from "../../api";
import axios from "axios";
import http from "../http";
import { mapGetters } from "vuex";
export default {
  components: {
    comment,
    plantEditModal,
  },
  name: "plantDetails",
  data() {
    return {
      plant: {},
      commentInput: "",
      isOwnerPlant: false,
      isPlantEdit: false,
    };
  },
  computed: {
    ...mapGetters(["getCurrentUser"]),

    isOwner() {
      if (this.getCurrentUser.login == this.plant.owner.login) {
        this.isOwnerPlant = true;
        return true;
      }
    },
    plantId() {
      return this.$route.params.id;
    },
    getImgUrl() {
      return `${API_URL}/images/${this.plant.image}`;
    },
  },
  async created() {
    await this.getPlant();
  },

  methods: {
    async getPlant() {
      await axios.get(`${API_URL}/plant/${this.plantId}`).then((res) => {
        console.log(res.data);
        this.plant = res.data;
      });
    },
    async addComment() {
      try {
        await http.post(`${API_URL}/comment`, {
          comment: this.commentInput,
          _id: this.plantId,
        });
      } catch (err) {
        console.log(err);
      }
      this.getPlant();
    },
    async deleteComment(id) {
      console.log(id);
      try {
        await http.delete(`${API_URL}/comment/${id}`);
      } catch (err) {
        console.log(err);
      }
      this.getPlant();
    },
    async saveEditComment(id, comment) {
      try {
        await http.patch(`${API_URL}/comment/${id}`, {
          comment: comment,
        });
      } catch (err) {
        console.log(err);
      }
      this.getPlant();
    },
    cancelEdit(isEdit) {
      if (isEdit === "edit") {
        this.getPlant();
      }
      this.isPlantEdit = false;
    },
  },
};
</script>

<style lang="scss">
@import "../assets/styles/_main.scss";
.details-container {
  position: relative;
  top: 60px;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  background-image: url("../assets/img/bcg.jpg");
  background-size: cover;
  background-attachment: fixed;

  .details {
    width: 45vw;
    padding: 5rem;
    border-radius: 15px;
    margin-top: 20px;
    background: #00000008;
    &-header {
      display: flex;
      &-login {
        display: flex;
        align-items: center;
        .v-icon {
          font-size: 4rem;
          color: green;
        }
        > span {
          font-size: 2.5rem;
        }
      }

      &-buttons {
        display: flex;
        width: 100%;
        justify-content: flex-end;

        > button {
          position: relative;
          background: none;
          border: none;
          color: #fff;
          cursor: pointer;
          display: inline-block;
          padding: 7px 35px;
          transition: all 0.4s;
          span {
            display: block;
            display: flex;
            align-items: center;
            font-size: 2rem;
            .v-icon {
              margin-left: 5px;
            }
          }
          span::before,
          span::after {
            content: "";
            position: absolute;
            width: 2px;
            height: 0px;
            transition: all 0.3s linear;
            background: #fff;
          }
          span::after {
            right: 0;
            top: 0;
            transition-duration: 0.3s;
          }
          span::before {
            left: 0;
            bottom: 0;
            transition-duration: 0.3s;
          }
        }
        > button.editBtn {
          margin-right: 1rem;
          background: rgb(197 195 65 / 97%);
          .v-icon {
            color: $editBtnColor;
          }
        }
        > button.deleteBtn {
          background: $deleteBtnColor;
          .v-icon {
            color: $deleteBtnColor;
          }
        }
        > button.editBtn:hover {
          background: black;
          box-shadow: 1px 1px 12px 7px $editBtnColor;
        }
        > button.deleteBtn:hover {
          background: black;
          box-shadow: 1px 1px 12px 7px $deleteBtnColor;
        }

        > button::before,
        > button::after {
          content: "";
          position: absolute;
          width: 0px;
          height: 2px;
          transition: all 0.3s linear;
          background: #fff;
        }

        > button:hover::before,
        > button:hover::after {
          width: 100%;
        }

        > button:hover span::before {
          height: 100%;
        }
        > button:hover span::after {
          height: 100%;
        }
        > button::after {
          left: 0;
          bottom: 0;
          transition-duration: 0.3s;
        }
        > button::before {
          right: 0;
          top: 0;
          transition-duration: 0.3s;
        }
      }
    }
    &-img {
      img {
        max-height: 500px;
        width: 100%;
        margin: 1.5rem 0;
      }
    }

    &-describe {
      font-size: 3rem;
      display: flex;
      margin-top: 1.5rem;
      &-item {
        display: flex;
        border: 1px solid black;
        border-radius: 15px;
        background: #ffffff6b;
        padding: 0px 20px;
        margin-right: 1rem;
        .v-icon {
          color: $base-color;
          font-size: 4rem;
          margin-right: 1rem;
        }
      }
    }
    &-tips {
      font-size: 2rem;
      width: 100%;
      border: 1px solid black;
      border-radius: 15px;
      padding: 5px 20px;
      margin-top: 2rem;
      background: #ffffff6b;
    }

    &-comment {
      > span {
        font-size: 1.9rem;
      }
      &-input {
        position: relative;
        input {
          width: 100%;
          border: 1px solid black;
          font-size: 2rem;
          border-radius: 15px;
          padding: 10px 60px 10px 10px;
          position: relative;
        }
        .v-icon {
          position: absolute;
          color: #4dc0b5;
          top: 0;
          right: 10px;
          font-size: 4rem;
          line-height: 52px;
          cursor: pointer;
        }
      }

      margin-top: 2rem;
      > p {
        font-size: 2rem;
        margin-top: 3rem;
      }
      ul {
        margin-top: 1rem;
        padding: 0;
      }
      li {
        list-style: none;
        margin-top: 1rem;
      }
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
@keyframes buttonAnimation {
  from {
    display: none;
  }
  to {
    display: block;
  }
}
</style>
