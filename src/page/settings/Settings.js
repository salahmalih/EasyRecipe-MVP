import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, TextField, Button, Avatar, IconButton, Divider } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Settings = () => {
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  // State for password change
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // State for changing email and fullname
  const [newEmail, setNewEmail] = useState('');
  const [newFullname, setNewFullname] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [showVerifyPassword, setShowVerifyPassword] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/@me', {
          withCredentials: true,
        });
        if (response.data) {
          setUser(response.data);
          setImagePreview(`data:image/png;base64,${response.data.image}`);
          setNewEmail(response.data.email);
          setNewFullname(response.data.fullname);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChangePassword = async (event) => {
    event.preventDefault();
    
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match.");
      return;
    }
  
    try {
      // Verify the old password
      const verifyResponse = await axios.post(`http://localhost:5000/users/${user.user_id}/verify-password`, {
        password: oldPassword,
      }, {
        withCredentials: true,
      });
  
      if (verifyResponse.data.valid) {
        // Update the password
        await axios.put(`http://localhost:5000/users/${user.user_id}`, {
          password: newPassword,
        }, {
          withCredentials: true,
        });
        alert("Password updated successfully.");
        // Optionally reset the fields after success
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        alert("Old password is incorrect.");
      }
    } catch (error) {
      console.error('Error changing password:', error);
      alert("An error occurred while changing the password.");
    }
  };

  const handleUpdateUser = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`http://localhost:5000/users/${user.user_id}/verify-password`, {
        password: verifyPassword,
      }, {
        withCredentials: true,
      });

      if (response.data.valid) {
        const formData = new FormData();
        formData.append('fullname', newFullname);
        formData.append('email', newEmail);
        if (image) {
          formData.append('image', image);
        }

        await axios.put(`http://localhost:5000/users/${user.user_id}`, formData, {
          withCredentials: true,
        });
        alert("User updated successfully.");
      } else {
        alert("Password is incorrect.");
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  if (!user) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#1a1a2e',
        color: 'white',
        padding: 4,
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '500px',
          backgroundColor: '#16213e',
          borderRadius: '16px',
          padding: 4,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4}>
          Account Settings
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <Avatar src={imagePreview} sx={{ width: 120, height: 120 }} />
        </Box>
        <Button
          variant="outlined"
          component="label"
          sx={{ 
            width: '100%', 
            mb: 4, 
            color: 'white', 
            borderColor: 'white',
            '&:hover': {
              borderColor: 'white',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
            },
          }}
        >
          Change Profile Picture
          <input type="file" hidden onChange={handleImageChange} accept="image/*" />
        </Button>

        <TextField
          label="Full Name"
          value={newFullname}
          onChange={(e) => setNewFullname(e.target.value)}
          fullWidth
          margin="normal"
          sx={{ 
            mb: 2, 
            input: { color: 'white' }, 
            '& label': { color: 'white' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'white',
              },
              '&:hover fieldset': {
                borderColor: 'white',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'white',
              },
            },
          }}
        />
        <TextField
          label="Email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          fullWidth
          margin="normal"
          sx={{ 
            mb: 2, 
            input: { color: 'white' }, 
            '& label': { color: 'white' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'white',
              },
              '&:hover fieldset': {
                borderColor: 'white',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'white',
              },
            },
          }}
        />
        <TextField
          label="Verify Password"
          type={showVerifyPassword ? 'text' : 'password'}
          value={verifyPassword}
          onChange={(e) => setVerifyPassword(e.target.value)}
          fullWidth
          margin="normal"
          sx={{ 
            mb: 2, 
            input: { color: 'white' }, 
            '& label': { color: 'white' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'white',
              },
              '&:hover fieldset': {
                borderColor: 'white',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'white',
              },
            },
          }}
          InputProps={{
            endAdornment: (
              <IconButton
                onClick={() => setShowVerifyPassword(!showVerifyPassword)}
                edge="end"
                sx={{ color: 'white' }}
              >
                {showVerifyPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            ),
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpdateUser}
          sx={{ 
            width: '100%', 
            mt: 2, 
            mb: 4,
            color: 'white',
            backgroundColor: '#0d47a1',
            '&:hover': {
              backgroundColor: '#1565c0',
            },
          }}
        >
          Update Profile
        </Button>

        <Divider sx={{ my: 4, backgroundColor: 'white' }} />

        <Button
          variant="outlined"
          color="primary"
          onClick={() => setShowChangePassword(!showChangePassword)}
          sx={{ 
            width: '100%', 
            mb: 2,
            color: 'white',
            borderColor: 'white',
            '&:hover': {
              borderColor: 'white',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
            },
          }}
        >
          {showChangePassword ? 'Hide Change Password' : 'Change Password'}
        </Button>
        {showChangePassword && (
          <Box sx={{ mt: 2 }}>
            <TextField
              label="Old Password"
              type={showOldPassword ? 'text' : 'password'}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              fullWidth
              margin="normal"
              sx={{ 
                mb: 2, 
                input: { color: 'white' }, 
                '& label': { color: 'white' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'white',
                  },
                  '&:hover fieldset': {
                    borderColor: 'white',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'white',
                  },
                },
              }}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => setShowOldPassword(!showOldPassword)}
                    edge="end"
                    sx={{ color: 'white' }}
                  >
                    {showOldPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
            <TextField
              label="New Password"
              type={showNewPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              fullWidth
              margin="normal"
              sx={{ 
                mb: 2, 
                input: { color: 'white' }, 
                '& label': { color: 'white' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'white',
                  },
                  '&:hover fieldset': {
                    borderColor: 'white',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'white',
                  },
                },
              }}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    edge="end"
                    sx={{ color: 'white' }}
                  >
                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
            <TextField
              label="Confirm New Password"
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              fullWidth
              margin="normal"
              sx={{ 
                mb: 2, 
                input: { color: 'white' }, 
                '& label': { color: 'white' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'white',
                  },
                  '&:hover fieldset': {
                    borderColor: 'white',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'white',
                  },
                },
              }}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                    sx={{ color: 'white' }}
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleChangePassword}
              sx={{ 
                width: '100%', 
                mt: 2,
                color: 'white',
                backgroundColor: '#0d47a1',
                '&:hover': {
                  backgroundColor: '#1565c0',
                },
              }}
            >
              Submit New Password
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Settings;