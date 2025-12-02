#!/usr/bin/env node

import dotenv from "dotenv";
import chalk from "chalk";
import figlet from "figlet";
import { Command } from "commander";
import { login, logout, whoami } from "./commands/auth/login.js";

dotenv.config();

async function main() {
  // Display banner
  console.log(
    chalk.cyan(
      figlet.textSync("A - CLI", {
        font: "Standard",
        horizontalLayout: "default",
      })
    )
  );
  console.log(
    chalk.green("Welcome to A-CLI - Your AI Command Line Assistant\n")
  );

  const program = new Command("ai");
  program
    .version("1.0.0")
    .description("A-CLI: Your AI Command Line Assistant")
    .addCommand(login)
    .addCommand(logout)
    .addCommand(whoami);

  program.action(() => {
    program.help();
  });

  program.parse();
}

main().catch((err) => {
  console.error(chalk.red("Error starting CLI:"), err);
  process.exit(1);
});
