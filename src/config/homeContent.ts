import type { ComponentType, SVGProps } from 'react';
import {
  DevicePhoneMobileIcon,
  CheckCircleIcon,
  SparklesIcon,
  BoltIcon,
  GlobeAltIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline';

export type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export interface BenefitCard {
  title: string;
  description: string;
  icon: IconComponent;
}

export const benefits: BenefitCard[] = [
  {
    title: 'Capture knowledge systematically',
    description:
      'Critical know-how is structured, versioned and available where the work happens—not hidden in emails or only in experts’ heads.',
    icon: DevicePhoneMobileIcon,
  },
  {
    title: 'Guide people in context',
    description:
      'Instructions appear step by step at the moment of need, so operators don’t search portals while a line is down.',
    icon: CheckCircleIcon,
  },
  {
    title: 'Let the system learn from every task',
    description:
      'Each execution generates time, error and confirmation data—closing the loop to improve procedures, training and equipment settings.',
    icon: SparklesIcon,
  },
  {
    title: 'Faster',
    description:
      'Employees find and apply the right instruction immediately. Onboarding shortens, troubleshooting speeds up, and changeovers become repeatable.',
    icon: BoltIcon,
  },
  {
    title: 'Safer',
    description:
      'Standardized, visual and auditable instructions reduce variance, incidents and compliance risk—safety steps are built into the flow of work.',
    icon: GlobeAltIcon,
  },
  {
    title: 'Smarter',
    description:
      'Knowledge improves with every execution. Lessons learned in one site can be applied everywhere, building a learning organization.',
    icon: UserGroupIcon,
  },
];

export interface IndustryCard {
  title: string;
  icon: IconComponent;
}

export const industries: IndustryCard[] = [
  { title: 'Industrial Manufacturing', icon: Cog6ToothIcon },
  { title: 'Energy & Utilities', icon: BoltIcon },
  { title: 'Aerospace', icon: GlobeAltIcon },
  { title: 'Pharma & Biotech', icon: SparklesIcon },
  { title: 'Field Services', icon: WrenchScrewdriverIcon },
  { title: 'Maintenance Operations', icon: UserGroupIcon },
];

export interface HowItWorksStep {
  title: string;
  description: string;
}

export const howItWorksSteps: HowItWorksStep[] = [
  {
    title: 'Future of work briefing',
    description:
      'Joint session with operations, HR/L&D and IT on the trends behind “faster, safer, smarter” and what they mean for your sites.',
  },
  {
    title: 'Use case discovery',
    description:
      'Identify and prioritize 3–5 high-impact situations where AR and AI guidance could remove friction, reduce errors or shorten training.',
  },
  {
    title: 'Pilot with clear KPIs',
    description:
      'Implement one or two use cases with clear KPIs (e.g., First Time Right, cycle time, onboarding time, downtime) and a decision framework for scaling.',
  },
  {
    title: 'Scale and enable',
    description:
      'Provide playbooks and enablement so teams can standardize across lines, plants and countries with local ownership.',
  },
];
