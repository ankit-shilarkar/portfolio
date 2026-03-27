---
name: update-chatbot-kb
argument-hint: "[topic] [new information to add]"
---

Update the chatbot's knowledge base in src/js/chat.js:

1. Read `src/js/chat.js` and examine existing KNOWLEDGE_CHUNKS array.

2. Parse $ARGUMENTS:
   - Topic: which chunk to update or create (e.g. "burger-singh", "new project", "skill")
   - New information: the text to add/replace

3. If chunk with matching id exists:
   - Append new info to the `text` field
   - Add new relevant terms to the `tags` array

4. If no matching chunk:
   - Create a new chunk object with:
     - id: kebab-case topic name
     - tags: extract 6-10 relevant keywords from the info
     - text: the provided information, formatted clearly

5. Verify the `retrieveChunks()` function would score this chunk for relevant queries.
   - Test: does "burger singh" in query score the burger-singh chunk?
   - Test: does "azure" in query score the azure chunk?

6. Save the file and confirm the change.

7. Note: In Phase 2 (real RAG), this command will also:
   - Send chunk text to embedding API
   - Store vector in pgvector/Pinecone
   - Invalidate cache for affected queries
