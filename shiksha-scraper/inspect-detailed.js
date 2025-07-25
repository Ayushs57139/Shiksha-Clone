import puppeteer from 'puppeteer';

async function inspectDetailed() {
  console.log('Starting detailed inspection...');
  
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null, // Use full viewport
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--start-maximized'],
  });

  try {
    const page = await browser.newPage();
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115 Safari/537.36'
    );

    // Enable console logging from the browser
    page.on('console', msg => console.log('BROWSER:', msg.text()));

    console.log('Navigating to website...');
    await page.goto('https://www.shiksha.com/mba/ranking/top-mba-colleges-in-india/2-2-0-0-0', { 
      waitUntil: 'networkidle2', 
      timeout: 60000 
    });

    // Wait for page to fully load
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Scroll down to load more content
    await page.evaluate(() => {
      window.scrollBy(0, 500);
    });
    
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Analyze the page structure
    const pageAnalysis = await page.evaluate(() => {
      // Helper function to get text content
      const getText = (el) => el ? el.innerText.trim() : '';
      
      // Look for college listings
      const results = {};
      
      // Check for college names
      const collegeNameElements = Array.from(document.querySelectorAll('h2, h3, h4, div, span'))
        .filter(el => {
          const text = getText(el);
          return (
            (text.includes('Institute') || 
             text.includes('College') || 
             text.includes('University') || 
             text.includes('School of') || 
             text.includes('IIM') || 
             text.includes('IIT')) &&
            text.length < 100 && 
            text.length > 10
          );
        });
      
      results.possibleCollegeNames = collegeNameElements.slice(0, 10).map(el => ({
        text: getText(el),
        tag: el.tagName.toLowerCase(),
        className: el.className,
        id: el.id,
        parentClass: el.parentElement ? el.parentElement.className : '',
        grandparentClass: el.parentElement && el.parentElement.parentElement ? 
                         el.parentElement.parentElement.className : ''
      }));
      
      // Look for ranking elements
      const rankElements = Array.from(document.querySelectorAll('div, span'))
        .filter(el => {
          const text = getText(el);
          return text.match(/^#\d+$/) || text.match(/^Rank\s*\d+$/) || text.match(/^Ranked\s*\d+$/);
        });
      
      results.rankElements = rankElements.slice(0, 5).map(el => ({
        text: getText(el),
        tag: el.tagName.toLowerCase(),
        className: el.className,
        parentClass: el.parentElement ? el.parentElement.className : ''
      }));
      
      // Look for fee elements
      const feeElements = Array.from(document.querySelectorAll('div, span'))
        .filter(el => {
          const text = getText(el);
          return (text.includes('₹') || text.includes('Rs') || text.includes('INR')) && 
                 (text.includes('Lakh') || text.includes('lakhs') || text.includes('L') || 
                  text.includes('Cr') || text.match(/\d{1,2},\d{2,3}/));
        });
      
      results.feeElements = feeElements.slice(0, 5).map(el => ({
        text: getText(el),
        tag: el.tagName.toLowerCase(),
        className: el.className,
        parentClass: el.parentElement ? el.parentElement.className : ''
      }));
      
      // Look for location elements
      const locationElements = Array.from(document.querySelectorAll('div, span'))
        .filter(el => {
          const text = getText(el);
          const indianCities = ['Delhi', 'Mumbai', 'Bangalore', 'Kolkata', 'Chennai', 
                               'Hyderabad', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow',
                               'Kanpur', 'Nagpur', 'Indore', 'Thane', 'Bhopal', 'Noida', 'Gurgaon'];
          return indianCities.some(city => text.includes(city)) && text.length < 50;
        });
      
      results.locationElements = locationElements.slice(0, 5).map(el => ({
        text: getText(el),
        tag: el.tagName.toLowerCase(),
        className: el.className,
        parentClass: el.parentElement ? el.parentElement.className : ''
      }));
      
      // Find potential college card containers
      const potentialContainers = [];
      
      // Method 1: Look for elements that contain both college name and other info
      for (const nameEl of collegeNameElements) {
        let container = nameEl.parentElement;
        let depth = 0;
        const maxDepth = 5;
        
        while (container && depth < maxDepth) {
          const containerText = getText(container);
          const hasRank = containerText.match(/#\d+/) || containerText.match(/Rank\s*\d+/);
          const hasFees = containerText.includes('₹') || containerText.includes('Lakh') || 
                         containerText.includes('Fee');
          const hasLocation = locationElements.some(locEl => containerText.includes(getText(locEl)));
          
          if ((hasRank || hasFees || hasLocation) && container.children.length >= 2) {
            potentialContainers.push({
              element: container,
              tag: container.tagName.toLowerCase(),
              className: container.className,
              id: container.id,
              childCount: container.children.length,
              text: containerText.substring(0, 100) + '...',
              score: (hasRank ? 1 : 0) + (hasFees ? 1 : 0) + (hasLocation ? 1 : 0)
            });
            break;
          }
          
          container = container.parentElement;
          depth++;
        }
      }
      
      // Sort by score (higher is better)
      potentialContainers.sort((a, b) => b.score - a.score);
      
      results.potentialContainers = potentialContainers
        .filter((container, index, self) => 
          // Remove duplicates
          index === self.findIndex(c => c.className === container.className))
        .slice(0, 5);
      
      return results;
    });

    console.log('Page Analysis Results:');
    console.log(JSON.stringify(pageAnalysis, null, 2));

    // Take a screenshot
    await page.screenshot({ path: 'shiksha-detailed.png', fullPage: true });
    console.log('Screenshot saved as shiksha-detailed.png');

    // Wait for user to review
    console.log('Press any key to close the browser...');
    await new Promise(resolve => setTimeout(resolve, 30000));

  } catch (error) {
    console.error('Inspection error:', error);
  } finally {
    await browser.close();
  }
}

inspectDetailed();