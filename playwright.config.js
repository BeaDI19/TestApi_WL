const  path  = require("path");

const config = {
	testDir: path.join(__dirname, "tests__e2e"),
	webServer: {
		command: "npm run start",
		port: 3000,
		timeout: 120 * 1000,
		reuseExistingServer: !process.env.CI,
		ignoreHTTPSErrors: true,
		
	  },
  };
  
  module.exports = config;