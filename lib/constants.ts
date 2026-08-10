export const WHATSAPP_LINK = "https://wa.me/91XXXXXXXXXX";

export const romanticImages = {
  home: {
    src: "/romantic-home.png",
    alt: "Romantic floral heart illustration"
  },
  surprise: {
    src: "/romantic-surprise.svg",
    alt: "Cute surprised heart character with flowers"
  },
  celebration: {
    src: "/romantic-celebration.svg",
    alt: "Celebratory romantic illustration with glowing heart"
  }
} as const;

export const typewriterLines = [
  "I brought flowers, sparkles, and a dangerously charming yes button.",
  "The no button is being dramatic on purpose.",
  "Please tap carefully, my heart is watching."
] as const;

export const heartParticles = [
  { left: "6%", top: "14%", size: 18, delay: "0s", duration: "9s" },
  { left: "16%", top: "72%", size: 22, delay: "1s", duration: "10s" },
  { left: "27%", top: "26%", size: 16, delay: "2.2s", duration: "8s" },
  { left: "38%", top: "82%", size: 20, delay: "1.4s", duration: "11s" },
  { left: "53%", top: "16%", size: 24, delay: "3s", duration: "10s" },
  { left: "68%", top: "64%", size: 17, delay: "0.8s", duration: "9.5s" },
  { left: "79%", top: "24%", size: 21, delay: "2.8s", duration: "12s" },
  { left: "90%", top: "78%", size: 15, delay: "1.7s", duration: "8.5s" }
] as const;

export const sparkles = [
  { left: "12%", top: "20%", delay: "0s" },
  { left: "24%", top: "54%", delay: "0.7s" },
  { left: "46%", top: "12%", delay: "1.2s" },
  { left: "61%", top: "76%", delay: "1.9s" },
  { left: "82%", top: "32%", delay: "0.4s" }
] as const;

export const flowers = [
  { left: "8%", top: "86%", rotate: "-12deg" },
  { left: "84%", top: "10%", rotate: "18deg" },
  { left: "88%", top: "84%", rotate: "-22deg" }
] as const;
