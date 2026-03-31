import { CheckCircle2, XCircle, AlertTriangle, Clock } from 'lucide-react';

const services = [
  { name: 'payment-service', status: 'UP', uptime: '99.9%', latency: '45ms' },
  { name: 'auth-service', status: 'UP', uptime: '99.99%', latency: '12ms' },
  { name: 'user-db', status: 'DOWN', uptime: '95.2%', latency: '-' },
  { name: 'notification-worker', status: 'UP', uptime: '99.5%', latency: '120ms' },
];

const alerts = [
  { id: 1, service: 'user-db', message: 'Connection timeout after 30000ms', time: '2 mins ago', severity: 'critical' },
  { id: 2, service: 'payment-service', message: 'High latency detected (>500ms)', time: '15 mins ago', severity: 'warning' },
  { id: 3, service: 'auth-service', message: 'Rate limit exceeded for IP 192.168.1.100', time: '1 hour ago', severity: 'warning' },
];

export default function Dashboard() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">System Dashboard</h1>
        <p className="text-slate-400">Overview of your services and recent alerts.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {services.map((service) => (
          <div key={service.name} className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-medium text-slate-200">{service.name}</h3>
              {service.status === 'UP' ? (
                <CheckCircle2 className="text-emerald-500" size={20} />
              ) : (
                <XCircle className="text-rose-500" size={20} />
              )}
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Status</span>
                <span className={service.status === 'UP' ? 'text-emerald-400 font-medium' : 'text-rose-400 font-medium'}>
                  {service.status}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Uptime</span>
                <span className="text-slate-300">{service.uptime}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Latency</span>
                <span className="text-slate-300">{service.latency}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <AlertTriangle size={20} className="text-amber-500" />
          Recent Alerts
        </h2>
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <div className="divide-y divide-slate-800/50">
            {alerts.map((alert) => (
              <div key={alert.id} className="p-4 hover:bg-slate-800/50 transition-colors flex items-start gap-4">
                <div className={`mt-1 p-1.5 rounded-full ${
                  alert.severity === 'critical' ? 'bg-rose-500/10 text-rose-500' : 'bg-amber-500/10 text-amber-500'
                }`}>
                  <AlertTriangle size={16} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-medium text-slate-200">{alert.service}</span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Clock size={12} />
                      {alert.time}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400">{alert.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
