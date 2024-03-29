#------------------------------------------------------------
#        Script MySQL.
#------------------------------------------------------------


#------------------------------------------------------------
# Table: patient
#------------------------------------------------------------

CREATE TABLE patient(
        id         Int  Auto_increment  NOT NULL ,
        fullname   Varchar (250) NOT NULL ,
        height     Float NOT NULL ,
        weight     Float NOT NULL ,
        commentary Longtext NOT NULL
	,CONSTRAINT Patient_PK PRIMARY KEY (id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: spe
#------------------------------------------------------------

CREATE TABLE spe(
        name Varchar (250) NOT NULL ,
        type Int NOT NULL
	,CONSTRAINT Spe_PK PRIMARY KEY (name)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: grade
#------------------------------------------------------------

CREATE TABLE grade(
        name Varchar (250) NOT NULL,
        gradeName Varchar (250) NOT NULL ,
        type Int NOT NULL ,
        typeGrade Int NOT NULL ,
	, CONSTRAINT Grade_PK PRIMARY KEY (name)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: users
#------------------------------------------------------------

CREATE TABLE users(
        id       Int  Auto_increment  NOT NULL ,
        fullname Varchar (250) NOT NULL ,
        password Varchar (250) NOT NULL ,
        username Varchar (250) NOT NULL ,
        grade_name     Varchar (250) NOT NULL,
        isAdmin INT(2) NOT NULL DEFAULT '0'
	,CONSTRAINT USER_PK PRIMARY KEY (id)

	,CONSTRAINT USER_Grade_FK FOREIGN KEY (grade_name) REFERENCES grade(name)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: ordonnance
#------------------------------------------------------------

CREATE TABLE ordonnance(
        id         Int NOT NULL ,
        nbDay      Int NOT NULL ,
        nbPrise    Int NOT NULL ,
        drugName   Varchar (250) NOT NULL ,
        whenInDay  Varchar (250) NOT NULL ,
        id_user    Int NOT NULL ,
        id_patient Int NOT NULL
	,CONSTRAINT ORDONNANCE_PK PRIMARY KEY (id)

	,CONSTRAINT ORDONNANCE_USER_FK FOREIGN KEY (id_user) REFERENCES users(id)
	,CONSTRAINT ORDONNANCE_Patient0_FK FOREIGN KEY (id_patient) REFERENCES patient(id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: rapport
#------------------------------------------------------------

CREATE TABLE rapport(
        id           Int  Auto_increment  NOT NULL ,
        date         Date NOT NULL ,
        auscult      Varchar (250) NOT NULL ,
        intervention Longtext NOT NULL ,
        amount       Int NOT NULL ,
        isPayed      Int NOT NULL ,
        id_user      Int NOT NULL ,
        id_patient   Int NOT NULL
	,CONSTRAINT Rapport_PK PRIMARY KEY (id)

	,CONSTRAINT Rapport_USER_FK FOREIGN KEY (id_user) REFERENCES users(id)
	,CONSTRAINT Rapport_Patient0_FK FOREIGN KEY (id_patient) REFERENCES patient(id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: dayofFollow
#------------------------------------------------------------

CREATE TABLE dayofFollow(
        id          Int  Auto_increment  NOT NULL ,
        date        Date NOT NULL ,
        description Varchar (250) NOT NULL ,
        isOk        Int NOT NULL ,
        id_Rapport  Int NOT NULL
	,CONSTRAINT dayofFollow_PK PRIMARY KEY (id)

	,CONSTRAINT dayofFollow_Rapport_FK FOREIGN KEY (id_Rapport) REFERENCES rapport(id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: service
#------------------------------------------------------------

CREATE TABLE service(
        id           Int  Auto_increment  NOT NULL ,
        dateStart    varchar(200) NOT NULL ,
        dateEnd      varchar(200) NOT NULL ,
        isSupervisor Int NOT NULL ,
        isAvailable  Int NOT NULL ,
        isPharmacieOpen Int NOT NULL ,
        county       Varchar (250) NOT NULL ,
        type         Int NOT NULL ,
        id_user      Int NOT NULL
	,CONSTRAINT SERVICE_PK PRIMARY KEY (id)

	,CONSTRAINT SERVICE_USER_FK FOREIGN KEY (id_user) REFERENCES users(id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: have
#------------------------------------------------------------

CREATE TABLE have(
        name Varchar (250) NOT NULL ,
        id   Int NOT NULL
	,CONSTRAINT HAVE_PK PRIMARY KEY (NAME,ID)

	,CONSTRAINT HAVE_Spe_FK FOREIGN KEY (name) REFERENCES spe(name)
	,CONSTRAINT HAVE_USER0_FK FOREIGN KEY (id) REFERENCES users(id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: fusillade
#------------------------------------------------------------

CREATE TABLE fusillade(
        id          Int  Auto_increment  NOT NULL,
        bed         Varchar (250) NOT NULL,
        bedLabel    Varchar (250) NOT NULL,
        patient     Varchar (250) NULL DEFAULT NULL,
        medecin     Varchar (250) NULL DEFAULT NULL,
        description Varchar (250) NULL DEFAULT NULL,
        etatPatient Int DEFAULT 0,
        havePatient Int DEFAULT 0

        ,CONSTRAINT FUSILLADE_PK PRIMARY KEY (id)
)ENGINE=InnoDB;
ALTER TABLE `users` ADD `num` VARCHAR(10) NOT NULL AFTER `isAdmin`;

INSERT INTO `grade`(`name`, `gradeName`, `type`, `typeGrade`) VALUES ('medecin','Médecin', 1, 0);
INSERT INTO `users`(`fullname`, `password`, `username`, `grade_name`) VALUES ('Billy Renvess','test','brenves','medecin');
INSERT INTO `service`(`dateStart`, `dateEnd`, `isSupervisor`, `isAvailable`, `type`, `id_user`) VALUES ('2020-09-30', '2020-09-30',1, 1, 1, 1);
INSERT INTO `fusillade`(`bed`, `bedLabel`, `patient`, `medecin`, `description`, `etatPatient`, `havePatient`) VALUES ('bloc_1', 'Bloc opératoire n°1', 'Kilauea Ake', 'Jacob Ripper', 'Jambe cassé et traumatisme crânien', 1, 1);
INSERT INTO `fusillade`(`bed`, `bedLabel`, `patient`, `medecin`, `description`, `etatPatient`, `havePatient`) VALUES ('bloc_2', 'Bloc opératoire n°2', '', '', '', 0, 0);
INSERT INTO `fusillade`(`bed`, `bedLabel`, `patient`, `medecin`, `description`, `etatPatient`, `havePatient`) VALUES ('bloc_3', 'Bloc opératoire n°3', '', '', '', 0, 0);
INSERT INTO `fusillade`(`bed`, `bedLabel`, `patient`, `medecin`, `description`, `etatPatient`, `havePatient`) VALUES ('bloc_4', 'Bloc opératoire n°4', '', '', '', 0, 0);

INSERT INTO `fusillade`(`bed`, `bedLabel`, `patient`, `medecin`, `description`, `etatPatient`, `havePatient`) VALUES ('repos_1', 'Salle de repos - Lit n°1', '', '', '', 0, 0);
INSERT INTO `fusillade`(`bed`, `bedLabel`, `patient`, `medecin`, `description`, `etatPatient`, `havePatient`) VALUES ('repos_2', 'Salle de repos - Lit n°2', '', '', '', 0, 0);
INSERT INTO `fusillade`(`bed`, `bedLabel`, `patient`, `medecin`, `description`, `etatPatient`, `havePatient`) VALUES ('repos_3', 'Salle de repos - Lit n°3', '', '', '', 0, 0);
INSERT INTO `fusillade`(`bed`, `bedLabel`, `patient`, `medecin`, `description`, `etatPatient`, `havePatient`) VALUES ('repos_4', 'Salle de repos - Lit n°4', '', '', '', 0, 0);
INSERT INTO `fusillade`(`bed`, `bedLabel`, `patient`, `medecin`, `description`, `etatPatient`, `havePatient`) VALUES ('repos_5', 'Salle de repos - Lit n°5', '', '', '', 0, 0);
INSERT INTO `fusillade`(`bed`, `bedLabel`, `patient`, `medecin`, `description`, `etatPatient`, `havePatient`) VALUES ('repos_6', 'Salle de repos - Lit n°6', '', '', '', 0, 0);
INSERT INTO `fusillade`(`bed`, `bedLabel`, `patient`, `medecin`, `description`, `etatPatient`, `havePatient`) VALUES ('repos_7', 'Salle de repos - Lit n°7', '', '', '', 0, 0);
INSERT INTO `fusillade`(`bed`, `bedLabel`, `patient`, `medecin`, `description`, `etatPatient`, `havePatient`) VALUES ('repos_8', 'Salle de repos - Lit n°8', '', '', '', 0, 0);
INSERT INTO `fusillade`(`bed`, `bedLabel`, `patient`, `medecin`, `description`, `etatPatient`, `havePatient`) VALUES ('repos_9', 'Salle de repos - Lit n°9', '', '', '', 0, 0);

INSERT INTO `fusillade`(`bed`, `bedLabel`, `patient`, `medecin`, `description`, `etatPatient`, `havePatient`) VALUES ('reveil_1', 'Salle de réveil - Lit n°1', '', '', '', 0, 0);
INSERT INTO `fusillade`(`bed`, `bedLabel`, `patient`, `medecin`, `description`, `etatPatient`, `havePatient`) VALUES ('reveil_2', 'Salle de réveil - Lit n°2', '', '', '', 0, 0);
INSERT INTO `fusillade`(`bed`, `bedLabel`, `patient`, `medecin`, `description`, `etatPatient`, `havePatient`) VALUES ('reveil_3', 'Salle de réveil - Lit n°3', '', '', '', 0, 0);
INSERT INTO `fusillade`(`bed`, `bedLabel`, `patient`, `medecin`, `description`, `etatPatient`, `havePatient`) VALUES ('reveil_4', 'Salle de réveil - Lit n°4', '', '', '', 0, 0);
INSERT INTO `fusillade`(`bed`, `bedLabel`, `patient`, `medecin`, `description`, `etatPatient`, `havePatient`) VALUES ('reveil_5', 'Salle de réveil - Lit n°5', '', '', '', 0, 0);
INSERT INTO `fusillade`(`bed`, `bedLabel`, `patient`, `medecin`, `description`, `etatPatient`, `havePatient`) VALUES ('reveil_6', 'Salle de réveil - Lit n°6', '', '', '', 0, 0);

INSERT INTO `fusillade`(`bed`, `bedLabel`, `patient`, `medecin`, `description`, `etatPatient`, `havePatient`) VALUES ('repos_ss_1', 'Salle de repos - Lit n°1', '', '', '', 0, 0);
INSERT INTO `fusillade`(`bed`, `bedLabel`, `patient`, `medecin`, `description`, `etatPatient`, `havePatient`) VALUES ('repos_ss_2', 'Salle de repos - Lit n°2', '', '', '', 0, 0);
INSERT INTO `fusillade`(`bed`, `bedLabel`, `patient`, `medecin`, `description`, `etatPatient`, `havePatient`) VALUES ('repos_ss_3', 'Salle de repos - Lit n°3', '', '', '', 0, 0);
INSERT INTO `fusillade`(`bed`, `bedLabel`, `patient`, `medecin`, `description`, `etatPatient`, `havePatient`) VALUES ('repos_ss_4', 'Salle de repos - Lit n°4', '', '', '', 0, 0);
INSERT INTO `fusillade`(`bed`, `bedLabel`, `patient`, `medecin`, `description`, `etatPatient`, `havePatient`) VALUES ('repos_ss_5', 'Salle de repos - Lit n°5', '', '', '', 0, 0);

INSERT INTO `fusillade`(`bed`, `bedLabel`, `patient`, `medecin`, `description`, `etatPatient`, `havePatient`) VALUES ('bloc_ss_1', 'Sandy Shores - Bloc opératoire n°1', '', '', '', 0, 0);
INSERT INTO `fusillade`(`bed`, `bedLabel`, `patient`, `medecin`, `description`, `etatPatient`, `havePatient`) VALUES ('bloc_ss_2', 'Sandy Shores - Bloc opératoire n°2', '', '', '', 0, 0);
INSERT INTO `fusillade`(`bed`, `bedLabel`, `patient`, `medecin`, `description`, `etatPatient`, `havePatient`) VALUES ('bloc_ss_3', 'Sandy Shores - Bloc opératoire n°3', '', '', '', 0, 0);
INSERT INTO `fusillade`(`bed`, `bedLabel`, `patient`, `medecin`, `description`, `etatPatient`, `havePatient`) VALUES ('bloc_ss_4', 'Sandy Shores - Bloc opératoire n°4', '', '', '', 0, 0);

INSERT INTO `fusillade`(`bed`, `bedLabel`, `patient`, `medecin`, `description`, `etatPatient`, `havePatient`) VALUES ('bloc_pb_1', 'Paleto Bay - Bloc opératoire n°1', '', '', '', 0, 0);
INSERT INTO `fusillade`(`bed`, `bedLabel`, `patient`, `medecin`, `description`, `etatPatient`, `havePatient`) VALUES ('bloc_pb_2', 'Paleto Bay - Bloc opératoire n°2', '', '', '', 0, 0);


INSERT INTO `service`(`dateStart`, `dateEnd`, `isSupervisor`, `isAvailable`, `type`, `id_user`) VALUES ('2020-09-30', '2020-09-30', 1, 1, 1, 4);
INSERT INTO `service`(`dateStart`, `dateEnd`, `isSupervisor`, `isAvailable`, `type`, `id_user`) VALUES ('2020-09-30', '2020-09-30', 1, 1, 1, 5);
INSERT INTO `service`(`dateStart`, `dateEnd`, `isSupervisor`, `isAvailable`, `type`, `id_user`) VALUES ('2020-09-30', '2020-09-30', 1, 1, 1, 6);
INSERT INTO `service`(`dateStart`, `dateEnd`, `isSupervisor`, `isAvailable`, `type`, `id_user`) VALUES ('2020-09-30', '2020-09-30', 1, 1, 1, 7);
INSERT INTO `service`(`dateStart`, `dateEnd`, `isSupervisor`, `isAvailable`, `type`, `id_user`) VALUES ('2020-09-30', '2020-09-30', 1, 1, 1, 9);
INSERT INTO `service`(`dateStart`, `dateEnd`, `isSupervisor`, `isAvailable`, `type`, `id_user`) VALUES ('2020-09-30', '2020-09-30', 1, 1, 1, 10);
INSERT INTO `service`(`dateStart`, `dateEnd`, `isSupervisor`, `isAvailable`, `type`, `id_user`) VALUES ('2020-09-30', '2020-09-30', 1, 1, 1, 11);
INSERT INTO `service`(`dateStart`, `dateEnd`, `isSupervisor`, `isAvailable`, `type`, `id_user`) VALUES ('2020-09-30', '2020-09-30', 1, 1, 1, 14);
INSERT INTO `service`(`dateStart`, `dateEnd`, `isSupervisor`, `isAvailable`, `type`, `id_user`) VALUES ('2020-09-30', '2020-09-30', 1, 1, 1, 15);
INSERT INTO `service`(`dateStart`, `dateEnd`, `isSupervisor`, `isAvailable`, `type`, `id_user`) VALUES ('2020-09-30', '2020-09-30', 1, 1, 1, 16);

INSERT INTO `grade`(`name`, `gradeName`, `type`, `typeGrade`) VALUES ('caporal','Caporal', 1, 2);
INSERT INTO `grade`(`name`, `gradeName`, `type`, `typeGrade`) VALUES ('paramedic','Paramedic', 1, 2);
INSERT INTO `grade`(`name`, `gradeName`, `type`, `typeGrade`) VALUES ('sergent','Sergent', 1, 2);
INSERT INTO `grade`(`name`, `gradeName`, `type`, `typeGrade`) VALUES ('lieutenant','Lieutenant', 1, 2);

ALTER TABLE `patient` ADD `numero` INT NULL DEFAULT NULL AFTER `fullname`;
ALTER TABLE `patient` ADD `dob` VARCHAR(255) NULL DEFAULT NULL AFTER `weight`;
ALTER TABLE `patient` ADD `gs` VARCHAR(255) NULL DEFAULT NULL AFTER `numero`;
ALTER TABLE `patient` ADD `name_proche` VARCHAR(255) NULL DEFAULT NULL AFTER `dob`;
ALTER TABLE `patient` ADD `num_proche` VARCHAR(255) NULL DEFAULT NULL AFTER `name_proche`;
ALTER TABLE `patient` ADD `imagePath` VARCHAR(255) NULL DEFAULT NULL AFTER `num_proche`;
ALTER TABLE `patient` DROP `commentary`;

ALTER TABLE `users` ADD `theme` VARCHAR(255) NOT NULL DEFAULT 'light' AFTER `num`;