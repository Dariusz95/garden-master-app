<template>
  <v-app>
    <div class="plants-container">
      <v-row class="plants-filter">
        <v-col cols="4">
          <v-select
            v-model="selected_type"
            :items="select_type"
            label="Typ roślin"
            solo
          ></v-select>
        </v-col>
        <v-col cols="4">
          <v-select
            :disabled="!selected_type"
            v-model="selected_kind"
            :items="select_kind"
            label="Rodzaj roślin"
            solo
          ></v-select>
        </v-col>
        <v-col class="showPlantAmount" cols="4">
          <span class="showPlantAmount-text">Pokaż</span>
          <v-btn-toggle group mandatory>
            <v-btn @click="changeShowPages(3)"> 3 </v-btn>
            <v-btn @click="changeShowPages(6)"> 6 </v-btn>
            <v-btn @click="changeShowPages(9)"> 9 </v-btn>
          </v-btn-toggle>
        </v-col>
        <v-col class="colBtn">
          <button class="resetFiltersBtn" @click="resetFilters">
            Resetuj filtry
          </button>
        </v-col>
      </v-row>
      <!-- <div class="plants"> -->
      <transition-group class="plants" tag="ul" name="fade-out-in">
        <div
          class="plant d-flex flex-row"
          v-for="plant in pageOfItems"
          :key="plant._id"
        >
          <plant :plant="plant" :errLike="errLike" @add-like="addLike" />
        </div>
      </transition-group>
      <!-- </div> -->
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
      errLike: "",
      pageOfItems: [],
      select_type: ["Owoce", "Warzywa"],
      selected_type: "",
      pageSize: null || 3,
      selected_kind: "",
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
      console.log("poszl");
      this.pageOfItems = pageOfItems;
    },

    async changeShowPages(number) {
      this.pageSize = number;
      this.componentReload = !this.componentReload;
    },
    resetFilters() {
      (this.selected_type = ""), (this.selected_kind = "");
    },

    async addLike(id) {
      try {
        let self = this;
        await http
          .post(`${API_URL}/plant/like`, {
            _id: id,
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
        console.log(err);
      }
      if (!this.errLike) this.fetchPlants();
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
  height: calc(100vh - 80px);
  .row {
    margin: 0;
  }
}
.plants-filter {
  font-size: 1.6rem;
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

// .fade-enter-active,
// .fade-leave-active {
//   transition: opacity 0.3s ease;
// }

// .fade-enter-from,
// .fade-leave-to {
//   opacity: 0;
// }

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
</style>
