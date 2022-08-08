import fs from "node:fs";
import csvParser from "csv-parser";
import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import { AppError } from "../../../../errors/AppError";
import { deleteFile } from "../../../../utils/file";

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

@injectable()
export class ImportCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private repository: ICategoriesRepository
  ) {}

  async execute(file: IFile): Promise<void> {
    const categories = await this.loadCategories(file);

    categories.map(async (category) => {
      const { name, description } = category;

      const alreadyExistCategory = await this.repository.findByName(name);

      if (!alreadyExistCategory) {
        await this.repository.create({ name, description });
      }
    });
  }

  async loadCategories(file: IFile): Promise<IImportCategory[]> {
    if (file?.mimetype !== "text/csv") {
      await deleteFile(file.path);

      throw new AppError("File type is invalid!", 400);
    }

    return new Promise<IImportCategory[]>((resolve, reject) => {
      const stream = fs.createReadStream(file?.path);
      const parserFile = csvParser(["name", "description"]);

      const categories: IImportCategory[] = [];

      stream.pipe(parserFile);

      parserFile
        .on("data", async (row) => {
          const { name, description } = row;

          if (name && description) {
            categories.push({
              name,
              description,
            });
          }
        })
        .on("end", async () => {
          await deleteFile(file.path);
          resolve(categories);
        })
        .on("error", (error) => {
          reject(error);
        });
    });
  }
}
