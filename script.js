/* =========================================================
   LUMORA JEWELS — site interactions
   ========================================================= */

const WHATSAPP_NUMBER = "919829011223"; // demo number, configure here
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function waLink(text){ return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(text); }

/* =========================================================
   HEADER: solid on scroll, mobile nav, scrollspy, search
   ========================================================= */
const header = document.getElementById("site-header");
const navToggle = document.getElementById("nav-toggle");
const mainNav = document.getElementById("main-nav");

window.addEventListener("scroll", () => {
  header.classList.toggle("solid", window.scrollY > 40);
  document.getElementById("back-to-top").classList.toggle("visible", window.scrollY > 600);
});

navToggle.addEventListener("click", () => {
  const open = mainNav.classList.toggle("open");
  navToggle.classList.toggle("open", open);
  navToggle.setAttribute("aria-expanded", open ? "true" : "false");
});
mainNav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  mainNav.classList.remove("open");
  navToggle.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
}));

const navLinks = document.querySelectorAll("[data-nav]");
const navSections = Array.from(navLinks).map(a => document.querySelector(a.getAttribute("href"))).filter(Boolean);
function updateActiveNav(){
  let current = navSections[0];
  navSections.forEach(sec => { if (window.scrollY + 140 >= sec.offsetTop) current = sec; });
  navLinks.forEach(a => a.classList.toggle("active", document.querySelector(a.getAttribute("href")) === current));
}
window.addEventListener("scroll", updateActiveNav);
updateActiveNav();

document.getElementById("scroll-indicator").addEventListener("click", () => {
  document.querySelector(".trust-bar").scrollIntoView({ behavior: "smooth" });
});
document.getElementById("back-to-top").addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

document.querySelectorAll(".js-whatsapp").forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    window.open(waLink(btn.dataset.waText || "Hi Lumora Jewels, I have a question."), "_blank");
  });
});

const searchToggle = document.getElementById("search-toggle");
const searchPanel = document.getElementById("search-panel");
searchToggle.addEventListener("click", () => {
  const open = searchPanel.hidden;
  searchPanel.hidden = !open;
  searchToggle.setAttribute("aria-expanded", open ? "true" : "false");
  if (open) document.getElementById("search-input").focus();
});
document.getElementById("search-close").addEventListener("click", () => {
  searchPanel.hidden = true;
  searchToggle.setAttribute("aria-expanded", "false");
});

/* account / bag icons are demo-only affordances */
["account-toggle", "bag-toggle"].forEach(id => {
  document.getElementById(id).addEventListener("click", () => {
    alert("This is a demo — account and bag features aren't wired up in this sales preview.");
  });
});

/* =========================================================
   DATA
   ========================================================= */
const COLLECTIONS = [
  { name: "Bridal", desc: "Rani haars, chokers and sets built for the big day.", tone: "a" },
  { name: "Diamond", desc: "Certified stones, set with quiet precision.", tone: "b" },
  { name: "Gold", desc: "18K and 22K, from daily wear to heirloom.", tone: "c" },
  { name: "Everyday", desc: "Lighter pieces designed to be worn often.", tone: "a" },
  { name: "Heritage", desc: "Traditional Rajasthani motifs, reimagined.", tone: "b" },
  { name: "Contemporary", desc: "Clean lines for a modern wardrobe.", tone: "c" }
];
document.getElementById("collection-grid").innerHTML = COLLECTIONS.map(c => `
  <article class="collection-card">
    <div class="ph-photo tone-${c.tone}"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="26" fill="none" stroke="#C8A868" stroke-opacity="0.45" stroke-width="1"/></svg></div>
    <div class="collection-card-info">
      <h3>${c.name}</h3>
      <p>${c.desc}</p>
      <a href="#shop">Explore ${c.name}</a>
    </div>
  </article>`).join("");

