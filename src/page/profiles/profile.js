import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, CircularProgress, Avatar } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get('http://localhost:5000/@me', {
          withCredentials: true,
        });
        if (response.data) {
          setUser(response.data);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  if (loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh"
      >
        <Typography variant="h5">User not found</Typography>
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="50vh"
      bgcolor="#1a1a2e"
      color="white"
      padding={4}
    >
      <Box
        width="100%"
        maxWidth="700px"
        bgcolor="#16213e"
        borderRadius="16px"
        padding={4}
        boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
        position="relative"
      >
        <Avatar
          src={user.image ? `data:image/png;base64,${user.image}` : 'default-image.png' || "/api/placeholder/150/150"}
          alt={user.username}
          sx={{
            width: 120,
            height: 120,
            position: 'absolute',
            top: -60,
            left: '50%',
            transform: 'translateX(-50%)',
            border: '4px solid #16213e',
          }}
        />
        <Box mt={8} textAlign="center">
          <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
            <PersonIcon sx={{ mr: 1 }} />
            <Typography variant="h4" fontWeight="bold">
              {user.username}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" justifyContent="center" mb={1}>
            <EmailIcon sx={{ mr: 1 }} />
            <Typography variant="body1">
              {user.email}
            </Typography>
          </Box>
          <Typography variant="body2" mb={2}>
            Full Name: {user.fullname}
          </Typography>
          <Box display="flex" alignItems="center" justifyContent="center">
            <FavoriteIcon sx={{ mr: 1 }} />
            <Typography variant="body2" fontWeight="bold">
              Favorite Recipes: {user.favorites}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;