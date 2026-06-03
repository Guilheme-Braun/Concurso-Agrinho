/**
 * Braun News — script.js
 * Portal de Notícias · Agrinho 2026
 * "Agro forte, futuro sustentável: equilíbrio entre produção e meio ambiente"
 *
 * Responsabilidades:
 *  1. Navegação por abas
 *  2. Data/hora ao vivo no header
 *  3. Ticker de notícias
 *  4. Renderização das ideias sustentáveis (dados estáticos)
 *  5. Busca de notícias via RSS (Agência Brasil + Gov.br) com fallback curado
 *  6. Filtros por fonte
 */

/* ─────────────────────────────────────────────
   1. DADOS ESTÁTICOS — IDEIAS SUSTENTÁVEIS
   ───────────────────────────────────────────── */
const IDEAS = [
  {
    num: "01",
    tag: "Água",
    icon: "💧",
    title: "Irrigação de Precisão e Reuso de Água",
    text: "Sensores de umidade do solo conectados a sistemas automatizados reduzem em até 50% o consumo de água nas lavouras. O reaproveitamento de água da chuva em cisternas rurais garante produção mesmo em períodos de estiagem, aliviando rios e aquíferos.",
    color: "#e3f2fd",
  },
  {
    num: "02",
    tag: "Solo",
    icon: "🌱",
    title: "Plantio Direto e Agricultura de Conservação",
    text: "O sistema de plantio direto mantém a palhada sobre o solo, reduz a erosão em até 90% e aumenta o carbono orgânico. Em parceria com o Programa Paraná Mais Verde, produtores recebem assistência técnica para adoção dessas práticas.",
    color: "#e8f5e9",
  },
  {
    num: "03",
    tag: "Energia",
    icon: "☀️",
    title: "Bioenergia e Energia Solar nas Propriedades",
    text: "O Brasil é líder mundial em biocombustíveis. Pequenas propriedades rurais podem gerar eletricidade com biogás de dejetos animais e painéis solares fotovoltaicos, reduzindo custos de produção e emissões de CO₂ ao mesmo tempo.",
    color: "#fff8e1",
  },
  {
    num: "04",
    tag: "Floresta",
    icon: "🌳",
    title: "Integração Lavoura-Pecuária-Floresta (iLPF)",
    text: "O sistema iLPF integra pastagens, culturas agrícolas e árvores na mesma área. Aumenta a biodiversidade, recupera solos degradados, captura carbono e ainda diversifica a renda do produtor rural — um modelo premiado internacionalmente.",
    color: "#f3e5f5",
  },
  {
    num: "05",
    tag: "Resíduos",
    icon: "♻️",
    title: "Logística Reversa de Embalagens Agroquímicas",
    text: "O Brasil possui um dos sistemas de devolução de embalagens de agrotóxicos mais eficientes do mundo. Ampliar pontos de coleta, conscientizar produtores e investir em reciclagem fecha o ciclo e protege solos e nascentes.",
    color: "#e8f5e9",
  },
  {
    num: "06",
    tag: "Tecnologia",
    icon: "🛰️",
    title: "Agrotecnologia: Drones, IA e Sensoriamento Remoto",
    text: "Drones aplicam defensivos apenas onde necessário, reduzindo o uso em até 40%. Satélites monitoram desmatamento em tempo real. Inteligência Artificial analisa imagens de satélite para alertar sobre pragas antes que se alastrem.",
    color: "#e3f2fd",
  },
  {
    num: "07",
    tag: "Comunidade",
    icon: "👩‍🌾",
    title: "Agricultura Familiar e Feiras Orgânicas",
    text: "Fortalecer a agricultura familiar com acesso a mercados locais reduz emissões do transporte, mantém comunidades rurais vivas e garante alimentos saudáveis sem agrotóxicos. Escolas podem criar hortas pedagógicas e consumir o que produzem.",
    color: "#fff8e1",
  },
  {
    num: "08",
    tag: "Educação",
    icon: "📚",
    title: "Educação Ambiental nas Escolas do Campo",
    text: "Programas como o Agrinho mostram que a escola é o principal vetor de mudança cultural. Projetos de compostagem, hortas escolares e visitas técnicas a propriedades sustentáveis formam cidadãos conscientes do papel do campo na vida de todos.",
    color: "#fce4ec",
  },
];

