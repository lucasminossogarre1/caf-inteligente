import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { kpis, fazendas, cashFlowData, aiAlerts } from "@/data/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { TrendingUp, TrendingDown, Wheat, DollarSign, Percent, AlertTriangle, Info, Plus, Eye } from "lucide-react";
import { Layout } from "@/components/Layout";

const fmt = (v: number) => v.toLocaleString('pt-BR');
const fmtR = (v: number) => `R$ ${(v / 1000).toLocaleString('pt-BR')}k`;

const kpiCards = [
  { label: 'Total Colhido', value: `${fmt(kpis.totalColhido)} sacas`, icon: Wheat, color: 'text-success' },
  { label: 'Receita Total', value: `R$ ${(kpis.receitaTotal / 1000000).toFixed(1)}M`, icon: DollarSign, color: 'text-accent' },
  { label: 'Custo Total', value: `R$ ${(kpis.custoTotal / 1000000).toFixed(1)}M`, icon: TrendingDown, color: 'text-destructive' },
  { label: 'Margem', value: `${kpis.margem}%`, icon: Percent, color: 'text-success' },
  { label: 'Custo/Saca Médio', value: `R$ ${kpis.custoSacaMedia}`, icon: DollarSign, color: 'text-muted-foreground' },
];

const farmComparison = fazendas.map(f => ({
  nome: f.nome.replace('Fazenda ', ''),
  colheita: f.colheitaTotal,
  receita: f.receita / 1000,
  custo: f.custo / 1000,
}));

const alertIcons: Record<string, any> = { warning: AlertTriangle, danger: TrendingDown, info: Info };
const alertColors: Record<string, string> = { warning: 'text-accent', danger: 'text-destructive', info: 'text-info' };

export default function Dashboard() {
  return (
    <Layout>
      <div className="space-y-6 animate-slide-up">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard Executivo</h1>
          <p className="text-muted-foreground text-sm">Safra 2025 — Região do Cerrado Mineiro</p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {kpiCards.map((k) => (
            <Card key={k.label} className="gradient-card p-4 border-border/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">{k.label}</span>
                <k.icon className={`h-4 w-4 ${k.color}`} />
              </div>
              <p className="text-xl font-bold text-foreground">{k.value}</p>
            </Card>
          ))}
        </div>

        {/* Best/Worst + Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="gradient-card p-4 border-success/20 glow-success">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="h-4 w-4 text-success" />
              <span className="text-xs text-success font-semibold uppercase">Melhor Talhão</span>
            </div>
            <p className="font-bold text-foreground">Talhão A3 — 98 sc/ha</p>
            <p className="text-xs text-muted-foreground">Melhor da safra • Fazenda Serra Verde</p>
          </Card>
          <Card className="gradient-card p-4 border-destructive/20">
            <div className="flex items-center gap-2 mb-1">
              <TrendingDown className="h-4 w-4 text-destructive" />
              <span className="text-xs text-destructive font-semibold uppercase">Pior Talhão</span>
            </div>
            <p className="font-bold text-foreground">Talhão B1 — 41 sc/ha</p>
            <p className="text-xs text-muted-foreground">Abaixo da média • Fazenda Boa Vista</p>
          </Card>
          <Card className="gradient-card p-4 border-border/50">
            <span className="text-xs text-muted-foreground uppercase tracking-wider mb-2 block">Ações Rápidas</span>
            <div className="flex flex-wrap gap-2">
              <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 text-xs"><Plus className="h-3 w-3 mr-1" />Lançar Colheita</Button>
              <Button size="sm" variant="outline" className="text-xs border-border text-foreground hover:bg-muted"><DollarSign className="h-3 w-3 mr-1" />Registrar Gasto</Button>
              <Button size="sm" variant="outline" className="text-xs border-border text-foreground hover:bg-muted"><Eye className="h-3 w-3 mr-1" />Ver Mapa</Button>
            </div>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card className="gradient-card p-4 border-border/50">
            <h3 className="text-sm font-semibold text-foreground mb-4">Comparação por Fazenda</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={farmComparison}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(150 15% 20%)" />
                <XAxis dataKey="nome" tick={{ fill: 'hsl(120 5% 55%)', fontSize: 12 }} />
                <YAxis tick={{ fill: 'hsl(120 5% 55%)', fontSize: 11 }} />
                <Tooltip contentStyle={{ background: 'hsl(150 25% 13%)', border: '1px solid hsl(150 15% 20%)', borderRadius: 8, color: '#fff' }} />
                <Bar dataKey="colheita" name="Colheita (sacas)" fill="hsl(142 71% 45%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="receita" name="Receita (R$ mil)" fill="hsl(38 92% 50%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="custo" name="Custo (R$ mil)" fill="hsl(0 72% 51%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="gradient-card p-4 border-border/50">
            <h3 className="text-sm font-semibold text-foreground mb-4">Fluxo de Caixa Mensal</h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={cashFlowData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(150 15% 20%)" />
                <XAxis dataKey="mes" tick={{ fill: 'hsl(120 5% 55%)', fontSize: 12 }} />
                <YAxis tick={{ fill: 'hsl(120 5% 55%)', fontSize: 11 }} tickFormatter={(v) => `${(v/1000)}k`} />
                <Tooltip contentStyle={{ background: 'hsl(150 25% 13%)', border: '1px solid hsl(150 15% 20%)', borderRadius: 8, color: '#fff' }} formatter={(v: number) => fmtR(v)} />
                <Area type="monotone" dataKey="receita" name="Receita" fill="hsl(142 71% 45% / 0.2)" stroke="hsl(142 71% 45%)" />
                <Area type="monotone" dataKey="despesa" name="Despesa" fill="hsl(0 72% 51% / 0.2)" stroke="hsl(0 72% 51%)" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* AI Alerts */}
        <Card className="gradient-card p-4 border-border/50">
          <h3 className="text-sm font-semibold text-foreground mb-3">Alertas da IA Agrônoma</h3>
          <div className="space-y-3">
            {aiAlerts.map((a) => {
              const Icon = alertIcons[a.tipo];
              return (
                <div key={a.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                  <Icon className={`h-4 w-4 mt-0.5 shrink-0 ${alertColors[a.tipo]}`} />
                  <p className="text-sm text-foreground/90">{a.msg}</p>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </Layout>
  );
}
