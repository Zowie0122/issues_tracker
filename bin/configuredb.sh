#!/bin/bash


echo "Configuring database" 

dropdb -U node_user issues_tracker
createdb -U node_user issues_tracker

psql -U node_user issues_tracker < ./bin/sql/schema.sql

psql -U node_user issues_tracker < ./bin/sql/seeds.sql

echo "configured"