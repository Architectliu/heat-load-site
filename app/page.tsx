'use client';

import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
type IconProps = { className?: string };

function IconBase({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function ArrowLeft({ className }: IconProps) {
  return <IconBase className={className}><path d="M19 12H5" /><path d="M12 19l-7-7 7-7" /></IconBase>;
}

function Building2({ className }: IconProps) {
  return <IconBase className={className}><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18" /><path d="M6 12H4a2 2 0 0 0-2 2v8" /><path d="M18 9h2a2 2 0 0 1 2 2v11" /><path d="M10 6h4" /><path d="M10 10h4" /><path d="M10 14h4" /></IconBase>;
}

function ChevronDown({ className }: IconProps) {
  return <IconBase className={className}><path d="M6 9l6 6 6-6" /></IconBase>;
}

function ChevronRight({ className }: IconProps) {
  return <IconBase className={className}><path d="M9 18l6-6-6-6" /></IconBase>;
}

function Layers3({ className }: IconProps) {
  return <IconBase className={className}><path d="M12 2 2 7l10 5 10-5-10-5Z" /><path d="m2 17 10 5 10-5" /><path d="m2 12 10 5 10-5" /></IconBase>;
}

function Plus({ className }: IconProps) {
  return <IconBase className={className}><path d="M12 5v14" /><path d="M5 12h14" /></IconBase>;
}

function Power({ className }: IconProps) {
  return <IconBase className={className}><path d="M12 2v10" /><path d="M18.4 6.6a9 9 0 1 1-12.8 0" /></IconBase>;
}

function SunMedium({ className }: IconProps) {
  return <IconBase className={className}><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" /></IconBase>;
}

function Trash2({ className }: IconProps) {
  return <IconBase className={className}><path d="M3 6h18" /><path d="M8 6V4h8v2" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6" /><path d="M14 11v6" /></IconBase>;
}

function WandSparkles({ className }: IconProps) {
  return <IconBase className={className}><path d="m21.6 12.4-9.2 9.2-2.8-2.8 9.2-9.2 2.8 2.8Z" /><path d="M14 6l1-3 1 3 3 1-3 1-1 3-1-3-3-1 3-1Z" /><path d="M5 3l.6 1.8L7.5 5.4l-1.9.6L5 8l-.6-2-1.9-.6 1.9-.6L5 3Z" /></IconBase>;
}

function Zap({ className }: IconProps) {
  return <IconBase className={className}><path d="M13 2 3 14h8l-1 8 11-14h-8l1-6Z" /></IconBase>;
}

const programCategories = {
  residential: {
    name: 'Residential',
    spaces: {
      apartment: { name: 'Apartment Unit', heatingBase: 42, coolingBase: 85 },
      bedroom: { name: 'Bedroom', heatingBase: 40, coolingBase: 78 },
      livingRoom: { name: 'Living Room', heatingBase: 43, coolingBase: 88 },
      corridor: { name: 'Residential Corridor', heatingBase: 30, coolingBase: 45 },
      lobby: { name: 'Residential Lobby', heatingBase: 36, coolingBase: 70 },
    },
  },
  office: {
    name: 'Office',
    spaces: {
      openOffice: { name: 'Open Office', heatingBase: 60, coolingBase: 100 },
      privateOffice: { name: 'Private Office', heatingBase: 56, coolingBase: 92 },
      meeting: { name: 'Meeting Room', heatingBase: 60, coolingBase: 110 },
      conference: { name: 'Conference Room', heatingBase: 62, coolingBase: 120 },
      reception: { name: 'Reception / Lobby', heatingBase: 58, coolingBase: 95 },
      server: { name: 'Server / IT Room', heatingBase: 24, coolingBase: 180 },
    },
  },
  hotel: {
    name: 'Hotel',
    spaces: {
      guestroom: { name: 'Guestroom', heatingBase: 52, coolingBase: 85 },
      suite: { name: 'Suite', heatingBase: 55, coolingBase: 95 },
      lobby: { name: 'Hotel Lobby', heatingBase: 58, coolingBase: 105 },
      ballroom: { name: 'Ballroom / Banquet', heatingBase: 62, coolingBase: 125 },
      restaurant: { name: 'Hotel Restaurant', heatingBase: 60, coolingBase: 120 },
      kitchen: { name: 'Commercial Kitchen', heatingBase: 45, coolingBase: 180 },
      laundry: { name: 'Laundry', heatingBase: 48, coolingBase: 140 },
    },
  },
  retail: {
    name: 'Retail / Commercial',
    spaces: {
      shop: { name: 'Retail Shop', heatingBase: 63, coolingBase: 130 },
      supermarket: { name: 'Supermarket', heatingBase: 60, coolingBase: 150 },
      mallAtrium: { name: 'Mall Atrium', heatingBase: 70, coolingBase: 145 },
      restaurant: { name: 'Restaurant Dining', heatingBase: 68, coolingBase: 145 },
      kitchen: { name: 'Food Prep Kitchen', heatingBase: 48, coolingBase: 185 },
    },
  },
  education: {
    name: 'Education',
    spaces: {
      classroom: { name: 'Classroom', heatingBase: 60, coolingBase: 100 },
      lectureHall: { name: 'Lecture Hall', heatingBase: 64, coolingBase: 120 },
      library: { name: 'Library Reading Room', heatingBase: 56, coolingBase: 85 },
      scienceLab: { name: 'Science Lab', heatingBase: 62, coolingBase: 135 },
      studio: { name: 'Design Studio', heatingBase: 60, coolingBase: 105 },
    },
  },
  healthcare: {
    name: 'Healthcare',
    spaces: {
      ward: { name: 'Patient Ward', heatingBase: 63, coolingBase: 100 },
      clinic: { name: 'Consultation Room', heatingBase: 60, coolingBase: 95 },
      operating: { name: 'Operating Room', heatingBase: 70, coolingBase: 150 },
      lab: { name: 'Medical Laboratory', heatingBase: 66, coolingBase: 135 },
      lobby: { name: 'Healthcare Lobby', heatingBase: 60, coolingBase: 105 },
    },
  },
  culture: {
    name: 'Culture / Assembly',
    spaces: {
      museumGallery: { name: 'Museum Gallery', heatingBase: 88, coolingBase: 120 },
      exhibition: { name: 'Exhibition Hall', heatingBase: 93, coolingBase: 140 },
      theater: { name: 'Theater / Auditorium', heatingBase: 100, coolingBase: 155 },
      foyer: { name: 'Foyer', heatingBase: 85, coolingBase: 115 },
    },
  },
  sports: {
    name: 'Sports / Recreation',
    spaces: {
      fitness: { name: 'Fitness Room', heatingBase: 120, coolingBase: 160 },
      gymnasium: { name: 'Gymnasium', heatingBase: 115, coolingBase: 145 },
      natatorium: { name: 'Natatorium / Pool Hall', heatingBase: 135, coolingBase: 170 },
      locker: { name: 'Locker / Shower', heatingBase: 110, coolingBase: 130 },
    },
  },
  transport: {
    name: 'Transport / Public Service',
    spaces: {
      terminalHall: { name: 'Terminal Hall', heatingBase: 65, coolingBase: 120 },
      waitingHall: { name: 'Waiting Hall', heatingBase: 62, coolingBase: 110 },
      security: { name: 'Security Screening', heatingBase: 64, coolingBase: 115 },
      concourse: { name: 'Concourse', heatingBase: 58, coolingBase: 95 },
    },
  },
  industrial: {
    name: 'Industrial / Logistics',
    spaces: {
      workshopLight: { name: 'Light Manufacturing', heatingBase: 60, coolingBase: 130 },
      workshopHeavy: { name: 'Heavy Manufacturing', heatingBase: 75, coolingBase: 170 },
      warehouse: { name: 'Warehouse', heatingBase: 40, coolingBase: 60 },
      cleanroom: { name: 'Cleanroom', heatingBase: 70, coolingBase: 200 },
    },
  },
  dataCenter: {
    name: 'Data Center / High-Tech',
    spaces: {
      whiteSpace: { name: 'Server White Space', heatingBase: 10, coolingBase: 2500 },
      ups: { name: 'UPS / Electrical Room', heatingBase: 12, coolingBase: 800 },
      network: { name: 'Network Room', heatingBase: 12, coolingBase: 1500 },
      supportOffice: { name: 'Support Office', heatingBase: 50, coolingBase: 85 },
    },
  },
} as const;

const climateGroups = {
  cold: {
    label: 'Cold (Zone 5–7)',
    cities: 'Chicago · Toronto · Montreal · Stockholm · Oslo · Moscow · Beijing · Seoul',
    heatingFactor: 1.35,
    coolingFactor: 0.9,
    summary: 'Long, harsh winters dominate—heating is the primary demand.',
  },
  mixed: {
    label: 'Mixed (Zone 3–4)',
    cities: 'New York City · London · Paris · Berlin · Tokyo · Shanghai · Madrid · Rome',
    heatingFactor: 1.0,
    coolingFactor: 1.0,
    summary: 'Balanced seasons—both heating and cooling are required.',
  },
  hotHumid: {
    label: 'Hot-Humid (Zone 1–2)',
    cities: 'Miami · Singapore · Bangkok · Kuala Lumpur · Jakarta · Hong Kong · Guangzhou · Rio de Janeiro',
    heatingFactor: 0.8,
    coolingFactor: 1.35,
    summary: 'High temperature and humidity—cooling and dehumidification are critical.',
  },
  hotDry: {
    label: 'Hot-Dry',
    cities: 'Phoenix · Los Angeles · Dubai · Riyadh · Cairo · Tehran · Mexico City · Perth',
    heatingFactor: 0.9,
    coolingFactor: 1.2,
    summary: 'High temperature with low humidity—cooling dominates with minimal moisture control.',
  },
} as const;

const ceilingOptions = {
  standard: { metricName: 'Standard (2.6–3.0 m)', imperialName: 'Standard (8.5–10 ft)', heatingFactor: 1.0, coolingFactor: 1.0 },
  medium: { metricName: 'Medium (3.0–4.0 m)', imperialName: 'Medium (10–13 ft)', heatingFactor: 1.08, coolingFactor: 1.06 },
  high: { metricName: 'High (4.0–6.0 m)', imperialName: 'High (13–20 ft)', heatingFactor: 1.18, coolingFactor: 1.12 },
  veryHigh: { metricName: 'Very High (>6.0 m)', imperialName: 'Very High (>20 ft)', heatingFactor: 1.3, coolingFactor: 1.2 },
} as const;

const wwrOptions = {
  low: { name: '< 20%', heatingFactor: 0.95, coolingFactor: 0.85, summary: 'Lower glazing ratio, lower solar cooling impact.' },
  baseline: { name: '20–40%', heatingFactor: 1.0, coolingFactor: 1.0, summary: 'Balanced façade condition.' },
  medium: { name: '40–60%', heatingFactor: 1.2, coolingFactor: 1.3, summary: 'Higher envelope sensitivity.' },
  high: { name: '> 60%', heatingFactor: 1.45, coolingFactor: 1.75, summary: 'Cooling demand becomes much more façade-driven.' },
} as const;

const shadingOptions = {
  none: { name: 'None', heatingFactor: 1.0, coolingFactor: 1.0, summary: 'No solar protection.' },
  internal: { name: 'Internal (curtain)', heatingFactor: 1.0, coolingFactor: 0.925, summary: 'Moderate cooling reduction.' },
  external: { name: 'External (louver)', heatingFactor: 1.0, coolingFactor: 0.775, summary: 'Strong façade-side cooling reduction.' },
  dynamic: { name: 'Dynamic shading', heatingFactor: 1.0, coolingFactor: 0.7, summary: 'Highest adaptive shading effect.' },
} as const;

const envelopeOptions = {
  poor: { name: 'Poor (old building)', heatingFactor: 1.45, coolingFactor: 1.15, summary: 'Weak insulation and envelope performance.' },
  standard: { name: 'Standard (code)', heatingFactor: 1.0, coolingFactor: 1.0, summary: 'Reference baseline condition.' },
  highPerformance: { name: 'High-performance', heatingFactor: 0.7, coolingFactor: 0.85, summary: 'Improved envelope reduces peak loads.' },
} as const;

const airOptions = {
  tight: { name: 'Tight (0.1–0.3 ACH)', heatingFactor: 0.8, coolingFactor: 0.85, summary: 'Low infiltration, lower sensible load.' },
  typical: { name: 'Typical (0.3–0.7 ACH)', heatingFactor: 1.0, coolingFactor: 1.0, summary: 'Reference ventilation condition.' },
  leaky: { name: 'Leaky (>1.0 ACH)', heatingFactor: 1.35, coolingFactor: 1.2, summary: 'Higher infiltration drives heating and cooling upward.' },
  highVent: { name: 'High ventilation (lab / hospital)', heatingFactor: 1.65, coolingFactor: 1.9, summary: 'Outdoor air handling becomes a major system driver.' },
} as const;

const internalGainOptions = {
  low: { name: 'Low (residential)', heatingFactor: 1.15, coolingFactor: 0.85, summary: 'Low internal load, comfort-led condition.' },
  medium: { name: 'Medium (office)', heatingFactor: 1.0, coolingFactor: 1.0, summary: 'Reference internal load condition.' },
  high: { name: 'High (commercial)', heatingFactor: 0.85, coolingFactor: 1.35, summary: 'Higher plug, lighting, and occupancy gains.' },
  extreme: { name: 'Extreme (kitchen / data center)', heatingFactor: 0.65, coolingFactor: 2.25, summary: 'High-intensity cooling case.' },
} as const;

type ProgramCategoryKey = keyof typeof programCategories;
type ClimateKey = keyof typeof climateGroups;
type CeilingKey = keyof typeof ceilingOptions;
type WwrKey = keyof typeof wwrOptions;
type ShadingKey = keyof typeof shadingOptions;
type EnvelopeKey = keyof typeof envelopeOptions;
type AirKey = keyof typeof airOptions;
type InternalGainKey = keyof typeof internalGainOptions;
type UnitSystem = 'metric' | 'imperial';
type AppView = 'load' | 'strategy';
type SourceRank = 'recommended' | 'possible' | 'lessLikely';

type BuildingEntry = {
  id: string;
  customName: string;
  enabled: boolean;
  category: ProgramCategoryKey;
  space: string;
  quantity: number;
  area: number;
  ceiling: CeilingKey;
  wwr: WwrKey;
  shading: ShadingKey;
  envelope: EnvelopeKey;
  air: AirKey;
  internalGain: InternalGainKey;
};

type CalculatedEntry = BuildingEntry & {
  categoryName: string;
  spaceName: string;
  totalArea: number;
  heatingPerSqm: number;
  coolingPerSqm: number;
  totalHeating: number;
  totalCooling: number;
};

type ScaleBand = 'small' | 'midSmall' | 'medium' | 'large' | 'extraLarge';
type LoadIntensity = 'normal' | 'elevated' | 'high' | 'extreme';

type EnergySource = {
  name: string;
  reason: string;
  systems: string[];
};

type StrategyCard = {
  title: string;
  systems: string;
  reason: string;
};

type StrategyResult = {
  buildingReading: string;
  scaleBand: ScaleBand;
  loadIntensity: LoadIntensity;
  sources: Record<SourceRank, EnergySource[]>;
  primary: StrategyCard;
  alternatives: StrategyCard[];
  notRecommended: StrategyCard[];
};

type SiteSourceAvailability = {
  airSource: boolean;
  surfaceWater: boolean;
  groundSource: boolean;
  wastewater: boolean;
  industrialWasteHeat: boolean;
  exhaustHeatRecovery: boolean;
  districtNetwork: boolean;
};

type StrategyForm = {
  buildingType: ProgramCategoryKey;
  grossArea: number;
  totalHeating: number;
  totalCooling: number;
  heatingPerArea: number;
  coolingPerArea: number;
  climate: ClimateKey;
  ventilation: AirKey;
  envelope: EnvelopeKey;
  wwr: WwrKey;
  shading: ShadingKey;
  ceiling: CeilingKey;
  internalGain: InternalGainKey;
  spaceCount: number;
  highComfort: boolean;
  siteSources: SiteSourceAvailability;
};

const SQFT_PER_SQM = 10.7639;

const sourceSystemMap = {
  air: ['Split Heat Pump', 'Multi-Split System', 'VRF Heat Pump System', 'VRF Heat Recovery System', 'Packaged Rooftop Heat Pump', 'Air-to-Water Heat Pump'],
  surfaceWater: ['Water-to-Water Heat Pump', 'Water Loop Heat Pump System', 'Central Plant Heat Pump System', 'District Heat Pump System'],
  ground: ['Water-to-Water Heat Pump', 'Water Loop Heat Pump System', 'Central Plant Heat Pump System'],
  wastewater: ['Water-to-Water Heat Pump', 'Central Plant Heat Pump System', 'Domestic Hot Water Heat Recovery System'],
  industrialWasteHeat: ['Water-to-Water Heat Pump', 'Central Plant Heat Pump System', 'District Heat Pump System'],
  exhaustAir: ['Air-to-Air Heat Recovery', 'DOAS + Heat Pump', 'Packaged Rooftop Heat Pump', 'Central Air Handling System', 'Air-to-Water Heat Pump as auxiliary'],
  district: ['District Heat Pump System', 'Central Plant Heat Pump System', 'Water Loop Heat Pump System', 'Heat Exchanger Interface'],
};

function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max);
}

