const { Builder, By, until, Key } = require('selenium-webdriver');

async function testarCadastroFuncionario() {
  const driver = await new Builder().forBrowser('chrome').build();

  try {
   
    await driver.get('http://localhost:5500/Front/HTML/gerente.html');

    const selectCadastro = await driver.findElement(By.id('select-cadastro'));
    await selectCadastro.click();
    await selectCadastro.sendKeys('Cadastro de Funcionário', Key.ENTER);

    await driver.wait(until.elementLocated(By.id('formFunc')), 5000);

    await driver.findElement(By.id('name-funcionario')).sendKeys('Pequeno Teste');
    await driver.findElement(By.id('cpf-funcionario')).sendKeys('123.456.789-20');
    await driver.findElement(By.id('birthdate-funcionario')).sendKeys('01-01-2000');
    await driver.findElement(By.id('position-funcionario')).sendKeys('Técnico');
    await driver.findElement(By.id('salary-funcionario')).sendKeys('3500');
    await driver.findElement(By.id('address-funcionario')).sendKeys('Rua dos Testes');
    await driver.findElement(By.id('city-funcionario')).sendKeys('Testolândia');
    await driver.findElement(By.id('state-funcionario')).sendKeys('SP');

    await driver.findElement(By.id('bF')).click();

    await driver.sleep(2000);

    console.log('✅ Cadastro de funcionário testado com sucesso!');
  } catch (erro) {
    console.error('❌ Erro durante o teste:', erro.message);
  } finally {
    await driver.quit();
  }
}

testarCadastroFuncionario();
