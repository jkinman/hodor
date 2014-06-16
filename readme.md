Need to run grunt build
You're all set! Your app should now be live at 
	http://@hodor-jkinman.rhcloud.com/
After app modification run
	grunt build
Then enter the dist folder to commit these updates:
	cd dist && git commit -am "describe your changes here"
Finally, deploy your updated build to OpenShift with
	git push hodor master


	grunt build && cd dist && git add . && git commit -am "describe your changes here" && git push hodor master
