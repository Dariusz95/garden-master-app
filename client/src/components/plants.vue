<template>
  <div class="plants-container">
    <div class="plants">
      <transition-group name="fade">
        <div
          class="plant d-flex flex-row"
          v-for="plant in pageOfItems"
          :key="plant._id"
        >
          <plant :plant="plant" :errLike="errLike" @add-like="addLike" />
        </div>
      </transition-group>
    </div>
    <div class="plants-pagination">
      <jw-pagination
        :pageSize="3"
        :items="plants"
        @changePage="onChangePage"
      ></jw-pagination>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import plant from "./plant.vue";
import API_URL from "../../api";
import { mapGetters } from "vuex";
import http from "../http";
export default {
  components: { plant },
  name: "plants",
  data() {
    return {
      plants: "",
      errLike: "",
      pageOfItems: [],
    };
  },
  computed: {
    ...mapGetters({ accessToken: "getAccessToken" }),
  },
  methods: {
    onChangePage(pageOfItems) {
      console.log(pageOfItems);
      // update page of items
      this.pageOfItems = pageOfItems;
    },
    async addLike(id) {
      try {
        let self = this;
        await http
          .post(`${API_URL}/plant/like`, {
            _id: id,
          })
          .then(this.fetchPlant())
          .catch(function (error) {
            if (error.response) {
              self.isError = true;
              if (error.response.data === "no token")
                return (self.errLike = "Musisz się zalogować");
              self.errLike = error.response.data;
            }
          });
      } catch (err) {
        console.log(err);
      }
      this.fetchPlant();
    },
    fetchPlant() {
      axios.get(`${API_URL}/plant`).then((res) => {
        console.log(res.data);
        this.plants = res.data;
      });
    },
  },
  async created() {
    await this.fetchPlant();
  },
};
</script>
<style lang="scss">
.plants-container {
  position: relative;
  top: 80px;
  width: 80%;
  margin: 0 auto;
  height: calc(100vh - 80px);
}
.plants {
  display: flex;
  flex-wrap: wrap;
  position: relative;
  margin: 0 auto;

  &-pagination {
    text-align: center;
    font-size: 2rem;
    margin-top: 5rem;
    .page-item {
      > a {
        border: none;
      }
    }
  }
}

.plant {
  flex: 0 1 calc(33% - 20px);
  position: relative;
  height: 500px;
  margin: 0 5px;
  border-radius: 15px;
  overflow: hidden;
  margin: 10px 10px;
  box-shadow: 8px 8px 24px 0px rgba(66, 68, 90, 1);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
