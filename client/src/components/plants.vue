<template>
  <div class="plants">
    <div class="plant d-flex flex-row" v-for="plant in plants" :key="plant._id">
      <plant :plant="plant" :errLike="errLike" @add-like="addLike" />
      <div class="err-text">{{ errLike }}</div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import plant from "./plant.vue";
import API_URL from "../../api";
import { mapGetters } from "vuex";
export default {
  components: { plant },
  name: "plants",
  data() {
    return {
      plants: "",
      errLike: "",
    };
  },
  computed: {
    ...mapGetters({ accessToken: "getAccessToken" }),
  },
  methods: {
    async addLike(id, event) {
      try {
        console.log(event.target);
        console.log(event);
        const headers = {
          Authorization: `Bearer ${this.accessToken}`,
        };
        let self = this;
        await axios
          .post(
            `${API_URL}/plant/like`,
            {
              _id: id,
            },
            { headers }
          )
          .then(this.fetchPlant())
          .catch(function (error) {
            if (error.response) {
              self.errLike = error.response.data;
            }
          });
      } catch (err) {
        console.log(err);
      }
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
.plants {
  display: flex;
  flex-wrap: wrap;
  position: relative;
  top: 80px;
  width: 80%;
  margin: 0 auto;
}

.plant {
  flex: 0 1 calc(33% - 20px);
  position: relative;
  height: 500px;
  margin: 0 5px;
  border-radius: 15px;
  margin: 10px 10px;
  box-shadow: 8px 8px 24px 0px rgba(66, 68, 90, 1);
  .err-text {
    position: absolute;
    bottom: -20px;
    transform: translateX(-50%);
    left: 50%;
  }
}
</style>
