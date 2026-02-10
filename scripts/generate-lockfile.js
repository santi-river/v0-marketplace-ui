import { execSync } from "child_process";

try {
  console.log("Running pnpm install to generate lockfile...");
  execSync("pnpm install --no-frozen-lockfile", {
    cwd: "/vercel/share/v0-project",
    stdio: "inherit",
  });
  console.log("Lockfile generated successfully.");
} catch (error) {
  console.error("Error generating lockfile:", error.message);
  process.exit(1);
}
