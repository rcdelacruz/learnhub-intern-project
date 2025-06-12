-- Create additional databases for testing
CREATE DATABASE learnhub_test;
CREATE DATABASE learnhub_development;

-- Create user for application
CRETE USER learnhub_user WITH ENCRYPTED PASSWORD 'learnhub_password';

-- Grant permissions
GRANT ALL PRIVILEGES ON DATABASE learnhub TO learnhub_user;
GRANT ALL PRIVILEGES ON DATABASE learnhub_test TO learnhub_user;
GRANT ALL PRIVILEGES ON DATABASE learnhub_development TO learnhub_user;

-- Enable extensions
\c learnhub;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

\c learnhub_test;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

\c learnhub_development;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";