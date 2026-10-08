/**
 * Web Audio Synthesizer for Interactive Sound Effects
 * (Background music disabled per user request)
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isMuted: boolean = false;
  private volume: number = 0.5;

  constructor() {
    // AudioContext will initialize on first user interaction
  }

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = this.isMuted ? 0 : this.volume;
      this.masterGain.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && !this.isMuted) {
      this.masterGain.gain.value = this.volume;
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.masterGain) {
      this.masterGain.gain.value = this.isMuted ? 0 : this.volume;
    }
    return this.isMuted;
  }

  public getMutedState(): boolean {
    return this.isMuted;
  }

  // Background music is permanently disabled
  public startBackgroundMusic() {
    // No background music
  }

  public stopBackgroundMusic() {
    // No background music
  }

  public isPlaying(): boolean {
    return false;
  }

  private playTone(
    freq: number,
    startTime: number,
    duration: number,
    type: OscillatorType = 'sine',
    vol: number = 0.1
  ) {
    if (!this.ctx || this.isMuted) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, startTime);

      // Fast attack, warm natural decay
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(vol, startTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(gain);
      gain.connect(this.masterGain || this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration);
    } catch {
      // Fallback
    }
  }

  // Sound Effect: Magical Chime / Flutter
  public playMagicChime() {
    this.initCtx();
    if (!this.ctx || this.isMuted) return;

    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];
    notes.forEach((freq, idx) => {
      this.playTone(freq, now + idx * 0.06, 1.2, 'sine', 0.1);
    });
  }

  // Sound Effect: Sparkle burst
  public playSparkle() {
    this.initCtx();
    if (!this.ctx || this.isMuted) return;

    const now = this.ctx.currentTime;
    for (let i = 0; i < 4; i++) {
      const f = 1200 + Math.random() * 1000;
      this.playTone(f, now + i * 0.05, 0.4, 'triangle', 0.08);
    }
  }

  // Sound Effect: Envelope Unfold
  public playUnfold() {
    this.initCtx();
    if (!this.ctx || this.isMuted) return;

    const now = this.ctx.currentTime;
    this.playTone(300, now, 0.5, 'sine', 0.06);
    this.playTone(450, now + 0.1, 0.6, 'triangle', 0.08);
    this.playTone(600, now + 0.25, 0.8, 'sine', 0.1);
  }

  // Sound Effect: Fireworks explosion sound
  public playFirework() {
    this.initCtx();
    if (!this.ctx || this.isMuted) return;

    const now = this.ctx.currentTime;
    this.playTone(120, now, 0.6, 'sine', 0.2);
    this.playTone(220, now + 0.05, 0.5, 'triangle', 0.15);

    for (let i = 0; i < 6; i++) {
      const freq = 800 + Math.random() * 1200;
      this.playTone(freq, now + 0.2 + i * 0.04, 0.5, 'sine', 0.06);
    }
  }

  // Sound Effect: Candle blow / breeze
  public playBreeze() {
    this.initCtx();
    if (!this.ctx || this.isMuted) return;

    const now = this.ctx.currentTime;
    this.playTone(200, now, 0.8, 'sine', 0.08);
    this.playTone(180, now + 0.2, 0.6, 'sine', 0.05);
  }
}

export const soundEngine = new SoundEngine();
