# Rentalx

## Cadastro de carro

**RF** <br>
Deve ser possível cadastrar novo carro.

**RN** <br>
Não dever ser possível cadastar um carro já existente.<br>
Não deve ser possível alterar a placa de um carro já cadastrado.<br>
O carro deve ser cadastrado, por padrão, com disponibilidade.<br>
O usúario responsável pelo dacastro deve ser im usúario administrador.<br>

## Listagem de carro

**RF**<br>
Deve ser possível listar todos os carros disponíveis.<br>
Deve ser possível listar todos os carros disponíveis pelo nome da categoria<br>
Deve ser possível listar todos os carros disponíveis pelo nome da marca<br>
Deve ser possível listar todos os carros disponíveis pelo nome do carro<br>

**RN**<br>
O usíario não precisa estar logado no sistema.<br>

## Cadastro de Especificação no carro

**RF**<br>
Deve ser possível cadastrar uma especificação para um carro.<br>
Dever ser possível listar todas as especificações.<br>
Deve ser possível listar todos os carros.<br>

**RN**<br>
Não deve ser possível uma especificação para um carro não cadastrado.
<br>
Não deve ser possível uma especificação já existente para o mesmo carro.<br>
O usúario responsável pelo dacastro deve ser im usúario administrador.<br>

## Cadastro de imagens do carro

**RF**<br>
Deve ser possível cadastrar a imagem do carro.<br>
Deve ser possível listar todos os carros.<br>

**RNF**<br>
Utilizar o multer para upload dos arquivos.<br>

**RN**<br>
O usúario deve poder cadastrar mais de uma imagem para o mesmo carro.<br>
O usúario responsável pelo cadastro deve ser um usúario administrador.<br>

## Aluguel de carro

**RF**<br>
Deve ser possível cadastrar um aluguel.<br>

**RN**<br>
O aluguel deve ter uma duração miníma de 24 horas.<br>
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.<br>
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.<br>
O usuário deve estar logado na aplicação.<br>
