document.addEventListener("DOMContentLoaded", () => {
  const productsEl = document.getElementById('products');
  const noResultsEl = document.getElementById('noResults');
  const paginationEl = document.getElementById('pagination');
  const searchInput = document.getElementById('search');
  const clearBtn = document.getElementById('clearBtn');
  const categoriesContainer = document.querySelector('.categories');
  const menuBtn = document.querySelector('.menu-btn');
  const modal = document.getElementById("productModal");
  const closeModalBtn = document.getElementById("closeModal");
  const searchBtn = document.querySelector('.search-btn');
  const searchBox = document.querySelector('.search-box');
  const highlightsEl = document.getElementById('highlights');

  let currentPage = 1;
  const perPage = 8;
  let shuffledProducts = [];
  let currentFilter = 'all';
  let activeButton = null;

  // 📌 Funções utilitárias
  function shuffleArray(array) {
    const copy = array.slice();
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  // 📌 Filtros e Renderização de Produtos
  function getFilteredProducts(filter = "", category = "all") {
    const q = String(filter || "").trim().toLowerCase();

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
          <button class="modal-botaomais" data-id="${prod.id}">+</button>
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

  // 📌 Mais informações
  function attachMoreEvents() {
    document.querySelectorAll('.modal-botaomais').forEach(btn => {
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

  // 📌 Destaques
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
            <button class="modal-botaomais" data-id="${prod.id}">+</button>
          </div>
        `;
        highlightsEl.appendChild(card);
      }
    });
    attachMoreEvents();
  }

  // 📌 Filtros, botões e busca
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

    currentFilter = (typeof clickCategoryForFilter === 'string') ? clickCategoryForFilter : 'all';

    const highlightsSection = document.querySelector('.highlight-section');
    const productsTitle = document.getElementById('productsTitle');
    const page = document.querySelector('.page');

    if (currentFilter === 'all') {
      if (highlightsSection) highlightsSection.style.display = 'block';
      if (productsTitle) productsTitle.textContent = 'Todos os produtos';
      if (page) page.classList.remove('category-mode');
    } else {
      if (highlightsSection) highlightsSection.style.display = 'none';
      if (productsTitle) {
        const formatted = clickedBtn ? clickedBtn.textContent.trim() : currentFilter;
        productsTitle.textContent = formatted;
      }
      if (page) page.classList.add('category-mode');
    }
  }

  function resetSearch() {
    if (searchInput) {
      searchInput.value = "";
      const ev = new Event('input', { bubbles: true, cancelable: true });
      searchInput.dispatchEvent(ev);
    }
    if (clearBtn && clearBtn.style) clearBtn.style.display = 'none';
    if (typeof updateNotifDot === 'function') updateNotifDot();

    console.log('[resetSearch] currentFilter =', currentFilter);
  }

  // 📌 Notificação no botão de busca
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

  // 📌 Inicialização
  renderProducts();
  renderHighlights();
  updateActiveButtons(null, 'all');

  // 📌 Eventos principais
  if (menuBtn && categoriesContainer) {
    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      categoriesContainer.classList.toggle('active');
    });
  }

  if (categoriesContainer) {
    const topLevelBtns = Array.from(categoriesContainer.children).filter(el => el.tagName === 'BUTTON');
    topLevelBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();

        const cat = btn.dataset.category || 'all';
        resetSearch();
        currentPage = 1;
        updateActiveButtons(btn, cat);
        renderProducts("", cat);
        categoriesContainer.classList.remove('active');
      });
    });
  }

  document.querySelectorAll('.categories .category > .main-category').forEach(mainBtn => {
    const parentCategoryDiv = mainBtn.closest('.category');
    const hasSubmenu = !!parentCategoryDiv?.querySelector('.subcategories');

    mainBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (hasSubmenu) {
        parentCategoryDiv.classList.toggle('active');
      } else {
        const cat = mainBtn.dataset.category || 'all';
        resetSearch();
        currentPage = 1;
        updateActiveButtons(mainBtn, cat);
        renderProducts("", cat);
        categoriesContainer.classList.remove('active');
      }
    });
  });

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

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      clearBtn.style.display = searchInput.value ? 'flex' : 'none';
      const q = searchInput.value.toLowerCase();
      renderProducts(q, currentFilter);
      updateNotifDot();
    });
  }

  if (clearBtn) {
    try { clearBtn.type = 'button'; } catch (e) {}
    clearBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      resetSearch();
      currentPage = 1;
      renderProducts("", currentFilter);
    });
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", () => modal.style.display = "none");
    window.addEventListener("click", e => { if (e.target === modal) modal.style.display = "none"; });
  }

  if (searchBtn && searchBox && searchInput) {
    searchBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      searchBox.classList.toggle('active');
      if (searchBox.classList.contains('active')) searchInput.focus();
    });
    document.addEventListener('click', (e) => {
      if (!searchBox.contains(e.target) && !searchBtn.contains(e.target)) {
        searchBox.classList.remove('active');
      }
    });
    searchBox.addEventListener('click', (e) => e.stopPropagation());
  }
});

// 📌 Gradientes e atualização dinâmica do título
document.addEventListener('DOMContentLoaded', () => {
  const categoryGradients = {
    beleza: 'linear-gradient(90deg, transparent, #FFD1DC, #FFB3C6, transparent)',
    casa: 'linear-gradient(90deg, transparent, #BEE3F8, #A0D8F1, transparent)',
    acessórios: 'linear-gradient(90deg, transparent, #F6D6FF, #E0B3FF, transparent)',
    suplementos: 'linear-gradient(90deg, transparent, #FFF1B6, #FFE7A3, transparent)',
    saude: 'linear-gradient(90deg, transparent, #C3FBD8, #A7F0C4, transparent)',
    eletronicos: 'linear-gradient(90deg, transparent, #BFDFFF, #91C2FF, transparent)',
    roupas: 'linear-gradient(90deg, transparent, #FFE4F0, #FFD4E7, transparent)',
    esportes: 'linear-gradient(90deg, transparent, #FFD8B0, #FFC594, transparent)',
    brinquedos: 'linear-gradient(90deg, transparent, #FFB6B9, #FFA1A6, transparent)',
    computadores: 'linear-gradient(90deg, transparent, #C2E0FF, #99CCFF, transparent)'
  };

  const defaultGradient = 'linear-gradient(90deg, transparent, #ff4d6d, transparent)';
  const defaultTitle = "Todos os produtos";

  const title = document.getElementById('productsTitle');
  const section = document.querySelector('.titulo');

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function updateTitle(subCategory, mainCategory) {
    if (!subCategory && (!mainCategory || mainCategory === 'all')) {
      title.textContent = defaultTitle;
      section.style.setProperty('--highlight-gradient', defaultGradient);
      document.title = "Flowers Promos | Catálogo Completo";
      return;
    }
    const displayName = subCategory ? capitalize(subCategory) : capitalize(mainCategory);
    title.textContent = displayName;
    const gradient = categoryGradients[mainCategory] || defaultGradient;
    section.style.setProperty('--highlight-gradient', gradient);
    document.title = `Flowers Promos | ${displayName}`;
  }

  document.querySelectorAll('.subcategory').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const subCategory = btn.getAttribute('data-category') !== 'all' ? btn.getAttribute('data-category') : null;
      const mainCategory = btn.getAttribute('data-parent');
      updateTitle(subCategory, mainCategory);
    });
  });

  document.querySelectorAll('.main-category').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const mainCategory = btn.getAttribute('data-category');
      const hasSubmenu = document.querySelectorAll(`.subcategory[data-parent="${mainCategory}"]`).length > 0;
      if (hasSubmenu && mainCategory !== 'all') return;

      e.preventDefault();
      if (mainCategory === 'all') {
        updateTitle(null, 'all');
      } else {
        updateTitle(null, mainCategory);
      }
    });
  });

  // Estado inicial
  const activeSub = document.querySelector('.subcategory.active');
  const activeCat = document.querySelector('.main-category.active');

  if (activeSub) {
    const subCategory = activeSub.getAttribute('data-category') !== 'all' ? activeSub.getAttribute('data-category') : null;
    const mainCategory = activeSub.getAttribute('data-parent');
    updateTitle(subCategory, mainCategory);
  } else if (activeCat) {
    const mainCategory = activeCat.getAttribute('data-category');
    if (mainCategory === 'all') {
      updateTitle(null, 'all');
    } else {
      updateTitle(null, mainCategory);
    }
  } else {
    updateTitle(null, 'all');
  }
});
