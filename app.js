const grid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
let currentCategory = "all";
function lineUrl(name, price) {
  const text = encodeURIComponent(`我要詢問\n${name}\n價格：NT$${price}`);
  return `https://line.me/R/ti/p/~jimmy141319?text=${text}`;
}
function labelCategory(cat) {
  if (cat === "full") return "全罩";
  if (cat === "open") return "3/4";
  if (cat === "offroad") return "越野";
  if (cat === "retro") return "復古";
  return cat;
}
function renderProducts() {
  const keyword = (searchInput?.value || "").trim().toLowerCase();
  const filtered = products.filter(p => {
    const catOk = currentCategory === "all" || p.category === currentCategory;
    const keyOk = !keyword || p.name.toLowerCase().includes(keyword);
    return catOk && keyOk;
  });
  if (!filtered.length) {
    grid.innerHTML = `<div class="empty">沒有符合條件的商品</div>`;
    return;
  }
  grid.innerHTML = filtered.map(p => `
    <article class="card">
      <img src="${p.img}" alt="${p.name}">
      <div class="card-body">
        <span class="tag">${labelCategory(p.category)}</span>
        <h3>${p.name}</h3>
        <p class="price">NT$${p.price}</p>
        <a class="buy-btn" href="${lineUrl(p.name, p.price)}" target="_blank" rel="noopener">LINE詢問</a>
      </div>
    </article>
  `).join("");
}
function setCategory(cat, btn) {
  currentCategory = cat;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderProducts();
}
window.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  if (searchInput) searchInput.addEventListener('input', renderProducts);
});
