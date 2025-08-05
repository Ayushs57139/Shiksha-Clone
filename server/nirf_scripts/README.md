# NIRF Scripts

This folder contains server-side scripts for adding NIRF college data to the database.

## Files

- `add-nirf-agriculture.js` - Add NIRF Agriculture Rankings 2024 data
- `add-nirf-architecture.js` - Add NIRF Architecture Rankings 2024 data
- `add-nirf-data.js` - Add NIRF Research Rankings 2024 data
- `add-nirf-innovation.js` - Add NIRF Innovation Rankings 2024 data
- `add-nirf-open-university.js` - Add NIRF Open University Rankings 2024 data
- `add-nirf-skill-university.js` - Add NIRF Skill University Rankings 2024 data
- `add-nirf-state-public-university.js` - Add NIRF State Public University Rankings 2024 data
- `add-nirf-simple.js` - Simple NIRF data addition script

## Usage

Run any script to add the corresponding NIRF data to the MongoDB database:

```bash
node add-nirf-agriculture.js
node add-nirf-architecture.js
# etc.
```

## Data Source

All scripts import data from `../src/data/college_data/` folder and add it to the `shiksha` database.

## Database Operations

Each script:
1. Connects to MongoDB
2. Clears existing data for the category
3. Inserts new NIRF data
4. Verifies the insertion
5. Shows sample data and top institutions 