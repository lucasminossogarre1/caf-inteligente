import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { kpis, fazendas, cashFlowData, aiAlerts, clima, kpiTrends, atividadesRecentes, rankingProdutividade } from "@/data/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, LineChart, Line } from "recharts";
import { TrendingUp, TrendingDown, Wheat, DollarSign, Percent, AlertTriangle, Info, Plus, Eye, CloudRain, Droplets, Wind, ArrowUpRight, ArrowDownRight, Package, Activity, MapPin, Star, Thermometer } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";

const fmt = (v: number) => v.toLocaleString('pt-BR');
const fmtR = (v: number) => `R$ ${(v / 1000).toLocaleString('pt-BR')}k`;

const kpiCards = [
  { label: 'Total Colhido', value: `${fmt(kpis.totalColhido)} sc`, icon: Wheat, color: 'text-success', trend: '+5,8%', up: true, sparkData: kpiTrends.colheita },
  { label: 'Receita Total', value: `R$ ${(kpis.receitaTotal / 1000000).toFixed(1)}M`, icon: DollarSign, color: 'text-accent', trend: '+8,2%', up: true, sparkData: kpiTrends.receita },
  { label: 'Custo Total', value: `R$ ${(kpis.custoTotal / 1000000).toFixed(1)}M`, icon: TrendingDown, color: 'text-destructive', trend: '+3,4%', up: true, sparkData: kpiTrends.custo },
  { label: 'Margem', value: `${kpis.margem}%`, icon: Percent, color: 'text-success', trend: '+0,5pp', up: true, sparkData: kpiTrends.margem },
  { label: 'Custo/Saca', value: `R$ ${kpis.custoSacaMedia}`, icon: DollarSign, color: 'text-muted-foreground', trend: '-2,1%', up: false, sparkData: [420, 415, 410, 408, 405, 402] },
];

const farmComparison = fazendas.map(f => ({
  nome: f.nome.replace('Fazenda ', ''),
  colheita: f.colheitaTotal,
  receita: f.receita / 1000,
  custo: f.custo / 1000,
  margem: Math.round(((f.receita - f.custo) / f.receita) * 100),
}));

const alertIcons: Record<string, any> = { warning: AlertTriangle, danger: TrendingDown, info: Info };
const alertColors: Record<string, string> = { warning: 'text-accent', danger: 'text-destructive', info: 'text-info' };
const alertBg: Record<string, string> = { warning: 'bg-accent/5 border-accent/20', danger: 'bg-destructive/5 border-destructive/20', info: 'bg-info/5 border-info/20' };

const activityIcons: Record<string, string> = { colheita: '🌾', financeiro: '💰', operacao: '🔧', alerta: '⚠️' };

