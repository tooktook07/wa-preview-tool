import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, RotateCcw, Trash2 } from "lucide-react";
import type { Draft, DraftVersion } from "@/hooks/use-draft-manager";
import { formatDistanceToNow } from "date-fns";

interface VersionHistoryProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  draft: Draft;
  onRestore: (versionId: string) => void;
  onDelete: (versionId: string) => void;
}

export function VersionHistory({ open, onOpenChange, draft, onRestore, onDelete }: VersionHistoryProps) {
  const handleRestore = (version: DraftVersion) => {
    if (confirm(`Restore this version from ${formatDistanceToNow(version.timestamp, { addSuffix: true })}?`)) {
      onRestore(version.id);
      onOpenChange(false);
    }
  };

  const handleDelete = (version: DraftVersion, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Delete this version?")) {
      onDelete(version.id);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Version History</SheetTitle>
          <SheetDescription>
            {draft.name} - {draft.versions.length} saved version{draft.versions.length !== 1 ? 's' : ''}
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-120px)] mt-6">
          {draft.versions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
              <Clock className="h-12 w-12 mb-4 opacity-50" />
              <p>No version history yet</p>
              <p className="text-sm mt-2">Versions are auto-saved as you type</p>
            </div>
          ) : (
            <div className="space-y-4">
              {[...draft.versions].reverse().map((version, index) => (
                <div
                  key={version.id}
                  className="border rounded-lg p-4 hover:bg-accent/50 transition-colors group"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>
                        {index === 0 ? "Current version - " : ""}
                        {formatDistanceToNow(version.timestamp, { addSuffix: true })}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8"
                        onClick={() => handleRestore(version)}
                        disabled={index === 0}
                      >
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-destructive hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => handleDelete(version, e)}
                        disabled={draft.versions.length === 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-sm text-foreground/80 line-clamp-3 whitespace-pre-wrap">
                    {version.content || <span className="italic text-muted-foreground">Empty message</span>}
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    {version.content.length} characters • {version.content.trim() === '' ? 0 : version.content.trim().split(/\s+/).length} words
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
