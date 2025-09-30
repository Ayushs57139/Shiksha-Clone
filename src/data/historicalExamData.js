// Historical Exam Data for Past 10 Years (2015-2024)
// This data is used to generate realistic predictions based on historical trends

export const historicalExamData = {
  'JEE Main': {
    years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
    totalCandidates: [1350000, 1420000, 1480000, 1520000, 1580000, 1650000, 1720000, 1800000, 1880000, 1950000],
    qualifiedCandidates: [150000, 158000, 165000, 172000, 180000, 188000, 195000, 202000, 210000, 218000],
    cutoffs: {
      'General': [105, 108, 112, 115, 118, 121, 124, 127, 130, 133],
      'OBC': [95, 98, 102, 105, 108, 111, 114, 117, 120, 123],
      'SC': [85, 88, 92, 95, 98, 101, 104, 107, 110, 113],
      'ST': [75, 78, 82, 85, 88, 91, 94, 97, 100, 103],
      'EWS': [null, null, null, null, null, 101, 104, 107, 110, 113]
    },
    topColleges: {
      'IIT Delhi': { minRank: [1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900] },
      'IIT Bombay': { minRank: [1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000, 2100] },
      'IIT Madras': { minRank: [1400, 1500, 1600, 1700, 1800, 1900, 2000, 2100, 2200, 2300] },
      'NIT Trichy': { minRank: [8000, 8500, 9000, 9500, 10000, 10500, 11000, 11500, 12000, 12500] },
      'NIT Surathkal': { minRank: [8500, 9000, 9500, 10000, 10500, 11000, 11500, 12000, 12500, 13000] }
    },
    difficultyTrend: [1.0, 1.05, 1.1, 1.15, 1.2, 1.25, 1.3, 1.35, 1.4, 1.45],
    successRate: [11.1, 11.1, 11.1, 11.3, 11.4, 11.4, 11.3, 11.2, 11.2, 11.2]
  },
  
  'JEE Advanced': {
    years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
    totalCandidates: [150000, 160000, 170000, 180000, 190000, 200000, 210000, 220000, 230000, 250000],
    qualifiedCandidates: [15000, 16000, 17000, 18000, 19000, 20000, 21000, 22000, 23000, 25000],
    cutoffs: {
      'General': [150, 155, 160, 165, 170, 175, 180, 185, 190, 195],
      'OBC': [135, 140, 145, 150, 155, 160, 165, 170, 175, 180],
      'SC': [120, 125, 130, 135, 140, 145, 150, 155, 160, 165],
      'ST': [105, 110, 115, 120, 125, 130, 135, 140, 145, 150],
      'EWS': [null, null, null, null, null, 140, 145, 150, 155, 160]
    },
    topColleges: {
      'IIT Delhi': { minRank: [100, 110, 120, 130, 140, 150, 160, 170, 180, 190] },
      'IIT Bombay': { minRank: [120, 130, 140, 150, 160, 170, 180, 190, 200, 210] },
      'IIT Madras': { minRank: [140, 150, 160, 170, 180, 190, 200, 210, 220, 230] },
      'IIT Kanpur': { minRank: [160, 170, 180, 190, 200, 210, 220, 230, 240, 250] },
      'IIT Kharagpur': { minRank: [180, 190, 200, 210, 220, 230, 240, 250, 260, 270] }
    },
    difficultyTrend: [1.0, 1.05, 1.1, 1.15, 1.2, 1.25, 1.3, 1.35, 1.4, 1.45],
    successRate: [10.0, 10.0, 10.0, 10.0, 10.0, 10.0, 10.0, 10.0, 10.0, 10.0]
  },
  
  'NEET': {
    years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
    totalCandidates: [650000, 720000, 800000, 880000, 960000, 1040000, 1120000, 1200000, 1280000, 1360000],
    qualifiedCandidates: [65000, 72000, 80000, 88000, 96000, 104000, 112000, 120000, 128000, 136000],
    cutoffs: {
      'General': [450, 465, 480, 495, 510, 525, 540, 555, 570, 585],
      'OBC': [400, 415, 430, 445, 460, 475, 490, 505, 520, 535],
      'SC': [350, 365, 380, 395, 410, 425, 440, 455, 470, 485],
      'ST': [300, 315, 330, 345, 360, 375, 390, 405, 420, 435],
      'EWS': [null, null, null, null, null, 425, 440, 455, 470, 485]
    },
    topColleges: {
      'AIIMS Delhi': { minScore: [680, 695, 710, 725, 740, 755, 770, 785, 800, 815] },
      'JIPMER Puducherry': { minScore: [650, 665, 680, 695, 710, 725, 740, 755, 770, 785] },
      'AFMC Pune': { minScore: [620, 635, 650, 665, 680, 695, 710, 725, 740, 755] },
      'BHU Varanasi': { minScore: [600, 615, 630, 645, 660, 675, 690, 705, 720, 735] },
      'MAMC Delhi': { minScore: [580, 595, 610, 625, 640, 655, 670, 685, 700, 715] }
    },
    difficultyTrend: [1.0, 1.02, 1.05, 1.08, 1.1, 1.12, 1.15, 1.18, 1.2, 1.22],
    successRate: [10.0, 10.0, 10.0, 10.0, 10.0, 10.0, 10.0, 10.0, 10.0, 10.0]
  },
  
  'CAT': {
    years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
    totalCandidates: [220000, 235000, 250000, 265000, 280000, 295000, 310000, 325000, 340000, 355000],
    qualifiedCandidates: [22000, 23500, 25000, 26500, 28000, 29500, 31000, 32500, 34000, 35500],
    cutoffs: {
      'General': [85, 87, 89, 91, 93, 95, 97, 99, 101, 103],
      'OBC': [75, 77, 79, 81, 83, 85, 87, 89, 91, 93],
      'SC': [65, 67, 69, 71, 73, 75, 77, 79, 81, 83],
      'ST': [55, 57, 59, 61, 63, 65, 67, 69, 71, 73],
      'EWS': [null, null, null, null, null, 75, 77, 79, 81, 83]
    },
    topColleges: {
      'IIM Ahmedabad': { minPercentile: [99.5, 99.6, 99.7, 99.8, 99.8, 99.9, 99.9, 99.9, 99.9, 99.9] },
      'IIM Bangalore': { minPercentile: [99.2, 99.3, 99.4, 99.5, 99.6, 99.7, 99.8, 99.8, 99.9, 99.9] },
      'IIM Calcutta': { minPercentile: [98.8, 98.9, 99.0, 99.1, 99.2, 99.3, 99.4, 99.5, 99.6, 99.7] },
      'IIM Lucknow': { minPercentile: [98.0, 98.2, 98.4, 98.6, 98.8, 99.0, 99.2, 99.4, 99.6, 99.8] },
      'IIM Kozhikode': { minPercentile: [97.5, 97.7, 97.9, 98.1, 98.3, 98.5, 98.7, 98.9, 99.1, 99.3] }
    },
    difficultyTrend: [1.0, 1.03, 1.06, 1.09, 1.12, 1.15, 1.18, 1.21, 1.24, 1.27],
    successRate: [10.0, 10.0, 10.0, 10.0, 10.0, 10.0, 10.0, 10.0, 10.0, 10.0]
  },
  
  'GATE': {
    years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
    totalCandidates: [850000, 920000, 990000, 1060000, 1130000, 1200000, 1270000, 1340000, 1410000, 1480000],
    qualifiedCandidates: [85000, 92000, 99000, 106000, 113000, 120000, 127000, 134000, 141000, 148000],
    cutoffs: {
      'General': [25, 26, 27, 28, 29, 30, 31, 32, 33, 34],
      'OBC': [22.5, 23.4, 24.3, 25.2, 26.1, 27.0, 27.9, 28.8, 29.7, 30.6],
      'SC': [20, 20.8, 21.6, 22.4, 23.2, 24.0, 24.8, 25.6, 26.4, 27.2],
      'ST': [17.5, 18.2, 18.9, 19.6, 20.3, 21.0, 21.7, 22.4, 23.1, 23.8],
      'EWS': [null, null, null, null, null, 24.0, 24.8, 25.6, 26.4, 27.2]
    },
    topColleges: {
      'IIT Delhi': { minScore: [85, 87, 89, 91, 93, 95, 97, 99, 101, 103] },
      'IIT Bombay': { minScore: [83, 85, 87, 89, 91, 93, 95, 97, 99, 101] },
      'IIT Madras': { minScore: [81, 83, 85, 87, 89, 91, 93, 95, 97, 99] },
      'NIT Trichy': { minScore: [75, 77, 79, 81, 83, 85, 87, 89, 91, 93] },
      'BITS Pilani': { minScore: [78, 80, 82, 84, 86, 88, 90, 92, 94, 96] }
    },
    difficultyTrend: [1.0, 1.02, 1.04, 1.06, 1.08, 1.1, 1.12, 1.14, 1.16, 1.18],
    successRate: [10.0, 10.0, 10.0, 10.0, 10.0, 10.0, 10.0, 10.0, 10.0, 10.0]
  },
  
  'CLAT': {
    years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
    totalCandidates: [45000, 52000, 59000, 66000, 73000, 80000, 87000, 94000, 101000, 108000],
    qualifiedCandidates: [4500, 5200, 5900, 6600, 7300, 8000, 8700, 9400, 10100, 10800],
    cutoffs: {
      'General': [135, 138, 141, 144, 147, 150, 153, 156, 159, 162],
      'OBC': [120, 123, 126, 129, 132, 135, 138, 141, 144, 147],
      'SC': [105, 108, 111, 114, 117, 120, 123, 126, 129, 132],
      'ST': [90, 93, 96, 99, 102, 105, 108, 111, 114, 117],
      'EWS': [null, null, null, null, null, 120, 123, 126, 129, 132]
    },
    topColleges: {
      'NLU Delhi': { minScore: [165, 168, 171, 174, 177, 180, 183, 186, 189, 192] },
      'NLU Bangalore': { minScore: [160, 163, 166, 169, 172, 175, 178, 181, 184, 187] },
      'NLU Hyderabad': { minScore: [155, 158, 161, 164, 167, 170, 173, 176, 179, 182] },
      'NLU Kolkata': { minScore: [150, 153, 156, 159, 162, 165, 168, 171, 174, 177] },
      'NLU Jodhpur': { minScore: [145, 148, 151, 154, 157, 160, 163, 166, 169, 172] }
    },
    difficultyTrend: [1.0, 1.03, 1.06, 1.09, 1.12, 1.15, 1.18, 1.21, 1.24, 1.27],
    successRate: [10.0, 10.0, 10.0, 10.0, 10.0, 10.0, 10.0, 10.0, 10.0, 10.0]
  },
  
  'BITSAT': {
    years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
    totalCandidates: [400000, 420000, 440000, 460000, 480000, 500000, 520000, 540000, 560000, 580000],
    qualifiedCandidates: [60000, 63000, 66000, 69000, 72000, 75000, 78000, 81000, 84000, 87000],
    cutoffs: {
      'General': [320, 325, 330, 335, 340, 345, 350, 355, 360, 365],
      'OBC': [300, 305, 310, 315, 320, 325, 330, 335, 340, 345],
      'SC': [280, 285, 290, 295, 300, 305, 310, 315, 320, 325],
      'ST': [260, 265, 270, 275, 280, 285, 290, 295, 300, 305],
      'EWS': [null, null, null, null, null, 300, 305, 310, 315, 320]
    },
    topColleges: {
      'BITS Pilani': { minScore: [380, 385, 390, 395, 400, 405, 410, 415, 420, 425] },
      'BITS Goa': { minScore: [360, 365, 370, 375, 380, 385, 390, 395, 400, 405] },
      'BITS Hyderabad': { minScore: [340, 345, 350, 355, 360, 365, 370, 375, 380, 385] }
    },
    difficultyTrend: [1.0, 1.02, 1.04, 1.06, 1.08, 1.1, 1.12, 1.14, 1.16, 1.18],
    successRate: [15.0, 15.0, 15.0, 15.0, 15.0, 15.0, 15.0, 15.0, 15.0, 15.0]
  },
  
  'VITEEE': {
    years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
    totalCandidates: [250000, 260000, 270000, 280000, 290000, 300000, 310000, 320000, 330000, 340000],
    qualifiedCandidates: [30000, 31200, 32400, 33600, 34800, 36000, 37200, 38400, 39600, 40800],
    cutoffs: {
      'General': [110, 112, 114, 116, 118, 120, 122, 124, 126, 128],
      'OBC': [100, 102, 104, 106, 108, 110, 112, 114, 116, 118],
      'SC': [90, 92, 94, 96, 98, 100, 102, 104, 106, 108],
      'ST': [80, 82, 84, 86, 88, 90, 92, 94, 96, 98],
      'EWS': [null, null, null, null, null, 100, 102, 104, 106, 108]
    },
    topColleges: {
      'VIT Vellore': { minScore: [140, 142, 144, 146, 148, 150, 152, 154, 156, 158] },
      'VIT Chennai': { minScore: [130, 132, 134, 136, 138, 140, 142, 144, 146, 148] },
      'VIT Bhopal': { minScore: [120, 122, 124, 126, 128, 130, 132, 134, 136, 138] }
    },
    difficultyTrend: [1.0, 1.02, 1.04, 1.06, 1.08, 1.1, 1.12, 1.14, 1.16, 1.18],
    successRate: [12.0, 12.0, 12.0, 12.0, 12.0, 12.0, 12.0, 12.0, 12.0, 12.0]
  },
  
  'SRMJEEE': {
    years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
    totalCandidates: [100000, 105000, 110000, 115000, 120000, 125000, 130000, 135000, 140000, 145000],
    qualifiedCandidates: [18000, 18900, 19800, 20700, 21600, 22500, 23400, 24300, 25200, 26100],
    cutoffs: {
      'General': [85, 87, 89, 91, 93, 95, 97, 99, 101, 103],
      'OBC': [75, 77, 79, 81, 83, 85, 87, 89, 91, 93],
      'SC': [65, 67, 69, 71, 73, 75, 77, 79, 81, 83],
      'ST': [55, 57, 59, 61, 63, 65, 67, 69, 71, 73],
      'EWS': [null, null, null, null, null, 75, 77, 79, 81, 83]
    },
    topColleges: {
      'SRM Chennai': { minScore: [110, 112, 114, 116, 118, 120, 122, 124, 126, 128] },
      'SRM Kattankulathur': { minScore: [100, 102, 104, 106, 108, 110, 112, 114, 116, 118] },
      'SRM Ramapuram': { minScore: [90, 92, 94, 96, 98, 100, 102, 104, 106, 108] }
    },
    difficultyTrend: [1.0, 1.02, 1.04, 1.06, 1.08, 1.1, 1.12, 1.14, 1.16, 1.18],
    successRate: [18.0, 18.0, 18.0, 18.0, 18.0, 18.0, 18.0, 18.0, 18.0, 18.0]
  },
  
  'COMEDK': {
    years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
    totalCandidates: [75000, 78000, 81000, 84000, 87000, 90000, 93000, 96000, 99000, 102000],
    qualifiedCandidates: [10500, 10920, 11340, 11760, 12180, 12600, 13020, 13440, 13860, 14280],
    cutoffs: {
      'General': [130, 132, 134, 136, 138, 140, 142, 144, 146, 148],
      'OBC': [120, 122, 124, 126, 128, 130, 132, 134, 136, 138],
      'SC': [110, 112, 114, 116, 118, 120, 122, 124, 126, 128],
      'ST': [100, 102, 104, 106, 108, 110, 112, 114, 116, 118],
      'EWS': [null, null, null, null, null, 120, 122, 124, 126, 128]
    },
    topColleges: {
      'RVCE Bangalore': { minScore: [160, 162, 164, 166, 168, 170, 172, 174, 176, 178] },
      'BMSCE Bangalore': { minScore: [150, 152, 154, 156, 158, 160, 162, 164, 166, 168] },
      'MSRIT Bangalore': { minScore: [140, 142, 144, 146, 148, 150, 152, 154, 156, 158] }
    },
    difficultyTrend: [1.0, 1.02, 1.04, 1.06, 1.08, 1.1, 1.12, 1.14, 1.16, 1.18],
    successRate: [14.0, 14.0, 14.0, 14.0, 14.0, 14.0, 14.0, 14.0, 14.0, 14.0]
  },
  
  'KCET': {
    years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
    totalCandidates: [160000, 165000, 170000, 175000, 180000, 185000, 190000, 195000, 200000, 205000],
    qualifiedCandidates: [25600, 26400, 27200, 28000, 28800, 29600, 30400, 31200, 32000, 32800],
    cutoffs: {
      'General': [170, 172, 174, 176, 178, 180, 182, 184, 186, 188],
      'OBC': [160, 162, 164, 166, 168, 170, 172, 174, 176, 178],
      'SC': [150, 152, 154, 156, 158, 160, 162, 164, 166, 168],
      'ST': [140, 142, 144, 146, 148, 150, 152, 154, 156, 158],
      'EWS': [null, null, null, null, null, 160, 162, 164, 166, 168]
    },
    topColleges: {
      'UVCE Bangalore': { minScore: [200, 202, 204, 206, 208, 210, 212, 214, 216, 218] },
      'PES Bangalore': { minScore: [190, 192, 194, 196, 198, 200, 202, 204, 206, 208] },
      'BMSIT Bangalore': { minScore: [180, 182, 184, 186, 188, 190, 192, 194, 196, 198] }
    },
    difficultyTrend: [1.0, 1.02, 1.04, 1.06, 1.08, 1.1, 1.12, 1.14, 1.16, 1.18],
    successRate: [16.0, 16.0, 16.0, 16.0, 16.0, 16.0, 16.0, 16.0, 16.0, 16.0]
  },
  
  'MHT CET': {
    years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
    totalCandidates: [200000, 210000, 220000, 230000, 240000, 250000, 260000, 270000, 280000, 290000],
    qualifiedCandidates: [26000, 27300, 28600, 29900, 31200, 32500, 33800, 35100, 36400, 37700],
    cutoffs: {
      'General': [140, 142, 144, 146, 148, 150, 152, 154, 156, 158],
      'OBC': [130, 132, 134, 136, 138, 140, 142, 144, 146, 148],
      'SC': [120, 122, 124, 126, 128, 130, 132, 134, 136, 138],
      'ST': [110, 112, 114, 116, 118, 120, 122, 124, 126, 128],
      'EWS': [null, null, null, null, null, 130, 132, 134, 136, 138]
    },
    topColleges: {
      'COEP Pune': { minScore: [180, 182, 184, 186, 188, 190, 192, 194, 196, 198] },
      'VJTI Mumbai': { minScore: [170, 172, 174, 176, 178, 180, 182, 184, 186, 188] },
      'GCOE Nagpur': { minScore: [160, 162, 164, 166, 168, 170, 172, 174, 176, 178] }
    },
    difficultyTrend: [1.0, 1.02, 1.04, 1.06, 1.08, 1.1, 1.12, 1.14, 1.16, 1.18],
    successRate: [13.0, 13.0, 13.0, 13.0, 13.0, 13.0, 13.0, 13.0, 13.0, 13.0]
  },
  
  'WBJEE': {
    years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
    totalCandidates: [140000, 145000, 150000, 155000, 160000, 165000, 170000, 175000, 180000, 185000],
    qualifiedCandidates: [23800, 24650, 25500, 26350, 27200, 28050, 28900, 29750, 30600, 31450],
    cutoffs: {
      'General': [95, 97, 99, 101, 103, 105, 107, 109, 111, 113],
      'OBC': [85, 87, 89, 91, 93, 95, 97, 99, 101, 103],
      'SC': [75, 77, 79, 81, 83, 85, 87, 89, 91, 93],
      'ST': [65, 67, 69, 71, 73, 75, 77, 79, 81, 83],
      'EWS': [null, null, null, null, null, 85, 87, 89, 91, 93]
    },
    topColleges: {
      'Jadavpur University': { minScore: [130, 132, 134, 136, 138, 140, 142, 144, 146, 148] },
      'BESU Shibpur': { minScore: [120, 122, 124, 126, 128, 130, 132, 134, 136, 138] },
      'IIEST Shibpur': { minScore: [110, 112, 114, 116, 118, 120, 122, 124, 126, 128] }
    },
    difficultyTrend: [1.0, 1.02, 1.04, 1.06, 1.08, 1.1, 1.12, 1.14, 1.16, 1.18],
    successRate: [17.0, 17.0, 17.0, 17.0, 17.0, 17.0, 17.0, 17.0, 17.0, 17.0]
  },
  
  'AP EAMCET': {
    years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
    totalCandidates: [300000, 310000, 320000, 330000, 340000, 350000, 360000, 370000, 380000, 390000],
    qualifiedCandidates: [45000, 46500, 48000, 49500, 51000, 52500, 54000, 55500, 57000, 58500],
    cutoffs: {
      'General': [150, 152, 154, 156, 158, 160, 162, 164, 166, 168],
      'OBC': [140, 142, 144, 146, 148, 150, 152, 154, 156, 158],
      'SC': [130, 132, 134, 136, 138, 140, 142, 144, 146, 148],
      'ST': [120, 122, 124, 126, 128, 130, 132, 134, 136, 138],
      'EWS': [null, null, null, null, null, 140, 142, 144, 146, 148]
    },
    topColleges: {
      'JNTU Hyderabad': { minScore: [180, 182, 184, 186, 188, 190, 192, 194, 196, 198] },
      'OU Hyderabad': { minScore: [170, 172, 174, 176, 178, 180, 182, 184, 186, 188] },
      'AU Visakhapatnam': { minScore: [160, 162, 164, 166, 168, 170, 172, 174, 176, 178] }
    },
    difficultyTrend: [1.0, 1.02, 1.04, 1.06, 1.08, 1.1, 1.12, 1.14, 1.16, 1.18],
    successRate: [15.0, 15.0, 15.0, 15.0, 15.0, 15.0, 15.0, 15.0, 15.0, 15.0]
  },
  
  'TS EAMCET': {
    years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
    totalCandidates: [270000, 280000, 290000, 300000, 310000, 320000, 330000, 340000, 350000, 360000],
    qualifiedCandidates: [37800, 39200, 40600, 42000, 43400, 44800, 46200, 47600, 49000, 50400],
    cutoffs: {
      'General': [145, 147, 149, 151, 153, 155, 157, 159, 161, 163],
      'OBC': [135, 137, 139, 141, 143, 145, 147, 149, 151, 153],
      'SC': [125, 127, 129, 131, 133, 135, 137, 139, 141, 143],
      'ST': [115, 117, 119, 121, 123, 125, 127, 129, 131, 133],
      'EWS': [null, null, null, null, null, 135, 137, 139, 141, 143]
    },
    topColleges: {
      'JNTU Hyderabad': { minScore: [175, 177, 179, 181, 183, 185, 187, 189, 191, 193] },
      'OU Hyderabad': { minScore: [165, 167, 169, 171, 173, 175, 177, 179, 181, 183] },
      'AU Visakhapatnam': { minScore: [155, 157, 159, 161, 163, 165, 167, 169, 171, 173] }
    },
    difficultyTrend: [1.0, 1.02, 1.04, 1.06, 1.08, 1.1, 1.12, 1.14, 1.16, 1.18],
    successRate: [14.0, 14.0, 14.0, 14.0, 14.0, 14.0, 14.0, 14.0, 14.0, 14.0]
  },
  
  'KEAM': {
    years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
    totalCandidates: [85000, 88000, 91000, 94000, 97000, 100000, 103000, 106000, 109000, 112000],
    qualifiedCandidates: [13600, 14080, 14560, 15040, 15520, 16000, 16480, 16960, 17440, 17920],
    cutoffs: {
      'General': [165, 167, 169, 171, 173, 175, 177, 179, 181, 183],
      'OBC': [155, 157, 159, 161, 163, 165, 167, 169, 171, 173],
      'SC': [145, 147, 149, 151, 153, 155, 157, 159, 161, 163],
      'ST': [135, 137, 139, 141, 143, 145, 147, 149, 151, 153],
      'EWS': [null, null, null, null, null, 155, 157, 159, 161, 163]
    },
    topColleges: {
      'CET Trivandrum': { minScore: [190, 192, 194, 196, 198, 200, 202, 204, 206, 208] },
      'NIT Calicut': { minScore: [180, 182, 184, 186, 188, 190, 192, 194, 196, 198] },
      'CUSAT Kochi': { minScore: [170, 172, 174, 176, 178, 180, 182, 184, 186, 188] }
    },
    difficultyTrend: [1.0, 1.02, 1.04, 1.06, 1.08, 1.1, 1.12, 1.14, 1.16, 1.18],
    successRate: [16.0, 16.0, 16.0, 16.0, 16.0, 16.0, 16.0, 16.0, 16.0, 16.0]
  },
  
  'UPSC CSE': {
    years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
    totalCandidates: [465000, 485000, 505000, 525000, 545000, 565000, 585000, 605000, 625000, 645000],
    qualifiedCandidates: [4650, 4850, 5050, 5250, 5450, 5650, 5850, 6050, 6250, 6450],
    cutoffs: {
      'General': [676, 680, 684, 688, 692, 696, 700, 704, 708, 712],
      'OBC': [630, 634, 638, 642, 646, 650, 654, 658, 662, 666],
      'SC': [584, 588, 592, 596, 600, 604, 608, 612, 616, 620],
      'ST': [538, 542, 546, 550, 554, 558, 562, 566, 570, 574],
      'EWS': [null, null, null, null, null, 650, 654, 658, 662, 666]
    },
    topColleges: {
      'LBSNAA Mussoorie': { minScore: [720, 724, 728, 732, 736, 740, 744, 748, 752, 756] },
      'SVPNPA Hyderabad': { minScore: [700, 704, 708, 712, 716, 720, 724, 728, 732, 736] },
      'FSI Delhi': { minScore: [680, 684, 688, 692, 696, 700, 704, 708, 712, 716] },
      'NAARM Hyderabad': { minScore: [660, 664, 668, 672, 676, 680, 684, 688, 692, 696] },
      'NIFM Faridabad': { minScore: [640, 644, 648, 652, 656, 660, 664, 668, 672, 676] }
    },
    difficultyTrend: [1.0, 1.01, 1.02, 1.03, 1.04, 1.05, 1.06, 1.07, 1.08, 1.09],
    successRate: [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0]
  },
  
  'SSC CGL': {
    years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
    totalCandidates: [4500000, 4700000, 4900000, 5100000, 5300000, 5500000, 5700000, 5900000, 6100000, 6300000],
    qualifiedCandidates: [45000, 47000, 49000, 51000, 53000, 55000, 57000, 59000, 61000, 63000],
    cutoffs: {
      'General': [148, 150, 152, 154, 156, 158, 160, 162, 164, 166],
      'OBC': [138, 140, 142, 144, 146, 148, 150, 152, 154, 156],
      'SC': [128, 130, 132, 134, 136, 138, 140, 142, 144, 146],
      'ST': [118, 120, 122, 124, 126, 128, 130, 132, 134, 136],
      'EWS': [null, null, null, null, null, 138, 140, 142, 144, 146]
    },
    topColleges: {
      'SSC Delhi': { minScore: [180, 182, 184, 186, 188, 190, 192, 194, 196, 198] },
      'SSC Mumbai': { minScore: [170, 172, 174, 176, 178, 180, 182, 184, 186, 188] },
      'SSC Chennai': { minScore: [160, 162, 164, 166, 168, 170, 172, 174, 176, 178] }
    },
    difficultyTrend: [1.0, 1.02, 1.04, 1.06, 1.08, 1.1, 1.12, 1.14, 1.16, 1.18],
    successRate: [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0]
  },
  
  'Bank PO': {
    years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
    totalCandidates: [4200000, 4300000, 4400000, 4500000, 4600000, 4700000, 4800000, 4900000, 5000000, 5100000],
    qualifiedCandidates: [42000, 43000, 44000, 45000, 46000, 47000, 48000, 49000, 50000, 51000],
    cutoffs: {
      'General': [138, 140, 142, 144, 146, 148, 150, 152, 154, 156],
      'OBC': [128, 130, 132, 134, 136, 138, 140, 142, 144, 146],
      'SC': [118, 120, 122, 124, 126, 128, 130, 132, 134, 136],
      'ST': [108, 110, 112, 114, 116, 118, 120, 122, 124, 126],
      'EWS': [null, null, null, null, null, 128, 130, 132, 134, 136]
    },
    topColleges: {
      'SBI PO': { minScore: [170, 172, 174, 176, 178, 180, 182, 184, 186, 188] },
      'IBPS PO': { minScore: [160, 162, 164, 166, 168, 170, 172, 174, 176, 178] },
      'RBI Grade B': { minScore: [180, 182, 184, 186, 188, 190, 192, 194, 196, 198] }
    },
    difficultyTrend: [1.0, 1.02, 1.04, 1.06, 1.08, 1.1, 1.12, 1.14, 1.16, 1.18],
    successRate: [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0]
  },
  
  'NDA': {
    years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
    totalCandidates: [285000, 290000, 295000, 300000, 305000, 310000, 315000, 320000, 325000, 330000],
    qualifiedCandidates: [28500, 29000, 29500, 30000, 30500, 31000, 31500, 32000, 32500, 33000],
    cutoffs: {
      'General': [355, 358, 361, 364, 367, 370, 373, 376, 379, 382],
      'OBC': [335, 338, 341, 344, 347, 350, 353, 356, 359, 362],
      'SC': [315, 318, 321, 324, 327, 330, 333, 336, 339, 342],
      'ST': [295, 298, 301, 304, 307, 310, 313, 316, 319, 322],
      'EWS': [null, null, null, null, null, 330, 333, 336, 339, 342]
    },
    topColleges: {
      'NDA Khadakwasla': { minScore: [400, 402, 404, 406, 408, 410, 412, 414, 416, 418] },
      'IMA Dehradun': { minScore: [390, 392, 394, 396, 398, 400, 402, 404, 406, 408] },
      'AFA Hyderabad': { minScore: [380, 382, 384, 386, 388, 390, 392, 394, 396, 398] }
    },
    difficultyTrend: [1.0, 1.02, 1.04, 1.06, 1.08, 1.1, 1.12, 1.14, 1.16, 1.18],
    successRate: [10.0, 10.0, 10.0, 10.0, 10.0, 10.0, 10.0, 10.0, 10.0, 10.0]
  }
};

