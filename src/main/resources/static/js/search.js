import { genres, stores } from "./sampleData.js";

// ジャンルリスト生成メソッド
function renderGenreList() {
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

  // ジャンルクリックのイベントハンドラを設定
  $(".genre-box").on("click", function () {
    // 選択状態の更新
    updateGenreSelection($(this));

    // フィルタリング処理
    const genreId = $(this).data("genre-id");
    filterStoresByGenre(genreId);
  });
}

// ジャンルの選択状態を更新するメソッド
function updateGenreSelection($clickedGenre) {
  // 全てのジャンルボックスから選択状態を解除
  $(".genre-box").removeClass("selected");
  // クリックされたジャンルボックスに選択状態を適用
  $clickedGenre.addClass("selected");
}

// 店舗のフィルタリングを行うメソッド
function filterStoresByGenre(genreId) {
  // 検索フォームをクリア
  $(".search-input").val("");
  const filteredStores = stores.filter((store) =>
    store.genreId.includes(genreId)
  );
  renderStoreList(filteredStores);
}

// 検索処理メソッド
function handleSearch(searchText) {
  // 検索文字列の正規化
  searchText = searchText.toLowerCase().trim();

  // 検索文字列が短すぎる場合は空のリストを表示
  if (searchText.length < 2) {
    renderStoreList([]);
    return;
  }

  // ジャンル選択を解除
  $(".genre-box").removeClass("selected");

  // 店舗のフィルタリング
  const filteredStores = stores.filter((store) => {
    const matchesStoreName = store.restaurantName
      .toLowerCase()
      .includes(searchText);
    const matchesGenreName = genres.some(
      (genre) =>
        store.genreId.includes(genre.id) &&
        genre.name.toLowerCase().includes(searchText)
    );
    return matchesStoreName || matchesGenreName;
  });

  renderStoreList(filteredStores);
}

// 店舗リスト生成メソッド
function renderStoreList(storeList) {
  const $noResults = $(".no-results");
  const $storeList = $(".store-list");

  // 店舗が0件の場合
  if (storeList.length === 0) {
    $noResults.removeClass("hidden");
    $storeList.html(""); // 店舗リストを空にする
    return;
  }
  // 店舗がある場合
  $noResults.addClass("hidden");

  const storeHtml = storeList
    .map(
      (store) =>
        `<div class="store-box">
          <div class="store-image-container">
            <img src="/images/ramen.jpeg" alt="" class="store-image">
          </div>
          <h1 class="store-name">
            ${
              store.restaurantName.length > 14
                ? `${store.restaurantName.slice(0, 14)}...`
                : store.restaurantName
            }
          </h1>
        </div>`
    )
    .join("");
  $storeList.html(storeHtml);
}

$(function () {
  renderGenreList();
  // 検索入力のイベントハンドラを設定
  $(".search-input").on("input", function () {
    handleSearch($(this).val());
  });
  // フォームのデフォルト送信を防止
  $(".search-form").on("submit", function (e) {
    e.preventDefault();
  });
});

// // ジャンルリストの生成
// function renderGenres() {
//   const container = document.getElementById("genreContainer");
//   genres.forEach((genre) => {
//     const genreBox = document.createElement("div");
//     genreBox.className = "genre-box";
//     genreBox.innerHTML = `
//         <img src="/images/ramen.jpeg" alt="">
//             <p>${genre.name}</p>
//         `;
//     genreBox.onclick = () => handleGenreClick(genre.id);
//     container.appendChild(genreBox);
//   });
// }

// // 店舗リストの生成
// function renderStores(filteredStores) {
//   const container = document.getElementById("storeContainer");
//   const noResults = document.getElementById("noResults");
//   container.innerHTML = "";

//   if (hasSearched && filteredStores.length === 0) {
//     container.classList.add("hidden");
//     noResults.classList.remove("hidden");
//   } else {
//     container.classList.remove("hidden");
//     noResults.classList.add("hidden");
//     filteredStores.forEach((store) => {
//       const storeBox = document.createElement("div");
//       storeBox.className = "store-box";
//       storeBox.innerHTML = `
//                 <a href="/customer/menu?restaurantId=${store.restaurantId}">
//                     <div class="store-image-container">
//                         <img src="${store.imageUrl}" alt="" class="store-image">
//                     </div>
//                     <h1 class="store-name">${
//                       store.restaurantName.length > 14
//                         ? `${store.restaurantName.slice(0, 14)}...`
//                         : store.restaurantName
//                     }</h1>
//                 </a>
//             `;
//       container.appendChild(storeBox);
//     });
//   }
// }

// // ジャンルクリック時の処理
// function handleGenreClick(genreId) {
//   selectedGenreId = genreId;
//   hasSearched = true;
//   document.getElementById("searchInput").value = "";

//   // ジャンルの選択状態を更新
//   document.querySelectorAll(".genre-box").forEach((box) => {
//     box.classList.remove("selected");
//   });
//   const selectedBox = document.querySelector(
//     `.genre-box:nth-child(${genreId})`
//   );
//   if (selectedBox) selectedBox.classList.add("selected");

//   // 店舗のフィルタリング
//   const filteredStores = stores.filter((store) =>
//     store.genreId.includes(genreId)
//   );
//   renderStores(filteredStores);
// }

// // 検索処理
// function handleSearch(searchText) {
//   searchText = searchText.toLowerCase().trim();
//   hasSearched = true;
//   selectedGenreId = -1;

//   // ジャンルの選択状態をリセット
//   document.querySelectorAll(".genre-box").forEach((box) => {
//     box.classList.remove("selected");
//   });

//   if (searchText.length < 2) {
//     renderStores([]);
//     return;
//   }

//   const filteredStores = stores.filter((store) => {
//     const matchesStoreName = store.restaurantName
//       .toLowerCase()
//       .includes(searchText);
//     const matchesGenreName = genres.some(
//       (genre) =>
//         store.genreId.includes(genre.id) &&
//         genre.name.toLowerCase().includes(searchText)
//     );
//     return matchesStoreName || matchesGenreName;
//   });

//   renderStores(filteredStores);
// }

// // 初期化
// document.addEventListener("DOMContentLoaded", () => {
//   renderGenres();
//   renderStores([]);

//   // 検索フォームのイベントリスナー
//   const searchInput = document.getElementById("searchInput");
//   searchInput.addEventListener("input", (e) => {
//     handleSearch(e.target.value);
//   });

//   // フォームのデフォルト送信を防止
//   document.getElementById("searchForm").addEventListener("submit", (e) => {
//     e.preventDefault();
//   });
// });
