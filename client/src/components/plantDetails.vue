<template>
  <div class="details-container">
    <div class="details">
      <v-row>
        <v-col class="img" cols="12" lg="8">
          <img :src="getImgUrl" alt="plant image" />
        </v-col>
        <v-col cols="4" class="details-user">
          <div class="details-user-item">
            <v-icon>mdi-account</v-icon><span>{{ plant.owner.login }}</span>
          </div>
          <div class="details-user-item">
            <v-icon>mdi-email</v-icon><span>{{ plant.owner.email }}</span>
          </div>
        </v-col>
      </v-row>
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
        <ul v-for="comment in plant.comments" :key="comment._id">
          <li><comment :comment="comment" /></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import comment from "./comment.vue";
import API_URL from "../../api";
import axios from "axios";
import http from "../http";
export default {
  components: {
    comment,
  },
  name: "plantDetails",
  data() {
    return {
      plant: "",
      commentInput: "",
    };
  },
  computed: {
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
        await http
          .post(`${API_URL}/comment`, {
            comment: this.commentInput,
            _id: this.plantId,
          })
          .then(this.getPlant());
      } catch (err) {
        console.log(err);
      }
      this.getPlant();
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
    width: 75vw;
    padding: 4rem;
    border-radius: 15px;
    margin-top: 20px;
    background: #00000008;
    .img {
      display: flex;
      justify-content: center;
      img {
        max-height: 500px;
        width: 100%;
        border-radius: 15px;
      }
    }
    &-user {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      flex-direction: column;
      overflow: hidden;
      &-item {
        display: flex;
        .v-icon {
          font-size: 4rem;
          color: green;
        }
        > span {
          font-size: 2.5rem;
        }
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
      > span {
        font-size: 2rem;
        margin-top: 3rem;
      }
      ul {
        margin-top: 1rem;
        padding: 0;
      }
      li {
        list-style: none;
      }
    }
  }
}
</style>
