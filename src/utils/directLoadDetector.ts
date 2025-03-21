
/**
 * This utility detects when a user tries to open the HTML file directly in their browser
 * using the file:// protocol instead of running the proper development server.
 * 
 * When detected, it displays a friendly error message with instructions on how to
 * correctly run the application.
 */

export const detectDirectFileLoad = (): boolean => {
  // Check if using file:// protocol
  if (window.location.protocol === 'file:') {
    // Create error message container
    const errorContainer = document.createElement('div');
    errorContainer.style.fontFamily = 'system-ui, -apple-system, sans-serif';
    errorContainer.style.maxWidth = '600px';
    errorContainer.style.margin = '50px auto';
    errorContainer.style.padding = '30px';
    errorContainer.style.background = '#f8f0ff';
    errorContainer.style.borderRadius = '12px';
    errorContainer.style.boxShadow = '0 4px 20px rgba(102, 51, 153, 0.15)';
    errorContainer.style.color = '#333';
    errorContainer.style.lineHeight = '1.6';
    
    // Add content to the error message
    errorContainer.innerHTML = `
      <h1 style="color: #663399; margin-top: 0; font-size: 28px;">⚠️ Incorrect Launch Method</h1>
      
      <p style="font-size: 16px;">You've opened the HTML file directly in your browser, but this application needs to be run with its development server to function properly.</p>
      
      <h2 style="color: #663399; margin-top: 30px; font-size: 20px;">How to correctly launch the app:</h2>
      
      <div style="background: #f1e6ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
        <p style="margin: 0 0 10px 0;"><strong>Option 1:</strong> Use the provided startup script:</p>
        <code style="display: block; background: #333; color: #fff; padding: 10px; border-radius: 4px; overflow-x: auto; margin-bottom: 10px;">
          # On Windows: double-click the launcher file<br>
          # On macOS: double-click launch.command<br>
          # On Linux: run ./launch.sh
        </code>
        
        <p style="margin: 15px 0 10px 0;"><strong>Option 2:</strong> Use npm commands in terminal/command prompt:</p>
        <code style="display: block; background: #333; color: #fff; padding: 10px; border-radius: 4px; overflow-x: auto;">
          # Navigate to the project directory<br>
          cd path/to/project<br><br>
          # Start the development server<br>
          npm run dev<br>
          # Or<br>
          npm start
        </code>
      </div>
      
      <p style="font-size: 16px;">After starting the server correctly, the app will automatically open in your browser at <strong>http://localhost:8080</strong></p>
    `;
    
    // Replace the entire body content with our error message
    document.body.innerHTML = '';
    document.body.appendChild(errorContainer);
    
    return true;
  }
  
  return false;
};
