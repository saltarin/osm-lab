CREATE DATABASE osmdb; \connect osmdb;
CREATE SCHEMA geo;
ALTER DATABASE osmdb SET search_path=public, geo, contrib;
CREATE EXTENSION postgis SCHEMA geo;
CREATE EXTENSION hstore SCHEMA geo;