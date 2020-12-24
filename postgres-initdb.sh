#!/bin/sh -e

psql --variable=ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
  CREATE DATABASE "bykea_acm";
EOSQL

psql --variable=ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname=bykea_acm <<-EOSQL
  CREATE EXTENSION "uuid-ossp";
  CREATE EXTENSION "hstore";
EOSQL