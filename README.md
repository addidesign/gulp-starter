# Getting started with Gulp
This is a 'getting started with Gulp' project, that I set up to assist a talk I did at the [Bristol WordPress](https://wpbristol.co.uk/) meetup group, in Sept 2018 - https://www.meetup.com/wpbristol/

[Gulp](https://gulpjs.com/) is a great tool for automating development tasks, saving you time and making you a more productive Developer! I currently use Gulp to compile, error check and minify my SASS, JS and CSS. I also use it to optimise images and live inject file changes to the browser as I develop.

### Before you get going...
You'll need to have Node.js and Node Package Manager (NPM) installed on your machine before you can started using Gulp. This is because Gulp is built on Node.js and installed & updated via NPM.

If you have [Homebrew](https://brew.sh/) installed, you can use it to install Node.js just by running - 

```
$ brew install node
```

Otherwise, this is a [great guide](https://www.npmjs.com/get-npm) for getting setup with Node and NPM.

When you have Node and NPM installed you should be able to run the following command, to get the versions you have installed - 

```
$ node -v && npm -v
```

### Installing Gulp
Next, you'll need to install Gulp. If you have followed the steps above and have Node and NPM install, you should now be able to run the following command - (if you get permission errors try running the command again with 'sudo' at the beginning)

```
$ npm install gulp-cli -g
```

The '-g' flag just means global, allowing you to use Gulp commands from any of your projects, without the need to install the CLI in each project.

### All good to go?
With Node, NPM and Gulp all installed on your machine, clone down this project by navigating to the directory where you keep all your sites and run - 

*Switch the 'your-project' bit at the end to whatever you want to call your site.

```
$ git clone https://github.com/addidesign/gulp-starter.git your-project
```

Next change directory to whatever you renamed 'your-project' to - 

```
$ cd your-project
```
and run 
```
$ npm install
```
This command will tell NPM to look at the 'package.json' file and download each of the dependencies in the "devDependencies". When this is complete you can now go ahead and run -

```
$ gulp
```
You should see from the terminal that Gulp has started up and is running tasks. One of these task is for Browsersync, which is a really useful tool, that allows you to inject style changes istantly - great for when your styling up a website. It also gives you an 'UI' url where you can change the browsersync settings and an 'External' url, which other devices that are connected to the same WiFi network can also use. It shows the updates on all the devices with hardly any delay and can also mirror your scroll and click interactions, which is great for testing on tablets and mobile devices.


 
 


