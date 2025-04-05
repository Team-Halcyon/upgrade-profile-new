'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function AuthCallbackPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    // After OAuth redirect
    const handleOAuthCallback = async () => {
      try {
        // Get the session to verify the user was authenticated successfully
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Authentication error:', error.message);
          router.push('/login?error=Authentication failed');
          return;
        }

        if (!session) {
          console.error('No session found');
          router.push('/login?error=No session found');
          return;
        }

        console.log('Authentication successful');
        
        // The Supabase client automatically handles the OAuth callback
        // Just redirect to the dashboard after a short delay
        setTimeout(() => {
          router.push('/dashboard');
        }, 1000);
      } catch (error) {
        console.error('Authentication callback error:', error);
        router.push('/login?error=Callback processing failed');
      }
    };

    handleOAuthCallback();
  }, [router, supabase]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-xl font-semibold">Logging you in...</h1>
        <p className="text-sm text-gray-500 mt-2">You'll be redirected shortly</p>
      </div>
    </div>
  );
}