import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Box, Chip, Divider } from '@mui/material';
import { History, Public, AccessTime, Router, Wifi } from '@mui/icons-material';
import { IPData } from '../types';
import DecryptedText from './DecryptedText';

interface IPHistoryProps {
  history: IPData[];
}

const IPHistory: React.FC<IPHistoryProps> = ({ history }) => {
  return (
    <Card 
      elevation={0} 
      sx={{ 
        borderRadius: 4, 
        height: 'fit-content',
        backgroundColor: '#1a1a1a',
        border: '1px solid #333',
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <History color="primary" />
          <Typography variant="h6" color="primary">
            IP Change History
          </Typography>
        </Box>
        
        {history.length === 0 ? (
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
            No previous IP addresses recorded yet.
            <br />
            Refresh the page to start tracking changes.
          </Typography>
        ) : (
          <List sx={{ p: 0 }}>
            {history.map((ip, index) => (
              <React.Fragment key={`${ip.ip}-${ip.timestamp}`}>
                <ListItem 
                  sx={{ 
                    px: 0,
                    py: 2,
                    transition: 'background-color 0.2s ease',
                    borderRadius: 2,
                    '&:hover': {
                      backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    }
                  }}
                >
                  <ListItemText
                    primary={
                      <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <Router sx={{ fontSize: 14, color: 'primary.main' }} />
                          <Typography variant="body2" color="primary" sx={{ fontSize: '0.75rem' }}>
                            IPv4
                          </Typography>
                        </Box>
                        <DecryptedText 
                          text={ip.ip}
                          delay={index * 200}
                          variant="body1"
                          sx={{ 
                            fontFamily: 'monospace',
                            fontWeight: 'medium',
                            fontSize: '0.95rem',
                            mb: 1,
                            wordBreak: 'break-all',
                            lineHeight: 1.3,
                          }}
                        />
                        {ip.ipv6 && (
                          <>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                              <Wifi sx={{ fontSize: 14, color: 'secondary.main' }} />
                              <Typography variant="body2" color="secondary" sx={{ fontSize: '0.75rem' }}>
                                IPv6
                              </Typography>
                            </Box>
                            <DecryptedText 
                              text={ip.ipv6}
                              delay={index * 200 + 300}
                              variant="body2"
                              sx={{ 
                                fontFamily: 'monospace',
                                fontSize: '0.8rem',
                                opacity: 0.8,
                                wordBreak: 'break-all',
                                lineHeight: 1.3,
                              }}
                            />
                          </>
                        )}
                      </Box>
                    }
                    secondary={
                      <Box sx={{ display: 'flex', gap: 1, mt: 2, flexWrap: 'wrap' }}>
                        <Chip 
                          icon={<Public />} 
                          label={ip.country}
                          size="small"
                          variant="outlined"
                          sx={{ 
                            fontSize: '0.7rem',
                            borderColor: 'rgba(255, 255, 255, 0.3)',
                            color: 'text.secondary',
                            height: '24px'
                          }}
                        />
                        <Chip 
                          icon={<AccessTime />} 
                          label={ip.time}
                          size="small"
                          variant="outlined"
                          sx={{ 
                            fontSize: '0.7rem',
                            borderColor: 'rgba(255, 255, 255, 0.3)',
                            color: 'text.secondary',
                            height: '24px'
                          }}
                        />
                      </Box>
                    }
                  />
                </ListItem>
                {index < history.length - 1 && (
                  <Divider sx={{ my: 1, opacity: 0.3, borderColor: '#333' }} />
                )}
              </React.Fragment>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );
};

export default IPHistory;