const { test, expect } = require('@playwright/test');
import AxeBuilder from '@axe-core/playwright';
import { createHtmlReport } from 'axe-html-reporter';
const fs = require('fs');
const { exec } = require('child_process');


test.describe("OrangeHrm Web Application" , () => {
  test("Login page should not have any accessbility issues" , async ({ page }) => {
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    const axeBuilder = await new AxeBuilder({ page })
      .analyze();
  
    const reportHTML = createHtmlReport({
      results: axeBuilder,
      options: {
        projectKey: "OrangeHrmLoginPage"
      },
    });
      if (!fs.existsSync("build/reports/orangehrmLoginPageReport.html")) {
      fs.mkdirSync("build/reports", {
        recursive: true,
      });
    }
    fs.writeFileSync("build/reports/orangehrmLoginPageReport.html", reportHTML);
    exec('start build/reports/orangehrmLoginPageReport.html');
  })

  test("Home page should not have any accessbility issues" , async ({ page }) => {
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    await page.locator("//input[@name='username']").fill("Admin");
    await page.locator("//input[@name='password']").fill("admin123");
    await page.locator("//button[@type='submit']").click();
    await page.locator(".oxd-userdropdown-img").waitFor();
    const axeBuilder = await new AxeBuilder({ page })
      .analyze();
  
    const reportHTML = createHtmlReport({
      results: axeBuilder,
      options: {
        projectKey: "OrangeHrmHomePage"
      },
    });
      if (!fs.existsSync("build/reports/orangehrmHomePageReport.html")) {
      fs.mkdirSync("build/reports", {
        recursive: true,
      });
    }
    fs.writeFileSync("build/reports/orangehrmHomePageReport.html", reportHTML);
    exec('start build/reports/orangehrmHomePageReport.html');
  })

  test("Admin page should not have any accessbility issues" , async ({ page }) => {
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    await page.waitForTimeout(2000)
    await page.locator("//input[@name='username']").fill("Admin");
    await page.locator("//input[@name='password']").fill("admin123");
    await page.locator("//button[@type='submit']").click();
    await page.locator(".oxd-userdropdown-img").waitFor();
    await page.locator("//span[text()='Admin']").click();
    await page.locator("//button[@type='submit']").waitFor();
    const axeBuilder = await new AxeBuilder({ page })
      .analyze();
  
    const reportHTML = createHtmlReport({
      results: axeBuilder,
      options: {
        projectKey: "OrangeHrmAdminPage"
      },
    });
      if (!fs.existsSync("build/reports/orangehrmAdminPageReport.html")) {
      fs.mkdirSync("build/reports", {
        recursive: true,
      });
    }
    fs.writeFileSync("build/reports/orangehrmAdminPageReport.html", reportHTML);
    exec('start build/reports/orangehrmAdminPageReport.html');
  })
  
})



