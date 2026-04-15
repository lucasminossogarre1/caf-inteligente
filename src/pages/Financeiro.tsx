import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cashFlowData, despesasBreakdown, transacoes, fazendas } from "@/data/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from "recharts";
import { AlertTriangle } from "lucide-react";

const allTalhoes = fazendas.flatMap(f => f.talhoes).filter(t => t.custoSaca > 0);
const fmt = (v: number) => v.toLocaleString('pt-BR');

export default function Financeiro() {
  return (
    <Layout>
      <div className="space-y-6 animate-slide-up">
        <h1 className="text-2xl font-bold text-foreground">Financeiro</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Cash flow chart */}
          <Card className="gradient-card p-4 border-border/50">
            <h3 className="text-sm font-semibold text-foreground mb-4">Fluxo de Caixa Mensal</h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={cashFlowData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(150 15% 20%)" />
                <XAxis dataKey="mes" tick={{ fill: 'hsl(120 5% 55%)', fontSize: 12 }} />
                <YAxis tick={{ fill: 'hsl(120 5% 55%)', fontSize: 11 }} tickFormatter={(v) => `${(v / 1000)}k`} />
                <Tooltip contentStyle={{ background: 'hsl(150 25% 13%)', border: '1px solid hsl(150 15% 20%)', borderRadius: 8, color: '#fff' }} formatter={(v: number) => `R$ ${fmt(v)}`} />
                <Area type="monotone" dataKey="receita" name="Receita" fill="hsl(142 71% 45% / 0.2)" stroke="hsl(142 71% 45%)" />
                <Area type="monotone" dataKey="despesa" name="Despesa" fill="hsl(0 72% 51% / 0.2)" stroke="hsl(0 72% 51%)" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          {/* Expense breakdown */}
          <Card className="gradient-card p-4 border-border/50">
            <h3 className="text-sm font-semibold text-foreground mb-4">Composição de Despesas</h3>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={despesasBreakdown} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="valor" nameKey="nome" label={({ name, value }: { name: string; value: number }) => `${name}: ${value}%`}>
                    {despesasBreakdown.map((entry, i) => <Cell key={i} fill={entry.cor} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: 'hsl(150 25% 13%)', border: '1px solid hsl(150 15% 20%)', borderRadius: 8, color: '#fff' }} formatter={(v: number) => `${v}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Cost per saca table */}
        <Card className="gradient-card border-border/50 overflow-hidden">
          <div className="p-4 border-b border-border/30">
            <h3 className="text-sm font-semibold text-foreground">Custo por Saca — por Talhão</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50">
                  {['Talhão', 'Fazenda', 'Custo/Saca', 'Produtividade', 'Status'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs text-muted-foreground uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {allTalhoes.sort((a, b) => a.custoSaca - b.custoSaca).map(t => {
                  const isMin = t.custoSaca <= 300;
                  const isMax = t.custoSaca >= 600;
                  const faz = fazendas.find(f => f.talhoes.some(tt => tt.id === t.id));
                  return (
                    <tr key={t.id} className="border-b border-border/30 hover:bg-muted/20">
                      <td className="px-4 py-3 font-medium text-foreground">{t.nome}</td>
                      <td className="px-4 py-3 text-foreground">{faz?.nome.replace('Fazenda ', '')}</td>
                      <td className={`px-4 py-3 font-bold ${isMin ? 'text-success' : isMax ? 'text-destructive' : 'text-foreground'}`}>R$ {t.custoSaca}</td>
                      <td className="px-4 py-3 text-foreground">{t.produtividadeScHa} sc/ha</td>
                      <td className="px-4 py-3">
                        {isMin && <Badge className="bg-success/20 text-success border-success/30 text-xs">Menor custo</Badge>}
                        {isMax && <Badge className="bg-destructive/20 text-destructive border-destructive/30 text-xs">Maior custo</Badge>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Transactions */}
        <Card className="gradient-card border-border/50 overflow-hidden">
          <div className="p-4 border-b border-border/30">
            <h3 className="text-sm font-semibold text-foreground">Últimas Transações</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50">
                  {['Data', 'Descrição', 'Categoria', 'Fazenda', 'Valor'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs text-muted-foreground uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {transacoes.map(t => (
                  <tr key={t.id} className="border-b border-border/30 hover:bg-muted/20">
                    <td className="px-4 py-3 text-foreground">{t.data}</td>
                    <td className="px-4 py-3 text-foreground">{t.descricao}</td>
                    <td className="px-4 py-3"><Badge variant="outline" className="text-xs border-border text-foreground">{t.categoria}</Badge></td>
                    <td className="px-4 py-3 text-foreground">{t.fazenda}</td>
                    <td className={`px-4 py-3 font-bold ${t.valor > 0 ? 'text-success' : 'text-destructive'}`}>
                      {t.valor > 0 ? '+' : ''} R$ {Math.abs(t.valor).toLocaleString('pt-BR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Projection alert */}
        <Card className="p-4 border-accent/30 bg-accent/5">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-accent mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-accent">Projeção de Caixa</p>
              <p className="text-sm text-foreground/80 mt-1">Faltam 3 meses para a colheita. Caixa atual: R$ 84.000. Gasto previsto até colheita: R$ 210.000. <strong className="text-destructive">Déficit projetado: R$ 126.000.</strong></p>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
