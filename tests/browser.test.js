const { Builder, By, until } = require('selenium-webdriver');
require('geckodriver');

// Här anger vi var testfilen ska hämtas. De konstiga replaceAll-funktionerna ersätter
// mellanslag med URL-säkra '%20' och backslash (\) på Windows med slash (/).
const fileUnderTest = 'file://' + __dirname.replaceAll(/ /g, '%20').replaceAll(/\\/g, '/') + '/../dist/index.html';
const defaultTimeout = 10000;
let driver;
jest.setTimeout(1000 * 60 * 5); // 5 minuter

// Det här körs innan vi kör testerna för att säkerställa att Firefox är igång
beforeAll(async () => {
console.log(fileUnderTest);
    driver = await new Builder().forBrowser('firefox').build();
    await driver.get(fileUnderTest);
});

// Allra sist avslutar vi Firefox igen
afterAll(async() => {
    await driver.quit();
}, defaultTimeout);

test('The stack should be empty in the beginning', async () => {
    let stack = await driver.findElement(By.id('top_of_stack')).getText();
    expect(stack).toEqual("n/a");
});

describe('Clicking "Pusha till stacken"', () => {
    it('should open a prompt box', async () => {
        let push = await driver.findElement(By.id('push'));
        await push.click();
        let alert = await driver.switchTo().alert();
        await alert.sendKeys("Bananer");
        await alert.accept();
    });
});

describe("Pushing 3 times then popping 3 times and peeking", () => {
    it('should open a prompt box', async () => {
            for (let i = 0; i<3; i++){
            let push = await driver.findElement(By.id('push'));
            await push.click();
            let alert = await driver.switchTo().alert();
            let str = "";
            if (i===0){
                str = "uno";
            }
            if (i===1){
                str = "zwei";
            }
            if (i===2){
                str = "три";
            }
            await alert.sendKeys(str);
            await alert.accept();
        }

        for (let i = 0; i<3; i++){
            let pop = await driver.findElement(By.id('pop'));
            await pop.click();
            await alert.accept();
        }
        let peek = await driver.findElement(By.id('peek'));
        let result = await peek.click();
        expect(result).toEqual("undefined");
    });
});