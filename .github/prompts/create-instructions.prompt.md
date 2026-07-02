---
name: create-instructions
description: Describe when to use this prompt
agent: Instructions Generator
---

<!-- Tip: Use /create-prompt in chat to generate content with agent assistance -->

Take the information provided in the prompt and generate a concise and clear .md agent instructions file in the appropriate /doc directory. The generated file will be a markdown file with a YAML front matter header that includes the following attributes: name, description, argument-hint, target, model, tools, and handoffs. If the md file name is provided, use that, otherwise, generate a name based on the content. The agent will ensure that the generated instructions are highly specific and tailored to the provided context. Make sure to update the AGENTS.md file with a link to the new instructions file. The agent will also ensure that the generated instructions are highly specific and tailored to the provided context. If no information provided, prompt the user to give more information about the layer of architecture or coding standards within this app that they want to generate instructions for.