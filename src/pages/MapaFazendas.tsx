import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { fazendas, Talhao } from "@/data/mockData";
import { useState } from "react";
import { MapPin, Leaf, BarChart3, DollarSign } from "lucide-react";

const statusColors: Record<string, string> = {
  alta: 'bg-success/70',
  media: 'bg-accent/70',
  baixa: 'bg-destructive/70',
  renovacao: 'bg-muted-foreground/50',
};

const statusLabels: Record<string, string> = {
  alta: 'Alta Produção',
  media: 'Média',
  baixa: 'Baixa',
  renovacao: 'Em Renovação',
};

const statusBadge: Record<string, string> = {
  alta: 'bg-success/20 text-success border-success/30',
  media: 'bg-accent/20 text-accent border-accent/30',
  baixa: 'bg-destructive/20 text-destructive border-destructive/30',
  renovacao: 'bg-muted text-muted-foreground border-border',
};

type Layer = 'produtividade' | 'qualidade' | 'custo';

export default function MapaFazendas() {
  const [selectedFarm, setSelectedFarm] = useState(0);
  const [selectedTalhao, setSelectedTalhao] = useState<Talhao | null>(null);
  const [layer, setLayer] = useState<Layer>('produtividade');
  const farm = fazendas[selectedFarm];

  const getTalhaoColor = (t: Talhao) => {
    if (layer === 'produtividade') return statusColors[t.status];
    if (layer === 'qualidade') {
      if (t.pontuacaoSCA >= 82) return 'bg-success/70';
      if (t.pontuacaoSCA >= 75) return 'bg-accent/70';
      return 'bg-destructive/70';
    }
    if (t.custoSaca === 0) return 'bg-muted-foreground/50';
    if (t.custoSaca <= 350) return 'bg-success/70';
    if (t.custoSaca <= 500) return 'bg-accent/70';
    return 'bg-destructive/70';
  };

  return (
    <Layout>
      <div className="space-y-6 animate-slide-up">
        <h1 className="text-2xl font-bold text-foreground">Mapa das Fazendas</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Sidebar */}
          <div className="space-y-3">
            {/* Farm tabs */}
            <div className="flex flex-col gap-2">
              {fazendas.map((f, i) => (
                <button key={f.id} onClick={() => { setSelectedFarm(i); setSelectedTalhao(null); }}
                  className={`text-left p-3 rounded-lg border transition-colors ${i === selectedFarm ? 'bg-primary border-accent/30' : 'bg-card border-border/50 hover:bg-muted/50'}`}
                >
                  <p className="font-semibold text-sm text-foreground">{f.nome}</p>
                  <p className="text-xs text-muted-foreground">{f.hectares}ha — {f.cidade}</p>
                </button>
              ))}
            </div>

            {/* Layer toggle */}
            <Card className="p-3 border-border/50 bg-card">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Camada</p>
              <div className="flex flex-col gap-1">
                {(['produtividade', 'qualidade', 'custo'] as Layer[]).map(l => (
                  <button key={l} onClick={() => setLayer(l)}
                    className={`text-left px-3 py-1.5 rounded text-xs transition-colors ${layer === l ? 'bg-primary text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    {l === 'produtividade' ? <><BarChart3 className="inline h-3 w-3 mr-1" />Produtividade</> :
                     l === 'qualidade' ? <><Leaf className="inline h-3 w-3 mr-1" />Qualidade</> :
                     <><DollarSign className="inline h-3 w-3 mr-1" />Custo</>}
                  </button>
                ))}
              </div>
            </Card>

            {/* Legend */}
            <Card className="p-3 border-border/50 bg-card">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Legenda</p>
              <div className="space-y-1.5">
                {Object.entries(statusLabels).map(([k, v]) => (
                  <div key={k} className="flex items-center gap-2">
                    <div className={`h-3 w-3 rounded-sm ${statusColors[k]}`} />
                    <span className="text-xs text-foreground/80">{v}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Map area */}
          <div className="lg:col-span-2">
            <Card className="border-border/50 bg-card overflow-hidden h-[500px] relative">
              {/* Fake terrain background */}
              <div className="absolute inset-0" style={{
                background: `
                  radial-gradient(ellipse at 30% 40%, hsl(150 30% 14%) 0%, transparent 50%),
                  radial-gradient(ellipse at 70% 60%, hsl(140 25% 12%) 0%, transparent 50%),
                  radial-gradient(ellipse at 50% 80%, hsl(155 20% 10%) 0%, transparent 60%),
                  linear-gradient(135deg, hsl(150 25% 10%) 0%, hsl(145 20% 8%) 100%)
                `,
              }}>
                {/* Grid lines */}
                <svg className="absolute inset-0 w-full h-full opacity-10">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <line key={`h${i}`} x1="0" y1={`${i * 10}%`} x2="100%" y2={`${i * 10}%`} stroke="currentColor" strokeWidth="0.5" className="text-foreground" />
                  ))}
                  {Array.from({ length: 10 }).map((_, i) => (
                    <line key={`v${i}`} x1={`${i * 10}%`} y1="0" x2={`${i * 10}%`} y2="100%" stroke="currentColor" strokeWidth="0.5" className="text-foreground" />
                  ))}
                </svg>
              </div>

              {/* Talhões as positioned blocks */}
              <div className="absolute inset-4 flex flex-wrap gap-3 items-start content-start p-4">
                {farm.talhoes.map((t) => {
                  const sizeClass = t.hectares >= 14 ? 'w-40 h-32' : t.hectares >= 10 ? 'w-32 h-28' : 'w-28 h-24';
                  return (
                    <button key={t.id} onClick={() => setSelectedTalhao(t)}
                      className={`${sizeClass} ${getTalhaoColor(t)} rounded-lg border border-foreground/10 flex flex-col items-center justify-center transition-all hover:scale-105 cursor-pointer ${selectedTalhao?.id === t.id ? 'ring-2 ring-accent' : ''}`}
                    >
                      <span className="font-bold text-sm text-foreground drop-shadow">{t.nome}</span>
                      <span className="text-xs text-foreground/80 drop-shadow">{t.hectares}ha</span>
                    </button>
                  );
                })}
              </div>

              <div className="absolute bottom-3 left-3 flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" /> {farm.cidade}
              </div>
            </Card>
          </div>

          {/* Detail panel */}
          <div>
            {selectedTalhao ? (
              <Card className="gradient-card p-4 border-border/50 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-foreground">{selectedTalhao.nome}</h3>
                  <Badge className={statusBadge[selectedTalhao.status]}>{statusLabels[selectedTalhao.status]}</Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <Row label="Hectares" value={`${selectedTalhao.hectares}ha`} />
                  <Row label="Variedade" value={selectedTalhao.variedade} />
                  <Row label="Idade dos Pés" value={`${selectedTalhao.idadePes} anos`} />
                  <Row label="Produção" value={`${selectedTalhao.producaoSacas} sacas`} />
                  <Row label="Produtividade" value={`${selectedTalhao.produtividadeScHa} sc/ha`} />
                  {selectedTalhao.pontuacaoSCA > 0 && (
                    <>
                      <Row label="Pontuação SCA" value={`${selectedTalhao.pontuacaoSCA} pts`} />
                      <Row label="Peneira" value={selectedTalhao.peneira} />
                      <Row label="Defeitos" value={`${selectedTalhao.defeitos}%`} />
                      <Row label="Bebida" value={selectedTalhao.tipoBebida} />
                      <Row label="Custo/Saca" value={`R$ ${selectedTalhao.custoSaca}`} />
                    </>
                  )}
                  {selectedTalhao.pontuacaoSCA >= 80 && (
                    <Badge className="bg-accent/20 text-accent border-accent/30 mt-2">SPECIALTY</Badge>
                  )}
                </div>
              </Card>
            ) : (
              <Card className="gradient-card p-4 border-border/50">
                <p className="text-sm text-muted-foreground">Clique em um talhão no mapa para ver detalhes.</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-foreground font-medium">{value}</span>
    </div>
  );
}
