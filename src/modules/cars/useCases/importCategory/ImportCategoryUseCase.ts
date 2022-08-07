import fs from "node:fs";
import csvParser from "csv-parser";

import { ICategoryRepository } from "../../repositories/ICategoriesRepository";
import { Logger } from "../../../../shared/logger/index";

interface IFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
  buffer: Buffer;
}

interface IImportCategory {
  name: string;
  description: string;
}

export class ImportCategoryUseCase {
  constructor(private repository: ICategoryRepository) {}

  async execute(file: IFile): Promise<void> {
    const categories = await this.loadCategories(file);

    categories.map(async (category) => {
      const { name, description } = category;

      Logger.info(name, description);

      const alreadyExistCategory = await this.repository.findByName(name);

      if (!alreadyExistCategory) {
        await this.repository.create({ name, description });
      }
    });
  }

  loadCategories(file: IFile): Promise<IImportCategory[]> {
    return new Promise<IImportCategory[]>((resolve, reject) => {
      const stream = fs.createReadStream(file?.path);
      const parserFile = csvParser(["name", "description"]);

      const categories: IImportCategory[] = [];

      stream.pipe(parserFile);

      parserFile
        .on("data", async (row) => {
          const { name, description } = row;

          categories.push({
            name,
            description,
          });
        })
        .on("end", () => {
          fs.unlink(file.path, (err) => {
            reject(err);
          });
          resolve(categories);
        })
        .on("error", (error) => {
          reject(error);
        });
    });
  }
}
