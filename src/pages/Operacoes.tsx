import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { trabalhadores, ordensServico, estoque, diarioCampo } from "@/data/mockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, BookOpen, Package, Users, ClipboardList } from "lucide-react";

export default function Operacoes() {
  return (
    <Layout>
      <div className="space-y-6 animate-slide-up">
        <h1 className="text-2xl font-bold text-foreground">Operações</h1>

        <Tabs defaultValue="equipe">
          <TabsList className="bg-card border border-border/50">
            <TabsTrigger value="equipe"><Users className="h-3.5 w-3.5 mr-1" />Equipe</TabsTrigger>
            <TabsTrigger value="ordens"><ClipboardList className="h-3.5 w-3.5 mr-1" />Ordens de Serviço</TabsTrigger>
            <TabsTrigger value="estoque"><Package className="h-3.5 w-3.5 mr-1" />Estoque</TabsTrigger>
            <TabsTrigger value="diario"><BookOpen className="h-3.5 w-3.5 mr-1" />Diário de Campo</TabsTrigger>
          </TabsList>

          <TabsContent value="equipe" className="mt-4">
            <Card className="gradient-card border-border/50 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/50">
                      {['Nome', 'Tipo', 'Fazenda', 'Função', 'Custo/Mês'].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-xs text-muted-foreground uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {trabalhadores.map(t => (
                      <tr key={t.id} className="border-b border-border/30 hover:bg-muted/20">
                        <td className="px-4 py-3 font-medium text-foreground">{t.nome}</td>
                        <td className="px-4 py-3"><Badge variant="outline" className={`text-xs ${t.tipo === 'Fixo' ? 'border-success/30 text-success' : 'border-accent/30 text-accent'}`}>{t.tipo}</Badge></td>
                        <td className="px-4 py-3 text-foreground">{t.fazenda}</td>
                        <td className="px-4 py-3 text-foreground">{t.funcao}</td>
                        <td className="px-4 py-3 font-medium text-foreground">R$ {t.custoMes.toLocaleString('pt-BR')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="ordens" className="mt-4">
            <Card className="gradient-card border-border/50 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/50">
                      {['Data', 'Talhão', 'Serviço', 'Responsável', 'Status'].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-xs text-muted-foreground uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {ordensServico.map(o => (
                      <tr key={o.id} className="border-b border-border/30 hover:bg-muted/20">
                        <td className="px-4 py-3 text-foreground">{o.data}</td>
                        <td className="px-4 py-3 font-medium text-foreground">{o.talhao}</td>
                        <td className="px-4 py-3 text-foreground">{o.servico}</td>
                        <td className="px-4 py-3 text-foreground">{o.responsavel}</td>
                        <td className="px-4 py-3">
                          <Badge className={o.status === 'Concluído' ? 'bg-success/20 text-success border-success/30' : o.status === 'Em andamento' ? 'bg-accent/20 text-accent border-accent/30' : 'bg-muted text-muted-foreground border-border'}>
                            {o.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="estoque" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {estoque.map((e, i) => (
                <Card key={i} className={`gradient-card p-4 ${e.alerta ? 'border-destructive/30' : 'border-border/50'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-foreground text-sm">{e.nome}</h4>
                    {e.alerta && <AlertTriangle className="h-4 w-4 text-destructive" />}
                  </div>
                  <p className="text-2xl font-bold text-foreground">{e.quantidade.toLocaleString('pt-BR')} <span className="text-sm text-muted-foreground font-normal">{e.unidade}</span></p>
                  <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${e.alerta ? 'bg-destructive' : 'bg-success'}`} style={{ width: `${Math.min((e.quantidade / (e.minimo * 2)) * 100, 100)}%` }} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Mínimo: {e.minimo.toLocaleString('pt-BR')} {e.unidade}</p>
                  {e.alerta && <Badge className="bg-destructive/20 text-destructive border-destructive/30 text-xs mt-2">Estoque Baixo</Badge>}
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="diario" className="mt-4">
            <div className="space-y-3">
              {diarioCampo.map((d, i) => (
                <Card key={i} className="gradient-card p-4 border-border/50">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-xs border-border text-foreground">{d.talhao}</Badge>
                    <span className="text-xs text-muted-foreground">{d.data}</span>
                  </div>
                  <p className="text-sm text-foreground/90">{d.nota}</p>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
