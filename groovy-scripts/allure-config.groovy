job('BlackBerry Radar - Asset Tracking Test Automation Framework') {
    description('BlackBerry Radar - Asset Tracking Test Automation Framework')
    parameters {
        choiceParam('choice_scripts', ['wdio', 'webdriver-run-suites', 'update-chromedriver', 'generate-qa-customer', 'test'])
    }
    scm {
        // No SCM configured
    }
    customWorkspace('/Users/aiktider/Desktop/BB_Automation/dev-env/qa/webdriverio-tests')
    steps {
        shell('npm install')
        shell('npm run \$choice_scripts')
    }
    publishers {
        allure {
            results {
                path('target/results/allure/allure-results')
            }
            reportBuildPolicy('ALWAYS')
            reportPath('target/results/allure/allure-report')
        }
    }
    wrappers {
        // Timestamp and AnsiColor wrappers
        timestamps()
        ansiColor('css')
    }
}
