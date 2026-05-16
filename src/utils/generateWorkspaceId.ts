/**
 * Generates a unique Workspace ID in the format WS-XXXXXX
 * where X is a random uppercase letter or number.
 */
export const generateWorkspaceId = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = 'WS-';
  for (let i = 0; i < 7; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};
