export {};
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const testCandidates = [
  'https://nsap.nic.in',
  'http://nsap.nic.in',
  'https://pmayg.nic.in',
  'http://pmayg.nic.in',
  'https://mudra.org.in',
  'https://www.mudra.org.in',
  'http://www.mudra.org.in',
  'https://msme.gov.in',
  'https://sfurti.msme.gov.in',
  'http://sfurti.msme.gov.in',
  'https://aspire.msme.gov.in',
  'http://aspire.msme.gov.in',
  'https://kviconline.gov.in',
  'http://kviconline.gov.in',
  'https://jansuraksha.gov.in',
  'http://jansuraksha.gov.in',
  'https://www.jansuraksha.gov.in',
  'https://www.incometax.gov.in',
  'https://incometaxindia.gov.in',
  'https://ddugky.gov.in',
  'http://ddugky.gov.in',
  'https://ddugky.info',
  'https://npscra.nsdl.co.in',
  'http://npscra.nsdl.co.in',
  'https://enps.nsdl.com',
  'https://dahd.nic.in',
  'http://dahd.nic.in',
];

async function run() {
  for (const u of testCandidates) {
    try {
      const controller = new AbortController();
      const t = setTimeout(() => controller.abort(), 8000);
      const res = await fetch(u, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        },
        signal: controller.signal,
      });
      clearTimeout(t);
      console.log(`[${res.status}] ${u}`);
    } catch (e: any) {
      console.log(`[ERR] ${u} -> ${e.message}`);
    }
  }
}

run();
