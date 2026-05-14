// FR-5: Sync status indicator and manual sync button
// Shows last sync time, status dot, and "Sync Now" button

interface SyncStatusProps {
  lastSyncedAt: string | null | undefined;
  syncStatus: string | undefined;
  syncError: string | null | undefined;
  onSync: () => void;
}

export default function SyncStatus({
  lastSyncedAt,
  syncStatus,
  syncError,
  onSync,
}: SyncStatusProps) {
  const getStatusColor = () => {
    if (syncStatus === 'error') return 'bg-red-500';
    if (syncStatus === 'syncing') return 'bg-yellow-500';
    if (!lastSyncedAt) return 'bg-gray-400';

    const syncTime = new Date(lastSyncedAt).getTime();
    const now = Date.now();
    const minutesSinceSync = (now - syncTime) / (1000 * 60);

    if (minutesSinceSync > 10) return 'bg-yellow-500'; // Stale
    return 'bg-green-500'; // Fresh
  };

  const getTimeAgo = (dateString: string | null | undefined) => {
    if (!dateString) return 'Never';

    const syncTime = new Date(dateString).getTime();
    const now = Date.now();
    const seconds = Math.floor((now - syncTime) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  return (
    <div className="flex items-center gap-4 mt-2">
      <div className="flex items-center gap-2">
        <span
          className={`inline-block w-2 h-2 rounded-full ${getStatusColor()}`}
          aria-label={`Status: ${syncStatus || 'unknown'}`}
        />
        <span className="text-sm text-gray-600">
          Last synced: {getTimeAgo(lastSyncedAt)}
        </span>
      </div>

      {syncError && (
        <div role="alert" className="text-sm text-red-600">
          ⚠️ {syncError}
        </div>
      )}

      <button
        onClick={onSync}
        disabled={syncStatus === 'syncing'}
        className="text-sm text-blue-600 hover:text-blue-800 disabled:text-gray-400 disabled:cursor-not-allowed min-h-[44px] min-w-[44px] px-3 py-2"
      >
        {syncStatus === 'syncing' ? 'Syncing...' : 'Sync Now'}
      </button>
    </div>
  );
}
