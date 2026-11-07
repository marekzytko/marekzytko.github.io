'use client';

import { useEffect, useRef, useState } from 'react';

const FLOWS = `VAT 341 500 000 000 zł (341,5 mld) [341.5] Finanse publiczne łącznie
CIT 80 400 000 000 zł (80,4 mld) [80.4] Finanse publiczne łącznie
PIT 32 000 000 000 zł (32,0 mld) [32.0] Finanse publiczne łącznie
Akcyza paliwa 42 200 000 000 zł (42,2 mld) [42.2] Finanse publiczne łącznie
Akcyza tytoń 34 700 000 000 zł (34,7 mld) [34.7] Finanse publiczne łącznie
Akcyza alkohol 11 700 000 000 zł (11,7 mld) [11.7] Finanse publiczne łącznie
Akcyza piwo 4 100 000 000 zł (4,1 mld) [4.1] Finanse publiczne łącznie
Akcyza samochody 4 700 000 000 zł (4,7 mld) [4.7] Finanse publiczne łącznie
Akcyza pozostałe 5 900 000 000 zł (5,9 mld) [5.9] Finanse publiczne łącznie
Podatek od instytucji finansowych 7 600 000 000 zł (7,6 mld) [7.6] Finanse publiczne łącznie
Podatek od gier 6 500 000 000 zł (6,5 mld) [6.5] Finanse publiczne łącznie
Podatek od sprzedaży detalicznej 5 000 000 000 zł (5,0 mld) [5.0] Finanse publiczne łącznie
Cło 8 700 000 000 zł (8,7 mld) [8.7] Finanse publiczne łącznie
Podatek od wydobycia 3 200 000 000 zł (3,2 mld) [3.2] Finanse publiczne łącznie
Dochody niepodatkowe 63 600 000 000 zł (63,6 mld) [63.6] Finanse publiczne łącznie
Środki UE 141 600 000 000 zł (141,6 mld) [141.6] Finanse publiczne łącznie
Składki emerytalne 403 500 000 000 zł (403,5 mld) [403.5] Finanse publiczne łącznie
Składki zdrowotne 184 000 000 000 zł (184,0 mld) [184.0] Finanse publiczne łącznie
Dochody własne JST 187 300 000 000 zł (187,3 mld) [187.3] Finanse publiczne łącznie
Udział JST w PIT 40 000 000 000 zł (40,0 mld) [40.0] Finanse publiczne łącznie
Pożyczki (deficyt) 263 500 000 000 zł (263,5 mld) [263.5] Finanse publiczne łącznie
Finanse publiczne łącznie [444.0] Emerytury i renty 444 000 000 000 zł (444,0 mld)
Finanse publiczne łącznie [65.0] Inne świadczenia FUS 65 000 000 000 zł (65,0 mld)
Finanse publiczne łącznie [200.0] Leczenie 200 000 000 000 zł (200,0 mld)
Finanse publiczne łącznie [27.0] Inne NFZ 27 000 000 000 zł (27,0 mld)
Finanse publiczne łącznie [109.2] Obrona narodowa 109 200 000 000 zł (109,2 mld)
Finanse publiczne łącznie [97.9] Rodzina 800+ 97 900 000 000 zł (97,9 mld)
Finanse publiczne łącznie [174.0] Wydatki z funduszy UE 174 000 000 000 zł (174,0 mld)
Finanse publiczne łącznie [280.0] Wydatki samorządów 280 000 000 000 zł (280,0 mld)
Finanse publiczne łącznie [41.2] Szkolnictwo wyższe 41 200 000 000 zł (41,2 mld)
Finanse publiczne łącznie [39.6] Składka do UE 39 600 000 000 zł (39,6 mld)
Finanse publiczne łącznie [31.1] Bezpieczeństwo publiczne 31 100 000 000 zł (31,1 mld)
Finanse publiczne łącznie [30.2] Administracja 30 200 000 000 zł (30,2 mld)
Finanse publiczne łącznie [28.7] Wymiar sprawiedliwości 28 700 000 000 zł (28,7 mld)
Finanse publiczne łącznie [22.0] Transport 22 000 000 000 zł (22,0 mld)
Finanse publiczne łącznie [20.9] Pozostałe działy 20 900 000 000 zł (20,9 mld)
Finanse publiczne łącznie [9.6] Rolnictwo 9 600 000 000 zł (9,6 mld)
Finanse publiczne łącznie [7.0] Gospodarka mieszkaniowa 7 000 000 000 zł (7,0 mld)
Finanse publiczne łącznie [6.9] Pomoc społeczna 6 900 000 000 zł (6,9 mld)
Finanse publiczne łącznie [5.6] Górnictwo 5 600 000 000 zł (5,6 mld)
Finanse publiczne łącznie [5.5] Kultura 5 500 000 000 zł (5,5 mld)
Finanse publiczne łącznie [70.2] Inne rozliczenia 70 200 000 000 zł (70,2 mld)
Finanse publiczne łącznie [90.4] Obsługa długu 90 400 000 000 zł (90,4 mld)`;

function parse(text: string) {
  const nodes: Record<string, number> = {};
  const links: [number, number, number][] = [];
  for (const line of text.split('\n')) {
    const t = line.trim();
    if (!t || t.startsWith('#') || t.startsWith(':')) continue;
    if (!t.includes('[') || !t.includes(']')) continue;
    const [left, rest] = t.split('[', 2);
    const [amt, right] = rest.split(']', 2);
    const src = left.trim();
    const tgt = right.trim().split('#')[0].trim();
    const val = parseFloat(amt.trim());
    for (const n of [src, tgt]) if (!(n in nodes)) nodes[n] = Object.keys(nodes).length;
    links.push([nodes[src], nodes[tgt], val]);
  }
  return { nodes, links };
}

export default function SankeyChart() {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    import('plotly.js-dist-min').then((mod) => {
      const Plotly = mod.default;
      const { nodes, links } = parse(FLOWS);
      const labels = Object.keys(nodes);
      const colors = labels.map((l) =>
        l.includes('Pożyczki') || l.includes('Obsługa długu') ? '#e74c3c' : l.includes('Finanse publiczne') ? '#1e293b' : '#475569'
      );
      Plotly.newPlot(
        ref.current!,
        [
          {
            type: 'sankey',
            orientation: 'h',
            node: { pad: 8, thickness: 16, label: labels, color: colors },
            link: {
              source: links.map((l) => l[0]),
              target: links.map((l) => l[1]),
              value: links.map((l) => l[2]),
              color: 'rgba(71,85,105,0.35)',
            },
          },
        ],
        {
          font: { size: 9, color: '#e2e8f0' },
          paper_bgcolor: '#000',
          plot_bgcolor: '#000',
          margin: { l: 8, r: 8, t: 24, b: 8 },
          height: 900,
        },
        { responsive: true, displayModeBar: true }
      );
      setReady(true);
    });
  }, []);

  return <div ref={ref} id="sankey" style={{ opacity: ready ? 1 : 0, transition: 'opacity 0.4s' }} />;
}