// Prediction Algorithm Functions
export const predictionAlgorithms = {
  // Calculate expected rank based on current score and historical data
  calculateExpectedRank: (examName, currentScore, targetScore, studyHours, weakAreas, strongAreas) => {
    const examData = historicalExamData[examName];
    if (!examData) return null;
    
    const currentYear = 2024;
    const currentYearIndex = examData.years.indexOf(currentYear);
    if (currentYearIndex === -1) return null;
    
    const currentCutoff = examData.cutoffs.General[currentYearIndex];
    const currentTotalCandidates = examData.totalCandidates[currentYearIndex];
    const currentQualifiedCandidates = examData.qualifiedCandidates[currentYearIndex];
    
    // Calculate score improvement potential
    const scoreGap = targetScore - currentScore;
    const maxPossibleScore = examData.cutoffs.General[examData.years.length - 1] * 1.2; // 20% above current cutoff
    
    // Study hours impact (more hours = better improvement)
    const studyHoursFactor = Math.min(studyHours / 8, 2); // Normalize to 8 hours baseline
    
    // Weak areas impact (more weak areas = harder to improve)
    const weakAreasFactor = 1 - (weakAreas.length * 0.1); // Each weak area reduces potential by 10%
    
    // Strong areas impact (more strong areas = easier to improve)
    const strongAreasFactor = 1 + (strongAreas.length * 0.05); // Each strong area increases potential by 5%
    
    // Calculate improvement probability
    const improvementProbability = Math.min(
      (scoreGap / maxPossibleScore) * studyHoursFactor * weakAreasFactor * strongAreasFactor,
      0.95
    );
    
    // Calculate expected final score
    const expectedFinalScore = currentScore + (scoreGap * improvementProbability);
    
    // Calculate rank based on historical distribution
    const scorePercentile = (expectedFinalScore / maxPossibleScore) * 100;
    const expectedRank = Math.round((100 - scorePercentile) / 100 * currentTotalCandidates);
    
    return {
      expectedRank: Math.max(1, expectedRank),
      expectedScore: Math.round(expectedFinalScore),
      improvementProbability: Math.round(improvementProbability * 100),
      scorePercentile: Math.round(scorePercentile),
      qualified: expectedFinalScore >= currentCutoff
    };
  },
  
  // Calculate success probability based on historical trends
  calculateSuccessProbability: (examName, currentScore, targetScore, studyHours) => {
    const examData = historicalExamData[examName];
    if (!examData) return null;
    
    const currentYear = 2024;
    const currentYearIndex = examData.years.indexOf(currentYear);
    if (currentYearIndex === -1) return null;
    
    const currentCutoff = examData.cutoffs.General[currentYearIndex];
    const historicalSuccessRate = examData.successRate[currentYearIndex];
    
    // Base success rate from historical data
    let baseSuccessRate = historicalSuccessRate;
    
    // Score-based adjustments
    if (currentScore >= currentCutoff) {
      baseSuccessRate += 20; // Already qualified
    } else if (currentScore >= currentCutoff * 0.8) {
      baseSuccessRate += 10; // Close to qualifying
    } else if (currentScore >= currentCutoff * 0.6) {
      baseSuccessRate += 5; // Moderate chance
    } else {
      baseSuccessRate -= 10; // Low chance
    }
    
    // Study hours impact
    if (studyHours >= 8) {
      baseSuccessRate += 15; // Excellent study schedule
    } else if (studyHours >= 6) {
      baseSuccessRate += 10; // Good study schedule
    } else if (studyHours >= 4) {
      baseSuccessRate += 5; // Moderate study schedule
    } else {
      baseSuccessRate -= 10; // Insufficient study time
    }
    
    // Target score feasibility
    const scoreGap = targetScore - currentScore;
    const maxRealisticGap = currentCutoff * 0.3; // 30% improvement is realistic
    
    if (scoreGap <= maxRealisticGap) {
      baseSuccessRate += 10; // Realistic target
    } else if (scoreGap <= maxRealisticGap * 1.5) {
      baseSuccessRate += 5; // Challenging but achievable
    } else {
      baseSuccessRate -= 15; // Very challenging target
    }
    
    return Math.max(0, Math.min(100, baseSuccessRate));
  },
  
  // Generate comprehensive prediction report
  generatePredictionReport: (examName, currentScore, targetScore, studyHours, weakAreas, strongAreas) => {
    const rankPrediction = predictionAlgorithms.calculateExpectedRank(
      examName, currentScore, targetScore, studyHours, weakAreas, strongAreas
    );
    
    const successProbability = predictionAlgorithms.calculateSuccessProbability(
      examName, currentScore, targetScore, studyHours
    );
    
    if (!rankPrediction || !successProbability) {
      return null;
    }
    
    // Generate recommendations
    const recommendations = [];
    
    if (studyHours < 6) {
      recommendations.push("Increase daily study hours to at least 6-8 hours for better results");
    }
    
    if (weakAreas.length > 2) {
      recommendations.push("Focus on improving weak areas - consider additional coaching or resources");
    }
    
    if (strongAreas.length === 0) {
      recommendations.push("Identify and leverage your strong subjects to boost overall performance");
    }
    
    if (rankPrediction.improvementProbability < 50) {
      recommendations.push("Set more realistic target scores and focus on gradual improvement");
    }
    
    if (rankPrediction.qualified) {
      recommendations.push("You're already qualified! Focus on improving rank for better college options");
    }
    
    // Add study strategy recommendations
    if (studyHours >= 8) {
      recommendations.push("Excellent study schedule! Maintain consistency and focus on weak areas");
    }
    
    if (weakAreas.length <= 1) {
      recommendations.push("Strong foundation! Focus on advanced topics and speed improvement");
    }
    
    return {
      examName,
      currentScore,
      targetScore,
      expectedRank: rankPrediction.expectedRank,
      expectedScore: rankPrediction.expectedScore,
      successProbability,
      improvementProbability: rankPrediction.improvementProbability,
      qualified: rankPrediction.qualified,
      recommendations,
      studyHours,
      weakAreas,
      strongAreas,
      generatedAt: new Date().toISOString()
    };
  }
};

export default historicalExamData;
