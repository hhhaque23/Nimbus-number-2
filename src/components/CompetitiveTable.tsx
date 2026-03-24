import { Check, X } from 'lucide-react'

type CellValue = string | boolean

interface Row {
  label: string
  nimbus: CellValue
  profound: CellValue
  evertune: CellValue
  peecAi: CellValue
}

const rows: Row[] = [
  { label: 'Target customer', nimbus: 'SMBs & D2C', profound: 'Enterprise', evertune: 'Enterprise', peecAi: 'Mid-market' },
  { label: 'Starting price', nimbus: '$29/mo', profound: '$2K+/mo', evertune: 'Sales call', peecAi: '$99/mo' },
  { label: 'Mobile app', nimbus: true, profound: false, evertune: false, peecAi: false },
  { label: 'One-tap fix', nimbus: true, profound: false, evertune: false, peecAi: false },
  { label: 'Protocol compliance', nimbus: true, profound: true, evertune: false, peecAi: false },
  { label: 'Product scanner', nimbus: true, profound: false, evertune: false, peecAi: false },
  { label: 'Hosted storefront', nimbus: true, profound: false, evertune: false, peecAi: false },
  { label: 'Self-serve onboarding', nimbus: true, profound: false, evertune: false, peecAi: true },
  { label: 'Shopify integration', nimbus: true, profound: true, evertune: true, peecAi: false },
]

function Cell({ value }: { value: CellValue }) {
  if (typeof value === 'boolean') {
    return value ? (
      <Check className="mx-auto h-4 w-4 text-nimbus-600" />
    ) : (
      <X className="mx-auto h-4 w-4 text-gray-300" />
    )
  }
  return <span>{value}</span>
}

export default function CompetitiveTable() {
  return (
    <section className="py-24 sm:py-32 bg-gray-50">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
            How Nimbus compares
          </h2>
          <p className="mt-3 text-gray-500">
            The only platform built for small businesses to win AI commerce.
          </p>
        </div>

        <div className="mt-14 overflow-x-auto">
          <table className="w-full min-w-[600px] text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 pr-6 text-left font-medium text-gray-400 text-xs uppercase tracking-wide">Feature</th>
                <th className="py-3 px-6 text-center font-semibold text-gray-900 bg-nimbus-50 rounded-t-lg text-xs uppercase tracking-wide">Nimbus</th>
                <th className="py-3 px-6 text-center font-medium text-gray-400 text-xs uppercase tracking-wide">Profound</th>
                <th className="py-3 px-6 text-center font-medium text-gray-400 text-xs uppercase tracking-wide">Evertune</th>
                <th className="py-3 px-6 text-center font-medium text-gray-400 text-xs uppercase tracking-wide">Peec AI</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-b border-gray-100">
                  <td className="py-3.5 pr-6 text-gray-700">{row.label}</td>
                  <td className="py-3.5 px-6 text-center bg-nimbus-50/50 font-medium text-gray-900">
                    <Cell value={row.nimbus} />
                  </td>
                  <td className="py-3.5 px-6 text-center text-gray-500"><Cell value={row.profound} /></td>
                  <td className="py-3.5 px-6 text-center text-gray-500"><Cell value={row.evertune} /></td>
                  <td className="py-3.5 px-6 text-center text-gray-500"><Cell value={row.peecAi} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
