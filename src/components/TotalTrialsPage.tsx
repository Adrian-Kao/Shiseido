import { Link } from "react-router-dom";
import { TrendingUp, Package, ShoppingBag, AlertTriangle } from "lucide-react";

type Product = {
  name: string;
  sku: string;
  inventory: number;
  trialUnits: number;
  soldUnits: number;
  conversion: number; // %
  status: "Healthy" | "Watch" | "Low";
};

const products: Product[] = [
  {
    name: "Ultimune Power Infusing Concentrate",
    sku: "SH-U001",
    inventory: 1240,
    trialUnits: 420,
    soldUnits: 315,
    conversion: 75,
    status: "Healthy",
  },
  {
    name: "White Lucent Brightening Serum",
    sku: "SH-W102",
    inventory: 860,
    trialUnits: 380,
    soldUnits: 210,
    conversion: 55,
    status: "Watch",
  },
  {
    name: "Vital Perfection Uplifting & Firming Cream",
    sku: "SH-V305",
    inventory: 430,
    trialUnits: 260,
    soldUnits: 150,
    conversion: 58,
    status: "Low",
  },
  {
    name: "Synchro Skin Self-Refreshing Foundation",
    sku: "SH-S221",
    inventory: 1520,
    trialUnits: 510,
    soldUnits: 390,
    conversion: 76,
    status: "Healthy",
  },
  {
    name: "Bio-Performance Skin Filler Serum",
    sku: "SH-B410",
    inventory: 980,
    trialUnits: 420,
    soldUnits: 310,
    conversion: 73,
    status: "Healthy",
  },
  {
    name: "Future Solution LX Night Cream",
    sku: "SH-F501",
    inventory: 310,
    trialUnits: 150,
    soldUnits: 92,
    conversion: 61,
    status: "Watch",
  },
  {
    name: "Benefiance Wrinkle Smoothing Cream",
    sku: "SH-B612",
    inventory: 770,
    trialUnits: 340,
    soldUnits: 205,
    conversion: 60,
    status: "Watch",
  },
  {
    name: "Essential Energy Hydrating Day Cream",
    sku: "SH-E720",
    inventory: 1450,
    trialUnits: 560,
    soldUnits: 420,
    conversion: 75,
    status: "Healthy",
  },
  {
    name: "Waso Shikulime Gel-to-Oil Cleanser",
    sku: "SH-W845",
    inventory: 1080,
    trialUnits: 430,
    soldUnits: 250,
    conversion: 58,
    status: "Watch",
  },
  {
    name: "Moisturizing Lip Treatment Balm",
    sku: "SH-L902",
    inventory: 1950,
    trialUnits: 620,
    soldUnits: 510,
    conversion: 82,
    status: "Healthy",
  },
];


export default function TotalTrialsPage() {
  const totalInventory = products.reduce((sum, p) => sum + p.inventory, 0);
  const totalTrial = products.reduce((sum, p) => sum + p.trialUnits, 0);
  const totalSold = products.reduce((sum, p) => sum + p.soldUnits, 0);
  const avgConversion = Math.round(
    products.reduce((sum, p) => sum + p.conversion, 0) / products.length
  );

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <Link to="/" className="text-sm text-slate-500 underline">
        ← Back to Dashboard
      </Link>

      <h2 className="mt-4 text-2xl font-semibold mb-2">
        Total Trials – Detailed View
      </h2>
      <p className="text-slate-600 mb-6">
        產品試用帶動的庫存與銷售狀況總覽：之後可以串接真實資料，目前為 demo 假資料。
      </p>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="rounded-2xl bg-white p-5 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-violet-100">
            <Package className="w-6 h-6 text-violet-600" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Total Inventory
            </p>
            <p className="text-2xl font-semibold">{totalInventory.toLocaleString()}</p>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-teal-100">
            <TrendingUp className="w-6 h-6 text-teal-600" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Units Trialed
            </p>
            <p className="text-2xl font-semibold">{totalTrial.toLocaleString()}</p>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-emerald-100">
            <ShoppingBag className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Units Sold
            </p>
            <p className="text-2xl font-semibold">{totalSold.toLocaleString()}</p>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-amber-100">
            <TrendingUp className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Avg Trial → Purchase
            </p>
            <p className="text-2xl font-semibold">{avgConversion}%</p>
          </div>
        </div>
      </div>

      {/* Product table */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900">
            Product Trial & Inventory Status
          </h3>
          <p className="text-xs text-slate-500">
            顯示各產品的庫存、試用數量、銷售與轉換率
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="border-b border-slate-200 text-slate-500">
              <tr>
                <th className="py-2 pr-4 text-left">Product</th>
                <th className="py-2 px-4 text-right">Inventory</th>
                <th className="py-2 px-4 text-right">Trial Units</th>
                <th className="py-2 px-4 text-right">Sold Units</th>
                <th className="py-2 px-4 text-center">Trial → Purchase</th>
                <th className="py-2 pl-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.sku} className="border-b border-slate-100 last:border-0">
                  <td className="py-3 pr-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-slate-900">{p.name}</span>
                      <span className="text-xs text-slate-500">{p.sku}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right tabular-nums">
                    {p.inventory.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right tabular-nums">
                    {p.trialUnits.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right tabular-nums">
                    {p.soldUnits.toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-col items-center">
                      <span className="font-medium text-slate-900">
                        {p.conversion}%
                      </span>
                      <div className="mt-1 h-1.5 w-24 rounded-full bg-slate-100">
                        <div
                          className="h-1.5 rounded-full bg-gradient-to-r from-teal-500 to-purple-500"
                          style={{ width: `${p.conversion}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-3 pl-4">
                    {p.status === "Healthy" && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                        • Healthy
                      </span>
                    )}
                    {p.status === "Watch" && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                        • Monitor
                      </span>
                    )}
                    {p.status === "Low" && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-3 py-1 text-xs font-medium text-rose-700">
                        <AlertTriangle className="w-3 h-3" />
                        Low stock
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
