import { fetchGenres, fetchRestaurantsWithLogos } from "./restaurantApi.js";

// グローバル変数としてデータを保持
let allGenres = [];
let allStores = [];

// ジャンルリスト生成
function renderGenreList(genres) {
  const genreHtml = genres
    .map(
      (genre) =>
        `<div class="genre-box" data-genre-id="${genre.id}">
          <img src="/images/ramen.jpeg" alt="${genre.name}">
          <p>${genre.name}</p>
        </div>`
    )
    .join("");
  $(".genre-list").html(genreHtml);

  $(".genre-box").on("click", function () {
    // 選択状態の更新
    updateGenreSelection($(this));

    // フィルタリング処理
    const genreId = $(this).data("genre-id");
    filterStoresByGenre(genreId);
  });
}

// ジャンルの選択状態更新
function updateGenreSelection($clickedGenre) {
  // 全てのジャンルボックスから選択状態を解除
  $(".genre-box").removeClass("selected");
  // クリックされたジャンルボックスに選択状態を適用
  $clickedGenre.addClass("selected");
}

// 店舗のフィルタリング
function filterStoresByGenre(genreId) {
  // 検索フォームをクリア
  $(".search-input").val("");

  // 店舗データに対してフィルタリング
  const filteredStores = allStores.filter((store) =>
    store.genreId.includes(genreId)
  );

  renderStoreList(filteredStores);
}

// 検索処理
function handleSearch(searchText) {
  // 検索文字列の正規化
  searchText = searchText.toLowerCase().trim();

  // 2文字から検索
  if (searchText.length < 2) {
    renderStoreList([]);
    return;
  }

  // ジャンル選択を解除
  $(".genre-box").removeClass("selected");

  // 店舗のフィルタリング
  const filteredStores = allStores.filter((store) => {
    const matchesStoreName = store.restaurantName
      .toLowerCase()
      .includes(searchText);
    const matchesGenreName = allGenres.some(
      (genre) =>
        store.genreId.includes(genre.id) &&
        genre.name.toLowerCase().includes(searchText)
    );
    return matchesStoreName || matchesGenreName;
  });

  renderStoreList(filteredStores);
}

// 店舗リスト生成
function renderStoreList(storeList) {
  const $noResults = $(".no-results");
  const $storeList = $(".store-list");

  // 店舗が0件の場合
  if (storeList.length === 0) {
    // 0件メッセージを表示
    $noResults.removeClass("hidden");
    // 店舗リストをクリア
    $storeList.html("");
    return;
  }
  // 店舗がある場合
  $noResults.addClass("hidden");

  const storeHtml = storeList
    .map((store) => {
      // 店舗名の表示用変数
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

  $storeList.html(storeHtml);
}

$(function () {
  // 初期データの読み込み
  Promise.all([fetchGenres(), fetchRestaurantsWithLogos()])
    .then(function ([genres, restaurants]) {
      // グローバル変数に保存
      allGenres = genres;
      allStores = restaurants;

      // UI初期化
      renderGenreList(genres);
    })
    .catch(function (error) {
      alert("データの初期化に失敗しました:", error);
    });

  $(".search-input").on("input", function () {
    handleSearch($(this).val());
  });

  // フォームのデフォルト送信を防止
  $(".search-form").on("submit", function (e) {
    e.preventDefault();
  });
});
