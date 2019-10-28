osmdata.get:
	wget https://download.geofabrik.de/south-america/peru-latest.osm.pbf

osmosis.install:
	sudo apt install osmosis

osmosis.export-local-db:
	osmosis/bin/osmosis --read-pbf file=peru-latest.osm.pbf --write-apidb host="localhost" database="osm" user="osm" password="1234"

postgresql.install:
	sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt xenial-pgdg main" >> /etc/apt/sources.list'
	wget --quiet -O - http://apt.postgresql.org/pub/repos/apt/ACCC4CF8.asc | sudo apt-key add -
	sudo apt-get update
	sudo apt-get install -y postgresql-9.6
	sudo apt-get install postgresql-9.6-postgis-2.3 postgresql-contrib-9.6
	sudo apt-get install -y postgresql-9.6-pgrouting
	
postgresql.configure:
	sudo -u postgres psql -f script/init_db.sql
	sudo -u postgres psql -d osmdb -f /usr/share/doc/osmosis/examples/pgsnapshot_schema_0.6.sql
	sudo -u postgres psql -d osmdb -f /usr/share/doc/osmosis/examples/pgsnapshot_schema_0.6_action.sql
	sudo -u postgres psql -d osmdb -f /usr/share/doc/osmosis/examples/pgsnapshot_schema_0.6_bbox.sql
	sudo -u postgres psql -d osmdb -f /usr/share/doc/osmosis/examples/pgsnapshot_schema_0.6_linestring.sql

postgresql.cmd:
	#sudo -i -u postgres "psql"
	sudo -u postgres psql
	
postgresql.create-user:
	sudo -u postgres createuser --interactive

postgresql.create-database:
	sudo -u postgres createdb osm
