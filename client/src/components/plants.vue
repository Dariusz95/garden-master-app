<template>
  <v-app>
    <div class="plants-container">
      <v-row class="plants-filter">
        <v-col cols="12" sm="6" md="6" lg="4">
          <v-select
            v-model="selected_type"
            :items="select_type"
            label="Typ roślin"
            solo
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6" md="6" lg="4">
          <v-select
            :disabled="!selected_type"
            v-model="selected_kind"
            :items="select_kind"
            label="Rodzaj roślin"
            solo
          ></v-select>
        </v-col>
        <v-col class="showPlantAmount" cols="12" sm="6" md="6" lg="4">
          <span class="showPlantAmount-text">Pokaż</span>
          <v-btn-toggle group mandatory>
            <v-btn @click="changeShowPages(4)"> 4 </v-btn>
            <v-btn @click="changeShowPages(8)"> 8 </v-btn>
            <v-btn @click="changeShowPages(12)"> 12 </v-btn>
          </v-btn-toggle>
        </v-col>
        <v-col class="colBtn" cols="12">
          <button class="resetFiltersBtn" @click="resetFilters">
            Resetuj filtry
          </button>
        </v-col>
      </v-row>
      <!-- <transition-group class="plants" tag="ul" name="fade-out-in"> -->
      <!-- <v-row class="plants">
        <v-col
          class="plant d-flex flex-row"
          v-for="(plant, index) in pageOfItems"
          :key="plant._id"
        >
          <plant
            :plant="plant"
            :errLike="errLike"
            @add-like="addLike"
            :index="index"
          />
        </v-col>
      </v-row> -->
      <ul class="plants">
        <div
          class="plant d-flex flex-row"
          v-for="(plant, index) in pageOfItems"
          :key="plant._id"
        >
          <plant
            :plant="plant"
            :errLike="errLike"
            @add-like="addLike"
            :index="index"
          />
        </div>
      </ul>
      <!-- </transition-group> -->
      <div class="plants-pagination">
        <jw-pagination
          :pageSize="pageSize"
          :items="filterAll || plants"
          @changePage="onChangePage"
          :key="componentReload"
        ></jw-pagination>
      </div>
    </div>
  </v-app>
</template>
<script>
import axios from "axios";
import plant from "./plant.vue";
import API_URL from "../../api";
import { mapGetters, mapActions } from "vuex";
import http from "../http";
export default {
  components: { plant },
  name: "plants",
  data() {
    return {
      componentReload: 0,
      // plantReload: false,
      errLike: "",
      pageOfItems: [],
      select_type: ["Owoce", "Warzywa"],
      selected_type: "",
      pageSize: null || 4,
      selected_kind: "",
      successAddLike: false,
    };
  },
  computed: {
    select_kind() {
      let select_kindFruit = [
        "jagoda",
        "malina",
        "truskawka",
        "porzeczka",
        "poziomka",
      ];
      let select_kindVegetable = [
        "pomidor",
        "cebula",
        "sałata",
        "ogórek",
        "dynia",
        "kapusta",
      ];
      if (this.selected_type === "Owoce") return select_kindFruit;
      if (this.selected_type === "Warzywa") return select_kindVegetable;
    },
    ...mapGetters({ accessToken: "getAccessToken" }),
    ...mapGetters({ plants: "getPlants" }),
    ...mapGetters(["filterPlants"]),
    filterAll() {
      return this.filterPlants(this.selected_type, this.selected_kind);
    },
  },
  methods: {
    ...mapActions(["fetchPlants"]),
    onChangePage(pageOfItems) {
      this.pageOfItems = pageOfItems;
    },

    async changeShowPages(number) {
      this.pageSize = number;
      this.componentReload = !this.componentReload;
      console.log(this.pageOfItems);
    },
    resetFilters() {
      (this.selected_type = ""), (this.selected_kind = "");
    },

    async addLike(id) {
      try {
        var self = this;
        await http
          .post(`${API_URL}/plant/like`, {
            _id: id,
          })
          .then(function (response) {
            if (response.status == 200) {
              console.log("success", response.status);
              self.fetchPlants();
            }
          })
          .catch(function (error) {
            if (error.response) {
              self.isError = true;
              if (error.response.data === "no token")
                return (self.errLike = "Musisz się zalogować");
              self.errLike = error.response.data;
            }
          });
      } catch (err) {
        console.log("rrr", err);
      }
    },
  },
  async created() {
    await this.fetchPlants();
  },
};
</script>
<style lang="scss">
@import "../assets/styles/_main.scss";

.plants-container {
  position: relative;
  top: 80px;
  width: 80%;
  margin: 0 auto;
  background-image: url(/img/plant-bcg.74f9e533.png);
  background-repeat: no-repeat;
  background-position: bottom;
  min-height: calc(130vh - 80px);
  padding: 45px 20px;

  border: 1;
  .row {
    margin: 0;
  }
}
.plants-filter {
  font-size: 1.6rem;
  justify-content: center;
  .v-text-field__details {
    display: none;
  }
  .showPlantAmount {
    display: flex;
    align-items: baseline;
    justify-content: space-evenly;

    .v-item-group {
      flex-grow: 0.5;
      justify-content: space-between;
      .v-btn::before {
        background-color: $base-color;
      }
      .v-btn__content {
        font-size: 1.6rem;
      }
    }
  }
  .col {
    padding: 12px 12px 0px;
  }
  .col.colBtn {
    padding: 12px;
  }
  .resetFiltersBtn {
    padding: 5px 20px;
    border: 1px solid red;
    border-radius: 15px;
    color: red;
    transition: background-color 0.4s;
  }
  .resetFiltersBtn:hover {
    color: white;
    background-color: red;
  }
}

.plants {
  display: flex;
  flex-wrap: wrap;
  position: relative;
  margin: 0 auto;
  padding: 0;
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
  .plant {
    flex: 0 1 calc(25% - 20px);
    position: relative;
    height: 400px;
    margin: 0 5px;
    border-radius: 15px;
    overflow: hidden;
    margin: 10px 10px;
    box-shadow: 8px 8px 24px 0px rgba(66, 68, 90, 1);
  }
}

.fade-out-in-enter-active,
.fade-out-in-leave-active {
  transition: opacity 0.3s;
}

.fade-out-in-enter-active {
  transition-delay: 0.3s;
}

.fade-out-in-enter,
.fade-out-in-leave-to {
  opacity: 0;
}
@import "./src/assets/styles/rwd/plants.scss";
</style>
