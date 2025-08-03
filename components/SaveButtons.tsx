"use client";
import { Save, Wand2, Type, Loader2} from "lucide-react";

interface Props {
  disabled: boolean;
  loading: { save: boolean; refine: boolean; title: boolean };
  onSave: () => void;
  onRefine: () => void;
  onTitle: () => void;
}

const SaveButtons = ({
  disabled,
  loading,
  onSave,
  onRefine,
  onTitle,
}: Props) => (
    <div className="mt-4 flex flex-col sm:flex-row gap-3">
        <button
            onClick={onSave}
            disabled={disabled || loading.save}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-4 py-2 rounded disabled:opacity-40 transition"
        >
            {loading.save ? (
                <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
                <Save className="h-4 w-4" />
            )}
            <span>{loading.save ? "Saving..." : "Save Note"}</span>
        </button>

        <button
            onClick={onRefine}
            disabled={disabled || loading.refine}
            className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-medium text-sm px-4 py-2 rounded disabled:opacity-40 transition"
        >
            {loading.refine ? (
                <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
                <Wand2 className="h-4 w-4" />
            )}
            <span>{loading.refine ? "Refining…" : "Refine Note"}</span>
        </button>

        <button
            onClick={onTitle}
            disabled={disabled || loading.title}
            className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-medium text-sm px-4 py-2 rounded disabled:opacity-40 transition"
        >
            {loading.title ? (
                <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
                <Type className="h-4 w-4" />
            )}
            <span>{loading.title ? "Generating…" : "Generate Title"}</span>
        </button>
    </div>
);

export default SaveButtons;