const PRODUCTS = [
  { name: "Amara Diamond Ring", code: "LJ-RG-1042", cat: "Rings", price: 68500, material: "18K White Gold", purity: "18K", diamond: "0.45 ct, VS clarity", size: "Ring size 6–9 (adjustable)", desc: "A solitaire-style ring with a bezel-set centre stone, finished by hand.", badge: "Bestseller", rating: 4.8, stock: "In Stock", tone: "a", tone2: "b" },
  { name: "Meera Gold Necklace", code: "LJ-NK-2031", cat: "Necklaces", price: 142000, material: "22K Yellow Gold", purity: "22K", diamond: "—", size: "18 inch chain", desc: "A traditional temple-inspired necklace with hand-finished detailing.", badge: "New", rating: 4.9, stock: "In Stock", tone: "b", tone2: "c" },
  { name: "Zara Diamond Earrings", code: "LJ-ER-3087", cat: "Earrings", price: 54000, material: "18K White Gold", purity: "18K", diamond: "0.30 ct total, VVS", size: "18mm drop", desc: "Everyday diamond studs with a subtle drop, light enough for all-day wear.", badge: "", rating: 4.7, stock: "In Stock", tone: "c", tone2: "a" },
  { name: "Kiara Gold Bangles (Set of 2)", code: "LJ-BG-4019", cat: "Bangles", price: 96000, material: "22K Yellow Gold", purity: "22K", diamond: "—", size: "2.6 inch diameter", desc: "A matched pair with hand-engraved floral detailing.", badge: "Limited", rating: 4.8, stock: "Only 3 left", tone: "a", tone2: "c" },
  { name: "Ira Diamond Bracelet", code: "LJ-BR-5064", cat: "Bracelets", price: 78000, material: "18K Rose Gold", purity: "18K", diamond: "0.6 ct total, VS", size: "7 inch, adjustable", desc: "A tennis-style bracelet in warm rose gold, diamonds set in a continuous line.", badge: "", rating: 4.9, stock: "In Stock", tone: "b", tone2: "a" },
  { name: "Anaya Mangalsutra", code: "LJ-MS-6023", cat: "Mangalsutra", price: 64000, material: "22K Yellow Gold, Black Beads", purity: "22K", diamond: "—", size: "20 inch chain", desc: "A modern take on the traditional design, in a shorter everyday length.", badge: "Bestseller", rating: 4.8, stock: "In Stock", tone: "c", tone2: "b" },
  { name: "Vera Diamond Pendant", code: "LJ-PD-7011", cat: "Pendants", price: 41000, material: "18K White Gold", purity: "18K", diamond: "0.25 ct, VS", size: "12mm, 16 inch chain", desc: "A single solitaire pendant on a fine box chain.", badge: "New", rating: 4.7, stock: "In Stock", tone: "a", tone2: "b" },
  { name: "Royal Bridal Set", code: "LJ-BS-8090", cat: "Bridal Sets", price: 385000, material: "22K Yellow Gold", purity: "22K", diamond: "1.2 ct total, VS", size: "Necklace, earrings, maang tikka", desc: "A complete rani haar set with matching earrings and maang tikka.", badge: "Exclusive", rating: 5.0, stock: "Made to Order", tone: "b", tone2: "c" },
  { name: "Pari Diamond Nose Pin", code: "LJ-NP-9012", cat: "Nose Pins", price: 18500, material: "18K White Gold", purity: "18K", diamond: "0.08 ct, VS", size: "Standard screw fit", desc: "A delicate everyday nose pin with a single brilliant-cut diamond.", badge: "New", rating: 4.6, stock: "In Stock", tone: "c", tone2: "a" },
  { name: "Rajveer Men's Gold Chain", code: "LJ-MN-9034", cat: "Men's Jewellery", price: 118000, material: "22K Yellow Gold", purity: "22K", diamond: "—", size: "22 inch, curb link", desc: "A substantial curb-link chain, hand-polished to a mirror finish.", badge: "Bestseller", rating: 4.8, stock: "In Stock", tone: "a", tone2: "c" }
];
const CATEGORIES = ["All", "Rings", "Necklaces", "Earrings", "Bangles", "Bracelets", "Mangalsutra", "Pendants", "Nose Pins", "Bridal Sets", "Men's Jewellery"];

const wishlist = new Set();
function updateWishlistCount(){ document.getElementById("wishlist-count").textContent = wishlist.size; }

