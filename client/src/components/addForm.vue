<template>
  <v-app>
    <div class="form">
      <form
        class="createForm"
        enctype="multipart/form-data"
        @submit.prevent="addAnimal"
      >
        <div class="form_single_wrap">
          <label for="tips">Porady od autora:</label>
          <input v-model="tips" class="form-input" type="text" required />
        </div>

        <div class="form_single_wrap">
          <label>Typ</label>
          <v-select
            v-model="kind"
            :items="select_type"
            label="Wybierz typ rośliny"
            solo
            required
          ></v-select>
        </div>
        <div v-if="kind === 'Warzywa'" class="form_single_wrap">
          <label>Rodzaj</label>
          <v-select
            :disabled="!kind"
            v-model="type"
            :items="select_kindVegetable"
            label="Wybierz rodzaj"
            solo
          ></v-select>
        </div>
        <div v-if="kind === 'Owoce'" class="form_single_wrap">
          <label>Rodzaj</label>
          <v-select
            :disabled="!kind"
            v-model="kind"
            :items="select_kindFruit"
            label="Wybierz rodzaj"
            solo
          ></v-select>
        </div>
        <div class="form_single_wrap">
          <label for="home">Zdjęcie</label>
          <input
            class="form-input"
            ref="file"
            type="file"
            name="image"
            required
            @change="handleFileUpload($event)"
          />
        </div>
        <v-btn class="btnForm addBtn" type="submit">Wyślij</v-btn>
      </form>
    </div>
  </v-app>
</template>
<script>
import API_URL from "../../api";
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  name: "addForm",
  data() {
    return {
      select_type: ["Owoce", "Warzywa"],
      kind: "",
      type: "",
      tips: "",
      file: "",
      select_kindFruit: [
        "jagoda",
        "malina",
        "truskawka",
        "porzeczka",
        "poziomka",
      ],
      select_kindVegetable: [
        "pomidor",
        "cebula",
        "sałata",
        "ogórek",
        "dynia",
        "kapusta",
      ],
    };
  },
  computed: {
    ...mapGetters({ accessToken: "getAccessToken" }),
  },
  methods: {
    handleFileUpload(e) {
      // let file = e.target.files[0] || e.dataTransfer.files[0];
      this.file = this.$refs.file.files[0];
    },
    async addAnimal() {
      let formData = await new FormData();
      formData.append("kind", this.kind);
      formData.append("type", this.type);
      formData.append("tips", this.tips);

      formData.append("image", this.file);
      const headers = {
        Authorization: `Bearer ${this.accessToken}`,
      };
      await axios.post(`${API_URL}plant`, formData, { headers });
    },
  },
};
</script>
<style lang="scss">
.form {
  background-image: url("../assets/img/form-img.png");
  background-size: cover;
  width: 100vw;
  height: 100vh;
  .createForm {
    margin-top: 60px;
    width: 80%;
    margin: 60px auto 0;
  }
}
</style>
