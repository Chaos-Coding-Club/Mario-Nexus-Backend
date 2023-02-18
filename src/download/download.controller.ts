import { Controller, Get, Header, StreamableFile } from "@nestjs/common";
import { createReadStream } from "fs";
import { join } from "path";
import { Public } from "src/utils/constants";

@Controller("download")
export class DownloadController {
  @Public()
  @Get("getDesktopApp")
  @Header("Content-Type", "application/msix")
  @Header("Content-Disposition", 'attachment; filename="mario_nexus.msix"')
  getDesktopApp(): StreamableFile {
    const file = createReadStream(
      join(process.cwd(), "src/bin/mario_nexus.msix"),
    );
    return new StreamableFile(file);
  }

  @Get("getModelScript")
  getModelScript(): StreamableFile {
    const file = createReadStream(join(process.cwd(), "src/scripts/script.py"));
    return new StreamableFile(file);
  }
}
