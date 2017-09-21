
exports.config = {
  allScriptsTimeout: 180000,
  specs: ['features/**/*.feature'],
  exclude: ['features/no_edit.feature'],
  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {}
  },
  plugins: [],
  directConnect: true,
  framework: 'custom',
  ignoreUncaughtExceptions: true,
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  cucumberOpts: {
    compiler: "ts:ts-node/register",
    format: "json:reports/cucumberReport.json",

    require: [
      'lib/**/*.ts',
      'features/step_definitions/**/*.steps.ts'
    ]
  },
  useAllAngular2AppRoots: true,
  onPrepare: function () {
    const globals = require('protractor');
    const browser = globals.browser;
    browser.ignoreSynchronization = true;

    var { defineSupportCode } = require('cucumber');
    var reporter = require('cucumber-html-reporter');
    defineSupportCode(function ({ After }) {
      After(function (scenarioResult) {
        var world = this;
        if (scenarioResult.isFailed()) {
          return browser.takeScreenshot().then(function (png) {
            // screenShot is a base-64 encoded PNG
            var decodedImage = new Buffer(png.replace(/^data:image\/(png|gif|jpeg);base64,/, ''), 'base64');
            world.attach(decodedImage, 'image/png');
          });
        }
      });
    });

    var options = {
      theme: 'bootstrap',
      jsonFile: 'reports/cucumberReport.json',
      output: 'results/reports/testResults.html',
      reportSuiteAsScenarios: true,
      launchReport: true,
    };

    defineSupportCode(function ({ registerHandler }) {
      registerHandler('AfterFeatures', function (features) {
        reporter.generate(options);
      });
    });

    let csv = require("fast-csv");
    let _ = require("lodash");
    let fs = require('fs');

    let repoElementsArray = new Array();

    let files = fs.readdirSync('./repository');
    if(files.length==0) throw new Error('No Object Repository files found. There should be at least one object repository file.');
    let promiseArray = [];

    files.forEach((file) => {
      console.log('Now reading repository file "'+file+'"');
      let tempPromise = new Promise((resolve, reject) => {
        try {
          csv.fromPath('./repository/' + file, { headers: true, ignoreEmpty: true, trim: true })
            .on("data", function (data) {
              if (!_.find(repoElementsArray, (object) => { return data.elementKey === object.elementKey })) {
                repoElementsArray.push(data);
              } else {
                console.log('Duplicate object found and ignored ', data);
              }
            })
            .on("end", function () {
              browser.params.OBJECT_REPO = repoElementsArray;
              resolve();
            });
        }
        catch (error) {
          reject(error.message);
        }
      });
      promiseArray.push(tempPromise);
    });
    return Promise.all(promiseArray);

  }
};

