import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { fazendas, Talhao, analiseSolo } from "@/data/mockData";
import { useState } from "react";
import { MapPin, Leaf, BarChart3, DollarSign, Droplets, Mountain, Calendar, FlaskConical, Maximize2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

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
  const [showSoilAnalysis, setShowSoilAnalysis] = useState(false);
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

  const getLayerValue = (t: Talhao) => {
    if (layer === 'produtividade') return `${t.produtividadeScHa} sc/ha`;
    if (layer === 'qualidade') return t.pontuacaoSCA > 0 ? `SCA ${t.pontuacaoSCA}` : 'N/A';
    return t.custoSaca > 0 ? `R$ ${t.custoSaca}/sc` : 'N/A';
  };

  const soilData = selectedTalhao ? analiseSolo.find(s => s.talhao === selectedTalhao.nome.replace('Talhão ', '')) : null;

  return (
    <Layout>
      <div className="space-y-6 animate-slide-up">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Mapa das Fazendas</h1>
          <div className="flex items-center gap-2">
            {fazendas.map((f, i) => (
              <button key={f.id} onClick={() => { setSelectedFarm(i); setSelectedTalhao(null); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${i === selectedFarm ? 'bg-accent text-accent-foreground' : 'bg-muted/50 text-muted-foreground hover:text-foreground'}`}
              >
                {f.nome.replace('Fazenda ', '')}
              </button>
            ))}
          </div>
        </div>

        {/* Farm overview mini cards */}
        <div className="grid grid-cols-4 gap-3">
          <Card className="gradient-card p-3 border-border/50 text-center">
            <p className="text-[10px] text-muted-foreground uppercase">Área Total</p>
            <p className="text-lg font-bold text-foreground">{farm.hectares}ha</p>
          </Card>
          <Card className="gradient-card p-3 border-border/50 text-center">
            <p className="text-[10px] text-muted-foreground uppercase">Talhões</p>
            <p className="text-lg font-bold text-foreground">{farm.talhoes.length}</p>
          </Card>
          <Card className="gradient-card p-3 border-border/50 text-center">
            <p className="text-[10px] text-muted-foreground uppercase">Colheita</p>
            <p className="text-lg font-bold text-foreground">{farm.colheitaTotal.toLocaleString('pt-BR')}</p>
          </Card>
          <Card className="gradient-card p-3 border-border/50 text-center">
            <p className="text-[10px] text-muted-foreground uppercase">Margem</p>
            <p className="text-lg font-bold text-success">{Math.round(((farm.receita - farm.custo) / farm.receita) * 100)}%</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Sidebar */}
          <div className="space-y-3">
            {/* Layer toggle */}
            <Card className="p-3 border-border/50 bg-card">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Camada</p>
              <div className="flex flex-col gap-1">
                {(['produtividade', 'qualidade', 'custo'] as Layer[]).map(l => (
                  <button key={l} onClick={() => setLayer(l)}
                    className={`text-left px-3 py-2 rounded text-xs transition-all ${layer === l ? 'bg-accent/20 text-accent font-medium border border-accent/30' : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'}`}
                  >
                    {l === 'produtividade' ? <><BarChart3 className="inline h-3 w-3 mr-1.5" />Produtividade</> :
                     l === 'qualidade' ? <><Leaf className="inline h-3 w-3 mr-1.5" />Qualidade SCA</> :
                     <><DollarSign className="inline h-3 w-3 mr-1.5" />Custo/Saca</>}
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

            {/* Talhão list */}
            <Card className="p-3 border-border/50 bg-card">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Talhões</p>
              <div className="space-y-1">
                {farm.talhoes.map(t => (
                  <button key={t.id} onClick={() => setSelectedTalhao(t)}
                    className={`w-full text-left px-2.5 py-1.5 rounded text-xs transition-colors flex items-center justify-between ${selectedTalhao?.id === t.id ? 'bg-accent/20 text-accent' : 'text-foreground hover:bg-muted/30'}`}
                  >
                    <span className="font-medium">{t.nome}</span>
                    <span className="text-muted-foreground">{getLayerValue(t)}</span>
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Map area */}
          <div className="lg:col-span-2">
            <Card className="border-border/50 bg-card overflow-hidden h-[520px] relative">
              {/* Fake terrain background */}
              <div className="absolute inset-0" style={{
                background: `
                  radial-gradient(ellipse at 30% 40%, hsl(20 25% 14%) 0%, transparent 50%),
                  radial-gradient(ellipse at 70% 60%, hsl(25 20% 12%) 0%, transparent 50%),
                  radial-gradient(ellipse at 50% 80%, hsl(30 15% 10%) 0%, transparent 60%),
                  linear-gradient(135deg, hsl(20 20% 10%) 0%, hsl(25 18% 8%) 100%)
                `,
              }}>
                {/* Grid lines */}
                <svg className="absolute inset-0 w-full h-full opacity-10">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <line key={`h${i}`} x1="0" y1={`${i * 5}%`} x2="100%" y2={`${i * 5}%`} stroke="currentColor" strokeWidth="0.3" className="text-foreground" />
                  ))}
                  {Array.from({ length: 20 }).map((_, i) => (
                    <line key={`v${i}`} x1={`${i * 5}%`} y1="0" x2={`${i * 5}%`} y2="100%" stroke="currentColor" strokeWidth="0.3" className="text-foreground" />
                  ))}
                </svg>
                {/* Contour lines */}
                <svg className="absolute inset-0 w-full h-full opacity-5">
                  <ellipse cx="40%" cy="35%" rx="25%" ry="20%" fill="none" stroke="currentColor" strokeWidth="1" className="text-foreground" />
                  <ellipse cx="60%" cy="65%" rx="20%" ry="15%" fill="none" stroke="currentColor" strokeWidth="1" className="text-foreground" />
                </svg>
              </div>

              {/* Talhões as positioned blocks */}
              <div className="absolute inset-4 flex flex-wrap gap-3 items-start content-start p-4">
                {farm.talhoes.map((t) => {
                  const sizeClass = t.hectares >= 14 ? 'w-44 h-36' : t.hectares >= 10 ? 'w-36 h-30' : 'w-30 h-26';
                  return (
                    <button key={t.id} onClick={() => setSelectedTalhao(t)}
                      className={`${sizeClass} ${getTalhaoColor(t)} rounded-xl border border-foreground/10 flex flex-col items-center justify-center transition-all hover:scale-105 cursor-pointer backdrop-blur-sm ${selectedTalhao?.id === t.id ? 'ring-2 ring-accent shadow-lg shadow-accent/20' : ''}`}
                    >
                      <span className="font-bold text-sm text-foreground drop-shadow">{t.nome}</span>
                      <span className="text-xs text-foreground/80 drop-shadow">{t.hectares}ha</span>
                      <span className="text-[10px] text-foreground/70 drop-shadow mt-0.5">{getLayerValue(t)}</span>
                    </button>
                  );
                })}
              </div>

              <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-card/80 backdrop-blur-sm rounded-lg px-3 py-1.5">
                <MapPin className="h-3 w-3 text-accent" />
                <span className="text-xs text-foreground">{farm.cidade}</span>
                {farm.coordenadas && (
                  <span className="text-[10px] text-muted-foreground">{farm.coordenadas.lat.toFixed(2)}°S, {Math.abs(farm.coordenadas.lng).toFixed(2)}°W</span>
                )}
              </div>
              <button className="absolute top-3 right-3 p-1.5 bg-card/80 backdrop-blur-sm rounded-lg border border-border/30 hover:bg-card transition-colors">
                <Maximize2 className="h-3.5 w-3.5 text-muted-foreground" />
              </button>
            </Card>
          </div>

          {/* Detail panel */}
          <div className="space-y-3">
            {selectedTalhao ? (
              <>
                <Card className="gradient-card p-4 border-border/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-foreground">{selectedTalhao.nome}</h3>
                    <Badge className={statusBadge[selectedTalhao.status]}>{statusLabels[selectedTalhao.status]}</Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <Row label="Hectares" value={`${selectedTalhao.hectares}ha`} icon={<Maximize2 className="h-3 w-3" />} />
                    <Row label="Variedade" value={selectedTalhao.variedade} icon={<Leaf className="h-3 w-3" />} />
                    <Row label="Idade dos Pés" value={`${selectedTalhao.idadePes} anos`} icon={<Calendar className="h-3 w-3" />} />
                    <Row label="Altitude" value={selectedTalhao.altitude ? `${selectedTalhao.altitude}m` : '-'} icon={<Mountain className="h-3 w-3" />} />
                    <Row label="Produção" value={`${selectedTalhao.producaoSacas} sacas`} icon={<BarChart3 className="h-3 w-3" />} />
                    <Row label="Produtividade" value={`${selectedTalhao.produtividadeScHa} sc/ha`} icon={<BarChart3 className="h-3 w-3" />} />
                    {selectedTalhao.pontuacaoSCA > 0 && (
                      <>
                        <div className="border-t border-border/30 pt-2 mt-2" />
                        <Row label="SCA" value={`${selectedTalhao.pontuacaoSCA} pts`} icon={<Leaf className="h-3 w-3" />} />
                        <Row label="Peneira" value={selectedTalhao.peneira} />
                        <Row label="Defeitos" value={`${selectedTalhao.defeitos}%`} />
                        <Row label="Bebida" value={selectedTalhao.tipoBebida} />
                        <Row label="Umidade" value={`${selectedTalhao.umidade}%`} icon={<Droplets className="h-3 w-3" />} />
                        <Row label="Custo/Saca" value={`R$ ${selectedTalhao.custoSaca}`} icon={<DollarSign className="h-3 w-3" />} />
                        <Row label="Últ. Adubação" value={selectedTalhao.ultimaAdubacao || '-'} icon={<Calendar className="h-3 w-3" />} />
                        <Row label="pH Solo" value={selectedTalhao.phSolo?.toFixed(1) || '-'} icon={<FlaskConical className="h-3 w-3" />} />
                      </>
                    )}
                    {selectedTalhao.pontuacaoSCA >= 80 && (
                      <Badge className="bg-accent/20 text-accent border-accent/30 mt-2">SPECIALTY</Badge>
                    )}
                  </div>
                </Card>

                {/* Soil analysis */}
                {soilData && (
                  <Card className="gradient-card p-4 border-border/50">
                    <button onClick={() => setShowSoilAnalysis(!showSoilAnalysis)} className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        <FlaskConical className="h-4 w-4 text-info" />
                        <span className="text-sm font-semibold text-foreground">Análise de Solo</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{showSoilAnalysis ? '▲' : '▼'}</span>
                    </button>
                    {showSoilAnalysis && (
                      <div className="mt-3 space-y-2 text-sm">
                        <SoilRow label="pH" value={soilData.ph} min={5} max={7} />
                        <SoilRow label="M.O." value={soilData.materiaOrganica} min={1} max={5} suffix="%" />
                        <SoilRow label="Fósforo" value={soilData.fosforo} min={0} max={25} suffix=" mg/dm³" />
                        <SoilRow label="Potássio" value={soilData.potassio} min={0} max={200} suffix=" mg/dm³" />
                        <SoilRow label="Sat. Bases" value={soilData.saturacaoBases} min={30} max={80} suffix="%" />
                      </div>
                    )}
                  </Card>
                )}
              </>
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

function Row({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-muted-foreground flex items-center gap-1.5">{icon}{label}</span>
      <span className="text-foreground font-medium">{value}</span>
    </div>
  );
}

function SoilRow({ label, value, min, max, suffix = '' }: { label: string; value: number; min: number; max: number; suffix?: string }) {
  const pct = Math.min(Math.max(((value - min) / (max - min)) * 100, 0), 100);
  return (
    <div>
      <div className="flex justify-between text-xs mb-0.5">
        <span className="text-muted-foreground">{label}</span>
        <span className="text-foreground font-medium">{value}{suffix}</span>
      </div>
      <Progress value={pct} className="h-1" />
    </div>
  );
}
