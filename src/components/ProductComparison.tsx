import { Package, TrendingUp, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

function ProductComparison() {
  const products = [
    {
      name: 'Hydra Glow Serum',
      trials: 6842,
      score: 8.9,
      satisfaction: 94,
      repurchase: 82,
      trend: '+12%',
      positive: true
    },
    {
      name: 'Youth Revival Cream',
      trials: 5621,
      score: 8.6,
      satisfaction: 91,
      repurchase: 78,
      trend: '+8%',
      positive: true
    },
    {
      name: 'Radiance Boost Mask',
      trials: 4893,
      score: 8.4,
      satisfaction: 89,
      repurchase: 75,
      trend: '+15%',
      positive: true
    },
    {
      name: 'Gentle Clean Foam',
      trials: 4156,
      score: 8.2,
      satisfaction: 87,
      repurchase: 71,
      trend: '+6%',
      positive: true
    },
    {
      name: 'Vitamin C Brightener',
      trials: 3335,
      score: 7.8,
      satisfaction: 84,
      repurchase: 68,
      trend: '+4%',
      positive: true
    }
  ];

  return (
    <Link to="/comparison" className="block relative group">
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-400/20 to-purple-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
        <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-teal-400 to-purple-500 rounded-xl">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Product-Level Comparison</h2>
              <p className="text-slate-600 text-sm">Performance metrics across product line</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-4 px-4 font-semibold text-slate-700">Product Name</th>
                  <th className="text-center py-4 px-4 font-semibold text-slate-700">Trials</th>
                  <th className="text-center py-4 px-4 font-semibold text-slate-700">TryMe Score</th>
                  <th className="text-center py-4 px-4 font-semibold text-slate-700">Satisfaction</th>
                  <th className="text-center py-4 px-4 font-semibold text-slate-700">Repurchase</th>
                  <th className="text-center py-4 px-4 font-semibold text-slate-700">Trend</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr
                    key={index}
                    className="border-b border-slate-100 hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-teal-50/50 transition-all"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-400 to-teal-500 flex items-center justify-center text-white font-bold">
                          {index + 1}
                        </div>
                        <span className="font-semibold text-slate-800">{product.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="text-slate-700 font-medium">{product.trials.toLocaleString()}</span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                        <span className="font-bold text-slate-800">{product.score}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-20 h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
                            style={{ width: `${product.satisfaction}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-semibold text-slate-700">{product.satisfaction}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-20 h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-purple-400 to-teal-500 rounded-full"
                            style={{ width: `${product.repurchase}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-semibold text-slate-700">{product.repurchase}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${product.positive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                        <TrendingUp className="w-3 h-3" />
                        {product.trend}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductComparison;
