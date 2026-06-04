export const setAuthToken = (username: string, token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('medimind_auth_username', username);
    localStorage.setItem('medimind_auth_token', token);
  }
};

export const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('medimind_auth_token');
  }
  return null;
};

export const getAuthUsername = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('medimind_auth_username');
  }
  return null;
};

export const removeAuthToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('medimind_auth_token');
    localStorage.removeItem('medimind_auth_username');
  }
};

export const registerUser = async (username: string, password: string) => {
  try {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    
    const data = await response.json();
    
    if (response.ok && data.success) {
      setAuthToken(data.user.username, data.token);
      return { success: true };
    } else {
      return { success: false, error: data.error || 'Registration failed' };
    }
  } catch (error) {
    return { success: false, error: 'Network error connecting to server' };
  }
};

export const loginUser = async (username: string, password: string) => {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    
    const data = await response.json();
    
    if (response.ok && data.success) {
      setAuthToken(data.user.username, data.token);
      return { success: true };
    } else {
      return { success: false, error: data.error || 'Login failed' };
    }
  } catch (error) {
    return { success: false, error: 'Network error connecting to server' };
  }
};
