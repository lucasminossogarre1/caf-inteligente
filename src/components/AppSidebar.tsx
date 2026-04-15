import {
  LayoutDashboard, Map, Wheat, DollarSign, Bot, TrendingUp,
  Wrench, MessageCircle, Settings, Coffee
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Mapa das Fazendas", url: "/mapa", icon: Map },
  { title: "Colheita & Qualidade", url: "/colheita", icon: Wheat },
  { title: "Financeiro", url: "/financeiro", icon: DollarSign },
  { title: "IA Agrônoma", url: "/ia", icon: Bot },
  { title: "Mercado", url: "/mercado", icon: TrendingUp },
  { title: "Operações", url: "/operacoes", icon: Wrench },
  { title: "WhatsApp IA", url: "/whatsapp", icon: MessageCircle },
  { title: "Configurações", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <div className="p-4 flex items-center gap-2">
          <Coffee className="h-7 w-7 text-accent shrink-0" />
          {!collapsed && (
            <span className="text-lg font-bold text-foreground tracking-tight">CaféMap</span>
          )}
        </div>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className="hover:bg-sidebar-accent/50 transition-colors"
                      activeClassName="bg-sidebar-accent text-accent font-medium"
                    >
                      <item.icon className="mr-2 h-4 w-4 shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
