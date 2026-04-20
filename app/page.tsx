'use client';

import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  Building2,
  ChevronDown,
  ChevronRight,
  Layers3,
  Plus,
  Power,
  SunMedium,
  Trash2,
  WandSparkles,
  Zap,
} from 'lucide-react';

const programCategories = {
  residential: {
    name: 'Residential',
    spaces: {
      apartment: { name: 'Apartment Unit', heatingBase: 42, coolingBase: 85 },
      bedroom: { name: 'Bedroom', heatingBase: 40, coolingBase: 78 },
      livingRoom: { name: 'Living Room', heatingBase: 43, coolingBase: 88 },
      dining: { name: 'Dining Room', heatingBase: 42, coolingBase: 90 },
      corridor: { name: 'Residential Corridor', heatingBase: 30, coolingBase: 45 },
      lobby: { name: 'Residential Lobby', heatingBase: 36, coolingBase: 70 },
      amenity: { name: 'Amenity / Club Room', heatingBase: 40, coolingBase: 95 },
    },
  },
  office: {
    name: 'Office',
    spaces: {
      openOffice: { name: 'Open Office', heatingBase: 60, coolingBase: 100 },
      privateOffice: { name: 'Private Office', heatingBase: 56, coolingBase: 92 },
      meeting: { name: 'Meeting Room', heatingBase: 60, coolingBase: 110 },
      conference: { name: 'Conference Room', heatingBase: 62, coolingBase: 120 },
      training: { name: 'Training Room', heatingBase: 60, coolingBase: 115 },
      reception: { name: 'Reception / Lobby', heatingBase: 58, coolingBase: 95 },
      corridor: { name: 'Office Corridor', heatingBase: 38, coolingBase: 55 },
      pantry: { name: 'Pantry / Break Room', heatingBase: 52, coolingBase: 105 },
      server: { name: 'Server / IT Room', heatingBase: 24, coolingBase: 180 },
      archive: { name: 'Archive / Storage', heatingBase: 42, coolingBase: 50 },
    },
  },
  hotel: {
    name: 'Hotel',
    spaces: {
      guestroom: { name: 'Guestroom', heatingBase: 52, coolingBase: 85 },
      suite: { name: 'Suite', heatingBase: 55, coolingBase: 95 },
      lobby: { name: 'Hotel Lobby', heatingBase: 58, coolingBase: 105 },
      ballroom: { name: 'Ballroom / Banquet', heatingBase: 62, coolingBase: 125 },
      conference: { name: 'Conference Room', heatingBase: 58, coolingBase: 110 },
      restaurant: { name: 'Hotel Restaurant', heatingBase: 60, coolingBase: 120 },
      kitchen: { name: 'Commercial Kitchen', heatingBase: 45, coolingBase: 180 },
      corridor: { name: 'Guestroom Corridor', heatingBase: 38, coolingBase: 50 },
      fitness: { name: 'Fitness Room', heatingBase: 56, coolingBase: 135 },
      spa: { name: 'Spa / Wellness', heatingBase: 60, coolingBase: 110 },
      backOfHouse: { name: 'Back of House', heatingBase: 45, coolingBase: 65 },
      laundry: { name: 'Laundry', heatingBase: 48, coolingBase: 140 },
    },
  },
  retail: {
    name: 'Retail / Commercial',
    spaces: {
      shop: { name: 'Retail Shop', heatingBase: 63, coolingBase: 130 },
      departmentStore: { name: 'Department Store', heatingBase: 66, coolingBase: 140 },
      supermarket: { name: 'Supermarket', heatingBase: 60, coolingBase: 150 },
      mallAtrium: { name: 'Mall Atrium', heatingBase: 70, coolingBase: 145 },
      restaurant: { name: 'Restaurant Dining', heatingBase: 68, coolingBase: 145 },
      foodCourt: { name: 'Food Court', heatingBase: 70, coolingBase: 155 },
      cafe: { name: 'Cafe', heatingBase: 62, coolingBase: 125 },
      kitchen: { name: 'Food Prep Kitchen', heatingBase: 48, coolingBase: 185 },
      showroom: { name: 'Showroom', heatingBase: 60, coolingBase: 115 },
      storage: { name: 'Retail Storage', heatingBase: 42, coolingBase: 55 },
    },
  },
  education: {
    name: 'Education',
    spaces: {
      classroom: { name: 'Classroom', heatingBase: 60, coolingBase: 100 },
      lectureHall: { name: 'Lecture Hall', heatingBase: 64, coolingBase: 120 },
      seminar: { name: 'Seminar Room', heatingBase: 58, coolingBase: 95 },
      library: { name: 'Library Reading Room', heatingBase: 56, coolingBase: 85 },
      computerLab: { name: 'Computer Lab', heatingBase: 58, coolingBase: 125 },
      scienceLab: { name: 'Science Lab', heatingBase: 62, coolingBase: 135 },
      studio: { name: 'Design Studio', heatingBase: 60, coolingBase: 105 },
      gym: { name: 'School Gymnasium', heatingBase: 75, coolingBase: 130 },
      dormitory: { name: 'Dormitory Room', heatingBase: 50, coolingBase: 80 },
      cafeteria: { name: 'Cafeteria', heatingBase: 65, coolingBase: 135 },
    },
  },
  healthcare: {
    name: 'Healthcare',
    spaces: {
      ward: { name: 'Patient Ward', heatingBase: 63, coolingBase: 100 },
      clinic: { name: 'Consultation Room', heatingBase: 60, coolingBase: 95 },
      waiting: { name: 'Waiting Area', heatingBase: 58, coolingBase: 100 },
      operating: { name: 'Operating Room', heatingBase: 70, coolingBase: 150 },
      icu: { name: 'ICU', heatingBase: 68, coolingBase: 140 },
      imaging: { name: 'Imaging Room', heatingBase: 64, coolingBase: 125 },
      lab: { name: 'Medical Laboratory', heatingBase: 66, coolingBase: 135 },
      pharmacy: { name: 'Pharmacy', heatingBase: 58, coolingBase: 90 },
      lobby: { name: 'Healthcare Lobby', heatingBase: 60, coolingBase: 105 },
      sterile: { name: 'Sterile Supply', heatingBase: 62, coolingBase: 95 },
    },
  },
  culture: {
    name: 'Culture / Assembly',
    spaces: {
      museumGallery: { name: 'Museum Gallery', heatingBase: 88, coolingBase: 120 },
      exhibition: { name: 'Exhibition Hall', heatingBase: 93, coolingBase: 140 },
      theater: { name: 'Theater / Auditorium', heatingBase: 100, coolingBase: 155 },
      cinema: { name: 'Cinema', heatingBase: 98, coolingBase: 160 },
      concertHall: { name: 'Concert Hall', heatingBase: 102, coolingBase: 150 },
      foyer: { name: 'Foyer', heatingBase: 85, coolingBase: 115 },
      backstage: { name: 'Backstage / Dressing', heatingBase: 75, coolingBase: 95 },
      worship: { name: 'Worship Space', heatingBase: 82, coolingBase: 105 },
      archive: { name: 'Collection Storage', heatingBase: 60, coolingBase: 70 },
    },
  },
  sports: {
    name: 'Sports / Recreation',
    spaces: {
      fitness: { name: 'Fitness Room', heatingBase: 120, coolingBase: 160 },
      gymnasium: { name: 'Gymnasium', heatingBase: 115, coolingBase: 145 },
      natatorium: { name: 'Natatorium / Pool Hall', heatingBase: 135, coolingBase: 170 },
      locker: { name: 'Locker / Shower', heatingBase: 110, coolingBase: 130 },
      yoga: { name: 'Yoga / Studio Room', heatingBase: 95, coolingBase: 115 },
      spectator: { name: 'Spectator Seating', heatingBase: 105, coolingBase: 125 },
      lobby: { name: 'Sports Lobby', heatingBase: 90, coolingBase: 100 },
    },
  },
  transport: {
    name: 'Transport / Public Service',
    spaces: {
      terminalHall: { name: 'Terminal Hall', heatingBase: 65, coolingBase: 120 },
      waitingHall: { name: 'Waiting Hall', heatingBase: 62, coolingBase: 110 },
      ticketing: { name: 'Ticketing / Check-in', heatingBase: 60, coolingBase: 100 },
      security: { name: 'Security Screening', heatingBase: 64, coolingBase: 115 },
      concourse: { name: 'Concourse', heatingBase: 58, coolingBase: 95 },
      office: { name: 'Station Office', heatingBase: 56, coolingBase: 90 },
      retail: { name: 'Terminal Retail', heatingBase: 62, coolingBase: 120 },
    },
  },
  industrial: {
    name: 'Industrial / Logistics',
    spaces: {
      workshopLight: { name: 'Light Manufacturing', heatingBase: 60, coolingBase: 130 },
      workshopHeavy: { name: 'Heavy Manufacturing', heatingBase: 75, coolingBase: 170 },
      assembly: { name: 'Assembly Area', heatingBase: 62, coolingBase: 120 },
      warehouse: { name: 'Warehouse', heatingBase: 40, coolingBase: 60 },
      coldStorage: { name: 'Cold Storage Support', heatingBase: 35, coolingBase: 45 },
      packaging: { name: 'Packaging Area', heatingBase: 55, coolingBase: 110 },
      logistics: { name: 'Logistics / Sorting', heatingBase: 52, coolingBase: 100 },
      controlRoom: { name: 'Control Room', heatingBase: 55, coolingBase: 95 },
      cleanroom: { name: 'Cleanroom', heatingBase: 70, coolingBase: 200 },
    },
  },
  dataCenter: {
    name: 'Data Center / High-Tech',
    spaces: {
      whiteSpace: { name: 'Server White Space', heatingBase: 10, coolingBase: 2500 },
      ups: { name: 'UPS / Electrical Room', heatingBase: 12, coolingBase: 800 },
      battery: { name: 'Battery Room', heatingBase: 12, coolingBase: 350 },
      network: { name: 'Network Room', heatingBase: 12, coolingBase: 1500 },
      noc: { name: 'NOC / Monitoring Room', heatingBase: 35, coolingBase: 120 },
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
  standard: {
    metricName: 'Standard (2.6–3.0 m)',
    imperialName: 'Standard (8.5–10 ft)',
    heatingFactor: 1.0,
    coolingFactor: 1.0,
  },
  medium: {
    metricName: 'Medium (3.0–4.0 m)',
    imperialName: 'Medium (10–13 ft)',
    heatingFactor: 1.08,
    coolingFactor: 1.06,
  },
  high: {
    metricName: 'High (4.0–6.0 m)',
    imperialName: 'High (13–20 ft)',
    heatingFactor: 1.18,
    coolingFactor: 1.12,
  },
  veryHigh: {
    metricName: 'Very High (>6.0 m)',
    imperialName: 'Very High (>20 ft)',
    heatingFactor: 1.3,
    coolingFactor: 1.2,
  },
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

type ScaleBand = 'small' | 'midSmall' | 'medium' | 'large' | 'veryLarge';
type ZoningNeed = 'low' | 'medium' | 'high';
type VentilationNeed = 'low' | 'medium' | 'high';
type ComfortPriority = 'basic' | 'balanced' | 'high';
type LoadIntensity = 'normal' | 'elevated' | 'high' | 'extreme';

type RecommendationCardData = {
  title: string;
  systems: string;
  reason: string;
};

type StrategyResult = {
  scaleBand: ScaleBand;
  loadIntensity: LoadIntensity;
  highIntensityWarning: boolean;
  primary: RecommendationCardData;
  alternatives: RecommendationCardData[];
  notRecommended?: string;
};

type StrategyForm = {
  buildingType: ProgramCategoryKey;
  grossArea: number;
  totalHeating: number;
  totalCooling: number;
  coolingPerArea: number;
  zoningNeed: ZoningNeed;
  ventilationNeed: VentilationNeed;
  comfortPriority: ComfortPriority;
};

const SQFT_PER_SQM = 10.7639;

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
      ? {
          main: (value / SQFT_PER_SQM).toFixed(1),
          primaryUnit: 'W/ft²',
          secondary: `${Math.round(value).toLocaleString()} W/m²`,
        }
      : { main: Math.round(value).toLocaleString(), primaryUnit: 'W/m²' };
  }

  if (value >= 10000) {
    return {
      main: (value / 1000).toFixed(1),
      primaryUnit: 'kW',
      secondary: `${Math.round(value).toLocaleString()} W`,
    };
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
  return 'veryLarge';
}

function classifyLoadIntensity(coolingPerArea: number): LoadIntensity {
  if (coolingPerArea < 90) return 'normal';
  if (coolingPerArea < 160) return 'elevated';
  if (coolingPerArea < 280) return 'high';
  return 'extreme';
}

function scaleLabel(scaleBand: ScaleBand) {
  return {
    small: 'Small',
    midSmall: 'Mid-Small',
    medium: 'Medium',
    large: 'Large',
    veryLarge: 'Very Large',
  }[scaleBand];
}

function strategyTypeLabel(type: 'dx' | 'air' | 'water' | 'radiant') {
  return {
    dx: 'A. Direct Expansion / Refrigerant-based',
    air: 'B. Air-based Central System',
    water: 'C. Water-based Central System',
    radiant: 'D. Radiant + Fresh Air',
  }[type];
}

function buildStrategyLibrary() {
  return {
    dxSplit: {
      title: 'Split / Multi-Split',
      systems: 'Split · Multi-split',
      reason: 'Simple and cost-effective for small projects with limited zoning and straightforward room layouts.',
    },
    dxVrf: {
      title: 'VRF / VRV',
      systems: 'VRF · VRV · small heat recovery VRF',
      reason: 'Strong fit where many rooms need independent control and project scale is still within distributed-system territory.',
    },
    airCentral: {
      title: 'AHU / RTU / VAV',
      systems: 'AHU · RTU · VAV · all-air system',
      reason: 'Best when air delivery and ventilation become major design drivers, especially in larger open or high-occupancy projects.',
    },
    waterHydronic: {
      title: 'Chilled Water + FCU / AHU',
      systems: 'Chilled water + fan coil · Chiller + AHU · small hydronic plant',
      reason: 'Good for medium to large projects that need stable operation, longer distribution distances, and stronger engineering control.',
    },
    radiantFreshAir: {
      title: 'Radiant + DOAS / Fresh Air',
      systems: 'Radiant floor · Radiant ceiling · DOAS + radiant',
      reason: 'Prioritizes quiet, even, high-quality comfort rather than only meeting basic load targets.',
    },
    precision: {
      title: 'Specialized / Dedicated Cooling',
      systems: 'Dedicated mechanical cooling · precision cooling · central cooling backbone',
      reason: 'Needed when load intensity is far above ordinary office or residential ranges.',
    },
    centralPlant: {
      title: 'Central Chilled Water Plant',
      systems: 'Central plant + AHU / FCU · district / hybrid central systems',
      reason: 'At large and very large scales, system logic shifts toward overall efficiency, maintainability, and central energy strategy.',
    },
  };
}

function recommendStrategy(form: StrategyForm): StrategyResult {
  const library = buildStrategyLibrary();
  const scaleBand = classifyScale(form.totalCooling);
  const loadIntensity = classifyLoadIntensity(form.coolingPerArea);
  const highIntensityWarning = loadIntensity === 'high' || loadIntensity === 'extreme';

  const buildingType = form.buildingType;
  const zoningHigh = form.zoningNeed === 'high';
  const ventilationHigh = form.ventilationNeed === 'high';
  const comfortHigh = form.comfortPriority === 'high';
  const firstCostBias = form.comfortPriority === 'basic';

  if (buildingType === 'dataCenter' || loadIntensity === 'extreme') {
    return {
      scaleBand,
      loadIntensity,
      highIntensityWarning: true,
      primary: {
        ...library.precision,
        reason: `This is a high-intensity cooling case. With ${Math.round(form.coolingPerArea)} W/m² and ${
          formatOutputValue(form.totalCooling, 'W', 'metric').main
        } ${formatOutputValue(form.totalCooling, 'W', 'metric').primaryUnit} of total cooling, standard residential or office logic is no longer the right starting point.`,
      },
      alternatives: [
        {
          ...library.centralPlant,
          reason: 'A central cooling backbone can still be appropriate if this special load is part of a larger technical campus or major facility.',
        },
        {
          ...library.airCentral,
          reason: 'Air-based central systems can support ventilation-heavy ancillary spaces, though they are usually not the primary answer for the critical load itself.',
        },
      ],
      notRecommended: 'Standard split or ordinary small-room comfort systems are not well matched to this load intensity.',
    };
  }

  if (scaleBand === 'small') {
    if (zoningHigh) {
      return {
        scaleBand,
        loadIntensity,
        highIntensityWarning,
        primary: {
          ...library.dxVrf,
          reason: 'The building is still in the small-scale range, but the zoning demand is high, so a room-by-room refrigerant-based strategy is more appropriate than a single simple system.',
        },
        alternatives: [
          {
            ...library.dxSplit,
            reason: 'Still technically viable if the project needs only a limited number of independently controlled zones and a lower first cost is important.',
          },
          {
            ...library.waterHydronic,
            reason: 'Can work if comfort or future upgrade flexibility matters more than keeping the initial system very simple.',
          },
        ],
        notRecommended: 'A full central all-air system may be oversized for this small project unless ventilation demand becomes unusually high.',
      };
    }

    return {
      scaleBand,
      loadIntensity,
      highIntensityWarning,
      primary: {
        ...(firstCostBias ? library.dxSplit : library.dxVrf),
        reason: firstCostBias
          ? 'This small project does not need a highly engineered central solution, so a simple distributed DX strategy is the clearest starting point.'
          : 'Even at small scale, a more coordinated refrigerant-based zoning strategy can be worthwhile if design flexibility matters.',
      },
      alternatives: [
        {
          ...library.dxVrf,
          reason: 'A stronger option when more independent room control is needed later or when the plan becomes more segmented.',
        },
        {
          ...library.airCentral,
          reason: 'Reasonable only if the project turns out to be much more ventilation-led than room-control-led.',
        },
      ],
      notRecommended: 'Large central chilled water logic is usually not economical at this scale.',
    };
  }

  if (scaleBand === 'midSmall') {
    if (ventilationHigh) {
      return {
        scaleBand,
        loadIntensity,
        highIntensityWarning,
        primary: {
          ...library.airCentral,
          reason: 'The project is beyond the very small range and ventilation is a major driver, so the strategy should start from air handling rather than only from room terminals.',
        },
        alternatives: [
          {
            ...library.dxVrf,
            reason: 'Still a valid alternative when zoning is high, but it should be paired with a clear outdoor-air strategy.',
          },
          {
            ...library.waterHydronic,
            reason: 'A small hydronic system becomes reasonable if the project wants a more engineered long-term approach.',
          },
        ],
        notRecommended: 'Very simple split systems may become too fragmented as ventilation and coordination needs rise.',
      };
    }

    return {
      scaleBand,
      loadIntensity,
      highIntensityWarning,
      primary: {
        ...(zoningHigh ? library.dxVrf : library.waterHydronic),
        reason: zoningHigh
          ? 'This scale still supports VRF well, especially when many separate spaces want their own temperature control.'
          : 'At this range, a small hydronic direction starts to make sense when the project wants more stability than many separate DX units.',
      },
      alternatives: [
        {
          ...library.airCentral,
          reason: 'A reasonable alternative when open areas or stronger air-side control begin to dominate the planning logic.',
        },
        {
          ...library.dxSplit,
          reason: 'Possible only for very simple layouts; less ideal once repeated zoning or future coordination increases.',
        },
      ],
      notRecommended: 'A fully centralized district-style strategy is usually too heavy for this size band.',
    };
  }

  if (scaleBand === 'medium') {
    if (comfortHigh) {
      return {
        scaleBand,
        loadIntensity,
        highIntensityWarning,
        primary: {
          ...library.radiantFreshAir,
          reason: 'The project is large enough to justify a more deliberate system strategy, and comfort is a stated priority, so radiant + fresh air becomes a strong architectural direction.',
        },
        alternatives: [
          {
            ...library.waterHydronic,
            reason: 'A hydronic fan-coil direction remains a strong alternative when comfort matters but full radiant integration is less practical.',
          },
          {
            ...library.dxVrf,
            reason: 'Still viable if zoning is very strong and the project wants a more distributed solution.',
          },
        ],
        notRecommended: 'A pure all-air approach may satisfy load and ventilation but is less aligned with a high-comfort target.',
      };
    }

    if (ventilationHigh) {
      return {
        scaleBand,
        loadIntensity,
        highIntensityWarning,
        primary: {
          ...library.airCentral,
          reason: 'At medium scale, strong outdoor-air demand pushes the logic toward central air handling and clearer air-side control.',
        },
        alternatives: [
          {
            ...library.waterHydronic,
            reason: 'A water-based system with separate air handling can also work well when the project wants better long-term engineering control.',
          },
          {
            ...library.radiantFreshAir,
            reason: 'A good alternative if comfort is also important and the design team is willing to coordinate a more integrated solution.',
          },
        ],
        notRecommended: 'A pure refrigerant-only strategy is less convincing when air handling becomes a dominant part of the brief.',
      };
    }

    return {
      scaleBand,
      loadIntensity,
      highIntensityWarning,
      primary: {
        ...(zoningHigh ? library.dxVrf : library.waterHydronic),
        reason: zoningHigh
          ? 'Many independent rooms make VRF a strong medium-scale zoning strategy.'
          : 'Without extreme zoning or ventilation pressure, a water-based central direction is often the more stable medium-scale choice.',
      },
      alternatives: [
        {
          ...library.airCentral,
          reason: 'Good when open zones, large common areas, or ventilation coordination become more important than room-by-room flexibility.',
        },
        {
          ...library.radiantFreshAir,
          reason: 'Appropriate when comfort and architectural quality move up in priority.',
        },
      ],
    };
  }

  return {
    scaleBand,
    loadIntensity,
    highIntensityWarning,
    primary: {
      ...library.centralPlant,
      reason: 'Once the project reaches large or very large scale, the main question shifts from room device choice to central energy strategy, operating stability, and long-term maintenance logic.',
    },
    alternatives: [
      {
        ...library.waterHydronic,
        reason: 'A hydronic central approach remains a strong and often more conventional alternative for large buildings.',
      },
      {
        ...library.airCentral,
        reason: 'Useful when the project is strongly ventilation-led or dominated by large public or open spaces.',
      },
    ],
    notRecommended: 'Split systems and small distributed DX strategies do not scale efficiently for this building size.',
  };
}

export default function HeatCoolingLoadInteractiveSite() {
  const [view, setView] = useState<AppView>('load');
  const [entries, setEntries] = useState<BuildingEntry[]>([makeEntry(1)]);
  const [expandedEntryId, setExpandedEntryId] = useState<string>('entry-1');
  const [nextId, setNextId] = useState(2);
  const [climate, setClimate] = useState<ClimateKey>('mixed');
  const [unitSystem, setUnitSystem] = useState<UnitSystem>('metric');

  const calculatedEntries = useMemo(() => {
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

      const heatingPerSqm = Math.round(
        clamp(
          space.heatingBase *
            climateF.heatingFactor *
            ceilingF.heatingFactor *
            wwrF.heatingFactor *
            shadingF.heatingFactor *
            envelopeF.heatingFactor *
            airF.heatingFactor *
            internalF.heatingFactor,
          5,
          320,
        ),
      );

      const coolingPerSqm = Math.round(
        clamp(
          space.coolingBase *
            climateF.coolingFactor *
            ceilingF.coolingFactor *
            wwrF.coolingFactor *
            shadingF.coolingFactor *
            envelopeF.coolingFactor *
            airF.coolingFactor *
            internalF.coolingFactor,
          5,
          6000,
        ),
      );

      const areaPerRoom = Number.isFinite(entry.area) ? entry.area : 0;
      const quantity = Number.isFinite(entry.quantity) && entry.quantity > 0 ? entry.quantity : 0;
      const totalArea = areaPerRoom * quantity;
      const totalHeating = entry.enabled ? Math.round(heatingPerSqm * totalArea) : 0;
      const totalCooling = entry.enabled ? Math.round(coolingPerSqm * totalArea) : 0;

      return {
        ...entry,
        categoryName: category.name,
        spaceName: space.name,
        totalArea,
        heatingPerSqm,
        coolingPerSqm,
        totalHeating,
        totalCooling,
      };
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

  const dominantCategory = useMemo(() => {
    const areaByCategory = calculatedEntries.reduce<Record<string, number>>((acc, entry) => {
      if (!entry.enabled) return acc;
      acc[entry.category] = (acc[entry.category] ?? 0) + entry.totalArea;
      return acc;
    }, {});
    const sorted = Object.entries(areaByCategory).sort((a, b) => b[1] - a[1]);
    return (sorted[0]?.[0] as ProgramCategoryKey | undefined) ?? 'office';
  }, [calculatedEntries]);

  const [strategyForm, setStrategyForm] = useState<StrategyForm>({
    buildingType: dominantCategory,
    grossArea: 0,
    totalHeating: 0,
    totalCooling: 0,
    coolingPerArea: 0,
    zoningNeed: 'medium',
    ventilationNeed: 'medium',
    comfortPriority: 'balanced',
  });

  const strategyResult = useMemo(() => recommendStrategy(strategyForm), [strategyForm]);

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
      coolingPerArea: summary.weightedCooling,
      zoningNeed:
        dominantCategory === 'hotel' || dominantCategory === 'residential'
          ? 'high'
          : dominantCategory === 'office'
            ? 'medium'
            : 'medium',
      ventilationNeed:
        dominantCategory === 'healthcare' ||
        dominantCategory === 'education' ||
        dominantCategory === 'retail' ||
        dominantCategory === 'transport'
          ? 'high'
          : 'medium',
      comfortPriority:
        dominantCategory === 'hotel' || dominantCategory === 'culture' || dominantCategory === 'residential'
          ? 'high'
          : 'balanced',
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
                <div className="text-[11px] uppercase tracking-[0.18em] text-sky-600/70">HVAC Strategy Assistant</div>
                <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
                  Rule-based equipment selection guidance
                </h1>
                <p className="mt-2 max-w-5xl text-sm leading-6 text-slate-500">
                  This page starts from total cooling load, then adjusts the recommendation using zoning demand,
                  ventilation demand, comfort priority, building type, and load intensity. The result is not treated
                  as a single correct answer, but as an architectural system strategy discussion starter.
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() => setView('load')}
                className="rounded-full border-black/10 bg-white"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Load Builder
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-10 xl:grid-cols-[minmax(0,1fr)_420px] xl:items-start">
            <LightPanel>
              <CardHeader className="border-b border-black/5 px-6 py-5">
                <CardTitle className="flex items-center gap-2 text-lg font-semibold tracking-tight text-slate-900">
                  <WandSparkles className="h-5 w-5 text-sky-600" /> Strategy Inputs
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 px-6 py-6">
                <StepCard step="Step 1" title="Classify building scale from total cooling load">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <SimpleSelect
                      label="Building Type"
                      value={strategyForm.buildingType}
                      onChange={(value) => setStrategyForm((prev) => ({ ...prev, buildingType: value as ProgramCategoryKey }))}
                      options={Object.fromEntries(Object.entries(programCategories).map(([key, value]) => [key, value.name]))}
                    />
                    <NumberField
                      label={`Gross Area (${unitSystem === 'imperial' ? 'ft²' : 'm²'})`}
                      value={strategyForm.grossArea}
                      onChange={(value) => setStrategyForm((prev) => ({ ...prev, grossArea: value }))}
                    />
                    <NumberField
                      label="Total Cooling Load (W)"
                      value={strategyForm.totalCooling}
                      onChange={(value) => setStrategyForm((prev) => ({ ...prev, totalCooling: value }))}
                    />
                    <NumberField
                      label="Total Heating Load (W)"
                      value={strategyForm.totalHeating}
                      onChange={(value) => setStrategyForm((prev) => ({ ...prev, totalHeating: value }))}
                    />
                  </div>
                  <div className="rounded-2xl border border-black/5 bg-[#fafafc] px-4 py-3 text-sm text-slate-600">
                    The project currently falls in the{' '}
                    <span className="font-semibold text-slate-900">{scaleLabel(strategyResult.scaleBand)}</span> scale
                    band based on total cooling load. This step sets the first system territory before performance
                    priorities modify the result.
                  </div>
                </StepCard>

                <StepCard step="Step 2" title="Read building use characteristics">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <SimpleSelect
                      label="Zoning Need"
                      value={strategyForm.zoningNeed}
                      onChange={(value) => setStrategyForm((prev) => ({ ...prev, zoningNeed: value as ZoningNeed }))}
                      options={{ low: 'Low', medium: 'Medium', high: 'High' }}
                    />
                    <SimpleSelect
                      label="Ventilation Demand"
                      value={strategyForm.ventilationNeed}
                      onChange={(value) => setStrategyForm((prev) => ({ ...prev, ventilationNeed: value as VentilationNeed }))}
                      options={{ low: 'Low', medium: 'Medium', high: 'High' }}
                    />
                    <SimpleSelect
                      label="Comfort Priority"
                      value={strategyForm.comfortPriority}
                      onChange={(value) => setStrategyForm((prev) => ({ ...prev, comfortPriority: value as ComfortPriority }))}
                      options={{ basic: 'Basic / first-cost led', balanced: 'Balanced', high: 'High comfort' }}
                    />
                    <NumberField
                      label={`Cooling Intensity (${unitSystem === 'imperial' ? 'W/ft²' : 'W/m²'})`}
                      value={strategyForm.coolingPerArea}
                      onChange={(value) => setStrategyForm((prev) => ({ ...prev, coolingPerArea: value }))}
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <MiniNote title="Zoning need">
                      High values usually point toward room-by-room or zone-by-zone controllable systems.
                    </MiniNote>
                    <MiniNote title="Ventilation demand">
                      High values usually favor air-handling-led or dedicated outdoor air approaches.
                    </MiniNote>
                    <MiniNote title="Comfort priority">
                      High values increase the appeal of quieter, more even, low-air-velocity strategies.
                    </MiniNote>
                    <MiniNote title="Load intensity">
                      This value is auto-derived from total cooling load and gross area, then used as a diagnostic
                      check for unusual cooling intensity.
                    </MiniNote>
                  </div>
                </StepCard>

                <StepCard step="Step 3" title="Choose a system strategy direction">
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <StrategyTypeChip
                      title={strategyTypeLabel('dx')}
                      text="Best for small to medium projects with strong zoning and distributed control."
                    />
                    <StrategyTypeChip
                      title={strategyTypeLabel('air')}
                      text="Best for large air movement, high ventilation, and open public space conditions."
                    />
                    <StrategyTypeChip
                      title={strategyTypeLabel('water')}
                      text="Best for more engineered medium to large projects and longer distribution distances."
                    />
                    <StrategyTypeChip
                      title={strategyTypeLabel('radiant')}
                      text="Best for high comfort and low-draft architectural environments."
                    />
                  </div>
                </StepCard>

                <StepCard step="Step 4" title="Rank primary and alternative strategies">
                  <div className="space-y-3">
                    <RecommendationBlock title="Primary Recommendation" data={strategyResult.primary} emphasis="primary" />
                    <RecommendationBlock title="Alternative 1" data={strategyResult.alternatives[0]} emphasis="secondary" />
                    <RecommendationBlock title="Alternative 2" data={strategyResult.alternatives[1]} emphasis="secondary" />
                    {strategyResult.notRecommended && (
                      <div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-4 text-sm text-amber-900">
                        <div className="text-[11px] uppercase tracking-[0.12em] text-amber-700">Less Recommended</div>
                        <div className="mt-1">{strategyResult.notRecommended}</div>
                      </div>
                    )}
                  </div>
                </StepCard>
              </CardContent>
            </LightPanel>

            <LightPanel>
              <CardHeader className="border-b border-black/5 px-6 py-5">
                <CardTitle className="flex items-center gap-2 text-lg font-semibold tracking-tight text-slate-900">
                  <Zap className="h-5 w-5 text-sky-600" /> Recommendation Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 px-6 py-6">
                <SummaryStat label="Scale Band" value={scaleLabel(strategyResult.scaleBand)} />
                <SummaryStat label="Detected Building Type" value={programCategories[strategyForm.buildingType].name} />
                <SummaryStat
                  label="Cooling Intensity"
                  value={`${Math.round(strategyForm.coolingPerArea)} ${unitSystem === 'imperial' ? 'W/ft²' : 'W/m²'}`}
                />
                {strategyResult.highIntensityWarning && (
                  <div className="rounded-2xl border border-red-200 bg-red-50/80 p-4 text-sm text-red-800">
                    <div className="text-[11px] uppercase tracking-[0.12em] text-red-600">High-intensity warning</div>
                    <div className="mt-1">
                      This is a high-intensity cooling case. Standard residential or office strategies may not be suitable.
                    </div>
                  </div>
                )}
                <div className="rounded-2xl border border-black/5 bg-[#fafafc] p-4 text-sm leading-6 text-slate-600">
                  The assistant does not assume there is only one correct answer. It first reads scale from total cooling
                  load, then modifies the strategy direction using zoning, ventilation, comfort, building type, and load intensity.
                </div>
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
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-[2.55rem]">
                Interactive Building Heat & Cooling Load Builder
              </h1>
              <p className="mt-2 max-w-5xl text-sm leading-6 text-slate-500 md:text-[15px]">
                Build an entire project by combining multiple rooms or zones. Each entry can use its own building program,
                area, and environmental factors. The system then aggregates all entries into one building-level heating
                and cooling summary.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-black/5 bg-white/90 p-1 shadow-[0_2px_10px_rgba(15,23,42,0.06)] backdrop-blur-sm">
              <button
                type="button"
                onClick={() => setUnitSystem('metric')}
                className={`min-h-[34px] rounded-full px-3 text-[11px] font-medium tracking-tight transition ${
                  unitSystem === 'metric'
                    ? 'bg-sky-600 text-white shadow-sm hover:bg-sky-600'
                    : 'text-slate-500 hover:bg-sky-50 hover:text-sky-700'
                }`}
              >
                m² · W
              </button>
              <button
                type="button"
                onClick={() => setUnitSystem('imperial')}
                className={`min-h-[34px] rounded-full px-3 text-[11px] font-medium tracking-tight transition ${
                  unitSystem === 'imperial'
                    ? 'bg-sky-600 text-white shadow-sm hover:bg-sky-600'
                    : 'text-slate-500 hover:bg-sky-50 hover:text-sky-700'
                }`}
              >
                ft² · W
              </button>
            </div>
          </div>
        </div>

        <LightPanel>
          <CardHeader className="border-b border-black/5 px-6 py-5">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold tracking-tight text-slate-900">
              <SunMedium className="h-5 w-5 text-sky-600" /> Project Location / Climate Zone
            </CardTitle>
          </CardHeader>
          <CardContent className="px-6 py-6">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,520px)_1fr] lg:items-end">
              <div>
                <Select value={climate} onValueChange={(value) => setClimate(value as ClimateKey)}>
                  <SelectTrigger className="h-12 rounded-2xl border-black/5 bg-white text-slate-900 shadow-none">
                    <SelectValue />
                  </SelectTrigger>
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
              <div className="rounded-2xl border border-black/5 bg-[#fafafc] px-4 py-3 text-sm text-slate-500">
                {climateGroups[climate].summary}
              </div>
            </div>
          </CardContent>
        </LightPanel>

        <div className="grid grid-cols-1 gap-10 xl:grid-cols-[minmax(0,1fr)_360px] xl:items-start">
          <LightPanel>
            <CardHeader className="border-b border-black/5 px-6 py-5">
              <div className="flex items-center justify-between gap-4">
                <CardTitle className="flex items-center gap-2 text-lg font-semibold tracking-tight text-slate-900">
                  <Layers3 className="h-5 w-5 text-sky-600" /> Building Program Assembly
                </CardTitle>
                <Button onClick={addEntry} className="rounded-full bg-sky-600 text-white hover:bg-sky-700">
                  <Plus className="mr-1 h-4 w-4" /> Add Space
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-5 px-6 py-6">
              {calculatedEntries.map((entry, index) => {
                const category = programCategories[entry.category];
                const currentSpaces = category.spaces as Record<string, { name: string; heatingBase: number; coolingBase: number }>;
                const isExpanded = expandedEntryId === entry.id;

                return (
                  <div
                    key={entry.id}
                    className="overflow-hidden rounded-[28px] border border-black/5 bg-[#fbfbfd] shadow-[0_4px_20px_rgba(15,23,42,0.04)]"
                  >
                    <div
                      onClick={() => setExpandedEntryId(isExpanded ? '' : entry.id)}
                      className="flex w-full cursor-pointer items-center justify-between gap-4 p-5 text-left transition hover:bg-black/[0.02]"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <Badge
                          variant="secondary"
                          className="rounded-full border-0 bg-sky-100 px-3 py-1 text-sky-700 hover:bg-sky-100"
                        >
                          Space {index + 1}
                        </Badge>

                        <div className="min-w-0">
                          <div className="truncate text-sm font-medium text-slate-800">{entry.customName}</div>
                          <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500">
                            <span>{entry.spaceName}</span>
                            <span>{entry.categoryName}</span>
                            <span>
                              {entry.quantity} × {displayArea(entry.area, unitSystem)}
                            </span>
                            <span>H {entry.totalHeating} W</span>
                            <span>C {entry.totalCooling} W</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            updateEntry(entry.id, { enabled: !entry.enabled });
                          }}
                          className={`rounded-full ${
                            entry.enabled ? 'text-emerald-600 hover:bg-emerald-50' : 'text-slate-400 hover:bg-slate-100'
                          }`}
                        >
                          <Power className="h-4 w-4" />
                        </Button>

                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeEntry(entry.id);
                          }}
                          disabled={entries.length === 1}
                          className="rounded-full text-slate-500 hover:bg-red-50 hover:text-red-600 disabled:opacity-40"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>

                        {isExpanded ? (
                          <ChevronDown className="h-4 w-4 text-slate-500" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-slate-500" />
                        )}
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="border-t border-black/5 p-5">
                        <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-4">
                          <div className="space-y-4 lg:col-span-1 lg:flex lg:flex-col">
                            <SectionLabel icon={<Building2 className="h-4 w-4 text-sky-600" />} label="Program" />

                            <Select
                              value={entry.category}
                              onValueChange={(value) => updateEntry(entry.id, { category: value as ProgramCategoryKey })}
                            >
                              <SelectTrigger className="h-12 rounded-2xl border-black/5 bg-white text-slate-900 shadow-none">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="rounded-2xl border-black/5 bg-white text-slate-900 shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
                                {Object.entries(programCategories).map(([key, value]) => (
                                  <SelectItem key={key} value={key}>
                                    {value.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>

                            <Select
                              value={entry.space}
                              onValueChange={(value) => updateEntry(entry.id, { space: value })}
                            >
                              <SelectTrigger className="h-12 rounded-2xl border-black/5 bg-white text-slate-900 shadow-none">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="rounded-2xl border-black/5 bg-white text-slate-900 shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
                                {Object.entries(currentSpaces).map(([key, value]) => (
                                  <SelectItem key={key} value={key}>
                                    {value.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>

                            <div className="space-y-1">
                              <SectionLabel label="Space Name" />
                              <Input
                                value={entry.customName}
                                onChange={(e) => updateEntry(entry.id, { customName: e.target.value })}
                                className="h-11 rounded-2xl border-black/5 bg-white text-slate-900"
                              />
                            </div>

                            <div className="flex items-center gap-2">
                              <div className="w-20 text-xs text-slate-500">Quantity</div>
                              <Input
                                type="number"
                                min="1"
                                step="1"
                                value={entry.quantity}
                                onChange={(e) =>
                                  updateEntry(entry.id, {
                                    quantity: Math.max(1, Number(e.target.value) || 1),
                                  })
                                }
                                className="h-9 rounded-xl border-black/5 bg-white px-3 text-slate-900"
                              />
                            </div>

                            <div className="flex items-center gap-2">
                              <div className="w-20 text-xs text-slate-500">
                                Area ({unitSystem === 'imperial' ? 'ft²' : 'm²'})
                              </div>
                              <Input
                                type="number"
                                min="0"
                                step="1"
                                value={
                                  unitSystem === 'imperial'
                                    ? Math.round(entry.area * SQFT_PER_SQM)
                                    : Math.round(entry.area)
                                }
                                onChange={(e) =>
                                  updateEntry(entry.id, {
                                    area: parseAreaInput(e.target.value, unitSystem),
                                  })
                                }
                                className="h-9 rounded-xl border-black/5 bg-white px-3 text-slate-900"
                              />
                            </div>
                          </div>

                          <div className="space-y-4 lg:col-span-3 lg:flex lg:h-full lg:flex-col">
                            <SectionLabel icon={<Zap className="h-4 w-4 text-sky-600" />} label="Factors" />

                            <div className="grid h-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                              <FactorSelect
                                title="Height / Ceiling Height"
                                value={entry.ceiling}
                                onChange={(value) => updateEntry(entry.id, { ceiling: value as CeilingKey })}
                                options={Object.fromEntries(
                                  Object.entries(ceilingOptions).map(([key, value]) => [
                                    key,
                                    unitSystem === 'imperial' ? value.imperialName : value.metricName,
                                  ]),
                                )}
                                subtitle="Controls room volume effect on load."
                              />

                              <FactorSelect
                                title="WWR"
                                value={entry.wwr}
                                onChange={(value) => updateEntry(entry.id, { wwr: value as WwrKey })}
                                options={Object.fromEntries(
                                  Object.entries(wwrOptions).map(([key, value]) => [key, value.name]),
                                )}
                                subtitle={wwrOptions[entry.wwr].summary}
                              />

                              <FactorSelect
                                title="Shading"
                                value={entry.shading}
                                onChange={(value) => updateEntry(entry.id, { shading: value as ShadingKey })}
                                options={Object.fromEntries(
                                  Object.entries(shadingOptions).map(([key, value]) => [key, value.name]),
                                )}
                                subtitle={shadingOptions[entry.shading].summary}
                              />

                              <FactorSelect
                                title="Envelope"
                                value={entry.envelope}
                                onChange={(value) => updateEntry(entry.id, { envelope: value as EnvelopeKey })}
                                options={Object.fromEntries(
                                  Object.entries(envelopeOptions).map(([key, value]) => [key, value.name]),
                                )}
                                subtitle={envelopeOptions[entry.envelope].summary}
                              />

                              <FactorSelect
                                title="Air / Ventilation"
                                value={entry.air}
                                onChange={(value) => updateEntry(entry.id, { air: value as AirKey })}
                                options={Object.fromEntries(
                                  Object.entries(airOptions).map(([key, value]) => [key, value.name]),
                                )}
                                subtitle={airOptions[entry.air].summary}
                              />

                              <FactorSelect
                                title="Internal Gains"
                                value={entry.internalGain}
                                onChange={(value) => updateEntry(entry.id, { internalGain: value as InternalGainKey })}
                                options={Object.fromEntries(
                                  Object.entries(internalGainOptions).map(([key, value]) => [key, value.name]),
                                )}
                                subtitle={internalGainOptions[entry.internalGain].summary}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
                          <InfoStat
                            label="Heating / Area"
                            value={`${formatOutputValue(entry.heatingPerSqm, 'W/m²', unitSystem).main} ${
                              formatOutputValue(entry.heatingPerSqm, 'W/m²', unitSystem).primaryUnit
                            }`}
                            secondary={formatOutputValue(entry.heatingPerSqm, 'W/m²', unitSystem).secondary}
                          />
                          <InfoStat
                            label="Cooling / Area"
                            value={`${formatOutputValue(entry.coolingPerSqm, 'W/m²', unitSystem).main} ${
                              formatOutputValue(entry.coolingPerSqm, 'W/m²', unitSystem).primaryUnit
                            }`}
                            secondary={formatOutputValue(entry.coolingPerSqm, 'W/m²', unitSystem).secondary}
                          />
                          <InfoStat
                            label="Total Heating"
                            value={`${formatOutputValue(entry.totalHeating, 'W', unitSystem).main} ${
                              formatOutputValue(entry.totalHeating, 'W', unitSystem).primaryUnit
                            }`}
                            secondary={formatOutputValue(entry.totalHeating, 'W', unitSystem).secondary}
                          />
                          <InfoStat
                            label="Total Cooling"
                            value={`${formatOutputValue(entry.totalCooling, 'W', unitSystem).main} ${
                              formatOutputValue(entry.totalCooling, 'W', unitSystem).primaryUnit
                            }`}
                            secondary={formatOutputValue(entry.totalCooling, 'W', unitSystem).secondary}
                          />
                        </div>

                        <div className="mt-5 flex justify-end">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setExpandedEntryId('')}
                            className="rounded-full border-black/10 bg-white"
                          >
                            Done
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </CardContent>
          </LightPanel>

          <LightPanel>
            <CardHeader className="border-b border-black/5 px-6 py-5">
              <CardTitle className="flex items-center gap-2 text-lg font-semibold tracking-tight text-slate-900">
                <Zap className="h-5 w-5 text-sky-600" /> Building Load Summary
              </CardTitle>
            </CardHeader>

            <CardContent className="flex flex-1 flex-col justify-between space-y-6 px-6 py-6">
              <motion.div
                key={`${summary.totalHeating}-${summary.totalCooling}-${summary.grossArea}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <OutputCard label="Gross Area" value={summary.grossArea} unit="m²" unitSystem={unitSystem} />

                <div className="mt-4">
                  <OutputCard label="Total Heating Load" value={summary.totalHeating} unit="W" unitSystem={unitSystem} />
                </div>

                <div className="mt-4">
                  <OutputCard label="Total Cooling Load" value={summary.totalCooling} unit="W" unitSystem={unitSystem} />
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4">
                  <OutputCard label="Avg Heating" value={summary.weightedHeating} unit="W/m²" unitSystem={unitSystem} compact />
                  <OutputCard label="Avg Cooling" value={summary.weightedCooling} unit="W/m²" unitSystem={unitSystem} compact />
                </div>
              </motion.div>

              <div className="rounded-[24px] border border-black/5 bg-[#fafafc] p-4 text-slate-900">
                <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-sky-600/70">Next Step</div>
                <div className="mt-2 text-sm leading-6 text-slate-600">
                  Move from load estimation into rule-based equipment selection. The next page carries over building type,
                  gross area, and total load, but still lets you adjust the values before generating recommendations.
                </div>
                <Button type="button" onClick={openStrategyAssistant} className="mt-4 rounded-full bg-slate-900 text-white hover:bg-slate-800">
                  <WandSparkles className="mr-2 h-4 w-4" /> HVAC Strategy Assistant
                </Button>
              </div>
            </CardContent>
          </LightPanel>
        </div>
      </div>
    </div>
  );
}

function LightPanel({ children }: { children: React.ReactNode }) {
  return (
    <Card className="flex h-full flex-col overflow-hidden rounded-[30px] border border-black/5 bg-white/82 shadow-[0_14px_36px_rgba(15,23,42,0.08)] backdrop-blur-xl">
      {children}
    </Card>
  );
}

function SectionLabel({ icon, label }: { icon?: React.ReactNode; label: string }) {
  return <div className="flex items-center gap-2 text-sm font-medium text-slate-700">{icon}{label}</div>;
}

function NumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="rounded-2xl border border-black/5 bg-white p-3">
      <div className="mb-2 text-[11px] text-slate-400">{label}</div>
      <Input
        type="number"
        value={Math.round(value)}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
        className="h-10 rounded-2xl border-black/5 bg-[#f7f7fa] text-slate-900 shadow-none"
      />
    </div>
  );
}

function MiniNote({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-black/5 bg-white p-3 text-sm leading-6 text-slate-600">
      <div className="text-[11px] uppercase tracking-[0.12em] text-slate-400">{title}</div>
      <div className="mt-1">{children}</div>
    </div>
  );
}

function StepCard({
  step,
  title,
  children,
}: {
  step: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[24px] border border-black/5 bg-[#fafafc] p-4">
      <div className="text-[11px] uppercase tracking-[0.16em] text-sky-600/70">{step}</div>
      <div className="mt-1 text-base font-semibold text-slate-900">{title}</div>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function StrategyTypeChip({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-black/5 bg-white p-4">
      <div className="text-sm font-semibold text-slate-900">{title}</div>
      <div className="mt-2 text-sm leading-6 text-slate-600">{text}</div>
    </div>
  );
}

function RecommendationBlock({
  title,
  data,
  emphasis,
}: {
  title: string;
  data: RecommendationCardData;
  emphasis: 'primary' | 'secondary';
}) {
  return (
    <div
      className={`rounded-2xl border p-4 ${
        emphasis === 'primary' ? 'border-sky-200 bg-sky-50/70' : 'border-black/5 bg-white'
      }`}
    >
      <div className="text-[11px] uppercase tracking-[0.14em] text-slate-400">{title}</div>
      <div className="mt-1 text-sm font-semibold text-slate-900">{data.title}</div>
      <div className="mt-1 text-xs text-slate-500">{data.systems}</div>
      <div className="mt-3 text-sm leading-6 text-slate-600">{data.reason}</div>
    </div>
  );
}

function SummaryStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-black/5 bg-white p-4">
      <div className="text-[11px] uppercase tracking-[0.12em] text-slate-400">{label}</div>
      <div className="mt-1 text-sm font-semibold text-slate-900">{value}</div>
    </div>
  );
}

function InfoStat({ label, value, secondary }: { label: string; value: string; secondary?: string }) {
  return (
    <div className="rounded-2xl border border-black/5 bg-white p-3">
      <div className="text-slate-500">{label}</div>
      <div className="mt-1 text-lg font-semibold text-slate-900">{value}</div>
      {secondary && <div className="mt-1 text-xs text-slate-400">{secondary}</div>}
    </div>
  );
}

function OutputCard({
  label,
  value,
  unit,
  unitSystem,
  compact = false,
}: {
  label: string;
  value: number;
  unit: 'm²' | 'W/m²' | 'W';
  unitSystem: UnitSystem;
  compact?: boolean;
}) {
  const formatted = formatOutputValue(value, unit, unitSystem);

  return (
    <div className="rounded-[24px] border border-black/5 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.04)]">
      <div className="text-sm text-slate-500">{label}</div>
      <div
        className={`mt-2 font-semibold tracking-tight ${
          compact ? 'text-3xl' : 'text-5xl'
        } ${value === 0 ? 'text-slate-300' : 'text-slate-900'}`}
      >
        {formatted.main} <span className="align-top text-base">{formatted.primaryUnit}</span>
      </div>
      {formatted.secondary && <div className="mt-1 text-xs text-slate-400">{formatted.secondary}</div>}
    </div>
  );
}

function SimpleSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Record<string, string>;
}) {
  return (
    <div className="rounded-2xl border border-black/5 bg-white p-3">
      <div className="mb-2 text-[11px] text-slate-400">{label}</div>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="h-10 rounded-2xl border-black/5 bg-[#f7f7fa] text-slate-900 shadow-none">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="rounded-2xl border-black/5 bg-white text-slate-900 shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
          {Object.entries(options).map(([key, option]) => (
            <SelectItem key={key} value={key}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} />;
}

function FactorSelect({
  title,
  value,
  onChange,
  options,
  subtitle,
}: {
  title: string;
  value: string;
  onChange: (value: string) => void;
  options: Record<string, string>;
  subtitle: string;
}) {
  return (
    <div className="flex h-full min-h-[108px] flex-col rounded-2xl border border-black/5 bg-white p-3">
      <div className="mb-2 text-sm font-medium text-slate-700">{title}</div>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="h-11 rounded-2xl border-black/5 bg-[#f7f7fa] text-slate-900 shadow-none">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="rounded-2xl border-black/5 bg-white text-slate-900 shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
          {Object.entries(options).map(([key, option]) => (
            <SelectItem key={key} value={key}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="mt-auto pt-2 text-[11px] leading-5 text-slate-500">{subtitle}</div>
    </div>
  );
}