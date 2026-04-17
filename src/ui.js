import { marked } from 'marked';

export function renderWriteupGrid(writeups, container, onCardClick) {
  container.innerHTML = '';
  
  if (writeups.length === 0) {
    container.innerHTML = '<div class="empty-state"><p>No writeups found</p></div>';
    return;
  }
  
  writeups.forEach((writeup) => {
    const card = document.createElement('div');
    card.className = 'writeup-card';
    
    const difficultyColor = {
      'Easy': '#00ff00',
      'Medium': '#ffaa00',
      'Hard': '#ff4444'
    }[writeup.difficulty] || '#00ff00';
    
    card.innerHTML = `
      <div class="card-badge" style="color: #000000; background: ${difficultyColor};">${writeup.difficulty}</div>
      <h3>${writeup.title}</h3>
      <p class="card-category">${writeup.category}</p>
      <div class="card-preview">${writeup.content.substring(3, 100).replace(/#/g, '')}...</div>
    `;
    
    card.addEventListener('click', () => onCardClick(writeup));
    container.appendChild(card);
  });
}

export function renderWriteupDetail(writeup, container) {
  const difficultyColor = {
    'Easy': '#00ff00',
    'Medium': '#ffaa00',
    'Hard': '#ff4444'
  }[writeup.difficulty] || '#00ff00';
  
  let html = marked(writeup.content);
  
  // Replace [[flag]] patterns with blurred flag elements
  html = html.replace(/\[\[(.*?)\]\]/g, '<span class="flag-blur" data-flag="$1">$1</span>');
  
  container.innerHTML = `
    <div class="detail-header">
      <div class="header-badges">
        <span class="badge" style="background: ${difficultyColor}; border-color: ${difficultyColor};">${writeup.difficulty}</span>
        <span class="badge">${writeup.category}</span>
      </div>
      <h1>${writeup.title}</h1>
    </div>
    <div class="detail-body">
      ${html}
    </div>
  `;
  
  // Add click handlers for flag blur toggle
  const flagElements = container.querySelectorAll('.flag-blur');
  flagElements.forEach(flag => {
    flag.addEventListener('click', (e) => {
      e.stopPropagation();
      flag.classList.toggle('revealed');
    });
  });
}

export function filterWriteups(writeups, difficulty, category, search) {
  return writeups.filter(w =>
    (difficulty === '' || w.difficulty === difficulty) &&
    (category === '' || w.category === category) &&
    (search === '' || w.title.toLowerCase().includes(search.toLowerCase()) || w.content.toLowerCase().includes(search.toLowerCase()))
  );
}