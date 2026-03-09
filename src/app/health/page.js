// Simple health check page - shows server status
export const dynamic = 'force-dynamic';

export default async function HealthPage() {
  let healthData = null;
  let error = null;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/health`, {
      cache: 'no-store',
    });
    healthData = await res.json();
  } catch (err) {
    error = err.message;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Server Health Check</h1>
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-700 dark:text-red-300 font-semibold">Error fetching health data:</p>
            <p className="text-red-600 dark:text-red-400 text-sm mt-2">{error}</p>
          </div>
        )}

        {healthData && (
          <div className="space-y-4">
            <div className={`p-4 rounded-lg ${healthData.status === 'ok' ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'}`}>
              <p className="text-lg font-semibold">
                Overall Status: <span className={healthData.status === 'ok' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>{healthData.status.toUpperCase()}</span>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Timestamp: {healthData.timestamp}</p>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
              <h2 className="font-semibold text-gray-800 dark:text-white mb-3">Environment Variables</h2>
              <div className="space-y-2 text-sm">
                {Object.entries(healthData.env).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">{key}:</span>
                    <span className={value ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                      {value ? '✓ Set' : '✗ Missing'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
              <h2 className="font-semibold text-gray-800 dark:text-white mb-3">MongoDB Connection</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Connected:</span>
                  <span className={healthData.mongodb.connected ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                    {healthData.mongodb.connected ? '✓ Yes' : '✗ No'}
                  </span>
                </div>
                {healthData.mongodb.error && (
                  <div className="mt-2 p-2 bg-red-100 dark:bg-red-900/30 rounded">
                    <p className="text-red-700 dark:text-red-300 font-semibold">Error:</p>
                    <p className="text-red-600 dark:text-red-400 text-xs mt-1">{healthData.mongodb.error}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <a href="/" className="flex-1 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-center rounded-lg font-medium transition">
                Go Home
              </a>
              <button onClick={() => window.location.reload()} className="flex-1 px-6 py-3 bg-gray-200 dark:bg-slate-600 hover:bg-gray-300 dark:hover:bg-slate-500 text-gray-800 dark:text-white text-center rounded-lg font-medium transition">
                Refresh
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
