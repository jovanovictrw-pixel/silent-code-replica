import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, useCallback } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SilentCode — Premium Dark Streetwear" },
      { name: "description", content: "Silence is the loudest statement. Explore premium dark streetwear built for those who prefer actions over words." },
      { property: "og:title", content: "SilentCode — Premium Dark Streetwear" },
      { property: "og:description", content: "Silence is the loudest statement. Premium dark streetwear for those who prefer actions over words." },
    ],
  }),
  component: SilentCodePage,
});

/* ─── SVG Logo Component ─── */
function SilentCodeLogo({ size = "default" }: { size?: "default" | "small" }) {
  const w = size === "small" ? 140 : 160;
  const h = size === "small" ? 38 : 44;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width={w - 2} height={h - 2} stroke="white" strokeWidth="1" fill="none" />
      <text x={w / 2} y={h / 2 - 3} textAnchor="middle" fill="white"
        fontFamily="'Josefin Sans', sans-serif" fontSize="13" fontWeight="400"
        letterSpacing="0.35em" dominantBaseline="middle"
        style={{ textTransform: "uppercase" }}>
        SILENTCODE
      </text>
      <text x={w / 2} y={h / 2 + 12} textAnchor="middle" fill="white"
        fontFamily="'Josefin Sans', sans-serif" fontSize="7" fontWeight="300"
        letterSpacing="0.4em" dominantBaseline="middle">
        STUDIO · MMXXV
      </text>
    </svg>
  );
}

/* ─── Social Icons ─── */
function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="white" stroke="none" />
    </svg>
  );
}
function TikTokIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="white">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.98a8.22 8.22 0 004.76 1.52V7.05a4.84 4.84 0 01-1-.36z" />
    </svg>
  );
}
function PinterestIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="white">
      <path d="M12 0a12 12 0 00-4.37 23.17c-.1-.94-.2-2.4.04-3.44l1.4-5.96s-.36-.72-.36-1.78c0-1.66.97-2.9 2.17-2.9 1.02 0 1.52.77 1.52 1.69 0 1.03-.66 2.57-.99 3.99-.28 1.19.6 2.16 1.77 2.16 2.13 0 3.77-2.25 3.77-5.49 0-2.87-2.06-4.87-5-4.87-3.41 0-5.41 2.56-5.41 5.2 0 1.03.4 2.13.89 2.73.1.12.11.22.08.34l-.33 1.36c-.05.22-.18.27-.41.16-1.54-.72-2.5-2.96-2.5-4.77 0-3.87 2.82-7.43 8.13-7.43 4.27 0 7.59 3.04 7.59 7.11 0 4.24-2.67 7.65-6.39 7.65-1.25 0-2.42-.65-2.82-1.42l-.77 2.93c-.28 1.07-.1.37-1.53 2.1A12 12 0 1012 0z" />
    </svg>
  );
}
function XIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="white">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
function YouTubeIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="white">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

/* ─── Benefit SVG Icons ─── */
function PackageIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}
function ExchangeIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="17 1 21 5 17 9" />
      <path d="M3 11V9a4 4 0 014-4h14" />
      <polyline points="7 23 3 19 7 15" />
      <path d="M21 13v2a4 4 0 01-4 4H3" />
    </svg>
  );
}
function LeafIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 019.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 2 8 0 5.5-4.78 10-10 10z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  );
}
function RulerIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.3 15.3a2.4 2.4 0 010 3.4l-2.6 2.6a2.4 2.4 0 01-3.4 0L2.7 8.7a2.41 2.41 0 010-3.4l2.6-2.6a2.41 2.41 0 013.4 0z" />
      <line x1="14.5" y1="12.5" x2="11" y2="16" />
      <line x1="11.5" y1="9.5" x2="8" y2="13" />
      <line x1="8.5" y1="6.5" x2="5" y2="10" />
    </svg>
  );
}

/* ─── Instagram Mini Icon ─── */
function InstagramMiniIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="white" stroke="none" />
    </svg>
  );
}

