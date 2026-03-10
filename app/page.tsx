import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Stop Typing Receipt Line Items.
            <br />
            <span className="text-blue-600">Start Tracking Your Material Costs.</span>
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
            Upload a supplier receipt. Get every line item extracted, categorized, and exportable in seconds.
          </p>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            Built for contractors, builders, and trades who need to know where every dollar goes.
          </p>
          <div className="mt-10 flex gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg" className="text-lg px-8 py-6">
                Upload First Receipt - Free
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              See How It Works
            </Button>
          </div>
        </div>
      </div>

      {/* Problem Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-xl p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Your Bank Statement Says "$2,347 - Home Depot"
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            But you need to know:
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <span className="text-green-600 text-xl">✓</span>
              <div>
                <p className="font-semibold text-gray-900">$612 in lumber</p>
                <p className="text-gray-600">(price up 8% vs. last month)</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-600 text-xl">✓</span>
              <div>
                <p className="font-semibold text-gray-900">$438 in paint</p>
                <p className="text-gray-600">(3 gallons @ $146/gal)</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-600 text-xl">✓</span>
              <div>
                <p className="font-semibold text-gray-900">$294 in fasteners</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-600 text-xl">✓</span>
              <div>
                <p className="font-semibold text-gray-900">$1,003 in tools</p>
                <p className="text-gray-600">(capitalized asset, not consumable)</p>
              </div>
            </div>
          </div>
          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <p className="text-lg font-semibold text-gray-900 mb-4">
              Without line-item data, you&apos;re flying blind on:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>• Which materials are eating your margins</li>
              <li>• Where to negotiate better pricing</li>
              <li>• What&apos;s deductible vs. depreciable</li>
              <li>• If a project went over budget (and why)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          How It Works
        </h2>
        <div className="grid md:grid-cols-4 gap-8">
          <Card className="p-6">
            <div className="text-4xl font-bold text-blue-600 mb-4">1</div>
            <h3 className="text-xl font-semibold mb-3">Upload Receipt Photo</h3>
            <p className="text-gray-600">
              Drag-drop or snap with your phone. Works with printed receipts from any supplier.
            </p>
          </Card>
          <Card className="p-6">
            <div className="text-4xl font-bold text-blue-600 mb-4">2</div>
            <h3 className="text-xl font-semibold mb-3">AI Extracts Every Line</h3>
            <p className="text-gray-600">
              GPT-4o Vision reads every item, quantity, price. You review and edit if needed.
            </p>
          </Card>
          <Card className="p-6">
            <div className="text-4xl font-bold text-blue-600 mb-4">3</div>
            <h3 className="text-xl font-semibold mb-3">Auto-Categorize by Material</h3>
            <p className="text-gray-600">
              Lumber, paint, hardware, tools, electrical, plumbing—sorted automatically.
            </p>
          </Card>
          <Card className="p-6">
            <div className="text-4xl font-bold text-blue-600 mb-4">4</div>
            <h3 className="text-xl font-semibold mb-3">Export to Spreadsheet</h3>
            <p className="text-gray-600">
              Download CSV and track cost trends, supplier pricing, and project budgets.
            </p>
          </Card>
        </div>
      </div>

      {/* Pricing */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Simple Pricing
        </h2>
        <div className="max-w-lg mx-auto">
          <Card className="p-8 border-2 border-blue-600">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">Starter</h3>
              <div className="text-5xl font-bold text-blue-600 mb-4">
                $29<span className="text-2xl text-gray-600">/month</span>
              </div>
              <ul className="text-left space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  Unlimited receipt uploads
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  AI extraction & categorization
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  Export to CSV/Excel
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  1 user
                </li>
              </ul>
              <Link href="/dashboard">
                <Button size="lg" className="w-full">
                  Start Free 7-Day Trial
                </Button>
              </Link>
              <p className="mt-4 text-sm text-gray-500">No credit card required</p>
            </div>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2026 ReceiptBreakdown. Built for contractors who track every dollar.
          </p>
        </div>
      </footer>
    </div>
  );
}
