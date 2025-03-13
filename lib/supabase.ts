import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/supabase'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

console.log("Supabase URL:", supabaseUrl);
console.log("Supabase Key length:", supabaseAnonKey.length);

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Test function to verify Supabase connection and table setup
export async function testSupabaseConnection() {
  try {
    console.log("Testing Supabase connection...");
    
    // First, try to get the table info
    const { data: tableInfo, error: tableError } = await supabase
      .from('notification_subscriptions')
      .select('*')
      .limit(1);

    if (tableError) {
      console.error('Table check error:', tableError);
      if (tableError.code === '42P01') {
        console.error('Table does not exist. Please run the SQL migration first.');
        return false;
      }
      return false;
    }

    // Test inserting a record
    const { data, error } = await supabase
      .from('notification_subscriptions')
      .insert({
        endpoint: 'test-endpoint',
        p256dh: 'test-p256dh',
        auth: 'test-auth',
        user_agent: 'test-user-agent'
      })
      .select()

    if (error) {
      console.error('Supabase connection error:', error.message)
      return false
    }

    console.log("Test record inserted successfully:", data);

    // Clean up test record
    const { error: deleteError } = await supabase
      .from('notification_subscriptions')
      .delete()
      .eq('endpoint', 'test-endpoint')

    if (deleteError) {
      console.error('Error deleting test record:', deleteError);
    } else {
      console.log("Test record deleted successfully");
    }

    console.log('Supabase connection and table setup successful!')
    return true
  } catch (error) {
    console.error('Supabase connection error:', error)
    return false
  }
}

// Function to save notification subscription
export async function saveNotificationSubscription(
  subscription: PushSubscription,
  userAgent: string
) {
  try {
    console.log("Preparing subscription data...");
    const subscriptionData = {
      endpoint: subscription.endpoint,
      p256dh: btoa(String.fromCharCode.apply(null, 
        new Uint8Array(subscription.getKey('p256dh') as ArrayBuffer) as unknown as number[]
      )),
      auth: btoa(String.fromCharCode.apply(null, 
        new Uint8Array(subscription.getKey('auth') as ArrayBuffer) as unknown as number[]
      )),
      user_agent: userAgent,
      last_active: new Date().toISOString()
    }

    console.log("Subscription data prepared:", {
      endpoint: subscriptionData.endpoint,
      user_agent: subscriptionData.user_agent,
      last_active: subscriptionData.last_active
    });

    console.log("Attempting to save to Supabase...");
    const { data, error } = await supabase
      .from('notification_subscriptions')
      .upsert(subscriptionData, {
        onConflict: 'endpoint'
      })
      .select()

    if (error) {
      console.error('Error saving subscription:', error)
      return null
    }

    console.log("Subscription saved successfully:", data);
    return data[0]
  } catch (error) {
    console.error('Error saving subscription:', error)
    return null
  }
}

// Function to get all active subscriptions
export async function getActiveSubscriptions() {
  try {
    console.log("Fetching active subscriptions...");
    const { data, error } = await supabase
      .from('notification_subscriptions')
      .select('*')
      .order('last_active', { ascending: false })

    if (error) {
      console.error('Error getting subscriptions:', error)
      return []
    }

    console.log("Active subscriptions retrieved:", data);
    return data
  } catch (error) {
    console.error('Error getting subscriptions:', error)
    return []
  }
} 