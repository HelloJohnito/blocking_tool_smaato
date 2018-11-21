var ACCESS_TOKEN = "";

var SPX_DATA = {
  applications: [],
  adspaces: [],
  lineitems: []
}

var AutoCompleteStack = [];
var CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890`~!@#$%^&*()-=_+[]{}|;:,.<>/?'.split('');
CHARSET.push(" ");
CHARSET.push("'");
CHARSET.push('"');
CHARSET.push("\\");

var AUTOCOMPLETE_SETTING = {
  currentKeyIndex : -1,
  currentAppName: ""
};


var PARENT_CATEGORIES = [
                         "Arts & Entertainment (IAB1)", "Automotive (IAB2)", "Business (IAB3)", "Careers (IAB4)", "Education (IAB5)",
                         "Family & Parenting (IAB6)", "Health & Fitness (IAB7)", "Food & Drink (IAB8)", "Hobbies & Interests (IAB9)", "Home & Garden (IAB10)",
                         "Law Gov't & Politics (IAB11)", "News (IAB12)", "Personal Finance (IAB13)", "Society (IAB14)", "Science (IAB15)",
                         "Pets (IAB16)", "Sports (IAB17)", "Style & Fashion (IAB18)", "Technology & Computing (IAB19)", "Travel (IAB20)",
                         "Real Estate (IAB21)", "Shopping (IAB22)"
                       ];

var CATEGORY_STATE = {
  "Arts & Entertainment (IAB1)": {
    "left_box": true,
    "sub_categories": {
      "- Books & Literature (IAB1-1)": true,
      "- Celebrity Fan/Gossip (IAB1-2)": true,
      "- Fine Art (IAB1-3)": true,
      "- Humor (IAB1-4)": true,
      "- Movies (IAB1-5)": true,
      "- Music (IAB1-6)": true,
      "- Television (IAB1-7)": true
    }
  },
  "Automotive (IAB2)": {
    "left_box": true,
    "sub_categories": {
      "- Auto Parts (IAB2-1)": true,
      "- Auto Repair (IAB2-2)": true,
      "- Buying/Selling Cars (IAB2-3)": true,
      "- Car Culture (IAB2-4)": true,
      "- Certified Pre-Owned (IAB2-5)": true,
      "- Convertible (IAB2-6)": true,
      "- Coupe (IAB2-7)": true,
      "- Crossover (IAB2-8)": true,
      "- Diesel (IAB2-9)": true,
      "- Electric Vehicle (IAB2-10)": true,
      "- Hatchback (IAB2-11)": true,
      "- Hybrid (IAB2-12)": true,
      "- Luxury (IAB2-13)": true,
      "- MiniVan (IAB2-14)": true,
      "- Motorcycles (IAB2-15)": true,
      "- Off-Road Vehicles (IAB2-16)": true,
      "- Performance Vehicles (IAB2-17)": true,
      "- Pickup (IAB2-18)": true,
      "- Road-Side Assistance (IAB2-19)": true,
      "- Sedan (IAB2-20)": true,
      "- Trucks & Accessories (IAB2-21)": true,
      "- Vintage Cars (IAB2-22)": true,
      "- Wagon (IAB2-23)": true
    }
  },
  "Business (IAB3)": {
    "left_box": true,
    "sub_categories": {
      "- Advertising (IAB3-1)": true,
      "- Agriculture (IAB3-2)": true,
      "- Biotech/Biomedical (IAB3-3)": true,
      "- Business Software (IAB3-4)": true,
      "- Construction (IAB3-5)": true,
      "- Forestry (IAB3-6)": true,
      "- Government (IAB3-7)": true,
      "- Green Solutions (IAB3-8)": true,
      "- Human Resources (IAB3-9)": true,
      "- Logistics (IAB3-10)": true,
      "- Marketing (IAB3-11)": true,
      "- Metals (IAB3-12)": true
    }
  },
  "Careers (IAB4)": {
    "left_box": true,
    "sub_categories": {
      "- Career Planning (IAB4-1)": true,
      "- College (IAB4-2)": true,
      "- Financial Aid (IAB4-3)": true,
      "- Job Fairs (IAB4-4)": true,
      "- Job Search (IAB4-5)": true,
      "- Resume Writing/Advice (IAB4-6)": true,
      "- Nursing (IAB4-7)": true,
      "- Scholarships (IAB4-8)": true,
      "- Telecommuting (IAB4-9)": true,
      "- U.S. Military (IAB4-10)": true,
      "- Career Advice (IAB4-11)": true
    }
  },
  "Education (IAB5)": {
    "left_box": true,
    "sub_categories": {
      "- 7-12 Education (IAB5-1)": true,
      "- Adult Education (IAB5-2)": true,
      "- Art History (IAB5-3)": true,
      "- Colledge Administration (IAB5-4)": true,
      "- College Life (IAB5-5)": true,
      "- Distance Learning (IAB5-6)": true,
      "- English as a 2nd Language (IAB5-7)": true,
      "- Language Learning (IAB5-8)": true,
      "- Graduate School (IAB5-9)": true,
      "- Homeschooling (IAB5-10)": true,
      "- Homework/Study Tips (IAB5-11)": true,
      "- K-6 Educators (IAB5-12)": true,
      "- Private School (IAB5-13)": true,
      "- Special Education (IAB5-14)": true,
      "- Studying Business (IAB5-15)": true
    }
  },
  "Family & Parenting (IAB6)": {
    "left_box": true,
    "sub_categories": {
      "- Adoption (IAB6-1)": true,
      "- Babies & Toddlers (IAB6-2)": true,
      "- Daycare/Pre School (IAB6-3)": true,
      "- Family Internet (IAB6-4)": true,
      "- Parenting - K-6 Kids (IAB6-5)": true,
      "- Parenting teens (IAB6-6)": true,
      "- Pregnancy (IAB6-7)": true,
      "- Special Needs Kids (IAB6-8)": true,
      "- Eldercare (IAB6-9)": true
    }
  },
  "Health & Fitness (IAB7)": {
    "left_box": true,
    "sub_categories": {
      "- Exercise (IAB7-1)": true,
      "- A.D.D. (IAB7-2)": true,
      "- AIDS/HIV (IAB7-3)": true,
      "- Allergies (IAB7-4)": true,
      "- Alternative Medicine (IAB7-5)": true,
      "- Arthritis (IAB7-6)": true,
      "- Asthma (IAB7-7)": true,
      "- Autism/PDD (IAB7-8)": true,
      "- Bipolar Disorder (IAB7-9)": true,
      "- Brain Tumor (IAB7-10)": true,
      "- Cancer (IAB7-11)": true,
      "- Cholesterol (IAB7-12)": true,
      "- Chronic Fatigue Syndrome (IAB7-13)": true,
      "- Chronic Pain (IAB7-14)": true,
      "- Cold & Flu (IAB7-15)": true,
      "- Deafness (IAB7-16)": true,
      "- Dental Care (IAB7-17)": true,
      "- Depression (IAB7-18)": true,
      "- Dermatology (IAB7-19)": true,
      "- Diabetes (IAB7-20)": true,
      "- Epilepsy (IAB7-21)": true,
      "- GERD/Acid Reflux (IAB7-22)": true,
      "- Headaches/Migraines (IAB7-23)": true,
      "- Heart Disease (IAB7-24)": true,
      "- Herbs for Health (IAB7-25)": true,
      "- Holistic Healing (IAB7-26)": true,
      "- IBS/Crohn's Disease (IAB7-27)": true,
      "- Incontinence (IAB7-29)": true,
      "- Infertility (IAB7-30)": true,
      "- Men's Health (IAB7-31)": true,
      "- Nutrition (IAB7-32)": true,
      "- Orthopedics (IAB7-33)": true,
      "- Panic/Anxiety Disorders (IAB7-34)": true,
      "- Pediatrics (IAB7-35)": true,
      "- Physical Therapy (IAB7-36)": true,
      "- Psychology/Psychiatry (IAB7-37)": true,
      "- Senor Health (IAB7-38)": true,
      "- Sexuality (IAB7-39)": true,
      "- Sleep Disorders (IAB7-40)": true,
      "- Smoking Cessation (IAB7-41)": true,
      "- Thyroid Disease (IAB7-43)": true,
      "- Weight Loss (IAB7-44)": true,
      "- Women's Health (IAB7-45)": true
    }
  },
  "Food & Drink (IAB8)": {
    "left_box": true,
    "sub_categories": {
      "- American Cuisine (IAB8-1)": true,
      "- Barbecues & Grilling (IAB8-2)": true,
      "- Cajun/Creole (IAB8-3)": true,
      "- Chinese Cuisine (IAB8-4)": true,
      "- Cocktails/Beer (IAB8-5)": true,
      "- Coffee/Tea (IAB8-6)": true,
      "- Cuisine-Specific (IAB8-7)": true,
      "- Desserts & Baking (IAB8-8)": true,
      "- Dining Out (IAB8-9)": true,
      "- Food Allergies (IAB8-10)": true,
      "- French Cuisine (IAB8-11)": true,
      "- Health/Lowfat Cooking (IAB8-12)": true,
      "- Italian Cuisine (IAB8-13)": true,
      "- Japanese Cuisine (IAB8-14)": true,
      "- Mexican Cuisine (IAB8-15)": true,
      "- Vegan (IAB8-16)": true,
      "- Vegetarian (IAB8-17)": true,
      "- Wine (IAB8-18)": true
    }
  },
  "Hobbies & Interests (IAB9)": {
    "left_box": true,
    "sub_categories": {
      "- Art/Technology (IAB9-1)": true,
      "- Arts & Crafts (IAB9-2)": true,
      "- Beadwork (IAB9-3)": true,
      "- Birdwatching (IAB9-4)": true,
      "- Board Games/Puzzles (IAB9-5)": true,
      "- Candle & Soap Making (IAB9-6)": true,
      "- Card Games (IAB9-7)": true,
      "- Chess (IAB9-8)": true,
      "- Collecting (IAB9-10)": true,
      "- Comic Books (IAB9-11)": true,
      "- Drawing/Sketching (IAB9-12)": true,
      "- Freelance Writing (IAB9-13)": true,
      "- Genealogy (IAB9-14)": true,
      "- Getting Published (IAB9-15)": true,
      "- Guitar (IAB9-16)": true,
      "- Home Recording (IAB9-17)": true,
      "- Investors & Patents (IAB9-18)": true,
      "- Jewelry Making (IAB9-19)": true,
      "- Magic & Illusion (IAB9-20)": true,
      "- Needlework (IAB9-21)": true,
      "- Painting (IAB9-22)": true,
      "- Photography (IAB9-23)": true,
      "- Radio (IAB9-24)": true,
      "- Roleplaying Games (IAB9-25)": true,
      "- Sci-Fi & Fantasy (IAB9-26)": true,
      "- Scrapbooking (IAB9-27)": true,
      "- Screenwriting (IAB9-28)": true,
      "- Stamps & Coins (IAB9-29)": true,
      "- Video & Computer Games (IAB9-30)": true,
      "- Woodworking (IAB9-31)": true
    }
  },
  "Home & Garden (IAB10)": {
    "left_box": true,
    "sub_categories": {
      "- Appliances (IAB10-1)": true,
      "- Entertaining (IAB10-2)": true,
      "- Environmental Safety (IAB10-3)": true,
      "- Gardening (IAB10-4)": true,
      "- Home Repair (IAB10-5)": true,
      "- Home Theater (IAB10-6)": true,
      "- Interior Decorating (IAB10-7)": true,
      "- Landscaping (IAB10-8)": true,
      "- Remodeling & Construction (IAB10-9)": true
    }
  },
  "Law Gov't & Politics (IAB11)": {
    "left_box": true,
    "sub_categories": {
      "- Immigration (IAB11-1)": true,
      "- Legal Issues (IAB11-2)": true,
      "- U.S. Government Resources (IAB11-3)": true,
      "- Politics (IAB11-4)": true,
      "- Commentary (IAB11-5)": true
    }
  },
  "News (IAB12)": {
    "left_box": true,
    "sub_categories": {
      "- International News (IAB12-1)": true,
      "- National News (IAB12-2)": true,
      "- Local News (IAB12-3)": true
    }
  },
  "Personal Finance (IAB13)": {
    "left_box": true,
    "sub_categories": {
      "- Beginning Investing (IAB13-1)": true,
      "- Credit/Debt & Loans (IAB13-2)": true,
      "- Financial News (IAB13-3)": true,
      "- Financial Planning (IAB13-4)": true,
      "- Hedge Fund (IAB13-5)": true,
      "- Insurance (IAB13-6)": true,
      "- Investing (IAB13-7)": true,
      "- Mutual Funds (IAB13-8)": true,
      "- Options (IAB13-9)": true,
      "- Retirement Planning (IAB13-10)": true,
      "- Stocks (IAB13-11)": true,
      "- Tax Planning (IAB13-12)": true
    }
  },
  "Society (IAB14)": {
    "left_box": true,
    "sub_categories": {
      "- Dating (IAB14-1)": true,
      "- Divorce Support (IAB14-2)": true,
      "- Gay Life (IAB14-3)": true,
      "- Marriage (IAB14-4)": true,
      "- Senior Living (IAB14-5)": true,
      "- Teens (IAB14-6)": true,
      "- Weddings (IAB14-7)": true,
      "- Ethnic Specific (IAB14-8)": true
    }
  },
  "Science (IAB15)": {
    "left_box": true,
    "sub_categories": {
      "- Astrology (IAB15-1)": true,
      "- Biology (IAB15-2)": true,
      "- Chemistry (IAB15-3)": true,
      "- Geology (IAB15-4)": true,
      "- Paranormal Phenomena (IAB15-5)": true,
      "- Physics (IAB15-6)": true,
      "- Space/Astronomy (IAB15-7)": true,
      "- Geography (IAB15-8)": true,
      "- Botany (IAB15-9)": true,
      "- Weather (IAB15-10)": true
    }
  },
  "Pets (IAB16)": {
    "left_box": true,
    "sub_categories": {
      "- Aquariums (IAB16-1)": true,
      "- Birds (IAB16-2)": true,
      "- Cats (IAB16-3)": true,
      "- Dogs (IAB16-4)": true,
      "- Large Animals (IAB16-5)": true,
      "- Reptiles (IAB16-6)": true,
      "- Veterinary Medicine (IAB16-7)": true
    }
  },
  "Sports (IAB17)": {
    "left_box": true,
    "sub_categories": {
      "- Auto Racing (IAB17-1)": true,
      "- Baseball (IAB17-2)": true,
      "- Bicycling (IAB17-3)": true,
      "- Bodybuilding (IAB17-4)": true,
      "- Boxing (IAB17-5)": true,
      "- Canoeing/Kayaking (IAB17-6)": true,
      "- Cheerleading (IAB17-7)": true,
      "- Climbing (IAB17-8)": true,
      "- Cricket (IAB17-9)": true,
      "- Figure Skating (IAB17-10)": true,
      "- Fly Fishing (IAB17-11)": true,
      "- Football (IAB17-12)": true,
      "- Freshwater Fishing (IAB17-13)": true,
      "- Game & Fish (IAB17-14)": true,
      "- Golf (IAB17-15)": true,
      "- Horse Racing (IAB17-16)": true,
      "- Horses (IAB17-17)": true,
      "- Inline Skating (IAB17-19)": true,
      "- Martial Arts (IAB17-20)": true,
      "- Mountain Biking (IAB17-21)": true,
      "- NASCAR Racing (IAB17-22)": true,
      "- Olympics (IAB17-23)": true,
      "- Paintball (IAB17-24)": true,
      "- Power & Motorcycles (IAB17-25)": true,
      "- Pro Basketball (IAB17-26)": true,
      "- Pro Ice Hockey (IAB17-27)": true,
      "- Rodeo (IAB17-28)": true,
      "- Rugby (IAB17-29)": true,
      "- Running/Jogging (IAB17-30)": true,
      "- Sailing (IAB17-31)": true,
      "- Saltwater Fishing (IAB17-32)": true,
      "- Scuba Diving (IAB17-33)": true,
      "- Skateboarding (IAB17-34)": true,
      "- Skiing (IAB17-35)": true,
      "- Snowboarding (IAB17-36)": true,
      "- Surfing/Bodyboarding (IAB17-37)": true,
      "- Swimming (IAB17-38)": true,
      "- Table Tennis/Ping-Pong (IAB17-39)": true,
      "- Tennis (IAB17-40)": true,
      "- Volleyball (IAB17-41)": true,
      "- Walking (IAB17-42)": true,
      "- Waterski/Wakeboard (IAB17-43)": true,
      "- World Soccer (IAB17-44)": true
    }
  },
  "Style & Fashion (IAB18)": {
    "left_box": true,
    "sub_categories": {
      "- Beauty (IAB18-1)": true,
      "- Body Art (IAB18-2)": true,
      "- Fashion (IAB18-3)": true,
      "- Jewelry (IAB18-4)": true,
      "- Clothing (IAB18-5)": true,
      "- Accessories (IAB18-6)": true
    }
  },
  "Technology & Computing (IAB19)": {
    "left_box": true,
    "sub_categories": {
      "- 3-D Graphics (IAB19-1)": true,
      "- Animation (IAB19-2)": true,
      "- Antivirus Software (IAB19-3)": true,
      "- C/C++ (IAB19-4)": true,
      "- Cameras & Camcorders (IAB19-5)": true,
      "- Cell Phones (IAB19-6)": true,
      "- Computer Certification (IAB19-7)": true,
      "- Computer Networking (IAB19-8)": true,
      "- Computer Peripherals (IAB19-9)": true,
      "- Computer Reviews (IAB19-10)": true,
      "- Data Centers (IAB19-11)": true,
      "- Databases (IAB19-12)": true,
      "- Desktop Publishing (IAB19-13)": true,
      "- Desktop Video (IAB19-14)": true,
      "- Email (IAB19-15)": true,
      "- Graphics Software (IAB19-16)": true,
      "- Home Video/DVD (IAB19-17)": true,
      "- Internet Technology (IAB19-18)": true,
      "- Java (IAB19-19)": true,
      "- JavaScript (IAB19-20)": true,
      "- Mac Support (IAB19-21)": true,
      "- MP3/MIDI (IAB19-22)": true,
      "- Net Conferencing (IAB19-23)": true,
      "- Net for Beginners (IAB19-24)": true,
      "- Network Security (IAB19-25)": true,
      "- Palmtops/PDAs (IAB19-26)": true,
      "- PC Support (IAB19-27)": true,
      "- Portable (IAB19-28)": true,
      "- Entertainment (IAB19-29)": true,
      "- Shareware/Freeware (IAB19-30)": true,
      "- Unix (IAB19-31)": true,
      "- Visual Basic (IAB19-32)": true,
      "- Web Clip Art (IAB19-33)": true,
      "- Web Design/HTML (IAB19-34)": true,
      "- Web Search (IAB19-35)": true,
      "- Windows (IAB19-36)": true
    }
  },
  "Travel (IAB20)": {
    "left_box": true,
    "sub_categories": {
      "- Adventure Travel (IAB20-1)": true,
      "- Africa (IAB20-2)": true,
      "- Air Travel (IAB20-3)": true,
      "- Australia & New Zealand (IAB20-4)": true,
      "- Bed & Breakfasts (IAB20-5)": true,
      "- Budget Travel (IAB20-6)": true,
      "- Business Travel (IAB20-7)": true,
      "- By US Locale (IAB20-8)": true,
      "- Camping (IAB20-9)": true,
      "- Canada (IAB20-10)": true,
      "- Caribbean (IAB20-11)": true,
      "- Cruises (IAB20-12)": true,
      "- Eastern Europe (IAB20-13)": true,
      "- Europe (IAB20-14)": true,
      "- France (IAB20-15)": true,
      "- Greece (IAB20-16)": true,
      "- Honeymoons/Getaways (IAB20-17)": true,
      "- Hotels (IAB20-18)": true,
      "- Italy (IAB20-19)": true,
      "- Japan (IAB20-20)": true,
      "- Mexico & Central America (IAB20-21)": true,
      "- National Parks (IAB20-22)": true,
      "- South America (IAB20-23)": true,
      "- Spas (IAB20-24)": true,
      "- Theme Parks (IAB20-25)": true,
      "- Traveling with Kids (IAB20-26)": true,
      "- United Kingdom (IAB20-27)": true
    }
  },
  "Real Estate (IAB21)": {
    "left_box": true,
    "sub_categories": {
      "- Apartments (IAB21-1)": true,
      "- Architects (IAB21-2)": true,
      "- Buying/Selling Homes (IAB21-3)": true
    }
  },
  "Shopping (IAB22)": {
    "left_box": true,
    "sub_categories": {
      "- Contests & Freebies (IAB22-1)": true,
      "- Couponing (IAB22-2)": true,
      "- Comparison (IAB22-3)": true,
      "- Engines (IAB22-4)": true
    }
  },
};
