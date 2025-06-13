import { useEffect, useState } from "react";
import { getDbProfiles, setDbProfile, getActiveDbProfile } from "@/lib/api/db_profiles";

// DBProfileSelector component for settings module
export default function DBProfileSelector() {
  const [profiles, setProfiles] = useState<{ name: string; display_name: string }[]>([]);
  const [active, setActive] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    getDbProfiles().then((data) => {
      if (Array.isArray(data)) setProfiles(data);
    });
    getActiveDbProfile().then((res) => {
      if (res && res.active_profile) setActive(res.active_profile);
    });
  }, []);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const profile = e.target.value;
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await setDbProfile(profile);
      setActive(profile);
      setSuccess("DB profile updated!");
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <select
        className="w-full p-2 rounded border"
        value={active}
        onChange={handleChange}
        disabled={loading}
      >
        <option value="">Select DB Profile</option>
        {profiles.map((profile) => (
          <option key={profile.name} value={profile.name}>
            {profile.display_name}
          </option>
        ))}
      </select>
      {success && <div className="text-green-600 text-sm mt-1">{success}</div>}
      {error && <div className="text-red-600 text-sm mt-1">{error}</div>}
      {active && (
        <div className="text-xs text-gray-500 mt-1">Active: {profiles.find(p => p.name === active)?.display_name || active}</div>
      )}
    </div>
  );
}