function productCardHTML(p, i){
  const badgeHTML = p.badge ? `<span class="product-badge">${p.badge}</span>` : "";
  const stockClass = p.stock === "In Stock" ? "in" : (p.stock === "Made to Order" ? "made" : "low");
  return `
  <article class="product-card">
    <div class="product-photo">
      <div class="ph-photo tone-${p.tone} layer-base">
        <svg viewBox="0 0 24 24" fill="none" stroke="#F3EDE1" stroke-opacity="0.4" stroke-width="1.2"><circle cx="12" cy="12" r="7"/></svg>
      </div>
      <div class="ph-photo tone-${p.tone2} layer-hover">
        <svg viewBox="0 0 24 24" fill="none" stroke="#C8A868" stroke-opacity="0.55" stroke-width="1.2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>
      </div>
      ${badgeHTML}
      <button type="button" class="wishlist-btn js-wishlist" data-name="${p.name}" aria-label="Add ${p.name} to wishlist">
        <svg viewBox="0 0 24 24" fill="none" stroke-width="1.6"><path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0112 6a5.5 5.5 0 019.5 6c-2.5 4.5-9.5 9-9.5 9z"/></svg>
      </button>
    </div>
    <div class="product-body">
      <div class="product-body-top">
        <span class="product-cat">${p.cat}</span>
        <span class="product-stock stock-${stockClass}">${p.stock}</span>
      </div>
      <h3>${p.name}</h3>
      <span class="product-meta">${p.purity} · ${p.diamond !== "—" ? p.diamond : p.material}</span>
      <span class="product-rating">★ ${p.rating.toFixed(1)}</span>
      <div class="product-footer"><span class="product-price">₹${p.price.toLocaleString("en-IN")}</span></div>
    </div>
    <div class="product-actions">
      <button type="button" class="btn btn-outline js-quickview" data-index="${i}">Quick View</button>
      <button type="button" class="btn btn-primary js-order" data-index="${i}">Order Now</button>
    </div>
  </article>`;
}

const productGrid = document.getElementById("product-grid");
function renderProducts(cat){
  const list = cat === "All" ? PRODUCTS : PRODUCTS.filter(p => p.cat === cat);
  productGrid.innerHTML = list.map((p) => productCardHTML(p, PRODUCTS.indexOf(p))).join("");
  bindProductCardEvents();
}
function bindProductCardEvents(){
  productGrid.querySelectorAll(".js-quickview").forEach(btn => btn.addEventListener("click", () => openProductModal(Number(btn.dataset.index))));
  productGrid.querySelectorAll(".js-order").forEach(btn => btn.addEventListener("click", () => openOrderModal(Number(btn.dataset.index))));
  productGrid.querySelectorAll(".js-wishlist").forEach(btn => {
    btn.addEventListener("click", () => {
      const name = btn.dataset.name;
      if (wishlist.has(name)){ wishlist.delete(name); btn.classList.remove("active"); }
      else { wishlist.add(name); btn.classList.add("active"); }
      updateWishlistCount();
    });
  });
}

const categoryTabs = document.getElementById("category-tabs");
function renderCategoryTabs(active){
  categoryTabs.innerHTML = CATEGORIES.map(cat => `<button type="button" class="category-tab ${cat===active?'active':''}" data-cat="${cat}">${cat}</button>`).join("");
  categoryTabs.querySelectorAll(".category-tab").forEach(btn => {
    btn.addEventListener("click", () => { renderCategoryTabs(btn.dataset.cat); renderProducts(btn.dataset.cat); });
  });
}
renderCategoryTabs("All");
renderProducts("All");

function enquireProduct(i){
  const p = PRODUCTS[i];
  const msg = `Hi Lumora Jewels, I'd like to enquire about:\n\n${p.name} (${p.code})\nPrice: ₹${p.price.toLocaleString("en-IN")}\n\nCould you share more details?`;
  window.open(waLink(msg), "_blank");
}

/* ---------- product modal ---------- */
const productModal = document.getElementById("product-modal");
const productModalFrame = document.getElementById("product-modal-frame");
const productModalThumbs = document.getElementById("product-modal-thumbs");
const productModalBody = document.getElementById("product-modal-body");

