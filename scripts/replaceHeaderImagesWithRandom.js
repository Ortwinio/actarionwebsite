// scripts/replaceHeaderImagesWithRandom.js
// One-time script to replace old header image paths with random role/usecase images

const fs = require("fs");
const path = require("path");

// Adjust this if needed, but for a standard Next.js setup this is correct:
const projectRoot = path.resolve(__dirname, "..");
const publicDir = path.join(projectRoot, "public");
const rolesDir = path.join(publicDir, "images", "roles");
const usecasesDir = path.join(publicDir, "images", "usecases");

// Directories to scan for content that may reference header images
const TARGET_DIRS = ["pages", "src", "components", "content", "data"];

const FILE_EXTENSIONS = [".ts", ".tsx", ".js", ".jsx", ".md", ".mdx", ".json"];

// Collect all candidate header images from roles + usecases folders
function getHeaderImagePaths() {
  const headerImagePaths = [];

  if (fs.existsSync(rolesDir)) {
    const roleFiles = fs.readdirSync(rolesDir);
    roleFiles.forEach((file) => {
      const ext = path.extname(file).toLowerCase();
      if ([".png", ".jpg", ".jpeg", ".webp"].includes(ext)) {
        headerImagePaths.push(`/images/roles/${file}`);
      }
    });
  }

  if (fs.existsSync(usecasesDir)) {
    const usecaseFiles = fs.readdirSync(usecasesDir);
    usecaseFiles.forEach((file) => {
      const ext = path.extname(file).toLowerCase();
      if ([".png", ".jpg", ".jpeg", ".webp"].includes(ext)) {
        headerImagePaths.push(`/images/usecases/${file}`);
      }
    });
  }

  if (headerImagePaths.length === 0) {
    throw new Error(
      "No header images found in /public/images/roles or /public/images/usecases."
    );
  }

  return headerImagePaths;
}

function getAllFilesRecursively(startDir) {
  const result = [];

  function walk(dir) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else {
        const ext = path.extname(entry.name).toLowerCase();
        if (FILE_EXTENSIONS.includes(ext)) {
          result.push(fullPath);
        }
      }
    }
  }

  walk(startDir);
  return result;
}

function getTargetFiles() {
  const files = [];
  TARGET_DIRS.forEach((dirName) => {
    const fullDir = path.join(projectRoot, dirName);
    if (fs.existsSync(fullDir)) {
      files.push(...getAllFilesRecursively(fullDir));
    }
  });
  return files;
}

function replaceHeaderImagesInFile(filePath, headerImagePaths) {
  let content = fs.readFileSync(filePath, "utf8");
  const originalContent = content;

  // Legacy header image patterns:
  //  - "actarion-header-1.png", 'actarion-header-1.png', with or without leading slash
  //  - same for header-2, header-3
  //  - anything like "/headers/xxx.png" or "public/headers/xxx.png"
  const patterns = [
    /(['"])[/\\]?actarion-header-1\.png\1/g,
    /(['"])[/\\]?actarion-header-2\.png\1/g,
    /(['"])[/\\]?actarion-header-3\.png\1/g,
    /(['"])[/\\]?(?:public[/\\])?headers[/\\][^'"]+\1/g,
  ];

  patterns.forEach((regex) => {
    content = content.replace(regex, (match, quote) => {
      const randomPath =
        headerImagePaths[Math.floor(Math.random() * headerImagePaths.length)];
      return `${quote}${randomPath}${quote}`;
    });
  });

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, "utf8");
    return true;
  }

  return false;
}

function main() {
  console.log("🚀 Starting header image replacement…");
  const headerImagePaths = getHeaderImagePaths();
  console.log(
    `Found ${headerImagePaths.length} candidate header images (roles + usecases).`
  );

  const files = getTargetFiles();
  console.log(`Scanning ${files.length} files for legacy header image paths…`);

  let changedCount = 0;

  files.forEach((filePath) => {
    const changed = replaceHeaderImagesInFile(filePath, headerImagePaths);
    if (changed) {
      changedCount++;
      console.log(`✔ Updated header images in: ${path.relative(projectRoot, filePath)}`);
    }
  });

  console.log(
    `✅ Done. Updated header image references in ${changedCount} file(s).`
  );
}

main();






