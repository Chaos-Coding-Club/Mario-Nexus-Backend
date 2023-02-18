import { Controller, Get, StreamableFile } from "@nestjs/common";
import { createReadStream } from "fs";
import { join } from "path";
import { Public } from "src/utils/constants";

@Controller("download")
export class DownloadController {
  @Public()
  @Get("getDesktopApp")
  getDesktopApp(): StreamableFile {
    const file = createReadStream(join(process.cwd(), "package.json"));
    return new StreamableFile(file);
  }

  @Get("getModelCsv")
  getModelCsv(): StreamableFile {
    const file = createReadStream(join(process.cwd(), "package.json"));
    return new StreamableFile(file);
  }
}
