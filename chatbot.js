let qaData = [];

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("chatForm");
  const input = document.getElementById("userInput");
  const log = document.getElementById("chatlog");
  const themeToggle = document.getElementById("themeToggle");

  // Theme toggle
  themeToggle.addEventListener("change", () => {
    document.body.classList.toggle("dark-mode", themeToggle.checked);
  });

  // Load Q&A JSON data
  fetch("qa.json")
    .then((response) => response.json())
    .then((data) => {
      qaData = data;
    })
    .catch(() => {
      console.error("Failed to load Q&A data");
    });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const userText = input.value.trim();
    if (!userText) return;

    addMessage("user", userText);
    input.value = "";

    // Add typing indicator
    const typingMsg = addMessage("bot", "Bot is typing...");
    
    // Simulate delay
    setTimeout(() => {
      // Pass the lowercased user text to the reply function
      const botReply = getBotReply(userText.toLowerCase());
      typingMsg.textContent = botReply;
    }, 1200);
  });

  function addMessage(sender, message) {
    const msgDiv = document.createElement("div");
    msgDiv.className = sender;
    msgDiv.textContent = message;
    document.getElementById("chatlog").appendChild(msgDiv);
    document.getElementById("chatlog").scrollTop = document.getElementById("chatlog").scrollHeight;
    return msgDiv;
  }

  function getBotReply(input) {
    const normalizedInput = input.trim(); 
    
    for (const item of qaData) {
      // Assuming the FIRST keyword is the plant name (e.g., "snake plant")
      const plantKeyword = item.questions[0]; 
      // The rest of the keywords are care terms (e.g., "watering", "light")
      const careKeywords = item.questions.slice(1); 

      // 1. Check if the user's input contains the plant name keyword
      const plantMatch = normalizedInput.includes(plantKeyword);
      
      // 2. Check if the user's input contains at least ONE care topic keyword
      const careMatch = careKeywords.some(keyword => normalizedInput.includes(keyword));

      // ONLY return the answer if both the plant name AND a care topic are matched.
      if (plantMatch && careMatch) {
        return item.answer;
      }
    }
    
    // Fallback if no specific Q&A is found
    return "I'm still learning! Try asking about watering, light, or care tips for a specific plant.";
  }
});