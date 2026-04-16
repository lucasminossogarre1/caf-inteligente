import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { fazendas } from "@/data/mockData";
import { User, MapPin, CreditCard, Link2, Bell, Shield, Download, Trash2, Edit, ChevronRight, Smartphone, Mail, Key } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

export default function SettingsPage() {
  return (
    <Layout>
      <div className="space-y-6 animate-slide-up">
        <h1 className="text-2xl font-bold text-foreground">Configurações</h1>

        <Tabs defaultValue="perfil">
          <TabsList className="bg-card border border-border/50">
            <TabsTrigger value="perfil">Perfil</TabsTrigger>
            <TabsTrigger value="fazendas">Fazendas</TabsTrigger>
            <TabsTrigger value="notificacoes">Notificações</TabsTrigger>
            <TabsTrigger value="integracoes">Integrações</TabsTrigger>
            <TabsTrigger value="plano">Plano</TabsTrigger>
          </TabsList>

          <TabsContent value="perfil" className="mt-4 space-y-4 max-w-3xl">
            <Card className="gradient-card p-6 border-border/50">
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 rounded-full bg-primary flex items-center justify-center ring-4 ring-accent/20">
                  <User className="h-10 w-10 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-foreground">João Meireles</h2>
                  <p className="text-sm text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" /> Região do Cerrado Mineiro</p>
                  <p className="text-sm text-muted-foreground">Cafeicultor • desde 2018</p>
                </div>
                <Button size="sm" variant="outline" className="text-xs border-border text-foreground"><Edit className="h-3 w-3 mr-1" />Editar</Button>
              </div>
            </Card>

            <Card className="gradient-card p-4 border-border/50">
              <h3 className="text-sm font-semibold text-foreground mb-3">Informações de Contato</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/20">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm text-foreground">joao.meireles@email.com</p>
                    <p className="text-xs text-muted-foreground">Email principal</p>
                  </div>
                  <Badge className="bg-success/20 text-success border-success/30 text-xs">Verificado</Badge>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/20">
                  <Smartphone className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm text-foreground">+55 34 99876-5432</p>
                    <p className="text-xs text-muted-foreground">WhatsApp conectado</p>
                  </div>
                  <Badge className="bg-success/20 text-success border-success/30 text-xs">Ativo</Badge>
                </div>
              </div>
            </Card>

            <Card className="gradient-card p-4 border-border/50">
              <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2"><Shield className="h-4 w-4" />Segurança</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 rounded-lg bg-muted/20">
                  <div className="flex items-center gap-2">
                    <Key className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">Autenticação 2FA</span>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Button size="sm" variant="outline" className="text-xs border-border text-foreground">Alterar Senha</Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="fazendas" className="mt-4 space-y-4 max-w-3xl">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{fazendas.length} fazendas cadastradas • {fazendas.reduce((s, f) => s + f.talhoes.length, 0)} talhões</p>
              <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 text-xs"><Edit className="h-3 w-3 mr-1" />Adicionar Fazenda</Button>
            </div>
            {fazendas.map(f => (
              <Card key={f.id} className="gradient-card p-4 border-border/50 hover:border-accent/20 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-semibold text-foreground">{f.nome}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="h-2.5 w-2.5" />{f.cidade}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs border-border text-foreground">{f.hectares}ha</Badge>
                    <Button size="sm" variant="ghost" className="h-7 w-7 p-0"><Edit className="h-3 w-3 text-muted-foreground" /></Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {f.talhoes.map(t => (
                    <div key={t.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors cursor-pointer">
                      <div>
                        <p className="text-xs font-medium text-foreground">{t.nome}</p>
                        <p className="text-[10px] text-muted-foreground">{t.hectares}ha • {t.variedade}</p>
                      </div>
                      <div className={`h-2 w-2 rounded-full ${t.status === 'alta' ? 'bg-success' : t.status === 'media' ? 'bg-accent' : t.status === 'baixa' ? 'bg-destructive' : 'bg-muted-foreground/30'}`} />
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="notificacoes" className="mt-4 space-y-4 max-w-3xl">
            <Card className="gradient-card p-4 border-border/50">
              <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2"><Bell className="h-4 w-4" /> Preferências</h3>
              <div className="space-y-3">
                {[
                  { label: 'Alertas de preço', desc: 'Quando o preço atingir suas metas', on: true },
                  { label: 'Estoque baixo', desc: 'Quando insumos ficarem abaixo do mínimo', on: true },
                  { label: 'Relatório semanal', desc: 'Resumo toda segunda às 7h', on: true },
                  { label: 'Insights da IA', desc: 'Recomendações baseadas em seus dados', on: true },
                  { label: 'Clima severo', desc: 'Alertas de geada, chuva forte, seca', on: true },
                  { label: 'Ordens de serviço', desc: 'Quando ordens forem concluídas', on: false },
                ].map(n => (
                  <div key={n.label} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/20 transition-colors">
                    <div>
                      <span className="text-sm text-foreground">{n.label}</span>
                      <p className="text-[10px] text-muted-foreground">{n.desc}</p>
                    </div>
                    <Switch defaultChecked={n.on} />
                  </div>
                ))}
              </div>
            </Card>

            <Card className="gradient-card p-4 border-border/50">
              <h3 className="text-sm font-semibold text-foreground mb-3">Canais de Notificação</h3>
              <div className="space-y-3">
                {[
                  { label: 'WhatsApp', desc: '+55 34 99876-5432', on: true },
                  { label: 'Email', desc: 'joao.meireles@email.com', on: true },
                  { label: 'Push (App)', desc: 'Notificações no navegador', on: false },
                ].map(c => (
                  <div key={c.label} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/20 transition-colors">
                    <div>
                      <span className="text-sm text-foreground">{c.label}</span>
                      <p className="text-[10px] text-muted-foreground">{c.desc}</p>
                    </div>
                    <Switch defaultChecked={c.on} />
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="integracoes" className="mt-4 space-y-4 max-w-3xl">
            <Card className="gradient-card p-4 border-border/50">
              <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2"><Link2 className="h-4 w-4" /> APIs Conectadas</h3>
              <div className="space-y-3">
                {[
                  { nome: 'CEPEA', desc: 'Cotações em tempo real do mercado de café', status: 'Conectado', desde: '01/01/2025' },
                  { nome: 'OpenAI', desc: 'Motor de IA para análises e chat', status: 'Conectado', desde: '15/03/2025' },
                  { nome: 'WhatsApp Business', desc: 'Integração para mensagens e alertas', status: 'Conectado', desde: '01/02/2025' },
                  { nome: 'Google Maps', desc: 'Visualização de mapas e geolocalização', status: 'Conectado', desde: '01/01/2025' },
                ].map(i => (
                  <div key={i.nome} className="flex items-center justify-between p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
                    <div>
                      <p className="text-sm font-medium text-foreground">{i.nome}</p>
                      <p className="text-xs text-muted-foreground">{i.desc}</p>
                      <p className="text-[10px] text-muted-foreground/60">Desde {i.desde}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-success/20 text-success border-success/30 text-xs">{i.status}</Badge>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="gradient-card p-4 border-border/50">
              <h3 className="text-sm font-semibold text-foreground mb-3">Exportação de Dados</h3>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="text-xs border-border text-foreground"><Download className="h-3 w-3 mr-1" />Exportar CSV</Button>
                <Button size="sm" variant="outline" className="text-xs border-border text-foreground"><Download className="h-3 w-3 mr-1" />Exportar PDF</Button>
                <Button size="sm" variant="outline" className="text-xs border-border text-foreground"><Download className="h-3 w-3 mr-1" />Backup Completo</Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="plano" className="mt-4 space-y-4 max-w-3xl">
            <Card className="gradient-card p-6 border-accent/20 glow-accent">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-6 w-6 text-accent" />
                  <div>
                    <p className="text-lg font-bold text-foreground">Plano Pro</p>
                    <p className="text-sm text-muted-foreground">Acesso completo a todas as funcionalidades</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-accent">R$ 297<span className="text-sm text-muted-foreground font-normal">/mês</span></p>
                  <Badge className="bg-success/20 text-success border-success/30">Ativo</Badge>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Uso este mês</span>
                  <span className="text-foreground">72%</span>
                </div>
                <Progress value={72} className="h-2" />
                <p className="text-[10px] text-muted-foreground">847 de 1.200 consultas IA utilizadas • renova em 01/05/2026</p>
              </div>
            </Card>

            <Card className="gradient-card p-4 border-border/50">
              <h3 className="text-sm font-semibold text-foreground mb-3">Recursos do Plano Pro</h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  'Fazendas ilimitadas', 'IA Agrônoma avançada', 'Integração WhatsApp',
                  'Relatórios em PDF', 'Alertas em tempo real', 'Análise de concorrentes',
                  'Simulador de vendas', 'Suporte prioritário',
                ].map(r => (
                  <div key={r} className="flex items-center gap-2 p-2 text-xs text-foreground">
                    <div className="h-1.5 w-1.5 rounded-full bg-success" />
                    {r}
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