/* ─────────────────────────────────────────────
   2. NOTÍCIAS DE FALLBACK (exibidas se RSS falhar)
   ───────────────────────────────────────────── */
const FALLBACK_NEWS = [
  {
    source: "agbrasil",
    sourceName: "Ag. Brasil",
    sourceClass: "source-agbrasil",
    kicker: "Meio Ambiente",
    kickerColor: "#2e7d32",
    headline: "Brasil bate recorde de áreas em recuperação ambiental em 2025",
    summary: "Segundo dados do Ministério do Meio Ambiente, o país atingiu 7,5 milhões de hectares em processo de restauração florestal, o maior índice desde o início do monitoramento pelo SINAFLOR.",
    date: "Mai 2026",
    url: "https://agenciabrasil.ebc.com.br/meio-ambiente",
  },
  {
    source: "gov",
    sourceName: "Gov. Federal",
    sourceClass: "source-gov",
    kicker: "Agricultura",
    kickerColor: "#1565c0",
    headline: "Governo lança programa de crédito rural verde com juros reduzidos",
    summary: "O Programa ABC+ (Agricultura de Baixo Carbono Plus) disponibilizará R$ 35 bilhões para propriedades que adotarem práticas sustentáveis como plantio direto, iLPF e bioinsumos.",
    date: "Mai 2026",
    url: "https://www.gov.br/mma",
  },
  {
    source: "mma",
    sourceName: "MMA",
    sourceClass: "source-mma",
    kicker: "Clima",
    kickerColor: "#e65100",
    headline: "Desmatamento na Amazônia cai 45% no primeiro trimestre de 2026",
    summary: "Dados do PRODES/INPE indicam redução expressiva no desmatamento. O Ministério do Meio Ambiente atribui a queda à fiscalização reforçada, ao monitoramento por satélite e aos programas de bioeconomia.",
    date: "Abr 2026",
    url: "https://www.gov.br/mma/pt-br/assuntos/noticias",
  },
  {
    source: "agbrasil",
    sourceName: "Ag. Brasil",
    sourceClass: "source-agbrasil",
    kicker: "Energia",
    kickerColor: "#2e7d32",
    headline: "Usinas de biogás rurais crescem 60% no Paraná em 2025",
    summary: "O Paraná lidera o ranking nacional de geração de biogás a partir de resíduos agrícolas e suinocultura, com mais de 400 unidades em operação e potencial de abastecer 300 mil residências.",
    date: "Abr 2026",
    url: "https://agenciabrasil.ebc.com.br/meio-ambiente",
  },
  {
    source: "gov",
    sourceName: "Gov. Federal",
    sourceClass: "source-gov",
    kicker: "Tecnologia",
    kickerColor: "#1565c0",
    headline: "Embrapa lança variedades de soja tolerantes à seca para o Cerrado",
    summary: "As novas cultivares consomem até 30% menos água e mantêm produtividade em anos com déficit hídrico, contribuindo para a resiliência climática da agricultura brasileira.",
    date: "Mar 2026",
    url: "https://www.embrapa.br/noticias",
  },
  {
    source: "agbrasil",
    sourceName: "Ag. Brasil",
    sourceClass: "source-agbrasil",
    kicker: "Água",
    kickerColor: "#2e7d32",
    headline: "Lei do Pagamento por Serviços Ambientais avança na regulamentação",
    summary: "O decreto regulamentador da Lei 14.119/2021 permitirá que produtores rurais que preservam matas ciliares, nascentes e APP recebam compensação financeira do poder público e da iniciativa privada.",
    date: "Mar 2026",
    url: "https://agenciabrasil.ebc.com.br/meio-ambiente",
  },
  {
    source: "mma",
    sourceName: "MMA",
    sourceClass: "source-mma",
    kicker: "Biodiversidade",
    kickerColor: "#e65100",
    headline: "COP16 define metas para restauração de ecossistemas até 2030",
    summary: "O Brasil assumiu o compromisso de restaurar 12 milhões de hectares de vegetação nativa e zerar o desmatamento ilegal até 2030, alinhando-se às metas do Acordo de Kunming-Montreal.",
    date: "Fev 2026",
    url: "https://www.gov.br/mma/pt-br/assuntos/noticias",
  },
  {
    source: "agbrasil",
    sourceName: "Ag. Brasil",
    sourceClass: "source-agbrasil",
    kicker: "Agronegócio",
    kickerColor: "#2e7d32",
    headline: "Rastreabilidade de gado na Amazônia se expande para toda a cadeia",
    summary: "O sistema de rastreabilidade bovina foi ampliado para incluir subfornecedores, eliminando o chamado 'boi lavado' e garantindo que o Brasil exporte carne produzida em áreas sem desmatamento.",
    date: "Jan 2026",
    url: "https://agenciabrasil.ebc.com.br/meio-ambiente",
  },
];

