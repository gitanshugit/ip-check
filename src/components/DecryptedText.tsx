import React, { useState, useEffect } from 'react';
import { Typography, TypographyProps } from '@mui/material';

interface DecryptedTextProps extends Omit<TypographyProps, 'children'> {
  text: string;
  delay?: number;
  duration?: number;
}

const DecryptedText: React.FC<DecryptedTextProps> = ({ 
  text, 
  delay = 0, 
  duration = 2000,
  ...typographyProps 
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isDecrypting, setIsDecrypting] = useState(false);

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDecrypting(true);
      let iteration = 0;
      
      const interval = setInterval(() => {
        setDisplayText(prevText => 
          text
            .split('')
            .map((char, index) => {
              if (index < iteration) {
                return text[index];
              }
              if (char === ' ') return ' ';
              return characters[Math.floor(Math.random() * characters.length)];
            })
            .join('')
        );

        if (iteration >= text.length) {
          clearInterval(interval);
          setIsDecrypting(false);
          setDisplayText(text);
        }

        iteration += 1 / 3;
      }, 30);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [text, delay, duration]);

  return (
    <Typography 
      {...typographyProps}
      sx={{
        ...typographyProps.sx,
        transition: 'all 0.3s ease',
        filter: isDecrypting ? 'blur(0.5px)' : 'none',
      }}
    >
      {displayText || text}
    </Typography>
  );
};

export default DecryptedText;