function getPrice(pizzaSize) {

       const puppeteer = require('puppeteer');
       let scrape = async () => {
           const browser = await puppeteer.launch({headless: false});
           const page = await browser.newPage();


           if (places.find((places) => places === "dominos")) {
           await page.goto('https://www.dominos.ca/');
           await page.waitFor(1000);
           const result = await page.evaluate(() => {

               let data = []; // Create an empty array that will store our data
               var priceNeeded;
               let titles = document.querySelectorAll('.promo__title'); // Select all Products
               let dollarPrices = document.querySelectorAll('.price'); // Select all Products
               let centPrices = document.querySelectorAll('.promo__price__cents'); // Select all Products

               var pizzatitles = []
               for (var i=0; i< titles.length; i++) {
                   if (titles[i].innerText.toLowerCase().search("medium") != -1) {
                           pizzatitles.push("Medium");

                   }

                   else if (titles[i].innerText.toLowerCase().search("extra large") != -1){
                           pizzatitles.push("Extra Large");
                   }
                   else if (titles[i].innerText.toLowerCase().search("large") != -1) {
                           pizzatitles.push("Large");
                   }
                   else if (titles[i].innerText.toLowerCase().search("small") != -1) {
                           pizzatitles.push("Small");
                   }
               }

               for (var i=0; i< 3; i++) {
                       let title = pizzatitles[i];
                       let priceDollar = dollarPrices[i].innerText;
                       let priceCent = centPrices[i].innerText;
                       let totalPrice = priceDollar  + '.' +  priceCent;
                       let location = "Dominos";
                       if (title == pizzaSize) {
                       priceNeeded = totalPrice}
                       data.push({location, title, totalPrice});
               }
               return priceNeeded;
           });

           browser.close();


           return result; // Return the data

           }
           else {
               return -1;
           }
       };
       scrape().then((value) => {
           console.log(value);// Success!

   });

}
