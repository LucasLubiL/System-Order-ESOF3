create table funcionario(

     idfunc serial not null,
	 nome varchar(100) not null,
	 cpf varchar(14) not null,
	 data_nascimento date not null,
	 endereco varchar(100) not null,
	 cidade varchar(50) not null,
	 estado varchar(20) not null,
	 funcao varchar(50) not null,
	 primary key(idfunc)

);

create table usuario(

     iduser serial not null,
	 usuario varchar(15) not null,
	 senha varchar(30) not null,
	 idfunc int references funcionario(idfunc),
	 primary key(iduser)

);

create table cliente(

     idcliente serial not null,
	 nome varchar(100) not null,
	 cpf varchar(14) not null,
	 data_nascimento date not null,
	 endereco varchar(100) not null,
	 cidade varchar(50) not null,
	 estado varchar(20) not null,
	 primary key(idcliente)

);

create table servico(

     idservice serial not null,
	 nome_service varchar(50),
	 primary key(idservice)
	 
);

create table pagamento(

     idpag serial not null,
	 nome varchar(50),
	 primary key(idpag)

);

create table ordem(

     idord serial not null,
	 status int default 1,
     description varchar(1000) not null,
	 valor NUMERIC(10, 2) not null,
	 ord_data date not null,
	 idpag int references pagamento(idpag),
	 idservice int references servico(idservice),
	 idfunc int references funcionario(idfunc),
	 idcliente int references cliente(idcliente),
	 primary key(idord)
	 
);

create table receber(

     idrec serial not null,
	 valor NUMERIC(10, 2) not null,
	 rec_date date not null,
	 idord int references ordem(idord),
	 idpag int references pagamento(idpag),
	 idcliente int references cliente(idcliente),
	 primary key(idrec)

);