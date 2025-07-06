import React from 'react';
import { Snackbar, Alert, Slide, SlideProps } from '@mui/material';
import { NotificationData } from '../types';

interface NotificationSnackbarProps {
  notification: NotificationData;
  onClose: () => void;
}

const SlideTransition = (props: SlideProps) => {
  return <Slide {...props} direction="up" />;
};

const NotificationSnackbar: React.FC<NotificationSnackbarProps> = ({ notification, onClose }) => {
  return (
    <Snackbar
      open={notification.show}
      autoHideDuration={4000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      TransitionComponent={SlideTransition}
    >
      <Alert 
        onClose={onClose} 
        severity={notification.type}
        variant="filled"
        sx={{ 
          width: '100%',
          borderRadius: 2,
          '& .MuiAlert-icon': {
            fontSize: '1.5rem',
          }
        }}
      >
        {notification.message}
      </Alert>
    </Snackbar>
  );
};

export default NotificationSnackbar;