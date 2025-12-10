create database cmf;

/*table to save emails sended*/
create table emails(
	_id int primary key not null auto_increment,
	name varchar(550),
	email varchar(450),
	phone varchar(150),
	message varchar(3500),
	date datetime
);

/*app config*/
create table api(
	_id int primary key not null auto_increment,
	title varchar(150),
	value varchar(350),
	date datetime
);