import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { colheitas, fazendas, historicoColheita } from "@/data/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, Plus, Filter, Download, Search } from "lucide-react";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";

const allTalhoes = fazendas.flatMap(f => f.talhoes);

const qualityRadarData = allTalhoes.filter(t => t.pontuacaoSCA > 0).map(t => ({
  talhao: t.nome.replace('Talhão ', ''),
  sca: t.pontuacaoSCA,
  produtividade: Math.round(t.produtividadeScHa / 98 * 100),
  qualidade: Math.round((100 - t.defeitos * 10)),
  eficiencia: Math.round((1 - t.custoSaca / 700) * 100),
}));

export default function ColheitaQualidade() {
  const [safra, setSafra] = useState('2025');
  const [filterFazenda, setFilterFazenda] = useState('todas');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredColheitas = colheitas.filter(c => {
    if (filterFazenda !== 'todas' && c.fazenda !== filterFazenda) return false;
    if (searchTerm && !c.talhao.toLowerCase().includes(searchTerm.toLowerCase()) && !c.fazenda.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <Layout>
      <div className="space-y-6 animate-slide-up">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Colheita & Qualidade</h1>
          <div className="flex items-center gap-2">
            <Select value={safra} onValueChange={setSafra}>
              <SelectTrigger className="w-32 h-8 text-xs bg-card border-border/50"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="2023">Safra 2023</SelectItem>
                <SelectItem value="2024">Safra 2024</SelectItem>
                <SelectItem value="2025">Safra 2025</SelectItem>
              </SelectContent>
            </Select>
            <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 text-xs"><Plus className="h-3 w-3 mr-1" />Lançar Colheita</Button>
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card className="gradient-card p-3 border-border/50 text-center">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Total Sacas</p>
            <p className="text-lg font-bold text-foreground">4.820</p>
          </Card>
          <Card className="gradient-card p-3 border-border/50 text-center">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Média sc/ha</p>
            <p className="text-lg font-bold text-foreground">58</p>
          </Card>
          <Card className="gradient-card p-3 border-border/50 text-center">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">% Cereja Média</p>
            <p className="text-lg font-bold text-success">55%</p>
          </Card>
          <Card className="gradient-card p-3 border-border/50 text-center">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Lotes Specialty</p>
            <p className="text-lg font-bold text-accent">2</p>
          </Card>
          <Card className="gradient-card p-3 border-border/50 text-center">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Beneficiamento</p>
            <p className="text-lg font-bold text-foreground">62%</p>
            <Progress value={62} className="h-1 mt-1" />
          </Card>
        </div>

        <Tabs defaultValue="colheita">
          <TabsList className="bg-card border border-border/50">
            <TabsTrigger value="colheita">Colheitas</TabsTrigger>
            <TabsTrigger value="qualidade">Qualidade</TabsTrigger>
            <TabsTrigger value="radar">Análise Radar</TabsTrigger>
            <TabsTrigger value="historico">Histórico</TabsTrigger>
          </TabsList>

          <TabsContent value="colheita" className="space-y-4 mt-4">
            {/* AI Alert */}
            <Card className="p-4 border-accent/30 bg-accent/5">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-accent">Alerta da IA Agrônoma</p>
                  <p className="text-sm text-foreground/80 mt-1">Talhão A3 tem pontuação 84 SCA — separe este lote <strong>agora</strong> antes de misturar com commodity. Vender como Specialty (R$ 2.340/sc) em vez de commodity (R$ 1.076/sc) representa <strong className="text-accent">R$ 1.486.464</strong> em receita adicional nesta safra.</p>
                </div>
                <Button size="sm" variant="outline" className="text-xs border-accent/30 text-accent shrink-0">Separar Lote</Button>
              </div>
            </Card>

            {/* Filters */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1 max-w-xs">
                <Search className="h-3.5 w-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  placeholder="Buscar por talhão ou fazenda..."
                  className="w-full pl-9 pr-3 py-1.5 bg-card border border-border/50 rounded-lg text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>
              <Select value={filterFazenda} onValueChange={setFilterFazenda}>
                <SelectTrigger className="w-44 h-8 text-xs bg-card border-border/50"><SelectValue placeholder="Fazenda" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas</SelectItem>
                  <SelectItem value="Serra Verde">Serra Verde</SelectItem>
                  <SelectItem value="Boa Vista">Boa Vista</SelectItem>
                  <SelectItem value="Recanto Alto">Recanto Alto</SelectItem>
                </SelectContent>
              </Select>
              <Button size="sm" variant="outline" className="text-xs border-border text-foreground h-8"><Download className="h-3 w-3 mr-1" />Exportar</Button>
              <Badge variant="outline" className="text-xs border-border text-muted-foreground">{filteredColheitas.length} registros</Badge>
            </div>

            {/* Harvest table */}
            <Card className="gradient-card border-border/50 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/50">
                      {['Data', 'Fazenda', 'Talhão', 'Lote', 'Sacas', 'Método', 'Cereja', 'Bóia', 'Verde', 'Beneficiamento'].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-xs text-muted-foreground uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredColheitas.map(c => (
                      <tr key={c.id} className="border-b border-border/30 hover:bg-muted/20 transition-colors cursor-pointer">
                        <td className="px-4 py-3 text-foreground">{c.data}</td>
                        <td className="px-4 py-3 text-foreground">{c.fazenda}</td>
                        <td className="px-4 py-3 font-medium text-foreground">{c.talhao}</td>
                        <td className="px-4 py-3"><Badge variant="outline" className="text-[10px] border-border text-muted-foreground font-mono">{c.lote}</Badge></td>
                        <td className="px-4 py-3 font-semibold text-foreground">{c.sacas.toLocaleString('pt-BR')}</td>
                        <td className="px-4 py-3"><Badge variant="outline" className="text-xs border-border text-foreground">{c.metodo}</Badge></td>
                        <td className="px-4 py-3">
                          <span className="text-success font-medium">{c.cereja}%</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-accent">{c.boia}%</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-destructive">{c.verde}%</span>
                        </td>
                        <td className="px-4 py-3">
                          <Badge className={c.statusBeneficiamento === 'Concluído' ? 'bg-success/20 text-success border-success/30' : c.statusBeneficiamento === 'Em andamento' ? 'bg-accent/20 text-accent border-accent/30' : 'bg-muted text-muted-foreground border-border'}>
                            {c.statusBeneficiamento}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="qualidade" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {allTalhoes.filter(t => t.pontuacaoSCA > 0).map(t => {
                const faz = fazendas.find(f => f.talhoes.some(tt => tt.id === t.id));
                return (
                  <Card key={t.id} className={`gradient-card p-4 border-border/50 hover:border-accent/20 transition-colors ${t.pontuacaoSCA >= 80 ? 'ring-1 ring-accent/20' : ''}`}>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-foreground">{t.nome}</h3>
                        <p className="text-[10px] text-muted-foreground">{faz?.nome}</p>
                      </div>
                      {t.pontuacaoSCA >= 80 && <Badge className="bg-accent/20 text-accent border-accent/30 text-xs">SPECIALTY</Badge>}
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between"><span className="text-muted-foreground">Variedade</span><span className="text-foreground font-medium">{t.variedade}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Peneira</span><span className="text-foreground">{t.peneira}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Defeitos</span><span className={`font-medium ${t.defeitos <= 4 ? 'text-success' : t.defeitos <= 6 ? 'text-accent' : 'text-destructive'}`}>{t.defeitos}%</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Bebida</span><span className="text-foreground">{t.tipoBebida}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Umidade</span><span className="text-foreground">{t.umidade}%</span></div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">SCA</span>
                        <div className="flex items-center gap-2">
                          <Progress value={t.pontuacaoSCA} className="h-1.5 w-16" />
                          <span className={`font-bold ${t.pontuacaoSCA >= 80 ? 'text-accent' : 'text-foreground'}`}>{t.pontuacaoSCA}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="radar" className="mt-4">
            <Card className="gradient-card p-4 border-border/50">
              <h3 className="text-sm font-semibold text-foreground mb-4">Análise Comparativa — Radar por Talhão</h3>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={[
                  { metric: 'SCA', ...Object.fromEntries(qualityRadarData.map(d => [d.talhao, d.sca])) },
                  { metric: 'Produtiv.', ...Object.fromEntries(qualityRadarData.map(d => [d.talhao, d.produtividade])) },
                  { metric: 'Qualidade', ...Object.fromEntries(qualityRadarData.map(d => [d.talhao, d.qualidade])) },
                  { metric: 'Eficiência', ...Object.fromEntries(qualityRadarData.map(d => [d.talhao, d.eficiencia])) },
                ]}>
                  <PolarGrid stroke="hsl(20 12% 20%)" />
                  <PolarAngleAxis dataKey="metric" tick={{ fill: 'hsl(25 8% 52%)', fontSize: 11 }} />
                  <PolarRadiusAxis tick={{ fill: 'hsl(25 8% 52%)', fontSize: 10 }} />
                  <Radar name="A3" dataKey="A3" stroke="hsl(142 71% 45%)" fill="hsl(142 71% 45% / 0.2)" />
                  <Radar name="A1" dataKey="A1" stroke="hsl(38 92% 50%)" fill="hsl(38 92% 50% / 0.1)" />
                  <Radar name="B1" dataKey="B1" stroke="hsl(0 72% 51%)" fill="hsl(0 72% 51% / 0.1)" />
                  <Legend />
                  <Tooltip contentStyle={{ background: 'hsl(20 16% 13%)', border: '1px solid hsl(20 12% 20%)', borderRadius: 8, color: '#fff' }} />
                </RadarChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>

          <TabsContent value="historico" className="mt-4">
            <Card className="gradient-card p-4 border-border/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-foreground">Sacas por Talhão — 3 Safras</h3>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1"><div className="h-2.5 w-2.5 rounded-sm bg-info" /><span className="text-[10px] text-muted-foreground">2023</span></div>
                  <div className="flex items-center gap-1"><div className="h-2.5 w-2.5 rounded-sm bg-accent" /><span className="text-[10px] text-muted-foreground">2024</span></div>
                  <div className="flex items-center gap-1"><div className="h-2.5 w-2.5 rounded-sm bg-success" /><span className="text-[10px] text-muted-foreground">2025</span></div>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={historicoColheita}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(20 12% 20%)" />
                  <XAxis dataKey="talhao" tick={{ fill: 'hsl(25 8% 52%)', fontSize: 12 }} />
                  <YAxis tick={{ fill: 'hsl(25 8% 52%)', fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: 'hsl(20 16% 13%)', border: '1px solid hsl(20 12% 20%)', borderRadius: 8, color: '#fff' }} />
                  <Bar dataKey="s2023" name="Safra 2023" fill="hsl(199 89% 48%)" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="s2024" name="Safra 2024" fill="hsl(38 92% 50%)" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="s2025" name="Safra 2025" fill="hsl(142 71% 45%)" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
