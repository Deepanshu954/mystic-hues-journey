
/**
 * This utility detects if the app is being loaded directly from a file:// URL
 * instead of being served through a proper development server.
 */

export const detectDirectFileLoad = () => {
  // Check if we're running from a file:// URL
  const isDirectFileLoad = window.location.protocol === 'file:';
  
  if (isDirectFileLoad) {
    // If loaded directly as a file, show a custom error page
    document.body.innerHTML = `
      <div style="font-family: 'Poppins', sans-serif; max-width: 800px; margin: 50px auto; padding: 20px; background-color: #f8f0e5; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #e25822; font-family: 'Playfair Display', serif;">🕉️ Mystic India</h1>
        </div>
        
        <div style="background-color: #fff3dc; border-left: 4px solid #ff9933; padding: 15px; margin-bottom: 20px; border-radius: 4px;">
          <h2 style="color: #e25822; margin-top: 0;">⚠️ Application Launch Error</h2>
          <p>You're trying to open this application directly as an HTML file, but it needs to be served through a development server.</p>
        </div>
        
        <h3 style="color: #3e2723;">How to launch the app correctly:</h3>
        
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 4px; font-family: monospace; margin-bottom: 20px;">
          <p style="margin: 5px 0;"><strong>Option 1:</strong> In your terminal, navigate to the project folder and run:</p>
          <pre style="background-color: #2b2b2b; color: #e6e6e6; padding: 10px; border-radius: 4px; overflow-x: auto;">node mystic.js</pre>
          
          <p style="margin: 15px 0 5px;"><strong>Option 2:</strong> Or use npm:</p>
          <pre style="background-color: #2b2b2b; color: #e6e6e6; padding: 10px; border-radius: 4px; overflow-x: auto;">npm start</pre>
          <pre style="background-color: #2b2b2b; color: #e6e6e6; padding: 10px; border-radius: 4px; overflow-x: auto;">npm run dev</pre>
        </div>
        
        <p>These commands will install any required dependencies and start a local development server.</p>
        <p>Once the server is running, the app will automatically open in your browser at <a href="http://localhost:8080" style="color: #e25822;">http://localhost:8080</a></p>
        
        <div style="background-color: #edf7ed; border-left: 4px solid #4caf50; padding: 15px; margin-top: 20px; border-radius: 4px;">
          <h3 style="color: #1b5e20; margin-top: 0;">Need help?</h3>
          <p>Refer to the README.md file in the project directory for more detailed instructions.</p>
        </div>
      </div>
    `;
    return true;
  }
  
  return false;
};