/* ─── CSS (embedded in style tag via useEffect) ─── */
const PAGE_CSS = `
/* ─── Custom Properties ─── */
:root {
  --sc-bg: #000000;
  --sc-bg-alt: #0a0a0a;
  --sc-text: #FFFFFF;
  --sc-text-secondary: #AAAAAA;
  --sc-text-muted: #666666;
  --sc-text-body: #BBBBBB;
  --sc-accent: #F5F0EB;
  --sc-border: #1a1a1a;
  --sc-border-light: #333333;
  --sc-font-heading: 'Josefin Sans', sans-serif;
  --sc-font-body: 'PT Sans', sans-serif;
}

/* ─── Animations ─── */
@keyframes heroZoom {
  0% { transform: scale(1); }
  100% { transform: scale(1.04); }
}
@keyframes bounceDown {
  0%, 100% { transform: translateY(0); opacity: 0.5; }
  50% { transform: translateY(10px); opacity: 1; }
}
@keyframes fadeInNav {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* ─── Fade In on Scroll ─── */
.sc-fade-target {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}
.sc-fade-target.sc-visible {
  opacity: 1;
  transform: translateY(0);
}

/* ─── Fixed Nav Elements ─── */
.sc-fixed-logo {
  position: fixed;
  top: 25px;
  left: 40px;
  z-index: 9999;
  opacity: 0.92;
  animation: fadeInNav 0.5s ease 0.5s both;
  transition: opacity 0.3s ease;
}
.sc-fixed-hamburger {
  position: fixed;
  top: 30px;
  right: 40px;
  z-index: 9999;
  cursor: pointer;
  background: none;
  border: none;
  padding: 8px;
  animation: fadeInNav 0.5s ease 0.5s both;
  transition: opacity 0.3s ease;
  min-width: 44px;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.sc-hamburger-line {
  display: block;
  width: 22px;
  height: 1px;
  background: white;
  transition: all 0.3s ease;
  position: absolute;
}
.sc-hamburger-line:nth-child(1) { top: calc(50% - 6px); }
.sc-hamburger-line:nth-child(2) { top: 50%; }
.sc-hamburger-line:nth-child(3) { top: calc(50% + 6px); }
.sc-hamburger-open .sc-hamburger-line:nth-child(1) {
  top: 50%; transform: rotate(45deg);
}
.sc-hamburger-open .sc-hamburger-line:nth-child(2) { opacity: 0; }
.sc-hamburger-open .sc-hamburger-line:nth-child(3) {
  top: 50%; transform: rotate(-45deg);
}

/* ─── Nav Overlay ─── */
.sc-nav-dimmer {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  z-index: 9990;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.4s ease;
}
.sc-nav-dimmer.sc-open { opacity: 1; pointer-events: all; }

.sc-nav-panel {
  position: fixed;
  top: 0;
  left: 0;
  width: 380px;
  height: 100%;
  background: rgba(0,0,0,0.97);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  z-index: 9995;
  transform: translateX(-100%);
  transition: transform 0.5s cubic-bezier(0.77, 0, 0.175, 1);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}
.sc-nav-panel.sc-open { transform: translateX(0); }

@media (max-width: 767px) {
  .sc-nav-panel { width: 100vw; }
  .sc-fixed-logo { left: 20px; top: 20px; }
  .sc-fixed-hamburger { right: 20px; top: 20px; }
}

.sc-nav-close {
  position: absolute;
  top: 30px;
  right: 30px;
  background: none;
  border: none;
  color: white;
  font-family: var(--sc-font-heading);
  font-size: 24px;
  cursor: pointer;
  min-width: 44px;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.sc-nav-header {
  padding: 35px 40px 25px;
  border-bottom: 1px solid rgba(255,255,255,0.4);
}
.sc-nav-links {
  padding: 30px 40px;
  flex: 1;
}
.sc-nav-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: var(--sc-font-heading);
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-size: 12px;
  font-weight: 300;
  color: #AAAAAA;
  padding: 12px 0;
  border-bottom: 1px solid #1a1a1a;
  cursor: pointer;
  transition: color 0.3s ease;
  text-decoration: none;
  background: none;
  border-left: none;
  border-right: none;
  border-top: none;
  width: 100%;
  text-align: left;
}
.sc-nav-link:hover { color: white; }

.sc-nav-sub {
  padding-left: 20px;
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.4s ease;
}
.sc-nav-sub.sc-sub-open { max-height: 400px; }
.sc-nav-sub-item {
  font-family: var(--sc-font-heading);
  font-size: 11px;
  color: #666666;
  padding: 8px 0;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  cursor: pointer;
  transition: color 0.2s ease;
  display: block;
  text-decoration: none;
}
.sc-nav-sub-item:hover { color: #AAAAAA; }

.sc-nav-footer {
  padding: 30px 40px;
  border-top: 1px solid #1a1a1a;
}
.sc-nav-socials {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
}
.sc-nav-socials a {
  transition: opacity 0.2s ease;
  min-width: 40px;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.sc-nav-socials a:hover { opacity: 0.6; }
.sc-nav-copyright {
  font-family: var(--sc-font-heading);
  font-size: 9px;
  color: #444;
  letter-spacing: 0.1em;
}

/* ─── Hero ─── */
.sc-hero {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.sc-hero-bg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  animation: heroZoom 14s ease-in-out infinite alternate;
}
.sc-hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.75) 100%);
}
.sc-hero-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 2;
  width: 90%;
  max-width: 700px;
}
.sc-hero-line {
  width: 50px;
  height: 1px;
  background: white;
  opacity: 0.5;
  margin: 0 auto 24px;
}
.sc-hero-sublabel {
  font-family: var(--sc-font-heading);
  text-transform: uppercase;
  letter-spacing: 0.45em;
  font-size: 10px;
  color: white;
  opacity: 0.7;
}
.sc-hero-h1 {
  font-family: var(--sc-font-heading);
  text-transform: uppercase;
  font-weight: 100;
  font-size: clamp(16px, 2.5vw, 32px);
  letter-spacing: 0.35em;
  color: white;
  margin-top: 18px;
  line-height: 1.6;
}
.sc-btn-primary {
  display: inline-block;
  font-family: var(--sc-font-heading);
  text-transform: uppercase;
  letter-spacing: 0.3em;
  font-size: 11px;
  font-weight: 600;
  color: #000000;
  background: #FFFFFF;
  padding: 16px 44px;
  min-height: 48px;
  min-width: 44px;
  border: none;
  cursor: pointer;
  transition: background 0.3s ease;
  text-decoration: none;
}
.sc-btn-primary:hover { background: #DDDDDD; }

.sc-link-secondary {
  font-family: var(--sc-font-heading);
  text-transform: uppercase;
  letter-spacing: 0.25em;
  font-size: 10px;
  color: #AAAAAA;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s ease;
  display: inline-block;
  background: none;
  border: none;
}
.sc-link-secondary:hover { color: white; }

.sc-link-underline {
  font-family: var(--sc-font-heading);
  text-transform: uppercase;
  letter-spacing: 0.25em;
  font-size: 11px;
  font-weight: 400;
  color: white;
  text-decoration: none;
  border-bottom: 1px solid white;
  padding-bottom: 3px;
  cursor: pointer;
  transition: opacity 0.2s ease;
}
.sc-link-underline:hover { opacity: 0.7; }

.sc-scroll-indicator {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  z-index: 2;
}
.sc-scroll-text {
  font-family: var(--sc-font-heading);
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  color: white;
  opacity: 0.5;
  margin-bottom: 10px;
}
.sc-scroll-line {
  width: 2px;
  height: 30px;
  background: white;
  margin: 0 auto;
  opacity: 0.5;
  animation: bounceDown 1.5s infinite ease-in-out;
}

/* ─── Section Shared ─── */
.sc-section-label {
  font-family: var(--sc-font-heading);
  text-transform: uppercase;
  letter-spacing: 0.4em;
  font-size: 10px;
  color: #555;
  text-align: center;
  margin-bottom: 12px;
}
.sc-section-h2 {
  font-family: var(--sc-font-heading);
  text-transform: uppercase;
  letter-spacing: 0.15em;
  font-size: clamp(20px, 3vw, 36px);
  font-weight: 300;
  color: white;
  text-align: center;
  margin: 0;
}
.sc-section-body {
  font-family: var(--sc-font-body);
  font-size: 15px;
  color: #BBBBBB;
  line-height: 1.8;
  text-align: center;
  margin-top: 16px;
}

/* ─── Category Grid ─── */
.sc-categories {
  width: 100%;
  background: #000;
  padding: 80px 40px;
}
.sc-cat-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
  max-width: 1100px;
  margin: 50px auto 0;
}
@media (max-width: 767px) {
  .sc-cat-grid { grid-template-columns: 1fr; }
  .sc-categories { padding: 60px 20px; }
}
.sc-cat-tile {
  position: relative;
  height: 70vh;
  overflow: hidden;
  cursor: pointer;
}
@media (max-width: 767px) {
  .sc-cat-tile { height: 240px; }
}
@media (min-width: 768px) and (max-width: 1024px) {
  .sc-cat-tile { height: 50vw; }
}
.sc-cat-tile img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s ease;
}
.sc-cat-tile:hover img { transform: scale(1.04); }
.sc-cat-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.35);
  transition: background 0.5s ease;
}
.sc-cat-tile:hover .sc-cat-overlay { background: rgba(0,0,0,0.55); }
.sc-cat-content {
  position: absolute;
  bottom: 40px;
  left: 40px;
  z-index: 2;
}
.sc-cat-label {
  font-family: var(--sc-font-heading);
  text-transform: uppercase;
  letter-spacing: 0.4em;
  font-size: 13px;
  color: white;
  margin-bottom: 12px;
}
.sc-cat-cta {
  font-family: var(--sc-font-heading);
  text-transform: uppercase;
  letter-spacing: 0.3em;
  font-size: 10px;
  color: #AAAAAA;
  text-decoration: none;
  transition: color 0.3s ease;
  cursor: pointer;
}
.sc-cat-tile:hover .sc-cat-cta { color: white; }

/* Shop All Banner */
.sc-shop-all-banner {
  display: flex;
  align-items: center;
  gap: 20px;
  background: #0a0a0a;
  padding: 24px 40px;
  cursor: pointer;
  max-width: 1100px;
  margin: 2px auto 0;
}
.sc-shop-all-banner:hover .sc-shop-all-text { color: white; }
.sc-shop-all-line {
  flex: 1;
  height: 1px;
  background: #333;
}
.sc-shop-all-text {
  font-family: var(--sc-font-heading);
  text-transform: uppercase;
  letter-spacing: 0.4em;
  font-size: 11px;
  color: #555;
  white-space: nowrap;
  transition: color 0.2s ease;
}

/* ─── Product Grid ─── */
.sc-products {
  width: 100%;
  background: #000;
  padding: 100px 40px;
}
@media (max-width: 767px) {
  .sc-products { padding: 60px 20px; }
}
.sc-prod-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2px;
  max-width: 1100px;
  margin: 60px auto 0;
}
@media (max-width: 767px) {
  .sc-prod-grid { grid-template-columns: 1fr; }
}
@media (min-width: 768px) and (max-width: 1024px) {
  .sc-prod-grid { grid-template-columns: repeat(2, 1fr); }
}
.sc-prod-card {
  position: relative;
  background: #0a0a0a;
  cursor: pointer;
  overflow: hidden;
}
.sc-prod-img-wrap {
  position: relative;
  overflow: hidden;
  aspect-ratio: 4/5;
}
.sc-prod-img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease-out;
}
.sc-prod-card:hover .sc-prod-img-wrap img { transform: scale(1.03); }
.sc-prod-add-btn {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  color: black;
  font-family: var(--sc-font-heading);
  text-transform: uppercase;
  letter-spacing: 0.25em;
  font-size: 11px;
  font-weight: 600;
  padding: 14px;
  text-align: center;
  transform: translateY(100%);
  transition: transform 0.4s ease;
  cursor: pointer;
  border: none;
  min-height: 44px;
}
.sc-prod-card:hover .sc-prod-add-btn { transform: translateY(0); }
.sc-prod-info { padding: 18px 14px; }
.sc-prod-stars {
  font-family: var(--sc-font-heading);
  font-size: 10px;
  letter-spacing: 0.1em;
  color: var(--sc-accent);
}
.sc-prod-name {
  font-family: var(--sc-font-heading);
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-size: 12px;
  color: white;
  margin-top: 14px;
}
.sc-prod-sub {
  font-family: var(--sc-font-body);
  font-size: 13px;
  color: #666;
  margin-top: 4px;
}
.sc-prod-price {
  font-family: var(--sc-font-heading);
  font-weight: 400;
  font-size: 14px;
  color: var(--sc-accent);
  letter-spacing: 0.1em;
  margin-top: 10px;
}
.sc-prod-quick {
  font-family: var(--sc-font-heading);
  text-transform: uppercase;
  letter-spacing: 0.25em;
  font-size: 10px;
  color: #555;
  margin-top: 10px;
  cursor: pointer;
  transition: color 0.2s ease;
  background: none;
  border: none;
  padding: 0;
}
.sc-prod-quick:hover { color: white; }

/* ─── Value Proposition ─── */
.sc-value {
  position: relative;
  width: 100%;
  background: #000;
  padding: 120px 40px;
  overflow: hidden;
}
@media (max-width: 767px) {
  .sc-value { padding: 80px 20px; }
}
.sc-value-bg {
  position: absolute;
  inset: 0;
  object-fit: cover;
  width: 100%;
  height: 100%;
  opacity: 0.08;
  pointer-events: none;
}
.sc-value-content {
  position: relative;
  z-index: 2;
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
}
.sc-value-h2 {
  font-family: var(--sc-font-heading);
  text-transform: uppercase;
  font-weight: 100;
  font-size: clamp(18px, 2.5vw, 32px);
  letter-spacing: 0.2em;
  color: white;
  margin-top: 20px;
  line-height: 1.5;
}
.sc-value-body {
  font-family: var(--sc-font-body);
  font-size: 15px;
  color: #AAAAAA;
  line-height: 1.9;
  margin-top: 30px;
  max-width: 620px;
  margin-left: auto;
  margin-right: auto;
}
.sc-benefits-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
  max-width: 900px;
  margin: 70px auto 0;
}
@media (max-width: 767px) {
  .sc-benefits-grid { grid-template-columns: repeat(2, 1fr); }
}
.sc-benefit {
  text-align: center;
  padding: 0 20px;
}
.sc-benefit-label {
  font-family: var(--sc-font-heading);
  text-transform: uppercase;
  letter-spacing: 0.3em;
  font-size: 10px;
  color: white;
  margin-top: 16px;
}
.sc-benefit-sub {
  font-family: var(--sc-font-body);
  font-size: 13px;
  color: #666;
  margin-top: 6px;
}

/* ─── UGC Grid ─── */
.sc-ugc {
  width: 100%;
  background: #0a0a0a;
  padding: 100px 40px;
}
@media (max-width: 767px) {
  .sc-ugc { padding: 60px 20px; }
}
.sc-ugc-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 2px;
  max-width: 1100px;
  margin: 60px auto 0;
}
@media (max-width: 767px) {
  .sc-ugc-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 768px) and (max-width: 1024px) {
  .sc-ugc-grid { grid-template-columns: repeat(3, 1fr); }
}
.sc-ugc-tile {
  position: relative;
  aspect-ratio: 1/1;
  overflow: hidden;
  cursor: pointer;
}
.sc-ugc-tile img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.sc-ugc-hover {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.65);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  opacity: 0;
  transition: opacity 0.4s ease;
}
.sc-ugc-tile:hover .sc-ugc-hover { opacity: 1; }
.sc-ugc-hover-text {
  font-family: var(--sc-font-heading);
  text-transform: uppercase;
  letter-spacing: 0.3em;
  font-size: 11px;
  color: white;
}

/* ─── Email Capture ─── */
.sc-email {
  position: relative;
  width: 100%;
  background: #000;
  padding: 120px 40px;
  overflow: hidden;
}
@media (max-width: 767px) {
  .sc-email { padding: 80px 20px; }
}
.sc-email-bg {
  position: absolute;
  inset: 0;
  object-fit: cover;
  width: 100%;
  height: 100%;
  opacity: 0.05;
  pointer-events: none;
}
.sc-email-content {
  position: relative;
  z-index: 2;
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}
.sc-email-h2 {
  font-family: var(--sc-font-heading);
  text-transform: uppercase;
  font-weight: 100;
  font-size: clamp(18px, 2.5vw, 30px);
  letter-spacing: 0.2em;
  color: white;
  margin-top: 20px;
  line-height: 1.5;
}
.sc-email-body {
  font-family: var(--sc-font-body);
  font-size: 15px;
  color: #AAAAAA;
  line-height: 1.8;
  margin-top: 20px;
}
.sc-email-row {
  display: flex;
  gap: 0;
  max-width: 480px;
  margin: 44px auto 0;
}
@media (max-width: 767px) {
  .sc-email-row { flex-direction: column; gap: 12px; }
  .sc-email-row input { width: 100%; }
  .sc-email-row button { width: 100%; }
}
.sc-email-input {
  flex: 1;
  background: transparent;
  border: none;
  border-bottom: 1px solid #333;
  padding: 14px 0;
  font-family: var(--sc-font-heading);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: white;
  outline: none;
  transition: border-color 0.3s ease;
}
.sc-email-input::placeholder { color: #666; }
.sc-email-input:focus { border-bottom-color: white; }
.sc-email-submit {
  font-family: var(--sc-font-heading);
  text-transform: uppercase;
  letter-spacing: 0.25em;
  font-size: 11px;
  font-weight: 600;
  background: white;
  color: black;
  padding: 14px 28px;
  border: none;
  cursor: pointer;
  min-height: 44px;
  transition: background 0.3s ease;
  white-space: nowrap;
}
.sc-email-submit:hover { background: #DDDDDD; }
.sc-email-micro {
  font-family: var(--sc-font-body);
  font-style: italic;
  font-size: 12px;
  color: #444;
  margin-top: 16px;
}
.sc-email-confirm {
  font-family: var(--sc-font-heading);
  text-transform: uppercase;
  letter-spacing: 0.25em;
  font-size: 12px;
  color: white;
  animation: fadeInNav 0.4s ease both;
}

/* ─── Footer ─── */
.sc-footer {
  width: 100%;
  background: #000;
  padding: 60px 40px 40px;
}
@media (max-width: 767px) {
  .sc-footer { padding: 40px 20px 30px; }
}
.sc-footer-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 40px;
  max-width: 1100px;
  margin: 0 auto;
}
@media (max-width: 767px) {
  .sc-footer-grid { grid-template-columns: 1fr; }
}
.sc-footer-col-header {
  font-family: var(--sc-font-heading);
  text-transform: uppercase;
  letter-spacing: 0.3em;
  font-size: 10px;
  color: #333;
  margin-bottom: 20px;
}
.sc-footer-link {
  display: block;
  font-family: var(--sc-font-heading);
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #555;
  text-decoration: none;
  padding: 6px 0;
  transition: color 0.2s ease;
  cursor: pointer;
}
.sc-footer-link:hover { color: white; }
.sc-footer-lang {
  font-family: var(--sc-font-heading);
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: #444;
  margin-top: 16px;
  margin-bottom: 20px;
}
.sc-footer-lang span { cursor: pointer; transition: color 0.2s ease; }
.sc-footer-lang span.sc-lang-active { color: white; }
.sc-footer-lang span:hover { color: white; }
.sc-footer-socials {
  display: flex;
  gap: 14px;
}
.sc-footer-socials a {
  transition: opacity 0.2s ease;
  min-width: 40px;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.sc-footer-socials a:hover { opacity: 0.5; }
.sc-footer-divider {
  width: 100%;
  height: 1px;
  background: #1A1A1A;
  margin: 40px 0;
  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;
}
.sc-footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1100px;
  margin: 0 auto;
  flex-wrap: wrap;
  gap: 12px;
}
.sc-footer-copy {
  font-family: var(--sc-font-heading);
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #444;
}
.sc-footer-top {
  font-family: var(--sc-font-heading);
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  color: #444;
  cursor: pointer;
  transition: color 0.2s ease;
  background: none;
  border: none;
}
.sc-footer-top:hover { color: white; }

/* ─── Mobile button overrides ─── */
@media (max-width: 767px) {
  .sc-btn-primary { width: 100%; min-height: 48px; text-align: center; }
  .sc-hero-h1 { font-size: clamp(12px, 5vw, 16px); }
}

/* ─── Parallax helper ─── */
.sc-parallax-bg {
  will-change: transform;
  transition: transform 0.1s linear;
}
`;

