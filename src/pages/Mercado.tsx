import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { precoHistorico, concorrentes } from "@/data/mockData";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area } from "recharts";
import { TrendingUp, Bell, Target, Bot, ArrowUpRight, Calculator, AlertTriangle } from "lucide-react";
import { useState } from "react";

export default function Mercado() {
  const [showSimulador, setShowSimulador] = useState(false);
  const [simSacas, setSimSacas] = useState(620);
  const [simPreco, setSimPreco] = useState(1076);

  const variacao12m = ((1076 - 980) / 980 * 100).toFixed(1);
  const maxPreco = Math.max(...precoHistorico.map(p => p.arabica));
  const minPreco = Math.min(...precoHistorico.map(p => p.arabica));

  return (
    <Layout>
      <div className="space-y-6 animate-slide-up">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Mercado</h1>
          <Button size="sm" variant="outline" onClick={() => setShowSimulador(!showSimulador)} className="text-xs border-border text-foreground">
            <Calculator className="h-3 w-3 mr-1" />Simulador de Venda
          </Button>
        </div>

        {/* Price display */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="gradient-card p-6 border-accent/20 glow-accent">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Café Arábica — CEPEA</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-foreground">R$ 1.076</span>
              <span className="text-muted-foreground">/sc</span>
            </div>
            <div className="flex items-center gap-3 mt-2">
              <Badge className="bg-success/20 text-success border-success/30"><TrendingUp className="h-3 w-3 mr-1" />↑ 2,3% hoje</Badge>
              <span className="text-xs text-muted-foreground">12m: +{variacao12m}%</span>
            </div>
            <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
              <span>Máx 12m: <strong className="text-foreground">R$ {maxPreco}</strong></span>
              <span>Mín 12m: <strong className="text-foreground">R$ {minPreco}</strong></span>
            </div>
          </Card>
          <Card className="gradient-card p-6 border-border/50">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Robusta</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-foreground">R$ 720</span>
              <span className="text-muted-foreground">/sc</span>
            </div>
            <Badge variant="outline" className="mt-2 text-xs text-muted-foreground border-border"><TrendingUp className="h-3 w-3 mr-1" />↑ 0,8%</Badge>
          </Card>
          <Card className="gradient-card p-6 border-border/50">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Café Especial</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-accent">R$ 2.340</span>
              <span className="text-muted-foreground">/sc</span>
            </div>
            <Badge className="bg-accent/20 text-accent border-accent/30 mt-2 text-xs"><ArrowUpRight className="h-3 w-3 mr-1" />Prêmio +117%</Badge>
          </Card>
        </div>

        {/* Sale simulator */}
        {showSimulador && (
          <Card className="gradient-card p-4 border-accent/20 bg-accent/5">
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2"><Calculator className="h-4 w-4 text-accent" />Simulador de Venda</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div>
                <label className="text-xs text-muted-foreground block mb-1">Sacas</label>
                <input type="number" value={simSacas} onChange={e => setSimSacas(Number(e.target.value))}
                  className="w-full bg-card border border-border/50 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground block mb-1">Preço/Saca (R$)</label>
                <input type="number" value={simPreco} onChange={e => setSimPreco(Number(e.target.value))}
                  className="w-full bg-card border border-border/50 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground block mb-1">Receita Estimada</label>
                <p className="text-2xl font-bold text-success">R$ {(simSacas * simPreco).toLocaleString('pt-BR')}</p>
              </div>
              <div>
                <label className="text-xs text-muted-foreground block mb-1">Se aguardar (R$ 1.180)</label>
                <p className="text-lg font-bold text-accent">+ R$ {((1180 - simPreco) * simSacas).toLocaleString('pt-BR')}</p>
              </div>
            </div>
          </Card>
        )}

        {/* Price chart */}
        <Card className="gradient-card p-4 border-border/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-foreground">Histórico de Preços — 12 meses</h3>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1"><div className="h-2 w-4 rounded bg-success" /><span className="text-[10px] text-muted-foreground">Arábica</span></div>
              <div className="flex items-center gap-1"><div className="h-2 w-4 rounded bg-accent" /><span className="text-[10px] text-muted-foreground">Robusta</span></div>
              <div className="flex items-center gap-1"><div className="h-2 w-4 rounded bg-info" /><span className="text-[10px] text-muted-foreground">Especial</span></div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={precoHistorico}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(20 12% 20%)" />
              <XAxis dataKey="mes" tick={{ fill: 'hsl(25 8% 52%)', fontSize: 11 }} />
              <YAxis tick={{ fill: 'hsl(25 8% 52%)', fontSize: 11 }} />
              <Tooltip contentStyle={{ background: 'hsl(20 16% 13%)', border: '1px solid hsl(20 12% 20%)', borderRadius: 8, color: '#fff' }} formatter={(v: number) => `R$ ${v.toLocaleString('pt-BR')}`} />
              <Area type="monotone" dataKey="arabica" name="Arábica" fill="hsl(142 71% 45% / 0.15)" stroke="hsl(142 71% 45%)" strokeWidth={2.5} />
              <Area type="monotone" dataKey="robusta" name="Robusta" fill="hsl(38 92% 50% / 0.1)" stroke="hsl(38 92% 50%)" strokeWidth={1.5} />
              <Area type="monotone" dataKey="especial" name="Especial" fill="hsl(199 89% 48% / 0.1)" stroke="hsl(199 89% 48%)" strokeWidth={1.5} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Price alert */}
          <Card className="gradient-card p-4 border-border/50">
            <div className="flex items-center gap-2 mb-3">
              <Bell className="h-4 w-4 text-accent" />
              <span className="text-sm font-semibold text-foreground">Alertas de Preço</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                <div>
                  <p className="text-sm text-foreground">R$ 1.150/sc</p>
                  <p className="text-[10px] text-muted-foreground">Meta de venda</p>
                </div>
                <Badge variant="outline" className="text-xs border-accent/30 text-accent">Pendente</Badge>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                <div>
                  <p className="text-sm text-foreground">R$ 1.050/sc</p>
                  <p className="text-[10px] text-muted-foreground">Stop loss</p>
                </div>
                <Badge variant="outline" className="text-xs border-destructive/30 text-destructive">Proteção</Badge>
              </div>
            </div>
            <Button size="sm" variant="outline" className="w-full mt-3 text-xs border-border text-foreground"><Plus className="h-3 w-3 mr-1" />Novo Alerta</Button>
          </Card>

          {/* Regional benchmark */}
          <Card className="gradient-card p-4 border-border/50">
            <div className="flex items-center gap-2 mb-3">
              <Target className="h-4 w-4 text-success" />
              <span className="text-sm font-semibold text-foreground">Benchmark Regional</span>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Produtividade Cerrado Mineiro</span>
                  <span className="text-foreground">52 sc/ha</span>
                </div>
                <div className="relative h-2 bg-muted rounded-full">
                  <div className="absolute h-full bg-muted-foreground/30 rounded-full" style={{ width: '52%' }} />
                  <div className="absolute h-full bg-success rounded-full" style={{ width: '58%' }} />
                  <div className="absolute top-1/2 -translate-y-1/2 h-3 w-0.5 bg-accent" style={{ left: '58%' }} />
                </div>
                <p className="text-[10px] text-success mt-1">Sua média: 58 sc/ha (+11,5%)</p>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Preço médio região</span>
                  <span className="text-foreground">R$ 1.040/sc</span>
                </div>
                <p className="text-[10px] text-success">Seu preço médio: R$ 1.076/sc (+3,5%)</p>
              </div>
            </div>
          </Card>

          {/* AI sell card */}
          <Card className="gradient-card p-4 border-accent/20">
            <div className="flex items-center gap-2 mb-3">
              <Bot className="h-4 w-4 text-accent" />
              <span className="text-sm font-semibold text-foreground">Recomendação IA</span>
            </div>
            <div className="p-3 rounded-lg bg-accent/5 border border-accent/10 mb-3">
              <p className="text-sm text-foreground/90">Com base no histórico 2022–2025, preços tendem a subir em <strong className="text-accent">Agosto–Setembro</strong>. Pico histórico médio: <strong className="text-accent">R$ 1.210/sc</strong>.</p>
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between"><span className="text-muted-foreground">Ação sugerida</span><span className="text-accent font-medium">Aguardar</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Ganho potencial</span><span className="text-success font-medium">+ R$ 96.000</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Confiança</span><span className="text-foreground">78%</span></div>
            </div>
          </Card>
        </div>

        {/* Price Simulator */}
        <Card className="gradient-card p-5 border-accent/30">
          <div className="flex items-center gap-2 mb-4">
            <Calculator className="h-4 w-4 text-accent" />
            <h3 className="text-sm font-semibold text-foreground">Simulador de Receita</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wider">Sacas disponíveis: <strong className="text-foreground">{simSacas.toLocaleString('pt-BR')}</strong></label>
                <input type="range" min={100} max={4820} step={10} value={simSacas}
                  onChange={e => setSimSacas(Number(e.target.value))}
                  className="w-full mt-2 accent-accent" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wider">Preço por saca: <strong className="text-foreground">R$ {simPreco.toLocaleString('pt-BR')}</strong></label>
                <input type="range" min={800} max={2500} step={10} value={simPreco}
                  onChange={e => setSimPreco(Number(e.target.value))}
                  className="w-full mt-2 accent-accent" />
                <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                  <span>R$ 800 (mín)</span>
                  <span className="text-accent">R$ 1.076 (atual)</span>
                  <span className="text-accent font-bold">R$ 2.340 (specialty)</span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="p-4 rounded-lg bg-muted/30">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Receita ao preço selecionado</p>
                <p className="text-2xl font-bold text-foreground mt-1">R$ {receitaAtual.toLocaleString('pt-BR')}</p>
              </div>
              <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                <p className="text-xs text-accent uppercase tracking-wider">Se classificar como Specialty (R$ 2.340/sc)</p>
                <p className="text-2xl font-bold text-accent mt-1">R$ {receitaSpecialty.toLocaleString('pt-BR')}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {diferencaSpecialty > 0
                    ? <span className="text-success font-semibold">+R$ {diferencaSpecialty.toLocaleString('pt-BR')} a mais</span>
                    : <span className="text-muted-foreground">já no preço specialty</span>}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Competitor table */}
        <Card className="gradient-card border-border/50 overflow-hidden">
          <div className="p-4 border-b border-border/30 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">Radar de Concorrentes</h3>
            <Badge variant="outline" className="text-xs border-border text-muted-foreground">{concorrentes.length} monitorados</Badge>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50">
                  {['Nome', 'Região', 'Produtividade', 'Presença', 'Preço Médio', 'Risco', 'Obs'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs text-muted-foreground uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {concorrentes.map((c, i) => (
                  <tr key={i} className="border-b border-border/30 hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-3 font-medium text-foreground">{c.nome}</td>
                    <td className="px-4 py-3 text-foreground">{c.regiao}</td>
                    <td className="px-4 py-3 text-foreground">{c.produtividade}</td>
                    <td className="px-4 py-3 text-foreground">{c.presenca}</td>
                    <td className="px-4 py-3 text-foreground">{c.precoMedio}</td>
                    <td className="px-4 py-3">
                      <Badge className={c.risco === 'alto' ? 'bg-destructive/20 text-destructive border-destructive/30' : c.risco === 'medio' ? 'bg-accent/20 text-accent border-accent/30' : 'bg-success/20 text-success border-success/30'} variant="outline">
                        {c.risco}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{c.obs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </Layout>
  );
}

function Plus(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
  );
}
