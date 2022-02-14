<template>
  <div class="plants">
    <div class="cards">
      <div class="card">
        <img
          src="https://bi.im-g.pl/im/03/da/17/z25010179ICR,Kiedy-kupujemy-pomidory--wybierajmy-sztuki-dojrzal.jpg"
          alt="plant image"
        />
        <div class="card__author">Autor : Janek Kowalski</div>
        <div class="card__likes">
          <i class="fas fa-thumbs-up"></i>
          <span>0</span>
        </div>
      </div>
      <div class="card">asdsad</div>
      <div class="card">asdsad</div>
      <div class="card">asdsad</div>
      <div class="card">asdsad</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "plants",
};
</script>
<style lang="scss">
.plants {
  width: 70%;
  margin: 0 auto;
}
.cards {
  display: flex;
  flex-wrap: wrap;
}
.card {
  display: flex;
  flex-direction: row;
  flex: 0 1 calc(50% - 20px);
  position: relative;
  height: 300px;
  border: 1px solid black;
  margin: 0 5px;
  overflow: hidden;
  border-radius: 15px;
  margin: 10px 10px;
  &__author {
    position: absolute;
    bottom: 0;
    text-align: center;
    background-color: #000000e8;
    color: white;
    width: 100%;
  }
  img {
    width: 100%;
    height: 100%;
    transition: width 0.5s;
  }
  &__likes {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-evenly;
    font-size: 1.6rem;
    padding: 0 10px;
    transition: all 0.5s;
    background: #00000008;
    i {
      cursor: pointer;
    }
  }
}
.card:hover {
  .card__likes {
    width: 25%;
    align-items: center;
    font-size: 2.5rem;
    background: #0000003b;
  }
}
</style>
