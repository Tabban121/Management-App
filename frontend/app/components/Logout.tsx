// logout.ts
import apiClient from '@/lib/apiClient';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const handleLogout = async () => {
  const token = localStorage.getItem('authToken');

  if (!token) {
    toast.info('You are already logged out.');
    return;
  }

  try {
    
    const response = await apiClient.post('/auth/logout', {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response.data);

    // ✅ Clear token after successful logout
    localStorage.removeItem('authToken');
    toast.success('Logout successful!');
  } catch (err: unknown) {
    if (err && typeof err === 'object' && 'response' in err) {
      const axiosError = err as any;
      const message = axiosError.response?.data?.message || 'Something went wrong!';
      toast.error(`Error: ${message}`);
    } else {
      toast.error('An unexpected error occurred. Please try again.');
    }
    console.error(err);
  }
};

export default handleLogout;
