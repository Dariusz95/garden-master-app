<template>
  <v-app>
    <div class="fame-container">
      <div class="fame">
        <v-row class="sort">
          <v-col cols="12" md="2" sm="4" xs="12">
            <span>Ranking pod względem</span>
          </v-col>
          <v-col cols="12" md="4" sm="5" xs="12">
            <v-select
              :items="fameSelect"
              v-model="selected_ranking"
              label="Wybierz"
              solo
            ></v-select>
          </v-col>
        </v-row>

        <ul v-if="selected_ranking === fameSelect[0]" class="famePlant-list">
          <li v-for="(plant, index) in sortPlants" :key="index">
            <famePlantCard :plant="plant" :index="index" />
          </li>
        </ul>

        <ul v-if="selected_ranking === fameSelect[1]" class="fameUsers-list">
          <li
            class="user-item"
            v-for="(user, index) in sortUsers"
            :key="user._id"
          >
            <fameUserCard :user="user" :index="index" />
          </li>
        </ul>
        <!-- <div class="fame-pagination">
        <jw-pagination
          :pageSize="11"
          :items="isSelected"
          @changePage="onChangePage"
        ></jw-pagination>
      </div> -->
      </div>
    </div>
  </v-app>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import famePlantCard from "./famePlantCard.vue";
import fameUserCard from "./fameUserCard.vue";
import API_URL from "../../../api";
import http from "../../http";
export default {
  components: { famePlantCard, fameUserCard },
  name: "fame",
  data: () => {
    return {
      fameSelect: ["polubień rośliny", "najaktywniejszych użytkowników"],
      selected_ranking: "" || "polubień rośliny",
      users: {},
      // pageOfItems: [],
      isPagination: false,
    };
  },
  computed: {
    // isSelected() {
    //   if (this.selected_ranking === this.fameSelect[0]) {
    //     return this.sortPlants;
    //   } else {
    //     return this.sortUsers;
    //   }
    // },
    ...mapGetters({ plants: "getPlants" }),
    sortPlants() {
      return this.plants.sort((a, b) => b.like.length - a.like.length);
    },
    // -------------
    sortUsers() {
      return this.users
        .map((user) => ({
          ...user,
          activity: user.comments.length + user.plants.length,
        }))
        .sort((a, b) => {
          console.log(typeof b.activity);
          return b.activity - a.activity;
        });
    },
    // -------------
  },
  methods: {
    onChangePage(pageOfItems) {
      console.log(pageOfItems);
      this.pageOfItems = pageOfItems;
    },
    ...mapActions(["fetchPlants"]),
    async fetchUsers() {
      const response = await http.get(`${API_URL}/getusers`);
      this.users = response.data;
    },
  },
  async created() {
    await this.fetchPlants();
    await this.fetchUsers();
  },
};
</script>

<style lang="scss">
.v-application ul {
  padding: 0;
}
.fame-container {
  display: flex;
  width: 100vw;
  align-items: center;
  flex-direction: column;
  background: #f6f6f6;
  padding-top: 100px;
  background-image: linear-gradient(
      to right,
      rgb(75 75 75 / 30%),
      rgb(0 0 0 / 8%)
    ),
    url("../../assets/img/fame-bcg.jpg");
  background-size: cover;
  background-attachment: fixed;

  .fame {
    margin: 0 auto;
    width: 80vw;
  }
}
.sort {
  display: flex;
  // align-items: baseline;
  font-size: 2rem;
  justify-content: center;
  :first-child {
    margin-right: 10px;
  }
}
li {
  list-style: none;
}
.fameUsers-list {
  > li {
    font-size: 2rem;
    flex-basis: calc(50% - 30px);
    margin: 15px;
  }
}

.fameUsers-list {
  > li:nth-child(1),
  > li:nth-child(2),
  > li:nth-child(3) {
    flex-basis: calc(33% - 30px);
  }
}
.fameUsers-list {
  > li:nth-child(1) {
    .user-card {
      box-shadow: 0px 0px 18px 7px gold;
      &-img {
        .userPlace-img {
          background: yellow;
          border: 3px dotted #ffd700;
        }
      }
    }
  }
  > li:nth-child(2) {
    box-shadow: 0px 0px 18px 7px rgba(128, 128, 128, 1);
    .user-card {
      &-img {
        .userPlace-img {
          background: silver;
          border: 3px dotted #808080;
        }
      }
    }
  }
  > li:nth-child(3) {
    .user-card {
      box-shadow: 0px 0px 18px 7px rgba(214, 93, 46, 1);
      &-img {
        .userPlace-img {
          background: #ec855c;
          border: 3px dotted #d65d2e;
        }
      }
    }
  }
}

.famePlant-list,
.fameUsers-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  // width: 75%;
  margin: 0;
  padding: 0;
  justify-content: center;
}

.famePlant-list {
  > li {
    font-size: 2rem;
    flex-basis: calc(25% - 30px);
    margin: 15px;
  }

  > li:nth-child(1),
  > li:nth-child(2),
  > li:nth-child(3) {
    flex-basis: calc(33% - 30px);
    border-radius: 45px;
    .card {
      height: 300px;
    }
  }
  > li:nth-child(1) {
    border: 9px solid gold;
    .card-place {
      background: yellow;
      border: 3px solid gold;
    }
  }
  > li:nth-child(2) {
    border: 9px solid silver;
    .card-place {
      background: silver;
      border: 3px solid rgb(128, 128, 128);
    }
  }
  > li:nth-child(3) {
    border: 9px solid #ec855c;
    .card-place {
      background: #ec855c;
      border: 3px solid #d65d2e;
    }
  }
}
.fame-pagination {
  text-align: center;
  font-size: 2rem;
  margin-top: 5rem;
  .page-item {
    > a {
      border: none;
    }
  }
}
@import "./src/assets/styles/rwd/fame.scss";
</style>
