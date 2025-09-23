/************** JS REFACTOR: Menu, Busca, Filtros, Destaques, Modal **************/
document.addEventListener("DOMContentLoaded", () => {

  // --- DOM elements (consultados aqui, quando o DOM já está pronto) ---
  const productsEl = document.getElementById('products');
  const noResultsEl = document.getElementById('noResults');
  const paginationEl = document.getElementById('pagination');
  const searchInput = document.getElementById('search');
  const clearBtn = document.getElementById('clearBtn');
  const categoriesContainer = document.querySelector('.categories');
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const modal = document.getElementById("productModal");
  const closeModalBtn = document.getElementById("closeModal");
  const searchBtn = document.querySelector('.search-btn');
  const searchBox = document.querySelector('.search-box');
  const highlightsEl = document.getElementById('highlights');

  // --- estado ---
  let currentPage = 1;
  const perPage = 8;
  let shuffledProducts = [];               // produto embaralhado para "Todos" inicial
  let currentFilter = 'all';               // categoria atual usada para filtrar (subcategoria ou categoria)
  let activeButton = null;                 // botão destacado (pode ser main ou sub)

  /************** HELPERS & FUNÇÕES **************/
  function shuffleArray(array) {
    const copy = array.slice();
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function getFilteredProducts(filter = "", category = "all") {
    const q = String(filter || "").trim().toLowerCase();

    // Página inicial: todos embaralhados quando não há busca e category === all
    if (category === "all" && q === "") {
      if (shuffledProducts.length === 0) shuffledProducts = shuffleArray(productsData);
      return shuffledProducts;
    }

    return productsData.filter(prod => {
      const number = String(productsData.indexOf(prod) + 1).padStart(2,'0');
      const matchesText =
        q === "" ||
        prod.title.toLowerCase().includes(q) ||
        prod.platform.toLowerCase().includes(q) ||
        number.includes(q);

      let matchesCategory = true;
      if (category !== "all") {
  matchesCategory =
    (Array.isArray(prod.category) ? prod.category.includes(category) : prod.category === category) ||
    (Array.isArray(prod.subcategory) ? prod.subcategory.includes(category) : prod.subcategory === category);
}


      return matchesText && matchesCategory;
    });
  }

  function renderProducts(filter = "", category = "all") {
    const filtered = getFilteredProducts(filter, category);
    const totalPages = Math.ceil(filtered.length / perPage);
    currentPage = Math.min(currentPage, totalPages) || 1;

    productsEl.innerHTML = "";
    if (filtered.length === 0) {
      noResultsEl.style.display = 'block';
      paginationEl.innerHTML = "";
      return;
    }
    noResultsEl.style.display = 'none';

    const start = (currentPage - 1) * perPage;
    const end = start + perPage;
    const pageItems = filtered.slice(start, end);

    pageItems.forEach((prod, i) => {
      const number = String(productsData.indexOf(prod) + 1).padStart(2,'0');
      const card = document.createElement('article');
      card.className = `product ${prod.category.map(c => `cat-${c}`).join(' ')}`;
      card.innerHTML = `
        <span class="number">#${number}</span>
        <img src="${prod.img}" alt="${prod.title}">
        <h3>${prod.title}</h3>
        <div class="bottom">
          <button class="more-btn" data-id="${prod.id}">+</button>
          <a href="${prod.link}" target="_blank" class="buy-link">Comprar agora</a>
          <p class="platform">Disponível em: ${prod.platform}</p>
        </div>
      `;
      card.style.animationDelay = (i * 0.12) + 's';
      productsEl.appendChild(card);
    });

    renderPagination(totalPages);
    attachMoreEvents();
  }

  function renderPagination(totalPages) {
    paginationEl.innerHTML = "";
    if (totalPages <= 1) return;
    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement('button');
      btn.textContent = i;
      if (i === currentPage) btn.classList.add('active');
      btn.addEventListener('click', () => {
        currentPage = i;
        const q = searchInput.value.toLowerCase();
        renderProducts(q, currentFilter);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
      paginationEl.appendChild(btn);
    }
  }

  function attachMoreEvents() {
    document.querySelectorAll('.more-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const prod = productsData.find(p => p.id === btn.dataset.id);
        if (prod) openModal(prod);
      });
    });
  }

  function openModal(product) {
    const modalBody = document.getElementById("modalBody");
    modalBody.innerHTML = `
      <div class="modal-body">
        <img src="${product.img}" alt="${product.title}">
        <div class="info">
          <h2>${product.title}</h2>
          <p>${product.desc}</p>
          <a href="${product.link}" target="_blank">Comprar agora</a>
          <p><strong>Disponível em:</strong> ${product.platform}</p>
        </div>
      </div>
    `;
    modal.style.display = "flex";
  }

  function renderHighlights() {
    const highlightIDs = ["P001","P002","P003","P004","P005"];
    highlightsEl.innerHTML = "";
    highlightIDs.forEach((id, index) => {
      const prod = productsData.find(p => p.id === id);
      if(prod){
        const card = document.createElement('article');
        card.className = 'product';
        card.innerHTML = `
          <div class="fogo">🔥 ${index+1}</div>
          <img src="${prod.img}" alt="${prod.title}">
          <h4>${prod.title}</h4>
          <div class="bottom">
            <button class="more-btn" data-id="${prod.id}">+</button>
          </div>
        `;
        highlightsEl.appendChild(card);
      }
    });
    attachMoreEvents();
  }

  function clearSelectedClasses() {
    document.querySelectorAll('.category, .categories button').forEach(el => el.classList.remove('selected'));
    document.querySelectorAll('.category').forEach(c => c.classList.remove('active'));
  }

function updateActiveButtons(clickedBtn, clickCategoryForFilter) {
  clearSelectedClasses();
  if (clickedBtn) {
    clickedBtn.classList.add('selected');

    const parentCategoryDiv = clickedBtn.closest('.category');
    if (parentCategoryDiv) {
      const mainBtn = parentCategoryDiv.querySelector('.main-category');
      if (mainBtn && mainBtn !== clickedBtn) {
        mainBtn.classList.add('selected');
        parentCategoryDiv.classList.add('active');
      }
    }
  } else {
    const topTodos = Array.from(categoriesContainer.children).find(
      ch => ch.tagName === 'BUTTON' && ch.dataset && ch.dataset.category === 'all'
    );
    if (topTodos) topTodos.classList.add('selected');
  }

  // atualiza currentFilter
  currentFilter = (typeof clickCategoryForFilter === 'string') ? clickCategoryForFilter : 'all';

  // --- NOVO: controlar destaques, título e classe de espaçamento ---
  const highlightsSection = document.querySelector('.highlight-section');
  const productsTitle = document.getElementById('productsTitle');
  const page = document.querySelector('.page'); // wrapper principal

  if (currentFilter === 'all') {
    // mostra destaques e título padrão
    if (highlightsSection) highlightsSection.style.display = 'block';
    if (productsTitle) productsTitle.textContent = 'Todos os produtos';
    if (page) page.classList.remove('category-mode');
  } else {
    // esconde destaques e coloca nome da categoria
    if (highlightsSection) highlightsSection.style.display = 'none';
    if (productsTitle) {
      // pega o texto do botão clicado (mais amigável que usar o dataset)
      const formatted = clickedBtn ? clickedBtn.textContent.trim() : currentFilter;
      productsTitle.textContent = formatted;
    }
    if (page) page.classList.add('category-mode');
  }
}



  function resetSearch() {
    searchInput.value = "";
    clearBtn.style.display = 'none';
    updateNotifDot();
  }

  // --- bolinha de notificação (cria apenas se houver searchBtn) ---
  let notifDot = null;
  if (searchBtn) {
    notifDot = searchBtn.querySelector('.search-notif') || null;
    if (!notifDot) {
      notifDot = document.createElement('span');
      notifDot.className = 'search-notif';
      searchBtn.appendChild(notifDot);
    }
  }
  function updateNotifDot() {
    if (!notifDot) return;
    notifDot.style.display = (searchInput && searchInput.value.trim() !== "") ? "block" : "none";
  }

  /************** SETUP EVENT LISTENERS **************/

  // inicial render
  renderProducts();
  renderHighlights();
  updateActiveButtons(null, 'all'); // marca "Todos" principal por padrão

  // hamburger: abre/fecha menu
  if (hamburgerBtn && categoriesContainer) {
    hamburgerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      categoriesContainer.classList.toggle('active');
    });
  }

  // ---- top-level buttons (ex.: o "Todos" principal que é direto filho de .categories) ----
  if (categoriesContainer) {
    const topLevelBtns = Array.from(categoriesContainer.children).filter(el => el.tagName === 'BUTTON');
    topLevelBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        // Se for o "Todos" principal (data-category === 'all'), volta ao inicial
        const cat = btn.dataset.category || 'all';
        if (cat === 'all') {
          resetSearch();
          currentPage = 1;
          updateActiveButtons(btn, 'all');
          renderProducts("", "all");
          categoriesContainer.classList.remove('active');
        } else {
          // caso você tenha outros botões top-level (raro), tratar aqui se necessário
          resetSearch();
          currentPage = 1;
          updateActiveButtons(btn, cat);
          renderProducts("", cat);
          categoriesContainer.classList.remove('active');
        }
      });
    });
  }

  // ---- main-category dentro de cada .category ----
  document.querySelectorAll('.categories .category > .main-category').forEach(mainBtn => {
    const parentCategoryDiv = mainBtn.closest('.category');
    const hasSubmenu = !!parentCategoryDiv?.querySelector('.subcategories');

    mainBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (hasSubmenu) {
        // apenas abre/fecha submenu
        parentCategoryDiv.classList.toggle('active');
      } else {
        // main-category sem submenu: filtra por essa categoria
        const cat = mainBtn.dataset.category || 'all';
        resetSearch();
        currentPage = 1;
        updateActiveButtons(mainBtn, cat);
        renderProducts("", cat);
        categoriesContainer.classList.remove('active');
      }
    });
  });

  // ---- subcategorias ----
  document.querySelectorAll('.categories .subcategory').forEach(subBtn => {
    subBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      let categoryToFilter = subBtn.dataset.category;
      const parentCat = subBtn.dataset.parent;
      if (categoryToFilter === "all") categoryToFilter = parentCat;

      resetSearch();
      currentPage = 1;
      updateActiveButtons(subBtn, categoryToFilter);
      renderProducts("", categoryToFilter);
      categoriesContainer.classList.remove('active');
    });
  });

  // ---- busca: input ----
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      clearBtn.style.display = searchInput.value ? 'flex' : 'none';
      const q = searchInput.value.toLowerCase();
      renderProducts(q, currentFilter);
      updateNotifDot();
    });
  }

  // limpar busca (x)
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      resetSearch();
      currentPage = 1;
      updateActiveButtons(null, 'all'); // volta ao TODOS
      renderProducts("", "all");
    });
  }

  // modal close
  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", () => modal.style.display = "none");
    window.addEventListener("click", e => { if (e.target === modal) modal.style.display = "none"; });
  }

  // lupa / search toggle
  if (searchBtn && searchBox && searchInput) {
    searchBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      searchBox.classList.toggle('active');
      if (searchBox.classList.contains('active')) searchInput.focus();
    });
    // fechar o searchBox ao clicar fora
    document.addEventListener('click', (e) => {
      if (!searchBox.contains(e.target) && !searchBtn.contains(e.target)) {
        searchBox.classList.remove('active');
      }
    });
    // evita fechar quando clicar dentro do searchBox
    searchBox.addEventListener('click', (e) => e.stopPropagation());
  }

}); // fim DOMContentLoaded
