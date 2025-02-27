import { fetchGenres, fetchRestaurantsWithLogos } from "./restaurantApi.js";

// ジャンルリスト生成
function renderGenreList(genres) {
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

// 店舗リスト生成
function renderStoreList(stores) {
  const storeHtml = stores
    .map((store) => {
      const displayName =
        store.restaurantName.length > 14
          ? `${store.restaurantName.slice(0, 14)}...`
          : store.restaurantName;

      return `
        <div class="store-box">
          <a href="#">
            <div class="store-image-container">
              <img 
                src="${store.logoUrl}" 
                alt="${store.restaurantName}" 
                class="store-image"
              >
            </div>
            <div class="store-name">
              ${displayName}
            </div>
          </a>
        </div>
      `;
    })
    .join("");

  $(".store-list").html(storeHtml);
}

$(function () {
  // 初期データの読み込み
  Promise.all([fetchGenres(), fetchRestaurantsWithLogos()])
    .then(function ([genres, restaurants]) {
      renderGenreList(genres);
      renderStoreList(restaurants);
    })
    .catch(function (error) {
      alert("データの読み込みに失敗しました:", error);
    });
});
