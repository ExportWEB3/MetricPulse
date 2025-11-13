export const validateEmail = (email: string): { isValid: boolean; error?: string } => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    return { isValid: false, error: 'Email is required' };
  }

  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Invalid email format' };
  }

  return { isValid: true };
};

export const validatePassword = (password: string): { isValid: boolean; error?: string } => {
  if (!password) {
    return { isValid: false, error: 'Password is required' };
  }

  if (password.length < 6) {
    return { isValid: false, error: 'Password must be at least 6 characters long' };
  }

  return { isValid: true };
};

export const validateMetricsData = (data: any) => {
  const required = ['date', 'mrr', 'users', 'churn', 'newUsers', 'revenue'];

  for (const field of required) {
    if (data[field] === undefined || data[field] === null) {
      return { isValid: false, error: `Missing required field: ${field}` };
    }
  }

  if (isNaN(new Date(data.date).getTime())) {
    return { isValid: false, error: 'Invalid date format' };
  }

  if (data.mrr < 0 || data.users < 0 || data.churn < 0 || data.newUsers < 0 || data.revenue < 0) {
    return { isValid: false, error: 'Negative values are not allowed' };
  }

  if (data.churn > 100) {
    return { isValid: false, error: 'Churn rate cannot exceed 100%' };
  }

  return { isValid: true };
};
