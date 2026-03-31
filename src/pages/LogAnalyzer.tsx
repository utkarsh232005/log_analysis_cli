import { useState } from 'react';
import { Search, Terminal, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

// Call the real backend API
const analyzeLog = async (logText: string) => {
  const response = await fetch('/analyze', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ log: logText }),
  });

  if (!response.ok) {
    throw new Error('Failed to analyze log');
  }

  const data = await response.json();
  
  // Map root_cause from API to cause for the UI
  return {
    ...data,
    cause: data.root_cause
  };
};

export default function LogAnalyzer() {
  const [logText, setLogText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!logText.trim()) return;
    
    setIsAnalyzing(true);
    setResult(null);
    
    try {
      const prediction = await analyzeLog(logText);
      setResult(prediction);
    } catch (error) {
      console.error("Failed to analyze log", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto h-full flex flex-col">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Log Analyzer</h1>
        <p className="text-slate-400">Paste your error logs below to automatically identify the root cause and affected service.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1">
        <div className="lg:col-span-2 flex flex-col">
          <div className="bg-slate-900 border border-slate-800 rounded-xl flex flex-col flex-1 overflow-hidden shadow-sm">
            <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center gap-2">
              <Terminal size={18} className="text-slate-500" />
              <span className="text-sm font-medium text-slate-300 font-mono">system.log</span>
            </div>
            <textarea
              value={logText}
              onChange={(e) => setLogText(e.target.value)}
              placeholder="Paste your stack trace or error log here..."
              className="flex-1 w-full bg-transparent text-slate-300 p-4 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !logText.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-800 disabled:text-slate-500 text-white px-6 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-colors"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Search size={18} />
                  Analyze Log
                </>
              )}
            </button>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 h-full shadow-sm">
            <h3 className="text-lg font-semibold text-white mb-6 border-b border-slate-800 pb-4">Analysis Result</h3>
            
            {!result && !isAnalyzing && (
              <div className="text-center text-slate-500 py-12 flex flex-col items-center">
                <Search size={48} className="mb-4 opacity-20" />
                <p>Paste a log and click analyze to see predictions.</p>
              </div>
            )}

            {isAnalyzing && (
              <div className="py-12 flex flex-col items-center justify-center space-y-4">
                <div className="relative">
                  <div className="w-12 h-12 border-4 border-slate-800 rounded-full"></div>
                  <div className="w-12 h-12 border-4 border-blue-500 rounded-full border-t-transparent animate-spin absolute top-0 left-0"></div>
                </div>
                <p className="text-slate-400 animate-pulse">Processing log data...</p>
              </div>
            )}

            {result && !isAnalyzing && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="p-4 bg-blue-950/30 border border-blue-900/50 rounded-lg">
                  <div className="text-sm text-blue-400 mb-1">Affected Service</div>
                  <div className="text-xl font-mono font-semibold text-blue-100 flex items-center gap-2">
                    {result.service}
                  </div>
                </div>

                <div className="p-4 bg-rose-950/30 border border-rose-900/50 rounded-lg">
                  <div className="text-sm text-rose-400 mb-1">Root Cause</div>
                  <div className="text-xl font-mono font-semibold text-rose-100 flex items-center gap-2">
                    <AlertCircle size={20} className="text-rose-500" />
                    {result.cause}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-sm text-slate-400">Confidence Score</span>
                    <span className="text-sm font-medium text-emerald-400">{result.confidence}%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2">
                    <div 
                      className="bg-emerald-500 h-2 rounded-full" 
                      style={{ width: `${result.confidence}%` }}
                    ></div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800">
                  <h4 className="text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-500" />
                    Recommendation
                  </h4>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {result.recommendation}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
