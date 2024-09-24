import dotenv from "dotenv";
import { REST, Routes, SlashCommandBuilder } from "discord.js";

/** Define commands */
const commands = [
    new SlashCommandBuilder()
        .setName("ama")
        .setDescription("What's up? Ask me anything!")
        .addStringOption(option => option.setName("question")
                                         .setDescription("Body Text")
                                         .setRequired(true)),
    new SlashCommandBuilder()
        .setName("genImg")
        .setDescription("Generate an image given a prompt!")
        .addStringOption(option => option.setName("text")
                                        .setDescription("Body Text")
                                        .setRequired(true)),
]

/** Register the commands */
const rest = new REST().setToken(process.env.DISCORD_API_KEY);

/** Actually going to register the commands */
(async () => {
    try {
        // Registering slash commands
        console.log("Registering slash commands...")

        await rest.put(
            Routes.applicationGuildCommands(
                process.env.CLIENT_ID,
                process.env.SERVER_ID,
            ),
            { body : commands }
        );

        console.log("Commands registered succesfully!");
    } catch (e) {
        console.log(`There was an error: ${e}`);
    }
})();