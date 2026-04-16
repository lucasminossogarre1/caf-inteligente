import { useState, useRef, useEffect } from "react";
import { Bell, TrendingUp, User, Search, X, ChevronDown, Cloud, Droplets, Wind } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { notifications, clima } from "@/data/mockData";

export function TopBar() {
  const [showNotif, setShowNotif] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const notifRef = useRef<HTMLDivElement>(null);
  const unread = notifications.filter(n => !n.lida).length;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setShowNotif(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const tipoIcons: Record<string, string> = { mercado: '📈', estoque: '📦', operacao: '🔧', clima: '🌤️', financeiro: '💰' };

  return (
    <header className="h-14 border-b border-border flex items-center justify-between px-4 bg-card/50 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="text-muted-foreground hover:text-foreground" />

        {/* Search */}
        <div className="relative hidden md:block">
          {showSearch ? (
            <div className="flex items-center gap-2 bg-muted/50 rounded-lg px-3 py-1.5 border border-border/50">
              <Search className="h-3.5 w-3.5 text-muted-foreground" />
              <input
                autoFocus
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Buscar talhão, fazenda, transação..."
                className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none w-64"
              />
              <button onClick={() => { setShowSearch(false); setSearchQuery(''); }}>
                <X className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground" />
              </button>
            </div>
          ) : (
            <button onClick={() => setShowSearch(true)} className="flex items-center gap-2 bg-muted/30 rounded-lg px-3 py-1.5 text-sm text-muted-foreground hover:bg-muted/50 transition-colors border border-transparent hover:border-border/30">
              <Search className="h-3.5 w-3.5" />
              <span className="hidden lg:inline">Buscar...</span>
              <kbd className="hidden lg:inline-flex h-5 items-center gap-1 rounded border border-border/50 bg-muted/50 px-1.5 text-[10px] text-muted-foreground">⌘K</kbd>
            </button>
          )}
        </div>

        {/* Price ticker */}
        <div className="hidden sm:flex items-center gap-2 bg-muted/50 rounded-lg px-3 py-1.5 text-sm">
          <TrendingUp className="h-3.5 w-3.5 text-success" />
          <span className="text-muted-foreground">Arábica:</span>
          <span className="font-semibold text-foreground">R$ 1.076/sc</span>
          <Badge variant="outline" className="text-success border-success/30 text-xs px-1.5">↑ 2,3%</Badge>
        </div>

        {/* Weather mini */}
        <div className="hidden lg:flex items-center gap-2 bg-muted/30 rounded-lg px-3 py-1.5 text-sm">
          <span className="text-base">{clima.previsao[0].icone}</span>
          <span className="font-medium text-foreground">{clima.atual.temp}°C</span>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Droplets className="h-3 w-3" />{clima.atual.umidade}%
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button onClick={() => setShowNotif(!showNotif)} className="relative p-2 rounded-lg hover:bg-muted transition-colors">
            <Bell className="h-4 w-4 text-muted-foreground" />
            {unread > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-accent text-accent-foreground text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">{unread}</span>
            )}
          </button>

          {showNotif && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-card border border-border/50 rounded-xl shadow-2xl z-50 overflow-hidden">
              <div className="p-3 border-b border-border/30 flex items-center justify-between">
                <span className="text-sm font-semibold text-foreground">Notificações</span>
                <Badge variant="outline" className="text-xs border-border text-muted-foreground">{unread} novas</Badge>
              </div>
              <div className="max-h-80 overflow-auto">
                {notifications.map(n => (
                  <div key={n.id} className={`px-3 py-2.5 border-b border-border/20 hover:bg-muted/30 transition-colors cursor-pointer ${!n.lida ? 'bg-accent/5' : ''}`}>
                    <div className="flex items-start gap-2">
                      <span className="text-sm mt-0.5">{tipoIcons[n.tipo]}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-semibold text-foreground truncate">{n.titulo}</p>
                          {!n.lida && <div className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />}
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{n.desc}</p>
                        <p className="text-[10px] text-muted-foreground/60 mt-0.5">{n.data}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-2 border-t border-border/30">
                <button className="w-full text-xs text-accent hover:text-accent/80 py-1">Ver todas as notificações</button>
              </div>
            </div>
          )}
        </div>

        {/* User */}
        <div className="flex items-center gap-2 pl-2 border-l border-border/30">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center ring-2 ring-accent/20">
            <User className="h-4 w-4 text-primary-foreground" />
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-foreground leading-none">João Meireles</p>
            <p className="text-[10px] text-muted-foreground">Plano Pro</p>
          </div>
        </div>
      </div>
    </header>
  );
}
