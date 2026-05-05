import { useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { Check, ImagePlus, Loader2, X } from "lucide-react";

interface FileItem {
  id: string;
  file: File;
  progress: number;
  status: "pending" | "uploading" | "done" | "error";
  path?: string;
  publicUrl?: string;
  error?: string;
}

const formatSize = (bytes: number): string => {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  return `${(bytes / 1024 / 1024 / 1024).toFixed(2)} GB`;
};

const requestSignedUrl = async (params: {
  uploaderName: string;
  project: string;
  fileName: string;
  fileType: string;
  fileSize: number;
}): Promise<{ signedUrl: string; path: string; publicUrl: string }> => {
  const res = await fetch("/api/upload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `Error ${res.status}`);
  }
  return res.json();
};

const putToSignedUrl = (
  signedUrl: string,
  file: File,
  onProgress: (pct: number) => void
): Promise<void> =>
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", signedUrl, true);
    xhr.setRequestHeader("Content-Type", file.type || "application/octet-stream");
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) onProgress(Math.round((e.loaded / e.total) * 100));
    };
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) resolve();
      else reject(new Error(`Upload falló (${xhr.status})`));
    };
    xhr.onerror = () => reject(new Error("Error de red"));
    xhr.onabort = () => reject(new Error("Cancelado"));
    xhr.send(file);
  });

