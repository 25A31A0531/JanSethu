import { HEALTHCARE_CENTRAL_SERVICES } from '../lib/demoData/services/healthcareCentral';
import { HEALTHCARE_STATE_SERVICES } from '../lib/demoData/services/healthcareState';

async function checkUrl(url: string): Promise<{ url: string; status: number | string; ok: boolean }> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      signal: controller.signal,
    });
    clearTimeout(timeout);
    return { url, status: res.status, ok: res.status < 400 || res.status === 403 || res.status === 401 };
  } catch (err: any) {
    return { url, status: err.message || 'FAILED', ok: false };
  }
}

async function main() {
  const allServices = [...HEALTHCARE_CENTRAL_SERVICES, ...HEALTHCARE_STATE_SERVICES];
  const urlMap = new Map<string, string[]>();

  for (const s of allServices) {
    const urls = new Set<string>();
    if (s.sourceUrl) urls.add(s.sourceUrl);
    if (s.applicationUrl) urls.add(s.applicationUrl);
    if (s.steps) {
      for (const st of s.steps) {
        if (st.portalUrl) urls.add(st.portalUrl);
      }
    }
    for (const u of urls) {
      if (!urlMap.has(u)) urlMap.set(u, []);
      urlMap.get(u)!.push(`${s.id} (${s.name})`);
    }
  }

  console.log(`Found ${urlMap.size} unique URLs to test across healthcare schemes...\n`);

  const results: any[] = [];
  for (const [url, schemes] of urlMap.entries()) {
    process.stdout.write(`Testing: ${url}... `);
    const res = await checkUrl(url);
    console.log(`Status: ${res.status}`);
    results.push({ ...res, schemes });
  }

  console.log('\n====================================================');
  console.log('URL VERIFICATION RESULTS:');
  console.log('====================================================');
  const failures = results.filter(r => !r.ok);
  const successes = results.filter(r => r.ok);

  console.log(`\nWorking URLs (${successes.length}):`);
  for (const s of successes) {
    console.log(`  ✓ [${s.status}] ${s.url}`);
  }

  console.log(`\nFailing / Unreachable URLs (${failures.length}):`);
  for (const f of failures) {
    console.log(`  ✗ [${f.status}] ${f.url} -> used in: ${f.schemes.join(', ')}`);
  }
}

main();
