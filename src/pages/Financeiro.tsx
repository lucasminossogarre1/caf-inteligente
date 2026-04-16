import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cashFlowData, despesasBreakdown, transacoes, fazendas } from "@/data/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell, LineChart, Line, Legend } from "recharts";
import { AlertTriangle, Plus, Download, Sparkles, ArrowDownRight, DollarSign, TrendingUp, Wallet } from "lucide-react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const allTalhoes = fazendas.flatMap(f => f.talhoes).filter(t => t.custoSaca > 0);
const fmt = (v: number) => v.toLocaleString('pt-BR');

const summaryCards = [
  { label: 'Receita Total', value: 'R$ 5,18M', icon: TrendingUp, color: 'text-success', bg: 'bg-success/10' },
  { label: 'Despesas Totais', value: 'R$ 1,94M', icon: ArrowDownRight, color: 'text-destructive', bg: 'bg-destructive/10' },
  { label: 'Lucro Líquido', value: 'R$ 3,24M', icon: DollarSign, color: 'text-accent', bg: 'bg-accent/10' },
  { label: 'Caixa Atual', value: 'R$ 84.000', icon: Wallet, color: 'text-info', bg: 'bg-info/10' },
];

export default function Financeiro() {
  const [filterFazenda, setFilterFazenda] = useState('todas');
  const [filterCategoria, setFilterCategoria] = useState('todas');

  const filteredTransacoes = transacoes.filter(t => {
    if (filterFazenda !== 'todas' && t.fazenda !== filterFazenda) return false;
    if (filterCategoria !== 'todas' && t.categoria !== filterCategoria) return false;
    return true;
  });

  const categorias = [...new Set(transacoes.map(t => t.categoria))];

  return (
    <Layout>
      <div className="space-y-6 animate-slide-up">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Financeiro</h1>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" className="text-xs border-border text-foreground"><Download className="h-3 w-3 mr-1" />Exportar</Button>
            <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 text-xs"><Plus className="h-3 w-3 mr-1" />Nova Transação</Button>
          </div>
        </div>

        {/* ROI Card */}
        <Card className="p-5 border-success/30 bg-success/5">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-4 w-4 text-success" />
            <h3 className="text-sm font-semibold text-success uppercase tracking-wider">Retorno sobre Investimento — CaféMap</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Ganhos identificados pela IA</p>
              <p className="text-3xl font-bold text-success">R$ 1.581.944</p>
              <p className="text-xs text-muted-foreground mt-1">Receita specialty + timing de venda otimizado</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Custo anual do sistema</p>
              <p className="text-3xl font-bold text-foreground">R$ 40.000</p>
              <p className="text-xs text-muted-foreground mt-1">Licença anual — 3 fazendas ilimitadas</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">ROI calculado</p>
              <p className="text-3xl font-bold text-accent">39,5x</p>
              <p className="text-xs text-muted-foreground mt-1">Para cada R$1 investido, R$39,50 de retorno</p>
            </div>
          </div>
        </Card>

        {/* Summary cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {summaryCards.map(s => (
            <Card key={s.label} className="gradient-card p-4 border-border/50">
              <div className="flex items-center gap-2 mb-2">
                <div className={`p-1.5 rounded-lg ${s.bg}`}>
                  <s.icon className={`h-4 w-4 ${s.color}`} />
                </div>
                <span className="text-xs text-muted-foreground uppercase tracking-wider">{s.label}</span>
              </div>
              <p className="text-xl font-bold text-foreground">{s.value}</p>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="visao-geral">
          <TabsList className="bg-card border border-border/50">
            <TabsTrigger value="visao-geral">Visão Geral</TabsTrigger>
            <TabsTrigger value="despesas">Despesas Detalhadas</TabsTrigger>
            <TabsTrigger value="custo-saca">Custo por Saca</TabsTrigger>
            <TabsTrigger value="transacoes">Transações</TabsTrigger>
          </TabsList>

          <TabsContent value="visao-geral" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card className="gradient-card p-4 border-border/50">
                <h3 className="text-sm font-semibold text-foreground mb-4">Fluxo de Caixa Mensal</h3>
                <ResponsiveContainer width="100%" height={280}>
                  <AreaChart data={cashFlowData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(20 12% 20%)" />
                    <XAxis dataKey="mes" tick={{ fill: 'hsl(25 8% 52%)', fontSize: 12 }} />
                    <YAxis tick={{ fill: 'hsl(25 8% 52%)', fontSize: 11 }} tickFormatter={(v) => `${(v / 1000)}k`} />
                    <Tooltip contentStyle={{ background: 'hsl(20 16% 13%)', border: '1px solid hsl(20 12% 20%)', borderRadius: 8, color: '#fff' }} formatter={(v: number) => `R$ ${fmt(v)}`} />
                    <Area type="monotone" dataKey="receita" name="Receita" fill="hsl(142 71% 45% / 0.2)" stroke="hsl(142 71% 45%)" strokeWidth={2} />
                    <Area type="monotone" dataKey="despesa" name="Despesa" fill="hsl(0 72% 51% / 0.2)" stroke="hsl(0 72% 51%)" strokeWidth={2} />
                    <Line type="monotone" dataKey="saldo" name="Saldo Acumulado" stroke="hsl(38 92% 50%)" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>

              <Card className="gradient-card p-4 border-border/50">
                <h3 className="text-sm font-semibold text-foreground mb-4">Composição de Despesas</h3>
                <div className="flex items-center gap-4">
                  <ResponsiveContainer width="50%" height={250}>
                    <PieChart>
                      <Pie data={despesasBreakdown} cx="50%" cy="50%" innerRadius={55} outerRadius={90} dataKey="valor" nameKey="nome">
                        {despesasBreakdown.map((entry, i) => <Cell key={i} fill={entry.cor} />)}
                      </Pie>
                      <Tooltip contentStyle={{ background: 'hsl(20 16% 13%)', border: '1px solid hsl(20 12% 20%)', borderRadius: 8, color: '#fff' }} formatter={(v: number) => `${v}%`} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-2 flex-1">
                    {despesasBreakdown.map(d => (
                      <div key={d.nome} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: d.cor }} />
                          <span className="text-xs text-foreground">{d.nome}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-bold text-foreground">{d.valor}%</span>
                          <span className="text-[10px] text-muted-foreground ml-1">R$ {fmt(Math.round(1940000 * d.valor / 100))}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>

            {/* Projection alert */}
            <Card className="p-4 border-accent/30 bg-accent/5">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-accent">Projeção de Caixa</p>
                  <p className="text-sm text-foreground/80 mt-1">Faltam 3 meses para a colheita. Caixa atual: R$ 84.000. Gasto previsto até colheita: R$ 210.000. <strong className="text-destructive">Déficit projetado: R$ 126.000.</strong></p>
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" variant="outline" className="text-xs border-accent/30 text-accent hover:bg-accent/10">Ver Projeção Detalhada</Button>
                    <Button size="sm" variant="outline" className="text-xs border-border text-foreground">Simular Cenários</Button>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="despesas" className="mt-4">
            <Card className="gradient-card p-4 border-border/50">
              <h3 className="text-sm font-semibold text-foreground mb-4">Despesas por Categoria — Mensal</h3>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={despesasMensais}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(20 12% 20%)" />
                  <XAxis dataKey="mes" tick={{ fill: 'hsl(25 8% 52%)', fontSize: 12 }} />
                  <YAxis tick={{ fill: 'hsl(25 8% 52%)', fontSize: 11 }} tickFormatter={(v) => `${(v / 1000)}k`} />
                  <Tooltip contentStyle={{ background: 'hsl(20 16% 13%)', border: '1px solid hsl(20 12% 20%)', borderRadius: 8, color: '#fff' }} formatter={(v: number) => `R$ ${fmt(v)}`} />
                  <Legend />
                  <Bar dataKey="maoObra" name="Mão de Obra" stackId="a" fill="hsl(142 71% 45%)" />
                  <Bar dataKey="insumos" name="Insumos" stackId="a" fill="hsl(38 92% 50%)" />
                  <Bar dataKey="maquinario" name="Maquinário" stackId="a" fill="hsl(199 89% 48%)" />
                  <Bar dataKey="frete" name="Frete" stackId="a" fill="hsl(270 60% 60%)" />
                  <Bar dataKey="outros" name="Outros" stackId="a" fill="hsl(220 10% 50%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>

          <TabsContent value="custo-saca" className="mt-4">
            <Card className="gradient-card border-border/50 overflow-hidden">
              <div className="p-4 border-b border-border/30 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground">Custo por Saca — por Talhão</h3>
                <Badge variant="outline" className="text-xs border-border text-muted-foreground">Média: R$ 402/sc</Badge>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/50">
                      {['#', 'Talhão', 'Fazenda', 'Custo/Saca', 'Produtividade', 'SCA', 'ROI Est.', 'Status'].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-xs text-muted-foreground uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {allTalhoes.sort((a, b) => a.custoSaca - b.custoSaca).map((t, idx) => {
                      const isMin = t.custoSaca <= 300;
                      const isMax = t.custoSaca >= 600;
                      const faz = fazendas.find(f => f.talhoes.some(tt => tt.id === t.id));
                      const roi = Math.round(((1076 - t.custoSaca) / t.custoSaca) * 100);
                      return (
                        <tr key={t.id} className="border-b border-border/30 hover:bg-muted/20 transition-colors">
                          <td className="px-4 py-3 text-muted-foreground">{idx + 1}</td>
                          <td className="px-4 py-3 font-medium text-foreground">{t.nome}</td>
                          <td className="px-4 py-3 text-foreground">{faz?.nome.replace('Fazenda ', '')}</td>
                          <td className={`px-4 py-3 font-bold ${isMin ? 'text-success' : isMax ? 'text-destructive' : 'text-foreground'}`}>R$ {t.custoSaca}</td>
                          <td className="px-4 py-3 text-foreground">{t.produtividadeScHa} sc/ha</td>
                          <td className="px-4 py-3">{t.pontuacaoSCA > 0 ? <span className={t.pontuacaoSCA >= 80 ? 'text-accent font-medium' : 'text-foreground'}>{t.pontuacaoSCA}</span> : '-'}</td>
                          <td className={`px-4 py-3 font-medium ${roi >= 150 ? 'text-success' : roi >= 100 ? 'text-accent' : 'text-destructive'}`}>{roi}%</td>
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
          </TabsContent>

          <TabsContent value="transacoes" className="mt-4 space-y-4">
            {/* Filters */}
            <div className="flex items-center gap-3">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={filterFazenda} onValueChange={setFilterFazenda}>
                <SelectTrigger className="w-44 h-8 text-xs bg-card border-border/50"><SelectValue placeholder="Fazenda" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas as Fazendas</SelectItem>
                  {fazendas.map(f => <SelectItem key={f.id} value={f.nome.replace('Fazenda ', '')}>{f.nome}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={filterCategoria} onValueChange={setFilterCategoria}>
                <SelectTrigger className="w-40 h-8 text-xs bg-card border-border/50"><SelectValue placeholder="Categoria" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas</SelectItem>
                  {categorias.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
              <Badge variant="outline" className="text-xs border-border text-muted-foreground">{filteredTransacoes.length} transações</Badge>
            </div>

            <Card className="gradient-card border-border/50 overflow-hidden">
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
                    {filteredTransacoes.map(t => (
                      <tr key={t.id} className="border-b border-border/30 hover:bg-muted/20 transition-colors cursor-pointer">
                        <td className="px-4 py-3 text-foreground">{t.data}</td>
                        <td className="px-4 py-3 text-foreground">{t.descricao}</td>
                        <td className="px-4 py-3"><Badge variant="outline" className="text-xs border-border text-foreground">{t.categoria}</Badge></td>
                        <td className="px-4 py-3 text-foreground">{t.fazenda}</td>
                        <td className={`px-4 py-3 font-bold ${t.valor > 0 ? 'text-success' : 'text-destructive'}`}>
                          <span className="flex items-center gap-1">
                            {t.valor > 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                            R$ {Math.abs(t.valor).toLocaleString('pt-BR')}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
