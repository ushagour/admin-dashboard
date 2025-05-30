import { Button, TextField, Paper, Typography } from '@mui/material';

export default function Login() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      backgroundColor: '#f3f4f6' 
    }}>
      <Paper elevation={3} sx={{ p: 4, width: 300 }}>
        <Typography variant="h5" gutterBottom>Admin Login</Typography>
        <TextField 
          label="Username" 
          fullWidth 
          margin="normal" 
        />
        <TextField 
          label="Password" 
          type="password" 
          fullWidth 
          margin="normal" 
        />
        <Button 
          variant="contained" 
          fullWidth 
          sx={{ mt: 2 }}
        >
          Login
        </Button>
      </Paper>
    </div>
  );
}