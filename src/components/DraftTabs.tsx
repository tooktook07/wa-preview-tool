import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Draft } from "@/hooks/use-draft-manager";
import { useState } from "react";
import { RenameDraftDialog } from "./RenameDraftDialog";

interface DraftTabsProps {
  drafts: Draft[];
  activeDraftId: string;
  onSwitch: (draftId: string) => void;
  onRename: (draftId: string, newName: string) => void;
  onClear: (draftId: string) => void;
}

export function DraftTabs({ drafts, activeDraftId, onSwitch, onRename, onClear }: DraftTabsProps) {
  const [renamingDraft, setRenamingDraft] = useState<Draft | null>(null);

  const handleClear = (draftId: string) => {
    
    if (confirm("Clear this draft? All content and version history will be lost.")) {
      onClear(draftId);
    }
  };

  return (
    <>
      <Tabs value={activeDraftId} onValueChange={onSwitch} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          {drafts.map((draft) => (
            <TabsTrigger key={draft.id} value={draft.id} className="relative group">
              <span className="truncate max-w-[100px]">{draft.name}</span>
              {draft.content && (
                <span className="ml-1 text-xs opacity-50">•</span>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-1 h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <MoreVertical className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setRenamingDraft(draft)}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Rename
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleClear(draft.id)}
                    className="text-destructive"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Clear Draft
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {renamingDraft && (
        <RenameDraftDialog
          draft={renamingDraft}
          open={!!renamingDraft}
          onOpenChange={(open) => !open && setRenamingDraft(null)}
          onRename={(newName) => {
            onRename(renamingDraft.id, newName);
            setRenamingDraft(null);
          }}
        />
      )}
    </>
  );
}
