'use client';

import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Building2, SunMedium, Square, Blinds, Shield, Wind, Zap } from 'lucide-react';

type Space = {
  name: string;
  heatingBase: number;
  coolingBase: number;
};

type ProgramCategory = {
  name: string;
  spaces: Record<string, Space>;
};

type FactorOption = {
  name: string;
  heatingFactor: number;
  coolingFactor: number;
  heatingRange?: string;
  coolingRange?: string;
};

const programCategories: Record<string, ProgramCategory> = {
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
};

const climateOptions: Record<string, FactorOption> = {
  cold: { name: 'Cold (Zone 5–7, Chicago)', heatingFactor: 1.35, coolingFactor: 0.9, heatingRange: '1.2–1.5', coolingRange: '0.8–1.0' },
  mixed: { name: 'Mixed (Zone 3–4, NYC)', heatingFactor: 1.0, coolingFactor: 1.0, heatingRange: '1.0', coolingRange: '1.0' },
  hotHumid: { name: 'Hot-humid (Zone 1–2, Miami)', heatingFactor: 0.8, coolingFactor: 1.35, heatingRange: '0.7–0.9', coolingRange: '1.2–1.5' },
  hotDry: { name: 'Hot-dry (Phoenix)', heatingFactor: 0.9, coolingFactor: 1.2, heatingRange: '0.8–1.0', coolingRange: '1.1–1.3' },
};

const wwrOptions: Record<string, FactorOption> = {
  low: { name: '< 20%', heatingFactor: 0.95, coolingFactor: 0.85, heatingRange: '0.9–1.0', coolingRange: '0.8–0.9' },
  baseline: { name: '20–40%', heatingFactor: 1.0, coolingFactor: 1.0, heatingRange: '1.0', coolingRange: '1.0' },
  medium: { name: '40–60%', heatingFactor: 1.2, coolingFactor: 1.3, heatingRange: '1.1–1.3', coolingRange: '1.2–1.4' },
  high: { name: '> 60%', heatingFactor: 1.45, coolingFactor: 1.75, heatingRange: '1.3–1.6', coolingRange: '1.5–2.0' },
};

const shadingOptions: Record<string, FactorOption> = {
  none: { name: 'None', heatingFactor: 1.0, coolingFactor: 1.0, coolingRange: '1.0' },
  internal: { name: 'Internal (curtain)', heatingFactor: 1.0, coolingFactor: 0.925, coolingRange: '0.9–0.95' },
  external: { name: 'External (louver)', heatingFactor: 1.0, coolingFactor: 0.775, coolingRange: '0.7–0.85' },
  dynamic: { name: 'Dynamic shading', heatingFactor: 1.0, coolingFactor: 0.7, coolingRange: '0.6–0.8' },
};

const envelopeOptions: Record<string, FactorOption> = {
  poor: { name: 'Poor (old building)', heatingFactor: 1.45, coolingFactor: 1.15, heatingRange: '1.3–1.6', coolingRange: '1.1–1.2' },
  standard: { name: 'Standard (code)', heatingFactor: 1.0, coolingFactor: 1.0, heatingRange: '1.0', coolingRange: '1.0' },
  highPerformance: { name: 'High-performance', heatingFactor: 0.7, coolingFactor: 0.85, heatingRange: '0.6–0.8', coolingRange: '0.8–0.9' },
};

const airOptions: Record<string, FactorOption> = {
  tight: { name: 'Tight (0.1–0.3 ACH)', heatingFactor: 0.8, coolingFactor: 0.85, heatingRange: '0.7–0.9', coolingRange: '0.8–0.9' },
  typical: { name: 'Typical (0.3–0.7 ACH)', heatingFactor: 1.0, coolingFactor: 1.0, heatingRange: '1.0', coolingRange: '1.0' },
  leaky: { name: 'Leaky (>1.0 ACH)', heatingFactor: 1.35, coolingFactor: 1.2, heatingRange: '1.2–1.5', coolingRange: '1.1–1.3' },
  highVent: { name: 'High ventilation (lab / hospital)', heatingFactor: 1.65, coolingFactor: 1.9, heatingRange: '1.3–2.0', coolingRange: '1.3–2.5' },
};