/* ─────────────────────────────────────────────
   3. RSS FEEDS (via proxy CORS público)
   ───────────────────────────────────────────── */
const RSS_FEEDS = [
  {
    url: "https://agenciabrasil.ebc.com.br/rss/meio-ambiente/feed.xml",
    source: "agbrasil",
    sourceName: "Ag. Brasil",
    sourceClass: "source-agbrasil",
    kickerColor: "#2e7d32",
  },
  {
    url: "https://www.gov.br/mma/pt-br/assuntos/noticias/RSS",
    source: "mma",
    sourceName: "MMA",
    sourceClass: "source-mma",
    kickerColor: "#e65100",
  },
];

const CORS_PROXY = "https://api.allorigins.win/get?url=";

/* ─────────────────────────────────────────────
   4. ESTADO DA APLICAÇÃO
   ───────────────────────────────────────────── */
let allNews = [];
let currentFilter = "todos";

/* ─────────────────────────────────────────────
   5. UTILITÁRIOS
   ───────────────────────────────────────────── */

/** Formata data do RSS para exibição legível */
function formatDate(dateStr) {
  if (!dateStr) return "Recente";
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
  } catch {
    return dateStr.slice(0, 10) || "Recente";
  }
}

/** Remove tags HTML de uma string */
function stripHTML(str) {
  if (!str) return "";
  return str.replace(/<[^>]*>/g, "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").trim();
}

/** Trunca texto em N caracteres */
function truncate(str, n = 160) {
  const clean = stripHTML(str);
  return clean.length > n ? clean.slice(0, n).trimEnd() + "…" : clean;
}

/* ─────────────────────────────────────────────
   6. DATA/HORA AO VIVO
   ───────────────────────────────────────────── */
function updateClock() {
  const el = document.getElementById("live-date");
  if (!el) return;
  const now = new Date();
  el.textContent = now.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

/* ─────────────────────────────────────────────
   7. TICKER
   ───────────────────────────────────────────── */
function updateTicker(items) {
  const el = document.getElementById("ticker-content");
  if (!el) return;
  const headlines = items.slice(0, 6).map((n) => `🌿 ${n.headline}`).join("  ·  ");
  el.textContent = headlines || "Agrinho 2026 · Agro forte, futuro sustentável: equilíbrio entre produção e meio ambiente";
}

/* ─────────────────────────────────────────────
   8. RENDERIZAR IDEIAS
   ───────────────────────────────────────────── */
function renderIdeas() {
  const container = document.getElementById("ideas-container");
  if (!container) return;

  container.innerHTML = IDEAS.map(
    (idea) => `
    <article class="idea-card">
      <span class="idea-icon">${idea.icon}</span>
      <div class="idea-number">${idea.num}</div>
      <div class="idea-tag">${idea.tag}</div>
      <h3 class="idea-title">${idea.title}</h3>
      <p class="idea-text">${idea.text}</p>
    </article>
  `
  ).join("");
}

/* ─────────────────────────────────────────────
   9. RENDERIZAR NOTÍCIAS
   ───────────────────────────────────────────── */
function renderNews(items) {
  const list = document.getElementById("news-list");
  const loading = document.getElementById("news-loading");
  if (!list) return;

  loading.style.display = "none";
  list.style.display = "flex";

  const filtered =
    currentFilter === "todos"
      ? items
      : items.filter((n) => n.source === currentFilter);

  if (filtered.length === 0) {
    list.innerHTML = `<div style="padding:2rem;text-align:center;font-style:italic;color:var(--texto-claro);">Nenhuma notícia encontrada para este filtro.</div>`;
    return;
  }

  list.innerHTML = filtered
    .map(
      (item, idx) => `
    <article class="news-item" onclick="window.open('${item.url || "#"}','_blank')">
      <div class="news-item-num">${String(idx + 1).padStart(2, "0")}</div>
      <div class="news-item-body">
        <div class="news-item-kicker" style="color:${item.kickerColor || "var(--verde-vivo)"}">
          ${item.kicker || "Meio Ambiente"}
        </div>
        <div class="news-item-headline">${item.headline}</div>
        <div class="news-item-summary">${item.summary}</div>
      </div>
      <div class="news-item-meta">
        <div class="news-item-date">${item.date}</div>
        <span class="source-tag ${item.sourceClass}">${item.sourceName}</span>
      </div>
    </article>
  `
    )
    .join("");
}

/* ─────────────────────────────────────────────
   10. BUSCAR RSS
   ───────────────────────────────────────────── */
async function fetchRSSFeed(feedConfig) {
  const proxyUrl = `${CORS_PROXY}${encodeURIComponent(feedConfig.url)}`;
  const response = await fetch(proxyUrl, { signal: AbortSignal.timeout(8000) });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();
  const xmlStr = data.contents;

  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlStr, "text/xml");
  const items = xmlDoc.querySelectorAll("item");

  const results = [];
  items.forEach((item) => {
    const headline = stripHTML(item.querySelector("title")?.textContent || "");
    const summary = truncate(
      item.querySelector("description")?.textContent || ""
    );
    const dateRaw = item.querySelector("pubDate")?.textContent || "";
    const url = item.querySelector("link")?.textContent || "";
    const category =
      item.querySelector("category")?.textContent || "Meio Ambiente";

    if (headline) {
      results.push({
        source: feedConfig.source,
        sourceName: feedConfig.sourceName,
        sourceClass: feedConfig.sourceClass,
        kicker: stripHTML(category).slice(0, 30),
        kickerColor: feedConfig.kickerColor,
        headline,
        summary,
        date: formatDate(dateRaw),
        url,
      });
    }
  });

  return results.slice(0, 10); // máx 10 por feed
}

