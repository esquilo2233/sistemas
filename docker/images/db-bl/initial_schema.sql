-- Criação da tabela Senator
CREATE TABLE "Senator" (
    "id" SERIAL PRIMARY KEY,
    "caucus" VARCHAR(255),
    "current" BOOLEAN,
    "description" TEXT,
    "district" VARCHAR(255),
    "enddate" TIMESTAMP,
    "leadership_title" VARCHAR(255),
    "party" VARCHAR(255),
    "bioguideid" VARCHAR(255),
    "birthday" TIMESTAMP,
    "cspanid" INT,
    "firstname" VARCHAR(255),
    "gender" VARCHAR(50),
    "lastname" VARCHAR(255),
    "link" TEXT,
    "middlename" VARCHAR(255),
    "name" VARCHAR(255),
    "namemod" VARCHAR(255),
    "nickname" VARCHAR(255),
    "osid" VARCHAR(255),
    "sortname" VARCHAR(255),
    "twitterid" VARCHAR(255),
    "youtubeid" VARCHAR(255),
    "phone" VARCHAR(50),
    "role_type" VARCHAR(255),
    "senator_class" VARCHAR(50),
    "senator_rank" VARCHAR(50),
    "startdate" TIMESTAMP,
    "state" VARCHAR(50),
    "title" VARCHAR(255),
    "title_long" VARCHAR(255),
    "website" TEXT,
    "created_by" VARCHAR(255) DEFAULT 'system',
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Trigger para atualizar a coluna updated_at na tabela Senator
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_senator_updated_at BEFORE UPDATE
ON "Senator" FOR EACH ROW EXECUTE PROCEDURE 
update_updated_at_column();

-- Criação da tabela CongressNumber
CREATE TABLE "CongressNumber" (
    "id" SERIAL PRIMARY KEY,
    "senatorId" INT REFERENCES "Senator"(id),
    "congress_number" INT,
    "created_by" VARCHAR(255) DEFAULT 'system',
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Trigger para atualizar a coluna updated_at na tabela CongressNumber
CREATE TRIGGER update_congressnumber_updated_at BEFORE UPDATE
ON "CongressNumber" FOR EACH ROW EXECUTE PROCEDURE 
update_updated_at_column();

-- Criação da tabela Extra
CREATE TABLE "Extra" (
    "id" SERIAL PRIMARY KEY,
    "senatorId" INT REFERENCES "Senator"(id),
    "address" TEXT,
    "contact_form" TEXT,
    "office" VARCHAR(255),
    "rss_url" TEXT,
    "created_by" VARCHAR(255) DEFAULT 'system',
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Trigger para atualizar a coluna updated_at na tabela Extra
CREATE TRIGGER update_extra_updated_at BEFORE UPDATE
ON "Extra" FOR EACH ROW EXECUTE PROCEDURE 
update_updated_at_column();