function displayArea(areaInSqm: number, unitSystem: UnitSystem) {
  if (unitSystem === 'imperial') return `${Math.round(areaInSqm * SQFT_PER_SQM).toLocaleString()} ft²`;
  return `${Math.round(areaInSqm).toLocaleString()} m²`;
}

function parseAreaInput(rawValue: string, unitSystem: UnitSystem) {
  const numeric = Number(rawValue);
  if (!Number.isFinite(numeric) || numeric <= 0) return 0;
  return unitSystem === 'imperial' ? numeric / SQFT_PER_SQM : numeric;
}

function formatOutputValue(value: number, unit: 'm²' | 'W/m²' | 'W', unitSystem: UnitSystem) {
  if (unit === 'm²') {
    return unitSystem === 'imperial'
      ? { main: Math.round(value * SQFT_PER_SQM).toLocaleString(), primaryUnit: 'ft²' }
      : { main: Math.round(value).toLocaleString(), primaryUnit: 'm²' };
  }

  if (unit === 'W/m²') {
    return unitSystem === 'imperial'
      ? { main: (value / SQFT_PER_SQM).toFixed(1), primaryUnit: 'W/ft²', secondary: `${Math.round(value).toLocaleString()} W/m²` }
      : { main: Math.round(value).toLocaleString(), primaryUnit: 'W/m²' };
  }

  if (value >= 10000) {
    return { main: (value / 1000).toFixed(1), primaryUnit: 'kW', secondary: `${Math.round(value).toLocaleString()} W` };
  }

  return { main: Math.round(value).toLocaleString(), primaryUnit: 'W' };
}