function openProductModal(index){
  const p = PRODUCTS[index];
  productModalBody.innerHTML = `
    <h3>${p.name}</h3>
    <span class="product-modal-code">Product Code: ${p.code}</span>
    <div class="product-modal-price">₹${p.price.toLocaleString("en-IN")}</div>
    <div class="product-modal-specs">
      <div><strong>Material</strong>${p.material}</div>
      <div><strong>Gold Purity</strong>${p.purity}</div>
      <div><strong>Diamond / Stone</strong>${p.diamond}</div>
      <div><strong>Dimensions</strong>${p.size}</div>
    </div>
    <p class="desc">${p.desc}</p>
    <div class="product-modal-info">
      <span>Availability: In stock, ships in 3–5 business days</span>
      <span>Delivery: Insured shipping across India</span>
      <span>Packaging: Signature Lumora presentation box</span>
      <span>Returns: 7-day exchange, certification included</span>
    </div>
    <div class="product-modal-actions">
      <button type="button" class="btn btn-primary js-modal-order">Order Now</button>
      <button type="button" class="btn btn-outline js-modal-enquire">Enquire on WhatsApp</button>
      <button type="button" class="btn btn-outline js-modal-wishlist">Add to Wishlist</button>
      <button type="button" class="btn btn-outline js-modal-callback">Request Callback</button>
    </div>
  `;
  const tones = [p.tone, "a", "b", "c"];
  function setFrame(tone){
    productModalFrame.className = "product-modal-frame ph-photo tone-" + tone;
    productModalFrame.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="#F3EDE1" stroke-opacity="0.4" stroke-width="1.2"><circle cx="12" cy="12" r="7"/></svg>`;
  }
  setFrame(tones[0]);
  productModalThumbs.innerHTML = tones.map((t, i) => `<div class="ph-photo tone-${t} ${i===0?'active':''}" data-tone="${t}"></div>`).join("");
  productModalThumbs.querySelectorAll(".ph-photo").forEach(thumb => {
    thumb.addEventListener("click", () => {
      productModalThumbs.querySelectorAll(".ph-photo").forEach(t => t.classList.remove("active"));
      thumb.classList.add("active");
      setFrame(thumb.dataset.tone);
    });
  });
  productModal.querySelector(".js-modal-enquire").addEventListener("click", () => enquireProduct(index));
  productModal.querySelector(".js-modal-order").addEventListener("click", () => { productModal.hidden = true; openOrderModal(index); });
  productModal.querySelector(".js-modal-wishlist").addEventListener("click", (e) => {
    if (wishlist.has(p.name)) wishlist.delete(p.name); else wishlist.add(p.name);
    updateWishlistCount();
    e.target.textContent = wishlist.has(p.name) ? "Added to Wishlist ✓" : "Add to Wishlist";
  });
  productModal.querySelector(".js-modal-callback").addEventListener("click", (e) => {
    e.target.textContent = "We'll call you shortly ✓";
  });
  productModal.hidden = false;
  document.getElementById("product-modal-close").focus();
}
document.getElementById("product-modal-close").addEventListener("click", () => productModal.hidden = true);
productModal.addEventListener("click", (e) => { if (e.target === productModal) productModal.hidden = true; });
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !productModal.hidden) productModal.hidden = true; });

/* =========================================================
   ORDER MODAL — composes an email to the store owner
   Sent via mailto: (opens the customer's own email app).
   No backend in this demo, so this is the reliable no-server option.
   ========================================================= */
const STORE_EMAIL = "deepaknishad08345@gmail.com"; // order emails go here
const orderModal = document.getElementById("order-modal");
const orderForm = document.getElementById("order-form");
let currentOrderProductIndex = null;

function openOrderModal(index){
  currentOrderProductIndex = index;
  const p = PRODUCTS[index];
  document.getElementById("order-modal-product-name").textContent = p.name;
  document.getElementById("order-modal-product-price").textContent = `₹${p.price.toLocaleString("en-IN")} · ${p.code}`;
  document.getElementById("order-form-message").textContent = "";
  document.getElementById("order-form-message").className = "form-message";
  orderForm.reset();
  orderForm.quantity.value = 1;
  orderModal.hidden = false;
  document.getElementById("order-modal-close").focus();
}
document.getElementById("order-modal-close").addEventListener("click", () => orderModal.hidden = true);
orderModal.addEventListener("click", (e) => { if (e.target === orderModal) orderModal.hidden = true; });
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !orderModal.hidden) orderModal.hidden = true; });

orderForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = document.getElementById("order-form-message");
  if (!orderForm.checkValidity()){
    message.textContent = "Please fill in all required fields.";
    message.className = "form-message error";
    orderForm.reportValidity();
    return;
  }
  const p = PRODUCTS[currentOrderProductIndex];
  const f = orderForm;
  const qty = Number(f.quantity.value) || 1;
  const total = p.price * qty;
  const orderRef = "LJ-ORD-" + Math.floor(100000 + Math.random() * 900000);

  const subject = `New Order ${orderRef} — ${p.name} (Lumora Jewels)`;
  const bodyLines = [
    `New order from the Lumora Jewels website`,
    ``,
    `Order Reference: ${orderRef}`,
    `Product: ${p.name} (${p.code})`,
    `Quantity: ${qty}`,
    `Price per item: ₹${p.price.toLocaleString("en-IN")}`,
    `Estimated Total: ₹${total.toLocaleString("en-IN")}`,
    ``,
    `Customer Name: ${f.name.value.trim()}`,
    `Phone: ${f.phone.value.trim()}`,
    f.email.value.trim() ? `Email: ${f.email.value.trim()}` : null,
    `Delivery Address: ${f.address.value.trim()}`,
    f.notes.value.trim() ? `Notes: ${f.notes.value.trim()}` : null
  ].filter(Boolean);

  const mailto = `mailto:${STORE_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join("\n"))}`;

  message.className = "form-message success";
  message.innerHTML = `Order ${orderRef} ready — opening your email app to send it to our store. If it doesn't open, <a href="${mailto}" style="color:inherit; text-decoration:underline;">click here</a>.`;

  window.location.href = mailto;
});

