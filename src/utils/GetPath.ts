import { resolve } from 'path';
import fs from 'fs';
import util from 'util';

export async function GetTemplates(templatesName: string) {
  const templatePath = resolve(__dirname, '..', 'templates', `${templatesName}.html`);
  const readPromise = util.promisify(fs.readFile)
  const template = await readPromise(templatePath, 'utf8')
  return template;
}
