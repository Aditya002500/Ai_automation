import React from 'react';

export default function BillingPage() {
  return (
    <div className="p-6 lg:p-8">
      <div className="w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Billing & Subscription</h1>
          <p className="text-white/70">Manage your subscription and billing information</p>
        </div>

        <div className="grid gap-6">
          {/* Current Plan */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <h2 className="text-xl font-semibold text-white mb-4">Current Plan</h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Starter Plan</p>
                <p className="text-white/60 text-sm">Free tier with basic features</p>
              </div>
              <div className="text-right">
                <p className="text-white font-bold">$0/month</p>
                <button className="mt-2 px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 rounded-lg text-white transition-all duration-300">
                  Upgrade
                </button>
              </div>
            </div>
          </div>

          {/* Usage Stats */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <h2 className="text-xl font-semibold text-white mb-4">Usage This Month</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">15</p>
                <p className="text-white/60 text-sm">Documents Created</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">3.2K</p>
                <p className="text-white/60 text-sm">Words Generated</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">8</p>
                <p className="text-white/60 text-sm">Templates Used</p>
              </div>
            </div>
          </div>

          {/* Billing History */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <h2 className="text-xl font-semibold text-white mb-4">Billing History</h2>
            <div className="text-center py-8">
              <p className="text-white/60">No billing history available</p>
              <p className="text-white/40 text-sm mt-1">You're currently on the free plan</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
