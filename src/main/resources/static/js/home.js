import { genres, stores } from "./sampleData.js";

// ジャンルリスト生成メソッド
function renderGenreList() {
  const genreHtml = genres
    .map(
      (genre) =>
        `<div class="genre-box">
          <a href="#">
            <img src="/images/ramen.jpeg" alt="${genre.name}">
            <p>${genre.name}</p>
          </a>
        </div>`
    )
    .join("");
  $(".genre-list").html(genreHtml);
}

// 店舗リスト生成メソッド
function renderStoreList() {
  const storeHtml = stores
    .map(
      (store) =>
        `<div class="store-box">
          <a href="#">
            <div class="store-image-container">
              <img src="/images/ramen.jpeg" alt="${
                store.restaurantName
              }" class="store-image">
            </div>
            <div class="store-name">${
              store.restaurantName.length > 14
                ? `${store.restaurantName.slice(0, 14)}...`
                : store.restaurantName
            }</div>
          </a>
        </div>`
    )
    .join("");
  $(".store-list").html(storeHtml);
}

// DOM読み込み完了時に実行
$(function () {
  renderGenreList();
  renderStoreList();
});
