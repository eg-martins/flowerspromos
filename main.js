/************** VARIÁVEIS **************/
const productsEl = document.getElementById('products');
const noResultsEl = document.getElementById('noResults');
const paginationEl = document.getElementById('pagination');
const searchInput = document.getElementById('search');
const clearBtn = document.getElementById('clearBtn');
const categoryButtons = document.querySelectorAll('.categories button');

let currentPage = 1;
const perPage = 8;

/************** FUNÇÕES **************/
function getFilteredProducts(filter = "", category = "all"){
  const q = String(filter || "").trim().toLowerCase();
  return productsData.filter((prod, index) => {
    const number = String(index+1).padStart(2,'0');
    const matchesText =
      q === "" ||
      prod.title.toLowerCase().includes(q) ||
      prod.platform.toLowerCase().includes(q) ||
      number.includes(q) ||
      q === String(index+1);
    const matchesCategory = category === "all" || prod.category === category;
    return matchesText && matchesCategory;
  });
}

function renderProducts(filter = "", category = "all"){
  const filtered = getFilteredProducts(filter, category);
  const totalPages = Math.ceil(filtered.length / perPage);
  currentPage = Math.min(currentPage, totalPages) || 1;

  productsEl.innerHTML = "";
  if(filtered.length === 0){
    noResultsEl.style.display = 'block';
    paginationEl.innerHTML = "";
    return;
  }
  noResultsEl.style.display = 'none';

  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  const pageItems = filtered.slice(start, end);

  pageItems.forEach((prod, i) => {
    const number = String(productsData.indexOf(prod)+1).padStart(2,'0');
    const card = document.createElement('article');
    card.className = 'product';
    card.innerHTML = `
       <span class="number">#${number}</span>
       <img src="${prod.img}" alt="${prod.title}">
       <h3>${prod.title}</h3>
       <p>${prod.desc}</p>
       <div class="bottom">
         <a href="${prod.link}" target="_blank">Compre agora</a>
         <p class="platform">Disponível em: ${prod.platform}</p>
       </div>
    `;
    card.style.animationDelay = (i * 0.12) + 's';
    productsEl.appendChild(card);
  });

  renderPagination(totalPages);
}

function renderPagination(totalPages){
  paginationEl.innerHTML = "";
  if(totalPages <= 1) return;
  for(let i=1; i<=totalPages; i++){
    const btn = document.createElement('button');
    btn.textContent = i;
    if(i === currentPage) btn.classList.add('active');
    btn.addEventListener('click', ()=>{
      currentPage = i;
      const q = searchInput.value.toLowerCase();
      const activeCategory = document.querySelector('.categories button.active').dataset.category;
      renderProducts(q, activeCategory);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    paginationEl.appendChild(btn);
  }
}

/************** EVENTOS **************/
searchInput.addEventListener('input', (e)=>{
  currentPage = 1;
  const q = e.target.value.toLowerCase();
  const activeCategory = document.querySelector('.categories button.active').dataset.category;
  renderProducts(q, activeCategory);
  clearBtn.style.display = q ? 'flex' : 'none';
});

clearBtn.addEventListener('click', ()=>{
  searchInput.value = '';
  currentPage = 1;
  const activeCategory = document.querySelector('.categories button.active').dataset.category;
  renderProducts('', activeCategory);
  clearBtn.style.display = 'none';
  searchInput.focus();
});

categoryButtons.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    categoryButtons.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    currentPage = 1;
    const q = searchInput.value.toLowerCase();
    renderProducts(q, btn.dataset.category);
  });
});

window.addEventListener('DOMContentLoaded', ()=>{
  document.querySelector('.categories button[data-category="all"]').classList.add('active');
  renderProducts('');
});
