import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { trabalhadores, ordensServico, estoque, diarioCampo } from "@/data/mockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, BookOpen, Package, Users, ClipboardList, Plus, Phone, Calendar, DollarSign, Search } from "lucide-react";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";

export default function Operacoes() {
  const [searchWorker, setSearchWorker] = useState('');
  const totalCustoMensal = trabalhadores.reduce((s, t) => s + t.custoMes, 0);
  const fixos = trabalhadores.filter(t => t.tipo === 'Fixo');
  const safristas = trabalhadores.filter(t => t.tipo === 'Safrista');

  const filteredWorkers = trabalhadores.filter(t =>
    t.nome.toLowerCase().includes(searchWorker.toLowerCase()) ||
    t.fazenda.toLowerCase().includes(searchWorker.toLowerCase())
  );

  const ordensConc = ordensServico.filter(o => o.status === 'Concluído').length;
  const ordensAndamento = ordensServico.filter(o => o.status === 'Em andamento').length;
  const ordensPend = ordensServico.filter(o => o.status === 'Pendente').length;
  const estoqueAlerta = estoque.filter(e => e.alerta).length;

  return (
    <Layout>
      <div className="space-y-6 animate-slide-up">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Operações</h1>
          <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 text-xs"><Plus className="h-3 w-3 mr-1" />Nova Ordem</Button>
        </div>

        {/* Summary row */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <Card className="gradient-card p-3 border-border/50 text-center">
            <p className="text-[10px] text-muted-foreground uppercase">Equipe Total</p>
            <p className="text-lg font-bold text-foreground">{trabalhadores.length}</p>
            <p className="text-[10px] text-muted-foreground">{fixos.length} fixos, {safristas.length} safristas</p>
          </Card>
          <Card className="gradient-card p-3 border-border/50 text-center">
            <p className="text-[10px] text-muted-foreground uppercase">Custo Mensal</p>
            <p className="text-lg font-bold text-foreground">R$ {(totalCustoMensal / 1000).toFixed(1)}k</p>
          </Card>
          <Card className="gradient-card p-3 border-border/50 text-center">
            <p className="text-[10px] text-muted-foreground uppercase">Ordens Ativas</p>
            <p className="text-lg font-bold text-accent">{ordensAndamento + ordensPend}</p>
            <p className="text-[10px] text-muted-foreground">{ordensAndamento} em andamento</p>
          </Card>
          <Card className="gradient-card p-3 border-border/50 text-center">
            <p className="text-[10px] text-muted-foreground uppercase">Concluídas</p>
            <p className="text-lg font-bold text-success">{ordensConc}</p>
          </Card>
          <Card className={`gradient-card p-3 text-center ${estoqueAlerta > 0 ? 'border-destructive/30' : 'border-border/50'}`}>
            <p className="text-[10px] text-muted-foreground uppercase">Alertas Estoque</p>
            <p className={`text-lg font-bold ${estoqueAlerta > 0 ? 'text-destructive' : 'text-success'}`}>{estoqueAlerta}</p>
            <p className="text-[10px] text-muted-foreground">{estoque.length} itens monitorados</p>
          </Card>
        </div>

        <Tabs defaultValue="equipe">
          <TabsList className="bg-card border border-border/50">
            <TabsTrigger value="equipe"><Users className="h-3.5 w-3.5 mr-1" />Equipe</TabsTrigger>
            <TabsTrigger value="ordens"><ClipboardList className="h-3.5 w-3.5 mr-1" />Ordens</TabsTrigger>
            <TabsTrigger value="estoque"><Package className="h-3.5 w-3.5 mr-1" />Estoque</TabsTrigger>
            <TabsTrigger value="diario"><BookOpen className="h-3.5 w-3.5 mr-1" />Diário de Campo</TabsTrigger>
          </TabsList>

          <TabsContent value="equipe" className="mt-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative flex-1 max-w-xs">
                <Search className="h-3.5 w-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input value={searchWorker} onChange={e => setSearchWorker(e.target.value)} placeholder="Buscar funcionário..."
                  className="w-full pl-9 pr-3 py-1.5 bg-card border border-border/50 rounded-lg text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent" />
              </div>
            </div>
            <Card className="gradient-card border-border/50 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/50">
                      {['Nome', 'Tipo', 'Fazenda', 'Função', 'Telefone', 'Admissão', 'Custo/Mês'].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-xs text-muted-foreground uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredWorkers.map(t => (
                      <tr key={t.id} className="border-b border-border/30 hover:bg-muted/20 transition-colors cursor-pointer">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="h-7 w-7 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold text-primary-foreground">
                              {t.nome.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span className="font-medium text-foreground">{t.nome}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3"><Badge variant="outline" className={`text-xs ${t.tipo === 'Fixo' ? 'border-success/30 text-success' : 'border-accent/30 text-accent'}`}>{t.tipo}</Badge></td>
                        <td className="px-4 py-3 text-foreground">{t.fazenda}</td>
                        <td className="px-4 py-3 text-foreground">{t.funcao}</td>
                        <td className="px-4 py-3 text-muted-foreground text-xs">{t.telefone}</td>
                        <td className="px-4 py-3 text-muted-foreground text-xs">{t.admissao}</td>
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
                      {['Data', 'Talhão', 'Fazenda', 'Serviço', 'Responsável', 'Custo', 'Status'].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-xs text-muted-foreground uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {ordensServico.map(o => (
                      <tr key={o.id} className="border-b border-border/30 hover:bg-muted/20 transition-colors cursor-pointer">
                        <td className="px-4 py-3 text-foreground">{o.data}</td>
                        <td className="px-4 py-3 font-medium text-foreground">{o.talhao}</td>
                        <td className="px-4 py-3 text-muted-foreground text-xs">{o.fazenda}</td>
                        <td className="px-4 py-3 text-foreground">{o.servico}</td>
                        <td className="px-4 py-3 text-foreground">{o.responsavel}</td>
                        <td className="px-4 py-3 text-foreground">R$ {o.custo.toLocaleString('pt-BR')}</td>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {estoque.map((e, i) => (
                <Card key={i} className={`gradient-card p-4 ${e.alerta ? 'border-destructive/30 ring-1 ring-destructive/10' : 'border-border/50'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-foreground text-sm">{e.nome}</h4>
                    {e.alerta && <AlertTriangle className="h-4 w-4 text-destructive animate-pulse" />}
                  </div>
                  <p className="text-2xl font-bold text-foreground">{e.quantidade.toLocaleString('pt-BR')} <span className="text-sm text-muted-foreground font-normal">{e.unidade}</span></p>
                  <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all ${e.alerta ? 'bg-destructive' : 'bg-success'}`} style={{ width: `${Math.min((e.quantidade / (e.minimo * 2)) * 100, 100)}%` }} />
                  </div>
                  <div className="flex justify-between mt-2">
                    <p className="text-xs text-muted-foreground">Mín: {e.minimo.toLocaleString('pt-BR')} {e.unidade}</p>
                    <p className="text-xs text-muted-foreground">R$ {e.precoUnit.toFixed(2)}/{e.unidade}</p>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1">Última compra: {e.ultimaCompra}</p>
                  {e.alerta && <Badge className="bg-destructive/20 text-destructive border-destructive/30 text-xs mt-2">Estoque Baixo — Reabastecer</Badge>}
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="diario" className="mt-4">
            <div className="space-y-3">
              {diarioCampo.map((d, i) => (
                <Card key={i} className="gradient-card p-4 border-border/50 hover:border-accent/20 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <div className="h-8 w-8 rounded-full bg-primary/50 flex items-center justify-center text-[10px] font-bold text-primary-foreground">
                        {d.autor.split(' ').map(n => n[0]).join('')}
                      </div>
                      {i < diarioCampo.length - 1 && <div className="w-px h-8 bg-border/30 mt-2" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-xs border-border text-foreground">{d.talhao}</Badge>
                        <span className="text-xs text-muted-foreground">{d.data}</span>
                        <span className="text-[10px] text-muted-foreground/60">• {d.autor}</span>
                      </div>
                      <p className="text-sm text-foreground/90">{d.nota}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
