# funtoken-test

1. import products.sql into mysql database and start MySQL server
2. inside the backend folder open command prompt and enter `npm install`, after which enter `node index.js`.
	backend api server is now running
3. inside the react-test folder open command prompt and enter `npm install`, after which enter `npm start`.
	react frontend page will open.
	open another command prompt and enter `npm test` which will generate test result.
4. inside into the yii-test folder open command prompt to enter `composer install`, after which enter `php yii serve`.
	yii application page will open.
	open another command prompt and enter `vendor/bin/codecept run unit` which will generate test result.