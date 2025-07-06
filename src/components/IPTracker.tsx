import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Box, CircularProgress, Button, Paper } from '@mui/material';
import { Refresh, NetworkCheck, Favorite } from '@mui/icons-material';
import { IPData, NotificationData } from '../types';
import { fetchIPData } from '../services/ipService';
import { getIPHistory, addToHistory } from '../utils/localStorage';
import IPDisplay from './IPDisplay';
import IPHistory from './IPHistory';
import NotificationSnackbar from './NotificationSnackbar';
import DecryptedText from './DecryptedText';

const IPTracker: React.FC = () => {
  const [currentIP, setCurrentIP] = useState<IPData | null>(null);
  const [history, setHistory] = useState<IPData[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [notification, setNotification] = useState<NotificationData>({
    message: '',
    type: 'success',
    show: false
  });

  const showNotification = (message: string, type: 'success' | 'warning') => {
    setNotification({ message, type, show: true });
  };

  const handleCloseNotification = () => {
    setNotification(prev => ({ ...prev, show: false }));
  };

  const loadIPData = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      }

      const newIPData = await fetchIPData();
      const existingHistory = getIPHistory();
      
      if (currentIP && currentIP.ip !== newIPData.ip) {
        // IP changed
        const updatedHistory = addToHistory(currentIP);
        setHistory(updatedHistory);
        showNotification('IP address changed!', 'success');
      } else if (currentIP && currentIP.ip === newIPData.ip && isRefresh) {
        // IP unchanged on refresh
        showNotification('IP address unchanged', 'warning');
      }

      setCurrentIP(newIPData);
      if (!currentIP) {
        setHistory(existingHistory);
      }
    } catch (error) {
      console.error('Error loading IP data:', error);
      showNotification('Failed to load IP data', 'warning');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadIPData();
  }, []);

  const handleRefresh = () => {
    loadIPData(true);
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            minHeight: '60vh',
            flexDirection: 'column',
            gap: 2
          }}
        >
          <CircularProgress size={60} sx={{ color: 'primary.main' }} />
          <Typography variant="h6" color="text.secondary">
            Loading your IP information...
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)',
    }}>
      <Container maxWidth="lg" sx={{ pt: 4, pb: 6 }}>
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 2 }}>
            <NetworkCheck sx={{ fontSize: { xs: 32, md: 40 }, color: 'primary.main' }} />
            <DecryptedText 
              text="IP Tracker"
              delay={100}
              variant="h3"
              component="h1"
              sx={{ 
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                fontSize: { xs: '2rem', md: '3rem' },
              }}
            />
          </Box>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 3, fontSize: { xs: '1rem', md: '1.25rem' } }}>
            Monitor your public IP addresses and track changes in real-time
          </Typography>
          
          <Button 
            variant="contained" 
            startIcon={<Refresh />}
            onClick={handleRefresh}
            disabled={refreshing}
            sx={{ 
              borderRadius: 3,
              px: 4,
              py: 1.5,
              textTransform: 'none',
              fontSize: '1rem',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            {refreshing ? 'Refreshing...' : 'Refresh IP'}
          </Button>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            {currentIP && <IPDisplay ipData={currentIP} />}
          </Grid>
          
          <Grid item xs={12} md={4}>
            <IPHistory history={history} />
          </Grid>
        </Grid>

        {/* Credits */}
        <Box sx={{ 
          textAlign: 'center', 
          mt: 6, 
          pt: 4, 
          borderTop: '1px solid #333',
        }}>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
              opacity: 0.7,
              fontSize: '0.9rem'
            }}
          >
            Made with 
            <Favorite sx={{ fontSize: 16, color: '#ff6b6b' }} />
            by Gitanshu
          </Typography>
        </Box>

        <NotificationSnackbar 
          notification={notification}
          onClose={handleCloseNotification}
        />
      </Container>
    </Box>
  );
};

export default IPTracker;