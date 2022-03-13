<template>
  <v-app>
    <div class="createForm">
      <form
        class="form"
        enctype="multipart/form-data"
        @submit.prevent="addPlant"
      >
        <div class="form_item">
          <label for="tips">Porady od autora:</label>
          <textarea v-model="tips" class="form-input" type="text" required />
        </div>

        <div class="form_item">
          <label>Typ</label>
          <v-select
            v-model="type"
            :items="select_type"
            label="Wybierz typ rośliny"
            solo
            required
          ></v-select>
        </div>
        <div v-if="type === 'Warzywa'" class="form_item">
          <label>Rodzaj</label>
          <v-select
            :disabled="!type"
            v-model="kind"
            :items="select_kindVegetable"
            label="Wybierz rodzaj"
            solo
          ></v-select>
        </div>
        <div v-if="type === 'Owoce'" class="form_item">
          <label>Rodzaj</label>
          <v-select
            :disabled="!type"
            v-model="kind"
            :items="select_kindFruit"
            label="Wybierz rodzaj"
            solo
          ></v-select>
        </div>
        <div class="form_item">
          <label for="home">Zdjęcie</label>
          <input
            class="form-input"
            ref="file"
            type="file"
            name="image"
            required
            @change="handleFileUpload($event)"
            :key="fileInputKey"
          />
        </div>
        <v-alert v-if="this.ifPlantAdded" prominent type="success">
          Roślinka dodana
        </v-alert>
        <div class="form_buttons">
          <v-btn class="btnForm resetBtn" @click="clearForm">Reset</v-btn>
          <v-btn class="btnForm addBtn" type="submit">Wyślij</v-btn>
        </div>
      </form>
      <div class="animation-vege"></div>
    </div>
  </v-app>
</template>
<script>
import API_URL from "../../api";
import axios from "axios";
import { mapGetters } from "vuex";
import http from "../http";
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
      fileInputKey: 0,
      ifPlantAdded: false,
    };
  },
  computed: {
    ...mapGetters({ accessToken: "getAccessToken" }),
  },
  methods: {
    handleFileUpload(e) {
      this.file = this.$refs.file.files[0];
    },
    async addPlant() {
      let formData = await new FormData();
      formData.append("kind", this.kind);
      formData.append("type", this.type);
      formData.append("tips", this.tips);

      formData.append("image", this.file);
      await http.post(`${API_URL}/plant`, formData).then((res) => {
        this.clearForm();
        this.ifPlantAdded = true;
      });
    },
    clearForm() {
      this.kind = "";
      this.type = "";
      this.tips = "";
      this.fileInputKey++;
    },
  },
};
</script>
<style lang="scss">
@import "../assets/styles/_main.scss";
.createForm {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  // background-image: url("../assets/img/addFormBcg.jpg");
  background-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.1),
      rgba(0, 0, 0, 0.1)
    ),
    url("../assets/img/addFormBcg.jpg");
  background-size: cover;
  position: relative;

  .form {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    row-gap: 20px;
    margin-top: 60px;
    width: 40%;
    margin: 60px auto 0;
    border-radius: 15px;
    padding: 3rem;
    background: #00000057;
    min-height: 500px;
    color: white;
    font-size: 2rem;
    z-index: 10;

    &_item {
      display: flex;
      align-items: baseline;
      > textarea {
        border: 3px solid $base-color;
        border-radius: 15px;
        padding: 5px;
        flex-grow: 1;
        color: white;
        min-height: 63px;
        background: #00000087;
      }
      > label {
        flex-basis: 150px;
      }
    }
    &_buttons {
      display: flex;
      justify-content: space-evenly;
      .btnForm {
        padding: 10px 50px;
        box-shadow: 1px 1px 13px 0px rgb(66 68 90);
        font-size: 1.6rem;
      }
      .resetBtn {
        background: red;
      }
      .addBtn {
        background: $base-color;
      }
    }
  }
  .animation-vege {
    position: absolute;
    top: 20%;
    left: -10%;
    background-image: url("../assets/img/animation-vege.png");
    width: 250px;
    height: 250px;
    background-size: cover;
    animation: bcg-animation linear infinite 20s;
    z-index: 5;
  }
}
.createForm::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: $base-color;
  z-index: -5;
}

@keyframes bcg-animation {
  0% {
    left: -30%;
    top: 10%;
  }
  10% {
    left: 0;
    top: 10%;
    transform: rotate(15deg);
  }
  30% {
    left: 20%;
    top: 20%;
    transform: rotate(-10deg);
  }
  50% {
    left: 40%;
    top: 50%;
  }
  75% {
    left: 60%;
    top: 50%;
    transform: rotate(10deg);
  }
  90% {
    left: 100%;
    top: 35%;
  }
  100% {
    left: 130%;
    top: 10%;
  }
}

.v-list-item .v-list-item__title {
  font-size: 1.4rem;
}
.v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)
  > .v-input__control
  > .v-input__slot {
  box-shadow: 1px 1px 13px 0px $base-color;
}
</style>
