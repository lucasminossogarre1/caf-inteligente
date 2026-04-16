import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { whatsappMensagens, whatsappAlertas } from "@/data/mockData";
import { MessageCircle, Phone, Bell, Clock, Globe, Check, CheckCheck, Shield, Zap, BarChart3 } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const stats = [
  { label: 'Mensagens Hoje', value: '12', icon: MessageCircle },
  { label: 'Registros via Chat', value: '4', icon: Zap },
  { label: 'Consultas IA', value: '8', icon: BarChart3 },
];

export default function WhatsAppIA() {
  return (
    <Layout>
      <div className="space-y-6 animate-slide-up">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">WhatsApp IA</h1>
            <p className="text-muted-foreground text-sm">Gerencie suas fazendas pelo WhatsApp</p>
          </div>
          <Badge className="bg-success/20 text-success border-success/30"><Phone className="h-3 w-3 mr-1" />Conectado</Badge>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {stats.map(s => (
            <Card key={s.label} className="gradient-card p-3 border-border/50 text-center">
              <s.icon className="h-4 w-4 text-accent mx-auto mb-1" />
              <p className="text-lg font-bold text-foreground">{s.value}</p>
              <p className="text-[10px] text-muted-foreground">{s.label}</p>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Config panel */}
          <div className="space-y-4">
            <Card className="gradient-card p-4 border-border/50">
              <h3 className="text-sm font-semibold text-foreground mb-3">Configurações</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/20">
                  <Phone className="h-4 w-4 text-success shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm text-foreground">+55 34 99876-5432</p>
                    <p className="text-xs text-muted-foreground">Número conectado</p>
                  </div>
                  <Badge className="bg-success/20 text-success border-success/30 text-xs">Ativo</Badge>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/20">
                  <Shield className="h-4 w-4 text-info shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm text-foreground">Criptografia</p>
                    <p className="text-xs text-muted-foreground">Ponta a ponta</p>
                  </div>
                  <Badge variant="outline" className="text-xs border-info/30 text-info">E2E</Badge>
                </div>
              </div>
            </Card>

            <Card className="gradient-card p-4 border-border/50">
              <h3 className="text-sm font-semibold text-foreground mb-3">Alertas Ativos</h3>
              <div className="space-y-2">
                {whatsappAlertas.map((a, i) => (
                  <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
                    <Bell className="h-3.5 w-3.5 text-accent mt-0.5 shrink-0" />
                    <p className="text-xs text-foreground/80 leading-relaxed">{a}</p>
                  </div>
                ))}
              </div>
              <Button size="sm" variant="outline" className="w-full mt-3 text-xs border-border text-foreground">Gerenciar Alertas</Button>
            </Card>

            <Card className="gradient-card p-4 border-border/50 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-foreground">Relatório Semanal</p>
                    <p className="text-xs text-muted-foreground">Toda segunda, 7h</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-foreground">Alertas de Preço</p>
                    <p className="text-xs text-muted-foreground">Quando atingir meta</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-foreground">Idioma</p>
                    <p className="text-xs text-muted-foreground">Português (BR)</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs border-border text-foreground">PT-BR</Badge>
              </div>
            </Card>

            {/* Capabilities */}
            <Card className="gradient-card p-4 border-border/50">
              <h3 className="text-sm font-semibold text-foreground mb-2">O que a IA faz</h3>
              <div className="space-y-1.5 text-xs text-muted-foreground">
                <p>📊 Consultar dados de colheita e produção</p>
                <p>💰 Registrar gastos e vendas por mensagem</p>
                <p>📈 Analisar preços e recomendar vendas</p>
                <p>🔔 Enviar alertas automáticos</p>
                <p>📋 Gerar relatórios semanais</p>
              </div>
            </Card>
          </div>

          {/* Phone mockup */}
          <div className="lg:col-span-2 flex justify-center">
            <div className="w-full max-w-md">
              {/* Phone frame */}
              <div className="bg-card rounded-[2.5rem] border-2 border-border/50 p-3 shadow-2xl">
                {/* Status bar */}
                <div className="bg-primary rounded-t-[2rem] px-5 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-success/20 flex items-center justify-center border border-success/30">
                      <MessageCircle className="h-5 w-5 text-success" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">CaféMap IA</p>
                      <p className="text-xs text-success flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-success inline-block" />
                        online • respondendo em ~2s
                      </p>
                    </div>
                  </div>
                </div>

                {/* Chat area */}
                <div className="bg-muted/10 p-4 space-y-3 min-h-[460px] max-h-[460px] overflow-auto">
                  {/* Date divider */}
                  <div className="flex justify-center">
                    <span className="text-[10px] text-muted-foreground bg-card/80 rounded-full px-3 py-0.5">Hoje</span>
                  </div>
                  {whatsappMensagens.map((m, i) => (
                    <div key={i} className={`flex ${m.remetente === 'joao' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed shadow-sm ${m.remetente === 'joao' ? 'bg-primary text-foreground rounded-br-md' : 'bg-card text-foreground rounded-bl-md border border-border/30'}`}>
                        {m.msg}
                        <div className="flex justify-end mt-1.5 gap-1.5 items-center">
                          <span className="text-[9px] text-muted-foreground/60">{`14:${32 + i * 3}`}</span>
                          {m.remetente === 'joao' && <CheckCheck className="h-3 w-3 text-info" />}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input area */}
                <div className="bg-card rounded-b-[2rem] px-4 py-3 flex items-center gap-3 border-t border-border/20">
                  <div className="flex-1 bg-muted/30 rounded-full px-4 py-2.5 border border-border/30">
                    <span className="text-xs text-muted-foreground">Mensagem...</span>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-success flex items-center justify-center shrink-0 shadow-lg shadow-success/20">
                    <MessageCircle className="h-5 w-5 text-success-foreground" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