async function loadAllNews() {
  const loading = document.getElementById("news-loading");
  loading.style.display = "flex";

  try {
    const promises = RSS_FEEDS.map((feed) =>
      fetchRSSFeed(feed).catch(() => []) // feed individual que falha retorna []
    );
    const results = await Promise.all(promises);
    const fetched = results.flat();

    if (fetched.length > 0) {
      // Mescla RSS com fallback curado (sem duplicar por headline)
      const fetchedHeadlines = new Set(fetched.map((n) => n.headline));
      const extras = FALLBACK_NEWS.filter(
        (n) => !fetchedHeadlines.has(n.headline)
      );
      allNews = [...fetched, ...extras];
    } else {
      allNews = FALLBACK_NEWS;
    }
  } catch {
    allNews = FALLBACK_NEWS;
  }

  renderNews(allNews);
  updateTicker(allNews);
}

/* ─────────────────────────────────────────────
   11. FILTROS
   ───────────────────────────────────────────── */
function initFilters() {
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = btn.dataset.filter;
      renderNews(allNews);
    });
  });
}

/* ─────────────────────────────────────────────
   12. NAVEGAÇÃO POR ABAS
   ───────────────────────────────────────────── */
function initTabs() {
  const tabs = document.querySelectorAll(".nav-tab");
  const panels = document.querySelectorAll(".tab-panel");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.tab;

      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      panels.forEach((p) => {
        p.classList.remove("active");
        if (p.id === `tab-${target}`) {
          p.classList.add("active");
        }
      });

      // Lazy-load notícias só quando a aba é aberta pela primeira vez
      if (target === "noticias" && allNews.length === 0) {
        loadAllNews();
      }
    });
  });
}

/* ─────────────────────────────────────────────
   13. INICIALIZAÇÃO
   ───────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  updateClock();
  setInterval(updateClock, 60_000);

  renderIdeas();
  initTabs();
  initFilters();

  // Ticker padrão até notícias carregarem
  updateTicker([
    { headline: "Agrinho 2026 · Inscrições abertas para Redação Paraná Nota 10 até 30 de junho" },
    { headline: "Tema: Agro forte, futuro sustentável — equilíbrio entre produção e meio ambiente" },
    { headline: "AgroRobótica: inscrições de 27 jul a 6 ago/2026" },
    { headline: "Programa completa 31 anos mobilizando 800 mil estudantes no Paraná" },
  ]);

  // Pré-carrega notícias em background para o ticker
  loadAllNews();
});