/* =========================================================
   BRIDAL GRID
   ========================================================= */
const BRIDAL_ITEMS = [
  { name: "Rani Haar", tone: "a" }, { name: "Choker Set", tone: "b" },
  { name: "Bridal Jhumka Earrings", tone: "c" }, { name: "Kada Bangles", tone: "a" }
];
document.getElementById("bridal-grid").innerHTML = BRIDAL_ITEMS.map(x => `
  <div class="bridal-item"><div class="ph-photo tone-${x.tone}"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="24" fill="none" stroke="#B98A72" stroke-opacity="0.45" stroke-width="1"/></svg></div><span>${x.name}</span></div>`).join("");

/* =========================================================
   GOLD GRID
   ========================================================= */
const GOLD_ITEMS = [
  { name: "Classic Gold Chain", purity: "22K", weight: "18.5g", price: 108000, tone: "a" },
  { name: "Everyday Gold Studs", purity: "18K", weight: "4.2g", price: 28500, tone: "b" },
  { name: "Traditional Gold Bangle", purity: "22K", weight: "22g", price: 132000, tone: "c" },
  { name: "Modern Gold Ring", purity: "18K", weight: "5.8g", price: 34500, tone: "a" }
];
document.getElementById("gold-grid").innerHTML = GOLD_ITEMS.map(g => `
  <div class="product-card">
    <div class="product-photo ph-photo tone-${g.tone}"><svg viewBox="0 0 24 24" fill="none" stroke="#F3EDE1" stroke-opacity="0.4" stroke-width="1.2"><circle cx="12" cy="12" r="7"/></svg></div>
    <div class="product-body">
      <span class="product-cat">${g.purity} Gold</span>
      <h3>${g.name}</h3>
      <span class="product-meta">Weight: ${g.weight}</span>
      <div class="product-footer"><span class="product-price">₹${g.price.toLocaleString("en-IN")}</span></div>
    </div>
    <div class="product-actions">
      <a href="#" class="btn btn-primary btn-block js-gold-enquire" data-name="${g.name}" data-price="${g.price}">Enquire</a>
    </div>
  </div>`).join("");
document.querySelectorAll(".js-gold-enquire").forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    window.open(waLink(`Hi Lumora Jewels, I'd like to enquire about the ${btn.dataset.name} (approx ₹${Number(btn.dataset.price).toLocaleString("en-IN")}, subject to today's gold rate).`), "_blank");
  });
});

/* =========================================================
   LOOKBOOK: tabs + lightbox
   ========================================================= */
const LOOKBOOK = [
  { cat: "Bridal", caption: "Bridal styling, full look", tone: "a", size: "wide" },
  { cat: "Festive", caption: "Festive layered necklaces", tone: "b", size: "tall" },
  { cat: "Contemporary", caption: "Everyday contemporary set", tone: "c", size: "" },
  { cat: "Men's", caption: "Men's gold chain and ring", tone: "a", size: "" },
  { cat: "Close-up", caption: "Diamond setting, close-up", tone: "b", size: "" },
  { cat: "Bridal", caption: "Choker and jhumka pairing", tone: "c", size: "wide" },
  { cat: "Festive", caption: "Festive bangles stack", tone: "a", size: "" },
  { cat: "Contemporary", caption: "Minimal pendant styling", tone: "b", size: "" }
];
const lookbookCats = ["All", ...new Set(LOOKBOOK.map(l => l.cat))];
const lookbookTabs = document.getElementById("lookbook-tabs");
const lookbookGrid = document.getElementById("lookbook-grid");
let currentLookbookList = LOOKBOOK;