/* ─── Unsplash image URLs ─── */
const IMAGES = {
  hero: "https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=1920&q=80&auto=format&fit=crop",
  men: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&q=80&auto=format&fit=crop",
  women: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&q=80&auto=format&fit=crop",
  accessories: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80&auto=format&fit=crop",
  product1: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&q=80&auto=format&fit=crop",
  product2: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80&auto=format&fit=crop",
  product3: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80&auto=format&fit=crop",
  product4: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80&auto=format&fit=crop",
  fabric: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1920&q=80&auto=format&fit=crop",
  ugc1: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80&auto=format&fit=crop",
  ugc2: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80&auto=format&fit=crop",
  ugc3: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&q=80&auto=format&fit=crop",
  ugc4: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80&auto=format&fit=crop",
  ugc5: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80&auto=format&fit=crop",
};

const NAV_LINKS = [
  { label: "HOME", href: "#hero" },
  { label: "NEW ARRIVALS", href: "#products" },
  { label: "SHOP ALL", href: "#categories", subs: ["New Arrivals", "Best Sellers", "Sale"] },
  { label: "MEN", href: "#categories", subs: ["Tops", "Hoodies & Sweatshirts", "Outerwear", "Bottoms", "Essentials"] },
  { label: "WOMEN", href: "#categories", subs: ["Tops", "Hoodies & Sweatshirts", "Outerwear", "Bottoms", "Essentials"] },
  { label: "ACCESSORIES", href: "#categories", subs: ["Bags", "Headwear", "Socks & Underwear", "Small Leather Goods"] },
  { label: "BEST SELLERS", href: "#products" },
  { label: "OUR STORY", href: "#value" },
  { label: "SUSTAINABILITY", href: "#value" },
  { label: "SIZE GUIDE", href: "#value" },
  { label: "LOOKBOOK", href: "#ugc" },
  { label: "CONTACT", href: "#footer" },
];

