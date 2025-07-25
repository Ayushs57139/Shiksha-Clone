import puppeteer from 'puppeteer';

async function inspectSelectors() {
  console.log('Starting selector inspection...');
  
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

    // Log all div elements with their classes
    const divElements = await page.evaluate(() => {
      const divs = document.querySelectorAll('div');
      return Array.from(divs)
        .filter(div => div.className && div.className.length > 0)
        .map(div => ({
          className: div.className,
          childCount: div.children.length,
          text: div.innerText.substring(0, 50) + (div.innerText.length > 50 ? '...' : ''),
          hasCollegeInfo: div.innerText.toLowerCase().includes('college') || 
                         div.innerText.toLowerCase().includes('institute') ||
                         div.innerText.toLowerCase().includes('university')
        }))
        .filter(div => div.hasCollegeInfo)
        .slice(0, 20); // Limit to 20 results
    });

    console.log('Potential college listing elements:');
    console.log(JSON.stringify(divElements, null, 2));

    // Check for specific elements that might contain college listings
    const collegeElements = await page.evaluate(() => {
      // Look for elements that might be college cards/listings
      const possibleSelectors = [
        '.alter_touple',
        '.college-card',
        '.ranking-card',
        '.college-list-item',
        '.college-tuple',
        '.ranking-tuple',
        '.college-box',
        '.listing-item',
        '.college-listing',
        '.ranking-list-item'
      ];

      const results = {};
      
      for (const selector of possibleSelectors) {
        const elements = document.querySelectorAll(selector);
        if (elements.length > 0) {
          results[selector] = {
            count: elements.length,
            firstElementHTML: elements[0].outerHTML.substring(0, 500) + '...'
          };
        }
      }

      return results;
    });

    console.log('\nCollege element selectors found:');
    console.log(JSON.stringify(collegeElements, null, 2));

    // Take a screenshot with annotations
    await page.evaluate(() => {
      const style = document.createElement('style');
      style.innerHTML = `
        .alter_touple { border: 3px solid red !important; }
        .college-card { border: 3px solid blue !important; }
        .ranking-card { border: 3px solid green !important; }
        .college-list-item { border: 3px solid yellow !important; }
        .college-tuple { border: 3px solid purple !important; }
        .ranking-tuple { border: 3px solid orange !important; }
      `;
      document.head.appendChild(style);
    });

    await page.screenshot({ path: 'shiksha-selectors.png' });
    console.log('Screenshot with highlighted selectors saved as shiksha-selectors.png');

    // Wait for user to review
    console.log('Press any key to close the browser...');
    await new Promise(resolve => setTimeout(resolve, 30000));

  } catch (error) {
    console.error('Inspection error:', error);
  } finally {
    await browser.close();
  }
}

inspectSelectors();