function renderLookbookTabs(active){
  lookbookTabs.innerHTML = lookbookCats.map(cat => `<button type="button" class="lookbook-tab ${cat===active?'active':''}" data-cat="${cat}">${cat}</button>`).join("");
  lookbookTabs.querySelectorAll(".lookbook-tab").forEach(btn => {
    btn.addEventListener("click", () => { renderLookbookTabs(btn.dataset.cat); renderLookbookGrid(btn.dataset.cat); });
  });
}
function renderLookbookGrid(cat){
  currentLookbookList = cat === "All" ? LOOKBOOK : LOOKBOOK.filter(l => l.cat === cat);
  lookbookGrid.innerHTML = currentLookbookList.map((l, i) => `
    <div class="lookbook-item ${l.size}" data-index="${i}" tabindex="0" role="button" aria-label="View: ${l.caption}">
      <div class="ph-photo tone-${l.tone}" style="height:100%;"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="26" fill="none" stroke="#C8A868" stroke-opacity="0.4" stroke-width="1"/></svg></div>
      <span class="cap">${l.caption}</span>
    </div>`).join("");
  lookbookGrid.querySelectorAll(".lookbook-item").forEach(item => {
    item.addEventListener("click", () => openLightbox(Number(item.dataset.index)));
    item.addEventListener("keydown", (e) => { if (e.key === "Enter") openLightbox(Number(item.dataset.index)); });
  });
}
renderLookbookTabs("All");
renderLookbookGrid("All");

const lightbox = document.getElementById("lightbox");
const lightboxFrame = document.getElementById("lightbox-frame");
let lbIndex = 0;
function openLightbox(i){ lbIndex = i; renderLightbox(); lightbox.hidden = false; document.getElementById("lightbox-close").focus(); }
function renderLightbox(){
  const l = currentLookbookList[lbIndex];
  lightboxFrame.innerHTML = `<div class="ph-photo tone-${l.tone}" style="height:100%;"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="26" fill="none" stroke="#C8A868" stroke-opacity="0.5" stroke-width="1"/></svg></div>`;
}
document.getElementById("lightbox-close").addEventListener("click", () => lightbox.hidden = true);
document.getElementById("lightbox-prev").addEventListener("click", () => { lbIndex = (lbIndex - 1 + currentLookbookList.length) % currentLookbookList.length; renderLightbox(); });
document.getElementById("lightbox-next").addEventListener("click", () => { lbIndex = (lbIndex + 1) % currentLookbookList.length; renderLightbox(); });
lightbox.addEventListener("click", (e) => { if (e.target === lightbox) lightbox.hidden = true; });
document.addEventListener("keydown", (e) => {
  if (lightbox.hidden) return;
  if (e.key === "Escape") lightbox.hidden = true;
  if (e.key === "ArrowLeft") document.getElementById("lightbox-prev").click();
  if (e.key === "ArrowRight") document.getElementById("lightbox-next").click();
});

/* =========================================================
   VIRTUAL TRY-ON DEMO
   ========================================================= */
const tryonCategory = document.getElementById("tryon-category");
const tryonProduct = document.getElementById("tryon-product");
const tryonUpload = document.getElementById("tryon-upload");
const tryonPreview = document.getElementById("tryon-preview");
const tryonPlaceholder = document.getElementById("tryon-placeholder");
const tryonOverlay = document.getElementById("tryon-overlay");

function populateTryonProducts(){
  const catMap = { necklace: "Necklaces", earrings: "Earrings", ring: "Rings" };
  const items = PRODUCTS.filter(p => p.cat === catMap[tryonCategory.value]);
  tryonProduct.innerHTML = (items.length ? items : PRODUCTS.slice(0,1)).map(p => `<option>${p.name}</option>`).join("");
}
tryonCategory.addEventListener("change", populateTryonProducts);
populateTryonProducts();

let uploadedImageURL = null;
tryonUpload.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;
  uploadedImageURL = URL.createObjectURL(file);
  tryonPlaceholder.hidden = true;
  let img = tryonPreview.querySelector("img");
  if (!img){ img = document.createElement("img"); tryonPreview.insertBefore(img, tryonOverlay); }
  img.src = uploadedImageURL;
});

document.getElementById("tryon-apply").addEventListener("click", () => {
  if (!uploadedImageURL){
    alert("Upload a photo first to preview the simulated try-on overlay.");
    return;
  }
  const overlaySVGs = {
    necklace: `<svg viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg"><path d="M10 5 Q50 55 90 5" fill="none" stroke="#C8A868" stroke-width="3"/><circle cx="50" cy="46" r="4" fill="#C8A868"/></svg>`,
    earrings: `<svg viewBox="0 0 40 60" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="14" r="6" fill="#C8A868"/><circle cx="20" cy="34" r="3" fill="#C8A868"/></svg>`,
    ring: `<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="14" fill="none" stroke="#C8A868" stroke-width="4"/></svg>`
  };
  const positions = { necklace: "top:58%; left:30%;", earrings: "top:22%; left:38%;", ring: "top:55%; left:45%;" };
  const cat = tryonCategory.value;
  tryonOverlay.style.cssText = positions[cat];
  tryonOverlay.innerHTML = overlaySVGs[cat];
  tryonOverlay.hidden = false;
});

