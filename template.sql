#------------------------------------------------------------
#        Script MySQL.
#------------------------------------------------------------


#------------------------------------------------------------
# Table: Patient
#------------------------------------------------------------

CREATE TABLE Patient(
        id         Int  Auto_increment  NOT NULL ,
        fullname   Varchar (250) NOT NULL ,
        height     Float NOT NULL ,
        weight     Float NOT NULL ,
        Commentary Longtext NOT NULL
	,CONSTRAINT Patient_PK PRIMARY KEY (id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: Spe
#------------------------------------------------------------

CREATE TABLE Spe(
        NAME Varchar (250) NOT NULL ,
        Type Int NOT NULL
	,CONSTRAINT Spe_PK PRIMARY KEY (NAME)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: Grade
#------------------------------------------------------------

CREATE TABLE Grade(
        gradeName Varchar (250) NOT NULL ,
        type Int NOT NULL
	,CONSTRAINT Grade_PK PRIMARY KEY (name)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: USER
#------------------------------------------------------------

CREATE TABLE USER(
        ID       Int  Auto_increment  NOT NULL ,
        FULLNAME Varchar (250) NOT NULL ,
        PASSWORD Varchar (250) NOT NULL ,
        USERNAME Varchar (250) NOT NULL ,
        name     Varchar (250) NOT NULL
	,CONSTRAINT USER_PK PRIMARY KEY (ID)

	,CONSTRAINT USER_Grade_FK FOREIGN KEY (name) REFERENCES Grade(name)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: ORDONNANCE
#------------------------------------------------------------

CREATE TABLE ORDONNANCE(
        id         Int NOT NULL ,
        nbDay      Int NOT NULL ,
        nbPrise    Int NOT NULL ,
        drugName   Varchar (250) NOT NULL ,
        whenInDay  Varchar (250) NOT NULL ,
        ID_USER    Int NOT NULL ,
        id_Patient Int NOT NULL
	,CONSTRAINT ORDONNANCE_PK PRIMARY KEY (id)

	,CONSTRAINT ORDONNANCE_USER_FK FOREIGN KEY (ID_USER) REFERENCES USER(ID)
	,CONSTRAINT ORDONNANCE_Patient0_FK FOREIGN KEY (id_Patient) REFERENCES Patient(id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: Rapport
#------------------------------------------------------------

CREATE TABLE Rapport(
        id           Int  Auto_increment  NOT NULL ,
        Date         Date NOT NULL ,
        Auscult      Varchar (250) NOT NULL ,
        Intervention Longtext NOT NULL ,
        Amount       Int NOT NULL ,
        isPayed      Bool NOT NULL ,
        ID_USER      Int NOT NULL ,
        id_Patient   Int NOT NULL
	,CONSTRAINT Rapport_PK PRIMARY KEY (id)

	,CONSTRAINT Rapport_USER_FK FOREIGN KEY (ID_USER) REFERENCES USER(ID)
	,CONSTRAINT Rapport_Patient0_FK FOREIGN KEY (id_Patient) REFERENCES Patient(id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: dayofFollow
#------------------------------------------------------------

CREATE TABLE dayofFollow(
        id          Int  Auto_increment  NOT NULL ,
        date        Date NOT NULL ,
        description Varchar (250) NOT NULL ,
        isOk        Bool NOT NULL ,
        id_Rapport  Int NOT NULL
	,CONSTRAINT dayofFollow_PK PRIMARY KEY (id)

	,CONSTRAINT dayofFollow_Rapport_FK FOREIGN KEY (id_Rapport) REFERENCES Rapport(id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: SERVICE
#------------------------------------------------------------

CREATE TABLE SERVICE(
        ID           Int  Auto_increment  NOT NULL ,
        dateStart    Date NOT NULL ,
        dateEnd      Date NOT NULL ,
        isSupervisor Int NOT NULL ,
        isAvailable  Int NOT NULL ,
        Type         Int NOT NULL ,
        ID_USER      Int NOT NULL
	,CONSTRAINT SERVICE_PK PRIMARY KEY (ID)

	,CONSTRAINT SERVICE_USER_FK FOREIGN KEY (ID_USER) REFERENCES USER(ID)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: HAVE
#------------------------------------------------------------

CREATE TABLE HAVE(
        NAME Varchar (250) NOT NULL ,
        ID   Int NOT NULL
	,CONSTRAINT HAVE_PK PRIMARY KEY (NAME,ID)

	,CONSTRAINT HAVE_Spe_FK FOREIGN KEY (NAME) REFERENCES Spe(NAME)
	,CONSTRAINT HAVE_USER0_FK FOREIGN KEY (ID) REFERENCES USER(ID)
)ENGINE=InnoDB;

