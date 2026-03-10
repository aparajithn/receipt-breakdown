import { Category } from '@/types';

const categoryKeywords: Record<Category, string[]> = {
  lumber: ['lumber', 'wood', 'plywood', '2x4', '2x6', '2x8', 'board', 'beam', 'stud', 'framing', 'osb', 'mdf'],
  paint: ['paint', 'primer', 'stain', 'coating', 'varnish', 'sealer', 'gallon', 'brush', 'roller'],
  hardware: ['nail', 'screw', 'bolt', 'nut', 'fastener', 'anchor', 'hinge', 'bracket', 'hook'],
  tools: ['drill', 'saw', 'hammer', 'wrench', 'screwdriver', 'tool', 'ladder', 'level', 'tape measure'],
  electrical: ['wire', 'cable', 'outlet', 'switch', 'breaker', 'electrical', 'conduit', 'junction box'],
  plumbing: ['pipe', 'fitting', 'valve', 'faucet', 'plumbing', 'pex', 'copper', 'drain', 'toilet', 'sink'],
  hvac: ['hvac', 'duct', 'vent', 'filter', 'thermostat', 'furnace', 'ac unit', 'air conditioner'],
  consumables: ['tape', 'glue', 'caulk', 'adhesive', 'sandpaper', 'rag', 'cleaner', 'disposable', 'mask'],
  other: []
};

export function categorizeItem(description: string): Category {
  const lowerDesc = description.toLowerCase();
  
  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    if (category === 'other') continue;
    
    for (const keyword of keywords) {
      if (lowerDesc.includes(keyword)) {
        return category as Category;
      }
    }
  }
  
  return 'other';
}
