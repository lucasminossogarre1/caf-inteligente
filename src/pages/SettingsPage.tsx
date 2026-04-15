import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { fazendas } from "@/data/mockData";
import { User, MapPin, CreditCard, Link2, Bell } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  return (
    <Layout>
      <div className="space-y-6 animate-slide-up max-w-3xl">
        <h1 className="text-2xl font-bold text-foreground">Configurações</h1>

        {/* Profile */}
        <Card className="gradient-card p-6 border-border/50">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center">
              <User className="h-8 w-8 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">João Meireles</h2>
              <p className="text-sm text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" /> Região do Cerrado Mineiro</p>
              <p className="text-sm text-muted-foreground">Cafeicultor</p>
            </div>
          </div>
        </Card>

        {/* Subscription */}
        <Card className="gradient-card p-4 border-accent/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CreditCard className="h-5 w-5 text-accent" />
              <div>
                <p className="font-semibold text-foreground">Plano Pro</p>
                <p className="text-sm text-muted-foreground">R$ 297/mês</p>
              </div>
            </div>
            <Badge className="bg-success/20 text-success border-success/30">Ativo</Badge>
          </div>
        </Card>

        {/* Farms */}
        <Card className="gradient-card p-4 border-border/50">
          <h3 className="text-sm font-semibold text-foreground mb-3">Fazendas & Talhões</h3>
          <div className="space-y-3">
            {fazendas.map(f => (
              <div key={f.id} className="p-3 rounded-lg bg-muted/30">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium text-foreground text-sm">{f.nome}</p>
                  <Badge variant="outline" className="text-xs border-border text-foreground">{f.hectares}ha</Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{f.cidade}</p>
                <div className="flex flex-wrap gap-1">
                  {f.talhoes.map(t => (
                    <Badge key={t.id} variant="outline" className="text-[10px] border-border text-muted-foreground">{t.nome} ({t.hectares}ha)</Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Notifications */}
        <Card className="gradient-card p-4 border-border/50">
          <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2"><Bell className="h-4 w-4" /> Notificações</h3>
          <div className="space-y-3">
            {['Alertas de preço', 'Estoque baixo', 'Relatório semanal', 'Insights da IA'].map(n => (
              <div key={n} className="flex items-center justify-between">
                <span className="text-sm text-foreground">{n}</span>
                <Switch defaultChecked />
              </div>
            ))}
          </div>
        </Card>

        {/* Integrations */}
        <Card className="gradient-card p-4 border-border/50">
          <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2"><Link2 className="h-4 w-4" /> Integrações</h3>
          <div className="space-y-2">
            {[
              { nome: 'CEPEA', status: 'Conectado' },
              { nome: 'OpenAI', status: 'Conectado' },
              { nome: 'WhatsApp', status: 'Conectado' },
            ].map(i => (
              <div key={i.nome} className="flex items-center justify-between p-2 rounded bg-muted/30">
                <span className="text-sm text-foreground">{i.nome}</span>
                <Badge className="bg-success/20 text-success border-success/30 text-xs">{i.status}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Layout>
  );
}
