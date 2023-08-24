export interface Product {
  id: string;
  name: string;
  revenueData: DataPoint[];
  salesQuantityData: DataPoint[];
}

export interface DataPoint {
  date: string;
  value: number;
}

export interface Segment {
  segment: string;
  customers: number;
}

export interface Category {
  name: string;
  revenue: number;
  growthRate: number;
  bestPerforming: boolean;
}

export interface SalesDatas {
  regions: {
    [region: string]: number;
  };
  channels: {
    [channel: string]: number;
  };
  categories: {
    [category: string]: number;
  };
};

export interface ProductDatas {
  sku: string;
  ingredient: string;
  category: string;
  beginning: number;
  production: number;
  purchasing: number;
  usage: number;
  transfer: number;
  adjusment: number;
  ending: number;
  unit: string;
}

export interface Adjustment {
  id: number;
  date: string;
  time: string;
  note: string;
  ingredient: string;
  adjusmentQuantity: number;
  adjusmentUnit: string;
  value: number;
}

export interface IngredientLibrary {
  id: number;
  type: string;
  name: string;
  category: string;
  unit: string;
  instock: number;
  alertstock: number;
  avgcost: number;
  image: string;
}

export interface IngredientCategory {
  id: number;
  name: string;
  ingredientStock: number;
}

export interface Variant {
  variantSKU: string | null;
  variantName: string | null;
  variantPrice: number;
}

export interface InventoryDetail {
  instock: number | null;
  alertstock: number | null;
}

export interface ItemLibrary {
  id: number;
  productName: string;
  category: string;
  brand: string;
  description: string;
  variantDetail: Variant[];
  inventoryItemDetail: InventoryDetail[];
  cost: number;
}

export interface IngredientRecipe {
  ingredientSKU: string;
  ingredientName: string;
  ingredientQuantity: number;
  ingredientUnit: string;
  ingredientAvgCost: number;
}

export interface Recipes {
  id: number;
  item: string;
  variant: string | null;
  ingredient: IngredientRecipe[];
}

export interface Supplier {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  address: string;
  city: string;
  state: string;
  postal: string;
}

export interface TransferIngredient {
  ingredientSKU: string;
  ingredientQuantity: number;
  ingredientUnit: string;
}

export interface Transfer {
  orderNumber: string;
  date: string;
  time: string;
  fromOutlet: string;
  toOutlet: string;
  notes: string;
  ingredients: TransferIngredient[];
  status: string;
}

export interface PurchasingList {
  listNumber: number;
  listName: string;
  quantity: number;
  unit: string;
  unitCost: number;
  subtotalCost: number;
}

export interface PurchasingOrder {
  numberPO: number;
  outletName: string;
  purchasingOrder: PurchasingList[];
  historyLog: HistoryLog[];
  statusPO: boolean;
}

export interface HistoryLog {
  logNumber: number;
  logDate: string;
  logTime: number;
  logDescription: string;
}

export interface HistoricalData {
  date: string;
  revenue: number;
  marketingSpend: number;
  websiteTraffic: number;
  totalClosedDeals: number;
}

export const transferIngredient: Transfer[] = [
  {
    orderNumber: 'trf-00912381',
    date: 'Wed Aug 2 2023',
    time: '14:00',
    fromOutlet: 'Outlet Sawaregna',
    toOutlet: 'Outlet Abah',
    notes: 'Transfer daging slices, karena urgent.',
    ingredients: [
      {
        ingredientSKU: 'SKU0001',
        ingredientQuantity: 5000,
        ingredientUnit: 'gram (g)'
      }
    ],
    status: 'In Progress'
  },
  {
    orderNumber: 'trf-00912581',
    date: 'Wed Aug 2 2023',
    time: '14:10',
    fromOutlet: 'Outlet Sawaregna',
    toOutlet: 'Outlet Dadang',
    notes: 'Transfer daging slices, karena urgent.',
    ingredients: [
      {
        ingredientSKU: 'SKU0001',
        ingredientQuantity: 5000,
        ingredientUnit: 'gram (g)'
      }
    ],
    status: 'Completed'
  },
  {
    orderNumber: 'trf-00912311',
    date: 'Wed Aug 2 2023',
    time: '10:00',
    fromOutlet: 'Outlet Abah',
    toOutlet: 'Outlet Dadang',
    notes: 'Transfer daging slices, karena urgent.',
    ingredients: [
      {
        ingredientSKU: 'SKU0001',
        ingredientQuantity: 5000,
        ingredientUnit: 'gram (g)'
      }
    ],
    status: 'Cancel'
  },
]

