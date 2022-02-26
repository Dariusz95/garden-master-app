<template>
  <div class="comment">
    <div class="comment-user">
      <div>
        <span class="comment-user-login">{{ comment.owner.login }}</span>
        <span class="comment-user-relTime">{{ relativeDate() }}</span>
      </div>

      <span class="comment-user-createTime">{{ createDate() }}</span>
    </div>

    <div class="comment-content" :class="{ isOwner: isOwnerComment }">
      <span>{{ comment.comment }} </span>
      <button v-if="isOwner">Usuń</button>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import { mapGetters } from "vuex";
export default {
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isOwnerComment: false,
    };
  },
  name: "comment",
  computed: {
    ...mapGetters(["getCurrentUser"]),
    isOwner() {
      if (this.getCurrentUser.login == this.comment.owner.login) {
        this.isOwnerComment = true;
        return true;
      }
    },
  },

  methods: {
    createDate() {
      return moment(this.comment.create_date).format(" D-MM-YYYY , HH:mm:ss");
    },
    relativeDate() {
      return moment(this.comment.create_date).fromNow();
    },
  },
};
</script>
<style lang="scss" scoped>
.comment {
  padding: 10px;
  border-radius: 15px;
  background: #ffffff6b;
  &-user {
    display: flex;
    justify-content: space-between;
    span {
      font-size: 1.6rem;
    }
    span:first-child {
      margin-right: 1rem;
      font-weight: bold;
    }
  }
  &-content {
    display: flex;
    font-size: 2.6rem;
    > button {
      border: 1px solid black;
      border-radius: 10px;
      background: #ff0000d9;
      font-size: 1.6rem;
      padding: 6px 25px;
    }
  }
  &-content.isOwner {
    justify-content: space-between;
  }
}
</style>
