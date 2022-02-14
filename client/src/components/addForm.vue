<template>
  <v-app>
    <div class="form">
      <form class="createForm" enctype="multipart/form-data">
        <div class="form_single_wrap">
          <label for="home">Miejscowość:</label>
          <input v-model="home" class="form-input" type="text" required />
        </div>

        <div class="form_single_wrap">
          <label>Typ</label>
          <v-select
            v-model="kind"
            :items="select_type"
            label="Wybierz zwierzaka"
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
            v-model="type"
            :items="select_kindFruit"
            label="Wybierz rodzaj"
            solo
          ></v-select>
        </div>
      </form>
    </div>
  </v-app>
</template>
<script>
export default {
  name: "addForm",
  data() {
    return {
      select_type: ["Owoce", "Warzywa"],
      kind: "",
      home: "",
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
      type: "",
    };
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