export const supplier: Supplier[] = [
  {
    id: 1,
    name: 'Aceng Warehouse',
    phone: '081214594538',
    email: 'aceng@warehouse.id',
    address: 'Hegarmanah No.12',
    city: 'Kota Bandung',
    state: 'Jawa Barat',
    postal: '40141',
  }
]

export const itemRecipe: Recipes[] = [
  {
    id: 1,
    item: 'Wagyu Sawaregna',
    variant: null,
    ingredient: [
      {
        ingredientSKU: 'SKU0001',
        ingredientName: 'Wagyu A5',
        ingredientQuantity: 10,
        ingredientUnit: 'gram (g)',
        ingredientAvgCost: 27000
      },
    ]
  },
  {
    id: 2,
    item: 'Sate Sawaregna',
    variant: 'Sate Sapi',
    ingredient: [
      {
        ingredientSKU: 'SKU0001',
        ingredientName: 'Wagyu A5',
        ingredientQuantity: 10,
        ingredientUnit: 'gram (g)',
        ingredientAvgCost: 27000
      },
      {
        ingredientSKU: 'SKU0001',
        ingredientName: 'Wagyu A5',
        ingredientQuantity: 10,
        ingredientUnit: 'gram (g)',
        ingredientAvgCost: 27000
      },
      {
        ingredientSKU: 'SKU0001',
        ingredientName: 'Wagyu A5',
        ingredientQuantity: 10,
        ingredientUnit: 'gram (g)',
        ingredientAvgCost: 27000
      },
    ]
  }
]

export const itemLibrary: ItemLibrary[] = [
  {
    id: 1,
    productName: 'Wagyu Sawaregna',
    category: 'Main Courses',
    brand: 'Sawaregna',
    description: '-',
    variantDetail: [
      {
        variantSKU: null,
        variantName: null,
        variantPrice: 250000
      }
    ],
    inventoryItemDetail: [
      {
        instock: null,
        alertstock: null,
      }
    ],
    cost: 200000
  },
  {
    id: 1,
    productName: 'Sate Sawaregna',
    category: 'Main Courses',
    brand: 'Sawaregna',
    description: '-',
    variantDetail: [
      {
        variantSKU: 'SKU0001',
        variantName: 'Sate Ayam',
        variantPrice: 250000
      },
      {
        variantSKU: 'SKU0002',
        variantName: 'Sate Sapi',
        variantPrice: 250000
      },
    ],
    inventoryItemDetail: [
      {
        instock: null,
        alertstock: null,
      }
    ],
    cost: 200000
  }
]

export const ingredientCategory: IngredientCategory[] = [
  {
    id: 1,
    name: 'Meat',
    ingredientStock: 2,
  }
]

export const ingredientLibrary: IngredientLibrary[] = [
  {
    id: 1,
    type: 'raw-material',
    name: 'Wagyu A5',
    category: 'Meat',
    unit: 'gram (g)',
    instock: 50000,
    alertstock: 500,
    avgcost: 1200,
    image: '-'
  },
  {
    id: 2,
    type: 'raw-material',
    name: 'Wagyu A1',
    category: 'Meat',
    unit: 'gram (g)',
    instock: 150000,
    alertstock: 200,
    avgcost: 1700,
    image: '-'
  }
]

