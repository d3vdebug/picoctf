import './style.css'
import { loadWriteups } from './writeupLoader.js'
import { renderWriteupGrid, renderWriteupDetail, filterWriteups } from './ui.js'

async function init() {
  try {
    const writeups = await loadWriteups();
    const app = document.querySelector('#app');
    app.innerHTML = `
      <div class="app-container">
        <header class="app-header">
          <div class="header-content">
            <div class="logo-section">
              <h1 class="logo">PicoCTF Writeup</h1>
              <div class="header-meta">
                <p class="tagline">Challenge Solutions</p>
                <p class="credit">By DevDebug</p>
              </div>
            </div>
          </div>
        </header>

        <div class="app-body">
          <aside class="filters-sidebar">
            <div class="filter-group">
              <label for="difficulty-filter">Difficulty</label>
              <select id="difficulty-filter">
                <option value="">All Levels</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            <div class="filter-group">
              <label for="category-filter">Category</label>
              <select id="category-filter">
                <option value="">All Categories</option>
                <option value="Web Exploitation">Web Exploitation</option>
                <option value="Cryptography">Cryptography</option>
                <option value="Reverse Engineering">Reverse Engineering</option>
                <option value="Forensics">Forensics</option>
                <option value="General Skills">General Skills</option>
                <option value="Binary Exploitation">Binary Exploitation</option>
                <option value="Blockchain">Blockchain</option>
              </select>
            </div>

            <div class="filter-group">
              <label for="search">Search</label>
              <input type="text" id="search" placeholder="Search writeups">
            </div>
          </aside>

          <main class="main-content">
            <div id="writeup-grid" class="writeup-grid"></div>
          </main>
          
        </div>

        <footer class="app-footer">
          <p>Made with ⌛ by <a style ="text-decoration: none;" href="https://play.picoctf.org/users/devdebug">DevDebug</a></p>
        </footer>

        <div id="detail-modal" class="modal">
          <div class="modal-content">
            <button class="modal-close">&times;</button>
            <div id="writeup-detail"></div>
          </div>
        </div>
      </div>
    `;

    const listContainer = document.getElementById('writeup-grid');
    const modalEl = document.getElementById('detail-modal');
    const closeBtn = document.querySelector('.modal-close');

    const difficultyFilter = document.getElementById('difficulty-filter');
    const categoryFilter = document.getElementById('category-filter');
    const searchInput = document.getElementById('search');

    function updateList() {
      const filtered = filterWriteups(writeups, difficultyFilter.value, categoryFilter.value, searchInput.value);
      renderWriteupGrid(filtered, listContainer, (writeup) => {
        renderWriteupDetail(writeup, document.getElementById('writeup-detail'));
        modalEl.classList.add('active');
      });
    }

    closeBtn.addEventListener('click', () => {
      modalEl.classList.remove('active');
    });

    modalEl.addEventListener('click', (e) => {
      if (e.target === modalEl) {
        modalEl.classList.remove('active');
      }
    });

    difficultyFilter.addEventListener('change', updateList);
    categoryFilter.addEventListener('change', updateList);
    searchInput.addEventListener('input', updateList);

    updateList();
  } catch (error) {
    console.error('Error in init:', error);
    document.querySelector('#app').innerHTML = `<h1>Error: ${error.message}</h1>`;
  }
}

init();
