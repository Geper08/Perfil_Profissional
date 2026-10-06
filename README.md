# Landing page pessoal — Geovani Martins Pereira

Página estática em **HTML5 + CSS3 + JavaScript puro** (sem frameworks).

## Estrutura de arquivos

```
index.html          → página completa (Hero, Sobre, Experiência, Atuação, Projetos, Tecnologias, Contato)
css/style.css       → estilos (variáveis CSS, glassmorphism, responsivo, animações)
js/script.js        → menu mobile, animações ao rolar, link ativo, progresso de leitura
assets/             → imagens dos dashboards (dashboard-powerbi.png, dashboard-financeiro.png, dashboard-kpis.png)
```

## Como usar

1. Extraia a pasta.
2. Abra o arquivo `index.html` no navegador (duplo clique) — funciona offline.
3. Para publicar: envie a pasta inteira para GitHub Pages, Netlify, Vercel ou qualquer hospedagem estática.

## Como editar

- **Cores e tipografia:** bloco `:root` no topo de `css/style.css` (ex.: `--cyan`, `--navy-900`, `--wrap`).
- **Textos:** edite diretamente o `index.html` (as seções estão comentadas: HERO, SOBRE MIM, MINHA EXPERIÊNCIA, TECNOLOGIA + FINANCEIRO, PROJETOS, TECNOLOGIAS, CONTATO).
- **Imagens dos projetos:** substitua os arquivos em `assets/` mantendo os mesmos nomes, ou troque o `src` das tags `<img>`.
- **Animações:** classe `.reveal` (fade + subida suave) aplicada via IntersectionObserver em `js/script.js`.

## Acessibilidade e desempenho

- Layout responsivo (desktop, tablet e celular) com breakpoints em 1024px, 768px e 420px.
- Respeita `prefers-reduced-motion` (desativa animações para quem prefere menos movimento).
- Navegação por teclado com `:focus-visible`, `aria-expanded` no menu mobile e estilos de impressão.
