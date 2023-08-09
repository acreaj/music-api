Source code from [NeteaseCloudMusicApi]('https://github.com/Binaryify/NeteaseCloudMusicApi').

I've made some changes to make it eaiser for me to understand.

##### Deploy

I want to deploy this project in github once, but in the end I found that github can only deploy static web pages( front-end projects).Then I find vercel which can deploy Node server.

Vercel can simplify the deployment tasks for developers.For the most part, the deployment tasks are transparent.

First ,a '.vercel' file  is required in the root dirctory to fill some necessary information and bind to the vercel server.Second, a 'index.js' is required int the root dirctory to use entry file.Third,we need to add a build script command.Finally, we need a 'vercel.json' which can configure and override the vercel defalut behavior.