const PRODUCTS = [
  { name: "SILENT HOODIE", sub: "Obsidian / Heavyweight Fleece", price: "$98.00", stars: "★★★★★ 4.9", img: IMAGES.product1 },
  { name: "CODE TEE", sub: "Ash Grey / 180gsm Cotton", price: "$52.00", stars: "★★★★★ 4.8", img: IMAGES.product2 },
  { name: "RECON CARGO", sub: "Slate / Ripstop Cotton Blend", price: "$124.00", stars: "★★★★☆ 4.7", img: IMAGES.product3 },
  { name: "VOID JACKET", sub: "Ink Black / Technical Shell", price: "$210.00", stars: "★★★★★ 4.9", img: IMAGES.product4 },
];

/* ─── Social Links Row ─── */
function SocialRow({ size = 18, gap = "16px" }: { size?: number; gap?: string }) {
  return (
    <div style={{ display: "flex", gap }}>
      <a href="#" aria-label="Instagram"><InstagramIcon size={size} /></a>
      <a href="#" aria-label="TikTok"><TikTokIcon size={size} /></a>
      <a href="#" aria-label="Pinterest"><PinterestIcon size={size} /></a>
      <a href="#" aria-label="X"><XIcon size={size} /></a>
      <a href="#" aria-label="YouTube"><YouTubeIcon size={size} /></a>
    </div>
  );
}