const internalGainOptions: Record<string, FactorOption> = {
  low: { name: 'Low (residential)', heatingFactor: 1.15, coolingFactor: 0.85, heatingRange: '1.1–1.2', coolingRange: '0.8–0.9' },
  medium: { name: 'Medium (office)', heatingFactor: 1.0, coolingFactor: 1.0, heatingRange: '1.0', coolingRange: '1.0' },
  high: { name: 'High (commercial)', heatingFactor: 0.85, coolingFactor: 1.35, heatingRange: '0.8–0.9', coolingRange: '1.2–1.5' },
  extreme: { name: 'Extreme (kitchen / data center)', heatingFactor: 0.65, coolingFactor: 2.25, heatingRange: '0.5–0.8', coolingRange: '1.5–3.0' },
};

function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max);
}

export default function HeatCoolingLoadInteractiveSite() {
  const [category, setCategory] = useState<string>('residential');
  const [space, setSpace] = useState<string>('apartment');
  const [climate, setClimate] = useState<string>('mixed');
  const [wwr, setWwr] = useState<string>('baseline');
  const [shading, setShading] = useState<string>('none');
  const [envelope, setEnvelope] = useState<string>('standard');
  const [air, setAir] = useState<string>('typical');
  const [internalGain, setInternalGain] = useState<string>('medium');

  const currentCategory = programCategories[category];
  const currentSpace = currentCategory.spaces[space];

  const result = useMemo(() => {
    const p = currentSpace;
    const climateF = climateOptions[climate];
    const wwrF = wwrOptions[wwr];
    const shadingF = shadingOptions[shading];
    const envelopeF = envelopeOptions[envelope];
    const airF = airOptions[air];
    const internalF = internalGainOptions[internalGain];

    return {
      heating: Math.round(
        clamp(
          p.heatingBase *
            climateF.heatingFactor *
            wwrF.heatingFactor *
            shadingF.heatingFactor *
            envelopeF.heatingFactor *
            airF.heatingFactor *
            internalF.heatingFactor,
          5,
          320,
        ),
      ),
      cooling: Math.round(
        clamp(
          p.coolingBase *
            climateF.coolingFactor *
            wwrF.coolingFactor *
            shadingF.coolingFactor *
            envelopeF.coolingFactor *
            airF.coolingFactor *
            internalF.coolingFactor,
          5,
          6000,
        ),
      ),
    };
  }, [currentSpace, climate, wwr, shading, envelope, air, internalGain]);

  return (
    <div className="min-h-screen bg-[#f5f5f7] p-6 md:p-10">
      <div className="mx-auto max-w-[1550px] space-y-8">
        <div className="rounded-[30px] border border-black/5 bg-white/80 px-7 py-6 shadow-[0_10px_30px_rgba(15,23,42,0.06)] backdrop-blur-xl">
      
          <div className="mt-2 flex items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-[2.55rem] font-semibold tracking-tight text-slate-900">
                Interactive Heat & Cooling Load Builder
              </h1>
              <p className="mt-2 max-w-4xl text-sm leading-6 text-slate-500 md:text-[15px]">
                Program input stays unchanged. Load output is modified by six factors: climate, WWR, shading,
                envelope, infiltration / ventilation, and internal gains.
              </p>
            </div>
            <div className="hidden items-center gap-2 rounded-full border border-black/5 bg-[#f0f7ff] px-3 py-2 text-xs text-slate-600 lg:flex">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              Live preview
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 xl:grid-cols-[360px_minmax(0,1fr)_360px] xl:items-start">
          <LightPanel>
            <CardHeader className="border-b border-black/5 px-6 py-5">
              <CardTitle className="flex items-center gap-2 text-lg font-semibold tracking-tight text-slate-900">
                <Building2 className="h-5 w-5 text-sky-600" />
                Program Input
              </CardTitle>
            </CardHeader>

            <CardContent className="flex flex-1 flex-col space-y-5 px-6 py-6">
              <Select
                value={category}
                onValueChange={(value) => {
                  setCategory(value);
                  const firstSpace = Object.keys(programCategories[value].spaces)[0];
                  setSpace(firstSpace);
                }}
              >
                <SelectTrigger className="h-12 rounded-2xl border-black/5 bg-[#f7f7fa] text-slate-900 shadow-none">
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

              <Select value={space} onValueChange={setSpace}>
                <SelectTrigger className="h-12 rounded-2xl border-black/5 bg-[#f7f7fa] text-slate-900 shadow-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-black/5 bg-white text-slate-900 shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
                  {Object.entries(currentCategory.spaces).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {value.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="rounded-[24px] border border-black/5 bg-[#fafafc] p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">Selected</span>
                  <Badge
                    variant="secondary"
                    className="rounded-full border-0 bg-sky-100 px-3 py-1 text-sky-700 hover:bg-sky-100"
                  >
                    {currentSpace.name}
                  </Badge>
                </div>

                <Separator className="my-4 bg-black/5" />

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <InfoStat label="Base Heating" value={`${currentSpace.heatingBase} W/m²`} />
                  <InfoStat label="Base Cooling" value={`${currentSpace.coolingBase} W/m²`} />
                </div>
              </div>
            </CardContent>
          </LightPanel>

          <div className="grid h-full auto-rows-fr grid-cols-1 gap-5 px-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:px-4">
            <FactorCard title="Climate" icon={<SunMedium className="h-4 w-4 text-sky-600" />}>
              <Select value={climate} onValueChange={setClimate}>
                <SelectTrigger className="h-12 rounded-2xl border-black/5 bg-[#f7f7fa] text-slate-900 shadow-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-black/5 bg-white text-slate-900 shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
                  {Object.entries(climateOptions).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {value.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <RangeBox
                heating={climateOptions[climate].heatingRange ?? '-'}
                cooling={climateOptions[climate].coolingRange ?? '-'}
              />
            </FactorCard>

            <FactorCard title="WWR" icon={<Square className="h-4 w-4 text-sky-600" />}>
              <Select value={wwr} onValueChange={setWwr}>
                <SelectTrigger className="h-12 rounded-2xl border-black/5 bg-[#f7f7fa] text-slate-900 shadow-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-black/5 bg-white text-slate-900 shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
                  {Object.entries(wwrOptions).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {value.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <RangeBox
                heating={wwrOptions[wwr].heatingRange ?? '-'}
                cooling={wwrOptions[wwr].coolingRange ?? '-'}
              />
            </FactorCard>

            <FactorCard title="Shading" icon={<Blinds className="h-4 w-4 text-sky-600" />}>
              <Select value={shading} onValueChange={setShading}>
                <SelectTrigger className="h-12 rounded-2xl border-black/5 bg-[#f7f7fa] text-slate-900 shadow-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-black/5 bg-white text-slate-900 shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
                  {Object.entries(shadingOptions).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {value.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="rounded-2xl border border-black/5 bg-[#fafafc] px-3 py-2 text-[11px] leading-5 text-slate-500">
                Cooling factor: {shadingOptions[shading].coolingRange ?? '-'}
              </div>
            </FactorCard>

            <FactorCard title="Envelope" icon={<Shield className="h-4 w-4 text-sky-600" />}>
              <Select value={envelope} onValueChange={setEnvelope}>
                <SelectTrigger className="h-12 rounded-2xl border-black/5 bg-[#f7f7fa] text-slate-900 shadow-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-black/5 bg-white text-slate-900 shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
                  {Object.entries(envelopeOptions).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {value.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <RangeBox
                heating={envelopeOptions[envelope].heatingRange ?? '-'}
                cooling={envelopeOptions[envelope].coolingRange ?? '-'}
              />
            </FactorCard>

            <FactorCard title="Air / Ventilation" icon={<Wind className="h-4 w-4 text-sky-600" />}>
              <Select value={air} onValueChange={setAir}>
                <SelectTrigger className="h-12 rounded-2xl border-black/5 bg-[#f7f7fa] text-slate-900 shadow-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-black/5 bg-white text-slate-900 shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
                  {Object.entries(airOptions).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {value.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <RangeBox
                heating={airOptions[air].heatingRange ?? '-'}
                cooling={airOptions[air].coolingRange ?? '-'}
              />
            </FactorCard>

            <FactorCard title="Internal Gains" icon={<Zap className="h-4 w-4 text-sky-600" />}>
              <Select value={internalGain} onValueChange={setInternalGain}>
                <SelectTrigger className="h-12 rounded-2xl border-black/5 bg-[#f7f7fa] text-slate-900 shadow-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-black/5 bg-white text-slate-900 shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
                  {Object.entries(internalGainOptions).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {value.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <RangeBox
                heating={internalGainOptions[internalGain].heatingRange ?? '-'}
                cooling={internalGainOptions[internalGain].coolingRange ?? '-'}
              />
            </FactorCard>
          </div>

          <LightPanel>
            <CardHeader className="border-b border-black/5 px-6 py-5">
              <CardTitle className="flex items-center gap-2 text-lg font-semibold tracking-tight text-slate-900">
                <Zap className="h-5 w-5 text-sky-600" />
                Load Output
              </CardTitle>
            </CardHeader>

            <CardContent className="flex flex-1 flex-col justify-between space-y-6 px-6 py-6">
              <motion.div key={`${result.heating}-${result.cooling}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                <OutputCard label="Heating Load" value={result.heating} />
                <div className="mt-4">
                  <OutputCard label="Cooling Load" value={result.cooling} />
                </div>
              </motion.div>

              <div className="rounded-[24px] border border-black/5 bg-[#fafafc] p-5 text-slate-900">
                <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-sky-600/70">
                  Calculation Logic
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Final load = program baseline × climate × WWR × shading × envelope × air / ventilation ×
                  internal gains.
                </p>
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
    <Card className="h-full flex flex-col overflow-hidden rounded-[30px] border border-black/5 bg-white/82 shadow-[0_14px_36px_rgba(15,23,42,0.08)] backdrop-blur-xl">
      {children}
    </Card>
  );
}

function InfoStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-black/5 bg-white p-3">
      <div className="text-slate-500">{label}</div>
      <div className="mt-1 text-lg font-semibold text-slate-900">{value}</div>
    </div>
  );
}

function OutputCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-[24px] border border-black/5 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.04)]">
      <div className="text-sm text-slate-500">{label}</div>
      <div className="mt-2 text-5xl font-semibold tracking-tight text-slate-900">{value}</div>
      <div className="mt-1 text-xs uppercase tracking-wide text-slate-400">W/m²</div>
    </div>
  );
}

function FactorCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Card className="h-full flex flex-col overflow-hidden rounded-[28px] border border-black/5 bg-white/82 shadow-[0_10px_28px_rgba(15,23,42,0.06)] backdrop-blur-xl">
      <CardHeader className="space-y-1 border-b border-black/5 px-6 py-5">
        <CardTitle className="flex items-center gap-2 text-[15px] font-semibold tracking-tight text-slate-900">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 space-y-5 px-6 py-6">{children}</CardContent>
    </Card>
  );
}

function RangeBox({ heating, cooling }: { heating: string; cooling: string }) {
  return (
    <div className="rounded-2xl border border-black/5 bg-[#fafafc] px-3 py-2 text-[11px] leading-5 text-slate-500">
      <div>Heating: {heating}</div>
      <div>Cooling: {cooling}</div>
    </div>
  );
}