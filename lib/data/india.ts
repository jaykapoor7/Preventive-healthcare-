/**
 * A tile-grid cartogram of India. Positions are stylised (not geographically
 * exact) so the map reads as calm visual storytelling rather than a precise
 * atlas. The metrics below are ILLUSTRATIVE composites for an educational
 * product demo — they are not official statistics and should not be cited.
 */

export type StateMetric = {
  id: string;
  name: string;
  short: string;
  row: number;
  col: number;
  literacy: number; // health-literacy composite, 0-100
  preventive: number; // preventive-engagement composite, 0-100
  awareness: number; // prevention-awareness composite, 0-100
  note: string;
};

export const indiaStates: StateMetric[] = [
  { id: "JK", name: "Jammu & Kashmir", short: "J&K", row: 0, col: 2, literacy: 64, preventive: 58, awareness: 61, note: "Mountain geography shapes how prevention messaging travels." },
  { id: "LA", name: "Ladakh", short: "LA", row: 0, col: 3, literacy: 62, preventive: 55, awareness: 60, note: "Sparse population, high reliance on travelling health camps." },
  { id: "PB", name: "Punjab", short: "PB", row: 1, col: 1, literacy: 71, preventive: 66, awareness: 68, note: "Strong primary-care presence; lifestyle screening is a focus." },
  { id: "HP", name: "Himachal Pradesh", short: "HP", row: 1, col: 2, literacy: 78, preventive: 72, awareness: 74, note: "High literacy correlates with steady preventive engagement." },
  { id: "UK", name: "Uttarakhand", short: "UK", row: 1, col: 3, literacy: 73, preventive: 64, awareness: 69, note: "Hill districts and plains show different awareness patterns." },
  { id: "SK", name: "Sikkim", short: "SK", row: 1, col: 6, literacy: 81, preventive: 76, awareness: 79, note: "Small state, notably high public-health engagement." },
  { id: "AR", name: "Arunachal Pradesh", short: "AR", row: 1, col: 7, literacy: 66, preventive: 57, awareness: 62, note: "Remote terrain makes navigation literacy especially valuable." },
  { id: "RJ", name: "Rajasthan", short: "RJ", row: 2, col: 0, literacy: 63, preventive: 56, awareness: 60, note: "Vast rural spread; mobile prevention drives matter most." },
  { id: "HR", name: "Haryana", short: "HR", row: 2, col: 1, literacy: 72, preventive: 65, awareness: 68, note: "Urban clusters lift average preventive engagement." },
  { id: "DL", name: "Delhi", short: "DL", row: 2, col: 2, literacy: 84, preventive: 79, awareness: 82, note: "Dense access, yet navigation confidence still varies widely." },
  { id: "UP", name: "Uttar Pradesh", short: "UP", row: 2, col: 3, literacy: 61, preventive: 53, awareness: 57, note: "Largest population — small literacy gains scale enormously." },
  { id: "BR", name: "Bihar", short: "BR", row: 2, col: 4, literacy: 58, preventive: 50, awareness: 54, note: "High-leverage region for patient-literacy investment." },
  { id: "AS", name: "Assam", short: "AS", row: 2, col: 6, literacy: 69, preventive: 60, awareness: 64, note: "River geography influences seasonal access to care." },
  { id: "NL", name: "Nagaland", short: "NL", row: 2, col: 7, literacy: 70, preventive: 61, awareness: 65, note: "Community networks are strong channels for awareness." },
  { id: "GJ", name: "Gujarat", short: "GJ", row: 3, col: 0, literacy: 74, preventive: 68, awareness: 71, note: "Established preventive-care programmes in many districts." },
  { id: "MP", name: "Madhya Pradesh", short: "MP", row: 3, col: 2, literacy: 64, preventive: 56, awareness: 60, note: "Central heartland with wide urban–rural variation." },
  { id: "JH", name: "Jharkhand", short: "JH", row: 3, col: 4, literacy: 60, preventive: 52, awareness: 56, note: "Tribal-belt outreach is central to awareness gains." },
  { id: "WB", name: "West Bengal", short: "WB", row: 3, col: 5, literacy: 72, preventive: 64, awareness: 68, note: "Dense delta population; strong community health workforce." },
  { id: "ML", name: "Meghalaya", short: "ML", row: 3, col: 6, literacy: 71, preventive: 62, awareness: 66, note: "Hilly access shapes how often checkups happen." },
  { id: "MN", name: "Manipur", short: "MN", row: 3, col: 7, literacy: 73, preventive: 63, awareness: 67, note: "Valley and hill districts differ in prevention reach." },
  { id: "MH", name: "Maharashtra", short: "MH", row: 4, col: 1, literacy: 79, preventive: 73, awareness: 76, note: "Major metros pull preventive engagement upward." },
  { id: "CG", name: "Chhattisgarh", short: "CG", row: 4, col: 3, literacy: 62, preventive: 54, awareness: 58, note: "Forest districts rely on outreach for awareness." },
  { id: "OD", name: "Odisha", short: "OD", row: 4, col: 4, literacy: 67, preventive: 59, awareness: 63, note: "Coastal and inland districts show distinct patterns." },
  { id: "TR", name: "Tripura", short: "TR", row: 4, col: 6, literacy: 75, preventive: 66, awareness: 70, note: "Compact state with steady literacy momentum." },
  { id: "MZ", name: "Mizoram", short: "MZ", row: 4, col: 7, literacy: 83, preventive: 75, awareness: 79, note: "Among the highest literacy composites nationally." },
  { id: "GA", name: "Goa", short: "GA", row: 5, col: 1, literacy: 85, preventive: 78, awareness: 81, note: "Small, well-connected, high preventive engagement." },
  { id: "TG", name: "Telangana", short: "TG", row: 5, col: 3, literacy: 73, preventive: 67, awareness: 70, note: "Hyderabad anchors strong digital-health adoption." },
  { id: "AP", name: "Andhra Pradesh", short: "AP", row: 5, col: 4, literacy: 70, preventive: 63, awareness: 66, note: "Statewide health schemes shape preventive habits." },
  { id: "KA", name: "Karnataka", short: "KA", row: 6, col: 2, literacy: 77, preventive: 71, awareness: 74, note: "Bengaluru lifts averages; rural gaps remain." },
  { id: "KL", name: "Kerala", short: "KL", row: 7, col: 2, literacy: 92, preventive: 86, awareness: 89, note: "A reference point for health literacy in India." },
  { id: "TN", name: "Tamil Nadu", short: "TN", row: 7, col: 3, literacy: 81, preventive: 76, awareness: 78, note: "Robust public-health system with deep reach." },
];

export type MapMetricKey = "literacy" | "preventive" | "awareness";

export const mapMetrics: { key: MapMetricKey; label: string; description: string }[] = [
  { key: "literacy", label: "Health literacy", description: "How confidently people read and act on health information." },
  { key: "preventive", label: "Preventive engagement", description: "How often people take preventive steps before symptoms." },
  { key: "awareness", label: "Prevention awareness", description: "How visible prevention is in everyday decisions." },
];

export const indiaInsights = [
  {
    title: "Literacy compounds",
    body: "States with higher health literacy tend to show steadier preventive engagement — understanding precedes action.",
  },
  {
    title: "Access ≠ confidence",
    body: "Even dense, well-served regions show wide variation in how confidently people navigate care.",
  },
  {
    title: "Small gains, large scale",
    body: "In the most populous states, modest literacy improvements reach tens of millions of people.",
  },
];