function makeEntry(id: number): BuildingEntry {
  return {
    id: `entry-${id}`,
    customName: `Space ${id}`,
    enabled: true,
    category: 'residential',
    space: 'apartment',
    quantity: 1,
    area: 100,
    ceiling: 'standard',
    wwr: 'baseline',
    shading: 'none',
    envelope: 'standard',
    air: 'typical',
    internalGain: 'medium',
  };
}

function classifyScale(totalCooling: number): ScaleBand {
  if (totalCooling < 35000) return 'small';
  if (totalCooling < 120000) return 'midSmall';
  if (totalCooling < 450000) return 'medium';
  if (totalCooling < 2000000) return 'large';
  return 'extraLarge';
}

function classifyLoadIntensity(coolingPerArea: number): LoadIntensity {
  if (coolingPerArea < 90) return 'normal';
  if (coolingPerArea < 160) return 'elevated';
  if (coolingPerArea < 280) return 'high';
  return 'extreme';
}

function scaleLabel(scaleBand: ScaleBand) {
  return {
    small: 'Small Load',
    midSmall: 'Small to Medium Load',
    medium: 'Medium Load',
    large: 'Large Load',
    extraLarge: 'Extra Large Load',
  }[scaleBand];
}

function addSource(bucket: Record<SourceRank, EnergySource[]>, rank: SourceRank, source: EnergySource) {
  if (!bucket[rank].some((item) => item.name === source.name)) bucket[rank].push(source);
}

