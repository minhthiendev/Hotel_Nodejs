/* create db hotel*/
CREATE SCHEMA `hotel` ;

/* create table roomTypes*/
CREATE TABLE `hotel`.`roomtypes` (
  `RoomTile` VARCHAR(30) NOT NULL,
  `RoomPrice` INT NOT NULL,
  `BedRoom` INT NOT NULL,
  PRIMARY KEY (`RoomTile`),
  UNIQUE INDEX `RoomTile_UNIQUE` (`RoomTile` ASC) VISIBLE);
/* create table Rooms*/
  CREATE TABLE `hotel`.`rooms` (
  `RoomId` INT NOT NULL,
  `RoomType` VARCHAR(30) NOT NULL,
  `RoomStatus` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`NumberRoom`),
  INDEX `room_type_fk_idx` (`RoomType` ASC) VISIBLE,
  UNIQUE INDEX `NumberRoom_UNIQUE` (`NumberRoom` ASC) INVISIBLE,
  CONSTRAINT `room_type_fk`
    FOREIGN KEY (`RoomType`)
    REFERENCES `hotel`.`roomtypes` (`RoomTile`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);


    /* create table customers*/

CREATE TABLE `hotel`.`customers` (
  `CustomerId` INT NOT NULL,
  `CustomerName` NVARCHAR(100) NOT NULL,
  `DayOfBrth` DATE NOT NULL,
  `Nationality` VARCHAR(45) NOT NULL,
  `Address` NVARCHAR(100) NOT NULL,
  `Email` VARCHAR(100) NULL,
  `Phone` VARCHAR(10) NOT NULL,
  `LastVisited` DATE NULL,
  PRIMARY KEY (`CustomerId`),
  UNIQUE INDEX `CustomerId_UNIQUE` (`CustomerId` ASC) VISIBLE);


    /* create table reservation*/
CREATE TABLE `hotel`.`reservation` (
  `ReservationId` INT NOT NULL,
  `CustomerId` INT NOT NULL,
  `ExpectedCheckIn` DATETIME NOT NULL,
  `ExpectedCheckOut` INT NOT NULL,
  `RoomType` VARCHAR(30) NOT NULL,
  `ReservationStatus` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`ReservationId`),
  INDEX `reservation_customer_idx` (`CustomerId` ASC) VISIBLE,
  INDEX `reservation_roomtype_idx` (`RoomType` ASC) VISIBLE,
  CONSTRAINT `reservation_customer`
    FOREIGN KEY (`CustomerId`)
    REFERENCES `hotel`.`customers` (`CustomerId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `reservation_roomtype`
    FOREIGN KEY (`RoomType`)
    REFERENCES `hotel`.`roomtypes` (`RoomTile`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

    /* create table reservation*/
    CREATE TABLE `hotel`.`receptions` (
  `ReceptionId` INT NOT NULL,
  `CustomerId` INT NOT NULL,
  `ReservationId` INT NULL,
  `ExpectedRoom` INT NOT NULL,
  `CheckInDate` DATETIME NOT NULL,
  `ExpectedCheckOut` DATETIME NOT NULL,
  `CheckOutDate` DATETIME NOT NULL,
  `ReceptionStatus` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`ReceptionId`),
  INDEX `reception_customer_idx` (`CustomerId` ASC) VISIBLE,
  INDEX `reception_reservation_idx` (`ReservationId` ASC) VISIBLE,
  CONSTRAINT `reception_customers`
    FOREIGN KEY (`CustomerId`)
    REFERENCES `hotel`.`customers` (`CustomerId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `reception_reservation`
    FOREIGN KEY (`ReservationId`)
    REFERENCES `hotel`.`reservation` (`ReservationId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

  /* create table payments*/
    CREATE TABLE `hotel`.`payments` (
  `PaymentId` INT NOT NULL,
  `ReceptionId` INT NOT NULL,
  `PaymentAmount` INT NOT NULL,
  `PaymentMethod` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`PaymentId`),
  INDEX `reception_pay_idx` (`ReceptionId` ASC) VISIBLE,
  CONSTRAINT `reception_pay`
    FOREIGN KEY (`ReceptionId`)
    REFERENCES `hotel`.`receptions` (`ReceptionId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

  /* create table servives Used*/
CREATE TABLE `hotel`.`servicesused` (
  `ServicesUsedId` INT NOT NULL,
  `ServiceId` INT NOT NULL,
  `ReceptionId` INT NOT NULL,
  `Quantity` INT NOT NULL,
  `UsedDate` DATETIME NOT NULL,
  `Status` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`ServicesUsedId`),
  INDEX `service_serviceused_idx` (`ServiceId` ASC) VISIBLE,
  INDEX `servicesused_reception_idx` (`ReceptionId` ASC) VISIBLE,
  CONSTRAINT `service_serviceused`
    FOREIGN KEY (`ServiceId`)
    REFERENCES `hotel`.`services` (`ServicesId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `servicesused_reception`
    FOREIGN KEY (`ReceptionId`)
    REFERENCES `hotel`.`receptions` (`ReceptionId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);


CREATE TABLE `hotel`.`imagesroomstypes` (
  `RoomTypes` VARCHAR(30) NOT NULL,
  `image1` VARCHAR(100) NULL,
  `image2` VARCHAR(100) NULL,
  `image3` VARCHAR(100) NULL,
  `image4` VARCHAR(100) NULL,
  PRIMARY KEY (`RoomTypes`),
  CONSTRAINT `image_roomtypes`
    FOREIGN KEY (`RoomTypes`)
    REFERENCES `hotel`.`roomtypes` (`RoomTitle`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);



ALTER TABLE `hotel`.`reservation` 
ADD COLUMN `ExpectedCheckOut` DATETIME NOT NULL AFTER `ExpectedCheckIn`;

ALTER TABLE `hotel`.`reservation` 
CHANGE COLUMN `ExpectedRoom` `ExpectedPerson` INT NOT NULL ;

ALTER TABLE `hotel`.`roomtypes` 
CHANGE COLUMN `BedRoom` `Person` INT NOT NULL ;

SELECT *
FROM hotel.rooms
where RoomStatus='empty'
and RoomId not in ( select RoomId 
					from hotel.reservations)
or RoomId in ( select RoomId 
from hotel.reservations 
where reservations.ReservationStatus='waiting'
and ExpectedCheckIn not between '2020-02-27' and '2020-02-29'
and ExpectedCheckOut < '2020-02-27' )

ALTER TABLE `hotel`.`customers` 
ADD COLUMN `Username` VARCHAR(100) NULL AFTER `LastVisited`,
ADD COLUMN `Password` VARCHAR(150) NULL AFTER `Username`,
CHANGE COLUMN `LastVisited` `LastVisited` DATE NULL ;
