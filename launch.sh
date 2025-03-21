
#!/bin/bash

# Make sure the script runs from the correct directory
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$DIR"

# Run the mystic.js launcher with Node.js
node mystic.js
