import { classifyLifeEvent } from '../lib/rulesEngine/classify';
import { findRelevantServices } from '../lib/rulesEngine/findServices';
import { LIFE_EVENTS } from '../lib/demoData/lifeEvents';

const prompt = 'naa illu cyclone valla koolipoyindi government saayam kaavali';
const res = classifyLifeEvent(prompt);
console.log('Classification:', res);
const lifeEvent = LIFE_EVENTS.find((e) => e.id === res.primaryIntent);
console.log('LifeEvent:', lifeEvent?.id, lifeEvent?.category);

const testProfile: any = {
  residenceState: 'Andhra Pradesh',
  propertyState: 'Andhra Pradesh',
  annualIncome: 180000,
  age: 35,
  isFarmer: true,
  isBPL: true,
  hasHouseDamage: true,
  propertyDamageType: 'severe',
};

const effectiveProfile = { ...testProfile, ...(res.extractedContext || {}) };
const { recommendations, excludedServices } = findRelevantServices(effectiveProfile, lifeEvent!, prompt);
console.log('Top Recs:', recommendations.slice(0, 5).map(r => ({ id: r.serviceId, score: r.confidenceScore })));
console.log('Excluded disaster_house_reconstruction?:', excludedServices.find(e => e.serviceId === 'disaster_house_reconstruction'));
