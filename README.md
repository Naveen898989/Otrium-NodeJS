Otrium Products API
===================
Sample Resful API done using NodeJS

Prerequisits
------------
- Use the products.sql to create required tables for the API
- Add the following environment variables
    - OTRIUM_API_SERVER_PORT - Port the API should start in
    - OTRIUM_API_ACCESS_TOKEN - Access token used to authenticate requests
    - OTRIUM_API_MYSQL_HOST - MySQL server hostname
    - OTRIUM_API_DB_USER - Username for database
    - OTRIUM_API_DB_PASSWORD - Password for database
    - OTRIUM_API_DB_NAME - Database name the tables were imported to

Testing
-------
Use OtriumAPI.postman_collection.json file to assist in testing.
NOTE: Remember to change the x-access-token header to the appropriate access token.

Use products-csv-format.csv file as a template for creating bulk products with CSV
