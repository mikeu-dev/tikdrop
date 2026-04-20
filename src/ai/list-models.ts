import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';
import fs from 'fs';

const ai = genkit({
  plugins: [googleAI({ apiKey: process.env.GEMINI_API_KEY })],
});

async function listModels() {
  // @ts-ignore
  const models = await ai.registry.listModels();
  fs.writeFileSync('models_list.json', JSON.stringify(models, null, 2));
  console.log('Models list saved to models_list.json');
}

listModels().catch(console.error);