function generateHeatPumpStrategy(form: StrategyForm): StrategyResult {
  const scaleBand = classifyScale(form.totalCooling);
  const loadIntensity = classifyLoadIntensity(form.coolingPerArea);
  const site = form.siteSources;
  const highVentilation = form.ventilation === 'highVent' || form.ventilation === 'leaky';
  const mediumVentilation = form.ventilation === 'typical';
  const highZoning = form.spaceCount >= 6 || ['hotel', 'residential', 'healthcare'].includes(form.buildingType);
  const highInternalGain = form.buildingType === 'dataCenter' || form.internalGain === 'extreme' || loadIntensity === 'high' || loadIntensity === 'extreme';
  const highWaterDemand = ['hotel', 'residential', 'healthcare', 'sports'].includes(form.buildingType);
  const largeOrCampusLike = ['education', 'healthcare', 'office', 'culture'].includes(form.buildingType) && ['medium', 'large', 'extraLarge'].includes(scaleBand);
  const coldClimate = form.climate === 'cold';

  const sources: Record<SourceRank, EnergySource[]> = { recommended: [], possible: [], lessLikely: [] };

  addSource(sources, site.airSource ? 'recommended' : 'possible', {
    name: 'Air Source',
    reason: site.airSource
      ? coldClimate
        ? 'Available and highly flexible, but cold-climate efficiency and outdoor-unit placement need attention.'
        : 'Available and highly flexible as the default heat pump source.'
      : 'Still possible in most projects, but not selected as a preferred site condition.',
    systems: sourceSystemMap.air,
  });

  if (site.exhaustHeatRecovery || highVentilation || mediumVentilation) {
    addSource(sources, 'recommended', {
      name: 'Exhaust Air Heat Recovery',
      reason: site.exhaustHeatRecovery
        ? 'The project has exhaust-air recovery potential, so it should be integrated with AHU, DOAS, or rooftop heat pump logic.'
        : 'Ventilation load is meaningful, so recovered exhaust energy can reduce outdoor-air load.',
      systems: sourceSystemMap.exhaustAir,
    });
  } else {
    addSource(sources, 'possible', {
      name: 'Exhaust Air Heat Recovery',
      reason: 'Possible as an auxiliary strategy if the project later uses a larger fresh-air system.',
      systems: sourceSystemMap.exhaustAir,
    });
  }

  if (site.groundSource) {
    addSource(sources, 'recommended', {
      name: 'Ground Source',
      reason: 'Ground exchange is available, so stable earth temperature can support a water-to-water or central plant heat pump strategy.',
      systems: sourceSystemMap.ground,
    });
  } else if (largeOrCampusLike || scaleBand === 'large') {
    addSource(sources, 'possible', {
      name: 'Ground Source',
      reason: 'Potentially suitable for medium-to-large long-operation buildings, but site area and geology are not confirmed.',
      systems: sourceSystemMap.ground,
    });
  } else {
    addSource(sources, 'lessLikely', {
      name: 'Ground Source',
      reason: 'Less likely unless drilling, boreholes, or buried loops are feasible on site.',
      systems: sourceSystemMap.ground,
    });
  }

  if (site.wastewater || highWaterDemand || form.buildingType === 'hotel') {
    addSource(sources, site.wastewater ? 'recommended' : 'possible', {
      name: 'Wastewater Source',
      reason: site.wastewater
        ? 'Wastewater access is available, so domestic hot water and drainage heat can become an active recovery source.'
        : 'Program-related water demand suggests wastewater recovery potential, but access is not confirmed.',
      systems: sourceSystemMap.wastewater,
    });
  } else {
    addSource(sources, 'lessLikely', {
      name: 'Wastewater Source',
      reason: 'Less likely without strong domestic hot water, laundry, kitchen, or drainage heat recovery demand.',
      systems: sourceSystemMap.wastewater,
    });
  }

  if (site.industrialWasteHeat || form.buildingType === 'industrial' || form.buildingType === 'dataCenter' || highInternalGain) {
    addSource(sources, site.industrialWasteHeat ? 'recommended' : 'possible', {
      name: 'Industrial Waste Heat',
      reason: site.industrialWasteHeat
        ? 'A stable waste heat source is available, so rejected process or equipment heat can be upgraded and reused.'
        : 'High internal heat or process load may become a recoverable source if it is stable.',
      systems: sourceSystemMap.industrialWasteHeat,
    });
  } else {
    addSource(sources, 'lessLikely', {
      name: 'Industrial Waste Heat',
      reason: 'Less likely without a stable process, plant, data center, or equipment heat source.',
      systems: sourceSystemMap.industrialWasteHeat,
    });
  }

  if (site.surfaceWater) {
    addSource(sources, 'recommended', {
      name: 'Surface Water Source',
      reason: 'A usable water body is available, so water-to-water or central plant heat pump strategies should be evaluated.',
      systems: sourceSystemMap.surfaceWater,
    });
  } else if (scaleBand === 'large' || scaleBand === 'extraLarge' || form.buildingType === 'dataCenter') {
    addSource(sources, 'possible', {
      name: 'Surface Water Source',
      reason: 'Can be strong for waterfront or large-load projects, but requires confirmed lake, river, seawater, or canal access.',
      systems: sourceSystemMap.surfaceWater,
    });
  } else {
    addSource(sources, 'lessLikely', {
      name: 'Surface Water Source',
      reason: 'Not assumed unless the site is waterfront or a usable water body is confirmed.',
      systems: sourceSystemMap.surfaceWater,
    });
  }

  if (site.districtNetwork) {
    addSource(sources, 'recommended', {
      name: 'District Thermal Network',
      reason: 'A district or campus network is available, so the building can use a heat exchanger interface or district heat pump strategy.',
      systems: sourceSystemMap.district,
    });
  } else if (['large', 'extraLarge'].includes(scaleBand) || ['education', 'healthcare'].includes(form.buildingType)) {
    addSource(sources, 'possible', {
      name: 'District Thermal Network',
      reason: 'Suitable if the building is in a campus, hospital district, dense urban area, or existing district energy network.',
      systems: sourceSystemMap.district,
    });
  } else {
    addSource(sources, 'lessLikely', {
      name: 'District Thermal Network',
      reason: 'Less likely unless an external district heating/cooling network is available.',
      systems: sourceSystemMap.district,
    });
  }

  let buildingReading = `This project appears to be a ${scaleLabel(scaleBand).toLowerCase()} ${programCategories[form.buildingType].name.toLowerCase()} case with ${loadIntensity} cooling intensity.`;
  if (highVentilation) buildingReading += ' Ventilation is a major design driver.';
  if (highZoning) buildingReading += ' Zoning control is important.';
  if (form.highComfort) buildingReading += ' Comfort quality should influence the terminal strategy.';

  let primary: StrategyCard;
  const alternatives: StrategyCard[] = [];
  const notRecommended: StrategyCard[] = [];

  if (form.buildingType === 'dataCenter' || loadIntensity === 'extreme') {
    primary = {
      title: 'Central Plant Heat Pump System using Dedicated Cooling / Heat Recovery',
      systems: 'Central Plant Heat Pump · Water-to-Water Heat Pump · Industrial Waste Heat Recovery',
      reason: 'Cooling intensity is far beyond normal comfort-building range, so the strategy should start from a dedicated central cooling and heat-recovery logic rather than ordinary room systems.',
    };
    alternatives.push({
      title: 'Water-to-Water Heat Pump with Heat Recovery Loop',
      systems: 'Water-to-Water Heat Pump · Water Loop Heat Pump System',
      reason: 'Useful if the project can reuse internal heat or connect technical zones through a water loop.',
    });
    alternatives.push({
      title: 'District / Campus Thermal Integration',
      systems: 'District Heat Pump System · Heat Exchanger Interface',
      reason: 'Possible if the building sits within a campus or district energy network.',
    });
    notRecommended.push({
      title: 'Split / Multi-Split Heat Pump',
      systems: 'Split · Multi-split',
      reason: 'Not suitable for very high cooling intensity and critical load management.',
    });
  } else if (scaleBand === 'small') {
    primary = highZoning
      ? {
          title: 'Air-source VRF Heat Pump System',
          systems: 'Air Source · VRF Heat Pump System',
          reason: 'The load is small, but zoning demand is high. Air-source VRF gives room-level control without requiring ground, water, or district infrastructure.',
        }
      : {
          title: 'Air-source Multi-Split Heat Pump',
          systems: 'Air Source · Multi-Split System',
          reason: 'The project fits a small-load range where air source is the most accessible and simple strategy.',
        };
    alternatives.push({
      title: 'Split Heat Pump',
      systems: 'Air Source · Split Heat Pump',
      reason: 'Good for very simple layouts with limited number of spaces and low first-cost priority.',
    });
    alternatives.push({
      title: 'Air-to-Water Heat Pump + Fan Coil / Radiant',
      systems: 'Air Source · Air-to-Water Heat Pump',
      reason: 'Possible if the design prefers hydronic terminals, lower air movement, or future radiant integration.',
    });
    notRecommended.push({
      title: 'District Heat Pump System',
      systems: 'District Thermal Network',
      reason: 'Unlikely unless a district thermal network is already available.',
    });
  } else if (scaleBand === 'midSmall') {
    primary = highVentilation
      ? {
          title: 'Packaged Rooftop Heat Pump + Exhaust Air Heat Recovery',
          systems: 'Air Source · RTU Heat Pump · Exhaust Air Heat Recovery',
          reason: 'The load is small-to-medium and ventilation is meaningful, so air handling and heat recovery should be considered together.',
        }
      : {
          title: 'Air-source VRF Heat Pump System',
          systems: 'Air Source · VRF Heat Pump System',
          reason: 'A flexible strategy for small-to-medium office, hotel, residential, or commercial projects with multiple zones.',
        };
    alternatives.push({
      title: 'Air-to-Water Heat Pump + Fan Coil',
      systems: 'Air Source · Air-to-Water Heat Pump · Fan Coil',
      reason: 'Good if the project wants hydronic distribution or a quieter terminal strategy.',
    });
    alternatives.push({
      title: 'Small Water Loop Heat Pump System',
      systems: 'Water Loop Heat Pump System',
      reason: 'Possible if different zones have different heating and cooling behavior.',
    });
    notRecommended.push({
      title: 'Industrial Waste Heat System',
      systems: 'Industrial Waste Heat',
      reason: 'Not suitable unless a stable waste heat source exists.',
    });
  } else if (scaleBand === 'medium') {
    if (sources.recommended.some((source) => source.name === 'Wastewater Source')) {
      primary = {
        title: 'Water-to-Water Heat Pump with Wastewater Heat Recovery',
        systems: 'Wastewater Source · Water-to-Water Heat Pump · DHW Heat Recovery',
        reason: 'The project has medium load and program-related water demand, so wastewater recovery can support heating and domestic hot water strategy.',
      };
    } else if (largeOrCampusLike) {
      primary = {
        title: 'Ground-source Water-to-Water Heat Pump System',
        systems: 'Ground Source · Water-to-Water Heat Pump · Water Loop',
        reason: 'Medium-scale long-operation buildings can benefit from stable ground temperature if the site allows wells or loops.',
      };
    } else {
      primary = {
        title: 'VRF Heat Recovery System',
        systems: 'Air Source · VRF Heat Recovery',
        reason: 'Medium projects with mixed room behavior can benefit from heat recovery and flexible zoning.',
      };
    }
    alternatives.push({
      title: 'Air-to-Water Heat Pump + FCU / Radiant',
      systems: 'Air Source · Air-to-Water Heat Pump',
      reason: 'Suitable if the project values hydronic distribution and comfort quality.',
    });
    alternatives.push({
      title: 'DOAS + Heat Pump',
      systems: 'Exhaust Air Heat Recovery · DOAS + Heat Pump',
      reason: 'Strong alternative when outdoor air and indoor air quality are important.',
    });
    notRecommended.push({
      title: 'Simple Split System',
      systems: 'Split Heat Pump',
      reason: 'Too fragmented for a medium-load project with multiple zones and system coordination needs.',
    });
  } else {
    primary = {
      title: 'Central Plant Heat Pump System with Multiple Possible Sources',
      systems: 'Central Plant Heat Pump · Water-to-Water Heat Pump · Water Loop · District Interface',
      reason: 'Large loads favor central hydronic strategy. Air source alone may still be possible, but ground, water, wastewater, district, or recovered heat should be evaluated at site scale.',
    };
    alternatives.push({
      title: 'District Heat Pump / Heat Exchanger Interface',
      systems: 'District Thermal Network · District Heat Pump System',
      reason: 'Strong if the project is in a campus, hospital district, dense urban area, or existing thermal network.',
    });
    alternatives.push({
      title: 'Water Loop Heat Pump System',
      systems: 'Water Loop Heat Pump · Water-to-Water Heat Pump',
      reason: 'Useful when many zones have different load profiles and heat can be exchanged internally.',
    });
    notRecommended.push({
      title: 'Small Split / Multi-Split System',
      systems: 'Split · Multi-Split',
      reason: 'Not efficient or manageable for a large-load building.',
    });
  }

  return { buildingReading, scaleBand, loadIntensity, sources, primary, alternatives, notRecommended };
}

