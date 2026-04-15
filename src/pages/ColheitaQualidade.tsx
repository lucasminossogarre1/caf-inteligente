import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { colheitas, fazendas, historicoColheita } from "@/data/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle } from "lucide-react";

const allTalhoes = fazendas.flatMap(f => f.talhoes);

export default function ColheitaQualidade() {
  return (
    <Layout>
      <div className="space-y-6 animate-slide-up">
        <h1 className="text-2xl font-bold text-foreground">Colheita & Qualidade</h1>

        <Tabs defaultValue="colheita">
          <TabsList className="bg-card border border-border/50">
            <TabsTrigger value="colheita">Colheitas</TabsTrigger>
            <TabsTrigger value="qualidade">Qualidade</TabsTrigger>
            <TabsTrigger value="historico">Histórico</TabsTrigger>
          </TabsList>

          <TabsContent value="colheita" className="space-y-4 mt-4">
            {/* AI Alert */}
            <Card className="p-4 border-accent/30 bg-accent/5">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-accent mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-accent">Alerta da IA Agrônoma</p>
                  <p className="text-sm text-foreground/80 mt-1">Talhão A3 tem pontuação 84 SCA — separe este lote antes de misturar. Estimativa de ganho adicional: R$ 128.000</p>
                </div>
              </div>
            </Card>

            {/* Harvest table */}
            <Card className="gradient-card border-border/50 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/50">
                      {['Data', 'Fazenda', 'Talhão', 'Sacas', 'Método', 'Cereja %', 'Bóia %', 'Verde %', 'Beneficiamento'].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-xs text-muted-foreground uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {colheitas.map(c => (
                      <tr key={c.id} className="border-b border-border/30 hover:bg-muted/20 transition-colors">
                        <td className="px-4 py-3 text-foreground">{c.data}</td>
                        <td className="px-4 py-3 text-foreground">{c.fazenda}</td>
                        <td className="px-4 py-3 font-medium text-foreground">{c.talhao}</td>
                        <td className="px-4 py-3 font-semibold text-foreground">{c.sacas.toLocaleString('pt-BR')}</td>
                        <td className="px-4 py-3"><Badge variant="outline" className="text-xs border-border text-foreground">{c.metodo}</Badge></td>
                        <td className="px-4 py-3 text-success">{c.cereja}%</td>
                        <td className="px-4 py-3 text-accent">{c.boia}%</td>
                        <td className="px-4 py-3 text-destructive">{c.verde}%</td>
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
              {allTalhoes.filter(t => t.pontuacaoSCA > 0).map(t => (
                <Card key={t.id} className="gradient-card p-4 border-border/50">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-foreground">{t.nome}</h3>
                    {t.pontuacaoSCA >= 80 && <Badge className="bg-accent/20 text-accent border-accent/30 text-xs">SPECIALTY</Badge>}
                  </div>
                  <div className="space-y-1.5 text-sm">
                    <div className="flex justify-between"><span className="text-muted-foreground">Peneira</span><span className="text-foreground">{t.peneira}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Defeitos</span><span className="text-foreground">{t.defeitos}%</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Bebida</span><span className="text-foreground">{t.tipoBebida}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">SCA</span><span className={`font-bold ${t.pontuacaoSCA >= 80 ? 'text-accent' : 'text-foreground'}`}>{t.pontuacaoSCA} pts</span></div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="historico" className="mt-4">
            <Card className="gradient-card p-4 border-border/50">
              <h3 className="text-sm font-semibold text-foreground mb-4">Sacas por Talhão — 3 Safras</h3>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={historicoColheita}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(150 15% 20%)" />
                  <XAxis dataKey="talhao" tick={{ fill: 'hsl(120 5% 55%)', fontSize: 12 }} />
                  <YAxis tick={{ fill: 'hsl(120 5% 55%)', fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: 'hsl(150 25% 13%)', border: '1px solid hsl(150 15% 20%)', borderRadius: 8, color: '#fff' }} />
                  <Legend />
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
