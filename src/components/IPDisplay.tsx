import React from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { Public, AccessTime, Router, Wifi } from '@mui/icons-material';
import { IPData } from '../types';
import DecryptedText from './DecryptedText';

interface IPDisplayProps {
  ipData: IPData;
}

const IPDisplay: React.FC<IPDisplayProps> = ({ ipData }) => {
  return (
    <Card 
      elevation={0} 
      sx={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        borderRadius: 4,
        border: '1px solid rgba(255, 255, 255, 0.1)',
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 20px 40px rgba(102, 126, 234, 0.3)',
        }
      }}
    >
      <CardContent sx={{ p: { xs: 3, md: 5 } }}>
        <Typography variant="h6" gutterBottom sx={{ opacity: 0.9, mb: 3 }}>
          Your Current IP Addresses
        </Typography>
        
        {/* IPv4 Section */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Router sx={{ fontSize: 20, opacity: 0.9 }} />
            <Typography variant="subtitle1" sx={{ opacity: 0.9, fontSize: '1rem' }}>
              IPv4
            </Typography>
          </Box>
          <DecryptedText 
            text={ipData.ip}
            delay={300}
            variant="h4"
            component="div" 
            sx={{ 
              fontWeight: 'bold',
              mb: 2,
              letterSpacing: '0.02em',
              fontFamily: 'monospace',
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
              background: 'linear-gradient(45deg, #ffffff 30%, #f0f0f0 90%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              wordBreak: 'break-all',
              lineHeight: 1.2,
            }}
          />
        </Box>

        {/* IPv6 Section */}
        {ipData.ipv6 && (
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Wifi sx={{ fontSize: 20, opacity: 0.9 }} />
              <Typography variant="subtitle1" sx={{ opacity: 0.9, fontSize: '1rem' }}>
                IPv6
              </Typography>
            </Box>
            <DecryptedText 
              text={ipData.ipv6}
              delay={800}
              variant="h6"
              component="div" 
              sx={{ 
                fontWeight: 'medium',
                mb: 2,
                letterSpacing: '0.01em',
                fontFamily: 'monospace',
                fontSize: { xs: '0.9rem', sm: '1rem', md: '1.2rem' },
                opacity: 0.9,
                wordBreak: 'break-all',
                lineHeight: 1.3,
              }}
            />
          </Box>
        )}

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <Chip 
            icon={<Public />} 
            label={ipData.country}
            sx={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              '& .MuiChip-icon': { color: 'white' },
              fontSize: '0.85rem'
            }}
          />
          <Chip 
            icon={<AccessTime />} 
            label={`Detected at ${ipData.time}`}
            sx={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              '& .MuiChip-icon': { color: 'white' },
              fontSize: '0.85rem'
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default IPDisplay;