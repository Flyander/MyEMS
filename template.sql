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
        type Int NOT NULL
	,CONSTRAINT Grade_PK PRIMARY KEY (name)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: users
#------------------------------------------------------------

CREATE TABLE users(
        id       Int  Auto_increment  NOT NULL ,
        fullname Varchar (250) NOT NULL ,
        password Varchar (250) NOT NULL ,
        username Varchar (250) NOT NULL ,
        name     Varchar (250) NOT NULL
	,CONSTRAINT USER_PK PRIMARY KEY (id)

	,CONSTRAINT USER_Grade_FK FOREIGN KEY (name) REFERENCES grade(name)
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
        dateStart    Date NOT NULL ,
        dateEnd      Date NOT NULL ,
        isSupervisor Int NOT NULL ,
        isAvailable  Int NOT NULL ,
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

