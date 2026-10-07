import { describe, it, expect } from 'vitest';
import { tokens } from '../../src/design-system/tokens';
import { spacing } from '../../src/design-system/spacing';
import { breakpoints, gridColumns } from '../../src/design-system/breakpoints';
import { projectsData, getProjectById } from '../../src/features/work/projectsData';

describe('AGNEX Design System Tokens', () => {
  it('should define core brand palette correctly', () => {
    expect(tokens.colors.base).toBe('#0B0D10');
    expect(tokens.colors.white).toBe('#F7F8FA');
    expect(tokens.colors.graphite).toBe('#20242B');
    expect(tokens.colors.steel).toBe('#7C8490');
    expect(tokens.colors.accent).toBe('#057AEF');
  });

  it('should define proper typography fonts', () => {
    expect(tokens.typography.display).toContain('Space Grotesk');
    expect(tokens.typography.sans).toContain('Inter');
  });

  it('should define disciplined geometric spacing scale', () => {
    expect(spacing[1]).toBe('0.25rem');
    expect(spacing[4]).toBe('1rem');
    expect(spacing[8]).toBe('2rem');
  });

  it('should adhere to 12-8-4 grid column standard', () => {
    expect(gridColumns.desktop).toBe(12);
    expect(gridColumns.tablet).toBe(8);
    expect(gridColumns.mobile).toBe(4);
    expect(breakpoints.mobile).toBe('430px');
    expect(breakpoints.tablet).toBe('768px');
  });
});

describe('AGNEX Case Studies Data Store', () => {
  it('should have all 4 core AGNEX engineering works defined with valid fields', () => {
    expect(projectsData.length).toBe(4);
    const expectedIds = ['rda', 'skynet', 'lawguide-ai', 'sentinelx-ai'];
    expect(projectsData.map((p) => p.id)).toEqual(expectedIds);

    projectsData.forEach((project) => {
      expect(project.id).toBeDefined();
      expect(project.name).toBeDefined();
      expect(project.title).toBeDefined();
      expect(project.category).toBeDefined();
      expect(project.challenge).toBeDefined();
      expect(project.approach).toBeDefined();
      expect(project.whatWeBuilt.length).toBeGreaterThan(0);
      expect(project.architecture).toBeDefined();
      expect(project.engineeringDecisions.length).toBeGreaterThan(0);
      expect(project.technologies.length).toBeGreaterThan(0);
      expect(project.systemFlow).toBeDefined();
      expect(project.securityReliability.length).toBeGreaterThan(0);
      expect(project.evolution).toBeDefined();
    });
  });

  it('should retrieve project by ID correctly across all 4 works', () => {
    const rda = getProjectById('rda');
    expect(rda).toBeDefined();
    expect(rda?.domain).toBe('Logistics');
    expect(rda?.name).toBe('RDA');

    const skynet = getProjectById('skynet');
    expect(skynet).toBeDefined();
    expect(skynet?.domain).toBe('Cybersecurity');
    expect(skynet?.name).toBe('SKYNET v5.0');

    const lawGuide = getProjectById('lawguide-ai');
    expect(lawGuide).toBeDefined();
    expect(lawGuide?.domain).toBe('Legal AI');
    expect(lawGuide?.disclaimer).toBeDefined();

    const sentinelX = getProjectById('sentinelx-ai');
    expect(sentinelX).toBeDefined();
    expect(sentinelX?.domain).toBe('Cybersecurity');
    expect(sentinelX?.statusBadge).toBe('v0.1.0 Foundation');
  });

  it('should verify defensive and regulatory boundaries', () => {
    const skynet = getProjectById('skynet');
    expect(skynet?.securityBoundary).toContain('Automation where appropriate. Human control where it matters.');

    const lawGuide = getProjectById('lawguide-ai');
    expect(lawGuide?.disclaimer).toContain('informational assistance, not legal advice');

    const sentinelX = getProjectById('sentinelx-ai');
    expect(sentinelX?.securityBoundary).toContain('DEFENSIVE BOUNDARY');
  });
});

describe('Official AGNEX Brand Assets', () => {
  it('should verify official logo and favicon files exist', async () => {
    const fs = await import('fs');
    const path = await import('path');
    
    const brandFiles = [
      'agnex-logo.svg',
      'agnex-logo-light.svg',
      'agnex-mark.svg',
      'agnex-favicon.svg',
      'agnex-og.png',
      'README.md'
    ];
    
    brandFiles.forEach((file) => {
      const p = path.resolve('public/brand', file);
      expect(fs.existsSync(p), `Missing brand asset: ${file}`).toBe(true);
    });

    const faviconFiles = [
      'favicon.svg',
      'favicon.ico',
      'favicon-32.png',
      'favicon-180.png',
      'favicon-192.png',
      'favicon-512.png'
    ];

    faviconFiles.forEach((file) => {
      const p = path.resolve('public', file);
      expect(fs.existsSync(p), `Missing favicon file: ${file}`).toBe(true);
    });
  });
});
