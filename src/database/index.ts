
// Database entry point that exports all data
export * from './states';
export * from './food';
export * from './festivals';
export * from './culture';

// Export additional utility functions if needed
export const getDataById = <T extends { id: number }>(collection: T[], id: number): T | undefined => {
  return collection.find(item => item.id === id);
};

export const getDataByPath = <T extends { path?: string }>(collection: T[], path: string): T | undefined => {
  return collection.find(item => item.path === path);
};