/* =========================================================
   ANIMATED COUNTERS
   ========================================================= */
const counters = document.querySelectorAll("[data-counter]");
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseFloat(el.dataset.counter);
    const isDecimal = el.dataset.decimal === "true";
    const duration = 1200;
    const start = performance.now();
    function tick(now){
      const progress = Math.min((now - start) / duration, 1);
      const value = target * progress;
      el.textContent = isDecimal ? value.toFixed(1) : Math.floor(value);
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = isDecimal ? target.toFixed(1) : target;
    }
    requestAnimationFrame(tick);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.4 });
counters.forEach(el => counterObserver.observe(el));

/* =========================================================
   REVIEWS
   ========================================================= */
const REVIEWS = [
  { name: "Rhea Kapoor", cat: "Bridal Set", text: "The bridal set arrived exactly as sketched. My mother cried when she saw it — Lumora nailed every detail.", initials: "RK" },
  { name: "Aditya Malhotra", cat: "Diamond Ring", text: "Bought an engagement ring here after visiting three other stores. The certification and craftsmanship were simply better.", initials: "AM" },
  { name: "Simran Bhatia", cat: "Gold Necklace", text: "Beautiful traditional design, and the staff never once made me feel rushed while I decided.", initials: "SB" },
  { name: "Karan Vora", cat: "Custom Design", text: "Turned my late grandmother's bangle into a pendant. The team handled it with real care.", initials: "KV" },
  { name: "Nisha Reddy", cat: "Earrings", text: "Lightweight, elegant, and exactly what I wanted for everyday wear.", initials: "NR" },
  { name: "Arjun Singh", cat: "Men's Jewellery", text: "Finally a jeweller that takes men's pieces seriously. My chain gets compliments weekly.", initials: "AS" }
];
document.getElementById("review-grid").innerHTML = REVIEWS.map(r => `
  <article class="review-card">
    <span class="review-stars">★★★★★</span>
    <p class="review-text">"${r.text}"</p>
    <div class="review-author">
      <span class="review-avatar">${r.initials}</span>
      <div><strong>${r.name}</strong><span>${r.cat}</span></div>
    </div>
  </article>`).join("");

/* =========================================================
   INSTAGRAM
   ========================================================= */
const instaTones = ["a","b","c","a","b","c"];
document.getElementById("insta-grid").innerHTML = instaTones.map(t => `<div class="ph-photo tone-${t}"><svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="16" fill="none" stroke="#C8A868" stroke-opacity="0.4" stroke-width="1"/></svg></div>`).join("");

/* =========================================================
   JOURNAL
   ========================================================= */
const JOURNAL = [
  { cat: "Guides", date: "Aug 2026", title: "How to Choose the Perfect Engagement Ring", desc: "The four factors worth actually spending time on.", extra: "Start with cut and clarity before carat — a well-cut smaller diamond often outshines a larger, poorly-cut one. Set a budget first, then let our consultants show you options within it.", tone: "a" },
  { cat: "Guides", date: "Jul 2026", title: "Gold Jewellery Buying Guide", desc: "What 18K vs 22K actually means for your purchase.", extra: "22K gold is softer and richer in colour, better suited to traditional pieces. 18K holds fine detailing and stone-setting better, making it common in diamond jewellery.", tone: "b" },
  { cat: "Care", date: "Jul 2026", title: "Jewellery Care Guide", desc: "Small habits that keep a piece looking new for decades.", extra: "Store pieces flat and separated, avoid direct sunlight for extended periods, and have clasps checked annually — most repairs are far cheaper than replacing a lost piece.", tone: "c" },
  { cat: "Trends", date: "Jun 2026", title: "Bridal Jewellery Trends", desc: "What Indian brides are actually choosing this season.", extra: "Layered necklaces and detachable sets are having a moment — one piece that works for both the ceremony and the reception, without a full wardrobe change.", tone: "a" },
  { cat: "Guides", date: "Jun 2026", title: "Understanding Diamond Quality", desc: "The 4Cs, explained without the jargon.", extra: "Colour and clarity matter less to the naked eye than cut does. If you're prioritising, spend where a jeweller's loupe — not your eye — would notice the difference.", tone: "b" },
  { cat: "Style", date: "May 2026", title: "Jewellery for Every Occasion", desc: "Building a wardrobe that works from office to wedding.", extra: "One versatile diamond pendant, one gold everyday chain, and one statement bridal-adjacent piece cover most Indian social calendars.", tone: "c" }
];
document.getElementById("journal-grid").innerHTML = JOURNAL.map((j, i) => `
  <article class="journal-card">
    <div class="ph-photo tone-${j.tone}"><svg viewBox="0 0 100 60"><circle cx="50" cy="30" r="16" fill="none" stroke="#C8A868" stroke-opacity="0.4" stroke-width="1"/></svg></div>
    <div class="journal-body">
      <div class="journal-meta"><span>${j.cat}</span><span>${j.date}</span></div>
      <h3>${j.title}</h3>
      <p>${j.desc}</p>
      <p class="journal-extra" id="journal-extra-${i}">${j.extra}</p>
      <button type="button" class="journal-more" data-index="${i}">Read More</button>
    </div>
  </article>`).join("");