export const productData: ProductDatas[] = [
  {
    sku: 'SKU00SK001',
    ingredient: 'Wagyu A5',
    category: 'Meat',
    beginning: 50000,
    production: 0,
    purchasing: 1000,
    usage: 0,
    transfer: 0,
    adjusment: 0,
    ending: 0,
    unit: 'gram (gr)',
  },
  {
    sku: 'SKU00SK002',
    ingredient: 'Wagyu A1',
    category: 'Meat',
    beginning: 50000,
    production: 0,
    purchasing: 1000,
    usage: 0,
    transfer: 0,
    adjusment: 5000,
    ending: 45000,
    unit: 'gram (gr)',
  },
  {
    sku: 'SKU00SK003',
    ingredient: 'Tomat',
    category: 'Vegetable',
    beginning: 50000,
    production: 0,
    purchasing: 1000,
    usage: 0,
    transfer: 0,
    adjusment: 0,
    ending: 0,
    unit: 'gram (gr)',
  },
]

export const adjustmentData: Adjustment[] = [
  {
    id: 1,
    date: 'Wed 1 Aug 2023',
    time: '08:00',
    note: '-',
    ingredient: 'Wagyu A5',
    adjusmentQuantity: 100.00,
    adjusmentUnit: 'gram (g)',
    value: 50000,
  },
  {
    id: 2,
    date: 'Wed 2 Aug 2023',
    time: '08:10',
    note: '-',
    ingredient: 'Wagyu A1',
    adjusmentQuantity: 100.00,
    adjusmentUnit: 'gram (g)',
    value: 75000,
  },
  {
    id: 3,
    date: 'Wed 2 Aug 2023',
    time: '08:12',
    note: '-',
    ingredient: 'Wagyu A1',
    adjusmentQuantity: 150.00,
    adjusmentUnit: 'gram (g)',
    value: 85000,
  }
]

