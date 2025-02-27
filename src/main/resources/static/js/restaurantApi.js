import { config } from "./config.js";

// APIのベースURLを取得
const API_BASE_URL = config.apiBaseUrl;

// ジャンルデータ取得
export function fetchGenres() {
  return $.ajax({
    url: `${API_BASE_URL}/common/select-options/genre`,
    method: "GET",
    dataType: "json",
  }).fail(function (error) {
    alert("ジャンルデータの取得に失敗しました", error);
    return [];
  });
}

// 店舗データとロゴURL取得
export function fetchRestaurantsWithLogos() {
  return $.ajax({
    url: `${API_BASE_URL}/restaurant/get/nearby`,
    method: "GET",
    dataType: "json",
    headers: {
      userId: "1",
    },
  })
    .then(function (restaurants) {
      // 各店舗データにロゴURLを追加
      return restaurants.map(function (restaurant) {
        restaurant.logoUrl = `${API_BASE_URL}/restaurant/get/logo?id=${restaurant.restaurantId}`;
        return restaurant;
      });
    })
    .fail(function (error) {
      alert("店舗データの取得に失敗しました:", error);
      return [];
    });
}