document.querySelectorAll(".journal-more").forEach(btn => {
  btn.addEventListener("click", () => {
    const extra = document.getElementById("journal-extra-" + btn.dataset.index);
    const open = extra.classList.toggle("open");
    btn.textContent = open ? "Read Less" : "Read More";
  });
});

/* =========================================================
   FAQ
   ========================================================= */
const FAQS = [
  { q: "Do you provide BIS hallmarked jewellery?", a: "Yes, all our gold jewellery is BIS hallmarked as standard." },
  { q: "Do you provide certificates?", a: "Yes, certified diamonds come with grading certification, and gold pieces include a purity certificate." },
  { q: "Can I customize jewellery?", a: "Absolutely — our bespoke design process takes your idea from sketch to finished piece." },
  { q: "Can I book an appointment?", a: "Yes, use the appointment form on this page or WhatsApp us directly to book a private viewing." },
  { q: "Do you offer jewellery repair?", a: "Yes, our workshop handles resizing, re-plating, stone tightening and clasp repairs." },
  { q: "Do you offer exchange?", a: "Yes, most pieces are eligible for exchange within 7 days — ask in-store for category-specific terms." },
  { q: "How does custom jewellery work?", a: "Consultation, design sketches, approval, hand-crafting, quality check, then delivery — usually 3–5 weeks." },
  { q: "How long does delivery take?", a: "In-stock pieces ship in 3–5 business days; custom pieces take 3–5 weeks depending on complexity." },
  { q: "Can I enquire through WhatsApp?", a: "Yes — tap any 'Enquire on WhatsApp' button and our team will respond personally." },
  { q: "What payment methods are available?", a: "We accept cards, UPI, bank transfer and in-store financing on select purchases." }
];
document.getElementById("faq-list").innerHTML = FAQS.map((f, i) => `
  <details class="faq-item" ${i === 0 ? "open" : ""}>
    <summary>${f.q}<span class="icon"></span></summary>
    <div class="answer">${f.a}</div>
  </details>`).join("");

/* =========================================================
   FORMS
   ========================================================= */
function handleFormSubmit(formId, messageId, successText){
  const form = document.getElementById(formId);
  const message = document.getElementById(messageId);
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.checkValidity()){
      message.textContent = "Please fill in all required fields correctly.";
      message.className = "form-message error";
      form.reportValidity();
      return;
    }
    message.textContent = successText;
    message.className = "form-message success";
    form.reset();
  });
}

const appointmentForm = document.getElementById("appointment-form");
appointmentForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = document.getElementById("appointment-message");
  if (!appointmentForm.checkValidity()){
    message.textContent = "Please fill in all required fields correctly.";
    message.className = "form-message error";
    appointmentForm.reportValidity();
    return;
  }
  const ref = "LJ-" + Math.floor(100000 + Math.random() * 900000);
  const f = appointmentForm;
  message.className = "form-message success";
  message.innerHTML = `Appointment requested — reference <strong>${ref}</strong>.<br>${f.type.value} · ${f.date.value} at ${f.time.value}. We'll confirm by phone within 2 hours.`;
  f.reset();
});

handleFormSubmit("contact-form", "contact-message", "Message sent — we'll get back to you within a day.");
handleFormSubmit("vip-form", "vip-message", "Welcome to the inner circle — look out for your first private preview.");

document.getElementById("callback-btn").addEventListener("click", () => {
  const msg = document.getElementById("callback-message");
  msg.textContent = "Callback requested — our team will reach out shortly.";
  msg.className = "form-message success";
});

const footerNewsletter = document.getElementById("footer-newsletter");
footerNewsletter.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = footerNewsletter.querySelector("input");
  if (input.value){ input.value = ""; input.placeholder = "Subscribed ✓"; }
});