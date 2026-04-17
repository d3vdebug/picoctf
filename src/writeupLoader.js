function parseFrontmatter(text) {
  const lines = text.split('\n');
  let inFrontmatter = false;
  let frontmatter = '';
  let content = '';
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() === '---') {
      if (!inFrontmatter) {
        inFrontmatter = true;
      } else {
        // End of frontmatter
        content = lines.slice(i + 1).join('\n');
        break;
      }
    } else if (inFrontmatter) {
      frontmatter += line + '\n';
    } else {
      content = lines.slice(i).join('\n');
      break;
    }
  }
  const data = {};
  frontmatter.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }
      data[key] = value;
    }
  });
  return { data, content };
}

export async function loadWriteups() {
  const writeups = [];
  const files = ['easy-web.md', 'hard-reverse.md', 'medium-crypto.md', 'asdas.md', 'safds.md'];

  for (const file of files) {
    try {
      const url = `${import.meta.env.BASE_URL}writeups/${file}`;
      const response = await fetch(url);
      if (!response.ok) continue;
      const text = await response.text();
      const { data, content } = parseFrontmatter(text);
      writeups.push({
        title: data.title || 'Untitled',
        difficulty: data.difficulty || 'Easy',
        category: data.category || 'General Skills',
        content
      });
    } catch (error) {
      console.error(`Error loading ${file}:`, error);
    }
  }

  return writeups;
}