import { Bell, TrendingUp, User } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";

export function TopBar() {
  return (
    <header className="h-14 border-b border-border flex items-center justify-between px-4 bg-card/50 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
        <div className="hidden sm:flex items-center gap-2 bg-muted/50 rounded-lg px-3 py-1.5 text-sm">
          <TrendingUp className="h-3.5 w-3.5 text-success" />
          <span className="text-muted-foreground">Arábica CEPEA:</span>
          <span className="font-semibold text-foreground">R$ 1.076/sc</span>
          <Badge variant="outline" className="text-success border-success/30 text-xs px-1.5">↑ 2,3%</Badge>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
          <Bell className="h-4.5 w-4.5 text-muted-foreground" />
          <span className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-accent text-accent-foreground text-[10px] font-bold rounded-full flex items-center justify-center">3</span>
        </button>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
            <User className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="hidden md:block text-sm font-medium text-foreground">João Meireles</span>
        </div>
      </div>
    </header>
  );
}
