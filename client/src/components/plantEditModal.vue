<template>
  <v-app>
    <div class="modal-backdrop">
      <div class="edit-modal">
        <form enctype="multipart/form-data" @submit.prevent="EditPlant">
          <div class="edit-modal-item kind">
            <label>Typ</label>
            <v-select
              v-model="editKind"
              :items="select_type"
              label="Wybierz typ rośliny"
              solo
            ></v-select>
          </div>
          <div v-if="editKind === 'Warzywa'" class="edit-modal-item type">
            <label>Rodzaj</label>
            <v-select
              v-model="editType"
              :items="select_kindVegetable"
              label="Wybierz rodzaj"
              solo
            ></v-select>
          </div>
          <div v-if="editKind === 'Owoce'" class="edit-modal-item type">
            <label>Rodzaj</label>
            <v-select
              v-model="editType"
              :items="select_kindFruit"
              label="Wybierz rodzaj"
              solo
            ></v-select>
          </div>
          <div class="edit-modal-item tips">
            <label for="tips">Porady od autora</label>
            <textarea
              v-model="editTips"
              name="tips"
              id="tips"
              value="editTips"
            ></textarea>
          </div>

          <div class="edit-modal-item image">
            <label for="home">Zdjęcie</label>
            <input
              id="fileInput"
              class="form-input"
              ref="file"
              type="file"
              name="image"
              @change="handleFileUpload($event)"
            />
          </div>
          <div class="edit-modal-buttons">
            <button class="cancelBtn btn" @click="cancelEdit">Anuluj</button>
            <button class="editBtn btn" type="submit">Edytuj</button>
          </div>
        </form>
      </div>
    </div>
  </v-app>
</template>
<script>
import http from "../http";
import API_URL from "../../api";
export default {
  name: "plantEditModal",
  props: {
    plant: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      select_type: ["Owoce", "Warzywa"],
      kind: "",
      type: "",
      tips: "",
      file: "",
      editKind: this.plant.kind,
      editType: this.plant.type,
      editTips: this.plant.tips,
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
  methods: {
    handleFileUpload(e) {
      this.file = this.$refs.file.files[0];
    },
    cancelEdit() {
      this.$emit("cancelEdit");
    },
    async EditPlant() {
      console.log(this.editKind);
      console.log(this.editType);

      let formData = await new FormData();
      formData.append("kind", this.editKind);
      formData.append("type", this.editType);
      formData.append("tips", this.editTips);
      formData.append("image", this.file);

      await http.patch(`${API_URL}/plant/${this.plant._id}`, formData);
      this.$emit("cancelEdit", "edit");
    },
  },
};
</script>
<style lang="scss" scoped>
.modal-backdrop {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: #00000040;

  .edit-modal {
    form {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    height: 500px;
    box-shadow: 10px 10px 50px 37px;
    border-radius: 15px;
    background: #fff;
    padding: 20px;
    &-item {
      > label {
        font-size: 1.6rem;
      }
      #tips {
        width: 100%;
        border: 1px solid black;
        font-size: 1.6rem;
        padding: 5px;
      }
      #fileInput {
        width: 100%;
        font-size: 1.6rem;
      }
    }
    &-buttons {
      display: flex;
      justify-content: space-evenly;
      > .btn {
        padding: 5px 40px;
        font-size: 2rem;
        border-radius: 15px;
        transition: background-color 0.3s;
      }
      .cancelBtn {
        background: rgb(253, 29, 29);
        background: linear-gradient(
          90deg,
          rgba(253, 29, 29, 0.227328431372549) 0%,
          rgba(253, 29, 29, 0.8435749299719888) 50%,
          rgba(253, 29, 29, 0.30575980392156865) 100%
        );
      }
      .cancelBtn:hover {
        background-color: #fd1d1d8a;
      }
      .editBtn {
        background: rgb(245, 255, 0);
        background: linear-gradient(
          90deg,
          rgba(245, 255, 0, 0.165703781512605) 0%,
          rgba(245, 255, 0, 0.8015581232492998) 50%,
          rgba(245, 255, 0, 0.16010154061624648) 100%
        );
      }
      .editBtn:hover {
        background-color: #f6ff00b9;
      }
    }
  }
}
</style>