/* ─── Main Page Component ─── */
function SilentCodePage() {
  const [navOpen, setNavOpen] = useState(false);
  const [openSubs, setOpenSubs] = useState<Record<string, boolean>>({});
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleSub = useCallback((label: string) => {
    setOpenSubs(prev => ({ ...prev, [label]: !prev[label] }));
  }, []);

  const scrollToSection = useCallback((id: string) => {
    setNavOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, []);

  useEffect(() => {
    /* inject styles */
    const style = document.createElement("style");
    style.textContent = PAGE_CSS;
    document.head.appendChild(style);

    /* IntersectionObserver for fade-in */
    const targets = document.querySelectorAll(".sc-fade-target");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).classList.add("sc-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    targets.forEach((t, i) => {
      (t as HTMLElement).style.transitionDelay = `${(i % 6) * 80}ms`;
      observer.observe(t);
    });

    /* Sticky nav opacity */
    const onScroll = () => {
      const logo = document.querySelector(".sc-fixed-logo") as HTMLElement;
      const burger = document.querySelector(".sc-fixed-hamburger") as HTMLElement;
      if (logo && burger) {
        const o = window.scrollY > 80 ? "0.75" : "0.92";
        logo.style.opacity = o;
        burger.style.opacity = o;
      }

      /* Parallax */
      document.querySelectorAll(".sc-parallax-bg").forEach(el => {
        const rect = (el as HTMLElement).getBoundingClientRect();
        const offset = rect.top * 0.2;
        (el as HTMLElement).style.transform = `translateY(${offset}px)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      document.head.removeChild(style);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  /* Prevent body scroll when nav is open */
  useEffect(() => {
    document.body.style.overflow = navOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [navOpen]);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailSubmitted(true);
  };

  return (
    <div ref={containerRef}>
      {/* ─── Fixed Logo ─── */}
      <div className="sc-fixed-logo">
        <SilentCodeLogo />
      </div>

      {/* ─── Fixed Hamburger ─── */}
      <button
        className={`sc-fixed-hamburger ${navOpen ? "sc-hamburger-open" : ""}`}
        onClick={() => setNavOpen(!navOpen)}
        aria-label="Toggle navigation"
      >
        <span className="sc-hamburger-line" />
        <span className="sc-hamburger-line" />
        <span className="sc-hamburger-line" />
      </button>

      {/* ─── Nav Dimmer ─── */}
      <div className={`sc-nav-dimmer ${navOpen ? "sc-open" : ""}`} onClick={() => setNavOpen(false)} />

      {/* ─── Nav Panel ─── */}
      <nav className={`sc-nav-panel ${navOpen ? "sc-open" : ""}`}>
        <button className="sc-nav-close" onClick={() => setNavOpen(false)} aria-label="Close navigation">×</button>
        <div className="sc-nav-header">
          <SilentCodeLogo size="small" />
        </div>
        <div className="sc-nav-links">
          {NAV_LINKS.map(link => (
            <div key={link.label}>
              <button
                className="sc-nav-link"
                onClick={() => link.subs ? toggleSub(link.label) : scrollToSection(link.href.slice(1))}
              >
                <span>{link.label}</span>
                {link.subs && <span style={{ fontSize: "10px" }}>▾</span>}
              </button>
              {link.subs && (
                <div className={`sc-nav-sub ${openSubs[link.label] ? "sc-sub-open" : ""}`}>
                  {link.subs.map(sub => (
                    <span key={sub} className="sc-nav-sub-item" onClick={() => scrollToSection(link.href.slice(1))}>{sub}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="sc-nav-footer">
          <div className="sc-nav-socials">
            <SocialRow size={18} gap="16px" />
          </div>
          <div className="sc-nav-copyright">© 2026 SilentCode Studio — All rights reserved</div>
        </div>
      </nav>

      {/* ═══ SECTION 2 — HERO ═══ */}
      <section className="sc-hero" id="hero">
        <img src={IMAGES.hero} alt="Dark fashion editorial" className="sc-hero-bg" />
        <div className="sc-hero-overlay" />
        <div className="sc-hero-content">
          <div className="sc-hero-line" />
          <div className="sc-hero-sublabel">SS 2025 COLLECTION</div>
          <h1 className="sc-hero-h1">SILENCE IS THE LOUDEST STATEMENT.</h1>
          <div style={{ marginTop: "40px" }}>
            <button className="sc-btn-primary" onClick={() => scrollToSection("products")}>SHOP NEW ARRIVALS</button>
          </div>
          <div style={{ marginTop: "20px" }}>
            <button className="sc-link-secondary" onClick={() => scrollToSection("email")}>
              GET 15% OFF YOUR FIRST ORDER →
            </button>
          </div>
        </div>
        <div className="sc-scroll-indicator">
          <div className="sc-scroll-text">Scroll</div>
          <div className="sc-scroll-line" />
        </div>
      </section>

      {/* ═══ SECTION 3 — CATEGORIES ═══ */}
      <section className="sc-categories" id="categories">
        <div className="sc-section-label sc-fade-target" style={{ marginBottom: "50px" }}>SHOP BY CATEGORY</div>
        <div className="sc-cat-grid">
          {[
            { label: "MEN", cta: "EXPLORE MEN →", img: IMAGES.men },
            { label: "WOMEN", cta: "EXPLORE WOMEN →", img: IMAGES.women },
            { label: "ACCESSORIES", cta: "EXPLORE ACCESSORIES →", img: IMAGES.accessories },
          ].map(cat => (
            <div key={cat.label} className="sc-cat-tile sc-fade-target">
              <img src={cat.img} alt={cat.label} loading="lazy" />
              <div className="sc-cat-overlay" />
              <div className="sc-cat-content">
                <div className="sc-cat-label">{cat.label}</div>
                <span className="sc-cat-cta">{cat.cta}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="sc-shop-all-banner sc-fade-target" onClick={() => scrollToSection("products")}>
          <div className="sc-shop-all-line" />
          <div className="sc-shop-all-text">VIEW THE FULL COLLECTION</div>
          <div className="sc-shop-all-line" />
        </div>
      </section>

      {/* ═══ SECTION 4 — BEST SELLERS ═══ */}
      <section className="sc-products" id="products">
        <div className="sc-section-label sc-fade-target">MOST WANTED</div>
        <h2 className="sc-section-h2 sc-fade-target">THE ESSENTIALS</h2>
        <p className="sc-section-body sc-fade-target">Our highest-rated, fastest-selling pieces. Updated each season.</p>
        <div className="sc-prod-grid">
          {PRODUCTS.map(p => (
            <div key={p.name} className="sc-prod-card sc-fade-target">
              <div className="sc-prod-img-wrap">
                <img src={p.img} alt={p.name} loading="lazy" />
                <button className="sc-prod-add-btn">ADD TO BAG</button>
              </div>
              <div className="sc-prod-info">
                <div className="sc-prod-stars">{p.stars}</div>
                <div className="sc-prod-name">{p.name}</div>
                <div className="sc-prod-sub">{p.sub}</div>
                <div className="sc-prod-price">{p.price}</div>
                <button className="sc-prod-quick">QUICK ADD →</button>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "60px" }} className="sc-fade-target">
          <button className="sc-btn-primary">SHOP ALL BEST SELLERS</button>
          <p style={{ fontFamily: "var(--sc-font-body)", fontSize: "13px", fontStyle: "italic", color: "#666", marginTop: "14px" }}>
            Rated 4.8 / 5 by over 2,400 customers
          </p>
        </div>
      </section>

      {/* ═══ SECTION 5 — VALUE PROPOSITION ═══ */}
      <section className="sc-value" id="value">
        <img src={IMAGES.fabric} alt="" className="sc-value-bg sc-parallax-bg" aria-hidden="true" />
        <div className="sc-value-content">
          <div className="sc-section-label sc-fade-target" style={{ letterSpacing: "0.45em" }}>THE SILENTCODE DIFFERENCE</div>
          <h2 className="sc-value-h2 sc-fade-target">BUILT FOR THOSE WHO PREFER ACTIONS OVER WORDS.</h2>
          <p className="sc-value-body sc-fade-target">
            Every SilentCode piece begins as a sketch on paper — then it becomes a conversation between a fabric supplier,
            a pattern cutter, and a small factory. No shortcuts. No fast fashion. Just considered design for people who know the difference.
          </p>
          <div className="sc-benefits-grid">
            {[
              { icon: <PackageIcon />, label: "FREE SHIPPING", sub: "On all orders over $100" },
              { icon: <ExchangeIcon />, label: "FREE EXCHANGES", sub: "Hassle-free within 30 days" },
              { icon: <LeafIcon />, label: "RESPONSIBLE MATERIALS", sub: "GOTS-certified organic cotton" },
              { icon: <RulerIcon />, label: "TAILORED SIZING", sub: "XS to 4XL in every style" },
            ].map(b => (
              <div key={b.label} className="sc-benefit sc-fade-target">
                {b.icon}
                <div className="sc-benefit-label">{b.label}</div>
                <div className="sc-benefit-sub">{b.sub}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "60px", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }} className="sc-fade-target">
            <a href="#" className="sc-link-underline">LEARN OUR STORY →</a>
            <a href="#" className="sc-link-underline">SEE OUR SUSTAINABILITY IMPACT →</a>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 6 — UGC ═══ */}
      <section className="sc-ugc" id="ugc">
        <div className="sc-section-label sc-fade-target">AS SEEN IN THE WILD</div>
        <h2 className="sc-section-h2 sc-fade-target">WEAR IT YOUR WAY</h2>
        <p className="sc-section-body sc-fade-target">Tag @silentcode on Instagram to be featured.</p>
        <div className="sc-ugc-grid">
          {[IMAGES.ugc1, IMAGES.ugc2, IMAGES.ugc3, IMAGES.ugc4, IMAGES.ugc5].map((img, i) => (
            <div key={i} className="sc-ugc-tile sc-fade-target" onClick={() => scrollToSection("products")}>
              <img src={img} alt={`Street style ${i + 1}`} loading="lazy" />
              <div className="sc-ugc-hover">
                <span className="sc-ugc-hover-text">SHOP THE LOOK</span>
                <InstagramMiniIcon />
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "50px" }} className="sc-fade-target">
          <button className="sc-btn-primary">FOLLOW @SILENTCODE</button>
          <p style={{ fontFamily: "var(--sc-font-body)", fontSize: "13px", color: "#555", marginTop: "14px" }}>
            Join 84,000 followers on Instagram
          </p>
        </div>
      </section>

      {/* ═══ SECTION 7 — EMAIL CAPTURE ═══ */}
      <section className="sc-email" id="email">
        <img src={IMAGES.fabric} alt="" className="sc-email-bg sc-parallax-bg" aria-hidden="true" />
        <div className="sc-email-content">
          <div className="sc-section-label sc-fade-target" style={{ letterSpacing: "0.45em" }}>JOIN THE CLUB</div>
          <h2 className="sc-email-h2 sc-fade-target">FIRST TO KNOW. FIRST TO WEAR.</h2>
          <p className="sc-email-body sc-fade-target">
            Sign up for early access to new drops, exclusive member discounts, and behind-the-scenes content from the studio.
          </p>
          {!emailSubmitted ? (
            <form className="sc-email-row sc-fade-target" onSubmit={handleEmailSubmit}>
              <input type="email" className="sc-email-input" placeholder="Your email address" required />
              <button type="submit" className="sc-email-submit">GET EARLY ACCESS</button>
            </form>
          ) : (
            <div className="sc-email-confirm" style={{ marginTop: "44px" }}>
              YOU'RE IN. WELCOME TO THE CLUB.
            </div>
          )}
          {!emailSubmitted && <p className="sc-email-micro sc-fade-target">No spam, just style. Unsubscribe anytime.</p>}
        </div>
      </section>

      {/* ═══ SECTION 8 — FOOTER ═══ */}
      <footer className="sc-footer" id="footer">
        <div className="sc-footer-grid">
          <div>
            <SilentCodeLogo size="small" />
            <div className="sc-footer-lang">
              <span className="sc-lang-active">EN</span> | <span>DE</span> | <span>FR</span>
            </div>
            <div className="sc-footer-socials">
              <SocialRow size={16} gap="14px" />
            </div>
          </div>
          <div>
            <div className="sc-footer-col-header">SHOP</div>
            {["New Arrivals", "Men", "Women", "Accessories", "Best Sellers", "Sale"].map(l => (
              <span key={l} className="sc-footer-link">{l}</span>
            ))}
          </div>
          <div>
            <div className="sc-footer-col-header">BRAND</div>
            {["Our Story", "Sustainability", "Lookbook", "Size Guide", "Press Room", "Contact"].map(l => (
              <span key={l} className="sc-footer-link">{l}</span>
            ))}
          </div>
        </div>
        <div className="sc-footer-divider" />
        <div className="sc-footer-bottom">
          <div className="sc-footer-copy">© 2026 SilentCode Studio — All rights reserved — studio@silentcode.com</div>
          <button className="sc-footer-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>BACK TO TOP ↑</button>
        </div>
      </footer>
    </div>
  );
}