export const historicalData: HistoricalData[] = [
  {
    "date": "2021-12-31",
    "revenue": 6277,
    "marketingSpend": 1056,
    "websiteTraffic": 6600,
    "totalClosedDeals": 13
  },
  {
    "date": "2022-01-01",
    "revenue": 12530,
    "marketingSpend": 2448,
    "websiteTraffic": 3167,
    "totalClosedDeals": 11
  },
  {
    "date": "2022-01-02",
    "revenue": 7710,
    "marketingSpend": 1176,
    "websiteTraffic": 5543,
    "totalClosedDeals": 12
  },
  {
    "date": "2022-01-03",
    "revenue": 9269,
    "marketingSpend": 1771,
    "websiteTraffic": 6887,
    "totalClosedDeals": 17
  },
  {
    "date": "2022-01-04",
    "revenue": 6720,
    "marketingSpend": 2317,
    "websiteTraffic": 4544,
    "totalClosedDeals": 20
  },
  {
    "date": "2022-01-05",
    "revenue": 9204,
    "marketingSpend": 2270,
    "websiteTraffic": 5414,
    "totalClosedDeals": 19
  },
  {
    "date": "2022-01-06",
    "revenue": 9226,
    "marketingSpend": 2003,
    "websiteTraffic": 6709,
    "totalClosedDeals": 15
  },
  {
    "date": "2022-01-07",
    "revenue": 13422,
    "marketingSpend": 2890,
    "websiteTraffic": 3053,
    "totalClosedDeals": 10
  },
  {
    "date": "2022-01-08",
    "revenue": 14084,
    "marketingSpend": 2925,
    "websiteTraffic": 3466,
    "totalClosedDeals": 8
  },
  {
    "date": "2022-01-09",
    "revenue": 13688,
    "marketingSpend": 2176,
    "websiteTraffic": 6672,
    "totalClosedDeals": 13
  },
  {
    "date": "2022-01-10",
    "revenue": 6067,
    "marketingSpend": 1941,
    "websiteTraffic": 2378,
    "totalClosedDeals": 15
  },
  {
    "date": "2022-01-11",
    "revenue": 7208,
    "marketingSpend": 2378,
    "websiteTraffic": 3946,
    "totalClosedDeals": 12
  },
  {
    "date": "2022-01-12",
    "revenue": 8838,
    "marketingSpend": 2207,
    "websiteTraffic": 6352,
    "totalClosedDeals": 7
  },
  {
    "date": "2022-01-13",
    "revenue": 7308,
    "marketingSpend": 1036,
    "websiteTraffic": 4996,
    "totalClosedDeals": 24
  },
  {
    "date": "2022-01-14",
    "revenue": 8587,
    "marketingSpend": 2139,
    "websiteTraffic": 2229,
    "totalClosedDeals": 10
  },
  {
    "date": "2022-01-15",
    "revenue": 11066,
    "marketingSpend": 2071,
    "websiteTraffic": 2259,
    "totalClosedDeals": 15
  },
  {
    "date": "2022-01-16",
    "revenue": 12919,
    "marketingSpend": 2813,
    "websiteTraffic": 5934,
    "totalClosedDeals": 14
  },
  {
    "date": "2022-01-17",
    "revenue": 14249,
    "marketingSpend": 2549,
    "websiteTraffic": 5449,
    "totalClosedDeals": 5
  },
  {
    "date": "2022-01-18",
    "revenue": 7977,
    "marketingSpend": 2439,
    "websiteTraffic": 3847,
    "totalClosedDeals": 12
  },
  {
    "date": "2022-01-19",
    "revenue": 10824,
    "marketingSpend": 1370,
    "websiteTraffic": 4525,
    "totalClosedDeals": 10
  },
  {
    "date": "2022-01-20",
    "revenue": 7016,
    "marketingSpend": 1222,
    "websiteTraffic": 6407,
    "totalClosedDeals": 9
  },
  {
    "date": "2022-01-21",
    "revenue": 7390,
    "marketingSpend": 2818,
    "websiteTraffic": 6849,
    "totalClosedDeals": 12
  },
  {
    "date": "2022-01-22",
    "revenue": 8108,
    "marketingSpend": 1940,
    "websiteTraffic": 4197,
    "totalClosedDeals": 18
  },
  {
    "date": "2022-01-23",
    "revenue": 13709,
    "marketingSpend": 1692,
    "websiteTraffic": 6797,
    "totalClosedDeals": 18
  },
  {
    "date": "2022-01-24",
    "revenue": 5095,
    "marketingSpend": 1838,
    "websiteTraffic": 2632,
    "totalClosedDeals": 23
  },
  {
    "date": "2022-01-25",
    "revenue": 6373,
    "marketingSpend": 1087,
    "websiteTraffic": 4195,
    "totalClosedDeals": 13
  },
  {
    "date": "2022-01-26",
    "revenue": 13719,
    "marketingSpend": 1886,
    "websiteTraffic": 4027,
    "totalClosedDeals": 13
  },
  {
    "date": "2022-01-27",
    "revenue": 8742,
    "marketingSpend": 2566,
    "websiteTraffic": 4078,
    "totalClosedDeals": 11
  },
  {
    "date": "2022-01-28",
    "revenue": 9080,
    "marketingSpend": 2965,
    "websiteTraffic": 2824,
    "totalClosedDeals": 17
  },
  {
    "date": "2022-01-29",
    "revenue": 6780,
    "marketingSpend": 2251,
    "websiteTraffic": 2113,
    "totalClosedDeals": 22
  }
];

export const teamData = [
  {
    name: 'Outlet Sawaregna',
    location: 'ID, West Java, Bandung',
    numberofagent: '15',
  },
  {
    name: 'Outlet Dadang Konelo',
    location: 'ID, West Java, Bandung Utara',
    numberofagent: '5',
  },
  {
    name: 'Outlet Udin Petot',
    location: 'ID, West Java, Bandung Selatan',
    numberofagent: '7',
  },
]

export const agentData = [
  {
    agent: 'Aceng',
    outlet: 'Outlet Sawaregna',
    role: 'Administrator',
    phone: '08121414594538',
    email: 'aceng@saka.id',
    status: 'Active',
  },
  {
    agent: 'Kakuy',
    outlet: 'Outlet Sawaregna',
    role: 'Cashier',
    phone: '08121414594538',
    email: 'kakuy@saka.id',
    status: 'In-Active',
  },
]

