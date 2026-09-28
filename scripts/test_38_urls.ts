export {};
const urls = [
  'https://pmkisan.gov.in',
  'https://pmfby.gov.in',
  'https://agrimachinery.nic.in',
  'https://pmkusum.mnre.gov.in',
  'https://dahd.nic.in',
  'https://nlm.udyamimitra.in',
  'https://dof.gov.in',
  'https://pmmsy.dof.gov.in',
  'https://www.jansamarth.in',
  'https://nsap.nic.in',
  'https://ndma.gov.in',
  'https://pmayg.nic.in',
  'https://pmaymis.gov.in',
  'https://pmsuryaghar.gov.in',
  'https://www.mudra.org.in',
  'https://www.cgtmse.in',
  'https://pmvishwakarma.gov.in',
  'https://www.kviconline.gov.in/pmegp',
  'https://aspire.msme.gov.in',
  'https://sfurti.msme.gov.in',
  'https://www.nsic.co.in',
  'https://pmjdy.gov.in',
  'https://www.jansuraksha.gov.in',
  'https://www.pfrda.org.in',
  'https://npscra.nsdl.co.in',
  'https://uidai.gov.in',
  'https://myaadhaar.uidai.gov.in',
  'https://incometax.gov.in',
  'https://voters.eci.gov.in',
  'https://passportindia.gov.in',
  'https://rural.gov.in',
  'https://ddugky.gov.in',
  'https://www.ncs.gov.in',
  'https://nulm.gov.in',
  'https://pmsvanidhi.mohua.gov.in',
];

async function run() {
  for (const u of urls) {
    try {
      const controller = new AbortController();
      const t = setTimeout(() => controller.abort(), 12000);
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
