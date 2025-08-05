# College Data Organization

This folder contains all college-related data files organized in a clean structure.

## Files

### NIRF Data Files
- `nirfAgricultureData.js` - NIRF Agriculture Rankings 2024 data
- `nirfArchitectureData.js` - NIRF Architecture Rankings 2024 data
- `nirfInnovationData.js` - NIRF Innovation Rankings 2024 data
- `nirfOpenUniversityData.js` - NIRF Open University Rankings 2024 data
- `nirfResearchData.js` - NIRF Research Rankings 2024 data
- `nirfSkillUniversityData.js` - NIRF Skill University Rankings 2024 data
- `nirfStatePublicUniversityData.js` - NIRF State Public University Rankings 2024 data

### Other College Data
- `collegeImages.js` - College image data and utilities

## Usage

These files are imported by:
- `src/components/CollegeList.jsx` - Main college listing component
- `server/nirf_scripts/` - Server-side scripts for database operations

## Data Structure

Each NIRF data file exports:
- Main data array with college information
- Utility functions for filtering and searching
- Helper functions for specific categories

## Import Paths

After reorganization, all imports should use:
```javascript
import { dataName } from '../data/college_data/fileName';
``` 