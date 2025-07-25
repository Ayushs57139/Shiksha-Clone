import puppeteer from 'puppeteer';

async function inspectPage() {
  console.log('Starting page inspection...');
  
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 768 });
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115 Safari/537.36'
    );

    console.log('Navigating to website...');
    await page.goto('https://www.shiksha.com/mba/ranking/top-mba-colleges-in-india/2-2-0-0-0', { 
      waitUntil: 'networkidle2', 
      timeout: 60000 
    });

    await new Promise(resolve => setTimeout(resolve, 5000));

    // Check for common college listing selectors
    const selectors = [
      '.TupleWrapper',
      '.collegeList',
      '.college-tuple',
      '.college-card',
      '.college-item',
      '.listing-tuple',
      '.ranking-tuple',
      '.college-ranking-tuple',
      '.college-box',
      '.college-container'
    ];

    console.log('Checking for possible selectors...');
    for (const selector of selectors) {
      const exists = await page.evaluate((sel) => {
        const elements = document.querySelectorAll(sel);
        return {
          selector: sel,
          count: elements.length,
          exists: elements.length > 0
        };
      }, selector);
      
      console.log(`Selector ${selector}: ${exists.exists ? 'Found' : 'Not found'} (${exists.count} elements)`);
    }

    // Get the page structure
    const pageStructure = await page.evaluate(() => {
      function getElementInfo(element, depth = 0) {
        if (!element) return null;
        
        const children = Array.from(element.children).map(child => getElementInfo(child, depth + 1));
        
        return {
          tag: element.tagName.toLowerCase(),
          id: element.id || null,
          classes: Array.from(element.classList).join(' ') || null,
          childCount: element.children.length,
          depth,
          children: children.filter(Boolean).slice(0, 5) // Limit to first 5 children to avoid huge output
        };
      }
      
      // Get main content area
      const mainContent = document.querySelector('main') || document.querySelector('.content-area') || document.querySelector('.main-content');
      if (mainContent) {
        return getElementInfo(mainContent, 0);
      }
      
      // Fallback to body if no main content area found
      return getElementInfo(document.body, 0);
    });

    console.log('Page structure:');
    console.log(JSON.stringify(pageStructure, null, 2));

    // Take a screenshot
    await page.screenshot({ path: 'shiksha-page.png' });
    console.log('Screenshot saved as shiksha-page.png');

    // Wait for user to review the page
    console.log('Press any key to close the browser...');
    await new Promise(resolve => setTimeout(resolve, 30000));

  } catch (error) {
    console.error('Inspection error:', error);
  } finally {
    await browser.close();
  }
}

inspectPage();