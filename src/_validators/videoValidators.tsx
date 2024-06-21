export const validateUserId = (user_id: string): boolean => {
  return /^[a-z0-9_]+$/.test(user_id);
};

export const validateStringNotEmpty = (value: string): boolean => {
  return value.trim().length > 0;
};

export const validateUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};