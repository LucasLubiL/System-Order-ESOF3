const { Builder, By, Key, until } = require('selenium-webdriver');

async function testarLoginECriarOrdem() {
    const driver = await new Builder().forBrowser('chrome').build();

    try {
    
        await driver.get('http://localhost:5500/Front/HTML/index.html');

        await driver.findElement(By.id('username')).sendKeys('Lucas');
        await driver.findElement(By.id('password')).sendKeys('Lucas12', Key.RETURN);

        await driver.sleep(2000);

        const selectOrdem = await driver.findElement(By.id('select-ordem'));
        await selectOrdem.click();
        await selectOrdem.sendKeys('Criar Ordem de Serviço', Key.ENTER);

        await driver.sleep(1000);

        await driver.findElement(By.id('select-cliente')).sendKeys(Key.ARROW_DOWN, Key.ENTER);
        await driver.findElement(By.id('select-servico')).sendKeys(Key.ARROW_DOWN, Key.ENTER);
        await driver.findElement(By.id('select-pagamento')).sendKeys(Key.ARROW_DOWN, Key.ENTER);

        await driver.findElement(By.id('input-valor')).sendKeys('250');
        await driver.findElement(By.id('textarea-descricao-cliente')).sendKeys('Notebook está com defeito no teclado');

        await driver.findElement(By.id('bO')).click();

        await driver.sleep(3000);

        console.log('✅ Teste de criação de ordem realizado com sucesso');

    } catch (erro) {
        console.error('❌ Erro no teste:', erro);
    } finally {
        await driver.quit();
    }
}

testarLoginECriarOrdem();