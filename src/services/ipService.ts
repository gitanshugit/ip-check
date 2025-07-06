import { IPData } from '../types';

export const fetchIPData = async (): Promise<IPData> => {
  try {
    // Fetch IPv4 data
    const ipv4Response = await fetch('https://ipapi.co/json/');
    const ipv4Data = await ipv4Response.json();
    
    // Fetch IPv6 data
    let ipv6 = null;
    try {
      const ipv6Response = await fetch('https://api64.ipify.org?format=json');
      const ipv6Data = await ipv6Response.json();
      if (ipv6Data.ip && ipv6Data.ip.includes(':')) {
        ipv6 = ipv6Data.ip;
      }
    } catch (error) {
      console.log('IPv6 not available');
    }
    
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
    
    return {
      ip: ipv4Data.ip,
      ipv6: ipv6,
      country: ipv4Data.country_name || 'Unknown',
      timestamp: now.toISOString(),
      time
    };
  } catch (error) {
    console.error('Error fetching IP data:', error);
    throw new Error('Failed to fetch IP data');
  }
};