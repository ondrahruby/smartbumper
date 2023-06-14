-- Creating tables

create table bumper (
	bumper_id int,
	alive boolean,
    occupied boolean,
    acceleration1 float(3,3),
    acceleration2 float(3,3),
    acceleration3 float(3,3),
    primary key (bumper_id)
);

create table dock (
	bumper_id int,
    dock_id int,
    activeFlag boolean,
    occupied boolean,
    truck_driver_id int,
    primary key(dock_id),
    foreign key (bumper_id) references bumper(bumper_id)
);

create table heatmapDevice (
	device_id int,
    alive boolean,
    counter1 int,
    counter2 int,
    primary key (device_id)
);

create table bumperSensor (
	sensor_id int,
    sensorData int,
    rssi int,
    created_at datetime,
    updated_at datetime,
    bumper_id int,
    primary key (sensor_id),
    foreign key (bumper_id) references bumper(bumper_id)
);

create table warehouseSensor (
	sensor_id int,
    sensorData int,
    rssi int,
    created_at datetime,
    updated_at datetime,
    heatmapDevice_id int,
    primary key (sensor_id),
    foreign key (heatmapDevice_id) references heatmapDevice(device_id)
);

-- select * from mysql.user;
-- grant select on SmartBumper.* to bob@localhost;
-- show grants for bob@localhost;
-- create user 'bob'@'localhost' identified by 'password';
-- select current_user();
-- show create user 'bob'@'localhost'
-- drop user 'bob'@'localhost';
alter user 'root'@'localhost' identified by '123';
select * from dock;
insert into dock(bumper_id, dock_id, activeFlag, occupied, truck_driver_id) 
values('1','1',true,true,'1');
insert into bumper(bumper_id, alive, occupied, acceleration1, acceleration2, acceleration3) 
values('1',true,true,'0.0','0.0','0.0');
-- show grants
-- drop table bumper, dock, heatmapDevice, bumperSensor, warehouseSensor