export default function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState<'mensal' | 'trimestral' | 'anual'>('mensal');

  return (
    <Layout>
      <div className="space-y-6 animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Dashboard Executivo</h1>
            <p className="text-muted-foreground text-sm">Safra 2025 — Região do Cerrado Mineiro</p>
          </div>
          <div className="flex items-center gap-2">
            {['mensal', 'trimestral', 'anual'].map(p => (
              <button key={p} onClick={() => setSelectedPeriod(p as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${selectedPeriod === p ? 'bg-accent text-accent-foreground' : 'bg-muted/50 text-muted-foreground hover:text-foreground'}`}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* KPIs with sparklines */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {kpiCards.map((k) => (
            <Card key={k.label} className="gradient-card p-4 border-border/50 hover:border-accent/20 transition-colors group">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">{k.label}</span>
                <k.icon className={`h-4 w-4 ${k.color} opacity-60 group-hover:opacity-100 transition-opacity`} />
              </div>
              <p className="text-xl font-bold text-foreground mb-1">{k.value}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {k.up && k.label !== 'Custo Total' ? (
                    <ArrowUpRight className="h-3 w-3 text-success" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 text-success" />
                  )}
                  <span className={`text-[10px] font-medium ${k.label === 'Custo Total' ? 'text-destructive' : 'text-success'}`}>{k.trend}</span>
                </div>
                {/* Mini sparkline */}
                <div className="w-16 h-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={k.sparkData.map((v, i) => ({ v, i }))}>
                      <Line type="monotone" dataKey="v" stroke={k.label === 'Custo Total' ? 'hsl(0 72% 51%)' : 'hsl(142 71% 45%)'} strokeWidth={1.5} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Secondary metrics row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="gradient-card p-4 border-border/50">
            <div className="flex items-center gap-2 mb-2">
              <Package className="h-4 w-4 text-accent" />
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Estoque</span>
            </div>
            <p className="text-lg font-bold text-foreground">{kpis.sacasEstoque} sacas</p>
            <p className="text-xs text-muted-foreground">Valor est.: R$ {fmt(kpis.sacasEstoque * 1076)}</p>
          </Card>
          <Card className="gradient-card p-4 border-border/50">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="h-4 w-4 text-info" />
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Produtividade</span>
            </div>
            <p className="text-lg font-bold text-foreground">{kpis.mediaScHa} sc/ha</p>
            <div className="flex items-center gap-1 mt-1">
              <Progress value={((kpis.mediaScHa / 100) * 100)} className="h-1.5 flex-1" />
              <span className="text-[10px] text-success">+11,5% vs região</span>
            </div>
          </Card>
          <Card className="gradient-card p-4 border-border/50">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="h-4 w-4 text-success" />
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Área Produtiva</span>
            </div>
            <p className="text-lg font-bold text-foreground">{kpis.areaProdutiva} ha</p>
            <p className="text-xs text-muted-foreground">de 107 ha total (12 ha em renovação)</p>
          </Card>
          {/* Weather */}
          <Card className="gradient-card p-4 border-border/50">
            <div className="flex items-center gap-2 mb-2">
              <Thermometer className="h-4 w-4 text-accent" />
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Clima Hoje</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{clima.previsao[0].icone}</span>
              <div>
                <p className="text-lg font-bold text-foreground">{clima.atual.temp}°C</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-0.5"><Droplets className="h-2.5 w-2.5" />{clima.atual.umidade}%</span>
                  <span className="flex items-center gap-0.5"><Wind className="h-2.5 w-2.5" />{clima.atual.vento}km/h</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Best/Worst + Quick Actions + Weather Forecast */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="gradient-card p-4 border-success/20 glow-success">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="h-4 w-4 text-success" />
              <span className="text-xs text-success font-semibold uppercase">Melhor Talhão</span>
            </div>
            <p className="font-bold text-foreground">Talhão A3 — 98 sc/ha</p>
            <p className="text-xs text-muted-foreground">Fazenda Serra Verde</p>
            <div className="flex items-center gap-1 mt-2">
              <Star className="h-3 w-3 text-accent" />
              <span className="text-xs text-accent font-medium">84 SCA — Specialty</span>
            </div>
          </Card>
          <Card className="gradient-card p-4 border-destructive/20">
            <div className="flex items-center gap-2 mb-1">
              <TrendingDown className="h-4 w-4 text-destructive" />
              <span className="text-xs text-destructive font-semibold uppercase">Pior Talhão</span>
            </div>
            <p className="font-bold text-foreground">Talhão B1 — 41 sc/ha</p>
            <p className="text-xs text-muted-foreground">Fazenda Boa Vista</p>
            <p className="text-xs text-destructive mt-2">Custo R$ 612/sc — ↓3 safras seguidas</p>
          </Card>
          <Card className="gradient-card p-4 border-border/50">
            <span className="text-xs text-muted-foreground uppercase tracking-wider mb-2 block">Ações Rápidas</span>
            <div className="flex flex-col gap-2">
              <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 text-xs w-full justify-start"><Plus className="h-3 w-3 mr-2" />Lançar Colheita</Button>
              <Button size="sm" variant="outline" className="text-xs border-border text-foreground hover:bg-muted w-full justify-start"><DollarSign className="h-3 w-3 mr-2" />Registrar Gasto</Button>
              <Button size="sm" variant="outline" className="text-xs border-border text-foreground hover:bg-muted w-full justify-start"><Eye className="h-3 w-3 mr-2" />Ver Mapa</Button>
            </div>
          </Card>
          {/* 5-day forecast */}
          <Card className="gradient-card p-4 border-border/50">
            <span className="text-xs text-muted-foreground uppercase tracking-wider mb-2 block">Previsão 5 Dias</span>
            <div className="space-y-1.5">
              {clima.previsao.map((d) => (
                <div key={d.dia} className="flex items-center justify-between text-xs">
                  <span className="text-foreground w-10">{d.dia}</span>
                  <span className="text-base">{d.icone}</span>
                  <span className="font-medium text-foreground">{d.temp}°C</span>
                  <div className="flex items-center gap-1">
                    <Droplets className="h-2.5 w-2.5 text-info" />
                    <span className={d.chuva >= 50 ? 'text-info font-medium' : 'text-muted-foreground'}>{d.chuva}%</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card className="gradient-card p-4 border-border/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-foreground">Comparação por Fazenda</h3>
              <Badge variant="outline" className="text-[10px] border-border text-muted-foreground">Safra 2025</Badge>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={farmComparison}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(20 12% 20%)" />
                <XAxis dataKey="nome" tick={{ fill: 'hsl(25 8% 52%)', fontSize: 12 }} />
                <YAxis tick={{ fill: 'hsl(25 8% 52%)', fontSize: 11 }} />
                <Tooltip contentStyle={{ background: 'hsl(20 16% 13%)', border: '1px solid hsl(20 12% 20%)', borderRadius: 8, color: '#fff' }} />
                <Bar dataKey="colheita" name="Colheita (sacas)" fill="hsl(142 71% 45%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="receita" name="Receita (R$ mil)" fill="hsl(38 92% 50%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="custo" name="Custo (R$ mil)" fill="hsl(0 72% 51%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="gradient-card p-4 border-border/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-foreground">Fluxo de Caixa Mensal</h3>
              <Badge variant="outline" className="text-[10px] border-border text-muted-foreground">2026</Badge>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={cashFlowData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(20 12% 20%)" />
                <XAxis dataKey="mes" tick={{ fill: 'hsl(25 8% 52%)', fontSize: 12 }} />
                <YAxis tick={{ fill: 'hsl(25 8% 52%)', fontSize: 11 }} tickFormatter={(v) => `${(v/1000)}k`} />
                <Tooltip contentStyle={{ background: 'hsl(20 16% 13%)', border: '1px solid hsl(20 12% 20%)', borderRadius: 8, color: '#fff' }} formatter={(v: number) => fmtR(v)} />
                <Area type="monotone" dataKey="receita" name="Receita" fill="hsl(142 71% 45% / 0.2)" stroke="hsl(142 71% 45%)" />
                <Area type="monotone" dataKey="despesa" name="Despesa" fill="hsl(0 72% 51% / 0.2)" stroke="hsl(0 72% 51%)" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Ranking + Activity feed + AI Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Productivity Ranking */}
          <Card className="gradient-card p-4 border-border/50">
            <h3 className="text-sm font-semibold text-foreground mb-3">Ranking de Produtividade</h3>
            <div className="space-y-2">
              {rankingProdutividade.slice(0, 6).map((t, i) => (
                <div key={t.talhao} className="flex items-center gap-3 p-2 rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors">
                  <span className={`text-xs font-bold w-5 text-center ${i === 0 ? 'text-accent' : i < 3 ? 'text-success' : 'text-muted-foreground'}`}>
                    {i + 1}º
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground">{t.talhao}</span>
                      <span className="text-[10px] text-muted-foreground">{t.fazenda}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-muted-foreground">{t.variedade}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-foreground">{t.scHa} sc/ha</p>
                    {t.sca >= 80 && <Badge className="bg-accent/20 text-accent border-accent/30 text-[9px] px-1">SCA {t.sca}</Badge>}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Activity feed */}
          <Card className="gradient-card p-4 border-border/50">
            <h3 className="text-sm font-semibold text-foreground mb-3">Atividade Recente</h3>
            <div className="space-y-3">
              {atividadesRecentes.map((a) => (
                <div key={a.id} className="flex items-start gap-3 relative">
                  <div className="flex flex-col items-center">
                    <span className="text-sm">{activityIcons[a.tipo]}</span>
                    <div className="w-px h-full bg-border/30 mt-1" />
                  </div>
                  <div className="flex-1 pb-3">
                    <p className="text-sm text-foreground/90">{a.desc}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] text-muted-foreground">{a.data}</span>
                      <span className="text-[10px] text-muted-foreground/60">•</span>
                      <span className="text-[10px] text-muted-foreground">{a.fazenda}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* AI Alerts */}
          <Card className="gradient-card p-4 border-border/50">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-foreground">Alertas da IA</h3>
              <Badge className="bg-accent/20 text-accent border-accent/30 text-[10px]">{aiAlerts.length} ativos</Badge>
            </div>
            <div className="space-y-2">
              {aiAlerts.slice(0, 4).map((a) => {
                const Icon = alertIcons[a.tipo];
                return (
                  <div key={a.id} className={`flex items-start gap-3 p-3 rounded-lg border ${alertBg[a.tipo]}`}>
                    <Icon className={`h-4 w-4 mt-0.5 shrink-0 ${alertColors[a.tipo]}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-foreground/90 leading-relaxed">{a.msg}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] text-muted-foreground">{a.data}</span>
                        <Badge variant="outline" className={`text-[9px] px-1 ${a.prioridade === 'alta' ? 'border-destructive/30 text-destructive' : 'border-border text-muted-foreground'}`}>
                          {a.prioridade}
                        </Badge>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Farm summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {fazendas.map(f => {
            const margem = Math.round(((f.receita - f.custo) / f.receita) * 100);
            return (
              <Card key={f.id} className="gradient-card p-4 border-border/50 hover:border-accent/20 transition-all cursor-pointer group">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-foreground text-sm">{f.nome}</h4>
                    <p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="h-2.5 w-2.5" />{f.cidade}</p>
                  </div>
                  <Badge variant="outline" className="text-xs border-border text-muted-foreground">{f.hectares}ha</Badge>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 rounded-lg bg-muted/30">
                    <p className="text-xs text-muted-foreground">Colheita</p>
                    <p className="text-sm font-bold text-foreground">{fmt(f.colheitaTotal)}</p>
                  </div>
                  <div className="p-2 rounded-lg bg-muted/30">
                    <p className="text-xs text-muted-foreground">Receita</p>
                    <p className="text-sm font-bold text-foreground">R$ {(f.receita / 1000000).toFixed(1)}M</p>
                  </div>
                  <div className="p-2 rounded-lg bg-muted/30">
                    <p className="text-xs text-muted-foreground">Margem</p>
                    <p className={`text-sm font-bold ${margem >= 60 ? 'text-success' : margem >= 40 ? 'text-accent' : 'text-destructive'}`}>{margem}%</p>
                  </div>
                </div>
                <div className="mt-3 flex gap-1">
                  {f.talhoes.map(t => (
                    <div key={t.id} className={`h-1.5 rounded-full flex-1 ${t.status === 'alta' ? 'bg-success' : t.status === 'media' ? 'bg-accent' : t.status === 'baixa' ? 'bg-destructive' : 'bg-muted-foreground/30'}`} title={`${t.nome}: ${t.status}`} />
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