const Upload = () => {
  const [name, setName] = useState("");
  const [project, setProject] = useState("");
  const [items, setItems] = useState<FileItem[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [completed, setCompleted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const allDone = items.length > 0 && items.every((i) => i.status === "done");
  const canStart =
    name.trim().length > 0 && project.trim().length > 0 && items.length > 0 && !submitting;

  const handleFiles = (selected: FileList | null) => {
    if (!selected || selected.length === 0) return;
    const next: FileItem[] = Array.from(selected).map((file) => ({
      id: `${file.name}-${file.size}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      file,
      progress: 0,
      status: "pending",
    }));
    setItems((prev) => [...prev, ...next]);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const startUpload = async () => {
    if (!canStart) return;
    setSubmitting(true);

    const uploaderName = name.trim();
    const proj = project.trim();
    const pending = items.filter((i) => i.status === "pending" || i.status === "error");

    const uploaded: Array<{ path: string; publicUrl: string; item: FileItem }> = [];

    await Promise.all(
      pending.map(async (item) => {
        setItems((prev) =>
          prev.map((i) =>
            i.id === item.id ? { ...i, status: "uploading", progress: 0, error: undefined } : i
          )
        );

        try {
          const { signedUrl, path, publicUrl } = await requestSignedUrl({
            uploaderName,
            project: proj,
            fileName: item.file.name,
            fileType: item.file.type || "application/octet-stream",
            fileSize: item.file.size,
          });

          await putToSignedUrl(signedUrl, item.file, (pct) => {
            setItems((prev) =>
              prev.map((i) => (i.id === item.id ? { ...i, progress: pct } : i))
            );
          });

          uploaded.push({ path, publicUrl, item });
          setItems((prev) =>
            prev.map((i) =>
              i.id === item.id ? { ...i, status: "done", progress: 100, path, publicUrl } : i
            )
          );
        } catch (err) {
          setItems((prev) =>
            prev.map((i) =>
              i.id === item.id ? { ...i, status: "error", error: (err as Error).message } : i
            )
          );
        }
      })
    );

    if (uploaded.length > 0) {
      try {
        await fetch("/api/notify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            uploaderName,
            project: proj,
            files: uploaded.map(({ path, publicUrl, item }) => ({
              path,
              publicUrl,
              originalName: item.file.name,
              size: item.file.size,
              mimeType: item.file.type || "application/octet-stream",
            })),
          }),
        });
      } catch {
        // no rompemos el flow del usuario si la notificación falla
      }
    }

    setSubmitting(false);

    setItems((current) => {
      if (current.length > 0 && current.every((i) => i.status === "done")) setCompleted(true);
      return current;
    });
  };

  const reset = () => {
    setName("");
    setProject("");
    setItems([]);
    setCompleted(false);
  };

  return (
    <div
      className="min-h-screen w-full flex items-start sm:items-center justify-center px-5 py-10 sm:py-16"
      style={{
        background: "linear-gradient(180deg, #FFFCF7 0%, #F5EDE3 100%)",
        color: "#2B1F1F",
      }}
    >
      <Helmet>
        <title>Subir archivos · Monza Lab</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover"
        />
        <meta name="theme-color" content="#FFFCF7" />
      </Helmet>

      <main className="w-full max-w-md mx-auto">
        {!completed ? (
          <>
            <header className="mb-8 text-center">
              <p className="text-[11px] tracking-[0.22em] uppercase text-[#9b8b80] mb-3">
                Monza Lab
              </p>
              <h1 className="font-display text-3xl sm:text-[34px] leading-tight font-medium">
                Sube tus archivos
              </h1>
              <p className="text-sm text-[#6b5e55] mt-2">
                Fotos y videos. Sin cuenta, sin esperas.
              </p>
            </header>

            <div className="space-y-3">
              <label className="block">
                <span className="text-[11px] tracking-[0.18em] uppercase text-[#9b8b80] mb-1.5 block">
                  Nombre
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tu nombre"
                  autoComplete="name"
                  disabled={submitting}
                  className="w-full h-12 px-4 rounded-xl border border-[#E5D8CC] bg-white/80 backdrop-blur-sm
                             text-base placeholder:text-[#bfaea0] focus:outline-none
                             focus:border-[#2B1F1F] focus:ring-1 focus:ring-[#2B1F1F]/10 transition"
                />
              </label>

              <label className="block">
                <span className="text-[11px] tracking-[0.18em] uppercase text-[#9b8b80] mb-1.5 block">
                  Proyecto
                </span>
                <input
                  type="text"
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                  placeholder="Para qué proyecto"
                  disabled={submitting}
                  className="w-full h-12 px-4 rounded-xl border border-[#E5D8CC] bg-white/80 backdrop-blur-sm
                             text-base placeholder:text-[#bfaea0] focus:outline-none
                             focus:border-[#2B1F1F] focus:ring-1 focus:ring-[#2B1F1F]/10 transition"
                />
              </label>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              multiple
              className="hidden"
              onChange={(e) => {
                handleFiles(e.target.files);
                e.target.value = "";
              }}
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={submitting}
              className="mt-6 w-full h-32 rounded-2xl border-2 border-dashed border-[#D9C8BA]
                         bg-white/40 hover:bg-white/70 active:bg-white/80 transition
                         flex flex-col items-center justify-center gap-2
                         disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ImagePlus className="w-7 h-7 text-[#2B1F1F]" strokeWidth={1.5} />
              <span className="text-sm font-medium">
                {items.length === 0 ? "Elegir fotos y videos" : "Añadir más"}
              </span>
              <span className="text-xs text-[#9b8b80]">Desde tu galería</span>
            </button>

            {items.length > 0 && (
              <ul className="mt-5 space-y-2">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="rounded-xl bg-white/70 border border-[#EFE3D5] p-3 flex items-center gap-3"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-sm font-medium truncate">{item.file.name}</span>
                        <span className="text-[11px] text-[#9b8b80] shrink-0">
                          {formatSize(item.file.size)}
                        </span>
                      </div>
                      {item.status === "uploading" && (
                        <div className="h-1 bg-[#EFE3D5] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#2B1F1F] transition-all duration-200"
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>
                      )}
                      {item.status === "error" && (
                        <p className="text-[11px] text-red-600 mt-0.5 truncate">{item.error}</p>
                      )}
                    </div>
                    {item.status === "pending" && !submitting && (
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="w-7 h-7 flex items-center justify-center rounded-full
                                   text-[#9b8b80] hover:text-[#2B1F1F] hover:bg-[#EFE3D5] transition"
                        aria-label="Quitar"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                    {item.status === "uploading" && (
                      <Loader2 className="w-5 h-5 text-[#2B1F1F] animate-spin" />
                    )}
                    {item.status === "done" && (
                      <div className="w-7 h-7 flex items-center justify-center rounded-full bg-[#2B1F1F]">
                        <Check className="w-4 h-4 text-[#FFFCF7]" strokeWidth={3} />
                      </div>
                    )}
                    {item.status === "error" && (
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="w-7 h-7 flex items-center justify-center rounded-full
                                   text-red-600 hover:bg-red-50 transition"
                        aria-label="Quitar"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            )}

            <button
              type="button"
              onClick={startUpload}
              disabled={!canStart}
              className="mt-6 w-full h-14 rounded-2xl bg-[#2B1F1F] text-[#FFFCF7]
                         font-medium text-base
                         disabled:bg-[#E5D8CC] disabled:text-[#9b8b80] disabled:cursor-not-allowed
                         active:scale-[0.99] transition"
            >
              {submitting ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Subiendo…
                </span>
              ) : allDone ? (
                "Listo"
              ) : (
                `Enviar ${items.length > 0 ? `(${items.length})` : ""}`
              )}
            </button>

            {submitting && (
              <p className="text-[11px] text-center text-[#9b8b80] mt-3">
                No cierres esta pantalla hasta terminar
              </p>
            )}

            <p className="text-[11px] text-center text-[#bfaea0] mt-10">monzalab.com</p>
          </>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#2B1F1F] flex items-center justify-center mb-6">
              <Check className="w-8 h-8 text-[#FFFCF7]" strokeWidth={3} />
            </div>
            <h2 className="font-display text-3xl font-medium mb-2">Recibido</h2>
            <p className="text-sm text-[#6b5e55] mb-1">
              {items.length} archivo{items.length === 1 ? "" : "s"} en camino a Edgar.
            </p>
            <p className="text-sm text-[#6b5e55] mb-10">Gracias.</p>
            <button
              type="button"
              onClick={reset}
              className="text-sm underline text-[#9b8b80] hover:text-[#2B1F1F] transition"
            >
              Subir más archivos
            </button>
            <p className="text-[11px] text-[#bfaea0] mt-16">monzalab.com</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Upload;
