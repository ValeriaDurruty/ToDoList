-- MySQL Script generated by MySQL Workbench
-- Fri Sep 13 10:31:13 2024
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema ToDoList
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema ToDoList
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ToDoList` DEFAULT CHARACTER SET utf8 ;
USE `ToDoList` ;

-- -----------------------------------------------------
-- Table `ToDoList`.`Usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ToDoList`.`Usuario` (
  `PK_Usuario` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `apellido` VARCHAR(45) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`PK_Usuario`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ToDoList`.`Estado`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ToDoList`.`Estado` (
  `PK_Estado` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`PK_Estado`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ToDoList`.`Prioridad`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ToDoList`.`Prioridad` (
  `PK_Prioridad` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`PK_Prioridad`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ToDoList`.`Categoría`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ToDoList`.`Categoría` (
  `PK_Categoría` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(60) NOT NULL,
  PRIMARY KEY (`PK_Categoría`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ToDoList`.`Tarea`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ToDoList`.`Tarea` (
  `PK_Tarea` INT NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(100) NOT NULL,
  `descripcion` TEXT NOT NULL,
  `fecha_creacion` DATETIME NOT NULL,
  `fecha_limite` DATETIME NOT NULL,
  `FK_Usuario` INT NOT NULL,
  `FK_Estado` INT NOT NULL,
  `FK_Prioridad` INT NOT NULL,
  `FK_Categoría` INT NOT NULL,
  PRIMARY KEY (`PK_Tarea`, `FK_Usuario`, `FK_Estado`, `FK_Prioridad`, `FK_Categoría`),
  INDEX `fk_Tarea_Usuario_idx` (`FK_Usuario` ASC),
  INDEX `fk_Tarea_Estado1_idx` (`FK_Estado` ASC),
  INDEX `fk_Tarea_Prioridad1_idx` (`FK_Prioridad` ASC),
  INDEX `fk_Tarea_Categoría1_idx` (`FK_Categoría` ASC),
  CONSTRAINT `fk_Tarea_Usuario`
    FOREIGN KEY (`FK_Usuario`)
    REFERENCES `ToDoList`.`Usuario` (`PK_Usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Tarea_Estado1`
    FOREIGN KEY (`FK_Estado`)
    REFERENCES `ToDoList`.`Estado` (`PK_Estado`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Tarea_Prioridad1`
    FOREIGN KEY (`FK_Prioridad`)
    REFERENCES `ToDoList`.`Prioridad` (`PK_Prioridad`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Tarea_Categoría1`
    FOREIGN KEY (`FK_Categoría`)
    REFERENCES `ToDoList`.`Categoría` (`PK_Categoría`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
