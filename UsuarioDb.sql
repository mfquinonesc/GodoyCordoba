DROP DATABASE IF EXISTS UsuarioDb;

CREATE DATABASE UsuarioDb;

USE UsuarioDb;

CREATE TABLE [usuario](
    usuarioId INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    cedula INT NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL,
    ultimoAcceso DATETIME NULL, 
    puntaje INT NULL
);

--INSERT INTO [usuario] (nombre,apellido,cedula,correo,contrasena) VALUES ('Jhon','Doe',123456789,'jhondode@mail.com','contrasena');

SELECT * FROM [usuario]

