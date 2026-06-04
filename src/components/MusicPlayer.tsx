"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// YouTube IFrame API types
declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let ytApiPromise: Promise<void> | null = null;
function loadYouTubeAPI(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.YT && window.YT.Player) return Promise.resolve();
  if (ytApiPromise) return ytApiPromise;
  ytApiPromise = new Promise<void>((resolve) => {
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      resolve();
    };
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
  });
  return ytApiPromise;
}

interface Track {
  id: number;
  title: string;
  artist: string;
  src: string;
  type: "audio" | "youtube";
  youtubeId?: string;
}

const tracks: Track[] = [
  {
    id: 1,
    title: "Era Óbvio",
    artist: "Marisa Monte",
    src: "",
    type: "youtube",
    youtubeId: "b59_Ry2AGtU",
  },
  {
    id: 2,
    title: "Nosso Amor",
    artist: "Trilha Romântica",
    src: "https://cdn.pixabay.com/audio/2022/10/30/audio_347c1e4a55.mp3",
    type: "audio",
  },
  {
    id: 3,
    title: "Melodia do Coração",
    artist: "Piano Romântico",
    src: "https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3",
    type: "audio",
  },
  {
    id: 4,
    title: "Eternamente Sua",
    artist: "Som de Amor",
    src: "https://cdn.pixabay.com/audio/2023/02/28/audio_2a66b02a92.mp3",
    type: "audio",
  },
];

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function MusicPlayer() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressInterval = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const ytContainerRef = useRef<HTMLDivElement>(null);
  const ytPlayerRef = useRef<any>(null);
  const [ytReady, setYtReady] = useState(false);

  const track = tracks[currentTrack];
  const isAudio = track.type === "audio";

  // Initialize YouTube player once
  useEffect(() => {
    let cancelled = false;
    loadYouTubeAPI().then(() => {
      if (cancelled || !ytContainerRef.current || ytPlayerRef.current) return;
      ytPlayerRef.current = new window.YT.Player(ytContainerRef.current, {
        height: "180",
        width: "100%",
        videoId: track.type === "youtube" ? track.youtubeId : "",
        playerVars: { autoplay: 0, controls: 0, modestbranding: 1, rel: 0, playsinline: 1 },
        events: {
          onReady: (e: any) => {
            e.target.setVolume(Math.round(volume * 100));
            setYtReady(true);
          },
          onStateChange: (e: any) => {
            // 1 = playing, 2 = paused, 0 = ended
            if (e.data === 1) setIsPlaying(true);
            else if (e.data === 2) setIsPlaying(false);
            else if (e.data === 0) handleEnded();
          },
        },
      });
    });
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load video when current track changes to a YouTube one
  useEffect(() => {
    if (!ytReady || !ytPlayerRef.current) return;
    if (track.type === "youtube" && track.youtubeId) {
      ytPlayerRef.current.loadVideoById(track.youtubeId);
      if (!isPlaying) ytPlayerRef.current.pauseVideo?.();
    } else {
      ytPlayerRef.current.stopVideo?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrack, ytReady]);

  // Play/pause YouTube based on isPlaying state
  useEffect(() => {
    if (!ytReady || !ytPlayerRef.current || track.type !== "youtube") return;
    if (isPlaying) ytPlayerRef.current.playVideo?.();
    else ytPlayerRef.current.pauseVideo?.();
  }, [isPlaying, ytReady, track.type]);

  // Volume for YouTube
  useEffect(() => {
    if (ytReady && ytPlayerRef.current) {
      ytPlayerRef.current.setVolume?.(Math.round(volume * 100));
    }
  }, [volume, ytReady]);

  // Auto-play when track changes and player is "active"
  useEffect(() => {
    if (!audioRef.current || !isAudio) return;
    audioRef.current.volume = volume;
    if (isPlaying) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [currentTrack, isPlaying, isAudio]);

  // Update volume
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  // Progress tracking for audio tracks
  useEffect(() => {
    if (!isAudio || !isPlaying) {
      if (progressInterval.current) clearInterval(progressInterval.current);
      return;
    }
    progressInterval.current = setInterval(() => {
      if (audioRef.current) {
        setProgress(audioRef.current.currentTime);
        setDuration(audioRef.current.duration || 0);
      }
    }, 250);
    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current);
    };
  }, [isPlaying, isAudio]);

  // Auto-advance when audio ends
  const handleEnded = useCallback(() => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
    setIsPlaying(true);
  }, []);

  // Seek
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setProgress(val);
    if (audioRef.current) audioRef.current.currentTime = val;
  };

  const togglePlay = () => setIsPlaying((p) => !p);
  const prevTrack = () => setCurrentTrack((p) => (p - 1 + tracks.length) % tracks.length);
  const nextTrack = () => setCurrentTrack((p) => (p + 1) % tracks.length);
  const selectTrack = (idx: number) => {
    setCurrentTrack(idx);
    setIsPlaying(true);
    setShowPlaylist(false);
  };

  return (
    <>
      {/* Hidden audio element for audio tracks */}
      {isAudio && (
        <audio
          ref={audioRef}
          src={track.src}
          onEnded={handleEnded}
          onLoadedMetadata={() => {
            if (audioRef.current) setDuration(audioRef.current.duration);
          }}
        />
      )}

      {/* Persistent YouTube IFrame API container — always mounted so playback continues when the panel is closed */}
      <div
        className={
          isOpen && track.type === "youtube"
            ? "fixed bottom-[120px] right-6 z-50 w-[300px] md:w-[340px] h-[180px] rounded-xl overflow-hidden border border-[color:var(--gold)]/20"
            : "fixed bottom-0 right-0 w-px h-px opacity-0 pointer-events-none -z-10 overflow-hidden"
        }
      >
        <div ref={ytContainerRef} className="w-full h-full" />
      </div>

      {/* Collapsed button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-card/80 backdrop-blur-xl border border-[color:var(--gold)]/40 flex items-center justify-center text-gold shadow-glow hover:shadow-rose transition-shadow"
          aria-label="Open music player"
        >
          <span className="text-2xl">{isPlaying ? "♪" : "♫"}</span>
          {isPlaying && (
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-rose animate-pulse" />
          )}
        </motion.button>
      )}

      {/* Expanded player */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.9 }}
            transition={{ type: "spring", damping: 20, stiffness: 200 }}
            className="fixed bottom-6 right-6 z-50 w-[340px] md:w-[380px]"
          >
            <div className="relative bg-card/90 backdrop-blur-2xl border border-[color:var(--gold)]/30 rounded-3xl p-5 shadow-glow overflow-hidden">
              {/* Glow background */}
              <div className="absolute -top-20 -right-20 w-48 h-48 bg-gradient-gold opacity-10 blur-3xl rounded-full pointer-events-none" />

              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="font-script text-rose text-lg">Nossa Trilha Sonora</div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full bg-[color:var(--gold)]/10 flex items-center justify-center text-gold hover:bg-[color:var(--gold)]/20 transition"
                >
                  ✕
                </button>
              </div>

              {/* Placeholder for persistent YouTube iframe (rendered outside this panel) */}
              {!isAudio && track.youtubeId && (
                <div className="mb-4 h-[180px] rounded-xl" />
              )}

              {/* Track Info */}
              <div className="text-center mb-4">
                <motion.div
                  key={track.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-display text-lg text-gradient-gold truncate"
                >
                  {track.title}
                </motion.div>
                <motion.div
                  key={`${track.id}-artist`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="font-serif-body italic text-muted-foreground text-sm mt-1"
                >
                  {track.artist}
                </motion.div>
              </div>

              {/* Progress bar - only for audio */}
              {isAudio && (
                <div className="mb-4">
                  <input
                    type="range"
                    min={0}
                    max={duration || 100}
                    value={progress}
                    onChange={handleSeek}
                    className="w-full h-1.5 appearance-none rounded-full bg-[color:var(--gold)]/20 accent-gold cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, var(--gold) ${(progress / (duration || 1)) * 100}%, oklch(0.85 0.15 85 / 0.2) ${(progress / (duration || 1)) * 100}%)`,
                    }}
                  />
                  <div className="flex justify-between mt-1.5 text-xs text-muted-foreground font-serif-body">
                    <span>{formatTime(progress)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>
              )}

              {/* Controls */}
              <div className="flex items-center justify-center gap-4 mb-4">
                <button
                  onClick={prevTrack}
                  className="w-10 h-10 rounded-full bg-[color:var(--gold)]/10 flex items-center justify-center text-gold hover:bg-[color:var(--gold)]/20 transition hover:scale-110"
                  aria-label="Previous"
                >
                  ⏮
                </button>
                <button
                  onClick={togglePlay}
                  className="w-14 h-14 rounded-full bg-gradient-gold flex items-center justify-center text-primary-foreground text-xl shadow-glow hover:scale-105 transition-transform"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? "⏸" : "▶"}
                </button>
                <button
                  onClick={nextTrack}
                  className="w-10 h-10 rounded-full bg-[color:var(--gold)]/10 flex items-center justify-center text-gold hover:bg-[color:var(--gold)]/20 transition hover:scale-110"
                  aria-label="Next"
                >
                  ⏭
                </button>
              </div>

              {/* Volume */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-gold text-sm">🔊</span>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="flex-1 h-1.5 appearance-none rounded-full cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, var(--gold) ${volume * 100}%, oklch(0.85 0.15 85 / 0.2) ${volume * 100}%)`,
                  }}
                />
              </div>

              {/* Playlist toggle */}
              <button
                onClick={() => setShowPlaylist((p) => !p)}
                className="w-full py-2 rounded-xl bg-[color:var(--gold)]/10 text-gold font-display text-xs tracking-widest hover:bg-[color:var(--gold)]/15 transition"
              >
                {showPlaylist ? "Fechar Playlist" : "Ver Playlist"}
              </button>

              {/* Playlist */}
              <AnimatePresence>
                {showPlaylist && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 space-y-1.5 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
                      {tracks.map((t, i) => (
                        <button
                          key={t.id}
                          onClick={() => selectTrack(i)}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition ${
                            i === currentTrack
                              ? "bg-gradient-gold/20 border border-[color:var(--gold)]/30"
                              : "bg-[color:var(--gold)]/5 border border-transparent hover:bg-[color:var(--gold)]/10"
                          }`}
                        >
                          <span className="text-gold text-sm">
                            {i === currentTrack && isPlaying ? "♪" : `${i + 1}`}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className={`font-display text-sm truncate ${i === currentTrack ? "text-gradient-gold" : "text-foreground/80"}`}>
                              {t.title}
                            </div>
                            <div className="font-serif-body italic text-xs text-muted-foreground truncate">
                              {t.artist} {t.type === "youtube" && "• YouTube"}
                            </div>
                          </div>
                          {i === currentTrack && isPlaying && (
                            <span className="flex gap-0.5">
                              <span className="w-1 h-3 bg-rose rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                              <span className="w-1 h-3 bg-rose rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                              <span className="w-1 h-3 bg-rose rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
