import { Button } from "@/components/ui/button";
import { Sun, Moon, Monitor, Smartphone, Send, UserCircle, Settings, Check } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";

export type ThemeMode = "light" | "dark";
export type DeviceMode = "mobile" | "desktop";
export type MessageMode = "sender" | "receiver";

interface PreviewControlsProps {
  theme: ThemeMode;
  device: DeviceMode;
  mode: MessageMode;
  onThemeChange: (theme: ThemeMode) => void;
  onDeviceChange: (device: DeviceMode) => void;
  onModeChange: (mode: MessageMode) => void;
}

export default function PreviewControls({
  theme,
  device,
  mode,
  onThemeChange,
  onDeviceChange,
  onModeChange,
}: PreviewControlsProps) {
  const isMobile = useIsMobile();
  
  // Mobile dropdown layout
  if (isMobile) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-9 gap-1 text-xs">
            <Settings className="h-4 w-4" />
            <span>View</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel className="text-xs">Theme</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onThemeChange("light")}>
            <Sun className="h-3.5 w-3.5 mr-2" />
            Light
            {theme === "light" && <Check className="h-3.5 w-3.5 ml-auto" />}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onThemeChange("dark")}>
            <Moon className="h-3.5 w-3.5 mr-2" />
            Dark
            {theme === "dark" && <Check className="h-3.5 w-3.5 ml-auto" />}
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="text-xs">Device</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onDeviceChange("mobile")}>
            <Smartphone className="h-3.5 w-3.5 mr-2" />
            Mobile
            {device === "mobile" && <Check className="h-3.5 w-3.5 ml-auto" />}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onDeviceChange("desktop")}>
            <Monitor className="h-3.5 w-3.5 mr-2" />
            Desktop
            {device === "desktop" && <Check className="h-3.5 w-3.5 ml-auto" />}
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="text-xs">Perspective</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onModeChange("sender")}>
            <Send className="h-3.5 w-3.5 mr-2" />
            Sender
            {mode === "sender" && <Check className="h-3.5 w-3.5 ml-auto" />}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onModeChange("receiver")}>
            <UserCircle className="h-3.5 w-3.5 mr-2" />
            Receiver
            {mode === "receiver" && <Check className="h-3.5 w-3.5 ml-auto" />}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  
  // Desktop layout
  return (
    <div className="flex items-center gap-2">
      {/* Theme Toggle */}
      <div className="flex items-center border border-border rounded-lg overflow-hidden shadow-sm">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onThemeChange("light")}
              className={`rounded-none h-8 px-3 transition-colors ${
                theme === "light" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
              }`}
            >
              <Sun className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Light Mode</TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onThemeChange("dark")}
              className={`rounded-none h-8 px-3 border-l border-border transition-colors ${
                theme === "dark" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
              }`}
            >
              <Moon className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Dark Mode</TooltipContent>
        </Tooltip>
      </div>

      {/* Device Toggle */}
      <div className="flex items-center border border-border rounded-lg overflow-hidden shadow-sm">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDeviceChange("mobile")}
              className={`rounded-none h-8 px-3 transition-colors ${
                device === "mobile" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
              }`}
            >
              <Smartphone className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Mobile View</TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDeviceChange("desktop")}
              className={`rounded-none h-8 px-3 border-l border-border transition-colors ${
                device === "desktop" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
              }`}
            >
              <Monitor className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Desktop View</TooltipContent>
        </Tooltip>
      </div>

      {/* Message Mode Toggle */}
      <div className="flex items-center border border-border rounded-lg overflow-hidden shadow-sm">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onModeChange("sender")}
              className={`rounded-none h-8 px-3 transition-colors ${
                mode === "sender" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
              }`}
            >
              <Send className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Sender View</TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onModeChange("receiver")}
              className={`rounded-none h-8 px-3 border-l border-border transition-colors ${
                mode === "receiver" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
              }`}
            >
              <UserCircle className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Receiver View</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
