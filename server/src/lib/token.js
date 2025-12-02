import chalk from "chalk";
import { TOKEN_PATH, CONFIG_DIR } from "../cli/commands/auth/login.js";
import fs from "node:fs/promises";

export async function getStoredToken() {
  try {
    const data = await fs.readFile(TOKEN_PATH, "utf-8");
    const token = JSON.parse(data);
    return token;
  } catch (error) {
    return null;
  }
}

export async function storeToken(token) {
  try {
    //ensure config directory exists
    await fs.mkdir(CONFIG_DIR, { recursive: true });

    //store token
    const tokenData = {
      access_token: token.access_token,
      refresh_token: token.refresh_token, //store if available
      token_type: token.token_type || "Bearer",
      scope: token.scope,
      expires_at: token.expires_in
        ? new Date(Date.now() + token.expires_in * 1000).toISOString()
        : null,
      created_at: new Date().toISOString(),
    };

    await fs.writeFile(TOKEN_PATH, JSON.stringify(tokenData, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error(chalk.red("Failed to store token:"), error.message);
    return false;
  }
}

export async function clearStoredToken() {
  try {
    await fs.unlink(TOKEN_PATH);
    return true;
  } catch (error) {
    //file doesn't exist or can't be deleted
    return false;
  }
}

export async function isTokenExpired() {
  // use the provided token if present, otherwise load the stored token
  const token = await getStoredToken();
  if (!token || !token.expires_at) {
    return true;
  }
  const expiresAt = new Date(token.expires_at);
  const now = new Date();
  //consider expired if less than 5 minutes left
  return expiresAt.getTime() - now.getTime() < 5 * 60 * 1000;
}

export async function requiredAuth() {
  const token = await getStoredToken();

  if (!token) {
    console.log(
      chalk.red("❌ Not Authenticated. Please run 'ai login' first.")
    );
    process.exit(1);
  }

  if (await isTokenExpired()) {
    console.log(chalk.yellow("⚠️ Token/Session expired. Please login again."));
    console.log(chalk.gray("Run: ai login \n"));
    process.exit(1);
  }
}