export default function HeatCoolingLoadInteractiveSite() {
  const [view, setView] = useState<AppView>('load');
  const [entries, setEntries] = useState<BuildingEntry[]>([makeEntry(1)]);
  const [expandedEntryId, setExpandedEntryId] = useState<string>('entry-1');
  const [nextId, setNextId] = useState(2);
  const [climate, setClimate] = useState<ClimateKey>('mixed');
  const [unitSystem, setUnitSystem] = useState<UnitSystem>('metric');

  const calculatedEntries = useMemo<CalculatedEntry[]>(() => {
    return entries.map((entry) => {
      const category = programCategories[entry.category];
      const spaces = category.spaces as Record<string, { name: string; heatingBase: number; coolingBase: number }>;
      const space = spaces[entry.space] ?? Object.values(spaces)[0];
      const climateF = climateGroups[climate];
      const ceilingF = ceilingOptions[entry.ceiling];
      const wwrF = wwrOptions[entry.wwr];
      const shadingF = shadingOptions[entry.shading];
      const envelopeF = envelopeOptions[entry.envelope];
      const airF = airOptions[entry.air];
      const internalF = internalGainOptions[entry.internalGain];

      const heatingPerSqm = Math.round(clamp(space.heatingBase * climateF.heatingFactor * ceilingF.heatingFactor * wwrF.heatingFactor * shadingF.heatingFactor * envelopeF.heatingFactor * airF.heatingFactor * internalF.heatingFactor, 5, 320));
      const coolingPerSqm = Math.round(clamp(space.coolingBase * climateF.coolingFactor * ceilingF.coolingFactor * wwrF.coolingFactor * shadingF.coolingFactor * envelopeF.coolingFactor * airF.coolingFactor * internalF.coolingFactor, 5, 6000));

      const totalArea = (Number.isFinite(entry.area) ? entry.area : 0) * (Number.isFinite(entry.quantity) && entry.quantity > 0 ? entry.quantity : 0);
      const totalHeating = entry.enabled ? Math.round(heatingPerSqm * totalArea) : 0;
      const totalCooling = entry.enabled ? Math.round(coolingPerSqm * totalArea) : 0;

      return { ...entry, categoryName: category.name, spaceName: space.name, totalArea, heatingPerSqm, coolingPerSqm, totalHeating, totalCooling };
    });
  }, [entries, climate]);

  const summary = useMemo(() => {
    const grossArea = calculatedEntries.reduce((sum, entry) => sum + (entry.enabled ? entry.totalArea : 0), 0);
    const totalHeating = calculatedEntries.reduce((sum, entry) => sum + entry.totalHeating, 0);
    const totalCooling = calculatedEntries.reduce((sum, entry) => sum + entry.totalCooling, 0);
    return {
      grossArea,
      totalHeating,
      totalCooling,
      weightedHeating: grossArea > 0 ? Math.round(totalHeating / grossArea) : 0,
      weightedCooling: grossArea > 0 ? Math.round(totalCooling / grossArea) : 0,
    };
  }, [calculatedEntries]);

  const dominantEntry = useMemo(() => {
    const enabled = calculatedEntries.filter((entry) => entry.enabled);
    return enabled.sort((a, b) => b.totalArea - a.totalArea)[0] ?? calculatedEntries[0];
  }, [calculatedEntries]);

  const dominantCategory = dominantEntry?.category ?? 'office';

  const [strategyForm, setStrategyForm] = useState<StrategyForm>({
    buildingType: 'office',
    grossArea: 0,
    totalHeating: 0,
    totalCooling: 0,
    heatingPerArea: 0,
    coolingPerArea: 0,
    climate: 'mixed',
    ventilation: 'typical',
    envelope: 'standard',
    wwr: 'baseline',
    shading: 'none',
    ceiling: 'standard',
    internalGain: 'medium',
    spaceCount: 1,
    highComfort: false,
    siteSources: {
      airSource: true,
      surfaceWater: false,
      groundSource: false,
      wastewater: false,
      industrialWasteHeat: false,
      exhaustHeatRecovery: false,
      districtNetwork: false,
    },
  });

  const strategyResult = useMemo(() => generateHeatPumpStrategy(strategyForm), [strategyForm]);

  function updateEntry(id: string, patch: Partial<BuildingEntry>) {
    setEntries((prev) =>
      prev.map((entry) => {
        if (entry.id !== id) return entry;
        const nextEntry = { ...entry, ...patch };
        if (patch.category) nextEntry.space = Object.keys(programCategories[patch.category].spaces)[0];
        return nextEntry;
      }),
    );
  }

  function addEntry() {
    const newEntry = makeEntry(nextId);
    setEntries((prev) => [...prev, newEntry]);
    setExpandedEntryId(newEntry.id);
    setNextId((prev) => prev + 1);
  }

  function removeEntry(id: string) {
    setEntries((prev) => (prev.length === 1 ? prev : prev.filter((entry) => entry.id !== id)));
    if (expandedEntryId === id) setExpandedEntryId('');
  }

  function openStrategyAssistant() {
    setStrategyForm({
      buildingType: dominantCategory,
      grossArea: summary.grossArea,
      totalHeating: summary.totalHeating,
      totalCooling: summary.totalCooling,
      heatingPerArea: summary.weightedHeating,
      coolingPerArea: summary.weightedCooling,
      climate,
      ventilation: dominantEntry?.air ?? 'typical',
      envelope: dominantEntry?.envelope ?? 'standard',
      wwr: dominantEntry?.wwr ?? 'baseline',
      shading: dominantEntry?.shading ?? 'none',
      ceiling: dominantEntry?.ceiling ?? 'standard',
      internalGain: dominantEntry?.internalGain ?? 'medium',
      spaceCount: calculatedEntries.filter((entry) => entry.enabled).length,
      highComfort: ['hotel', 'culture', 'residential', 'healthcare'].includes(dominantCategory),
      siteSources: {
        airSource: true,
        surfaceWater: false,
        groundSource: false,
        wastewater: ['hotel', 'residential', 'healthcare', 'sports'].includes(dominantCategory),
        industrialWasteHeat: ['industrial', 'dataCenter'].includes(dominantCategory),
        exhaustHeatRecovery: (dominantEntry?.air ?? 'typical') === 'highVent' || (dominantEntry?.air ?? 'typical') === 'leaky',
        districtNetwork: false,
      },
    });
    setView('strategy');
  }

  if (view === 'strategy') {
    return (
      <div className="min-h-screen bg-[#f5f5f7] p-6 md:p-10">
        <div className="mx-auto max-w-[1680px] space-y-8">
          <div className="rounded-[30px] border border-black/5 bg-white/80 px-7 py-6 shadow-[0_10px_30px_rgba(15,23,42,0.06)] backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-sky-600/70">Heat Pump Strategy Decision Assistant</div>
                <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">Source-to-system strategy recommendation</h1>
                <p className="mt-2 max-w-5xl text-sm leading-6 text-slate-500">This assistant reads building program, load size, load intensity, climate, envelope, ventilation, WWR, shading, height, and zoning condition. It identifies likely heat sources, matches them with system types, and suggests one primary strategy with alternatives.</p>
              </div>
              <Button type="button" variant="outline" onClick={() => setView('load')} className="rounded-full border-black/10 bg-white">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Load Builder
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-10 xl:grid-cols-[minmax(0,1fr)_420px] xl:items-start">
            <LightPanel>
              <CardHeader className="border-b border-black/5 px-6 py-5">
                <CardTitle className="flex items-center gap-2 text-lg font-semibold tracking-tight text-slate-900"><WandSparkles className="h-5 w-5 text-sky-600" /> Decision Output</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 px-6 py-6">
                <StepCard step="A" title="Building Reading">
                  <div className="rounded-2xl border border-black/5 bg-white p-4 text-sm leading-6 text-slate-600">{strategyResult.buildingReading}</div>
                </StepCard>

                <StepCard step="B" title="Site / Energy Source Availability">
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                    <SourceToggle label="Air Source" note="Default accessible source" checked={strategyForm.siteSources.airSource} onChange={(checked) => setStrategyForm((prev) => ({ ...prev, siteSources: { ...prev.siteSources, airSource: checked } }))} />
                    <SourceToggle label="Surface Water" note="Lake, river, seawater, canal" checked={strategyForm.siteSources.surfaceWater} onChange={(checked) => setStrategyForm((prev) => ({ ...prev, siteSources: { ...prev.siteSources, surfaceWater: checked } }))} />
                    <SourceToggle label="Ground Source" note="Boreholes or buried loops possible" checked={strategyForm.siteSources.groundSource} onChange={(checked) => setStrategyForm((prev) => ({ ...prev, siteSources: { ...prev.siteSources, groundSource: checked } }))} />
                    <SourceToggle label="Wastewater" note="Drainage / DHW recovery access" checked={strategyForm.siteSources.wastewater} onChange={(checked) => setStrategyForm((prev) => ({ ...prev, siteSources: { ...prev.siteSources, wastewater: checked } }))} />
                    <SourceToggle label="Industrial Waste Heat" note="Process or equipment heat source" checked={strategyForm.siteSources.industrialWasteHeat} onChange={(checked) => setStrategyForm((prev) => ({ ...prev, siteSources: { ...prev.siteSources, industrialWasteHeat: checked } }))} />
                    <SourceToggle label="Exhaust Heat Recovery" note="AHU / DOAS exhaust recovery" checked={strategyForm.siteSources.exhaustHeatRecovery} onChange={(checked) => setStrategyForm((prev) => ({ ...prev, siteSources: { ...prev.siteSources, exhaustHeatRecovery: checked } }))} />
                    <SourceToggle label="District Network" note="Campus or city thermal network" checked={strategyForm.siteSources.districtNetwork} onChange={(checked) => setStrategyForm((prev) => ({ ...prev, siteSources: { ...prev.siteSources, districtNetwork: checked } }))} />
                  </div>
                </StepCard>

                <StepCard step="B" title="Possible Energy Sources">
                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                    <SourceColumn title="Recommended Sources" items={strategyResult.sources.recommended} color="sky" />
                    <SourceColumn title="Possible Sources" items={strategyResult.sources.possible} color="slate" />
                    <SourceColumn title="Less Likely" items={strategyResult.sources.lessLikely} color="amber" />
                  </div>
                </StepCard>

                <StepCard step="C" title="Recommended System Strategy">
                  <RecommendationBlock title="Primary Strategy" data={strategyResult.primary} emphasis="primary" />
                </StepCard>

                <StepCard step="D" title="Alternative Strategies">
                  <div className="space-y-3">
                    {strategyResult.alternatives.map((item, index) => (
                      <RecommendationBlock key={item.title} title={`Alternative ${index + 1}`} data={item} emphasis="secondary" />
                    ))}
                  </div>
                </StepCard>

                <StepCard step="E" title="Less Recommended">
                  <div className="space-y-3">
                    {strategyResult.notRecommended.map((item) => (
                      <RecommendationBlock key={item.title} title="Not Recommended" data={item} emphasis="warning" />
                    ))}
                  </div>
                </StepCard>
              </CardContent>
            </LightPanel>

            <LightPanel>
              <CardHeader className="border-b border-black/5 px-6 py-5">
                <CardTitle className="flex items-center gap-2 text-lg font-semibold tracking-tight text-slate-900"><Zap className="h-5 w-5 text-sky-600" /> Building Context</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 px-6 py-6">
                <SummaryStat label="Program" value={programCategories[strategyForm.buildingType].name} />
                <SummaryStat label="Scale" value={scaleLabel(strategyResult.scaleBand)} />
                <SummaryStat label="Climate" value={climateGroups[strategyForm.climate].label} />
                <SummaryStat label="Total Cooling" value={`${formatOutputValue(strategyForm.totalCooling, 'W', unitSystem).main} ${formatOutputValue(strategyForm.totalCooling, 'W', unitSystem).primaryUnit}`} />
                <SummaryStat label="Total Heating" value={`${formatOutputValue(strategyForm.totalHeating, 'W', unitSystem).main} ${formatOutputValue(strategyForm.totalHeating, 'W', unitSystem).primaryUnit}`} />
                <SummaryStat label="Cooling Intensity" value={`${Math.round(strategyForm.coolingPerArea)} W/m²`} />
                <SummaryStat label="Ventilation" value={airOptions[strategyForm.ventilation].name} />
                <SummaryStat label="Envelope" value={envelopeOptions[strategyForm.envelope].name} />
                <div className="rounded-2xl border border-black/5 bg-[#fafafc] p-4 text-sm leading-6 text-slate-600">The output is an early-stage design recommendation. It uses likely, possible, and less-likely language because actual source selection depends on site access, utility infrastructure, permits, and engineering validation.</div>
              </CardContent>
            </LightPanel>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7] p-6 md:p-10">
      <div className="mx-auto max-w-[1680px] space-y-8">
        <div className="rounded-[30px] border border-black/5 bg-white/80 px-7 py-6 shadow-[0_10px_30px_rgba(15,23,42,0.06)] backdrop-blur-xl">
          <div className="mt-2 flex items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-[2.55rem] font-semibold tracking-tight text-slate-900">Interactive Building Heat & Cooling Load Builder</h1>
              <p className="mt-2 max-w-5xl text-sm leading-6 text-slate-500 md:text-[15px]">Build an entire project by combining multiple rooms or zones. Each entry can use its own building program, area, and environmental factors. The system then aggregates all entries into one building-level heating and cooling summary.</p>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-black/5 bg-white/90 p-1 shadow-[0_2px_10px_rgba(15,23,42,0.06)] backdrop-blur-sm">
              <button type="button" onClick={() => setUnitSystem('metric')} className={`min-h-[34px] rounded-full px-3 text-[11px] font-medium tracking-tight transition ${unitSystem === 'metric' ? 'bg-sky-600 text-white shadow-sm hover:bg-sky-600' : 'text-slate-500 hover:bg-sky-50 hover:text-sky-700'}`}>m² · W</button>
              <button type="button" onClick={() => setUnitSystem('imperial')} className={`min-h-[34px] rounded-full px-3 text-[11px] font-medium tracking-tight transition ${unitSystem === 'imperial' ? 'bg-sky-600 text-white shadow-sm hover:bg-sky-600' : 'text-slate-500 hover:bg-sky-50 hover:text-sky-700'}`}>ft² · W</button>
            </div>
          </div>
        </div>

        <LightPanel>
          <CardHeader className="border-b border-black/5 px-6 py-5">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold tracking-tight text-slate-900"><SunMedium className="h-5 w-5 text-sky-600" /> Project Location / Climate Zone</CardTitle>
          </CardHeader>
          <CardContent className="px-6 py-6">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,460px)_1fr] lg:items-center">
              <div className="min-w-0">
                <Select value={climate} onValueChange={(value) => setClimate(value as ClimateKey)}>
                  <SelectTrigger className="h-12 rounded-2xl border-black/5 bg-white text-slate-900 shadow-none"><SelectValue /></SelectTrigger>
                  <SelectContent className="rounded-2xl border-black/5 bg-white text-slate-900 shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
                    {Object.entries(climateGroups).map(([key, value]) => (
                      <SelectGroup key={key}>
                        <SelectLabel>{value.label}</SelectLabel>
                        <SelectItem value={key}>{value.cities}</SelectItem>
                      </SelectGroup>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="min-w-0 rounded-2xl border border-black/5 bg-[#fafafc] px-4 py-3 text-sm leading-6 text-slate-500 break-words">{climateGroups[climate].summary}</div>
            </div>
          </CardContent>
        </LightPanel>

        <div className="grid grid-cols-1 gap-10 xl:grid-cols-[minmax(0,1fr)_360px] xl:items-start">
          <LightPanel>
            <CardHeader className="border-b border-black/5 px-6 py-5">
              <div className="flex items-center justify-between gap-4">
                <CardTitle className="flex items-center gap-2 text-lg font-semibold tracking-tight text-slate-900"><Layers3 className="h-5 w-5 text-sky-600" /> Building Program Assembly</CardTitle>
                <Button onClick={addEntry} className="rounded-full bg-sky-600 text-white hover:bg-sky-700"><Plus className="mr-1 h-4 w-4" /> Add Space</Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-5 px-6 py-6">
              {calculatedEntries.map((entry, index) => {
                const category = programCategories[entry.category];
                const currentSpaces = category.spaces as Record<string, { name: string; heatingBase: number; coolingBase: number }>;
                const isExpanded = expandedEntryId === entry.id;

                return (
                  <div key={entry.id} className="overflow-hidden rounded-[28px] border border-black/5 bg-[#fbfbfd] shadow-[0_4px_20px_rgba(15,23,42,0.04)]">
                    <div onClick={() => setExpandedEntryId(isExpanded ? '' : entry.id)} className="flex w-full cursor-pointer items-center justify-between gap-4 p-5 text-left transition hover:bg-black/[0.02]">
                      <div className="flex min-w-0 items-center gap-3">
                        <Badge variant="secondary" className="rounded-full border-0 bg-sky-100 px-3 py-1 text-sky-700 hover:bg-sky-100">Space {index + 1}</Badge>
                        <div className="min-w-0">
                          <div className="truncate text-sm font-medium text-slate-800">{entry.customName}</div>
                          <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500"><span>{entry.spaceName}</span><span>{entry.categoryName}</span><span>{entry.quantity} × {displayArea(entry.area, unitSystem)}</span><span>H {entry.totalHeating} W</span><span>C {entry.totalCooling} W</span></div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button type="button" variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); updateEntry(entry.id, { enabled: !entry.enabled }); }} className={`rounded-full ${entry.enabled ? 'text-emerald-600 hover:bg-emerald-50' : 'text-slate-400 hover:bg-slate-100'}`}><Power className="h-4 w-4" /></Button>
                        <Button type="button" variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); removeEntry(entry.id); }} disabled={entries.length === 1} className="rounded-full text-slate-500 hover:bg-red-50 hover:text-red-600 disabled:opacity-40"><Trash2 className="h-4 w-4" /></Button>
                        {isExpanded ? <ChevronDown className="h-4 w-4 text-slate-500" /> : <ChevronRight className="h-4 w-4 text-slate-500" />}
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="border-t border-black/5 p-5">
                        <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-4">
                          <div className="space-y-4 lg:col-span-1 lg:flex lg:flex-col">
                            <SectionLabel icon={<Building2 className="h-4 w-4 text-sky-600" />} label="Program" />
                            <Select value={entry.category} onValueChange={(value) => updateEntry(entry.id, { category: value as ProgramCategoryKey })}>
                              <SelectTrigger className="h-12 rounded-2xl border-black/5 bg-white text-slate-900 shadow-none"><SelectValue /></SelectTrigger>
                              <SelectContent className="rounded-2xl border-black/5 bg-white text-slate-900 shadow-[0_18px_40px_rgba(15,23,42,0.12)]">{Object.entries(programCategories).map(([key, value]) => <SelectItem key={key} value={key}>{value.name}</SelectItem>)}</SelectContent>
                            </Select>
                            <Select value={entry.space} onValueChange={(value) => updateEntry(entry.id, { space: value })}>
                              <SelectTrigger className="h-12 rounded-2xl border-black/5 bg-white text-slate-900 shadow-none"><SelectValue /></SelectTrigger>
                              <SelectContent className="rounded-2xl border-black/5 bg-white text-slate-900 shadow-[0_18px_40px_rgba(15,23,42,0.12)]">{Object.entries(currentSpaces).map(([key, value]) => <SelectItem key={key} value={key}>{value.name}</SelectItem>)}</SelectContent>
                            </Select>
                            <div className="space-y-1"><SectionLabel label="Space Name" /><Input value={entry.customName} onChange={(e) => updateEntry(entry.id, { customName: e.target.value })} className="h-11 rounded-2xl border-black/5 bg-white text-slate-900" /></div>
                            <div className="flex items-center gap-2"><div className="w-20 text-xs text-slate-500">Quantity</div><Input type="number" min="1" step="1" value={entry.quantity} onChange={(e) => updateEntry(entry.id, { quantity: Math.max(1, Number(e.target.value) || 1) })} className="h-9 rounded-xl border-black/5 bg-white px-3 text-slate-900" /></div>
                            <div className="flex items-center gap-2"><div className="w-20 text-xs text-slate-500">Area ({unitSystem === 'imperial' ? 'ft²' : 'm²'})</div><Input type="number" min="0" step="1" value={unitSystem === 'imperial' ? Math.round(entry.area * SQFT_PER_SQM) : Math.round(entry.area)} onChange={(e) => updateEntry(entry.id, { area: parseAreaInput(e.target.value, unitSystem) })} className="h-9 rounded-xl border-black/5 bg-white px-3 text-slate-900" /></div>
                          </div>

                          <div className="space-y-4 lg:col-span-3 lg:flex lg:h-full lg:flex-col">
                            <SectionLabel icon={<Zap className="h-4 w-4 text-sky-600" />} label="Factors" />
                            <div className="grid h-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                              <FactorSelect title="Height / Ceiling Height" value={entry.ceiling} onChange={(value) => updateEntry(entry.id, { ceiling: value as CeilingKey })} options={Object.fromEntries(Object.entries(ceilingOptions).map(([key, value]) => [key, unitSystem === 'imperial' ? value.imperialName : value.metricName]))} subtitle="Controls room volume effect on load." />
                              <FactorSelect title="WWR" value={entry.wwr} onChange={(value) => updateEntry(entry.id, { wwr: value as WwrKey })} options={Object.fromEntries(Object.entries(wwrOptions).map(([key, value]) => [key, value.name]))} subtitle={wwrOptions[entry.wwr].summary} />
                              <FactorSelect title="Shading" value={entry.shading} onChange={(value) => updateEntry(entry.id, { shading: value as ShadingKey })} options={Object.fromEntries(Object.entries(shadingOptions).map(([key, value]) => [key, value.name]))} subtitle={shadingOptions[entry.shading].summary} />
                              <FactorSelect title="Envelope" value={entry.envelope} onChange={(value) => updateEntry(entry.id, { envelope: value as EnvelopeKey })} options={Object.fromEntries(Object.entries(envelopeOptions).map(([key, value]) => [key, value.name]))} subtitle={envelopeOptions[entry.envelope].summary} />
                              <FactorSelect title="Air / Ventilation" value={entry.air} onChange={(value) => updateEntry(entry.id, { air: value as AirKey })} options={Object.fromEntries(Object.entries(airOptions).map(([key, value]) => [key, value.name]))} subtitle={airOptions[entry.air].summary} />
                              <FactorSelect title="Internal Gains" value={entry.internalGain} onChange={(value) => updateEntry(entry.id, { internalGain: value as InternalGainKey })} options={Object.fromEntries(Object.entries(internalGainOptions).map(([key, value]) => [key, value.name]))} subtitle={internalGainOptions[entry.internalGain].summary} />
                            </div>
                          </div>
                        </div>

                        <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
                          <InfoStat label="Heating / Area" value={`${formatOutputValue(entry.heatingPerSqm, 'W/m²', unitSystem).main} ${formatOutputValue(entry.heatingPerSqm, 'W/m²', unitSystem).primaryUnit}`} secondary={formatOutputValue(entry.heatingPerSqm, 'W/m²', unitSystem).secondary} />
                          <InfoStat label="Cooling / Area" value={`${formatOutputValue(entry.coolingPerSqm, 'W/m²', unitSystem).main} ${formatOutputValue(entry.coolingPerSqm, 'W/m²', unitSystem).primaryUnit}`} secondary={formatOutputValue(entry.coolingPerSqm, 'W/m²', unitSystem).secondary} />
                          <InfoStat label="Total Heating" value={`${formatOutputValue(entry.totalHeating, 'W', unitSystem).main} ${formatOutputValue(entry.totalHeating, 'W', unitSystem).primaryUnit}`} secondary={formatOutputValue(entry.totalHeating, 'W', unitSystem).secondary} />
                          <InfoStat label="Total Cooling" value={`${formatOutputValue(entry.totalCooling, 'W', unitSystem).main} ${formatOutputValue(entry.totalCooling, 'W', unitSystem).primaryUnit}`} secondary={formatOutputValue(entry.totalCooling, 'W', unitSystem).secondary} />
                        </div>

                        <div className="mt-5 flex justify-end"><Button type="button" variant="outline" onClick={() => setExpandedEntryId('')} className="rounded-full border-black/10 bg-white">Done</Button></div>
                      </div>
                    )}
                  </div>
                );
              })}
            </CardContent>
          </LightPanel>

          <LightPanel>
            <CardHeader className="border-b border-black/5 px-6 py-5"><CardTitle className="flex items-center gap-2 text-lg font-semibold tracking-tight text-slate-900"><Zap className="h-5 w-5 text-sky-600" /> Building Load Summary</CardTitle></CardHeader>
            <CardContent className="flex flex-1 flex-col justify-between space-y-6 px-6 py-6">
              <motion.div key={`${summary.totalHeating}-${summary.totalCooling}-${summary.grossArea}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                <OutputCard label="Gross Area" value={summary.grossArea} unit="m²" unitSystem={unitSystem} />
                <div className="mt-4"><OutputCard label="Total Heating Load" value={summary.totalHeating} unit="W" unitSystem={unitSystem} /></div>
                <div className="mt-4"><OutputCard label="Total Cooling Load" value={summary.totalCooling} unit="W" unitSystem={unitSystem} /></div>
                <div className="mt-4 grid grid-cols-2 gap-4"><OutputCard label="Avg Heating" value={summary.weightedHeating} unit="W/m²" unitSystem={unitSystem} compact /><OutputCard label="Avg Cooling" value={summary.weightedCooling} unit="W/m²" unitSystem={unitSystem} compact /></div>
              </motion.div>
              <div className="rounded-[24px] border border-black/5 bg-[#fafafc] p-4 text-slate-900">
                <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-sky-600/70">Next Step</div>
                <div className="mt-2 text-sm leading-6 text-slate-600">Move from load estimation into heat pump source and system strategy selection. The next page reads building type, load, intensity, climate, envelope, ventilation, WWR, shading, height, and zoning condition.</div>
                <Button type="button" onClick={openStrategyAssistant} className="mt-4 rounded-full bg-slate-900 text-white hover:bg-slate-800"><WandSparkles className="mr-2 h-4 w-4" /> Heat Pump Strategy Assistant</Button>
              </div>
            </CardContent>
          </LightPanel>
        </div>
      </div>
    </div>
  );
}

function LightPanel({ children }: { children: React.ReactNode }) {
  return <Card className="flex h-full flex-col overflow-hidden rounded-[30px] border border-black/5 bg-white/82 shadow-[0_14px_36px_rgba(15,23,42,0.08)] backdrop-blur-xl">{children}</Card>;
}

function SectionLabel({ icon, label }: { icon?: React.ReactNode; label: string }) {
  return <div className="flex items-center gap-2 text-sm font-medium text-slate-700">{icon}{label}</div>;
}

function StepCard({ step, title, children }: { step: string; title: string; children: React.ReactNode }) {
  return <div className="rounded-[24px] border border-black/5 bg-[#fafafc] p-4"><div className="text-[11px] uppercase tracking-[0.16em] text-sky-600/70">{step}</div><div className="mt-1 text-base font-semibold text-slate-900">{title}</div><div className="mt-4">{children}</div></div>;
}

function SourceToggle({ label, note, checked, onChange }: { label: string; note: string; checked: boolean; onChange: (checked: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`rounded-2xl border p-4 text-left transition ${checked ? 'border-sky-200 bg-sky-50/80' : 'border-black/5 bg-white hover:bg-slate-50'}`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm font-semibold text-slate-900">{label}</div>
        <div className={`h-5 w-9 rounded-full p-0.5 transition ${checked ? 'bg-sky-600' : 'bg-slate-200'}`}>
          <div className={`h-4 w-4 rounded-full bg-white shadow transition ${checked ? 'translate-x-4' : 'translate-x-0'}`} />
        </div>
      </div>
      <div className="mt-2 text-xs leading-5 text-slate-500">{note}</div>
    </button>
  );
}

function SourceColumn({ title, items, color }: { title: string; items: EnergySource[]; color: 'sky' | 'slate' | 'amber' }) {
  const colorClass = color === 'sky' ? 'border-sky-200 bg-sky-50/70' : color === 'amber' ? 'border-amber-200 bg-amber-50/70' : 'border-black/5 bg-white';
  return <div className={`rounded-2xl border p-4 ${colorClass}`}><div className="text-[11px] uppercase tracking-[0.14em] text-slate-500">{title}</div><div className="mt-3 space-y-3">{items.map((item) => <div key={item.name} className="rounded-xl bg-white/70 p-3"><div className="text-sm font-semibold text-slate-900">{item.name}</div><div className="mt-1 text-xs leading-5 text-slate-600">{item.reason}</div><div className="mt-2 text-[11px] leading-5 text-slate-400">{item.systems.slice(0, 3).join(' · ')}</div></div>)}</div></div>;
}

function RecommendationBlock({ title, data, emphasis }: { title: string; data: StrategyCard; emphasis: 'primary' | 'secondary' | 'warning' }) {
  const cls = emphasis === 'primary' ? 'border-sky-200 bg-sky-50/70' : emphasis === 'warning' ? 'border-amber-200 bg-amber-50/70' : 'border-black/5 bg-white';
  return <div className={`rounded-2xl border p-4 ${cls}`}><div className="text-[11px] uppercase tracking-[0.14em] text-slate-400">{title}</div><div className="mt-1 text-sm font-semibold text-slate-900">{data.title}</div><div className="mt-1 text-xs text-slate-500">{data.systems}</div><div className="mt-3 text-sm leading-6 text-slate-600">{data.reason}</div></div>;
}

function StrategyTypeChip({ title, text }: { title: string; text: string }) {
  return <div className="rounded-2xl border border-black/5 bg-white p-4"><div className="text-sm font-semibold text-slate-900">{title}</div><div className="mt-2 text-sm leading-6 text-slate-600">{text}</div></div>;
}

function MiniNote({ title, children }: { title: string; children: React.ReactNode }) {
  return <div className="rounded-2xl border border-black/5 bg-white p-3 text-sm leading-6 text-slate-600"><div className="text-[11px] uppercase tracking-[0.12em] text-slate-400">{title}</div><div className="mt-1">{children}</div></div>;
}

function SummaryStat({ label, value }: { label: string; value: string }) {
  return <div className="rounded-2xl border border-black/5 bg-white p-4"><div className="text-[11px] uppercase tracking-[0.12em] text-slate-400">{label}</div><div className="mt-1 text-sm font-semibold text-slate-900">{value}</div></div>;
}

function InfoStat({ label, value, secondary }: { label: string; value: string; secondary?: string }) {
  return <div className="rounded-2xl border border-black/5 bg-white p-3"><div className="text-slate-500">{label}</div><div className="mt-1 text-lg font-semibold text-slate-900">{value}</div>{secondary && <div className="mt-1 text-xs text-slate-400">{secondary}</div>}</div>;
}

function OutputCard({ label, value, unit, unitSystem, compact = false }: { label: string; value: number; unit: 'm²' | 'W/m²' | 'W'; unitSystem: UnitSystem; compact?: boolean }) {
  const formatted = formatOutputValue(value, unit, unitSystem);
  return <div className="rounded-[24px] border border-black/5 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.04)]"><div className="text-sm text-slate-500">{label}</div><div className={`mt-2 font-semibold tracking-tight ${compact ? 'text-3xl' : 'text-5xl'} ${value === 0 ? 'text-slate-300' : 'text-slate-900'}`}>{formatted.main} <span className="align-top text-base">{formatted.primaryUnit}</span></div>{formatted.secondary && <div className="mt-1 text-xs text-slate-400">{formatted.secondary}</div>}</div>;
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} />;
}

function FactorSelect({ title, value, onChange, options, subtitle }: { title: string; value: string; onChange: (value: string) => void; options: Record<string, string>; subtitle: string }) {
  return <div className="flex h-full min-h-[108px] flex-col rounded-2xl border border-black/5 bg-white p-3"><div className="mb-2 text-sm font-medium text-slate-700">{title}</div><Select value={value} onValueChange={onChange}><SelectTrigger className="h-11 rounded-2xl border-black/5 bg-[#f7f7fa] text-slate-900 shadow-none"><SelectValue /></SelectTrigger><SelectContent className="rounded-2xl border-black/5 bg-white text-slate-900 shadow-[0_18px_40px_rgba(15,23,42,0.12)]">{Object.entries(options).map(([key, option]) => <SelectItem key={key} value={key}>{option}</SelectItem>)}</SelectContent></Select><div className="mt-auto pt-2 text-[11px] leading-5 text-slate-500">{subtitle}</div></div>;
}
