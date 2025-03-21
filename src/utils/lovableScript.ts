
/**
 * This file serves as a reminder that the following script tag needs to be added to index.html:
 * 
 * <script src="https://cdn.gpteng.co/gptengineer.js" type="module"></script>
 * 
 * Since index.html is marked as read-only in this project, this change must be made manually
 * or by contacting Lovable support to update the file.
 */

export const lovableScriptReminder = () => {
  console.log(
    "IMPORTANT: Please add the Lovable script tag to index.html:\n" +
    '<script src="https://cdn.gpteng.co/gptengineer.js" type="module"></script>'
  );
};

// Call this function when the app initializes
export const checkLovableScript = () => {
  const hasLovableScript = Array.from(document.scripts).some(
    script => script.src.includes('gptengineer.js')
  );
  
  if (!hasLovableScript) {
    console.warn(
      "⚠️ Lovable script not detected! Please add this to your index.html:\n" +
      '<script src="https://cdn.gpteng.co/gptengineer.js" type="module"></script>'
    );
  }
};
