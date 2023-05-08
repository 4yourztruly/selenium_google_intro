const { Builder, By, Key, until } = require('selenium-webdriver');
const should = require('chai').should();

async function googleSearch() {

    let driver = await new Builder().forBrowser('firefox').build();

    try {

        await driver.get('https://www.google.com');

        let cookieButton = await driver.findElements(By.css('.QS5gu.sy4vM'));
        await cookieButton[1].click();
        await driver.wait(until.elementLocated(By.name('q')), 10000);
        await driver.sleep(1000);
        await driver.findElement(By.name('q')).sendKeys('Selenium', Key.ENTER);
        await driver.wait(until.elementLocated(By.css('h3')), 10000);

        let firstLink = await driver.findElement(By.css('h3'));
        let linkText = await firstLink.getText();
        console.log(linkText);

        linkText.should.equal('Selenium');

        if(linkText == 'Selenium') {

            await firstLink.click();
        } else {

            console.log('First link is not "Selenium');
        }

        await driver.wait(until.titleContains('Selenium'), 10000);
        
        let title = await driver.getTitle();

        title.should.include('Selenium');



    }
    catch(e) {

        console.log(e);
    }
    finally {

        await driver.quit();
    }

}

googleSearch();