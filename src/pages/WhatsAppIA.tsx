import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { whatsappMensagens, whatsappAlertas } from "@/data/mockData";
import { MessageCircle, Phone, Bell, Clock, Globe, Check } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export default function WhatsAppIA() {
  return (
    <Layout>
      <div className="space-y-6 animate-slide-up">
        <h1 className="text-2xl font-bold text-foreground">WhatsApp IA</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Config panel */}
          <div className="space-y-4">
            <Card className="gradient-card p-4 border-border/50">
              <h3 className="text-sm font-semibold text-foreground mb-3">Configurações</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-success" />
                  <div className="flex-1">
                    <p className="text-sm text-foreground">+55 34 99876-5432</p>
                    <p className="text-xs text-muted-foreground">Número conectado</p>
                  </div>
                  <Badge className="bg-success/20 text-success border-success/30 text-xs">Ativo</Badge>
                </div>
              </div>
            </Card>

            <Card className="gradient-card p-4 border-border/50">
              <h3 className="text-sm font-semibold text-foreground mb-3">Alertas Ativos</h3>
              <div className="space-y-2">
                {whatsappAlertas.map((a, i) => (
                  <div key={i} className="flex items-start gap-2 p-2 rounded bg-muted/30">
                    <Bell className="h-3.5 w-3.5 text-accent mt-0.5 shrink-0" />
                    <p className="text-xs text-foreground/80">{a}</p>
                  </div>
                ))}
              </div>
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
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-foreground">Idioma de Resposta</p>
                    <p className="text-xs text-muted-foreground">Português (BR)</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs border-border text-foreground">PT-BR</Badge>
              </div>
            </Card>
          </div>

          {/* Phone mockup */}
          <div className="lg:col-span-2 flex justify-center">
            <div className="w-full max-w-sm">
              {/* Phone frame */}
              <div className="bg-card rounded-[2rem] border-2 border-border/50 p-2 shadow-2xl">
                {/* Status bar */}
                <div className="bg-primary rounded-t-[1.5rem] px-4 py-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-success/20 flex items-center justify-center">
                      <MessageCircle className="h-4 w-4 text-success" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">CaféMap IA</p>
                      <p className="text-xs text-success">online</p>
                    </div>
                  </div>
                </div>

                {/* Chat area */}
                <div className="bg-muted/20 p-3 space-y-3 min-h-[420px] max-h-[420px] overflow-auto">
                  {whatsappMensagens.map((m, i) => (
                    <div key={i} className={`flex ${m.remetente === 'joao' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] rounded-xl px-3 py-2 text-xs leading-relaxed ${m.remetente === 'joao' ? 'bg-primary text-foreground rounded-br-sm' : 'bg-card text-foreground rounded-bl-sm'}`}>
                        {m.msg}
                        <div className="flex justify-end mt-1 gap-1">
                          <span className="text-[10px] text-muted-foreground">14:32</span>
                          {m.remetente === 'joao' && <Check className="h-3 w-3 text-info" />}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input area */}
                <div className="bg-card rounded-b-[1.5rem] px-3 py-2 flex items-center gap-2">
                  <div className="flex-1 bg-muted/30 rounded-full px-3 py-2">
                    <span className="text-xs text-muted-foreground">Mensagem...</span>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-success flex items-center justify-center shrink-0">
                    <MessageCircle className="h-4 w-4 text-success-foreground" />
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
