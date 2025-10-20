import { Redis } from "@upstash/redis";
import dotenv from "dotenv";

dotenv.config();

async function testWithTimeout() {
  console.log('Testing Cape Town database from Ethiopia...');
  
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
    timeout: 10000, // 10 second timeout
  });

  try {
    console.log('Attempting connection...');
    const start = Date.now();
    const result = await redis.ping();
    const end = Date.now();
    
    console.log(`✅ SUCCESS! Response time: ${end - start}ms`);
    console.log('Ping response:', result);
  } catch (error) {
    console.log('❌ FAILED!');
    console.log('Error:', error.message);
    
    if (error.message.includes('timeout') || error.message.includes('Network')) {
      console.log('🔧 This looks like a network/region connectivity issue');
    } else if (error.message.includes('WRONGPASS')) {
      console.log('🔧 This is an authentication issue - wrong credentials');
    }
  }
}

testWithTimeout();