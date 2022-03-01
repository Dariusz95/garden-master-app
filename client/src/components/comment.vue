<template>
  <transition name="fade">
    <div class="comment">
      <div class="comment-user">
        <div>
          <span class="comment-user-login">{{ comment.owner.login }}</span>
          <span class="comment-user-relTime">{{ relativeDate() }}</span>
        </div>
        <div>
          <button
            class="btn editCommentBtn"
            v-if="isOwner"
            @click="editComment()"
          >
            Edytuj
          </button>
          <button
            class="btn saveEditCommentBtn"
            v-if="isOwner && isCommentEdit"
            @click="saveEditComment()"
          >
            Zapisz
          </button>
          <button
            class="btn deleteCommentBtn"
            v-if="isOwner"
            @click="deleteComment()"
          >
            Usuń
          </button>
          <span class="comment-user-createTime">{{ createDate() }}</span>
        </div>
      </div>

      <div class="comment-content" :class="{ isOwner: isOwner }">
        <p v-if="!isCommentEdit">{{ comment.comment }}</p>
        <textarea
          class="editComment"
          v-if="isCommentEdit"
          type="text"
          v-model="comment.comment"
        />
      </div>
    </div>
  </transition>
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
      isCommentEdit: false,
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
    deleteComment() {
      console.log("klik w child");
      this.$emit("deleteComment", this.comment._id);
    },
    editComment() {
      this.isCommentEdit = !this.isCommentEdit;
    },
    saveEditComment() {
      this.$emit("updateComment", this.comment._id, this.comment.comment);
      this.isCommentEdit = false;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../assets/styles/_main.scss";
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
    .btn {
      padding: 0px 20px;
      background: red;
      height: 100%;
      font-size: 1.4rem;
      border-radius: 10px;
    }
    .editCommentBtn {
      margin-right: 5px;
      background: $editBtnColor;
    }
    .deleteCommentBtn {
      background: $deleteBtnColor;
    }
    .saveEditCommentBtn {
      background: green;
    }
  }
  &-content {
    display: flex;
    font-size: 2.6rem;
    word-break: break-word;
    margin-top: 5px;
    p {
      margin-bottom: 0;
    }
    > button {
      border: 1px solid black;
      border-radius: 10px;
      background: #ff0000d9;
      font-size: 1.6rem;
      padding: 6px 25px;
      max-height: 40px;
      min-width: 100px;
    }
    .editComment {
      width: 100%;
      border: 1px solid black;
      border-radius: 10px;
      padding-left: 5px;
    }
  }
  &-content.isOwner {
    justify-content: space-between;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
