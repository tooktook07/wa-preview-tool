import { Button } from "@/components/ui/button";
import { Sun, Moon, Monitor, Smartphone, Send, UserCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

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
  return (
    <div className="flex items-center gap-2">
      {/* Theme Toggle */}
      <div className="flex items-center bg-white/10 rounded-lg overflow-hidden">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onThemeChange("light")}
              className={`rounded-none h-8 px-3 text-white hover:bg-white/20 ${
                theme === "light" ? "bg-white/30" : ""
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
              className={`rounded-none h-8 px-3 border-l border-white/20 text-white hover:bg-white/20 ${
                theme === "dark" ? "bg-white/30" : ""
              }`}
            >
              <Moon className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Dark Mode</TooltipContent>
        </Tooltip>
      </div>

      {/* Device Toggle */}
      <div className="flex items-center bg-white/10 rounded-lg overflow-hidden">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDeviceChange("mobile")}
              className={`rounded-none h-8 px-3 text-white hover:bg-white/20 ${
                device === "mobile" ? "bg-white/30" : ""
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
              className={`rounded-none h-8 px-3 border-l border-white/20 text-white hover:bg-white/20 ${
                device === "desktop" ? "bg-white/30" : ""
              }`}
            >
              <Monitor className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Desktop View</TooltipContent>
        </Tooltip>
      </div>

      {/* Message Mode Toggle */}
      <div className="flex items-center bg-white/10 rounded-lg overflow-hidden">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onModeChange("sender")}
              className={`rounded-none h-8 px-3 text-white hover:bg-white/20 ${
                mode === "sender" ? "bg-white/30" : ""
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
              className={`rounded-none h-8 px-3 border-l border-white/20 text-white hover:bg-white/20 ${
                mode === "receiver" ? "bg-white/30" : ""
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
