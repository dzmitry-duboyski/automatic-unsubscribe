const user = require('./env/user');

const puppeteer = require('puppeteer');
const url = 'https://www.instagram.com/';
const urlUserPrifile = `${url}${user.login}/`
console.log('start');


(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(url);
  await page.waitForSelector('input')
  
  await page.type('input[name="username"]', user.login)
  await page.type('input[type="password"]', user.password)
  await page.click('button[type="submit"]')

  page.waitForTimeout(5000)
    .then(() => page.goto(urlUserPrifile))
    .then(() => page.screenshot({ path: 'instagramm.png' }))
    .then(() => {

      console.log(user)

      let howManyfollowers =  page.evaluate((user) => {
        const userName = document.querySelector('h2').innerText;
        console.log('userName, ',userName) 
        console.log('user ',window.user) 

        const nodefollowers = document.querySelector(`a[href="/${userName}/followers/"]`);
        const howMany = Number(nodefollowers.firstElementChild.title);
        console.log(`All Subscribers = ${howMany}`)
        return howMany;
      });

      console.log(`All Subscribers = ${howManyfollowers}`)
      // console.log(`All Subscribers = ${howManyfollowers}`)

    });

  // await page.screenshot({ path: 'instagramm.png' });

  // await browser.close();
})();