export const cutomersData = [
  {
    contact: 'Aceng',
    type: 'Priority',
    phone: '081214594538',
    email: 'koaceng@saka.id',
    referral: '-',
  },
  {
    contact: 'Kakuy',
    type: 'Member',
    phone: '081214594538',
    email: 'kakuy@saka.id',
    referral: 'Aceng',
  },
  {
    contact: '-',
    type: 'Personal',
    phone: '081214594538',
    email: '-',
    referral: '-',
  },
]

export const dealData = [
  {
    deal: 'Deal 1',
    stage: 'New',
    dealValue: '50000000',
    contact: 'Kakuy',
    priority: 'Medium',
    dealLength: '15 Day',
    status: 'Stuck'
  },
  {
    deal: 'Deal 2',
    stage: 'Discovery',
    dealValue: '25000000',
    contact: 'Aceng',
    priority: 'High',
    dealLength: '25 Day',
    status: 'Working on it'
  },
  {
    deal: 'Deal 3',
    stage: 'Proposal',
    dealValue: '10000000',
    contact: 'Aceng Kakuy',
    priority: 'Low',
    dealLength: '30 Day',
    status: ''
  },
  {
    deal: 'Deal 3',
    stage: 'Negotiation',
    dealValue: '10000000',
    contact: 'Aceng Kakuy',
    priority: 'Critical',
    dealLength: '30 Day',
    status: ''
  },
  {
    deal: 'Deal 3',
    stage: 'Won',
    dealValue: '10000000',
    contact: 'Aceng Kakuy',
    priority: 'Low',
    dealLength: '30 Day',
    status: ''
  },
  {
    deal: 'Deal 3',
    stage: 'Lost',
    dealValue: '10000000',
    contact: 'Aceng Kakuy',
    priority: 'Low',
    dealLength: '30 Day',
    status: ''
  },
]

export const salesData = {
  regions: {
    'North America': 25000,
    Europe: 18000,
    Asia: 15000,
    Africa: 8000,
    'Latin America': 12000,
  },
  channels: {
    Online: 35000,
    Retail: 28000,
    Wholesale: 22000,
  },
  categories: {
    Electronics: 40000,
    Clothing: 32000,
    Home: 28000,
    Beauty: 18000,
    Sports: 15000,
  },
};

export const products: Product[] = [
  {
    id: 'product-1',
    name: 'Product 1',
    revenueData: [
      { date: '2023-01-01', value: 100 },
      { date: '2023-01-02', value: 150 },
      { date: '2023-01-03', value: 200 },
      // ...
    ],
    salesQuantityData: [
      { date: '2023-01-01', value: 10 },
      { date: '2023-01-02', value: 15 },
      { date: '2023-01-03', value: 20 },
      // ...
    ],
  },
  {
    id: 'product-2',
    name: 'Product 2',
    revenueData: [
      { date: '2023-01-01', value: 100 },
      { date: '2023-01-02', value: 150 },
      { date: '2023-01-03', value: 200 },
      // ...
    ],
    salesQuantityData: [
      { date: '2023-01-01', value: 10 },
      { date: '2023-01-02', value: 15 },
      { date: '2023-01-03', value: 20 },
      // ...
    ],
  },
  // ... other products
];

export const categories: Category[] = [
  {
    name: 'Electronics',
    revenue: 5000,
    growthRate: 10,
    bestPerforming: true,
  },
  {
    name: 'Clothing',
    revenue: 3000,
    growthRate: 5,
    bestPerforming: false,
  },
  {
    name: 'Home Decor',
    revenue: 2000,
    growthRate: 2,
    bestPerforming: false,
  },
  {
    name: 'Beauty',
    revenue: 4000,
    growthRate: 8,
    bestPerforming: false,
  },
];

export const segmentData: Segment[] = [
  { segment: 'Segment A', customers: 200 },
  { segment: 'Segment B', customers: 350 },
  { segment: 'Segment C', customers: 150 },
  { segment: 'Segment D', customers: 450 },
];