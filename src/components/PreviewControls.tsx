import { Button } from "@/components/ui/button";
import { Sun, Moon, Monitor, Smartphone } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export type ThemeMode = "light" | "dark";
export type DeviceMode = "mobile" | "desktop";

interface PreviewControlsProps {
  theme: ThemeMode;
  device: DeviceMode;
  onThemeChange: (theme: ThemeMode) => void;
  onDeviceChange: (device: DeviceMode) => void;
}

export default function PreviewControls({
  theme,
  device,
  onThemeChange,
  onDeviceChange,
}: PreviewControlsProps) {
  return (
    <div className="flex items-center gap-2">
      {/* Theme Toggle */}
      <div className="flex items-center border rounded-lg overflow-hidden">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={theme === "light" ? "default" : "ghost"}
              size="sm"
              onClick={() => onThemeChange("light")}
              className="rounded-none h-8 px-3"
            >
              <Sun className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Light Mode</TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={theme === "dark" ? "default" : "ghost"}
              size="sm"
              onClick={() => onThemeChange("dark")}
              className="rounded-none h-8 px-3 border-l"
            >
              <Moon className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Dark Mode</TooltipContent>
        </Tooltip>
      </div>

      {/* Device Toggle */}
      <div className="flex items-center border rounded-lg overflow-hidden">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={device === "mobile" ? "default" : "ghost"}
              size="sm"
              onClick={() => onDeviceChange("mobile")}
              className="rounded-none h-8 px-3"
            >
              <Smartphone className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Mobile View</TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={device === "desktop" ? "default" : "ghost"}
              size="sm"
              onClick={() => onDeviceChange("desktop")}
              className="rounded-none h-8 px-3 border-l"
            >
              <Monitor className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Desktop View</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
