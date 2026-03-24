import { Check, X } from 'lucide-react';

type CellValue = string | boolean;

interface Row {
  label: string;
  nimbus: CellValue;
  profound: CellValue;
  evertune: CellValue;
  peecAi: CellValue;
}

const rows: Row[] = [
  {
    label: 'Target Customer',
    nimbus: 'SMBs & D2C Brands',
    profound: 'Enterprise',
    evertune: 'Enterprise',
    peecAi: 'Mid-Market',
  },
  {
    label: 'Starting Price',
    nimbus: 'Free',
    profound: '$500/mo',
    evertune: 'Custom',
    peecAi: '$200/mo',
  },
  { label: 'Mobile App', nimbus: true, profound: false, evertune: false, peecAi: false },
  { label: 'One-Tap Fix', nimbus: true, profound: false, evertune: false, peecAi: false },
  { label: 'Protocol Compliance', nimbus: true, profound: true, evertune: false, peecAi: false },
  { label: 'Product Scanner', nimbus: true, profound: false, evertune: false, peecAi: false },
  { label: 'Hosted Storefront', nimbus: true, profound: false, evertune: false, peecAi: false },
  { label: 'Self-Serve Onboarding', nimbus: true, profound: false, evertune: false, peecAi: true },
  { label: 'Shopify Integration', nimbus: true, profound: true, evertune: true, peecAi: false },
];

function Cell({ value }: { value: CellValue }) {
  if (typeof value === 'boolean') {
    return value ? (
      <Check className="mx-auto h-5 w-5 text-emerald-400" />
    ) : (
      <X className="mx-auto h-5 w-5 text-red-400/70" />
    );
  }
  return <span>{value}</span>;
}

export default function CompetitiveTable() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            See How Nimbus{' '}
            <span className="gradient-text">Stacks Up</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            The only platform built from the ground up for small businesses to win AI commerce.
          </p>
        </div>

        {/* Table wrapper */}
        <div className="mt-16 overflow-x-auto rounded-2xl glass">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-6 py-4 text-left font-medium text-gray-400">Feature</th>
                <th className="px-6 py-4 text-center font-semibold text-white bg-white/5">
                  <span className="gradient-text">Nimbus</span>
                </th>
                <th className="px-6 py-4 text-center font-medium text-gray-400">Profound</th>
                <th className="px-6 py-4 text-center font-medium text-gray-400">Evertune</th>
                <th className="px-6 py-4 text-center font-medium text-gray-400">Peec AI</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={row.label}
                  className={`border-b border-white/5 ${i % 2 === 0 ? '' : 'bg-white/[0.02]'}`}
                >
                  <td className="px-6 py-4 font-medium text-gray-300">{row.label}</td>
                  <td className="px-6 py-4 text-center bg-white/5">
                    <Cell value={row.nimbus} />
                  </td>
                  <td className="px-6 py-4 text-center text-gray-400">
                    <Cell value={row.profound} />
                  </td>
                  <td className="px-6 py-4 text-center text-gray-400">
                    <Cell value={row.evertune} />
                  </td>
                  <td className="px-6 py-4 text-center text-gray-400">
                    <Cell value={row.peecAi} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
