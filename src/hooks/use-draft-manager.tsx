import { useState, useEffect, useCallback, useRef } from "react";

export interface DraftVersion {
  id: string;
  content: string;
  timestamp: number;
}

export interface Draft {
  id: string;
  name: string;
  content: string;
  versions: DraftVersion[];
  lastModified: number;
}

interface DraftStore {
  drafts: Draft[];
  activeDraftId: string;
}

const STORAGE_KEY = "whatsapp-drafts-store";
const MAX_VERSIONS = 10;
const MAX_DRAFTS = 3;
const AUTO_SAVE_DELAY = 1000; // 1 second debounce

const createEmptyDraft = (id: string, index: number): Draft => ({
  id,
  name: `Draft ${index + 1}`,
  content: "",
  versions: [],
  lastModified: Date.now(),
});

const migrateOldDraft = (): Draft | null => {
  try {
    const oldDraft = localStorage.getItem("whatsapp-message-draft");
    if (oldDraft) {
      const content = JSON.parse(oldDraft);
      localStorage.removeItem("whatsapp-message-draft");
      return {
        id: "draft_1",
        name: "Draft 1",
        content,
        versions: [{
          id: `version_${Date.now()}`,
          content,
          timestamp: Date.now(),
        }],
        lastModified: Date.now(),
      };
    }
  } catch (error) {
    console.warn("Failed to migrate old draft:", error);
  }
  return null;
};

const getInitialStore = (): DraftStore => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.warn("Failed to load drafts:", error);
  }

  // Check for old draft to migrate
  const migratedDraft = migrateOldDraft();
  
  const initialDrafts: Draft[] = [];
  for (let i = 0; i < MAX_DRAFTS; i++) {
    if (i === 0 && migratedDraft) {
      initialDrafts.push(migratedDraft);
    } else {
      initialDrafts.push(createEmptyDraft(`draft_${i + 1}`, i));
    }
  }

  return {
    drafts: initialDrafts,
    activeDraftId: "draft_1",
  };
};

export function useDraftManager() {
  const [store, setStore] = useState<DraftStore>(getInitialStore);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Save to localStorage whenever store changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    } catch (error) {
      console.warn("Failed to save drafts:", error);
    }
  }, [store]);

  const activeDraft = store.drafts.find(d => d.id === store.activeDraftId) || store.drafts[0];

  const switchDraft = useCallback((draftId: string) => {
    setStore(prev => ({
      ...prev,
      activeDraftId: draftId,
    }));
  }, []);

  const updateDraftContent = useCallback((content: string) => {
    // Cancel previous auto-save
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Immediately update content
    setStore(prev => ({
      ...prev,
      drafts: prev.drafts.map(draft =>
        draft.id === prev.activeDraftId
          ? { ...draft, content, lastModified: Date.now() }
          : draft
      ),
    }));

    // Debounced version save
    saveTimeoutRef.current = setTimeout(() => {
      setStore(prev => ({
        ...prev,
        drafts: prev.drafts.map(draft => {
          if (draft.id === prev.activeDraftId && content.trim()) {
            const newVersion: DraftVersion = {
              id: `version_${Date.now()}`,
              content,
              timestamp: Date.now(),
            };

            // Keep only last MAX_VERSIONS versions
            const updatedVersions = [...draft.versions, newVersion].slice(-MAX_VERSIONS);

            return {
              ...draft,
              versions: updatedVersions,
            };
          }
          return draft;
        }),
      }));
    }, AUTO_SAVE_DELAY);
  }, []);

  const renameDraft = useCallback((draftId: string, newName: string) => {
    setStore(prev => ({
      ...prev,
      drafts: prev.drafts.map(draft =>
        draft.id === draftId
          ? { ...draft, name: newName }
          : draft
      ),
    }));
  }, []);

  const clearDraft = useCallback((draftId: string) => {
    setStore(prev => ({
      ...prev,
      drafts: prev.drafts.map(draft =>
        draft.id === draftId
          ? { ...draft, content: "", versions: [], lastModified: Date.now() }
          : draft
      ),
    }));
  }, []);

  const restoreVersion = useCallback((versionId: string) => {
    setStore(prev => {
      const draft = prev.drafts.find(d => d.id === prev.activeDraftId);
      if (!draft) return prev;

      const version = draft.versions.find(v => v.id === versionId);
      if (!version) return prev;

      return {
        ...prev,
        drafts: prev.drafts.map(d =>
          d.id === prev.activeDraftId
            ? { ...d, content: version.content, lastModified: Date.now() }
            : d
        ),
      };
    });
  }, []);

  const deleteVersion = useCallback((versionId: string) => {
    setStore(prev => ({
      ...prev,
      drafts: prev.drafts.map(draft =>
        draft.id === prev.activeDraftId
          ? { ...draft, versions: draft.versions.filter(v => v.id !== versionId) }
          : draft
      ),
    }));
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  return {
    drafts: store.drafts,
    activeDraft,
    switchDraft,
    updateDraftContent,
    renameDraft,
    clearDraft,
    restoreVersion,
    deleteVersion,
  };
}
