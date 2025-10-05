import { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabase';

interface ProfileSettingsProps {
  userId: string;
  onProfileUpdate?: () => void;
}

export default function ProfileSettings({ userId, onProfileUpdate }: ProfileSettingsProps) {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadProfile();
  }, [userId]);

  const loadProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', userId)
        .maybeSingle();

      if (error) throw error;
      if (data) {
        setUsername(data.username);
      } else {
        // No profile exists yet, leave username empty so user can set it
        setUsername('');
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      // Set empty username on error so user can create profile
      setUsername('');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      // Use upsert to create profile if it doesn't exist, or update if it does
      const { error } = await supabase
        .from('profiles')
        .upsert({ 
          id: userId,
          username: username.trim() 
        }, {
          onConflict: 'id'
        });

      if (error) throw error;

      setMessage({ type: 'success', text: 'Username updated successfully!' });
      
      // Refresh the gym data to show the new username
      if (onProfileUpdate) {
        await onProfileUpdate();
      }
    } catch (error: any) {
      console.error('Error updating profile:', error);
      setMessage({
        type: 'error',
        text: error.message || 'Failed to update username. It might already be taken.',
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="profile-settings">
      <h2>Profile Settings</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            minLength={3}
            maxLength={30}
            required
            disabled={saving}
          />
          <small>3-30 characters. This is what others will see in the gym graph.</small>
        </div>

        {message && (
          <div className={`message message-${message.type}`}>
            {message.text}
          </div>
        )}

        <button type="submit" disabled={saving}>
          {saving ? 'Saving...' : 'Save Username'}
        </button>
      </form>

      <style jsx>{`
        .profile-settings {
          max-width: 500px;
          margin: 32px 0;
          padding: 24px;
          background: var(--sand-2);
          border-radius: 12px;
          border: 1px solid var(--sand-4);
        }

        h2 {
          margin-bottom: 24px;
          color: var(--sand-12);
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 16px;
        }

        label {
          font-weight: 500;
          color: var(--sub-text-color);
        }

        input {
          padding: 10px 12px;
          border: 1px solid var(--sand-6);
          border-radius: 6px;
          font-size: 14px;
          background: var(--sand-1);
          color: var(--sand-12);
        }

        input:focus {
          outline: none;
          border-color: var(--gym-person1);
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        input:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        small {
          font-size: 12px;
          color: var(--sub-text-color);
        }

        .message {
          padding: 12px;
          border-radius: 6px;
          margin-bottom: 16px;
          font-size: 14px;
        }

        .message-success {
          background: rgba(34, 197, 94, 0.1);
          color: rgb(34, 197, 94);
          border: 1px solid rgba(34, 197, 94, 0.3);
        }

        .message-error {
          background: rgba(239, 68, 68, 0.1);
          color: rgb(239, 68, 68);
          border: 1px solid rgba(239, 68, 68, 0.3);
        }

        button {
          padding: 12px 24px;
          background: var(--sand-12);
          color: var(--sand-1);
          border: none;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 200ms ease;
        }

        button:hover:not(:disabled) {
          background: var(--sand-11);
          transform: translateY(-1px);
        }

        button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}
