<template>
  <div class="plants">
    <div class="plant d-flex flex-row" v-for="plant in plants" :key="plant._id">
      <plant :plant="plant" @add-like="addLike" />
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
    };
  },
  computed: {
    ...mapGetters({ accessToken: "getAccessToken" }),
  },
  methods: {
    async addLike(id) {
      try {
        const headers = {
          Authorization: `Bearer ${this.accessToken}`,
        };
        await axios
          .post(
            `http://localhost:3000/api/plant/like`,
            {
              _id: id,
            },
            { headers }
          )
          .then(this.fetchPlant())
          .catch((err) => {
            console.log("error catch", err);
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
  overflow: hidden;
  border-radius: 15px;
  margin: 10px 10px;
  box-shadow: 8px 8px 24px 0px rgba(66, 68, 90, 1);
}
</style>
