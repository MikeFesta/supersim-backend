import fs from 'fs/promises';
import path from 'path';
import { pathToFileURL } from 'url';
import { Model } from '@sequelize/core';

// The model registry
const models: Record<string, any> = {};

/**
 * Automatically discover and initialize models in subdirectories.
 * Compatible with Node v24 + ESM + Docker.
 */
export const initModels = async () => {
  // 1. Get the current directory (Node 20.11+ / v24 native support)
  const rootDir = import.meta.dirname;

  console.log(`[SuperSIM] Initializing models from: ${rootDir}`);

  try {
    // 2. Read the root models directory
    const entries = await fs.readdir(rootDir, { withFileTypes: true });

    for (const entry of entries) {
      // Only process subdirectories (ignoring index.ts and hidden folders)
      if (entry.isDirectory() && !entry.name.startsWith('.')) {
        // In Node v24, use parentPath + name for robustness
        const folderPath = path.join(entry.parentPath, entry.name);

        console.log(`[SuperSIM] Scanning domain folder: ${entry.name}`);
        const files = await fs.readdir(folderPath);

        for (const file of files) {
          if (file.endsWith('.ts') || file.endsWith('.js')) {
            const filePath = path.join(folderPath, file);

            // Dynamic import requires a file:/// URL on many Linux/Docker setups
            const fileUrl = pathToFileURL(filePath).href;
            const module = await import(fileUrl);

            // Find the export that is a Sequelize Model
            const modelClass = Object.values(module).find(
              val => typeof val === 'function' && val.prototype instanceof Model,
            ) as any;

            if (modelClass?.name) {
              models[modelClass.name] = modelClass;
              console.log(`[SuperSIM] Registered Model: ${modelClass.name}`);
            }
          }
        }
      }
    }

    // 3. Trigger associations once all models are loaded in memory
    const modelInstances = Object.values(models);
    for (const model of modelInstances) {
      if (typeof model.associate === 'function') {
        // We await in case your associate uses 'await import()'
        await model.associate();
      }
    }

    console.log(`[SuperSIM] Successfully associated ${modelInstances.length} models.`);
  } catch (error) {
    console.error('[SuperSIM] Critical error during model initialization:', error);
    throw error;
  }
};

// Export for use in controllers: import { models } from '#models';
export { models };
