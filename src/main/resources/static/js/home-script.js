// サンプルデータ
const genres = [
  { id: 1, name: "ラーメン" },
  { id: 2, name: "寿司" },
  { id: 3, name: "カレー" },
];

const stores = [
  {
    restaurantId: 1,
    restaurantName: "ラーメン太郎",
    imageUrl: "/images/ramen.jpeg",
  },
  {
    restaurantId: 2,
    restaurantName: "寿司次郎",
    imageUrl: "/images/ramen.jpeg",
  },
];

// ジャンルリストの生成
function renderGenres() {
  const container = document.getElementById("genreContainer");
  genres.forEach((genre) => {
    const genreBox = document.createElement("div");
    genreBox.className = "genre-box";
    genreBox.innerHTML = `
            <a href="/customer/storeList?genreId=${genre.id}">
            <img src="/images/ramen.jpeg" alt=""> 
                <p>${genre.name}</p>
            </a>
        `;
    container.appendChild(genreBox);
  });
}

// 店舗リストの生成
function renderStores() {
  const container = document.getElementById("storeContainer");
  stores.forEach((store) => {
    const storeBox = document.createElement("div");
    storeBox.className = "store-box";
    storeBox.innerHTML = `
            <a href="/customer/menu?restaurantId=${store.restaurantId}">
                <div class="store-image-container">
                    <img src="${store.imageUrl}" alt="" class="store-image">
                </div>
                <h1 class="store-name">${
                  store.restaurantName.length > 14
                    ? `${store.restaurantName.slice(0, 14)}...`
                    : store.restaurantName
                }</h1>
            </a>
        `;
    container.appendChild(storeBox);
  });
}

// 初期化
document.addEventListener("DOMContentLoaded", () => {
  renderGenres();
  renderStores();
});
