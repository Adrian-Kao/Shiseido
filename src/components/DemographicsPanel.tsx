import { Users } from 'lucide-react';
import { Link } from 'react-router-dom';

function DemographicsPanel() {
  const ageGroups = [
    { label: '18-24', value: 18, color: 'bg-purple-400' },
    { label: '25-34', value: 34, color: 'bg-purple-500' },
    { label: '35-44', value: 28, color: 'bg-teal-500' },
    { label: '45-54', value: 15, color: 'bg-teal-400' },
    { label: '55+', value: 5, color: 'bg-teal-300' }
  ];

  const regions = [
    { label: 'North America', value: 42 },
    { label: 'Europe', value: 31 },
    { label: 'Asia Pacific', value: 19 },
    { label: 'Other', value: 8 }
  ];

  const skinTypes = [
    { label: 'Combination', value: 35, color: 'from-purple-400 to-purple-600' },
    { label: 'Oily', value: 28, color: 'from-teal-400 to-teal-600' },
    { label: 'Dry', value: 22, color: 'from-pink-400 to-rose-500' },
    { label: 'Sensitive', value: 15, color: 'from-blue-400 to-cyan-500' }
  ];

  return (
  <Link to="/demographics" className="block relative group h-full">
    <div className="relative group h-full">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-teal-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
      <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/50 h-full flex flex-col">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-purple-400 to-teal-500 rounded-xl">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Demographics</h2>
            <p className="text-slate-600 text-sm">User profile insights</p>
          </div>
        </div>

        <div className="space-y-6 flex-1">
          <div>
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Age Distribution</h3>
            <div className="space-y-2">
              {ageGroups.map((group, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-slate-600">{group.label}</span>
                    <span className="font-semibold text-slate-800">{group.value}%</span>
                  </div>
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${group.color} rounded-full transition-all duration-500`}
                      style={{ width: `${group.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200">
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Geographic Split</h3>
            <div className="space-y-2">
              {regions.map((region, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">{region.label}</span>
                  <span className="font-semibold text-slate-800">{region.value}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200">
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Skin Type</h3>
            <div className="space-y-3">
              {skinTypes.map((type, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${type.color}`}></div>
                    <span className="text-sm text-slate-600">{type.label}</span>
                  </div>
                  <span className="text-sm font-semibold text-slate-800">{type.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </Link>
  );
}

export default DemographicsPanel;
